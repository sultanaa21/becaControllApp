
import React, { useState } from 'react';
import { analyzeBudget } from '../geminiService';
import { Category, Transaction } from '../types';

interface AIInsightsProps {
  categories: Category[];
  transactions: Transaction[];
}

const AIInsights: React.FC<AIInsightsProps> = ({ categories, transactions }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getAIAdvice = async () => {
    setLoading(true);
    const result = await analyzeBudget(categories, transactions);
    setInsight(result || "Error al obtener feedback.");
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
        </svg>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-indigo-500/20 p-2 rounded-lg">
            <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold">Consejos de IA</h2>
        </div>

        {!insight && !loading && (
          <div className="space-y-4">
            <p className="text-indigo-200 text-sm">¿Quieres saber qué opina nuestra IA sobre tus gastos de beca? Analizaremos tus categorías y compras recientes para darte consejos personalizados.</p>
            <button 
              onClick={getAIAdvice}
              className="bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-2.5 rounded-xl font-semibold transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-indigo-500/25"
            >
              Analizar mi Presupuesto
            </button>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mb-4"></div>
            <p className="text-sm text-indigo-300 animate-pulse">Consultando con Gemini...</p>
          </div>
        )}

        {insight && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="prose prose-invert prose-sm max-w-none">
              {insight.split('\n').map((line, i) => (
                <p key={i} className="text-indigo-100 leading-relaxed mb-2 last:mb-0">
                  {line}
                </p>
              ))}
            </div>
            <button 
              onClick={() => setInsight(null)}
              className="text-indigo-400 text-xs font-semibold hover:text-indigo-300 transition-colors uppercase tracking-widest mt-4"
            >
              Limpiar análisis
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsights;
