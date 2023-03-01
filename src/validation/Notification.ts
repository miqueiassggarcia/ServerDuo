import z from "zod";

export const notificationSchema = z.object({
  userIdUser: z.string(),
  nameUser: z.string()
    .min(1, { message: "Seu titulo pracisa conter ao menos 1 caractere" })
    .max(50, { message: "Seu titulo tem que ter menos de 50 caracteres" }),
  description: z.string()
    .min(1, { message: "Sua descricao pracisa conter ao menos 1 caractere" })
    .max(300, { message: "Sua descricao tem que ter menos de 300 caracteres" }),
  visualized: z.boolean()
});