
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Calendar, User } from 'lucide-react';

interface GradeFormProps {
  onClose: () => void;
  onSave: () => void;
  grade?: any;
}

const GradeForm: React.FC<GradeFormProps> = ({ onClose, onSave, grade }) => {
  const [formData, setFormData] = useState({
    studentId: grade?.student_id || '',
    subjectId: grade?.subject_id || '',
    classId: grade?.class_id || '',
    gradeValue: grade?.grade_value || '',
    maxGrade: grade?.max_grade || '20',
    gradeType: grade?.grade_type || '',
    gradeDate: grade?.grade_date || new Date().toISOString().split('T')[0],
    comments: grade?.comments || '',
    semester: grade?.semester || '1',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement save logic
    console.log('Saving grade:', formData);
    onSave();
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {grade ? 'Modifier la note' : 'Nouvelle note'}
          </DialogTitle>
          <DialogDescription>
            Saisir une nouvelle note pour un élève
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-4 w-4" />
                Informations de l'évaluation
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="studentId">Élève *</Label>
                <Select value={formData.studentId} onValueChange={(value) => updateField('studentId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un élève" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Marie Dupont (6ème A)</SelectItem>
                    <SelectItem value="2">Pierre Martin (5ème B)</SelectItem>
                    <SelectItem value="3">Julie Leclerc (6ème A)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subjectId">Matière *</Label>
                <Select value={formData.subjectId} onValueChange={(value) => updateField('subjectId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une matière" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Mathématiques</SelectItem>
                    <SelectItem value="2">Français</SelectItem>
                    <SelectItem value="3">Histoire-Géographie</SelectItem>
                    <SelectItem value="4">Anglais</SelectItem>
                    <SelectItem value="5">Sciences Physiques</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="classId">Classe *</Label>
                <Select value={formData.classId} onValueChange={(value) => updateField('classId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une classe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">6ème A</SelectItem>
                    <SelectItem value="2">6ème B</SelectItem>
                    <SelectItem value="3">5ème A</SelectItem>
                    <SelectItem value="4">5ème B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="gradeType">Type d'évaluation *</Label>
                <Select value={formData.gradeType} onValueChange={(value) => updateField('gradeType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Type d'évaluation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="controle">Contrôle</SelectItem>
                    <SelectItem value="devoir_maison">Devoir maison</SelectItem>
                    <SelectItem value="interrogation">Interrogation</SelectItem>
                    <SelectItem value="examen">Examen</SelectItem>
                    <SelectItem value="participation">Participation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="gradeValue">Note obtenue *</Label>
                <Input
                  id="gradeValue"
                  type="number"
                  step="0.25"
                  min="0"
                  max={formData.maxGrade}
                  value={formData.gradeValue}
                  onChange={(e) => updateField('gradeValue', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="maxGrade">Note maximale *</Label>
                <Select value={formData.maxGrade} onValueChange={(value) => updateField('maxGrade', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="gradeDate">Date de l'évaluation *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="gradeDate"
                    type="date"
                    value={formData.gradeDate}
                    onChange={(e) => updateField('gradeDate', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="semester">Semestre *</Label>
                <Select value={formData.semester} onValueChange={(value) => updateField('semester', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1er Semestre</SelectItem>
                    <SelectItem value="2">2ème Semestre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="comments">Commentaires</Label>
                <Textarea
                  id="comments"
                  value={formData.comments}
                  onChange={(e) => updateField('comments', e.target.value)}
                  rows={3}
                  placeholder="Commentaires sur l'évaluation..."
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              {grade ? 'Modifier' : 'Créer'} la note
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GradeForm;
