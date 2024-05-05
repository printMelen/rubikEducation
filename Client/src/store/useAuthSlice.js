import { createStore } from 'zustand';

// Creamos el store de Zustand para el slice de autenticación
const useAuthSlice = createStore((set) => ({
  token: null, // Estado inicial
  
  // Acción para establecer las credenciales
  isAuthenticated: () => {
    const accessToken = getCookie('accessToken');
    set({ accessToken });
    return !!accessToken; // Devuelve true si accessToken existe, de lo contrario, devuelve false
  },
  setCredentials: (accessToken) => {
    set({ token: accessToken });
  },

  // Acción para cerrar sesión
  logOut: () => {
    set({ token: null });
  },
}));
// Función para obtener el valor de una cookie por nombre
function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${name}=`)) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

export const { setCredentials, logOut } = useAuthSlice;

export const selectCurrentToken = (state) => state.token;
