-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medicion" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "mesActual" TIMESTAMP(3) NOT NULL,
    "consumoDelMes" INTEGER NOT NULL,
    "consumoDelMesAnterior" INTEGER NOT NULL,
    "tarifaExcedente" INTEGER NOT NULL,
    "totalAPagar" INTEGER NOT NULL,
    "valorFijo" INTEGER NOT NULL,

    CONSTRAINT "Medicion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Medicion_usuarioId_key" ON "Medicion"("usuarioId");

-- AddForeignKey
ALTER TABLE "Medicion" ADD CONSTRAINT "Medicion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
