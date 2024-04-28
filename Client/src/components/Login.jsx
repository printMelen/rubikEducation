import React from "react";
import Rectangulo from "./Rectangulo";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormItem, FormMessage, FormField, FormLabel , FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const Login = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleSubmit = () => {};
  return (
    // <div className='text-red-300'>Login</div>
    // <div className='text-green-400'>BUENAS</div>
    <>
      <div className="grid grid-cols-5 grid-rows-6 h-screen">
        <div className="col-span-2 row-span-1 bg-[#E0E5E7] border-black border-[2px]"></div>
        <div className="col-span-2 row-span-5 col-start-1 row-start-2 bg-[#014A97] border-black border-[2px] flex items-center">
          <Card className="h-[90%] w-[75%] mx-auto ">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Rubik Education</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-9">
                  <FormField name="email" render={({ field })=>{
                    return <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <Input 
                        className="h-[50px]"
                        placeholder="Email address"
                        type="email"
                         {...field}/>
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  }}></FormField>
                  <FormField name="password" render={({ field })=>{
                    return <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                        className="h-[50px]"
                        placeholder="Password"
                        type="password"
                         {...field}/>
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  }}></FormField>
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
        <div className="col-span-3 row-span-4 col-start-3 row-start-1 bg-[#F0CE06] border-black border-[2px]"></div>
        <div className="col-span-3 row-span-2 col-start-3 row-start-5 bg-[#E0E5E7] border-black border-[2px]"></div>
      </div>

      {/* <Rectangulo w={624} h={230} color={"grey"}/>
      <Rectangulo w={624} h={78} color={"blue"}/> */}
    </>
  );
};

export default Login;
