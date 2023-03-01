-- CreateTable
CREATE TABLE "Notification" (
    "idNotification" TEXT NOT NULL PRIMARY KEY,
    "userIdUser" TEXT NOT NULL,
    "nameUser" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visualized" BOOLEAN NOT NULL,
    CONSTRAINT "Notification_userIdUser_fkey" FOREIGN KEY ("userIdUser") REFERENCES "User" ("idUser") ON DELETE RESTRICT ON UPDATE CASCADE
);
