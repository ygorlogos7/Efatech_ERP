"use server";

import { prisma } from "@/lib/prisma";



// ---- Resumo Analítico (Exemplo para Relatórios) ----
export async function getResumoGeral() {
  try {
    const totalVendas = await prisma.venda.count();
    const totalClientes = await prisma.cliente.count();
    const totalProdutos = await prisma.produto.count();

    return {
      success: true,
      data: {
        totalVendas,
        totalClientes,
        totalProdutos
      }
    };
  } catch (error) {
    return { success: false, error: "Falha ao buscar resumo analítico." };
  }
}
