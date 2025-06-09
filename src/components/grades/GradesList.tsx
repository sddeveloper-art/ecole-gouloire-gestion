
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Eye, TrendingUp, TrendingDown } from 'lucide-react';

interface GradesListProps {
  searchTerm: string;
  selectedClass: string;
  selectedSubject: string;
}

const GradesList: React.FC<GradesListProps> = ({ searchTerm, selectedClass, selectedSubject }) => {
  // Mock data - à remplacer par de vraies données depuis Supabase
  const grades = [
    {
      id: '1',
      student_name: 'Marie Dupont',
      student_number: 'STU001',
      class_name: '6ème A',
      subject_name: 'Mathématiques',
      grade_value: 16.5,
      max_grade: 20,
      grade_type: 'Contrôle',
      grade_date: '2024-01-15',
      teacher_name: 'Sophie Dubois',
      comments: 'Très bon travail'
    },
    {
      id: '2',
      student_name: 'Pierre Martin',
      student_number: 'STU002',
      class_name: '5ème B',
      subject_name: 'Français',
      grade_value: 12,
      max_grade: 20,
      grade_type: 'Devoir maison',
      grade_date: '2024-01-14',
      teacher_name: 'Jean Martin',
      comments: 'Peut mieux faire'
    },
    {
      id: '3',
      student_name: 'Julie Leclerc',
      student_number: 'STU003',
      class_name: '6ème A',
      subject_name: 'Anglais',
      grade_value: 18,
      max_grade: 20,
      grade_type: 'Interrogation',
      grade_date: '2024-01-13',
      teacher_name: 'Marie Leclerc',
      comments: 'Excellent!'
    }
  ];

  const filteredGrades = grades.filter(grade => {
    const matchesSearch = grade.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grade.student_number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = !selectedClass || grade.class_name.includes(selectedClass);
    const matchesSubject = !selectedSubject || grade.subject_name.toLowerCase().includes(selectedSubject);
    
    return matchesSearch && matchesClass && matchesSubject;
  });

  const getGradeColor = (grade: number, maxGrade: number) => {
    const percentage = (grade / maxGrade) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getGradeBadge = (gradeType: string) => {
    const colors = {
      'Contrôle': 'bg-blue-100 text-blue-800',
      'Devoir maison': 'bg-green-100 text-green-800',
      'Interrogation': 'bg-purple-100 text-purple-800',
      'Examen': 'bg-red-100 text-red-800',
      'Participation': 'bg-yellow-100 text-yellow-800'
    };
    return colors[gradeType as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getTrendIcon = (grade: number, maxGrade: number) => {
    const percentage = (grade / maxGrade) * 100;
    if (percentage >= 60) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    }
    return <TrendingDown className="h-4 w-4 text-red-500" />;
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 font-medium">Élève</th>
                <th className="text-left p-4 font-medium">Classe</th>
                <th className="text-left p-4 font-medium">Matière</th>
                <th className="text-left p-4 font-medium">Note</th>
                <th className="text-left p-4 font-medium">Type</th>
                <th className="text-left p-4 font-medium">Date</th>
                <th className="text-left p-4 font-medium">Enseignant</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredGrades.map((grade) => (
                <tr key={grade.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div>
                      <div className="font-medium">{grade.student_name}</div>
                      <div className="text-sm text-gray-500">{grade.student_number}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline">{grade.class_name}</Badge>
                  </td>
                  <td className="p-4">
                    <span className="font-medium">{grade.subject_name}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-lg font-bold ${getGradeColor(grade.grade_value, grade.max_grade)}`}>
                        {grade.grade_value}/{grade.max_grade}
                      </span>
                      {getTrendIcon(grade.grade_value, grade.max_grade)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {((grade.grade_value / grade.max_grade) * 100).toFixed(1)}%
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge className={getGradeBadge(grade.grade_type)}>
                      {grade.grade_type}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <span className="text-sm">
                      {new Date(grade.grade_date).toLocaleDateString('fr-FR')}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm">{grade.teacher_name}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" title="Voir les détails">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" title="Modifier">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-800" title="Supprimer">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredGrades.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Aucune note trouvée
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GradesList;
