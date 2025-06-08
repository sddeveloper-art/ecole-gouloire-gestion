
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock, Mail, School, UserPlus, CheckCircle } from 'lucide-react';
import RegisterForm from './RegisterForm';

interface LoginFormProps {
  registrationSuccess?: boolean;
  userEmail?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ registrationSuccess, userEmail }) => {
  const [email, setEmail] = useState(userEmail || '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError(error);
    }

    setLoading(false);
  };

  if (showRegister) {
    return (
      <RegisterForm 
        onBackToLogin={() => setShowRegister(false)}
        onRegistrationSuccess={(email) => {
          setShowRegister(false);
          setEmail(email);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <School className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">EcoleManager</CardTitle>
          <CardDescription>
            Connexion Administrateur
          </CardDescription>
        </CardHeader>
        <CardContent>
          {registrationSuccess && (
            <Alert className="mb-4 border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Inscription réussie ! Vous pouvez maintenant vous connecter avec vos identifiants.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@ecole.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button
              variant="ghost"
              onClick={() => setShowRegister(true)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Créer un nouveau compte administrateur
            </Button>
          </div>

          <div className="mt-4 text-center text-sm text-gray-500">
            <p>Accès réservé aux administrateurs autorisés</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
