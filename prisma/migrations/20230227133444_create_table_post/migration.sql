-- CreateTable
CREATE TABLE "Post" (
    "idPost" TEXT NOT NULL PRIMARY KEY,
    "userIdUser" TEXT NOT NULL,
    "gameIdGame" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "discord" TEXT NOT NULL,
    "yearPlaying" INTEGER NOT NULL,
    "weekDays" TEXT NOT NULL,
    "hourStart" INTEGER NOT NULL,
    "hourEnd" INTEGER NOT NULL,
    "useVoiceChannel" BOOLEAN NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Post_userIdUser_fkey" FOREIGN KEY ("userIdUser") REFERENCES "User" ("idUser") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Post_gameIdGame_fkey" FOREIGN KEY ("gameIdGame") REFERENCES "Game" ("idGame") ON DELETE RESTRICT ON UPDATE CASCADE
);
