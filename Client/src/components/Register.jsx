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
  CardFooter,
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
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

// Creo el esquema del formulario con zod
const formSchema = z
  .object({
    // El nombre ha de ser un string de al menos 6 caracteres de longitud
    nombre: z.string().min(6),
    // El correo ha de ser un string y un email valido
    correo: z.string().email(),
    // Las contraseñas han de ser un string de al menos 6 caracteres de longitud
    contrasenia: z.string().min(6),
    confirmarContrasenia: z.string().min(6),
  })
  // Compruebo que las contraseñas coincidan
  .refine((data) => data.contrasenia === data.confirmarContrasenia, {
    message: "Las contraseñas no coinciden",
    path: ["confirmarContrasenia"],
  });
  
// Se inicializa el componente react.
const Register = () => {
  let navigate = useNavigate();
  // Se declaran los estados
  const [error, setError] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 954);
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
      nombre: "",
      correo: "",
      contrasenia: "",
      confirmarContrasenia: "",
    },
  });
  const onSubmit = async (data) => {
    try {
      // Hago una solicitud post con axios para validar al usuario
      const respuesta = await axios.post("http://localhost:5000/api/signup", {
        nombre: data.nombre,
        correo: data.correo,
        contrasenia: data.contrasenia,
      });
      console.log("Fuera");
      if (respuesta.status !== 201) {
        // Si no es correcto actualizo el estado del error
        setError(respuesta.data.message);
      } else {
        // Si es correcto redirijo al login
        navigate("/login");
      }
    } catch (error) {
      // Si no es correcto actualizo el estado del error
      setError("Error al registrar el usuario");
    }
  };
  return (
    <>
      {isSmallScreen ? (
        <div className="grid grid-cols-2 grid-rows-12 gap-0 h-screen font-sans">
          <div className="col-span-2 row-span-2 bg-[#E0E5E7] border-black border-[2px]">
            <Logo />
          </div>
          <div className="col-span-2 row-span-10 row-start-3 bg-[#F0CE06] border-black border-[2px] flex flex-col items-center justify-center">
            <Card className="h-[85%] w-[75%] mx-auto">
              <CardHeader>
                <CardTitle className="text-4xl font-bold">Sing up to</CardTitle>
                <CardDescription>Rubik Education</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-2 justify-center"
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
                      name="nombre"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Username:</FormLabel>
                            <FormControl>
                              <Input
                                className="h-[50px]"
                                placeholder="Username"
                                type="text"
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
                    <FormField
                      name="confirmarContrasenia"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input
                                className="h-[50px]"
                                placeholder="Confirm Password"
                                type="password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    ></FormField>
                    {error &&
                      error.response &&
                      error.response.data &&
                      error.response.data.message && (
                        <span className="text-red-500">
                          {error.response.data.message}
                        </span>
                      )}
                    <Button type="submit" className="w-full mt-5 h-[50px]">
                      Register
                    </Button>
                  </form>
                </Form>
                <div className="flex flex-col w-full h-[100px] p-6 text-center">
                  {/* Si hay error lo muestro*/}
                  {error && <span className="text-red-500">{error}</span>}
                </div>
              </CardContent>
            </Card>
            <div className="h-[10%] flex flex-row items-center">
              <span className="mx-auto">
                <a
                  href="/login"
                  className="text-black font-bold text-3xl flex flex-row items-center"
                >
                  <img
                    srcSet="./src/assets/flechaIzq.svg"
                    className="w-[30px]"
                    alt="Flecha a la izquierda"
                  />
                  Login
                </a>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-5 grid-rows-6 gap-0 h-screen font-sans">
          <div className="col-span-2 row-span-4 bg-[#E0E5E7] border-black border-[2px]">
            <Logo />
          </div>
          <div className="row-span-4 col-start-3 bg-[#F0CE06] border-black border-[2px] flex flex-col items-center justify-center">
            <a className="text-xl font-bold" href="/login">
              Login
            </a>
          </div>
          <div className="col-span-2 row-span-6 col-start-4 bg-[#E0E5E7] border-black border-[2px] flex flex-col justify-center">
            <Card className="h-[95%] w-[75%] mx-auto">
              <CardHeader>
                <CardTitle className="text-4xl font-bold">Register</CardTitle>
                <CardDescription>Rubik Education</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-9 justify-center"
                  >
                    <FormField
                      name="nombre"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Username:</FormLabel>
                            <FormControl>
                              <Input
                                className="h-[50px]"
                                placeholder="Username"
                                type="text"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    ></FormField>
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
                    <FormField
                      name="confirmarContrasenia"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input
                                className="h-[50px]"
                                placeholder="Confirm Password"
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
                      href="/login"
                    >
                      Do you have an account?
                    </a>
                    {error &&
                      error.response &&
                      error.response.data &&
                      error.response.data.message && (
                        <span className="text-red-500">
                          {error.response.data.message}
                        </span>
                      )}
                    <Button type="submit" className="w-full mt-3 h-[50px]">
                      Register
                    </Button>
                  </form>
                </Form>
                <div className="flex flex-col w-full h-[100px] p-6 text-center">
                  {/* Si hay error lo muestro*/}
                  {error && <span className="text-red-500">{error}</span>}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="col-span-3 row-span-2 row-start-5 bg-[#014A97] bg-cubosRegister bg-cover border-black border-[2px]"></div>
        </div>
      )}
    </>
  );
};

export default Register;
