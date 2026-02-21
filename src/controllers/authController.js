import { prisma } from "../config/db.js";
import bcrypt, { hash } from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

const register = async (req, res) => {
  const { username, email, password } = req.body;
  // check if user already exists
  // This results an object
  const userExists = await prisma.user.findUnique({
    where: { email: email },
  });
  if (userExists) {
    return res.status(400).json({
      message: "User Already Exists",
    });
  }
  //hashpassword
  //it rounds that password upto 10 rounds
  const salt = await bcrypt.genSalt(10);
  //now thistakes the salt and the password for the hasing it takes password and salt as args
  const hashpassword = await bcrypt.hash(password, salt);
  //create user
  const user = await prisma.user.create({
    data: {
      name: username,
      email,
      password: hashpassword,
    },
  });
  res.status(201).json({
    data: {
        user:{
            id: user.id,
            name: username,
            email: email 
        }
    }
  })
};


const login = async (req, res) => {
    const { email, password } = req.body;
    // check if user email exists
  // This results an object
  const user = await prisma.user.findUnique({
    where: { email: email },
  });
  if (!user) {
    return res.status(401).json({
      message: "User doesn't Exists",
    });
  }
  //verify password
  const hashedPassword = await bcrypt.compare(password, user.password)
  if(!hashedPassword){
     return res.status(401).json({
      message: "User doesn't Exists",
    });
  }

  //generate jwt token
  const token = generateToken(user.id, res)

  res.status(201).json({
    data: {
        user:{
            id: user.id,
            email: email 
        },
        token
    }
  })

}

const logout = async (req, res) => {
    res.cookie("anyname", "", {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({
        message: "Logged Out Successfully"
    })
}

export { register, login, logout };
