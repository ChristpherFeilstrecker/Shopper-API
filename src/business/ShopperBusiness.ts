import { ShopperDatabase } from "../data/ShopperDatabase";
import { CustomError } from "../errors/CustomError";
import { IdGenerator } from "../services/idGenerator";

export class ShopperBusiness {

   constructor(
      private idGenerator: IdGenerator,
      private shopperDatabase: ShopperDatabase,
   ) {

   }

   public async products(

   ) {
      try {

         const result = await this.shopperDatabase.allProducts(); // Conecta com BD e retorna todos os produtos cadastrados

         return result;
      } catch (error) {

         if (error instanceof Error) {
            throw new CustomError(400, error.message)
         } else {
            throw new CustomError(400, "business - Erro ao retornar produtos")
         }
      }
   }

   public async requests(

   ) {
      try {

         const result = await this.shopperDatabase.allRequests();

         return result;
      } catch (error) {

         if (error instanceof Error) {
            throw new CustomError(400, error.message)
         } else {
            throw new CustomError(400, "business - Erro ao retornar pedidos")
         }
      }
   }

   public async newRequest(
      name: String,
      date: String,
      products: any
   ) {
      try {

         if (!name || !date || !products) {

            throw new CustomError(422, "Preencha todos os dados corretamente");
         }

         const id = this.idGenerator.generate(); 

         products.map(async (product: any) => {

            const prod = await this.shopperDatabase.getProductBiId(
               product.product_id
            );
            const qty_actual = prod[0].qty_stock - product.qty

            await this.shopperDatabase.editProduct(
               product.product_id,
               qty_actual
            );


            await this.shopperDatabase.newRequestProducts(
               id,
               product.product_id,
               product.name,
               product.qty
            );
         })

         await this.shopperDatabase.newRequest(
            id,
            name,
            date
         );

         return ("Pedido cadastrado");
      } catch (error) {

         if (error instanceof Error) {
            throw new CustomError(400, error.message)
         } else {
            throw new CustomError(400, "business - Erro ao registrar pedido")
         }
      }
   }

   public async editRequest(
      operation: String,
      id_request: String,
      product_id: Number,
      qty_product: Number
   ) {
      try {

         if (!id_request || !operation || !qty_product || !product_id) {

            throw new CustomError(422, "Preencha todos os dados corretamente");
         }

         const product = await this.shopperDatabase.getProductRequestBiId(
            id_request,
            product_id
         );

         let qtyProductActual = product[0].qty_request

         const prod = await this.shopperDatabase.getProductBiId(
               product_id
            );

          let qtyStockActual = prod[0].qty_stock 

         if (operation === "add") {
            qtyProductActual+=qty_product;
            qtyStockActual = qtyStockActual - Number(qty_product)
           
         }else if(operation === "decrease"){
            qtyProductActual=qtyProductActual - Number(qty_product);
            qtyStockActual += qtyStockActual
         }

          await this.shopperDatabase.editProduct(
               product_id,
               qtyStockActual
            );

         await this.shopperDatabase.editRequestProduct(
            id_request,
            product_id,
            qtyProductActual
         );

         return ("Produto editado");
      } catch (error) {

         if (error instanceof Error) {
            throw new CustomError(400, error.message)
         } else {
            throw new CustomError(400, "business - Erro ao editar produto")
         }
      }
   }

   public async deleteRequest(
      id_request:String

      ) {
         try {

            if (!id_request) {

               throw new CustomError(422, "Preencha todos os dados corretamente");
            }
   
            const productsRequest = await this.shopperDatabase.getAllProductsRequestBiId(
               id_request
            );

            productsRequest.map(async (product: any) => {

               const prod = await this.shopperDatabase.getProductBiId(
                  product.product_id
               );
               const qty_actual = prod[0].qty_stock + product.qty_request
   
               await this.shopperDatabase.editProduct(
                  product.product_id,
                  qty_actual
               );
   
            })

            await this.shopperDatabase.deleteRequest(
               id_request
            );

   
            return ("Pedido deletado")
         } catch (error) {
   
            if (error instanceof Error) {
               throw new CustomError(400, error.message)
            } else {
               throw new CustomError(400, "business - Erro ao deletar pedido")
            }
         }
      }

}

export default new ShopperBusiness(
   new IdGenerator(),
   new ShopperDatabase(),
)