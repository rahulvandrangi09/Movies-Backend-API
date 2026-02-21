import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

//readt the token for checking and validation
export const authMiddleware = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.anyname) {
    token = req.cookies.anyname;
  }

  if (!token) {
    return res.status(401).json({
      message: "No Token Provided",
    });
  }

  try {
    //verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "User No longer exists",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({
        error: 'Not Authorized'
    })
  }
};
