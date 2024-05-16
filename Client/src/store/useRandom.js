import  {create} from 'zustand';

const useRandom = create((set) => ({
  random: false, // Estado inicial
  setRandom: (newRandom) => set({ random: newRandom }), // Función para cambiar el estado
}));

export default useRandom;