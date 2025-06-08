
import React, { useState } from 'react';
import { Plus, Calendar, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ScheduleGrid from '@/components/schedule/ScheduleGrid';
import ScheduleForm from '@/components/schedule/ScheduleForm';
import { 
  useSchedules, 
  useClasses, 
  useTimeSlots,
  useCreateSchedule,
  useUpdateSchedule,
  useDeleteSchedule
} from '@/hooks/useScheduleData';
import { Schedule, ScheduleFormData } from '@/types/schedule';

const SchedulePage = () => {
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | undefined>();

  const { data: schedules = [], isLoading: schedulesLoading } = useSchedules();
  const { data: classes = [] } = useClasses();
  const { data: timeSlots = [] } = useTimeSlots();
  
  const createScheduleMutation = useCreateSchedule();
  const updateScheduleMutation = useUpdateSchedule();
  const deleteScheduleMutation = useDeleteSchedule();

  const handleCreateSchedule = (data: ScheduleFormData) => {
    createScheduleMutation.mutate(data, {
      onSuccess: () => {
        setIsFormOpen(false);
        setEditingSchedule(undefined);
      },
    });
  };

  const handleUpdateSchedule = (data: ScheduleFormData) => {
    if (editingSchedule) {
      updateScheduleMutation.mutate(
        { ...data, id: editingSchedule.id },
        {
          onSuccess: () => {
            setIsFormOpen(false);
            setEditingSchedule(undefined);
          },
        }
      );
    }
  };

  const handleEditSchedule = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setIsFormOpen(true);
  };

  const handleDeleteSchedule = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
      deleteScheduleMutation.mutate(id);
    }
  };

  const handleFormSubmit = (data: ScheduleFormData) => {
    if (editingSchedule) {
      handleUpdateSchedule(data);
    } else {
      handleCreateSchedule(data);
    }
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingSchedule(undefined);
  };

  const handleNewSchedule = () => {
    setEditingSchedule(undefined);
    setIsFormOpen(true);
  };

  if (schedulesLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des emplois du temps...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Calendar className="h-8 w-8 text-blue-600" />
            Emplois du Temps
          </h1>
          <p className="text-gray-600 mt-2">
            Gérez et visualisez les emplois du temps de votre établissement
          </p>
        </div>

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleNewSchedule}>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un cours
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <ScheduleForm
              schedule={editingSchedule}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{schedules.length}</div>
            <div className="text-sm text-gray-600">Cours programmés</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{classes.length}</div>
            <div className="text-sm text-gray-600">Classes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {new Set(schedules.map(s => s.teacher_id)).size}
            </div>
            <div className="text-sm text-gray-600">Enseignants actifs</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">
              {new Set(schedules.map(s => s.classroom_id)).size}
            </div>
            <div className="text-sm text-gray-600">Salles utilisées</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtres
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="min-w-[200px]">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les classes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Toutes les classes</SelectItem>
                  {classes.map((classe) => (
                    <SelectItem key={classe.id} value={classe.id}>
                      {classe.name} ({classe.level})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grille des emplois du temps */}
      <Card>
        <CardHeader>
          <CardTitle>Planning de la semaine</CardTitle>
        </CardHeader>
        <CardContent>
          <ScheduleGrid
            schedules={schedules}
            timeSlots={timeSlots}
            onEditSchedule={handleEditSchedule}
            onDeleteSchedule={handleDeleteSchedule}
            selectedClass={selectedClass}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SchedulePage;
