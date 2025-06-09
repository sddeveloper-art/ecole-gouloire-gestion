
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, XCircle, Database, Users, BookOpen, Calendar } from 'lucide-react';

interface TableStatus {
  name: string;
  exists: boolean;
  count?: number;
  error?: string;
}

const TestDatabase = () => {
  const [tableStatuses, setTableStatuses] = useState<TableStatus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testTables = async () => {
      const tables = [
        'classes',
        'subjects', 
        'teachers',
        'classrooms',
        'time_slots',
        'schedules',
        'students',
        'student_enrollments',
        'grades',
        'attendances',
        'fees',
        'student_payments',
        'events',
        'notifications'
      ];

      const statuses: TableStatus[] = [];

      for (const table of tables) {
        try {
          const { data, error, count } = await supabase
            .from(table)
            .select('*', { count: 'exact', head: true });

          if (error) {
            statuses.push({
              name: table,
              exists: false,
              error: error.message
            });
          } else {
            statuses.push({
              name: table,
              exists: true,
              count: count || 0
            });
          }
        } catch (err) {
          statuses.push({
            name: table,
            exists: false,
            error: 'Erreur de connexion'
          });
        }
      }

      setTableStatuses(statuses);
      setLoading(false);
    };

    testTables();
  }, []);

  const getTableIcon = (tableName: string) => {
    if (tableName.includes('student') || tableName === 'teachers') return Users;
    if (tableName.includes('subject') || tableName === 'grades') return BookOpen;
    if (tableName.includes('schedule') || tableName === 'time_slots') return Calendar;
    return Database;
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Test de la base de données en cours...</p>
        </div>
      </div>
    );
  }

  const successCount = tableStatuses.filter(status => status.exists).length;
  const totalCount = tableStatuses.length;
  const totalRecords = tableStatuses.reduce((sum, status) => sum + (status.count || 0), 0);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Database className="h-8 w-8 text-blue-600" />
          Test de la Base de Données
        </h1>
        <p className="text-gray-600 mt-2">
          Vérification de l'état des tables et données
        </p>
      </div>

      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{successCount}/{totalCount}</div>
                <div className="text-sm text-gray-600">Tables créées</div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">{totalRecords}</div>
                <div className="text-sm text-gray-600">Enregistrements totaux</div>
              </div>
              <Database className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round((successCount / totalCount) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Réussite</div>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* État détaillé des tables */}
      <Card>
        <CardHeader>
          <CardTitle>État des Tables</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tableStatuses.map((status) => {
              const Icon = getTableIcon(status.name);
              return (
                <div
                  key={status.name}
                  className={`p-4 rounded-lg border ${
                    status.exists 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className={`h-5 w-5 ${
                        status.exists ? 'text-green-600' : 'text-red-600'
                      }`} />
                      <span className="font-medium">{status.name}</span>
                    </div>
                    {status.exists ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  
                  {status.exists ? (
                    <div className="text-sm text-gray-600">
                      {status.count} enregistrement{status.count !== 1 ? 's' : ''}
                    </div>
                  ) : (
                    <div className="text-sm text-red-600">
                      {status.error || 'Table non trouvée'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Message de succès ou d'erreur */}
      {successCount === totalCount ? (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-green-800">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">
                Félicitations ! Toutes les tables ont été créées avec succès.
              </span>
            </div>
            <p className="text-green-700 mt-2 text-sm">
              Votre base de données est maintenant prête pour la gestion complète de votre établissement scolaire.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-orange-800">
              <XCircle className="h-5 w-5" />
              <span className="font-medium">
                Certaines tables n'ont pas pu être créées.
              </span>
            </div>
            <p className="text-orange-700 mt-2 text-sm">
              Vérifiez les erreurs ci-dessus et assurez-vous que la migration SQL a été exécutée correctement.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TestDatabase;
