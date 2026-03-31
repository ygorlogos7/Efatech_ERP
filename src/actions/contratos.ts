"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const toNum = (v: any) => ({ ...v, ValorMensal: Number(v.ValorMensal || 0), ValorDiario: Number(v.ValorDiario || 0), Valor: Number(v.Valor || 0) });

// ---- Contratos ----
export async function getContratos() {
  try {
    const items = await prisma.contrato.findMany({ orderBy: { CreatedAt: "desc" } });
    return { success: true, data: items.map(toNum) };
  } catch (error) {
    return { success: false, error: "Falha ao buscar contratos." };
  }
}

// ---- Locações ----
export async function getLocacoes() {
  try {
    const items = await prisma.locacao.findMany({ orderBy: { CreatedAt: "desc" } });
    return { success: true, data: items.map(toNum) };
  } catch (error) {
    return { success: false, error: "Falha ao buscar locações." };
  }
}

// ---- Assinaturas ----
export async function getAssinaturas() {
  try {
    const items = await prisma.assinatura.findMany({ orderBy: { CreatedAt: "desc" } });
    return { success: true, data: items.map(toNum) };
  } catch (error) {
    return { success: false, error: "Falha ao buscar assinaturas." };
  }
}
