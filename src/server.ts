import express from "express";

const app = express();
app.use(express.json());

app.post("/users", (request, response) => {
    response.send({});
});

app.post("/login", (request, response) => {
    response.send({});
});


app.post("/mail", (request, response) => {
    response.send({});
});

app.post("/code", (request, response) => {
    response.send({});
});

app.get("/home", (request, response) => {
    response.send({})
})