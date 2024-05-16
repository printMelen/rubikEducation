import  {create} from 'zustand';

const useSolve = create((set) => ({
  solve: false, // Estado inicial
  setSolve: (newSolve) => set({ solve: newSolve }), // Función para cambiar el estado
}));

export default useSolve;