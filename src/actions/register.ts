"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/lib/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const result = RegisterSchema.safeParse(values);
  //   if (!result.success) return { errors: result.error.flatten().fieldErrors };
  if (!result.success) return { error: "Invalid Data" };

  const { email, name, password } = result.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email is taken" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: "User Created" };
};
