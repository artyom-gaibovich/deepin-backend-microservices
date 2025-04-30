/*
  Warnings:

  - The primary key for the `proxies_to_abonents` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `proxies_to_abonents` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "abonents" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "proxies" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "proxies_to_abonents" DROP CONSTRAINT "proxies_to_abonents_pkey",
DROP COLUMN "id",
ALTER COLUMN "updatedAt" DROP NOT NULL;
