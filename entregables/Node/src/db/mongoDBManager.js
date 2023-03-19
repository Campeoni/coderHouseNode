import mongoose from "mongoose";

export class ManagerMongoDB {
  #url

  constructor(url, collection, schema) {
    this.#url = url; //Atributo privado
    this.collection = collection;
    this.schema = new mongoose.Schema(schema);
    this.model = mongoose.model(this.collection, this.schema);
  }

  //metodo statico
  async #setConnection() {
    try {      
      await mongoose.connect(this.#url)
      console.log("MongoDB is connected!");
      } catch (error) {
      return error
    }
  }

  //Agrego 1 o varios elementos
  async addElements(elements){
    this.#setConnection();
    try{  
      return await this.model.insertMany(elements)
    } catch(error) {
      return error
    }
  }

  async getElements(){
    this.#setConnection();
    try{  
      return await this.model.find()
    } catch(error) {
      return error
    }
  }
  async getElementById(id){
    this.#setConnection();
    try{  
      return await this.model.findById(id)
    } catch(error) {
      return error
    }
  }
  async updateElementById(id, info){
    this.#setConnection();
    try{  
      return await this.model.findByIdAndUpdate(id, info)
    } catch(error) {
      return error
    }
  }
  async DeleteElementById(id){
    this.#setConnection();
    try{  
      return await this.model.findByIdAndDelete(id)
    } catch(error) {
      return error
    }
  }
}