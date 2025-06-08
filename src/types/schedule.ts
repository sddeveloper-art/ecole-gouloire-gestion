
export interface Subject {
  id: string;
  name: string;
  code: string;
  color: string;
  created_at: string;
}

export interface Class {
  id: string;
  name: string;
  level: string;
  capacity: number;
  created_at: string;
}

export interface Teacher {
  id: string;
  user_id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  speciality?: string;
  created_at: string;
}

export interface Classroom {
  id: string;
  name: string;
  capacity: number;
  type: string;
  equipment?: string[];
  created_at: string;
}

export interface TimeSlot {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  period_name?: string;
  created_at: string;
}

export interface Schedule {
  id: string;
  class_id: string;
  subject_id: string;
  teacher_id: string;
  classroom_id: string;
  time_slot_id: string;
  academic_year: string;
  semester: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
  notes?: string;
  created_at: string;
  updated_at: string;
  // Relations
  classes?: Class;
  subjects?: Subject;
  teachers?: Teacher;
  classrooms?: Classroom;
  time_slots?: TimeSlot;
}

export interface ScheduleFormData {
  class_id: string;
  subject_id: string;
  teacher_id: string;
  classroom_id: string;
  time_slot_id: string;
  academic_year?: string;
  semester?: number;
  start_date: string;
  end_date: string;
  notes?: string;
}
