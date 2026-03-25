import { create } from 'zustand';
import { Grade, Product } from '@/lib/mockData';

export interface CartItem {
  id: string; // Unique ID for the cart (productId + gradeLabel)
  product: Product;
  grade: Grade;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, grade: Grade) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleCart: () => void;
  getCartTotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  
  addItem: (product, grade) => set((state) => {
    const cartId = `${product.id}-${grade.label}`;
    const existing = state.items.find(i => i.id === cartId);
    
    if (existing) {
      return {
        items: state.items.map(i => 
          i.id === cartId ? { ...i, quantity: i.quantity + 1 } : i
        ),
        isOpen: true
      };
    }
    
    return {
      items: [...state.items, { id: cartId, product, grade, quantity: 1 }],
      isOpen: true
    };
  }),
  
  removeItem: (id) => set((state) => ({
    items: state.items.filter(i => i.id !== id)
  })),
  
  updateQuantity: (id, quantity) => set((state) => {
    if (quantity <= 0) {
      return { items: state.items.filter(i => i.id !== id) };
    }
    return {
      items: state.items.map(i => i.id === id ? { ...i, quantity } : i)
    }
  }),
  
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  
  getCartTotal: () => {
    return get().items.reduce((total, item) => total + (item.grade.price * item.quantity), 0);
  }
}));
