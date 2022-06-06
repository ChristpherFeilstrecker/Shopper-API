import BaseDataBase from "./BaseDatabase";


export class ShopperDatabase extends BaseDataBase {

   protected tableProductsName: string = "shopper_products";
   protected tableRequestsClient: string = "shopper_requests";
   protected tableRequestProducts: string = "shopper_request_products";

   public async allProducts(): Promise<void|any> {
      try {
         const result = await BaseDataBase.connection.raw(`
            SELECT * from ${this.tableProductsName}
         `);
         return result[0];
      } catch (error) {
         if (error instanceof Error) {
            throw new Error(error.message) 
          }
      }
   }

   public async getProductBiId(
      id: Number
   ): Promise<void|any> {
      try {
         const result = await BaseDataBase.connection.raw(`
            SELECT * from ${this.tableProductsName}
            WHERE id LIKE ${id}
         `);
         return result[0];
      } catch (error) {
         if (error instanceof Error) {
            throw new Error(error.message) 
          }
      }
   }

   public async getProductRequestBiId(
      id_request: String,
      product_id: Number
   ): Promise<void|any> {
      try {
         const result = await BaseDataBase.connection.raw(`
            SELECT * from ${this.tableRequestProducts}
            WHERE id_request LIKE '${id_request}' AND product_id LIKE ${product_id}
         `);
         return result[0];
      } catch (error) {
         if (error instanceof Error) {
            throw new Error(error.message) 
          }
      }
   }

   public async getAllProductsRequestBiId(
      id_request: String
   ): Promise<void|any> {
      try {
         const result = await BaseDataBase.connection.raw(`
            SELECT * from ${this.tableRequestProducts}
            WHERE id_request LIKE '${id_request}'
         `);
         return result[0];
      } catch (error) {
         if (error instanceof Error) {
            throw new Error(error.message) 
          }
      }
   }

   public async allRequests(): Promise<void|any> {
      try {
         const result = await BaseDataBase.connection.raw(`
            SELECT * from ${this.tableRequestsClient}
         `);
         return result[0];
      } catch (error) {
         if (error instanceof Error) {
            throw new Error(error.message) 
          }
      }
   }

   public async newRequest(
         id: String,
         name: String,
         date: String
   ): Promise<void|any> {
      try {
         await BaseDataBase.connection.raw(`
            INSERT INTO ${this.tableRequestsClient} (id, name, date)
            VALUES (
            '${id}', 
            '${name}', 
            '${date}'
            )`
         );
      } catch (error) {
         if (error instanceof Error) {
            throw new Error(error.message) 
          }
      }
   }

   public async newRequestProducts(
      id: String,
      product_id:Number,
      name: String,
      qty: String
): Promise<void|any> {
   try {
      await BaseDataBase.connection.raw(`
         INSERT INTO ${this.tableRequestProducts} (id_request, product_id, name, qty_request)
         VALUES (
         '${id}', 
         '${product_id}', 
         '${name}', 
         '${qty}'
         )`
      );
   } catch (error) {
      if (error instanceof Error) {
         throw new Error(error.message) 
       }
   }
}

public async editProduct(id_product: Number, qty:Number): Promise<  undefined> {
   try {
      const result = await BaseDataBase.connection.raw(`
      UPDATE ${this.tableProductsName} SET qty_stock = '${qty}' WHERE id = '${id_product}'
      `);
      return ;
   } catch (error) {
      if (error instanceof Error) {
         throw new Error(error.message) 
       }
   }
}

public async editRequestProduct(id_request: String, product_id: Number, qty_product:Number): Promise<  undefined> {
   try {
      const result = await BaseDataBase.connection.raw(`
      UPDATE ${this.tableRequestProducts} SET qty_request = '${qty_product}'
       WHERE id_request = '${id_request}' AND product_id LIKE ${product_id}
      `);
      return ;
   } catch (error) {
      if (error instanceof Error) {
         throw new Error(error.message) 
       }
   }
}

public async deleteRequest(
   id_request: String
): Promise<void|any> {
   try {
       await BaseDataBase.connection.raw(`
         DELETE from ${this.tableRequestsClient}
         WHERE id = '${id_request}'
      `);

      await BaseDataBase.connection.raw(`
         DELETE from ${this.tableRequestProducts}
         WHERE id_request = '${id_request}'
      `);
      
   } catch (error) {
      if (error instanceof Error) {
         throw new Error(error.message) 
       }
   }
}

}
