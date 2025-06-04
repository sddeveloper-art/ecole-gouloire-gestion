
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  GraduationCap, 
  Calendar, 
  CreditCard, 
  FileText, 
  MessageSquare,
  Settings,
  Home,
  ChevronDown,
  ChevronRight,
  UserCheck,
  ClipboardList,
  Phone
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (item: string) => {
    setExpandedItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const menuItems = [
    { 
      id: 'dashboard', 
      title: 'Tableau de Bord', 
      icon: Home, 
      path: '/dashboard' 
    },
    {
      id: 'students',
      title: 'Gestion Élèves',
      icon: Users,
      children: [
        { title: 'Liste des Élèves', path: '/students' },
        { title: 'Inscriptions', path: '/students/enrollment' },
        { title: 'Réinscriptions', path: '/students/re-enrollment' }
      ]
    },
    {
      id: 'teachers',
      title: 'Gestion Enseignants',
      icon: GraduationCap,
      children: [
        { title: 'Liste des Enseignants', path: '/teachers' },
        { title: 'Absences Enseignants', path: '/teachers/absences' }
      ]
    },
    {
      id: 'attendance',
      title: 'Absences & Retards',
      icon: UserCheck,
      children: [
        { title: 'Suivi Absences', path: '/attendance' },
        { title: 'Justifications', path: '/attendance/justifications' }
      ]
    },
    {
      id: 'grades',
      title: 'Notes & Bulletins',
      icon: FileText,
      children: [
        { title: 'Gestion des Notes', path: '/grades' },
        { title: 'Bulletins de Notes', path: '/grades/reports' },
        { title: 'Résultats Scolaires', path: '/grades/results' }
      ]
    },
    {
      id: 'schedule',
      title: 'Emplois du Temps',
      icon: Calendar,
      path: '/schedule'
    },
    {
      id: 'parents',
      title: 'Gestion Parents',
      icon: Users,
      path: '/parents'
    },
    {
      id: 'payments',
      title: 'Gestion Paiements',
      icon: CreditCard,
      children: [
        { title: 'Suivi Paiements', path: '/payments' },
        { title: 'Transactions', path: '/payments/transactions' },
        { title: 'Impayés', path: '/payments/overdue' }
      ]
    },
    {
      id: 'activities',
      title: 'Activités Parascolaires',
      icon: ClipboardList,
      path: '/activities'
    },
    {
      id: 'communication',
      title: 'Communication',
      icon: MessageSquare,
      children: [
        { title: 'Notifications', path: '/communication/notifications' },
        { title: 'Campagnes SMS', path: '/communication/sms' }
      ]
    },
    {
      id: 'settings',
      title: 'Paramètres',
      icon: Settings,
      path: '/settings'
    }
  ];

  const isActive = (path: string) => location.pathname === path;
  const isExpanded = (id: string) => expandedItems.includes(id);

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600">EcoleManager</h1>
        <p className="text-sm text-gray-500">Gestion Scolaire</p>
      </div>
      
      <nav className="px-4 space-y-1">
        {menuItems.map((item) => (
          <div key={item.id}>
            {item.children ? (
              <div>
                <button
                  onClick={() => toggleExpanded(item.id)}
                  className="w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{item.title}</span>
                  </div>
                  {isExpanded(item.id) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                {isExpanded(item.id) && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.children.map((child, index) => (
                      <Link
                        key={index}
                        to={child.path}
                        className={cn(
                          "block px-3 py-2 text-sm rounded-lg transition-colors",
                          isActive(child.path)
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-600 hover:bg-gray-100"
                        )}
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={item.path!}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                  isActive(item.path!)
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.title}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
