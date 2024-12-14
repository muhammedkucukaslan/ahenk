/*
  Warnings:

  - You are about to drop the `_CommunityToTopic` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CommunityToTopic" DROP CONSTRAINT "_CommunityToTopic_A_fkey";

-- DropForeignKey
ALTER TABLE "_CommunityToTopic" DROP CONSTRAINT "_CommunityToTopic_B_fkey";

-- DropTable
DROP TABLE "_CommunityToTopic";
