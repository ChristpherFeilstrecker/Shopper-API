import { Request, Response } from "express";
import ShopperBusiness from "../business/ShopperBusiness";

export class ShopperController {

   public async products(req: Request, res: Response) {
      try {
   
         const result = await ShopperBusiness.products();
         res.status(200).send(result);
      } catch (error) {
         
         if (error instanceof Error) {
            res.status(400).send(error.message);
        } else {
            res.send({ message: "Controller - Algo deu errado ao retornar produtos" })
        }
      }
   }

   public async requests(req: Request, res: Response) {
      try {
   
         const result = await ShopperBusiness.requests();
         res.status(200).send(result);
      } catch (error) {
         
         if (error instanceof Error) {
            res.status(400).send(error.message);
        } else {
            res.send({ message: "Controller - Algo deu errado ao retornar pedidos" })
        }
      }
   }

   public async newRequest(req: Request, res: Response) {
      try {
         const { name, date, products } = req.body
   
         const result = await ShopperBusiness.newRequest(
            name,
            date,
            products
            
         );
         res.status(200).send(result);
      } catch (error) {
         
         if (error instanceof Error) {
            res.status(400).send(error.message);
        } else {
            res.send({ message: "Controller - Algo deu errado ao registrar pedido" })
        }
      }
   }

   public async editRequest(req: Request, res: Response) {
      try {
         const { operation, id_request, product_id,qty_product } = req.body
   
         const result = await ShopperBusiness.editRequest(
            operation, id_request, product_id,qty_product
         );
         res.status(200).send(result);
      } catch (error) {
         
         if (error instanceof Error) {
            res.status(400).send(error.message);
        } else {
            res.send({ message: "Controller - Algo deu errado ao editar pedido" })
        }
      }
   }

   public async deleteRequest(req: Request, res: Response) {
      try {
         const { id_request } = req.body
   
         const result = await ShopperBusiness.deleteRequest(
             id_request
         );
         res.status(200).send(result);
      } catch (error) {
         
         if (error instanceof Error) {
            res.status(400).send(error.message);
        } else {
            res.send({ message: "Controller - Algo deu errado ao editar pedido" })
        }
      }
   }

}

export default new ShopperController()