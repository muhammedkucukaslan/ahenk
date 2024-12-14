/*
  Warnings:

  - The primary key for the `Topic` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `isPublic` to the `Community` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_topicId_fkey";

-- AlterTable
ALTER TABLE "Community" ADD COLUMN     "isPublic" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "topicId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Topic_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Topic_id_seq";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
