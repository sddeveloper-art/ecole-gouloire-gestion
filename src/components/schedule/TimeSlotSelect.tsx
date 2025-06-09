
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TimeSlot } from '@/types/schedule';
import { daysOfWeek } from './constants';

interface TimeSlotSelectProps {
  timeSlots: TimeSlot[];
  value: string;
  onValueChange: (value: string) => void;
}

const TimeSlotSelect: React.FC<TimeSlotSelectProps> = ({
  timeSlots,
  value,
  onValueChange,
}) => {
  const groupedTimeSlots = timeSlots.reduce((acc, slot) => {
    const day = slot.day_of_week;
    if (!acc[day]) acc[day] = [];
    acc[day].push(slot);
    return acc;
  }, {} as Record<number, typeof timeSlots>);

  return (
    <div className="space-y-2">
      <Label htmlFor="time_slot_id">Créneau horaire *</Label>
      <Select value={value} onValueChange={onValueChange}>
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
  );
};

export default TimeSlotSelect;
