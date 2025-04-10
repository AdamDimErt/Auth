/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `colors` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "brands" ADD COLUMN     "description" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "colors_name_key" ON "colors"("name");
