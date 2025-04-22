export enum VisitStatus {
    PLANNED = 'PLANNED',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
  }
  
  export enum FeedbackRating {
    ONE_STAR = 'ONE_STAR',
    TWO_STAR = 'TWO_STAR',
    THREE_STAR = 'THREE_STAR',
    FOUR_STAR = 'FOUR_STAR',
    FIVE_STAR = 'FIVE_STAR'
  }
  

export interface Visit {
  id: number;
  visitDate: string;
  location: string;
  status: VisitStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  responsible: Teacher;
  company: Company;
  feedbacksCount: number;
}


export interface Feedback {
  id: number;
  feedbackRating: FeedbackRating
  comment: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: 'ADMIN' | 'TEACHER' | 'STUDENT';
    lastLogin: string; 
    createdAt: string;
    updatedAt: string;
  }

export interface Company{
  id: number;
  name: string;
  address: string;
  contactEmail: string;
  contactPhone: string;
  expertiseDomain: string;
  relevanceScore: number;
  visitFrequency: number;
}

export interface Teacher{
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  lastLogin: string;
}