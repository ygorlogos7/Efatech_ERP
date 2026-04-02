import { getVendaById } from "@/actions/vendas";
import { getEmpresa } from "@/actions/configuracoes";
import { notFound } from "next/navigation";
import { Printer, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function PrintVendaPage({ params }: { params: { id: string } }) {
  const { data: venda } = await getVendaById(Number(params.id));
  const { data: empresa } = await getEmpresa();

  if (!venda) notFound();

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* ── BARRA DE AÇÕES (ESCONDIDA NA IMPRESSÃO) ── */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center print:hidden bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Comprovante de Venda</h2>
          <p className="text-sm text-gray-500">Visualização de impressão para o cliente</p>
        </div>
        <div className="flex gap-3">
          <Link 
            href="/vendas/balcao" 
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 font-medium transition"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar
          </Link>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-bold shadow-md transition"
          >
            <Printer className="w-4 h-4" /> IMPRIMIR
          </button>
        </div>
      </div>

      {/* ── ÁREA DE IMPRESSÃO ── */}
      <div id="print-area" className="max-w-[800px] mx-auto bg-white shadow-lg print:shadow-none print:m-0 print:max-w-full">
        
        {/* CABEÇALHO PRETO */}
        <div className="bg-black text-white p-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <div className="text-2xl font-black tracking-tighter">
                <span className="text-emerald-500">EFA</span>TECH
             </div>
             <div className="h-8 w-[1px] bg-gray-700 mx-2" />
             <div className="text-xs uppercase tracking-widest opacity-60">
                Soluções em<br />Tecnologia
             </div>
          </div>
          <div className="text-right">
             <h1 className="text-2xl font-bold uppercase">VENDA BALCÃO</h1>
             <p className="text-emerald-500 font-mono text-sm">Nº {venda.Numero.toString().padStart(6, '0')}</p>
          </div>
        </div>

        <div className="p-10 space-y-8">
          
          {/* DADOS DA EMPRESA E CLIENTE */}
          <div className="grid grid-cols-2 gap-12 text-sm border-b pb-8">
            <div className="space-y-2">
              <h4 className="font-bold uppercase text-gray-400 text-[10px] tracking-wider mb-2">Emitente</h4>
              <p className="font-bold text-lg">{empresa?.RazaoSocial || "EFATECH SERVIÇOS"}</p>
              <p className="text-gray-600 line-clamp-1">{empresa?.Telefone || "(00) 0000-0000"}</p>
              <p className="text-gray-600">{empresa?.Email || "contato@efatech.com.br"}</p>
              <p className="text-gray-600 uppercase text-[10px]">{empresa?.Cnpj || "00.000.000/0001-00"}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold uppercase text-gray-400 text-[10px] tracking-wider mb-2">Destinatário</h4>
              {venda.Cliente ? (
                <>
                  <p className="font-bold text-lg leading-tight">{venda.Cliente.Nome}</p>
                  <p className="text-gray-600">{venda.Cliente.CPFCNPJ || "CPF: 000.000.000-00"}</p>
                  <p className="text-gray-600 line-clamp-1">{venda.Cliente.TelefoneCelular || venda.Cliente.Telefone || "Sem telefone"}</p>
                  <p className="text-gray-600 text-xs">{venda.Cliente.Email || ""}</p>
                </>
              ) : (
                <p className="text-gray-400 italic">Consumidor não identificado</p>
              )}
            </div>
          </div>

          {/* TABELA DE ITENS */}
          <div className="space-y-4">
             <h4 className="font-bold uppercase text-gray-400 text-[10px] tracking-wider">Itens da Venda</h4>
             <table className="w-full text-left border-collapse">
                <thead>
                   <tr className="bg-gray-50 border-y border-gray-100 text-[11px] font-bold uppercase text-gray-500">
                      <th className="py-3 px-2 w-12 text-center">QTD</th>
                      <th className="py-3 px-2">DESCRIÇÃO DOS PRODUTOS / SERVIÇOS</th>
                      <th className="py-3 px-2 text-right w-28">V. UNIT (R$)</th>
                      <th className="py-3 px-2 text-right w-28">TOTAL (R$)</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                   {venda.Itens?.map((item: any) => (
                      <tr key={item.Id} className="text-sm">
                         <td className="py-4 px-2 text-center font-bold">{item.Quantidade}</td>
                         <td className="py-4 px-2">
                            <span className="font-semibold block">{item.Produtos?.Cod_Nome || "Produto"}</span>
                            <span className="text-[10px] text-gray-400 uppercase">CÓD: {item.Produtos?.Cod_CodigoBarras || item.ProdutoId}</span>
                         </td>
                         <td className="py-4 px-2 text-right">R$ {Number(item.Produtos?.Cod_Preco || 0).toFixed(2)}</td>
                         <td className="py-4 px-2 text-right font-bold">R$ {Number(item.ValorTotal).toFixed(2)}</td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>

          {/* RESUMO DE VALORES */}
          <div className="flex justify-end pt-6">
             <div className="w-64 space-y-2 border-t pt-4">
                <div className="flex justify-between text-sm text-gray-600">
                   <span>SUBTOTAL</span>
                   <span>R$ {Number(venda.TotalProdutos).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                   <span>DESCONTO</span>
                   <span className="text-red-500">- R$ {Number(venda.Desconto).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-end pt-2 border-t border-gray-100">
                   <span className="font-bold text-xs">TOTAL FINAL</span>
                   <span className="text-2xl font-black text-gray-900 leading-none tracking-tighter">R$ {Number(venda.Total).toFixed(2)}</span>
                </div>
             </div>
          </div>

          {/* TERMOS E GARANTIA */}
          <div className="bg-gray-50 p-6 rounded-lg text-[10px] text-gray-500 leading-relaxed space-y-3">
             <p className="font-bold text-gray-700 uppercase mb-2 border-b border-gray-200 pb-1">Termos de Garantia e Responsabilidade</p>
             <p>1. A EFATECH garante os produtos contra defeitos de fabricação pelo prazo de 90 dias a contar desta data.</p>
             <p>2. A garantia não cobre danos causados por mau uso, quedas, umidade, descargas elétricas ou intervenções de terceiros não autorizados.</p>
             <p>3. Software e sistemas operacionais não possuem garantia de funcionamento ininterrupto, apenas suporte contra bugs de instalação inicial.</p>
             <p>4. Em caso de troca, é indispensável a apresentação deste comprovante original e embalagem do produto.</p>
          </div>

          {/* ASSINATURAS */}
          <div className="grid grid-cols-2 gap-20 pt-16 mt-8">
             <div className="text-center space-y-4">
                <div className="h-24 border-b border-gray-300 relative flex items-end justify-center">
                   <div className="text-[10px] text-gray-300 opacity-50 absolute inset-0 flex items-center justify-center italic">EFATECH - Responsável</div>
                </div>
                <p className="text-[10px] font-bold uppercase text-gray-400">Assinatura do Vendedor</p>
             </div>
             
             <div className="text-center space-y-4">
                <div className="h-24 border-b border-gray-300 relative flex items-center justify-center">
                   {venda.AssinaturaCliente ? (
                      <img src={venda.AssinaturaCliente} alt="Assinatura" className="max-h-20 object-contain mix-blend-multiply" />
                   ) : (
                      <div className="text-[10px] text-gray-300 opacity-50 italic">Área para Assinatura do Cliente</div>
                   )}
                </div>
                <p className="text-[10px] font-bold uppercase text-gray-400">Assinatura do Cliente</p>
             </div>
          </div>

          {/* RODAPÉ */}
          <div className="text-center pt-20 pb-4 text-[9px] text-gray-300 uppercase tracking-widest">
             Documento gerado em {new Date().toLocaleString('pt-BR')} · EFATECH ERP V3.0
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body { background: white !important; margin: 0; padding: 0; }
          .min-h-screen { background: white !important; padding: 0 !important; }
          #print-area { width: 100% !important; max-width: none !important; margin: 0 !important; box-shadow: none !important; }
          footer, nav, button, .print-hidden { display: none !important; }
        }
      `}} />
    </div>
  );
}
