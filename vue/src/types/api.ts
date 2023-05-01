export interface Api<T> {
  data: T;
}

export interface Pagination<T> {
  data: T[];
  links: {
    first: string;
    last: string;
    next?: string;
    prev?: string;
  };
  meta: {
    current_page: number;
    from?: number;
    last_page: number;
    links: any[];
    path: string;
    per_page: number;
    to?: number;
    total: number;
  };
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
}

export interface SurveyResponse {
  id: number;
  title: string;
  slug: string;
  status: 1 | 0;
  description?: string;
  expire_date?: string;
  questions: any[];
  created_at: string;
  updated_at: string;
}
