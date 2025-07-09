export interface Income {
  id?: number;
  title: string;
  source?: string;
  amount: number;
  collection_sin?: string;
  collection_date?: string;
  created_at?: string;
  income_type: string;
  income_document?: string;
  file?: File | null
  note?: string;
}
