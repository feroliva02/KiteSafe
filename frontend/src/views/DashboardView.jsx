import React from 'react';
import { Wind, Gauge, Compass, ShieldCheck, Radio, Users, LifeBuoy, ArrowRight } from 'lucide-react';

export default function DashboardView({ onNavigateNext }) {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>
          <p className="text-sm text-slate-500">Estado operativo del spot en tiempo real</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs bg-white border border-slate-200 shadow-sm px-3 py-1.5 rounded-lg text-slate-600 font-medium">
            📅 28 sep 2026
          </span>
          <button className="p-2 bg-white border border-slate-200 rounded-lg shadow-sm text-slate-500 hover:text-slate-800">
            🔔
          </button>
        </div>
      </div>

      {/* Main Banner: NAVEGABLE (Verde IKO) */}
      <div className="bg-[#054E38] text-white rounded-2xl p-6 shadow-md relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-start gap-5 z-10">
          <div className="w-14 h-14 rounded-full border-4 border-white/30 flex items-center justify-center font-black text-2xl text-white bg-emerald-600/40">
            ✓
          </div>
          <div>
            <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] tracking-wide uppercase bg-emerald-900/60 text-emerald-300 font-bold mb-1 border border-emerald-500/30">
              ● Condiciones Verificadas
            </div>
            <h3 className="text-3xl font-extrabold tracking-tight">NAVEGABLE</h3>
            <p className="text-emerald-100 text-sm max-w-xl mt-1">
              Viento estable, orientación segura y visibilidad óptima. Operación habilitada con supervisión estándar.
            </p>
          </div>
        </div>
        <div className="text-right z-10 bg-emerald-900/40 px-4 py-3 rounded-xl border border-emerald-500/20">
          <p className="text-[10px] uppercase text-emerald-300 tracking-wider">Última Actualización</p>
          <p className="text-xl font-bold text-white">10:42</p>
          <p className="text-xs text-emerald-200/80">📡 Estación TS-04 - Costa</p>
        </div>
      </div>

      {/* Grid de 3 Métricas Críticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-500">Viento Medio</span>
            <Wind size={20} className="text-teal-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-slate-800">18</span>
            <span className="text-sm font-semibold text-slate-500">kts</span>
          </div>
          <p className="text-xs text-emerald-600 font-medium mt-2">Estable durante los últimos 20 min</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-500">Ráfagas</span>
            <Gauge size={20} className="text-teal-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-slate-800">22</span>
            <span className="text-sm font-semibold text-slate-500">kts</span>
          </div>
          <p className="text-xs text-emerald-600 font-medium mt-2">Diferencial seguro de 4 kts</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-500">Orientación</span>
            <Compass size={20} className="text-teal-600" />
          </div>
          <p className="text-2xl font-bold text-slate-800">side-onshore</p>
          <p className="text-xs text-slate-500 mt-2">Costero suroeste • 245°</p>
        </div>
      </div>

      {/* Ventana Operativa & Control de Operación */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              ⏱ Ventana Operativa
            </h4>
            <span className="text-xs text-slate-400">Pronóstico por hora</span>
          </div>
          {/* Gráfico de barras simple simulando el pronóstico */}
          <div className="grid grid-cols-6 gap-3 items-end h-32 pt-4">
            {[
              { h: '09:00', kts: 17, c: 'bg-teal-700' },
              { h: '10:00', kts: 18, c: 'bg-emerald-700' },
              { h: '11:00', kts: 19, c: 'bg-teal-600' },
              { h: '12:00', kts: 20, c: 'bg-teal-600' },
              { h: '13:00', kts: 18, c: 'bg-teal-700' },
              { h: '14:00', kts: 15, c: 'bg-amber-600' }
            ].map((bar, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end">
                <span className="text-[11px] font-bold text-slate-600">{bar.kts} kts</span>
                <div className={`w-full rounded-t-lg ${bar.c}`} style={{ height: `${(bar.kts / 24) * 100}%` }}></div>
                <span className="text-[10px] text-slate-400 font-medium">{bar.h}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center text-xs text-slate-500 mt-6 pt-4 border-t border-slate-100">
            <span>● Rango recomendado: 16 - 22 kts</span>
            <span>Marea: 1,2 m subiendo</span>
          </div>
        </div>

        {/* Control de Operación */}
        <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-slate-800 text-sm mb-4">Control de operación</h4>
            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 flex items-center gap-2">🟢 Zona de salida</span>
                <span className="font-bold text-slate-700">Despejada</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 flex items-center gap-2">🛟 Equipo de rescate</span>
                <span className="font-bold text-slate-700">Disponible</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 flex items-center gap-2">👥 Alumnos activos</span>
                <span className="font-bold text-slate-700">6 de 12</span>
              </div>
            </div>
          </div>

          <button
            onClick={onNavigateNext}
            className="w-full mt-6 bg-[#0E7490] hover:bg-[#0891B2] text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            Iniciar Asignación de Equipamiento
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}