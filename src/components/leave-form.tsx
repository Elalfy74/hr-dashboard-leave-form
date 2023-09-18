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

  const form = useForm<LeaveFormState>({
    validate: zodResolver(leaveFormSchema),

    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      department: departments[0].value,
      leaveReason: 'Vacation',
      comments: '',

      leaveType: 'Days',

      startDate: new Date(),
      endDate: new Date(),

      selectedDay: new Date(),
      startHour: parseTimeToDate('08:00'),
      endHour: parseTimeToDate('12:00'),
    },
  });

  function handleSubmit(values: LeaveFormState) {
    let submittedValues = { ...values };

    if (values.leaveType === 'Days') {
      submittedValues = (({ selectedDay, startHour, endHour, ...rest }) => rest)(values);
    } else {
      submittedValues.startDate = null;
      submittedValues.endDate = null;
    }

    console.log(submittedValues);
    // mutate(submittedValues);
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
                {...form.getInputProps('firstName')}
              />
              <TextInput
                label="Last Name"
                placeholder="Last Name"
                size="md"
                withAsterisk
                {...form.getInputProps('lastName')}
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
              {...form.getInputProps('department')}
            />

            <Title mt="md" order={3}>
              Details of Leave
            </Title>
            <Divider mb="md" />

            <Radio.Group
              size="md"
              label="Leave Request For"
              {...form.getInputProps('leaveType')}
              withAsterisk
            >
              <Group mt="xs">
                {LeaveType.map((type) => (
                  <Radio key={type} value={type} label={type} />
                ))}
              </Group>
            </Radio.Group>

            {form.values.leaveType === 'Days' && (
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
                value={[form.values.startDate, form.values.endDate]}
                onChange={(range) =>
                  form.setValues((oldValues) => ({
                    ...oldValues,
                    startDate: range[0],
                    endDate: range[1],
                  }))
                }
                error={
                  form.errors.startDate || form.errors.endDate || form.errors['startDate.endDate']
                }
              />
            )}

            {form.values.leaveType === 'Hours' && (
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
                  {...form.getInputProps('selectedDay')}
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
                    value={dayjs(form.values.startHour).format('HH:mm')}
                    onChange={(e) =>
                      form.setFieldValue('startHour', parseTimeToDate(e.target.value))
                    }
                    error={form.errors.startHour || form.errors['startHour.endHour']}
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
                    value={dayjs(form.values.endHour).format('HH:mm')}
                    onChange={(e) => form.setFieldValue('endHour', parseTimeToDate(e.target.value))}
                    error={form.errors.endHour || form.errors['startHour.endHour']}
                  />
                </SimpleGrid>
              </>
            )}

            <Radio.Group
              size="md"
              label="Leave Reason"
              {...form.getInputProps('leaveReason')}
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
              {false ? <Loader variant="dots" color="white" /> : 'Submit'}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
