const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { Router } = require("express");
const { getToken } = require("../utils/jwt");
const routerUser = Router();

routerUser.post("/sigin", async (req, res) => {
  console.log("Body : ", req.body);
  const { email, password } = req.body;
  try {
    const user = prisma.users.findFirst(
      {
        where: {
          email,
          password,
        },
      },
      (err, user) => {
        if (err) {
        }
      }
    );
  } catch (error) {
    console.log(error);
  }

  if (!user) {
    return res.status(404).json({
      message: "Usuario no encontrado",
    });
  }

  const token = getToken(email);

  res.status(200).json({
    status: "success",
    data: {
      token: token,
    },
    error: null,
  });
});

module.exports = routerUser;
