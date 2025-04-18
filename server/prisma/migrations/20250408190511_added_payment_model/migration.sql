-- CreateTable
CREATE TABLE "Payments" (
    "id" SERIAL NOT NULL,
    "paymentId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "value" BIGINT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payments_paymentId_key" ON "Payments"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "Payments_email_key" ON "Payments"("email");
