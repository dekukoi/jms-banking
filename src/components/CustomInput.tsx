import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Control } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authFormSchema } from "@/lib/utils";

const formSchema = authFormSchema('sign-up'); 
//#region Why we need to pass 'sign-up'
/*
CustomInput is a highly reusable component used in both the Sign In and Sign Up forms. 
To give you nice autocomplete and catch typos (like accidentally typing name="emial"), 
TypeScript needs to know every valid field name that exists in entire application's authentication flow.
TLDR: 
- CustomInput is dumb UI worker who must be prepared for "everything"
- AuthForm handles the switching logic between sign-in and sign-up
*/
//#endregion

interface CustomInput {
  control: Control<z.infer<typeof formSchema>>;
  name: keyof z.infer<typeof formSchema>;
  //#region Extract keys from authFormSchema
  /*
  authFormSchema — your zod schema object
  +
  typeof authFormSchema — get the TypeScript type of that schema variable
  +
  z.infer<...> — extract what the schema produces, which is { email: string, password: string }
  +
  keyof ... — get just the keys of that object, which is "email" | "password"

  = "name must be one of the field names defined in my schema"
  */
  //#endregion
  label: string;
  placeholder: string;
}

const CustomInput = ({ control, name, label, placeholder }: CustomInput) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormItem>
            <FormLabel className="form-label">{label}</FormLabel>
            <div className="flex w-full flex-col">
              <FormControl>
                <Input
                  placeholder={placeholder}
                  className="input-class"
                  type={name}
                  //#region "Lazy" effective trick for password type 
                  /*
                  Whenever a browser encounters an <input> with a type it doesn't recognize (like "username"), 
                  it automatically falls back to the default, which is type="text",
                  So no worries HAHAHA
                  */
                  //#endregion
                  {...field}
                />
              </FormControl>
              <FormMessage className="form-message mt-2" />
            </div>
          </FormItem>
        </div>
      )}
    />
  );
};

export default CustomInput;
