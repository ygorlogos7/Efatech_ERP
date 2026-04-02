import { getOrdemServicoById } from "@/actions/ordensServico";
import { getEmpresa } from "@/actions/configuracoes";
import { notFound } from "next/navigation";
import { Printer, ArrowLeft, Wrench, Calendar, User, Cpu } from "lucide-react";
import Link from "next/link";

export default async function PrintOSPage({ params }: { params: { id: string } }) {
  const { data: os } = await getOrdemServicoById(Number(params.id));
  const { data: empresa } = await getEmpresa();

  if (!os) notFound();

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* ── BARRA DE AÇÕES ── */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center print:hidden bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Ordem de Serviço</h2>
          <p className="text-sm text-gray-500">Comprovante de entrada/saída de equipamento</p>
        </div>
        <div className="flex gap-3">
          <Link 
            href="/ordens-servico" 
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
                <span className="text-blue-500">EFA</span>TECH
             </div>
             <div className="h-8 w-[1px] bg-gray-700 mx-2" />
             <div className="text-xs uppercase tracking-widest opacity-60">
                Soluções e<br />Manutenção
             </div>
          </div>
          <div className="text-right">
             <h1 className="text-2xl font-bold uppercase tracking-tight">ORDEM DE SERVIÇO</h1>
             <p className="text-blue-500 font-mono text-sm font-bold">OS # {os.Numero.toString().padStart(5, '0')}</p>
          </div>
        </div>

        <div className="p-10 space-y-8">
          
          {/* DATAS E STATUS */}
          <div className="grid grid-cols-3 gap-4 border-b border-gray-100 pb-6">
             <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Abertura</span>
                <span className="text-sm font-semibold">{new Date(os.DataAbertura).toLocaleDateString('pt-BR')}</span>
             </div>
             <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Previsão</span>
                <span className="text-sm font-semibold">{os.DataPrevisao ? new Date(os.DataPrevisao).toLocaleDateString('pt-BR') : '---'}</span>
             </div>
             <div className="flex flex-col text-right">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Status</span>
                <span className="text-sm font-bold text-blue-600 uppercase">Em Manutenção</span>
             </div>
          </div>

          {/* DADOS DA EMPRESA E CLIENTE */}
          <div className="grid grid-cols-2 gap-12 text-sm">
            <div className="space-y-2">
              <h4 className="font-bold uppercase text-gray-400 text-[10px] tracking-wider mb-2">Prestador</h4>
              <p className="font-bold text-lg">{empresa?.RazaoSocial || "EFATECH SERVIÇOS"}</p>
              <p className="text-gray-600">{empresa?.Telefone || "(00) 0000-0000"}</p>
              <p className="text-gray-600">{empresa?.Email || "suporte@efatech.com.br"}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold uppercase text-gray-400 text-[10px] tracking-wider mb-2">Cliente</h4>
              {os.Cliente ? (
                <>
                  <p className="font-bold text-lg">{os.Cliente.Nome}</p>
                  <p className="text-gray-600">{os.Cliente.CPFCNPJ || "000.000.000-00"}</p>
                  <p className="text-gray-600">{os.Cliente.TelefoneCelular || os.Cliente.Telefone || "---"}</p>
                </>
              ) : (
                <p className="text-gray-400 italic">Cliente Avulso</p>
              )}
            </div>
          </div>

          {/* DETALHES DO EQUIPAMENTO */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 flex gap-6 items-center">
             <div className="bg-blue-100 p-4 rounded-full text-blue-600">
                <Cpu className="w-8 h-8" />
             </div>
             <div className="flex-1">
                <h4 className="font-bold uppercase text-gray-400 text-[10px] tracking-wider mb-1">Equipamento</h4>
                <p className="text-xl font-bold text-gray-800">{os.Equipamento || "Equipamento não informado"}</p>
             </div>
          </div>

          {/* DESCRIÇÃO DO PROBLEMA */}
          <div className="space-y-4">
             <div className="grid grid-cols-1 gap-6">
                <div className="border border-gray-200 rounded-lg p-5">
                   <h4 className="font-bold uppercase text-red-500 text-[10px] tracking-wider mb-2 flex items-center gap-1">
                      <span className="w-2 h-2 bg-red-500 rounded-full" /> Defeito Relatado
                   </h4>
                   <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{os.Defeito || "---"}</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-5">
                   <h4 className="font-bold uppercase text-emerald-500 text-[10px] tracking-wider mb-2 flex items-center gap-1">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full" /> Solução Realizada
                   </h4>
                   <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{os.Solucao || "---"}</p>
                </div>
             </div>
          </div>

          {/* VALORES */}
          <div className="flex justify-end pt-6">
             <div className="w-64 space-y-2 border-t-2 border-gray-900 pt-4">
                <div className="flex justify-between items-end">
                   <span className="font-bold text-xs">VALOR TOTAL</span>
                   <span className="text-2xl font-black text-gray-900 leading-none tracking-tighter">R$ {Number(os.Total || 0).toFixed(2)}</span>
                </div>
             </div>
          </div>

          {/* TERMOS DE SERVIÇO */}
          <div className="bg-gray-50 p-6 rounded-lg text-[10px] text-gray-500 leading-relaxed">
             <p className="font-bold text-gray-700 uppercase mb-2 border-b border-gray-200 pb-1">Condições Gerais de Prestação de Serviço</p>
             <p className="mb-2">1. O prazo de garantia dos serviços executados é de 90 dias, limitando-se exclusivamente às partes reparadas.</p>
             <p className="mb-2">2. Equipamentos não retirados em até 90 dias após o aviso de conclusão estarão sujeitos a cobrança de taxa de armazenagem ou venda para cobertura de custos.</p>
             <p>3. A EFATECH não se responsabiliza por perda de dados em dispositivos de armazenamento. Backup é de responsabilidade do cliente.</p>
          </div>

          {/* ASSINATURAS */}
          <div className="grid grid-cols-2 gap-20 pt-16 mt-8">
             <div className="text-center space-y-4">
                <div className="h-24 border-b border-gray-300 relative flex items-center justify-center">
                   {os.AssinaturaTecnico ? (
                      <img src={os.AssinaturaTecnico} alt="Assinatura" className="max-h-20 object-contain mix-blend-multiply" />
                   ) : (
                      <div className="text-[10px] text-gray-300 opacity-50 italic">Assinatura do Técnico</div>
                   )}
                </div>
                <p className="text-[10px] font-bold uppercase text-gray-400">Técnico Responsável</p>
             </div>
             
             <div className="text-center space-y-4">
                <div className="h-24 border-b border-gray-300 relative flex items-center justify-center">
                   {os.AssinaturaCliente ? (
                      <img src={os.AssinaturaCliente} alt="Assinatura" className="max-h-20 object-contain mix-blend-multiply" />
                   ) : (
                      <div className="text-[10px] text-gray-300 opacity-50 italic">Assinatura do Cliente</div>
                   )}
                </div>
                <p className="text-[10px] font-bold uppercase text-gray-400">Autorização do Cliente</p>
             </div>
          </div>

          {/* RODAPÉ */}
          <div className="text-center pt-20 pb-4 text-[9px] text-gray-300 uppercase tracking-widest">
             Documento gerado em {new Date().toLocaleString('pt-BR')} · EFATECH OS SYSTEM
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
