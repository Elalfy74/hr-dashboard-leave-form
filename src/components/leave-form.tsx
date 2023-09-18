import { useRef } from 'react';
import { IconClock } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { DatePickerInput, TimeInput } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import {
  ActionIcon,
  Button,
  Container,
  Divider,
  Group,
  Loader,
  Paper,
  Radio,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';

import { LeaveFormState, LeaveReasons, LeaveType, leaveFormSchema } from './leave-form-schema';
import { useAddLeave } from '../hooks/use-add-leave';

function parseTimeToDate(timeString: string) {
  return dayjs()
    .set('hour', parseInt(timeString.slice(0, 2), 10))
    .set('minute', parseInt(timeString.slice(3), 10))
    .toDate();
}

interface LeaveFormProps {
  departments: { value: string; label: string }[];
}

export function LeaveForm({ departments }: LeaveFormProps) {
  const fromRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);

  const { addLeave, addLeaveLoading } = useAddLeave();

  const form = useForm<LeaveFormState>({
    validate: zodResolver(leaveFormSchema),

    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      department_id: departments[0].value,
      leave_reason: 'Vacation',
      comments: '',

      leave_type: 'Days',

      start_date: new Date(),
      end_date: new Date(),

      selected_day: new Date(),
      start_hour: parseTimeToDate('08:00'),
      end_hour: parseTimeToDate('12:00'),
    },
  });

  function handleSubmit(values: LeaveFormState) {
    let submittedValues = { ...values };

    if (values.leave_type === 'Days') {
      submittedValues = (({
        selected_day: selectedDay,
        start_hour: startHour,
        end_hour: endHour,
        ...rest
      }) => rest)(values);
    } else {
      submittedValues.start_date = null;
      submittedValues.end_date = null;
    }

    // console.log(submittedValues);
    addLeave(submittedValues);
  }

  return (
    <Container size={800} my={40}>
      <Paper radius="md" p="xl" withBorder>
        <Title
          order={1}
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Request for Leave
        </Title>
        <Text size="lg" weight={500}>
          Request your leave details down below.
        </Text>
        <Divider my="lg" />
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Stack>
            <SimpleGrid
              cols={1}
              spacing="md"
              breakpoints={[{ minWidth: 'sm', cols: 2, spacing: 'lg' }]}
            >
              <TextInput
                label="First Name"
                placeholder="First Name"
                size="md"
                withAsterisk
                {...form.getInputProps('first_name')}
              />
              <TextInput
                label="Last Name"
                placeholder="Last Name"
                size="md"
                withAsterisk
                {...form.getInputProps('last_name')}
              />
            </SimpleGrid>

            <TextInput
              label="Email"
              placeholder="Email"
              size="md"
              withAsterisk
              {...form.getInputProps('email')}
            />

            <Select
              label="Department"
              withAsterisk
              size="md"
              data={departments}
              {...form.getInputProps('department_id')}
            />

            <Title mt="md" order={3}>
              Details of Leave
            </Title>
            <Divider mb="md" />

            <Radio.Group
              size="md"
              label="Leave Request For"
              {...form.getInputProps('leave_type')}
              withAsterisk
            >
              <Group mt="xs">
                {LeaveType.map((type) => (
                  <Radio key={type} value={type} label={type} />
                ))}
              </Group>
            </Radio.Group>

            {form.values.leave_type === 'Days' && (
              <DatePickerInput
                type="range"
                size="md"
                label="Pick dates range"
                placeholder="Pick dates range"
                allowSingleDateInRange
                firstDayOfWeek={6}
                weekendDays={[5]}
                excludeDate={(date) => date.getDay() === 5}
                withAsterisk
                minDate={new Date()}
                maxDate={dayjs(new Date()).add(1, 'month').toDate()}
                value={[form.values.start_date, form.values.end_date]}
                onChange={(range) =>
                  form.setValues((oldValues) => ({
                    ...oldValues,
                    start_date: range[0],
                    end_date: range[1],
                  }))
                }
                error={
                  form.errors.start_date ||
                  form.errors.end_date ||
                  form.errors['start_date.end_date']
                }
              />
            )}

            {form.values.leave_type === 'Hours' && (
              <>
                <DatePickerInput
                  label="Pick Day"
                  size="md"
                  minDate={new Date()}
                  maxDate={dayjs(new Date()).add(1, 'month').toDate()}
                  firstDayOfWeek={6}
                  weekendDays={[5]}
                  excludeDate={(date) => date.getDay() === 5}
                  withAsterisk
                  {...form.getInputProps('selected_day')}
                />

                <SimpleGrid
                  cols={1}
                  spacing="md"
                  breakpoints={[{ minWidth: 'sm', cols: 2, spacing: 'lg' }]}
                >
                  <TimeInput
                    label="From"
                    size="md"
                    ref={fromRef}
                    rightSection={
                      <ActionIcon onClick={() => fromRef.current?.showPicker()}>
                        <IconClock size="1rem" stroke={1.5} />
                      </ActionIcon>
                    }
                    value={dayjs(form.values.start_hour).format('HH:mm')}
                    onChange={(e) =>
                      form.setFieldValue('start_hour', parseTimeToDate(e.target.value))
                    }
                    error={form.errors.start_hour || form.errors['start_hour.end_hour']}
                  />
                  <TimeInput
                    label="To"
                    size="md"
                    ref={endRef}
                    rightSection={
                      <ActionIcon onClick={() => endRef.current?.showPicker()}>
                        <IconClock size="1rem" stroke={1.5} />
                      </ActionIcon>
                    }
                    value={dayjs(form.values.end_hour).format('HH:mm')}
                    onChange={(e) =>
                      form.setFieldValue('end_hour', parseTimeToDate(e.target.value))
                    }
                    error={form.errors.end_hour || form.errors['start_hour.end_hour']}
                  />
                </SimpleGrid>
              </>
            )}

            <Radio.Group
              size="md"
              label="Leave Reason"
              {...form.getInputProps('leave_reason')}
              withAsterisk
            >
              <Group mt="xs">
                {LeaveReasons.map((reason) => (
                  <Radio key={reason} value={reason} label={reason} />
                ))}
              </Group>
            </Radio.Group>

            <Textarea
              label="Comments"
              minRows={4}
              maxRows={4}
              {...form.getInputProps('comments')}
            />

            <Button type="submit" mt="xl" size="lg">
              {addLeaveLoading ? <Loader variant="dots" color="white" /> : 'Submit'}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
