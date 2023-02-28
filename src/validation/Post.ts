import { z } from "zod";

export const postSchema = z.object({
  gameIdGame: z.string(),
  userIdUser: z.string(),
  title: z.string()
    .min(1, { message: "Seu titulo pracisa conter ao menos 1 caractere" })
    .max(50, { message: "Seu titulo tem que ter menos de 50 caracteres" }),
  description: z.string()
    .min(1, { message: "Sua descricao pracisa conter ao menos 1 caractere" })
    .max(300, { message: "Sua descricao tem que ter menos de 300 caracteres" }),
  discord: z.string()
    .min(6, { message: "Seu discord pracisa conter ao menos 6 caractere" })
    .max(30, { message: "Seu discord tem que ter menos de 30 caracteres" }),
  yearPlaying: z.number(),
  weekDays: z.number().array().transform(element => element.toString()),
  hourStart: z.number()
    .min(1, { message: "Valor menor que 1 é inválido" })
    .max(1439, { message: "Valor maior que 1439 é inválido" }),
  hourEnd: z.number()
    .min(1, { message: "Valor menor que 1 é inválido" })
    .max(1439, { message: "Valor maior que 1439 é inválido" }),
  useVoiceChannel: z.boolean()
})

// professions: z
//     .object({
//       name: z
//         .string()
//         .refine((name) =>
//           fieldsOfEng.map((field) => field.name).includes(name)
//         ),
//       experience: z.number().refine((experience) => experience > 1),
//     })
//     .array(),
// });