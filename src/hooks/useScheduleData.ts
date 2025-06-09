
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Schedule, Subject, Class, Teacher, Classroom, TimeSlot, ScheduleFormData } from '@/types/schedule';
import { toast } from 'sonner';

export const useSchedules = () => {
  return useQuery({
    queryKey: ['schedules'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('schedules')
        .select(`
          *,
          classes(*),
          subjects(*),
          teachers(*),
          classrooms(*),
          time_slots(*)
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as unknown as Schedule[];
    },
  });
};

export const useSubjects = () => {
  return useQuery({
    queryKey: ['subjects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subjects')
        .select('*')
        .order('name');

      if (error) throw error;
      return data as Subject[];
    },
  });
};

export const useClasses = () => {
  return useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('classes')
        .select('*')
        .order('level', { ascending: true });

      if (error) throw error;
      return data as Class[];
    },
  });
};

export const useTeachers = () => {
  return useQuery({
    queryKey: ['teachers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .order('last_name');

      if (error) throw error;
      return data as Teacher[];
    },
  });
};

export const useClassrooms = () => {
  return useQuery({
    queryKey: ['classrooms'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('classrooms')
        .select('*')
        .order('name');

      if (error) throw error;
      return data as Classroom[];
    },
  });
};

export const useTimeSlots = () => {
  return useQuery({
    queryKey: ['time_slots'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('time_slots')
        .select('*')
        .order('day_of_week', { ascending: true })
        .order('start_time', { ascending: true });

      if (error) throw error;
      return data as TimeSlot[];
    },
  });
};

export const useCreateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (scheduleData: ScheduleFormData) => {
      const { data, error } = await supabase
        .from('schedules')
        .insert([scheduleData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      toast.success('Cours ajouté avec succès');
    },
    onError: (error) => {
      console.error('Erreur lors de la création du cours:', error);
      toast.error('Erreur lors de la création du cours');
    },
  });
};

export const useUpdateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...scheduleData }: ScheduleFormData & { id: string }) => {
      const { data, error } = await supabase
        .from('schedules')
        .update({ ...scheduleData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      toast.success('Cours modifié avec succès');
    },
    onError: (error) => {
      console.error('Erreur lors de la modification du cours:', error);
      toast.error('Erreur lors de la modification du cours');
    },
  });
};

export const useDeleteSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('schedules')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      toast.success('Cours supprimé avec succès');
    },
    onError: (error) => {
      console.error('Erreur lors de la suppression du cours:', error);
      toast.error('Erreur lors de la suppression du cours');
    },
  });
};
