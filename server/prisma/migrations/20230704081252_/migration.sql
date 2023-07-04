/*
  Warnings:

  - You are about to drop the column `black` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `white` on the `Room` table. All the data in the column will be lost.
  - Added the required column `blackUserId` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whiteUserId` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "black",
DROP COLUMN "white",
ADD COLUMN     "blackUserId" TEXT NOT NULL,
ADD COLUMN     "whiteUserId" TEXT NOT NULL;
