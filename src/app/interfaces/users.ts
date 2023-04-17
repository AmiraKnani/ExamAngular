export interface Users {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    password: string;
    profile?: 'admin' | 'user';
    valide: string;
  }