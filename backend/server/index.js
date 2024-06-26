const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("./controller/product.controller");
const routerUser = require("./controller/user.controller");
const { getCategories } = require("./controller/category.controller");

const app = express();
app.use(express.json()); // Analiza las solicitudes JSON
app.use(express.urlencoded({ extended: true })); // Analiza las solicitudes x-www-form-urlencoded
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  // cors: {
  //   origin: "http://localhost:5173",
  // },
});

server.listen(3000, () => {
  console.log("PUERTO 3000 BACKEND");
});

io.on("connection", async (socket) => {
  console.log("Usuario conectado");

  socket.on("message", (body) => {
    // Emite a todos a excepción del mismo
    socket.broadcast.emit("message", {
      body,
      from: socket.id.slice(6),
    });
  });

  const emitProducts = async () => {
    try {
      io.emit("getProducts", await getProducts());
    } catch (error) {
      console.log(error);
    }
  };

  socket.on("getProducts", async () => {
    console.log("PIDE PRODUCTO");
    await emitProducts();
  });

  socket.on("createNewProduct", async (body) => {
    console.log("NEW : ", body);
    await createProduct(body);
    emitProducts();
  });

  socket.on("updateProduct", async (body) => {
    console.log("UPDATE : ", body);
    await updateProduct(body);
    emitProducts();
  });

  socket.on("deleteProduct", async (id) => {
    await deleteProduct(id);
    emitProducts();
  });

  socket.on("getCategories", async () => {
    await emitCategories();
  });

  const emitCategories = async () => {
    console.log(await getCategories());
    io.emit("getCategories", await getCategories());
  };
});

// Servicios HTTPs
app.use("/api/v1/auth", routerUser);
app.use("/", (req, res) => {
  res.json("HELLO WORLD");
});
