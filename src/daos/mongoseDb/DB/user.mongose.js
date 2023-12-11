import { UserModel } from "../models/user.models.js";
import bcrypt from "bcrypt";

export default class UserMongoDB {
  async findByEmail(email) {
    try {
      const response = await UserModel.findOne({ email });
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

 async register(user) {
    try {
      const { email, password } = user;
      const hashedPassword = await bcrypt.hash(password, 10); // Genera un hash de la contraseña
  
      const newUser = {
        ...user,
        password: hashedPassword,
      };
  
      const userExist = await UserModel.findOne({ email });
  
      if (userExist) {
        return null; // El usuario ya existe
      }
  
      let createdUser;
  
      // Verifica si las credenciales son para el usuario administrador
      if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
        createdUser = await UserModel.create({
          ...newUser,
          role: "admin",
        });
      } else {
        createdUser = await UserModel.create(newUser);
      }
      return createdUser;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async login(email, password) {
    try {
      const userExist = await UserModel.findOne({ email: email });
      console.log('Login - User Exist:', userExist);
  
      if (userExist) {
        // Verificar la contraseña utilizando bcrypt.compare
        const passwordMatch = await bcrypt.compare(password, userExist.password);
  
        if (passwordMatch) {
          console.log('Login - Password matched. User logged in:', userExist);
          return userExist;
        } else {
          console.log('Login - Incorrect password');
        }
      } else {
        console.log('Login - User not found');
      }
  
      return null;
    } catch (error) {
      console.error('Login - Error:', error);
      throw error;
    }
  }
  
};


