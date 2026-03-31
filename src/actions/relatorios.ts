"use server";

import { prisma } from "@/lib/prisma";

// ---- Logs do Sistema ----
export async function getLogs() {
  try {
    const items = await prisma.logSistema.findMany({
      orderBy: { Data: "desc" },
      take: 100
    });
    return { success: true, data: items };
  } catch (error) {
    return { success: false, error: "Falha ao buscar logs do sistema." };
  }
}

export async function createLog(acao: string, modulo?: string, descricao?: string) {
  try {
    await prisma.logSistema.create({
      data: { Acao: acao, Modulo: modulo, Descricao: descricao }
    });
    return { success: true };
  } catch (error) {
    console.error("Erro ao registrar log:", error);
    return { success: false };
  }
}

// ---- Resumo Analítico (Exemplo para Relatórios) ----
export async function getResumoGeral() {
  try {
    const totalVendas = await prisma.venda.count();
    const totalClientes = await prisma.cliente.count();
    const totalProdutos = await prisma.produto.count();
    const totalFinanceiro = await prisma.contaReceber.aggregate({ _sum: { Valor: true } });

    return {
      success: true,
      data: {
        totalVendas,
        totalClientes,
        totalProdutos,
        totalFinanceiro: Number(totalFinanceiro._sum.Valor || 0)
      }
    };
  } catch (error) {
    return { success: false, error: "Falha ao buscar resumo analítico." };
  }
}
