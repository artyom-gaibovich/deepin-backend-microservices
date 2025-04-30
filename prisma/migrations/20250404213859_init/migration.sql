-- CreateTable
CREATE TABLE "Abonent" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Abonent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proxy" (
    "id" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Proxy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProxyToAbonent" (
    "id" TEXT NOT NULL,
    "proxyId" TEXT NOT NULL,
    "abonentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProxyToAbonent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Abonent_email_key" ON "Abonent"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ProxyToAbonent_proxyId_abonentId_key" ON "ProxyToAbonent"("proxyId", "abonentId");

-- AddForeignKey
ALTER TABLE "ProxyToAbonent" ADD CONSTRAINT "ProxyToAbonent_proxyId_fkey" FOREIGN KEY ("proxyId") REFERENCES "Proxy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProxyToAbonent" ADD CONSTRAINT "ProxyToAbonent_abonentId_fkey" FOREIGN KEY ("abonentId") REFERENCES "Abonent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
