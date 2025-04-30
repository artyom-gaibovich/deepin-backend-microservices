/*
  Warnings:

  - You are about to drop the `proxies_to_abonents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "proxies_to_abonents" DROP CONSTRAINT "proxies_to_abonents_abonentId_fkey";

-- DropForeignKey
ALTER TABLE "proxies_to_abonents" DROP CONSTRAINT "proxies_to_abonents_proxyId_fkey";

-- AlterTable
ALTER TABLE "proxies" ADD COLUMN     "is_active" BOOLEAN;

-- DropTable
DROP TABLE "proxies_to_abonents";

-- CreateTable
CREATE TABLE "project_creeds" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "credentials" JSONB NOT NULL,

    CONSTRAINT "project_creeds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proxies_abonent_credentials" (
    "proxyId" TEXT NOT NULL,
    "abonentId" TEXT NOT NULL,
    "projectCreedsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3)
);

-- CreateIndex
CREATE UNIQUE INDEX "proxies_abonent_credentials_proxyId_abonentId_projectCreeds_key" ON "proxies_abonent_credentials"("proxyId", "abonentId", "projectCreedsId");

-- AddForeignKey
ALTER TABLE "proxies_abonent_credentials" ADD CONSTRAINT "proxies_abonent_credentials_proxyId_fkey" FOREIGN KEY ("proxyId") REFERENCES "proxies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proxies_abonent_credentials" ADD CONSTRAINT "proxies_abonent_credentials_abonentId_fkey" FOREIGN KEY ("abonentId") REFERENCES "abonents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proxies_abonent_credentials" ADD CONSTRAINT "proxies_abonent_credentials_projectCreedsId_fkey" FOREIGN KEY ("projectCreedsId") REFERENCES "project_creeds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
