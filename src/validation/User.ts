import { z } from "zod";

export const userSchema = z.object({
  name: z.string()
    .min(3, { message: "O nome precisa de pelo menos 3 caracteres." })
    .max(50, { message: "O nome precisa de menos de 50 caracteres." }),
  photoLink: z.string()
    .min(11, { message: "Sua url precisa de pelos menos 11 caracteres." })
    .max(2048, { message: "O limite de tamanho da url foi excedido." }),
  email: z.string().email({ message: "Seu email não contém formato válido" })
    .min(4, { message: "Seu email precisa de pelo menos 4 caracteres." })
    .max(100, { message: "Seu email deve ter menos de 100 caracteres." }),
  password: z.string()
    .min(4, { message: "Sua senha é precisa de pelo menos 4 caracteres." })
    .max(100, { message: "Sua senha deve ter menos de 100 caracteres." })
});

export const userLoginSchema = z.object({
  email: z.string().email({ message: "Seu email não contém formato válido" })
    .min(4, { message: "Seu email precisa de pelo menos 4 caracteres." })
    .max(100, { message: "Seu email deve ter menos de 100 caracteres." }),
  password: z.string()
    .min(4, { message: "Sua senha é precisa de pelo menos 4 caracteres." })
    .max(100, { message: "Sua senha deve ter menos de 100 caracteres." })
});