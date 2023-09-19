export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      departments: {
        Row: {
          created_at: string;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      employees: {
        Row: {
          active: boolean;
          avatar: string | null;
          created_at: string;
          date_of_joining: string;
          department: number;
          designation: string;
          email: string;
          experience_years: number;
          first_name: string;
          id: number;
          last_name: string;
          phone: string | null;
          salary: number;
        };
        Insert: {
          active?: boolean;
          avatar?: string | null;
          created_at?: string;
          date_of_joining: string;
          department: number;
          designation: string;
          email: string;
          experience_years?: number;
          first_name: string;
          id?: number;
          last_name: string;
          phone?: string | null;
          salary: number;
        };
        Update: {
          active?: boolean;
          avatar?: string | null;
          created_at?: string;
          date_of_joining?: string;
          department?: number;
          designation?: string;
          email?: string;
          experience_years?: number;
          first_name?: string;
          id?: number;
          last_name?: string;
          phone?: string | null;
          salary?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'employees_department_fkey';
            columns: ['department'];
            referencedRelation: 'departments';
            referencedColumns: ['id'];
          }
        ];
      };
      jobs: {
        Row: {
          active: boolean;
          created_at: string;
          description: string;
          full_time: boolean;
          id: number;
          logo: string;
          open_positions: number;
          remote: boolean;
          title: string;
        };
        Insert: {
          active?: boolean;
          created_at?: string;
          description: string;
          full_time: boolean;
          id?: number;
          logo: string;
          open_positions?: number;
          remote: boolean;
          title: string;
        };
        Update: {
          active?: boolean;
          created_at?: string;
          description?: string;
          full_time?: boolean;
          id?: number;
          logo?: string;
          open_positions?: number;
          remote?: boolean;
          title?: string;
        };
        Relationships: [];
      };
      leaves: {
        Row: {
          comments: string | null;
          created_at: string;
          department_id: number;
          email: string;
          end_date: string | null;
          end_hour: string | null;
          first_name: string;
          id: number;
          last_name: string;
          leave_reason: string;
          leave_type_days: boolean;
          selected_day: string | null;
          start_date: string | null;
          start_hour: string | null;
          status: string;
        };
        Insert: {
          comments?: string | null;
          created_at?: string;
          department_id: number;
          email: string;
          end_date?: string | null;
          end_hour?: string | null;
          first_name: string;
          id?: number;
          last_name: string;
          leave_reason: string;
          leave_type_days: boolean;
          selected_day?: string | null;
          start_date?: string | null;
          start_hour?: string | null;
          status?: string;
        };
        Update: {
          comments?: string | null;
          created_at?: string;
          department_id?: number;
          email?: string;
          end_date?: string | null;
          end_hour?: string | null;
          first_name?: string;
          id?: number;
          last_name?: string;
          leave_reason?: string;
          leave_type_days?: boolean;
          selected_day?: string | null;
          start_date?: string | null;
          start_hour?: string | null;
          status?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'leaves_department_id_fkey';
            columns: ['department_id'];
            referencedRelation: 'departments';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'leaves_email_fkey';
            columns: ['email'];
            referencedRelation: 'employees';
            referencedColumns: ['email'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
