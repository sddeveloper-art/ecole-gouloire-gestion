export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      attendances: {
        Row: {
          arrival_time: string | null
          attendance_date: string
          created_at: string | null
          departure_time: string | null
          id: string
          notes: string | null
          recorded_by: string | null
          schedule_id: string
          status: string
          student_id: string
        }
        Insert: {
          arrival_time?: string | null
          attendance_date?: string
          created_at?: string | null
          departure_time?: string | null
          id?: string
          notes?: string | null
          recorded_by?: string | null
          schedule_id: string
          status?: string
          student_id: string
        }
        Update: {
          arrival_time?: string | null
          attendance_date?: string
          created_at?: string | null
          departure_time?: string | null
          id?: string
          notes?: string | null
          recorded_by?: string | null
          schedule_id?: string
          status?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendances_recorded_by_fkey"
            columns: ["recorded_by"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendances_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "schedules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendances_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      classes: {
        Row: {
          capacity: number | null
          created_at: string
          id: string
          level: string
          name: string
        }
        Insert: {
          capacity?: number | null
          created_at?: string
          id?: string
          level: string
          name: string
        }
        Update: {
          capacity?: number | null
          created_at?: string
          id?: string
          level?: string
          name?: string
        }
        Relationships: []
      }
      classrooms: {
        Row: {
          capacity: number | null
          created_at: string
          equipment: string[] | null
          id: string
          name: string
          type: string | null
        }
        Insert: {
          capacity?: number | null
          created_at?: string
          equipment?: string[] | null
          id?: string
          name: string
          type?: string | null
        }
        Update: {
          capacity?: number | null
          created_at?: string
          equipment?: string[] | null
          id?: string
          name?: string
          type?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          end_date: string | null
          end_time: string | null
          event_type: string
          id: string
          is_mandatory: boolean | null
          location: string | null
          start_date: string
          start_time: string | null
          target_audience: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          end_time?: string | null
          event_type: string
          id?: string
          is_mandatory?: boolean | null
          location?: string | null
          start_date: string
          start_time?: string | null
          target_audience?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          end_time?: string | null
          event_type?: string
          id?: string
          is_mandatory?: boolean | null
          location?: string | null
          start_date?: string
          start_time?: string | null
          target_audience?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      fees: {
        Row: {
          academic_year: string
          amount: number
          created_at: string | null
          description: string | null
          due_date: string | null
          fee_type: string
          id: string
          is_active: boolean | null
          name: string
        }
        Insert: {
          academic_year?: string
          amount: number
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          fee_type: string
          id?: string
          is_active?: boolean | null
          name: string
        }
        Update: {
          academic_year?: string
          amount?: number
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          fee_type?: string
          id?: string
          is_active?: boolean | null
          name?: string
        }
        Relationships: []
      }
      grades: {
        Row: {
          academic_year: string
          class_id: string
          comments: string | null
          created_at: string | null
          grade_date: string
          grade_type: string
          grade_value: number
          id: string
          max_grade: number
          semester: number
          student_id: string
          subject_id: string
          teacher_id: string
          updated_at: string | null
        }
        Insert: {
          academic_year?: string
          class_id: string
          comments?: string | null
          created_at?: string | null
          grade_date?: string
          grade_type: string
          grade_value: number
          id?: string
          max_grade?: number
          semester?: number
          student_id: string
          subject_id: string
          teacher_id: string
          updated_at?: string | null
        }
        Update: {
          academic_year?: string
          class_id?: string
          comments?: string | null
          created_at?: string | null
          grade_date?: string
          grade_type?: string
          grade_value?: number
          id?: string
          max_grade?: number
          semester?: number
          student_id?: string
          subject_id?: string
          teacher_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "grades_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "grades_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "grades_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "grades_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          id: string
          is_read: boolean | null
          message: string
          notification_type: string
          read_at: string | null
          recipient_id: string
          recipient_type: string
          sent_at: string | null
          title: string
        }
        Insert: {
          id?: string
          is_read?: boolean | null
          message: string
          notification_type: string
          read_at?: string | null
          recipient_id: string
          recipient_type: string
          sent_at?: string | null
          title: string
        }
        Update: {
          id?: string
          is_read?: boolean | null
          message?: string
          notification_type?: string
          read_at?: string | null
          recipient_id?: string
          recipient_type?: string
          sent_at?: string | null
          title?: string
        }
        Relationships: []
      }
      schedules: {
        Row: {
          academic_year: string
          class_id: string
          classroom_id: string
          created_at: string
          end_date: string
          id: string
          is_active: boolean | null
          notes: string | null
          semester: number | null
          start_date: string
          subject_id: string
          teacher_id: string
          time_slot_id: string
          updated_at: string
        }
        Insert: {
          academic_year?: string
          class_id: string
          classroom_id: string
          created_at?: string
          end_date: string
          id?: string
          is_active?: boolean | null
          notes?: string | null
          semester?: number | null
          start_date: string
          subject_id: string
          teacher_id: string
          time_slot_id: string
          updated_at?: string
        }
        Update: {
          academic_year?: string
          class_id?: string
          classroom_id?: string
          created_at?: string
          end_date?: string
          id?: string
          is_active?: boolean | null
          notes?: string | null
          semester?: number | null
          start_date?: string
          subject_id?: string
          teacher_id?: string
          time_slot_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_schedules_class_id"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_schedules_classroom_id"
            columns: ["classroom_id"]
            isOneToOne: false
            referencedRelation: "classrooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_schedules_subject_id"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_schedules_teacher_id"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_schedules_time_slot_id"
            columns: ["time_slot_id"]
            isOneToOne: false
            referencedRelation: "time_slots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedules_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedules_classroom_id_fkey"
            columns: ["classroom_id"]
            isOneToOne: false
            referencedRelation: "classrooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedules_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedules_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedules_time_slot_id_fkey"
            columns: ["time_slot_id"]
            isOneToOne: false
            referencedRelation: "time_slots"
            referencedColumns: ["id"]
          },
        ]
      }
      student_enrollments: {
        Row: {
          academic_year: string
          class_id: string
          created_at: string | null
          enrollment_date: string
          id: string
          status: string | null
          student_id: string
        }
        Insert: {
          academic_year?: string
          class_id: string
          created_at?: string | null
          enrollment_date?: string
          id?: string
          status?: string | null
          student_id: string
        }
        Update: {
          academic_year?: string
          class_id?: string
          created_at?: string | null
          enrollment_date?: string
          id?: string
          status?: string | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_enrollments_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_enrollments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_payments: {
        Row: {
          amount_paid: number
          created_at: string | null
          fee_id: string
          id: string
          notes: string | null
          payment_date: string
          payment_method: string | null
          received_by: string | null
          reference_number: string | null
          status: string | null
          student_id: string
        }
        Insert: {
          amount_paid: number
          created_at?: string | null
          fee_id: string
          id?: string
          notes?: string | null
          payment_date?: string
          payment_method?: string | null
          received_by?: string | null
          reference_number?: string | null
          status?: string | null
          student_id: string
        }
        Update: {
          amount_paid?: number
          created_at?: string | null
          fee_id?: string
          id?: string
          notes?: string | null
          payment_date?: string
          payment_method?: string | null
          received_by?: string | null
          reference_number?: string | null
          status?: string | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_payments_fee_id_fkey"
            columns: ["fee_id"]
            isOneToOne: false
            referencedRelation: "fees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_payments_received_by_fkey"
            columns: ["received_by"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_payments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          address: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string | null
          emergency_contact: string | null
          emergency_phone: string | null
          first_name: string
          gender: string | null
          id: string
          last_name: string
          medical_notes: string | null
          parent_email: string | null
          parent_name: string | null
          parent_phone: string | null
          phone: string | null
          student_number: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          emergency_contact?: string | null
          emergency_phone?: string | null
          first_name: string
          gender?: string | null
          id?: string
          last_name: string
          medical_notes?: string | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          phone?: string | null
          student_number: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          emergency_contact?: string | null
          emergency_phone?: string | null
          first_name?: string
          gender?: string | null
          id?: string
          last_name?: string
          medical_notes?: string | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          phone?: string | null
          student_number?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      subjects: {
        Row: {
          code: string
          color: string | null
          created_at: string
          id: string
          name: string
        }
        Insert: {
          code: string
          color?: string | null
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          code?: string
          color?: string | null
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      teachers: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          phone: string | null
          speciality: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          phone?: string | null
          speciality?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string | null
          speciality?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      time_slots: {
        Row: {
          created_at: string
          day_of_week: number
          end_time: string
          id: string
          period_name: string | null
          start_time: string
        }
        Insert: {
          created_at?: string
          day_of_week: number
          end_time: string
          id?: string
          period_name?: string | null
          start_time: string
        }
        Update: {
          created_at?: string
          day_of_week?: number
          end_time?: string
          id?: string
          period_name?: string | null
          start_time?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
