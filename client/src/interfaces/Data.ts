export interface TransactionItem {
  _id: number;
  text: string;
  amount: number;
}

export interface State {
  transactions: TransactionItem[];
  deleteTransaction: (id: number) => void;
  addTransaction: (item: TransactionItem) => void;
  getTransactions: () => void;
  error: any;
  loading: boolean;
}
