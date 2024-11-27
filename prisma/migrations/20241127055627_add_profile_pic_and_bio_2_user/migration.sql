-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profilePic" TEXT NOT NULL DEFAULT 'https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png',
    "bio" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER'
);
INSERT INTO "new_User" ("email", "id", "name", "password", "role") SELECT "email", "id", "name", "password", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
