
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Schedule, ScheduleFormData } from '@/types/schedule';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useSubjects, useClasses, useTeachers, useClassrooms, useTimeSlots } from '@/hooks/useScheduleData';

interface ScheduleFormProps {
  schedule?: Schedule;
  onSubmit: (data: ScheduleFormData) => void;
  onCancel: () => void;
}

const ScheduleForm: React.FC<ScheduleFormProps> = ({ schedule, onSubmit, onCancel }) => {
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<ScheduleFormData>();
  
  const { data: subjects = [] } = useSubjects();
  const { data: classes = [] } = useClasses();
  const { data: teachers = [] } = useTeachers();
  const { data: classrooms = [] } = useClassrooms();
  const { data: timeSlots = [] } = useTimeSlots();

  const watchedValues = watch();

  useEffect(() => {
    if (schedule) {
      reset({
        class_id: schedule.class_id,
        subject_id: schedule.subject_id,
        teacher_id: schedule.teacher_id,
        classroom_id: schedule.classroom_id,
        time_slot_id: schedule.time_slot_id,
        academic_year: schedule.academic_year,
        semester: schedule.semester,
        start_date: schedule.start_date,
        end_date: schedule.end_date,
        notes: schedule.notes || '',
      });
    } else {
      reset({
        academic_year: '2024-2025',
        semester: 1,
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        notes: '',
      });
    }
  }, [schedule, reset]);

  const daysOfWeek = {
    1: 'Lundi',
    2: 'Mardi', 
    3: 'Mercredi',
    4: 'Jeudi',
    5: 'Vendredi',
    6: 'Samedi',
    7: 'Dimanche'
  };

  const groupedTimeSlots = timeSlots.reduce((acc, slot) => {
    const day = slot.day_of_week;
    if (!acc[day]) acc[day] = [];
    acc[day].push(slot);
    return acc;
  }, {} as Record<number, typeof timeSlots>);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {schedule ? 'Modifier le cours' : 'Ajouter un nouveau cours'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="class_id">Classe *</Label>
              <Select value={watchedValues.class_id} onValueChange={(value) => setValue('class_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une classe" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((classe) => (
                    <SelectItem key={classe.id} value={classe.id}>
                      {classe.name} ({classe.level})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject_id">Matière *</Label>
              <Select value={watchedValues.subject_id} onValueChange={(value) => setValue('subject_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une matière" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: subject.color }}
                        />
                        {subject.name} ({subject.code})
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="teacher_id">Enseignant *</Label>
              <Select value={watchedValues.teacher_id} onValueChange={(value) => setValue('teacher_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un enseignant" />
                </SelectTrigger>
                <SelectContent>
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher.id} value={teacher.id}>
                      {teacher.first_name} {teacher.last_name}
                      {teacher.speciality && (
                        <span className="text-gray-500 ml-2">({teacher.speciality})</span>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="classroom_id">Salle *</Label>
              <Select value={watchedValues.classroom_id} onValueChange={(value) => setValue('classroom_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une salle" />
                </SelectTrigger>
                <SelectContent>
                  {classrooms.map((classroom) => (
                    <SelectItem key={classroom.id} value={classroom.id}>
                      {classroom.name} ({classroom.type})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time_slot_id">Créneau horaire *</Label>
            <Select value={watchedValues.time_slot_id} onValueChange={(value) => setValue('time_slot_id', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un créneau" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(groupedTimeSlots)
                  .filter(([day]) => parseInt(day) >= 1 && parseInt(day) <= 7)
                  .map(([day, slots]) => (
                  <div key={day}>
                    <div className="px-2 py-1 text-sm font-semibold text-gray-500 bg-gray-100">
                      {daysOfWeek[parseInt(day) as keyof typeof daysOfWeek]}
                    </div>
                    {slots.map((slot) => (
                      <SelectItem key={slot.id} value={slot.id}>
                        {slot.start_time} - {slot.end_time} 
                        {slot.period_name && ` (${slot.period_name})`}
                      </SelectItem>
                    ))}
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="academic_year">Année scolaire</Label>
              <Input
                {...register('academic_year')}
                placeholder="2024-2025"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="semester">Semestre</Label>
              <Select value={watchedValues.semester?.toString()} onValueChange={(value) => setValue('semester', parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Semestre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Semestre 1</SelectItem>
                  <SelectItem value="2">Semestre 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_date">Date de début *</Label>
              <Input
                type="date"
                {...register('start_date', { required: 'La date de début est requise' })}
              />
              {errors.start_date && (
                <p className="text-red-500 text-sm">{errors.start_date.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="end_date">Date de fin *</Label>
              <Input
                type="date"
                {...register('end_date', { required: 'La date de fin est requise' })}
              />
              {errors.end_date && (
                <p className="text-red-500 text-sm">{errors.end_date.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              {...register('notes')}
              placeholder="Notes ou commentaires sur ce cours..."
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit">
              {schedule ? 'Modifier' : 'Ajouter'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Annuler
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ScheduleForm;
