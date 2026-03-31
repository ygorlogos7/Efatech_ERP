"use client";

import React, { useTransition } from "react";
import { createOrdemServico, updateOrdemServico } from "@/actions/ordensServico";
import { ClipboardList, Wrench, FileText, DollarSign, Check, X, Edit } from "lucide-react";
import Link from "next/link";

interface OSFormProps {
  initialData?: any;
  isReadOnly?: boolean;
}

export function OSForm({ initialData, isReadOnly = false }: OSFormProps) {
  const [isPending, startTransition] = useTransition();
  const isEdit = !!initialData && !isReadOnly;

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      if (isEdit) {
        await updateOrdemServico(initialData.Id, formData);
      } else {
        await createOrdemServico(formData);
      }
    });
  };

  const formatDateForInput = (date: any) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  return (
    <form action={handleSubmit} className="space-y-6 max-w-5xl">
      {/* Cabeçalho / Status */}
      <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-gray-700" />
          <h3 className="font-semibold text-gray-800 text-sm">Dados da Ordem de Serviço</h3>
        </div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Situação</label>
            <select name="Ativo" defaultValue={initialData ? (initialData.Ativo ? "true" : "false") : "true"} disabled={isReadOnly} className="w-full text-sm border border-gray-300 rounded px-3 py-1.5 focus:border-[#00a859] focus:ring-1 focus:ring-[#00a859] disabled:bg-gray-100 disabled:cursor-not-allowed">
              <option value="true">Aberta</option>
              <option value="false">Encerrada</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Data de Previsão</label>
            <input type="date" name="DataPrevisao" defaultValue={formatDateForInput(initialData?.DataPrevisao)} disabled={isReadOnly} className="w-full text-sm border border-gray-300 rounded px-3 py-1.5 focus:border-[#00a859] focus:ring-1 focus:ring-[#00a859] disabled:bg-gray-100 disabled:cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Equipamento / Item</label>
            <input type="text" name="Equipamento" defaultValue={initialData?.Equipamento} disabled={isReadOnly} placeholder="Ex: Notebook Dell Inspiron" className="w-full text-sm border border-gray-300 rounded px-3 py-1.5 focus:border-[#00a859] focus:ring-1 focus:ring-[#00a859] disabled:bg-gray-100 disabled:cursor-not-allowed" />
          </div>
        </div>
      </div>

      {/* Defeito e Solução */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-gray-700" />
            <h3 className="font-semibold text-gray-800 text-sm">Defeito Relatado</h3>
          </div>
          <div className="p-5">
            <textarea name="Defeito" rows={4} defaultValue={initialData?.Defeito} disabled={isReadOnly} placeholder="Descreva o defeito informado pelo cliente..." className="w-full text-sm border border-gray-300 rounded p-3 focus:border-[#00a859] focus:ring-1 focus:ring-[#00a859] disabled:bg-gray-100 disabled:cursor-not-allowed"></textarea>
          </div>
        </div>

        <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
            <Check className="w-4 h-4 text-gray-700" />
            <h3 className="font-semibold text-gray-800 text-sm">Solução Aplicada</h3>
          </div>
          <div className="p-5">
            <textarea name="Solucao" rows={4} defaultValue={initialData?.Solucao} disabled={isReadOnly} placeholder="Descreva o que foi feito para resolver..." className="w-full text-sm border border-gray-300 rounded p-3 focus:border-[#00a859] focus:ring-1 focus:ring-[#00a859] disabled:bg-gray-100 disabled:cursor-not-allowed"></textarea>
          </div>
        </div>
      </div>

      {/* Valor e Observações */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-gray-700" />
            <h3 className="font-semibold text-gray-800 text-sm">Valor Total</h3>
          </div>
          <div className="p-5">
            <input type="number" step="0.01" name="Total" defaultValue={initialData?.Total || 0} disabled={isReadOnly} className="w-full text-sm border border-gray-300 rounded px-3 py-1.5 focus:border-[#00a859] focus:ring-1 focus:ring-[#00a859] disabled:bg-gray-100 disabled:cursor-not-allowed text-green-700 font-bold" />
          </div>
        </div>

        <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden md:col-span-2">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-700" />
            <h3 className="font-semibold text-gray-800 text-sm">Observações Internas</h3>
          </div>
          <div className="p-5">
            <textarea name="Observacoes" rows={2} defaultValue={initialData?.Observacoes} disabled={isReadOnly} className="w-full text-sm border border-gray-300 rounded p-3 focus:border-[#00a859] focus:ring-1 focus:ring-[#00a859] disabled:bg-gray-100 disabled:cursor-not-allowed"></textarea>
          </div>
        </div>
      </div>

      {!isReadOnly && (
        <div className="flex gap-3 pt-2 pb-10">
          <button type="submit" disabled={isPending} className="flex items-center gap-1.5 bg-[#00a65a] hover:bg-green-600 text-white font-bold py-2 px-5 rounded shadow-sm text-sm transition-colors disabled:opacity-50">
            <Check className="w-4 h-4" />
            {isPending ? "Salvando..." : isEdit ? "Salvar Alterações" : "Abrir O.S."}
          </button>
          <Link href="/ordens-servico" className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-5 rounded shadow-sm text-sm transition-colors">
            <X className="w-4 h-4" /> Cancelar
          </Link>
        </div>
      )}
      {isReadOnly && (
        <div className="flex gap-3 pt-2 pb-10">
          <Link href={`/ordens-servico/edit/${initialData.Id}`} className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-5 rounded shadow-sm text-sm transition-colors">
            <Edit className="w-4 h-4" /> Editar O.S.
          </Link>
          <Link href="/ordens-servico" className="flex items-center gap-1.5 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-5 rounded shadow-sm text-sm transition-colors">
            <X className="w-4 h-4" /> Voltar
          </Link>
        </div>
      )}
    </form>
  );
}
