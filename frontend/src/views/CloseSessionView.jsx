import React, { useState } from 'react';
import { Clock, AlertTriangle, ShieldX, CheckCircle, Save } from 'lucide-react';

export default function CloseSessionView({ onReset }) {
  const [minutos, setMinutos] = useState(90);
  const [cerrada, setCerrada] = useState(false);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Cierre de sesión</h2>
          <p className="text-sm text-slate-500">Revisa actividad, fatiga y observaciones antes de registrar</p>
        </div>
        <span className="text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-slate-600 font-medium">
          📅 28 sep 2026
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Tarjeta de Duración Cronometrada */}
          <div className="bg-[#101D2D] text-white p-6 rounded-2xl flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full border-4 border-teal-500/30 flex items-center justify-center text-teal-400">
                <Clock size={28} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-semibold">Duración Cronometrada</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white">{minutos}</span>
                  <span className="text-sm text-gray-300 font-medium">min</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Inicio 11:02 • Fin 12:32 • Sin pausas registradas</p>
              </div>
            </div>
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs px-3 py-1 rounded-full font-bold">
              FINALIZADA
            </span>
          </div>

          {/* Barras de Fatiga de Materiales (CU-04, CU-06, CU-07) */}
          <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm space-y-5">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold text-slate-800 text-sm">Fatiga del equipamiento</h4>
              <span className="text-xs text-slate-400">Horas acumuladas / límite</span>
            </div>

            {/* Cometa: 42% (Verde) */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-700">Cometa - Duotone Rebel 9m</span>
                <span className="text-slate-500">105 / 250 hs</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '42%' }}></div>
              </div>
              <p className="text-[11px] text-slate-400">42% de vida útil • estado óptimo</p>
            </div>

            {/* Barra: 96% (Amarillo - Alerta preventiva CU-06) */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-700">Barra - Trust Bar M/L</span>
                <span className="text-amber-600">96 / 100 hs</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '96%' }}></div>
              </div>
              <p className="text-[11px] text-amber-600 font-medium">Revisión preventiva requerida en 4 hs</p>
            </div>

            {/* Líneas: 100% (Rojo - Bloqueo Técnico CU-07) */}
            <div className="p-4 bg-red-50/60 rounded-xl border border-red-200 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-red-900 flex items-center gap-1.5">
                  <ShieldX size={15} className="text-red-600" />
                  Líneas - Set 24 m
                </span>
                <span className="text-red-700">100 / 100 hs</span>
              </div>
              <div className="w-full bg-red-200 rounded-full h-2.5 overflow-hidden">
                <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-[11px] font-bold text-red-600 uppercase tracking-wide">
                  ● BLOQUEADO POR MANTENIMIENTO
                </span>
                <span className="text-xs text-red-700 font-bold">100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Panel Lateral de Registro de Cierre */}
        <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="font-bold text-slate-800 text-sm pb-2 border-b border-slate-100">
              Registro de cierre
            </h4>

            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1 block">Notas del instructor</label>
              <textarea
                readOnly
                defaultValue="Buen control de ceñida y transiciones. Reforzar despegue asistido en la próxima sesión."
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-700 resize-none"
              />
            </div>

            {/* Alerta de Mantenimiento */}
            <div className="bg-red-50 p-3 rounded-lg border border-red-200 flex gap-2.5 text-xs text-red-800">
              <AlertTriangle size={18} className="text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Acción de mantenimiento creada</p>
                <p className="text-[11px] text-red-600 mt-0.5">
                  Las líneas L-24-03 quedarán bloqueadas al cerrar la sesión.
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600 pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle size={15} className="text-teal-600" />
                <span>Equipo devuelto y seco</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={15} className="text-teal-600" />
                <span>Horas de uso imputadas</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-6">
            <button
              onClick={() => setCerrada(true)}
              className="w-full bg-[#0E7490] hover:bg-[#0891B2] text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              {cerrada ? '✓ Sesión Registrada en Bitácora' : 'Cerrar y registrar sesión'}
            </button>
            <button
              onClick={onReset}
              className="w-full text-xs text-slate-500 hover:text-slate-800 py-2 font-semibold"
            >
              Reiniciar flujo de demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}