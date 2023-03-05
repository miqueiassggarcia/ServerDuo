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

// src/validation/User.ts
var User_exports = {};
__export(User_exports, {
  userLoginSchema: () => userLoginSchema,
  userSchema: () => userSchema
});
module.exports = __toCommonJS(User_exports);
var import_zod = require("zod");
var userSchema = import_zod.z.object({
  name: import_zod.z.string().min(3, { message: "O nome precisa de pelo menos 3 caracteres." }).max(50, { message: "O nome precisa de menos de 50 caracteres." }),
  photoLink: import_zod.z.string().min(11, { message: "Sua url precisa de pelos menos 11 caracteres." }).max(2048, { message: "O limite de tamanho da url foi excedido." }),
  email: import_zod.z.string().email({ message: "Seu email n\xE3o cont\xE9m formato v\xE1lido" }).min(4, { message: "Seu email precisa de pelo menos 4 caracteres." }).max(100, { message: "Seu email deve ter menos de 100 caracteres." }),
  password: import_zod.z.string().min(4, { message: "Sua senha \xE9 precisa de pelo menos 4 caracteres." }).max(100, { message: "Sua senha deve ter menos de 100 caracteres." })
});
var userLoginSchema = import_zod.z.object({
  email: import_zod.z.string().email({ message: "Seu email n\xE3o cont\xE9m formato v\xE1lido" }).min(4, { message: "Seu email precisa de pelo menos 4 caracteres." }).max(100, { message: "Seu email deve ter menos de 100 caracteres." }),
  password: import_zod.z.string().min(4, { message: "Sua senha \xE9 precisa de pelo menos 4 caracteres." }).max(100, { message: "Sua senha deve ter menos de 100 caracteres." })
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userLoginSchema,
  userSchema
});
