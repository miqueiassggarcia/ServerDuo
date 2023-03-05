"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/validation/Notification.ts
var Notification_exports = {};
__export(Notification_exports, {
  notificationSchema: () => notificationSchema
});
module.exports = __toCommonJS(Notification_exports);
var import_zod = __toESM(require("zod"));
var notificationSchema = import_zod.default.object({
  userIdUser: import_zod.default.string(),
  nameUser: import_zod.default.string().min(1, { message: "Seu titulo pracisa conter ao menos 1 caractere" }).max(50, { message: "Seu titulo tem que ter menos de 50 caracteres" }),
  description: import_zod.default.string().min(1, { message: "Sua descricao pracisa conter ao menos 1 caractere" }).max(300, { message: "Sua descricao tem que ter menos de 300 caracteres" }),
  visualized: import_zod.default.boolean()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  notificationSchema
});
