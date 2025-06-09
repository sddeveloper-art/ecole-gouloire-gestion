
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Eye, Phone, Mail, BookOpen } from 'lucide-react';

interface TeacherListProps {
  searchTerm: string;
}

const TeacherList: React.FC<TeacherListProps> = ({ searchTerm }) => {
  // Mock data - à remplacer par de vraies données depuis Supabase
  const teachers = [
    {
      id: '1',
      first_name: 'Sophie',
      last_name: 'Dubois',
      email: 'sophie.dubois@ecole.com',
      phone: '0123456789',
      speciality: 'Mathématiques',
      classes: ['6ème A', '6ème B', '5ème A'],
      status: 'active'
    },
    {
      id: '2',
      first_name: 'Jean',
      last_name: 'Martin',
      email: 'jean.martin@ecole.com',
      phone: '0123456790',
      speciality: 'Français',
      classes: ['5ème B', '4ème A'],
      status: 'active'
    },
    {
      id: '3',
      first_name: 'Marie',
      last_name: 'Leclerc',
      email: 'marie.leclerc@ecole.com',
      phone: '0123456791',
      speciality: 'Anglais',
      classes: ['6ème A', '5ème A', '4ème A'],
      status: 'active'
    }
  ];

  const filteredTeachers = teachers.filter(teacher =>
    teacher.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.speciality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Actif</Badge>;
      case 'inactive':
        return <Badge className="bg-red-100 text-red-800">Inactif</Badge>;
      case 'on_leave':
        return <Badge className="bg-orange-100 text-orange-800">En congé</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 font-medium">Enseignant</th>
                <th className="text-left p-4 font-medium">Spécialité</th>
                <th className="text-left p-4 font-medium">Classes</th>
                <th className="text-left p-4 font-medium">Contact</th>
                <th className="text-left p-4 font-medium">Statut</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.map((teacher) => (
                <tr key={teacher.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div>
                      <div className="font-medium">{teacher.first_name} {teacher.last_name}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {teacher.email}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline" className="flex items-center gap-1 w-fit">
                      <BookOpen className="h-3 w-3" />
                      {teacher.speciality}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {teacher.classes.map((className, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {className}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {teacher.phone}
                    </div>
                  </td>
                  <td className="p-4">
                    {getStatusBadge(teacher.status)}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredTeachers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Aucun enseignant trouvé
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TeacherList;
