import express from "express";

const app = express();
app.use(express.json());

app.post("/users", (request, response) => {
    return response.json({});
});

app.post("/login", (request, response) => {
    return response.json({});
});


app.post("/mail", (request, response) => {
    return response.json({});
});

app.post("/code", (request, response) => {
    return response.json({});
});

app.get("/home", (request, response) => {
    return response.json({})
})

app.put("/user/id:", (request, response) => {
    return response.json({});
})

app.listen("3333");