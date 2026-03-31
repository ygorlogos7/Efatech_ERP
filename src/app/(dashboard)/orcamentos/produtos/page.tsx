import React from "react";
import Link from "next/link";
import { PlusCircle, SearchIcon, Edit2, Box, Package } from "lucide-react";
import { getOrcamentosProdutos } from "@/actions/orcamentos";

export default async function OrcamentosProdutosPage({
  searchParams,
}: {
  searchParams: Promise<{ pesquisa?: string }>;
}) {
  const resolvedParams = await searchParams;
  const pesquisa = resolvedParams?.pesquisa || "";
  const { success, data: items } = await getOrcamentosProdutos(pesquisa);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-3xl font-bold text-gray-900">Orçamentos — Produtos</h2>
        <div className="flex items-center gap-3">
          <form method="get">
            <div className="flex items-center border border-gray-300 rounded-md bg-white px-3 py-1.5 focus-within:ring-2 focus-within:ring-green-500 transition-all">
              <SearchIcon className="w-4 h-4 text-gray-400 mr-2" />
              <input type="text" name="pesquisa" defaultValue={pesquisa} className="outline-none text-sm w-[180px] text-gray-700" placeholder="Nº do orçamento..." />
            </div>
          </form>
          <Link href="/orcamentos/produtos/create" className="flex items-center gap-1.5 bg-[#00b050] hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-md shadow-sm">
            <PlusCircle className="w-4 h-4" />
            Novo Orçamento
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-md shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full text-sm text-left border-collapse min-w-[700px]">
          <thead className="bg-[#f8f9fa] border-b border-gray-200 text-gray-700 font-semibold">
            <tr>
              <th className="py-3 px-6">Nº</th>
              <th className="py-3 px-4">Data Emissão</th>
              <th className="py-3 px-4">Validade</th>
              <th className="py-3 px-4 text-right">Total Produtos</th>
              <th className="py-3 px-4 text-right">Total</th>
              <th className="py-3 px-4 text-center">Situação</th>
            </tr>
          </thead>
          <tbody>
            {!success || !items || items.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-16 text-gray-500">
                  <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <h5 className="text-lg font-medium text-gray-700">Nenhum orçamento de produtos encontrado.</h5>
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.Id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-6 font-bold text-gray-900">#{item.Numero}</td>
                  <td className="py-3 px-4 text-gray-600">{new Date(item.DataEmissao).toLocaleDateString("pt-BR")}</td>
                  <td className="py-3 px-4 text-gray-600">{item.DataValidade ? new Date(item.DataValidade).toLocaleDateString("pt-BR") : "-"}</td>
                  <td className="py-3 px-4 text-right font-medium">R$ {item.TotalProdutos.toFixed(2).replace(".", ",")}</td>
                  <td className="py-3 px-4 text-right font-bold text-green-700">R$ {item.Total.toFixed(2).replace(".", ",")}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-block px-2.5 py-1 text-[11px] font-medium rounded border bg-yellow-50 text-yellow-700 border-yellow-200">
                      {item.Ativo ? "Aberto" : "Encerrado"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
