import  {create} from 'zustand';

const useAnimate = create((set) => ({
  animate: false, // Estado inicial
  setAnimate: (newClue) => set({ animate: newClue }), // Función para cambiar el estado
}));

export default useAnimate;