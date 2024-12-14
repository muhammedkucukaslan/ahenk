/*
  Warnings:

  - Made the column `slug` on table `Topic` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Topic" ALTER COLUMN "slug" SET NOT NULL;
