import {Router} from "express";
import {userModel} from "../dao/FileSustem/models/user.js"


const routerUser = Router();

routerUser.get("/", async(req,res) => {
  try {
      const users = await userModel.find()
      res.send({resultado: "success", users: users })
  } catch (error) {
      res.send("Error en consulta de users, mensaje: ", error.message )
  }
})
routerUser.post("/", async(req,res) => {
  try {
      const {userName, name, surname, email, password} = req.body

      const resultado = await userModel.create({
        userName, name, surname, email, password
      })

      console.log("viendo ando: ", resultado);
    
      res.send({resultado: "success", info: resultado })
  } catch (error) {
      res.send({"Error en el Post de users, mensaje: ": error.message })
  }
})

export default routerUser