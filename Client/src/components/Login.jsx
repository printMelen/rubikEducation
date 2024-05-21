// En esta parte se importan los archivos necesarios para el correcto funcionamiento del componente.
// useEffect sirve para ejecutar determinado codigo cuando una variable en concreto cambia
// useState sirve para gestionar el estado a lo largo del componente (de manera global se usa Zustand)
// Los import que tienen como carpeta madre @/components son los componentes de shadcn/ui
// Los import que tienen como carpeta madre ../store son los estados globales de Zustand
// Los import que que tienen como carpeta madre ./ son los componentes de react de la aplicación
// Importo zod como z para definir y validar la estructura de datos del formulario
// Importo useForm para controlar el formulario
// Importo axios para realizar solicitudes HTTP
import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormItem,
  FormMessage,
  FormField,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

// Creo el esquema del formulario con zod
const formSchema = z.object({
  // El correo ha de ser un string y un email valido
  correo: z.string().email(),
  // La contraseña ha de ser un string de al menos 6 caracteres de longitud
  contrasenia: z.string().min(6),
});
// Se inicializa el componente react.
const Login = () => {
  // Se declaran los estados
  const [error, setError] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 954);
  let navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => {
      // Si el ancho de la pantalla es menor o igual que 954 se muestra el diseño para dispositivos pequeños
      setIsSmallScreen(window.innerWidth <= 954); 
    };
    // Añado el evento a la ventana de ejecutar la funcion cada vez que se cambia el tamaño de esta
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // Declaro el formulario con el hook useForm
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      correo: "",
      contrasenia: "",
    },
  });
  // Para permitir las solicitudes con cookies y datos de autentificación
  axios.defaults.withCredentials = true;

  const onSubmit = async (data) => {
    try {
      // Hago una solicitud post con axios para validar al usuario
      const respuesta = await axios.post("http://localhost:5000/auth/login", {
        correo: data.correo,
        contrasenia: data.contrasenia,
      });
      if (respuesta.status !== 200) {
        // Si no es correcto actualizo el estado del error
        setError("Error de autenticación"); 
      }else{
        // Si es correcto redirijo al login
        navigate('/');
      }
    } catch (error) {
      setError("Error de autenticación"); 
      // setError(error.message);
    }
  };
  return (
    <>
      {isSmallScreen ? (
        <div className="grid grid-cols-2 grid-rows-12 gap-0 h-screen font-sans">
          <div className="col-span-2 row-span-2 bg-[#E0E5E7] border-black border-[2px]">
            <Logo />
          </div>
          <div className="col-span-2 row-span-10 row-start-3 bg-[#014A97] border-black border-[2px] flex flex-col items-center justify-center">
            <Card className="h-[90%] w-[75%] mx-auto">
              <CardHeader>
                <CardTitle className="text-4xl font-bold">Login</CardTitle>
                <CardDescription>Rubik Education</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-9 justify-center"
                  >
                    <FormField
                      name="correo"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Email address</FormLabel>
                            <FormControl>
                              <Input
                                className="h-[50px]"
                                placeholder="Email address"
                                type="email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    ></FormField>
                    <FormField
                      name="contrasenia"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                className="h-[50px]"
                                placeholder="Password"
                                type="password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    ></FormField>
                    <div className="flex flex-col items-end">
                    <a
                      className="text-right text-xs text-[#7D7D7D]"
                      href="/passrecover"
                    >
                      Forgot password?
                    </a>
                    <span className="font-bold text-[#7D7D7D] text-right text-xs mt-1">
                  Don´t have an Account?
                  <a href="/register" className="text-black">
                    
                    Register
                  </a>
                </span>

                    </div>
                    {error &&
                      error.response &&
                      error.response.data &&
                      error.response.data.message && (
                        <span className="text-red-500">
                          {error.response.data.message}
                        </span>
                      )}
                    <Button type="submit" className="w-full mt-5 h-[50px]">
                      Login
                    </Button>
                  </form>
                </Form>
                <div className="flex flex-col w-full h-[200px] p-6 text-center">
                  {/* Si hay error lo muestro*/}
                  {error && <span className="text-red-500">{error}</span>}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-5 grid-rows-6 h-screen font-sans">
          <div className="col-span-2 row-span-1  bg-[#E0E5E7] border-black border-[2px]">
            <Logo />
          </div>
          <div className="z-0 col-span-2 row-span-5  col-start-1 row-start-2 bg-[#014A97] border-black border-[2px] flex items-center">
            <Card className="h-[90%] w-[75%] mx-auto">
              <CardHeader>
                <CardTitle className="text-4xl font-bold">Login</CardTitle>
                <CardDescription>Rubik Education</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-9 justify-center"
                  >
                    <FormField
                      name="correo"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Email address</FormLabel>
                            <FormControl>
                              <Input
                                className="h-[50px]"
                                placeholder="Email address"
                                type="email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    ></FormField>
                    <FormField
                      name="contrasenia"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                className="h-[50px]"
                                placeholder="Password"
                                type="password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    ></FormField>
                    <a
                      className="text-right text-xs text-[#7D7D7D]"
                      href="/passrecover"
                    >
                      Forgot password?
                    </a>
                    {error &&
                      error.response &&
                      error.response.data &&
                      error.response.data.message && (
                        <span className="text-red-500">
                          {error.response.data.message}
                        </span>
                      )}
                    <Button type="submit" className="w-full mt-5 h-[50px]">
                      Login
                    </Button>
                  </form>
                </Form>
                <div className="flex flex-col w-full h-[200px] p-6 text-center">
                {/* Si hay error lo muestro*/}
                {error && <span className="text-red-500">{error}</span>}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="z-1 col-span-3 row-span-4 col-start-3 row-start-1 bg-[#F0CE06] border-black border-[2px] bg-cubosLogin bg-cover">
          </div>
          <div className="z-0 col-span-3 row-span-2 col-start-3 row-start-5 bg-[#E0E5E7] border-black border-[2px] flex flex-col items-center justify-center">
            <span className="font-bold text-[#7D7D7D] text-xl">
              Don´t have an Account?
              <a href="/register" className="text-black">
                {" "}
                Register
              </a>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
