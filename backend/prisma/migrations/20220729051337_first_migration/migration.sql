-- CreateTable
CREATE TABLE "biddings" (
    "ref" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "etapa" TEXT NOT NULL,
    "numProcesso" TEXT NOT NULL,
    "modalidade" TEXT NOT NULL,
    "comissao" TEXT NOT NULL,
    "licitacao" TEXT NOT NULL,
    "numSolicitacaoCompra" TEXT NOT NULL,
    "valorEstimado" TEXT NOT NULL,

    CONSTRAINT "biddings_pkey" PRIMARY KEY ("ref")
);
