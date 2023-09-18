/* eslint-disable no-param-reassign */
import { z } from 'zod';

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
        if (!values.selected_day) {
          errorMsg = {
            message: 'selectedDay is required',
            path: ['selected_day'],
          };
          return false;
        }
        if (!values.start_hour) {
          errorMsg = {
            message: 'startHour is required',
            path: ['start_hour'],
          };
          return false;
        }
        if (!values.end_hour) {
          errorMsg = {
            message: 'endHour is required',
            path: ['end_hour'],
          };
          return false;
        }
        if (values.start_hour > values.end_hour) {
          errorMsg = {
            message: 'Start hour cannot be after the end hour',
            path: ['start_hour', 'end_hour'],
          };
          return false;
        }
      }
      if (values.leave_type === 'Days') {
        if (!values.start_date) {
          errorMsg = {
            message: 'startDate is required',
            path: ['start_date'],
          };
          return false;
        }
        if (!values.end_date) {
          errorMsg = {
            message: 'endDate is required',
            path: ['end_date'],
          };
          return false;
        }
        if (values.start_date > values.end_date) {
          errorMsg = {
            message: 'Start date cannot be after the end date',
            path: ['start_date', 'end_date'],
          };
          return false;
        }
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
