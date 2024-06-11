const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { Router } = require("express");
const { getToken } = require("../utils/jwt");
const routerUser = Router();
routerUser.post("/signin", async (req, res) => {
  console.log("Body : ", req.body); // Debería imprimir el cuerpo de la solicitud
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await prisma.users.findFirst({
      where: { email, password },
    });

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    const token = getToken(email);
    console.log("Token: ", token);

    res.status(200).json({
      status: "success",
      data: {
        token: token,
      },
      error: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

routerUser.get("/", (req, res) => {
  console.log("Query Params: ", req.query);
  return res.json({
    status: "success",
    data: req.query,
    message: "Received query parameters",
  });
});
module.exports = routerUser;
