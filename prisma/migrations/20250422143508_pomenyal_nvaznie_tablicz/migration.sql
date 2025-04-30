/*
  Warnings:

  - You are about to drop the `Abonent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Proxy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProxyToAbonent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProxyToAbonent" DROP CONSTRAINT "ProxyToAbonent_abonentId_fkey";

-- DropForeignKey
ALTER TABLE "ProxyToAbonent" DROP CONSTRAINT "ProxyToAbonent_proxyId_fkey";

-- DropTable
DROP TABLE "Abonent";

-- DropTable
DROP TABLE "Proxy";

-- DropTable
DROP TABLE "ProxyToAbonent";

-- CreateTable
CREATE TABLE "abonents" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "refreshToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "abonents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proxies" (
    "id" TEXT NOT NULL,
    "ip" TEXT,
    "port" INTEGER,
    "protocol" TEXT,
    "host" TEXT,
    "username" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "proxies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proxies_to_abonents" (
    "id" TEXT NOT NULL,
    "proxyId" TEXT NOT NULL,
    "abonentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "proxies_to_abonents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "abonents_email_key" ON "abonents"("email");

-- CreateIndex
CREATE UNIQUE INDEX "proxies_to_abonents_proxyId_abonentId_key" ON "proxies_to_abonents"("proxyId", "abonentId");

-- AddForeignKey
ALTER TABLE "proxies_to_abonents" ADD CONSTRAINT "proxies_to_abonents_proxyId_fkey" FOREIGN KEY ("proxyId") REFERENCES "proxies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proxies_to_abonents" ADD CONSTRAINT "proxies_to_abonents_abonentId_fkey" FOREIGN KEY ("abonentId") REFERENCES "abonents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
