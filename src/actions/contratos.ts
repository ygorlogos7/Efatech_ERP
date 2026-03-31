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

export async function createContrato(formData: FormData) {
  try {
    const data = {
      Numero: Number(formData.get("Numero") || Math.floor(Math.random() * 10000)),
      ValorMensal: Number(formData.get("ValorMensal") || 0),
      DataInicio: new Date(formData.get("DataInicio") as string || new Date()),
      Ativo: true,
      Observacoes: formData.get("Observacoes") as string | null,
    };

    await prisma.contrato.create({ data });
    revalidatePath("/contratos/servicos");
  } catch (error) {
    console.error("Erro ao criar contrato:", error);
    return { success: false, error: "Falha ao gravar contrato no banco." };
  }
  const { redirect } = await import("next/navigation");
  redirect("/contratos/servicos");
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
