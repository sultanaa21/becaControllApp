
export interface Category {
  id: string;
  name: string;
  emoji: string;
  budget: number;
  spent: number;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  categoryId: string;
  amount: number;
}

export interface BudgetStats {
  totalBudget: number;
  totalSpent: number;
  totalRemaining: number;
}
