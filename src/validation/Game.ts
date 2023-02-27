import { z } from "zod";

export const gameSchema = z.object({
    name: z.string()
    .min(3, { message: "O nome precisa de pelo menos 3 caracteres." })
    .max(50, { message: "O nome precisa de menos de 50 caracteres." }),
    photoLink: z.string()
        .min(11, { message: "Sua url precisa de pelos menos 11 caracteres." })
        .max(2048, { message: "O limite de tamanho da url foi excedido." })
});