import React, { useState,useEffect } from "react";
import Rectangulo from "./Rectangulo";
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
import { useAuthStore } from "../store/authState";

const formSchema = z
  .object({
    nombre: z.string().min(6),
    correo: z.string().email(),
    contrasenia: z.string().min(6),
    confirmarContrasenia: z.string().min(6),
  })
  .refine((data) => data.contrasenia === data.confirmarContrasenia, {
    message: "Las contraseñas no coinciden",
    path: ["confirmarContrasenia"],
  });

const Register = () => {
  const [error, setError] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 954);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 954); // Cambiar aquí el punto de quiebre
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const token = useAuthStore();
  let navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      correo: "",
      contrasenia: "",
      confirmarContrasenia: "",
    },
  });
  console.log(token);
  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("http://localhost:5000/api/signup", {
        nombre:data.nombre,
        correo:data.correo,
        contrasenia:data.contrasenia,
      })
      .then(function (response) {
        console.log("Respuesta de POST:", response.data);
        return navigate("/login");
      })
      .catch(function (err) {
        setError(err);
        console.error("Error en la solicitud POST:", err);
      });
  };
  return (
    <>
    {isSmallScreen ? (
      <div className="grid grid-cols-2 grid-rows-12 gap-0 h-screen font-sans">
        <div className="col-span-2 row-span-2 bg-[#E0E5E7] border-black border-[2px]">
          <Logo />
        </div>
        <div className="col-span-2 row-span-10 row-start-3 bg-[#F0CE06] border-black border-[2px] flex flex-col items-center justify-center">
          <Card className="h-[80%] w-[75%] mx-auto">
            {/* flex flex-col justify-center gap-6 */}
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
                  {/* <div className="flex flex-col items-end">
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

                  </div> */}
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
            </CardContent>
            {/* <CardFooter> */}
              
            {/* </CardFooter> */}
          </Card>
          <div className="h-[10%] flex flex-row items-center">
            <span className="mx-auto">
              <a href="/login" className="text-black font-bold text-3xl flex flex-row items-center"> 
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
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </div>
        <div className="col-span-3 row-span-2 row-start-5 bg-[#014A97] bg-cubosRegister bg-cover border-black border-[2px]">
          
        </div>
      </div>
                  )}
                  </>
  );
};

export default Register;
