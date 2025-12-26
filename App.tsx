
import React, { useState, useMemo } from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend 
} from 'recharts';
import { 
  Wallet, TrendingDown, CheckCircle, Plus, 
  ChevronRight, Calendar, PiggyBank, Briefcase
} from 'lucide-react';
import { Category, Transaction } from './types';
import { INITIAL_CATEGORIES, INITIAL_TRANSACTIONS } from './constants';
import StatCard from './components/StatCard';
import CategoryItem from './components/CategoryItem';
import TransactionTable from './components/TransactionTable';
import AIInsights from './components/AIInsights';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#64748b'];

const App: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [showAddForm, setShowAddForm] = useState(false);

  // Stats Calculation
  const stats = useMemo(() => {
    const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0);
    const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);
    return {
      totalBudget,
      totalSpent,
      totalRemaining: totalBudget - totalSpent
    };
  }, [categories, transactions]);

  // Chart Data Preparation
  const chartData = useMemo(() => {
    return categories.map(cat => ({
      name: cat.name,
      value: cat.spent,
      budget: cat.budget
    })).filter(d => d.value > 0);
  }, [categories]);

  const barChartData = useMemo(() => {
    return categories.map(cat => ({
      name: cat.name,
      Presupuesto: cat.budget,
      Gastado: cat.spent
    }));
  }, [categories]);

  // Handle adding new expense
  const handleAddExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const amount = parseFloat(formData.get('amount') as string);
    const categoryId = formData.get('category') as string;
    const description = formData.get('description') as string;

    if (!amount || !categoryId || !description) return;

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      description,
      categoryId,
      amount
    };

    setTransactions([newTransaction, ...transactions]);
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId 
        ? { ...cat, spent: cat.spent + amount } 
        : cat
    ));
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen pb-20 lg:pb-12 bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-600">
            <PiggyBank size={28} strokeWidth={2.5} />
            <h1 className="text-xl font-black uppercase tracking-tighter">TU BECA</h1>
          </div>
          <button 
            onClick={() => setShowAddForm(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-full shadow-md shadow-emerald-200 transition-all active:scale-95 md:px-4 md:py-2 md:rounded-xl md:flex md:items-center md:gap-2"
          >
            <Plus size={20} />
            <span className="hidden md:inline font-semibold">Gasto</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* Top Overview Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            label="Dinero Total" 
            value={`${stats.totalBudget.toLocaleString()}€`} 
            colorClass="bg-blue-50 text-blue-600"
            icon={<Wallet size={24} />}
          />
          <StatCard 
            label="Dinero Gastado" 
            value={`${stats.totalSpent.toLocaleString()}€`} 
            subValue={`Queda el ${((stats.totalRemaining / stats.totalBudget) * 100).toFixed(1)}%`}
            colorClass="bg-red-50 text-red-600"
            icon={<TrendingDown size={24} />}
          />
          <StatCard 
            label="Dinero Disponible" 
            value={`${stats.totalRemaining.toLocaleString()}€`} 
            colorClass="bg-emerald-50 text-emerald-600"
            icon={<CheckCircle size={24} />}
          />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content (Left/Center) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Visualizations */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Briefcase className="text-blue-500" size={20} />
                Distribución del Presupuesto
              </h2>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" tick={{fontSize: 12, fill: '#64748b'}} />
                    <YAxis tick={{fontSize: 12, fill: '#64748b'}} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      cursor={{ fill: '#f1f5f9' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                    <Bar dataKey="Presupuesto" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Gastado" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/* Transactions List */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="text-indigo-500" size={20} />
                  Transacciones Recientes
                </h2>
                <button className="text-sm font-semibold text-emerald-600 flex items-center gap-1 hover:text-emerald-700 transition-colors">
                  Ver todo <ChevronRight size={16} />
                </button>
              </div>
              <div className="p-2">
                <TransactionTable transactions={transactions} categories={categories} />
              </div>
            </section>
          </div>

          {/* Sidebar Content (Right) */}
          <div className="space-y-8">
            {/* AI Advisor Component */}
            <AIInsights categories={categories} transactions={transactions} />

            {/* Category Breakdown List */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Por Categorías</h2>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <CategoryItem key={cat.id} category={cat} />
                ))}
              </div>
            </section>

            {/* Mini Spending Pie Chart */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 mb-4 text-center">Gasto Actual</h2>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {chartData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-[10px] text-slate-500 truncate">{entry.name}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Add Expense Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-2xl animate-in zoom-in duration-200">
            <h3 className="text-2xl font-bold mb-6 text-slate-900">Añadir Nuevo Gasto</h3>
            <form onSubmit={handleAddExpense} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Descripción</label>
                <input 
                  name="description" 
                  type="text" 
                  required 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                  placeholder="Ej: Netflix, Cena, etc."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Categoría</label>
                  <select 
                    name="category" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.emoji} {cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Importe (€)</label>
                  <input 
                    name="amount" 
                    type="number" 
                    step="0.01" 
                    required 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-3 font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="flex-1 px-4 py-3 font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all active:scale-95"
                >
                  Guardar Gasto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Persistent Call to Action (Mobile) */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-emerald-600 text-white p-4 rounded-full shadow-xl shadow-emerald-300 active:scale-90 transition-transform"
        >
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
};

export default App;
