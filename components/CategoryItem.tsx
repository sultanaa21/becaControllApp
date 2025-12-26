
import React from 'react';
import { Category } from '../types';

interface CategoryItemProps {
  category: Category;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
  const percentage = Math.min((category.spent / category.budget) * 100, 100);
  const remaining = category.budget - category.spent;
  
  const getStatusColor = () => {
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 80) return 'bg-orange-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="p-4 bg-white rounded-xl border border-slate-50 hover:border-slate-200 transition-all">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{category.emoji}</span>
          <span className="font-semibold text-slate-700">{category.name}</span>
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${percentage >= 100 ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'}`}>
          {percentage.toFixed(0)}%
        </span>
      </div>
      
      <div className="w-full bg-slate-100 rounded-full h-2 mb-2 overflow-hidden">
        <div 
          className={`h-full transition-all duration-500 ${getStatusColor()}`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-slate-500">
        <span>Gastado: {category.spent.toFixed(2)}€</span>
        <span className="font-medium text-slate-900">Quedan: {remaining.toFixed(2)}€</span>
      </div>
    </div>
  );
};

export default CategoryItem;
