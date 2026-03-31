"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- Orçamentos (Produtos) ---
export async function getOrcamentosProdutos(searchQuery?: string) {
  try {
    const items = await prisma.orcamento.findMany({
      where: {
        TotalProdutos: { gt: 0 },
        ...(searchQuery ? { Numero: { equals: parseInt(searchQuery) || undefined } } : {})
      },
      orderBy: { CreatedAt: "desc" },
    });
    return { success: true, data: items.map(i => ({ ...i, TotalProdutos: Number(i.TotalProdutos), TotalServicos: Number(i.TotalServicos), Desconto: Number(i.Desconto), Total: Number(i.Total) })) };
  } catch (error) {
    return { success: false, error: "Falha ao buscar orçamentos de produtos." };
  }
}

// --- Orçamentos (Serviços) ---
export async function getOrcamentosServicos(searchQuery?: string) {
  try {
    const items = await prisma.orcamento.findMany({
      where: { TotalServicos: { gt: 0 } },
      orderBy: { CreatedAt: "desc" },
    });
    return { success: true, data: items.map(i => ({ ...i, TotalProdutos: Number(i.TotalProdutos), TotalServicos: Number(i.TotalServicos), Desconto: Number(i.Desconto), Total: Number(i.Total) })) };
  } catch (error) {
    return { success: false, error: "Falha ao buscar orçamentos de serviços." };
  }
}

// --- Situações ---
export async function getOrcamentoSituacoes() {
  try {
    const items = await prisma.orcamentoSituacao.findMany({ orderBy: { Nome: "asc" } });
    return { success: true, data: items };
  } catch (error) {
    return { success: false, error: "Falha ao buscar situações." };
  }
}

export async function createOrcamentoSituacao(formData: FormData) {
  try {
    await prisma.orcamentoSituacao.create({
      data: {
        Nome: formData.get("Nome") as string,
        Cor: formData.get("Cor") as string || null,
        Ativo: true,
      }
    });
    revalidatePath("/orcamentos/opcoes/situacoes");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Falha ao criar situação." };
  }
}

// --- Modelos de Email ---
export async function getModelosEmail() {
  try {
    const items = await prisma.orcamentoModeloEmail.findMany({ orderBy: { Nome: "asc" } });
    return { success: true, data: items };
  } catch (error) {
    return { success: false, error: "Falha ao buscar modelos de e-mail." };
  }
}

export async function createModeloEmail(formData: FormData) {
  try {
    await prisma.orcamentoModeloEmail.create({
      data: {
        Nome: formData.get("Nome") as string,
        Assunto: formData.get("Assunto") as string,
        Corpo: formData.get("Corpo") as string,
        Ativo: true,
      }
    });
    revalidatePath("/orcamentos/opcoes/modelos-email");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Falha ao criar modelo." };
  }
}

// --- Configurações ---
export async function getOrcamentoConfig() {
  try {
    const config = await prisma.orcamentoConfig.findFirst();
    return { success: true, data: config };
  } catch (error) {
    return { success: false, error: "Falha ao buscar configurações." };
  }
}

export async function saveOrcamentoConfig(formData: FormData) {
  try {
    const data = {
      ValidadePadraoEmDias: parseInt(formData.get("ValidadePadraoEmDias") as string) || 30,
      MensagemRodape: formData.get("MensagemRodape") as string || null,
      NumeracaoAutomatica: formData.get("NumeracaoAutomatica") === "true",
      EmailPadrao: formData.get("EmailPadrao") as string || null,
    };
    const existing = await prisma.orcamentoConfig.findFirst();
    if (existing) {
      await prisma.orcamentoConfig.update({ where: { Id: existing.Id }, data });
    } else {
      await prisma.orcamentoConfig.create({ data });
    }
    revalidatePath("/orcamentos/opcoes/configuracoes");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Falha ao salvar configurações." };
  }
}
