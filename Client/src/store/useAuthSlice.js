import { createStore } from 'zustand';

// Creamos el store de Zustand para el slice de autenticación
const useAuthSlice = createStore((set) => ({
  token: null, // Estado inicial
  
  // Acción para establecer las credenciales
  setCredentials: (accessToken) => {
    set({ token: accessToken });
  },

  // Acción para cerrar sesión
  logOut: () => {
    set({ token: null });
  },
}));

export const { setCredentials, logOut } = useAuthSlice;

export const selectCurrentToken = (state) => state.token;
