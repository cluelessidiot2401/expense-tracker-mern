import { TransactionItem } from "./Data";
export interface ApiResponse {
  success: boolean;
  error?: string[];
}
export interface GetTransactions extends ApiResponse {
  success: boolean;
  count: number;
  data: TransactionItem[];
}
