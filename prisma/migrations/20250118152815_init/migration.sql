/*
  Warnings:

  - Changed the type of `state` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `city` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "state",
ADD COLUMN     "state" INTEGER NOT NULL,
DROP COLUMN "city",
ADD COLUMN     "city" INTEGER NOT NULL;
