export interface Cost {
  id?: number;
  title: string;
  voucher?: string;
  amount: number;
  entry_name?: string;
  cost_date?: string;
  cost_type: string;
  cost_document?: string;
  file?: File | null;
  note?: string;
}
