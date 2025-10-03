export enum Status {
  Uploaded = 'Proyecto Subido',
  InReview = 'En Revisión',
  Approved = 'Aprobado',
}

export enum Category {
  Technology = 'Tecnología',
  Development = 'Desarrollo',
  Engineering = 'Ingeniería General',
}

export enum Campus {
  Lima = 'Sede Lima',
  Arequipa = 'Sede Arequipa',
  Cusco = 'Sede Cusco',
  Trujillo = 'Sede Trujillo',
  Piura = 'Sede Piura',
  Chiclayo = 'Sede Chiclayo'
}

export enum Role {
  Admin = "Admin",
  Student = "Student"
}

export interface User {
  username: string;
  role: Role;
}

export interface Author {
  name: string;
  description: string;
  avatarUrl: string;
}

export interface ApprovalHistory {
    status: Status;
    date: string;
}

export interface Comment {
    id: string;
    author: string;
    text: string;
    timestamp: string;
    replies?: Comment[];
}

export interface Project {
  id: number;
  title: string;
  author: string;
  campus: Campus;
  category: Category;
  status: Status;
  problem: string;
  technologies: string[];
  expectedImpact: string;
  description: string;
  githubUrl: string;
  views: number;
  rating: number;
  ratingsCount: number;
  submissionDate: string;
  approvalHistory: ApprovalHistory[];
  comments?: Comment[];
}