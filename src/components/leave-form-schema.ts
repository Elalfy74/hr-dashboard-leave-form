/* eslint-disable no-param-reassign */
import { z } from 'zod';

function validateHours(values: any) {
  if (!values.selected_day) {
    return {
      message: 'selectedDay is required',
      path: ['selected_day'],
    };
  }
  if (!values.start_hour) {
    return {
      message: 'startHour is required',
      path: ['start_hour'],
    };
  }
  if (!values.end_hour) {
    return {
      message: 'endHour is required',
      path: ['end_hour'],
    };
  }
  if (values.start_hour > values.end_hour) {
    return {
      message: 'Start hour cannot be after the end hour',
      path: ['start_hour', 'end_hour'],
    };
  }
  return null; // Validation passed
}

// Function to validate leave type 'Days'
function validateDays(values: any) {
  if (!values.start_date) {
    return {
      message: 'startDate is required',
      path: ['start_date'],
    };
  }
  if (!values.end_date) {
    return {
      message: 'endDate is required',
      path: ['end_date'],
    };
  }
  if (values.start_date > values.end_date) {
    return {
      message: 'Start date cannot be after the end date',
      path: ['start_date', 'end_date'],
    };
  }
  return null; // Validation passed
}

type RefineParams = {
  // override error message
  message?: string;

  // appended to error path
  path?: (string | number)[];

  // params object you can use to customize message
  // in error map
  params?: object;
};

let errorMsg: RefineParams = { message: 'Invalid input!' };

export const LeaveReasons = ['Vacation', 'Sick', 'Quitting', 'Other'] as const;

export const LeaveType = ['Hours', 'Days'] as const;

export const leaveFormSchema = z
  .object({
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    email: z.string().email(),
    department_id: z.string(),
    leave_reason: z.enum(LeaveReasons),
    comments: z.string().optional(),

    leave_type: z.enum(LeaveType),

    start_date: z.date().nullable(),
    end_date: z.date().nullable(),

    selected_day: z.date().nullable().optional(),
    start_hour: z
      .date({
        invalid_type_error: 'Invalid Time',
      })
      .nullable()
      .optional(),
    end_hour: z
      .date({
        invalid_type_error: 'Invalid Time',
      })
      .nullable()
      .optional(),
  })
  .refine(
    (values) => {
      if (values.leave_type === 'Hours') {
        const result = validateHours(values);

        result && (errorMsg = result);

        return result === null;
      }
      if (values.leave_type === 'Days') {
        const result = validateDays(values);

        result && (errorMsg = result);

        return result === null;
      }
      return true;
    },
    () => errorMsg
  )
  .transform((values) => {
    if (values.leave_type === 'Hours') {
      values.start_date = null;
      values.end_date = null;
    } else {
      values.selected_day = null;
      values.start_hour = null;
      values.end_hour = null;
    }

    return values;
  });

export type LeaveFormState = z.infer<typeof leaveFormSchema>;
