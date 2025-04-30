/*
  Warnings:

  - Added the required column `passwordHash` to the `Abonent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Abonent" ADD COLUMN     "passwordHash" TEXT NOT NULL;
