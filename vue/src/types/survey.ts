export interface Survey {
  id?: number;
  title: string;
  slug?: string;
  status: boolean;
  description?: string;
  image: string;
  expire_date?: Date;
  questions: any[];
}
