
import React from 'react';
import { Schedule, TimeSlot } from '@/types/schedule';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, MapPin, User, GraduationCap } from 'lucide-react';

interface ScheduleGridProps {
  schedules: Schedule[];
  timeSlots: TimeSlot[];
  onEditSchedule: (schedule: Schedule) => void;
  onDeleteSchedule: (id: string) => void;
  selectedClass?: string;
}

const ScheduleGrid: React.FC<ScheduleGridProps> = ({
  schedules,
  timeSlots,
  onEditSchedule,
  onDeleteSchedule,
  selectedClass,
}) => {
  const daysOfWeek = [
    { id: 1, name: 'Lundi' },
    { id: 2, name: 'Mardi' },
    { id: 3, name: 'Mercredi' },
    { id: 4, name: 'Jeudi' },
    { id: 5, name: 'Vendredi' },
  ];

  // Filtrer les créneaux pour les jours de semaine seulement
  const weekTimeSlots = timeSlots.filter(slot => slot.day_of_week <= 5);

  // Grouper les créneaux par heure
  const timesByPeriod = weekTimeSlots.reduce((acc, slot) => {
    const key = `${slot.start_time}-${slot.end_time}`;
    if (!acc[key]) {
      acc[key] = {
        start_time: slot.start_time,
        end_time: slot.end_time,
        period_name: slot.period_name,
        slots: []
      };
    }
    acc[key].slots.push(slot);
    return acc;
  }, {} as Record<string, { start_time: string; end_time: string; period_name?: string; slots: TimeSlot[] }>);

  const periods = Object.values(timesByPeriod).sort((a, b) => 
    a.start_time.localeCompare(b.start_time)
  );

  // Filtrer les emplois du temps selon la classe sélectionnée
  const filteredSchedules = selectedClass 
    ? schedules.filter(schedule => schedule.class_id === selectedClass)
    : schedules;

  const getScheduleForSlot = (dayId: number, startTime: string, endTime: string) => {
    const timeSlot = weekTimeSlots.find(
      slot => slot.day_of_week === dayId && 
              slot.start_time === startTime && 
              slot.end_time === endTime
    );
    
    if (!timeSlot) return null;

    return filteredSchedules.find(schedule => schedule.time_slot_id === timeSlot.id);
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-full">
        <div className="grid grid-cols-6 gap-2">
          {/* En-tête avec les heures */}
          <div className="font-semibold text-center p-3 bg-gray-100 rounded-lg">
            Horaires
          </div>
          {daysOfWeek.map(day => (
            <div key={day.id} className="font-semibold text-center p-3 bg-gray-100 rounded-lg">
              {day.name}
            </div>
          ))}

          {/* Lignes pour chaque période */}
          {periods.map((period, periodIndex) => (
            <React.Fragment key={periodIndex}>
              {/* Colonne des heures */}
              <div className="p-3 bg-gray-50 rounded-lg text-center text-sm">
                <div className="font-medium">{period.period_name}</div>
                <div className="text-xs text-gray-600">
                  {period.start_time} - {period.end_time}
                </div>
              </div>

              {/* Colonnes pour chaque jour */}
              {daysOfWeek.map(day => {
                const schedule = getScheduleForSlot(day.id, period.start_time, period.end_time);
                
                return (
                  <div key={`${day.id}-${periodIndex}`} className="p-1">
                    {schedule ? (
                      <Card className="p-3 h-full border-l-4 hover:shadow-md transition-shadow"
                            style={{ borderLeftColor: schedule.subjects?.color || '#3B82F6' }}>
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <Badge 
                              variant="secondary" 
                              className="text-xs"
                              style={{ 
                                backgroundColor: schedule.subjects?.color + '20',
                                color: schedule.subjects?.color 
                              }}
                            >
                              {schedule.subjects?.code}
                            </Badge>
                            <div className="flex gap-1">
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-6 w-6 p-0"
                                onClick={() => onEditSchedule(schedule)}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-6 w-6 p-0 text-red-500 hover:text-red-600"
                                onClick={() => onDeleteSchedule(schedule.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="text-xs space-y-1">
                            <div className="font-medium">{schedule.subjects?.name}</div>
                            <div className="flex items-center gap-1 text-gray-600">
                              <GraduationCap className="h-3 w-3" />
                              {schedule.classes?.name}
                            </div>
                            <div className="flex items-center gap-1 text-gray-600">
                              <User className="h-3 w-3" />
                              {schedule.teachers?.first_name} {schedule.teachers?.last_name}
                            </div>
                            <div className="flex items-center gap-1 text-gray-600">
                              <MapPin className="h-3 w-3" />
                              {schedule.classrooms?.name}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ) : (
                      <div className="h-24 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                        Libre
                      </div>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleGrid;
