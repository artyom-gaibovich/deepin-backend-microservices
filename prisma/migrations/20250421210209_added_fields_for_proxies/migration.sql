-- AlterTable
ALTER TABLE "Proxy" ADD COLUMN     "host" TEXT,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "username" TEXT,
ALTER COLUMN "port" DROP NOT NULL;
