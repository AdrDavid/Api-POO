-- CreateTable
CREATE TABLE "Categoria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Escuderia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "categoriaId" INTEGER,
    "pontos" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Escuderia_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Piloto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "escuderiaId" INTEGER,
    "pontos" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Piloto_escuderiaId_fkey" FOREIGN KEY ("escuderiaId") REFERENCES "Escuderia" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Carro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "escuderiaId" INTEGER,
    "pilotoId" INTEGER,
    CONSTRAINT "Carro_escuderiaId_fkey" FOREIGN KEY ("escuderiaId") REFERENCES "Escuderia" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Carro_pilotoId_fkey" FOREIGN KEY ("pilotoId") REFERENCES "Piloto" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Carro_pilotoId_key" ON "Carro"("pilotoId");
