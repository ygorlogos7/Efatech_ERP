import React from "react";
import Link from "next/link";
import { PlusCircle, Edit2, Eye, ShoppingBasket, Printer } from "lucide-react";
import { getVendas } from "@/actions/vendas";
import { DeleteVendaButton } from "@/components/forms/DeleteVendaButton";

interface VendasListPageProps {
  tipo: "produtos" | "balcao" | "servicos";
  title: string;
}

export async function VendasListPage({ tipo, title }: VendasListPageProps) {
  const { success, data: items } = await getVendas(tipo);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        <Link href={`/vendas/${tipo}/create`} className="flex items-center gap-1.5 bg-[#00b050] hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-md shadow-sm">
          <PlusCircle className="w-4 h-4" />
          Nova Venda
        </Link>
      </div>

      <div className="bg-white rounded-md shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full text-sm text-left border-collapse min-w-[750px]">
          <thead className="bg-[#f8f9fa] border-b border-gray-200 text-gray-700 font-semibold">
            <tr>
              <th className="py-3 px-4 w-[80px]">Venda Nº</th>
              <th className="py-3 px-4">Data</th>
              <th className="py-3 px-4 text-right">Produtos</th>
              <th className="py-3 px-4 text-right">Serviços</th>
              <th className="py-3 px-4 text-right">Desconto</th>
              <th className="py-3 px-4 text-right font-bold">Total</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-right w-[140px]">Ações</th>
            </tr>
          </thead>
          <tbody>
            {!success || !items || items.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-16 text-gray-500">
                  <ShoppingBasket className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <h5 className="text-lg font-medium text-gray-700">Nenhuma venda de {tipo} encontrada.</h5>
                </td>
              </tr>
            ) : (
              (items as any[]).map((item) => (
                <tr key={item.Id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-bold text-gray-900">#{item.Numero}</td>
                  <td className="py-3 px-4 text-gray-600">{new Date(item.DataVenda).toLocaleDateString("pt-BR")}</td>
                  <td className="py-3 px-4 text-right text-gray-600">R$ {item.TotalProdutos.toFixed(2).replace(".", ",")}</td>
                  <td className="py-3 px-4 text-right text-gray-600">R$ {item.TotalServicos.toFixed(2).replace(".", ",")}</td>
                  <td className="py-3 px-4 text-right text-red-500">- R$ {item.Desconto.toFixed(2).replace(".", ",")}</td>
                  <td className="py-3 px-4 text-right font-bold text-green-700">R$ {item.Total.toFixed(2).replace(".", ",")}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-block px-2.5 py-1 text-[11px] font-medium rounded border ${item.Ativo ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-600 border-red-200"}`}>
                      {item.Ativo ? "Concluída" : "Cancelada"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/vendas/${tipo}/print/${item.Id}`} className="p-1.5 text-gray-600 hover:text-black border border-gray-200 rounded hover:bg-gray-50 transition-colors" title="Imprimir Cupom">
                        <Printer className="w-4 h-4" />
                      </Link>
                      <Link href={`/vendas/${tipo}/preview/${item.Id}`} className="p-1.5 text-blue-400 hover:text-blue-600 border border-blue-200 rounded hover:bg-blue-50 transition-colors" title="Visualizar">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link href={`/vendas/${tipo}/edit/${item.Id}`} className="p-1.5 text-blue-500 hover:text-blue-700 border border-blue-200 rounded hover:bg-blue-50 transition-colors" title="Editar">
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <DeleteVendaButton id={item.Id} numero={item.Numero} tipo={tipo} />
                    </div>
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
