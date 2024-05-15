import  {create} from 'zustand';

const useMoves = create((set) => ({
  movimientos: '', // Estado inicial
  setMovimientos: (newMovimientos) => set({ movimientos: newMovimientos }), // Función para cambiar el estado
}));

export default useMoves;