import React, { useState } from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../store/authState";
import useAuth  from "../hooks/useAuth";
import axios from "axios";

const formSchema = z.object({
  correo: z.string().email(),
  contrasenia: z.string().min(6),
});

const Login = () => {
  const [error, setError] = useState(null);
  // (state)=>state.token
  const setToken = useAuthStore();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      correo: "",
      contrasenia: "",
    },
  });

  axios.defaults.withCredentials= true;
  const onSubmit = async (data) => {
    // console.log(data);
    try {
      const respuesta = await axios
      .post("http://localhost:5000/auth/login", {
        correo:data.correo,
        contrasenia:data.contrasenia,
      });
      if (respuesta.status === 200) {
        // const auth = await useAuth();
        // console.log(respuesta.data.token);
        // console.log("HOLAAAAA🙄");
        // console.log(respuesta.data.token);
        const token = respuesta.data.token; // Supongamos que la API devuelve un token
        // await useAuth();
        // console.log("EEEEY");
        // let expires=new Date();
        // expires.setTime(expires.getTime() + 5 * 60 * 1000);
        // expires = "expires=" + expires.toUTCString();
        // document.cookie = "accessToken" + "=" + token + ";" + expires + ";path=/;";
        // Almacenar el token en el estado usando Zustand
        // setToken(token);
      } else {
        setError("Error de autenticación");
      }
      // .then(function (response) {
      //   console.log("Respuesta de POST:", response.data);
      // })
      // .catch(function (err) {
      //   setError(err);
      //   console.error("Error en la solicitud POST:", err);
      // });
    } catch (error) {
      setError(error.message);
    }
    
  };
  // axios
  //     .post("http://localhost:5000/api/login", {
  //       correo:data.correo,
  //       contrasenia:data.contrasenia,
  //     })
  //     .then(function (response) {
  //       console.log("Respuesta de POST:", response.data);
  //     })
  //     .catch(function (err) {
  //       setError(err);
  //       console.error("Error en la solicitud POST:", err);
  //     });
  // const response = await axios.post('http://localhost:5000/api/login', data);
  //   console.log(response.data); // Maneja la respuesta del servidor como desees
  // } catch (err) {
  //   setError(err);
  //   // console.error('Error al enviar los datos:', error);
  // }

  // const sendRequest = async () =>{
  //   const res = axios.post('http://localhost:5000/api/login',{
  //     nombre:
  //   });
  // }
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };
  return (
    // <div className='text-red-300'>Login</div>
    // <div className='text-green-400'>BUENAS</div>
    <>
      <div className="grid grid-cols-5 grid-rows-6 h-screen font-sans">
        <div className="col-span-2 row-span-1 bg-[#E0E5E7] border-black border-[2px]">
          <Logo />
        </div>
        <div className="z-0 col-span-2 row-span-5 col-start-1 row-start-2 bg-[#014A97] border-black border-[2px] flex items-center">
          <Card className="h-[90%] w-[75%] mx-auto">
            {/* flex flex-col justify-center gap-6 */}
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
                  <a className="text-right text-xs text-[#7D7D7D]" href="/recovery">Forgot password?</a>
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
            </CardContent>
            {/* <CardFooter>
              <p>Card Footer</p>
            </CardFooter> */}
          </Card>
        </div>
        <div className="z-1 col-span-3 row-span-4 col-start-3 row-start-1 bg-[#F0CE06] border-black border-[2px] bg-cubosLogin bg-cover">
          {/* <img alt="" srcset="src/assets/todosCubosLogin.svg" className="object-cover z-5" /> */}
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

      {/* <Rectangulo w={624} h={230} color={"grey"}/>
      <Rectangulo w={624} h={78} color={"blue"}/> */}
    </>
  );
};

export default Login;
