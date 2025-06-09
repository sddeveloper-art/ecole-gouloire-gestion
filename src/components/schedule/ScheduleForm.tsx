
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Schedule, ScheduleFormData } from '@/types/schedule';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useSubjects, useClasses, useTeachers, useClassrooms, useTimeSlots } from '@/hooks/useScheduleData';
import FormFields from './FormFields';
import TimeSlotSelect from './TimeSlotSelect';

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

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {schedule ? 'Modifier le cours' : 'Ajouter un nouveau cours'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormFields
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
            subjects={subjects}
            classes={classes}
            teachers={teachers}
            classrooms={classrooms}
          />

          <TimeSlotSelect
            timeSlots={timeSlots}
            value={watchedValues.time_slot_id || ''}
            onValueChange={(value) => setValue('time_slot_id', value)}
          />

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
