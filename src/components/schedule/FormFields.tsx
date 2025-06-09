
import React from 'react';
import { UseFormRegister, UseFormSetValue, UseFormWatch, FieldErrors } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScheduleFormData, Subject, Class, Teacher, Classroom } from '@/types/schedule';

interface FormFieldsProps {
  register: UseFormRegister<ScheduleFormData>;
  setValue: UseFormSetValue<ScheduleFormData>;
  watch: UseFormWatch<ScheduleFormData>;
  errors: FieldErrors<ScheduleFormData>;
  subjects: Subject[];
  classes: Class[];
  teachers: Teacher[];
  classrooms: Classroom[];
}

const FormFields: React.FC<FormFieldsProps> = ({
  register,
  setValue,
  watch,
  errors,
  subjects,
  classes,
  teachers,
  classrooms,
}) => {
  const watchedValues = watch();

  return (
    <>
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
    </>
  );
};

export default FormFields;
