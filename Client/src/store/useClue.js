import  {create} from 'zustand';

const useClue = create((set) => ({
  clue: false, // Estado inicial
  setClue: (newClue) => set({ clue: newClue }), // Función para cambiar el estado
}));

export default useClue;