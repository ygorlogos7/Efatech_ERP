"use client";

import React, { useTransition } from "react";
import { createVenda, updateVenda } from "@/actions/vendas";
import { ShoppingBasket, DollarSign, FileText, Check, X, Edit } from "lucide-react";
import Link from "next/link";
import { useNotification } from "@/hooks/use-notification";

interface VendaFormProps {
  tipo: "produtos" | "balcao" | "servicos";
  initialData?: any;
  isReadOnly?: boolean;
}

const tipoLabel: Record<string, string> = {
  produtos: "Venda de Produtos",
  balcao: "Venda Balcão",
  servicos: "Venda de Serviços",
};

export function VendaForm({ tipo, initialData, isReadOnly = false }: VendaFormProps) {
  const [isPending, startTransition] = useTransition();
  const { success, error } = useNotification();
  const isEdit = !!initialData && !isReadOnly;

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      let r;
      if (isEdit) {
        r = await updateVenda(initialData.Id, tipo, formData);
      } else {
        r = await createVenda(tipo, formData);
      }

      if (r?.success === false) {
        error(r.error || "Erro ao salvar venda.");
      } else {
        success(isEdit ? "Venda atualizada com sucesso!" : "Venda registrada com sucesso!");
      }
    });
  };

  // Calculate total on change for display
  const calcTotal = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const p = parseFloat((form.querySelector('[name="TotalProdutos"]') as HTMLInputElement)?.value || "0");
    const s = parseFloat((form.querySelector('[name="TotalServicos"]') as HTMLInputElement)?.value || "0");
    const d = parseFloat((form.querySelector('[name="Desconto"]') as HTMLInputElement)?.value || "0");
    const totalEl = form.querySelector('[name="Total"]') as HTMLInputElement;
    if (totalEl) totalEl.value = (p + s - d).toFixed(2);
  };

  return (
    <form action={handleSubmit} onChange={calcTotal} className="space-y-6 max-w-5xl">
      {/* ── PRINT LAYOUT ── */}
      <div className="hidden print:block text-sm text-gray-800 mb-6">
        <div className="flex justify-between items-start border-b-2 border-gray-800 pb-3 mb-4">
          <div>
            <h1 className="text-xl font-bold">ERP Efatech</h1>
            <p className="text-gray-500">Sistema de gestão</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">{tipoLabel[tipo]}</p>
            {initialData && <p className="text-gray-500">Nº {initialData.Numero} · {new Date(initialData.DataVenda).toLocaleDateString("pt-BR")}</p>}
          </div>
        </div>
        {initialData && (
          <div className="grid grid-cols-2 gap-4 text-xs mb-4">
            <div><span className="font-bold">Total Produtos:</span> R$ {Number(initialData.TotalProdutos).toFixed(2)}</div>
            <div><span className="font-bold">Total Serviços:</span> R$ {Number(initialData.TotalServicos).toFixed(2)}</div>
            <div><span className="font-bold">Desconto:</span> - R$ {Number(initialData.Desconto).toFixed(2)}</div>
            <div className="text-base font-bold text-green-700"><span>Total Geral:</span> R$ {Number(initialData.Total).toFixed(2)}</div>
          </div>
        )}
        {initialData?.Observacoes && <p className="text-xs mt-4 border-t pt-3"><strong>Obs:</strong> {initialData.Observacoes}</p>}
        <div className="mt-8 flex gap-12">
          <div className="flex-1 border-t border-gray-400 pt-1 text-center text-xs text-gray-500">Assinatura do responsável</div>
          <div className="flex-1 border-t border-gray-400 pt-1 text-center text-xs text-gray-500">Assinatura do cliente</div>
        </div>
      </div>

      {/* ── SCREEN LAYOUT ── */}
      <div className="print:hidden">
        <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
            <ShoppingBasket className="w-4 h-4 text-gray-700" />
            <h3 className="font-semibold text-gray-800 text-sm">{tipoLabel[tipo]}</h3>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Situação</label>
              <select name="Ativo" defaultValue={initialData ? (initialData.Ativo ? "true" : "false") : "true"} disabled={isReadOnly} className="w-full text-sm border border-gray-300 rounded px-3 py-1.5 focus:border-[#00a859] focus:ring-1 focus:ring-[#00a859] disabled:bg-gray-100 disabled:cursor-not-allowed">
                <option value="true">Concluída</option>
                <option value="false">Cancelada</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden mt-6">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-gray-700" />
            <h3 className="font-semibold text-gray-800 text-sm">Valores</h3>
          </div>
          <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Total Produtos (R$)</label>
              <input type="number" step="0.01" name="TotalProdutos" defaultValue={initialData?.TotalProdutos || 0} disabled={isReadOnly} className="w-full text-sm border border-gray-300 rounded px-3 py-1.5 focus:border-[#00a859] focus:ring-1 focus:ring-[#00a859] disabled:bg-gray-100 disabled:cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Total Serviços (R$)</label>
              <input type="number" step="0.01" name="TotalServicos" defaultValue={initialData?.TotalServicos || 0} disabled={isReadOnly} className="w-full text-sm border border-gray-300 rounded px-3 py-1.5 focus:border-[#00a859] focus:ring-1 focus:ring-[#00a859] disabled:bg-gray-100 disabled:cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Desconto (R$)</label>
              <input type="number" step="0.01" name="Desconto" defaultValue={initialData?.Desconto || 0} disabled={isReadOnly} className="w-full text-sm border border-gray-300 rounded px-3 py-1.5 focus:border-[#00a859] focus:ring-1 focus:ring-[#00a859] disabled:bg-gray-100 disabled:cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 text-green-700">Total Geral (R$)</label>
              <input type="number" step="0.01" name="Total" defaultValue={initialData?.Total || 0} disabled={isReadOnly} className="w-full text-sm border border-gray-300 rounded px-3 py-1.5 focus:border-[#00a859] focus:ring-1 focus:ring-[#00a859] disabled:bg-gray-100 disabled:cursor-not-allowed font-bold text-green-700" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden mt-6">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-700" />
            <h3 className="font-semibold text-gray-800 text-sm">Observações</h3>
          </div>
          <div className="p-5">
            <textarea name="Observacoes" rows={3} defaultValue={initialData?.Observacoes || ""} disabled={isReadOnly} className="w-full text-sm border border-gray-300 rounded p-3 focus:border-[#00a859] focus:ring-1 focus:ring-[#00a859] disabled:bg-gray-100 disabled:cursor-not-allowed"></textarea>
          </div>
        </div>
      </div>

      {/* Buttons */}
      {!isReadOnly && (
        <div className="flex gap-3 pt-2 pb-10 print:hidden">
          <button type="submit" disabled={isPending} className="flex items-center gap-1.5 bg-[#00a65a] hover:bg-green-600 text-white font-bold py-2 px-5 rounded shadow-sm text-sm transition-colors disabled:opacity-50">
            <Check className="w-4 h-4" />
            {isPending ? "Salvando..." : isEdit ? "Salvar Alterações" : "Registrar Venda"}
          </button>
          <Link href={`/vendas/${tipo}`} className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-5 rounded shadow-sm text-sm transition-colors">
            <X className="w-4 h-4" /> Cancelar
          </Link>
        </div>
      )}

      {isReadOnly && (
        <div className="flex gap-3 pt-2 pb-10 print:hidden">
          <Link href={`/vendas/${tipo}/edit/${initialData.Id}`} className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-5 rounded shadow-sm text-sm transition-colors">
            <Edit className="w-4 h-4" /> Editar
          </Link>
          <Link href={`/vendas/${tipo}`} className="flex items-center gap-1.5 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-5 rounded shadow-sm text-sm transition-colors">
            <X className="w-4 h-4" /> Voltar
          </Link>
        </div>
      )}
    </form>
  );
}
