/*
  Warnings:

  - The required column `id` was added to the `proxies_abonent_credentials` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "proxies_abonent_credentials" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "proxies_abonent_credentials_pkey" PRIMARY KEY ("id");
