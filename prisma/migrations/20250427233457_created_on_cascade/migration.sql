-- DropForeignKey
ALTER TABLE "proxies_abonent_credentials" DROP CONSTRAINT "proxies_abonent_credentials_abonentId_fkey";

-- DropForeignKey
ALTER TABLE "proxies_abonent_credentials" DROP CONSTRAINT "proxies_abonent_credentials_proxyId_fkey";

-- AddForeignKey
ALTER TABLE "proxies_abonent_credentials" ADD CONSTRAINT "proxies_abonent_credentials_proxyId_fkey" FOREIGN KEY ("proxyId") REFERENCES "proxies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proxies_abonent_credentials" ADD CONSTRAINT "proxies_abonent_credentials_abonentId_fkey" FOREIGN KEY ("abonentId") REFERENCES "abonents"("id") ON DELETE CASCADE ON UPDATE CASCADE;
