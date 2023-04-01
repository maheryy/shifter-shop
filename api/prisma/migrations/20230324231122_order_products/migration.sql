/*
  Warnings:

  - The primary key for the `customer_products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `orderId` on the `customer_products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "customer_products" DROP CONSTRAINT "customer_products_orderId_fkey";

-- AlterTable
ALTER TABLE "customer_products" DROP CONSTRAINT "customer_products_pkey",
DROP COLUMN "orderId",
ADD CONSTRAINT "customer_products_pkey" PRIMARY KEY ("customerId", "productId");

-- CreateTable
CREATE TABLE "order_products" (
    "quantity" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "order_products_pkey" PRIMARY KEY ("orderId","productId")
);

-- AddForeignKey
ALTER TABLE "order_products" ADD CONSTRAINT "order_products_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_products" ADD CONSTRAINT "order_products_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
