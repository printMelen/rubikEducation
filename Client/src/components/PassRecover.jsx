import React, { useState } from "react";
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

const PassRecover = () => {
  const [error, setError] = useState(null);
  const formSchema = z
    .object({
      correo: z.string().email(),
      contrasenia: z.string().min(6),
      confirmarContrasenia: z.string().min(6),
    })
    .refine((data) => data.contrasenia === data.confirmarContrasenia, {
      message: "Las contraseñas no coinciden",
      path: ["confirmarContrasenia"],
    });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      correo: "",
      contrasenia: "",
      confirmarContrasenia: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    // axios
    //   .post("http://localhost:5000/api/signup", {
    //     nombre:data.nombre,
    //     correo:data.correo,
    //     contrasenia:data.contrasenia,
    //   })
    //   .then(function (response) {
    //     console.log("Respuesta de POST:", response.data);
    //     return navigate("/login");
    //   })
    //   .catch(function (err) {
    //     setError(err);
    //     console.error("Error en la solicitud POST:", err);
    //   });
  };
  return (
    <div className="grid grid-cols-5 grid-rows-7 gap-0 h-screen font-sans">
      <div className="col-span-2 row-span-4 bg-[#014A97] border-black border-[2px]">
        <Logo></Logo>
      </div>
      <div className="col-span-3 row-span-5 col-start-3 bg-[#E0E5E7] border-black border-[2px] flex items-center">
        <Card className="w-[80%] mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Password Recovery
            </CardTitle>
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
                {/* <a className="text-right text-xs text-[#7D7D7D]" href="/login">
                  Do you have an account?
                </a> */}
                {error &&
                  error.response &&
                  error.response.data &&
                  error.response.data.message && (
                    <span className="text-red-500">
                      {error.response.data.message}
                    </span>
                  )}
                <Button type="submit" className="w-full mt-3 h-[50px]">
                  Recover
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-2 row-span-3 row-start-5 bg-[#E0E5E7] border-black border-[2px] bg-cubosPassRecover bg-cover"></div>
      <div className="col-span-3 row-span-2 col-start-3 row-start-6 bg-[#D4121A] border-black border-[2px] flex items-center justify-center">
        <span className="font-bold text-white text-xl flex items-center">
          Did you remember?
          <a href="/login" className="text-black">
            <div className="flex items-center">
                <img className="w-5" srcSet="./src/assets/flechaIzq.svg" />
                Login
            </div>
          </a>
        </span>
      </div>
    </div>
  );
};

export default PassRecover;
