/*
  Warnings:

  - You are about to drop the column `communityId` on the `Post` table. All the data in the column will be lost.
  - Added the required column `communityName` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_communityId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "communityId",
ADD COLUMN     "communityName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_communityName_fkey" FOREIGN KEY ("communityName") REFERENCES "Community"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
