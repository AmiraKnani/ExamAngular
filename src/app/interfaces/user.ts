export interface User {
    id: number;
    prenom: string;
    nom: string;
    email: string;
    password: string;
    profile?: string;
    valide: boolean;
  }
  