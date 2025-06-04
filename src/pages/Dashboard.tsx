
import { Users, GraduationCap, Calendar, CreditCard, FileText, Bell, Settings } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Dashboard = () => {
  const stats = [
    { title: 'Total Élèves', value: '1,234', icon: Users, color: 'bg-blue-500' },
    { title: 'Enseignants', value: '89', icon: GraduationCap, color: 'bg-green-500' },
    { title: 'Classes Actives', value: '45', icon: Calendar, color: 'bg-purple-500' },
    { title: 'Paiements en Attente', value: '12', icon: CreditCard, color: 'bg-orange-500' },
  ];

  const recentActivities = [
    { type: 'inscription', message: 'Nouvelle inscription: Marie Dubois en 6ème A', time: 'Il y a 2h' },
    { type: 'absence', message: 'Absence signalée: Jean Martin (5ème B)', time: 'Il y a 3h' },
    { type: 'paiement', message: 'Paiement reçu: Famille Leclerc', time: 'Il y a 5h' },
    { type: 'note', message: 'Notes publiées pour la classe 4ème C', time: 'Il y a 1 jour' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tableau de Bord</h1>
        <div className="flex items-center space-x-2">
          <Bell className="h-6 w-6 text-gray-500" />
          <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">3</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Activités Récentes</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Alertes & Notifications</h2>
          <div className="space-y-3">
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">3 paiements en retard nécessitent un suivi</p>
            </div>
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">5 enseignants absents aujourd'hui</p>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">Réunion parents-professeurs dans 3 jours</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
