
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Eye, Phone, Mail } from 'lucide-react';

interface StudentListProps {
  searchTerm: string;
}

const StudentList: React.FC<StudentListProps> = ({ searchTerm }) => {
  // Mock data - à remplacer par de vraies données depuis Supabase
  const students = [
    {
      id: '1',
      first_name: 'Marie',
      last_name: 'Dupont',
      student_number: 'STU001',
      email: 'marie.dupont@email.com',
      phone: '0123456789',
      class: '6ème A',
      status: 'active',
      parent_name: 'Jean Dupont',
      parent_phone: '0123456788'
    },
    {
      id: '2',
      first_name: 'Pierre',
      last_name: 'Martin',
      student_number: 'STU002',
      email: 'pierre.martin@email.com',
      phone: '0123456790',
      class: '5ème B',
      status: 'active',
      parent_name: 'Sophie Martin',
      parent_phone: '0123456791'
    },
    // Ajouter plus d'étudiants mock...
  ];

  const filteredStudents = students.filter(student =>
    student.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.student_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Actif</Badge>;
      case 'inactive':
        return <Badge className="bg-red-100 text-red-800">Inactif</Badge>;
      case 'pending':
        return <Badge className="bg-orange-100 text-orange-800">En attente</Badge>;
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
                <th className="text-left p-4 font-medium">Élève</th>
                <th className="text-left p-4 font-medium">N° Étudiant</th>
                <th className="text-left p-4 font-medium">Classe</th>
                <th className="text-left p-4 font-medium">Contact</th>
                <th className="text-left p-4 font-medium">Parent</th>
                <th className="text-left p-4 font-medium">Statut</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div>
                      <div className="font-medium">{student.first_name} {student.last_name}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {student.email}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-mono text-sm">{student.student_number}</span>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline">{student.class}</Badge>
                  </td>
                  <td className="p-4">
                    <div className="text-sm flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {student.phone}
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="text-sm font-medium">{student.parent_name}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {student.parent_phone}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    {getStatusBadge(student.status)}
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
        
        {filteredStudents.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Aucun élève trouvé
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StudentList;
