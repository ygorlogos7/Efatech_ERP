"use client";

import React from "react";
import Link from "next/link";
import { Home, Settings, HelpCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine, 
  ComposedChart, Line
} from "recharts";

// Dados mockados (simulando 2025/2026 como a imagem)
const fluxoData = [
  { name: 'out 2025', entry: 15, exit: -15 },
  { name: 'nov 2025', entry: 14, exit: -14 },
  { name: 'dez 2025', entry: 19, exit: -20 },
  { name: 'jan 2026', entry: 15, exit: -16 },
  { name: 'fev 2026', entry: 10, exit: -10 },
  { name: 'mar 2026', entry: 3, exit: -3 },
];

const vendasData = [
  { name: 'out 2025', real: 75, target: 70 },
  { name: 'nov 2025', real: 80, target: 70 },
  { name: 'dez 2025', real: 105, target: 70 },
  { name: 'jan 2026', real: 72, target: 70 },
  { name: 'fev 2026', real: 60, target: 70 },
  { name: 'mar 2026', real: 15, target: 70 },
];

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* Top Header / Breadcrumbs */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl text-gray-700 font-normal">Boa noite, Admin</h1>
        <div className="text-sm text-gray-500 flex items-center gap-1.5 font-medium">
          <Home className="w-4 h-4" /> <span>Início</span>
        </div>
      </div>

      {/* Top Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Receber Hoje */}
        <div className="bg-[#00b050] text-white rounded-md shadow p-5 min-h-[140px] flex flex-col relative overflow-hidden group">
          <h3 className="font-semibold text-sm mb-2 opacity-90">A receber hoje</h3>
          <p className="text-3xl font-bold flex-1">R$ 2.320,00</p>
          <Link href="/financeiro/contas-receber" className="text-xs bg-black/10 py-1.5 px-3 mt-4 rounded hover:bg-black/20 transition-colors w-full flex justify-between items-center decoration-transparent">
            <span>Ir para contas a receber</span> <span>→</span>
          </Link>
          {/* Faint overlay icon visual effect */}
          <div className="absolute -right-4 -bottom-4 opacity-20 pointer-events-none group-hover:scale-110 transition-transform">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-24 h-24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
          </div>
        </div>

        {/* Card 2: Pagar Hoje */}
        <div className="bg-[#e74c3c] text-white rounded-md shadow p-5 min-h-[140px] flex flex-col relative overflow-hidden group">
          <h3 className="font-semibold text-sm mb-2 opacity-90">A pagar hoje</h3>
          <p className="text-3xl font-bold flex-1">R$ 0,00</p>
          <Link href="/financeiro/contas-pagar" className="text-xs bg-black/10 py-1.5 px-3 mt-4 rounded hover:bg-black/20 transition-colors w-full flex justify-between items-center decoration-transparent">
            <span>Ir para contas a pagar</span> <span>→</span>
          </Link>
          <div className="absolute -right-2 -bottom-4 opacity-20 pointer-events-none group-hover:scale-110 transition-transform">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-24 h-24"><path d="M3 3h18v18H3zM12 8v8M8 12h8"/></svg>
          </div>
        </div>

        {/* Card 3: Recebimentos */}
        <div className="bg-[#0070c0] text-white rounded-md shadow p-5 min-h-[140px] flex flex-col relative group">
          <div className="flex justify-between items-start mb-2 opacity-90">
            <h3 className="font-semibold text-sm">Recebimentos do mês</h3>
            <span className="text-sm">⚙</span>
          </div>
          <div className="flex-1 flex items-center gap-4">
            {/* Simple CSS Donut Chart */}
            <div className="relative w-14 h-14 shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-20" />
                <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="150" strokeDashoffset={150 - (150 * 25.4) / 100} className="text-white" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[11px] font-bold">25,4%</div>
            </div>
            <div className="text-xs opacity-90 space-y-1">
              <p>Realizado: R$ 1.827,25</p>
              <p>Falta: R$ 5.360,00</p>
              <p>Previsto: R$ 7.187,25</p>
            </div>
          </div>
          <Link href="/financeiro/fluxo-caixa" className="text-xs w-full text-center mt-3 hover:underline block">
            Ir para fluxo de caixa →
          </Link>
        </div>

        {/* Card 4: Pagamentos */}
        <div className="bg-[#0070c0] text-white rounded-md shadow p-5 min-h-[140px] flex flex-col relative group">
          <div className="flex justify-between items-start mb-2 opacity-90">
            <h3 className="font-semibold text-sm">Pagamentos do mês</h3>
            <span className="text-sm">⚙</span>
          </div>
          <div className="flex-1 flex items-center gap-4">
            <div className="relative w-14 h-14 shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="28" cy="28" r="24" stroke="#00b050" strokeWidth="4" fill="#00b050" className="opacity-100" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[12px] font-bold text-white">100%</div>
            </div>
            <div className="text-xs opacity-90 space-y-1">
              <p>Realizado: R$ 1.827,25</p>
              <p>Falta: R$ 0,00</p>
              <p>Previsto: R$ 1.827,25</p>
            </div>
          </div>
          <Link href="/financeiro" className="text-xs w-full text-center mt-3 hover:underline text-white/50 block">
             Acessar painel completo →
            {/* Overlay icon behind it */}
            <div className="absolute right-0 bottom-2 opacity-10 pointer-events-none scale-150 transform">
               <svg viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>
            </div>
          </Link>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
        {/* Fluxo de Caixa Chart */}
        <div className="bg-white rounded-md shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg text-gray-700 font-medium">Fluxo de caixa</h2>
            <span className="text-gray-400">⚙</span>
          </div>
          <div className="h-64 w-full text-sm">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fluxoData} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} tickFormatter={(value) => `${value}k`} dx={-10} />
                <Tooltip cursor={{fill: '#f4f7f6'}} />
                <ReferenceLine y={0} stroke="#E5E7EB" />
                {/* Green positive bars */}
                <Bar dataKey="entry" fill="#00b050" radius={[0, 0, 0, 0]} />
                {/* Red negative bars */}
                <Bar dataKey="exit" fill="#e74c3c" radius={[0, 0, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de Vendas Chart */}
        <div className="bg-white rounded-md shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg text-gray-700 font-medium">Gráfico de vendas</h2>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
          <div className="h-64 w-full text-sm">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={vendasData} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} tickFormatter={(value) => `${value}k`} dx={-10} />
                <Tooltip cursor={{fill: '#f4f7f6'}} />
                {/* Target Dotted Line */}
                <Line type="step" dataKey="target" stroke="#000" strokeWidth={1} strokeDasharray="4 4" dot={{r: 4, fill: '#000'}} activeDot={false} />
                {/* Real Sales Bars */}
                <Bar dataKey="real" fill="#0070c0" radius={[0, 0, 0, 0]} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3 Widgets: Contas Bancárias and Calendário */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
        
        {/* Contas bancárias */}
        <div className="bg-white rounded-md shadow-sm">
          <div className="flex justify-between items-center p-6 pb-0">
            <h2 className="text-lg text-gray-700 font-medium">Contas bancárias</h2>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 pt-2 h-[220px] flex items-center justify-center text-gray-300">
            {/* Empty canvas representation */}
            <p className="text-sm">Sem dados bancários configurados</p>
          </div>
        </div>

        {/* Calendário */}
        <div className="bg-white rounded-md shadow-sm overflow-hidden flex flex-col">
          <div className="flex justify-between items-center p-6 pb-4">
            <h2 className="text-lg text-gray-700 font-medium">Calendário</h2>
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-gray-800">março de 2026</span>
              <div className="flex rounded-md overflow-hidden bg-gray-900 border border-gray-900">
                <button className="px-1.5 py-1 text-white hover:bg-gray-800 transition-colors border-r border-gray-700">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="px-1.5 py-1 text-white hover:bg-gray-800 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 flex-1">
            <table className="w-full h-full text-sm text-center border-collapse">
              <thead className="bg-[#f8f9fa] text-gray-500 text-xs">
                <tr>
                  <th className="py-2.5 font-normal border-b border-r border-gray-100 w-[14.28%]">Dom.</th>
                  <th className="py-2.5 font-normal border-b border-r border-gray-100 w-[14.28%]">Seg.</th>
                  <th className="py-2.5 font-normal border-b border-r border-gray-100 w-[14.28%]">Ter.</th>
                  <th className="py-2.5 font-normal border-b border-r border-gray-100 w-[14.28%]">Qua.</th>
                  <th className="py-2.5 font-normal border-b border-r border-gray-100 w-[14.28%]">Qui.</th>
                  <th className="py-2.5 font-normal border-b border-r border-gray-100 w-[14.28%]">Sex.</th>
                  <th className="py-2.5 font-normal border-b w-[14.28%]">Sáb.</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {[
                  [1, 2, 3, 4, {val: 5, active: true}, 6, 7],
                  [8, 9, 10, 11, 12, 13, 14],
                  [15, 16, 17, 18, 19, 20, 21],
                  [22, 23, 24, 25, 26, 27, 28],
                  [29, 30, 31, {val: 1, dim: true}, {val: 2, dim: true}, {val: 3, dim: true}, {val: 4, dim: true}]
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gray-100 last:border-b-0">
                    {row.map((day, j) => {
                      const isObj = typeof day === 'object';
                      const val = isObj ? (day as any).val : day;
                      const isActive = isObj && (day as any).active;
                      const isDim = isObj && (day as any).dim;

                      return (
                        <td 
                          key={j} 
                          className={`py-3 border-r border-gray-100 last:border-r-0 ${isDim ? 'bg-[#f8f9fa] text-gray-400' : ''}`}
                        >
                          <div className={`mx-auto w-8 h-8 flex items-center justify-center ${isActive ? 'border-2 border-gray-800 font-medium rounded-sm text-gray-900 bg-white' : ''}`}>
                            {val}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
