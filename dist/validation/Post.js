"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/validation/Post.ts
var Post_exports = {};
__export(Post_exports, {
  postSchema: () => postSchema
});
module.exports = __toCommonJS(Post_exports);
var import_zod = require("zod");
var postSchema = import_zod.z.object({
  gameIdGame: import_zod.z.string(),
  userIdUser: import_zod.z.string(),
  title: import_zod.z.string().min(1, { message: "Seu titulo pracisa conter ao menos 1 caractere" }).max(50, { message: "Seu titulo tem que ter menos de 50 caracteres" }),
  description: import_zod.z.string().min(1, { message: "Sua descricao pracisa conter ao menos 1 caractere" }).max(300, { message: "Sua descricao tem que ter menos de 300 caracteres" }),
  discord: import_zod.z.string().min(6, { message: "Seu discord pracisa conter ao menos 6 caractere" }).max(30, { message: "Seu discord tem que ter menos de 30 caracteres" }),
  yearPlaying: import_zod.z.number(),
  weekDays: import_zod.z.number().array().transform((element) => element.toString()),
  hourStart: import_zod.z.number().min(1, { message: "Valor menor que 1 \xE9 inv\xE1lido" }).max(1439, { message: "Valor maior que 1439 \xE9 inv\xE1lido" }),
  hourEnd: import_zod.z.number().min(1, { message: "Valor menor que 1 \xE9 inv\xE1lido" }).max(1439, { message: "Valor maior que 1439 \xE9 inv\xE1lido" }),
  useVoiceChannel: import_zod.z.boolean()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  postSchema
});
