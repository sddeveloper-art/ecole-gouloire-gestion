
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

export interface Student {
  id: string;
  user_id?: string;
  student_number: string;
  first_name: string;
  last_name: string;
  date_of_birth?: string;
  gender?: string;
  email?: string;
  phone?: string;
  address?: string;
  parent_name?: string;
  parent_phone?: string;
  parent_email?: string;
  emergency_contact?: string;
  emergency_phone?: string;
  medical_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface StudentEnrollment {
  id: string;
  student_id: string;
  class_id: string;
  academic_year: string;
  enrollment_date: string;
  status: 'active' | 'inactive' | 'transferred' | 'graduated';
  created_at: string;
  // Relations
  students?: Student;
  classes?: Class;
}

export interface Grade {
  id: string;
  student_id: string;
  subject_id: string;
  teacher_id: string;
  class_id: string;
  grade_value: number;
  max_grade: number;
  grade_type: 'controle' | 'devoir' | 'examen' | 'participation' | 'projet';
  grade_date: string;
  academic_year: string;
  semester: number;
  comments?: string;
  created_at: string;
  updated_at: string;
  // Relations
  students?: Student;
  subjects?: Subject;
  teachers?: Teacher;
  classes?: Class;
}

export interface Attendance {
  id: string;
  student_id: string;
  schedule_id: string;
  attendance_date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  arrival_time?: string;
  departure_time?: string;
  notes?: string;
  recorded_by?: string;
  created_at: string;
  // Relations
  students?: Student;
  schedules?: Schedule;
  teachers?: Teacher;
}

export interface Fee {
  id: string;
  name: string;
  description?: string;
  amount: number;
  fee_type: 'scolarite' | 'inscription' | 'transport' | 'cantine' | 'activite' | 'autre';
  academic_year: string;
  due_date?: string;
  is_active: boolean;
  created_at: string;
}

export interface StudentPayment {
  id: string;
  student_id: string;
  fee_id: string;
  amount_paid: number;
  payment_date: string;
  payment_method: 'especes' | 'cheque' | 'virement' | 'carte';
  reference_number?: string;
  status: 'pending' | 'completed' | 'cancelled' | 'refunded';
  notes?: string;
  received_by?: string;
  created_at: string;
  // Relations
  students?: Student;
  fees?: Fee;
  teachers?: Teacher;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  event_type: 'reunion' | 'examen' | 'vacances' | 'sortie' | 'conference' | 'autre';
  start_date: string;
  end_date?: string;
  start_time?: string;
  end_time?: string;
  location?: string;
  target_audience: 'all' | 'students' | 'teachers' | 'parents';
  is_mandatory: boolean;
  created_by?: string;
  created_at: string;
  updated_at: string;
  // Relations
  teachers?: Teacher;
}

export interface Notification {
  id: string;
  recipient_id: string;
  recipient_type: 'student' | 'teacher' | 'parent';
  title: string;
  message: string;
  notification_type: 'info' | 'warning' | 'urgent' | 'grade' | 'attendance' | 'payment';
  is_read: boolean;
  sent_at: string;
  read_at?: string;
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

export interface StudentFormData {
  student_number: string;
  first_name: string;
  last_name: string;
  date_of_birth?: string;
  gender?: string;
  email?: string;
  phone?: string;
  address?: string;
  parent_name?: string;
  parent_phone?: string;
  parent_email?: string;
  emergency_contact?: string;
  emergency_phone?: string;
  medical_notes?: string;
}

export interface GradeFormData {
  student_id: string;
  subject_id: string;
  teacher_id: string;
  class_id: string;
  grade_value: number;
  max_grade: number;
  grade_type: 'controle' | 'devoir' | 'examen' | 'participation' | 'projet';
  grade_date: string;
  academic_year: string;
  semester: number;
  comments?: string;
}
