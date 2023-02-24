"use strict";

// src/example.ts
var import_zod = require("zod");
var userSchema = import_zod.z.object({
  name: import_zod.z.string().min(3, { message: "O nome precisa de 3 caracteres." }).transform((name) => name.toLocaleUpperCase()),
  age: import_zod.z.number().min(18, { message: "Voc\xEA precisa ser maior de idade." })
});
function saveUserToDatabase(user) {
  const { name, age } = userSchema.parse(user);
  console.log(name, age);
}
saveUserToDatabase({
  name: "Diego",
  age: 18
});
