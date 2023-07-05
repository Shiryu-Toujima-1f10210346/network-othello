/*
  Warnings:

  - Added the required column `black` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `white` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "black" TEXT NOT NULL,
ADD COLUMN     "white" TEXT NOT NULL;
