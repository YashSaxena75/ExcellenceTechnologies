const express = require("express");

const port = 8080 || process.env.PORT
const app = require("./routers/routers")

app.listen(port,() => {
    console.log(`Server Listening on port ${port}`)
} )