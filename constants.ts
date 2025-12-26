
import { Category, Transaction } from './types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'gym', name: 'Gym', emoji: '🏋️', budget: 80, spent: 0 },
  { id: 'juegos', name: 'Juegos', emoji: '🎮', budget: 60, spent: 60 },
  { id: 'ropa', name: 'Ropa', emoji: '👕', budget: 600, spent: 0 },
  { id: 'portatil', name: 'Portátil', emoji: '💻', budget: 600, spent: 0 },
  { id: 'comida', name: 'Comida', emoji: '🍔', budget: 100, spent: 0 },
  { id: 'ocio', name: 'Ocio', emoji: '🎉', budget: 60, spent: 0 },
  { id: 'reventa', name: 'Reventa', emoji: '♻️', budget: 100, spent: 0 },
  { id: 'otros', name: 'Otros', emoji: '❓', budget: 100, spent: 2.95 },
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', date: '2025-12-23', description: 'Detroit: Become Human', categoryId: 'juegos', amount: 3.99 },
  { id: '2', date: '2025-12-23', description: 'Cyberpunk 2077', categoryId: 'juegos', amount: 20.99 },
  { id: '3', date: '2025-12-23', description: 'Red Dead Redemption 2', categoryId: 'juegos', amount: 19.99 },
  { id: '4', date: '2025-12-23', description: 'The Witcher 3: Wild Hunt', categoryId: 'juegos', amount: 2.99 },
  { id: '5', date: '2025-12-23', description: 'Grand Theft Auto V Enhanced (Part 1)', categoryId: 'juegos', amount: 12.04 },
  { id: '6', date: '2025-12-23', description: 'Grand Theft Auto V Enhanced (Part 2)', categoryId: 'otros', amount: 2.95 },
];

export const APP_THEME = {
  primary: '#10b981', // Emerald 500
  secondary: '#3b82f6', // Blue 500
  background: '#f8fafc',
};
