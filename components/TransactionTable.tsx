
import React from 'react';
import { Transaction, Category } from '../types';

interface TransactionTableProps {
  transactions: Transaction[];
  categories: Category[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, categories }) => {
  const getCategoryEmoji = (id: string) => categories.find(c => c.id === id)?.emoji || '❓';
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="py-4 px-2 text-xs font-semibold text-slate-400 uppercase">Fecha</th>
            <th className="py-4 px-2 text-xs font-semibold text-slate-400 uppercase">Descripción</th>
            <th className="py-4 px-2 text-xs font-semibold text-slate-400 uppercase">Categoría</th>
            <th className="py-4 px-2 text-xs font-semibold text-slate-400 uppercase text-right">Importe</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {transactions.map((t) => (
            <tr key={t.id} className="hover:bg-slate-50 transition-colors group">
              <td className="py-4 px-2 text-sm text-slate-500">{new Date(t.date).toLocaleDateString()}</td>
              <td className="py-4 px-2 text-sm font-medium text-slate-700">{t.description}</td>
              <td className="py-4 px-2 text-sm">
                <span className="flex items-center gap-1">
                  <span>{getCategoryEmoji(t.categoryId)}</span>
                  <span className="capitalize text-slate-500">{t.categoryId}</span>
                </span>
              </td>
              <td className="py-4 px-2 text-sm font-bold text-slate-900 text-right">-{t.amount.toFixed(2)}€</td>
            </tr>
          ))}
          {transactions.length === 0 && (
            <tr>
              <td colSpan={4} className="py-8 text-center text-slate-400 italic">No hay transacciones registradas</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
