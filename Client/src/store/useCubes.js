import {create} from 'zustand';

const useCubeStore = create((set) => ({
  cubes: [],
  setCubes: (cubes) => set({ cubes }),
}));

export default useCubeStore;