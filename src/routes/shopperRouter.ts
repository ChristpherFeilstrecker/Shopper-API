import express from "express";
import { ShopperController } from "../controller/ShopperController";

export const shopperRouter = express.Router();

const shopperController = new ShopperController();

shopperRouter.get("/products", shopperController.products); // Retorna todos os produtos cadastrados
shopperRouter.get("/requests", shopperController.requests); // Retorna todos pedidos

shopperRouter.post("/newrequest", shopperController.newRequest);  // Cria novo pedido

shopperRouter.put("/editrequest", shopperController.editRequest); // Edita a quantidade de itens de um produto de um pedido

shopperRouter.delete("/deleterequest", shopperController.deleteRequest); // Exclui pedido
