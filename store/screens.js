import { create } from 'zustand';

const useStore = create((set) => ({
  title: 'Home', 
  setTitle: (newTitle) => set({ title: newTitle }),
}));

export default useStore;
