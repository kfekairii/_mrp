-- CreateTable
CREATE TABLE "tab_users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "tab_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tab_users_email_key" ON "tab_users"("email");
