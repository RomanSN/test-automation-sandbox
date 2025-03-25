export interface Article {
  id: number;
  title: string;
  author: string;
  content: string;
  dateCreated: number;
}

export interface AxiosError {
  name: string;
  response: { 
    status: string;
    statusText: string; 
    data: { message: string } 
  };
}

export interface SortState {
  author: SortDirection;
  title: SortDirection;
}

export type SortType = 'author' | 'title';

export type SortDirection = 'asc' | 'desc' | 'default';
