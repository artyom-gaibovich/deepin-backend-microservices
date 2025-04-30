-- CreateEnum
CREATE TYPE "SocketStatus" AS ENUM ('AUTHROIZATED', 'ONLINE', 'OFFLINE');

-- CreateTable
CREATE TABLE "socket" (
    "id" TEXT NOT NULL,
    "proxyToAbonentProjectId" TEXT NOT NULL,
    "status" "SocketStatus",

    CONSTRAINT "socket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "socket_logs" (
    "id" TEXT NOT NULL,
    "socketId" TEXT,
    "log" TEXT,

    CONSTRAINT "socket_logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "socket" ADD CONSTRAINT "socket_proxyToAbonentProjectId_fkey" FOREIGN KEY ("proxyToAbonentProjectId") REFERENCES "proxies_abonent_credentials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "socket_logs" ADD CONSTRAINT "socket_logs_socketId_fkey" FOREIGN KEY ("socketId") REFERENCES "socket"("id") ON DELETE SET NULL ON UPDATE CASCADE;
