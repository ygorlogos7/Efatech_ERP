import React from "react";
import Link from "next/link";
import { SearchIcon, PlusCircle, Edit2, Box, Package } from "lucide-react";
import { getProdutos } from "@/actions/produtos";
import { DeleteProdutoButton } from "@/components/forms/DeleteProdutoButton";

export default async function ProdutosPage({
  searchParams,
}: {
  searchParams: Promise<{ pesquisa?: string }>;
}) {
  const resolvedParams = await searchParams;
  const pesquisa = resolvedParams?.pesquisa || "";
  const { success, data: items } = await getProdutos(pesquisa);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-dark font-bold text-3xl text-gray-900 mb-0">Produtos</h2>
        </div>

        <div className="flex items-center gap-3">
          <form method="get" className="m-0">
            <div className="flex items-center border border-gray-300 rounded-md bg-white overflow-hidden px-3 py-1.5 focus-within:ring-2 focus-within:ring-green-500 transition-all">
              <SearchIcon className="w-4 h-4 text-gray-400 mr-2" />
              <input type="text" name="pesquisa" defaultValue={pesquisa} className="outline-none text-sm w-[200px] text-gray-700" placeholder="Buscar Produto ou Cód..." />
            </div>
          </form>

          <Link href="/produtos/create" className="flex items-center gap-1.5 bg-[#00b050] hover:bg-green-600 transition-colors text-white text-sm font-medium px-4 py-2 rounded-md shadow-sm">
            <PlusCircle className="w-4 h-4" />
            Adicionar
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-md shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left align-middle border-collapse min-w-[800px]">
            <thead className="bg-[#f8f9fa] border-b border-gray-200 text-gray-700 font-semibold">
              <tr>
                <th className="py-3 px-6 w-[100px]">Cod. Barras</th>
                <th className="py-3 px-6">Nome do Produto</th>
                <th className="py-3 px-4 text-center">Estoque</th>
                <th className="py-3 px-4 text-right">Preço</th>
                <th className="py-3 px-4 text-center">Situação</th>
                <th className="py-3 px-6 text-right w-[140px]">Ações</th>
              </tr>
            </thead>
            <tbody>
              {!success || !items || items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <h5 className="text-lg font-medium text-gray-700">Nenhum produto encontrado no estoque</h5>
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.Id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-6 font-mono text-gray-500">{item.Cod_CodigoBarras}</td>
                    <td className="py-3 px-6 font-bold text-gray-900">{item.Cod_Nome}</td>
                    <td className="py-3 px-4 text-center font-medium">
                        <span className={`inline-block px-2 py-0.5 rounded ${item.Cod_Estoque > 10 ? 'bg-green-100 text-green-800' : (item.Cod_Estoque > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800')}`}>
                            {item.Cod_Estoque} un.
                        </span>
                    </td>
                    <td className="py-3 px-4 text-right text-gray-700 font-medium">R$ {Number(item.Cod_Preco).toFixed(2).replace('.', ',')}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-block px-2.5 py-1 text-[11px] font-medium rounded border ${item.Ativo ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-600 border-red-200"}`}>
                        {item.Ativo ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link href={`/produtos/preview/${item.Id}`} className="p-1.5 text-blue-400 hover:text-blue-600 border border-blue-200 rounded hover:bg-blue-50 transition-colors" title="Visualizar">
                          <SearchIcon className="w-4 h-4" />
                        </Link>
                        <Link href={`/produtos/edit/${item.Id}`} className="p-1.5 text-blue-500 hover:text-blue-700 border border-blue-200 rounded hover:bg-blue-50 transition-colors" title="Editar">
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <DeleteProdutoButton id={item.Id} nome={item.Cod_Nome} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
