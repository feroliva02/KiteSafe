import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

export default function AssignmentView({ onNavigateNext }) {
  const [peso, setPeso] = useState(72);
  const [nivel, setNivel] = useState('Intermedio');
  const [superficie, setSuperficie] = useState('9m - 10m');
  const [selectedKite, setSelectedKite] = useState(1);
  const [selectedBar, setSelectedBar] = useState(3);
  const [confirmedCheck, setConfirmedCheck] = useState(true);

  // Recalcular en tiempo real al cambiar peso o nivel
  useEffect(() => {
    // Ecuación cuadrática representativa de sustentación
    const factorViento = 18;
    let s = (peso * 2.6) / factorViento;
    if (nivel === 'Principiante') s *= 0.90;
    if (nivel === 'Avanzado') s *= 1.05;
    
    setSuperficie(`${Math.floor(s)}m - ${Math.ceil(s)}m`);
  }, [peso, nivel]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Asignación de equipamiento</h2>
          <p className="text-sm text-slate-500">Configura un set seguro según el perfil y las condiciones</p>
        </div>
        <span className="text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-slate-600 font-medium">
          📅 28 sep 2026
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulario y Selección */}
        <div className="lg:col-span-2 space-y-6">
          {/* Perfil del Deportista */}
          <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700">
                  MS
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Mateo Sánchez</h4>
                  <p className="text-xs text-slate-400">Clase progreso: 11:00 - 12:30</p>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                ● FICHA VERIFICADA
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Peso del alumno (kg)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={peso}
                    onChange={(e) => setPeso(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-bold text-slate-800 focus:outline-teal-600"
                  />
                  <div className="flex gap-1">
                    <button 
                      onClick={() => setPeso(72)} 
                      className={`text-xs px-2.5 py-2 rounded font-bold border ${peso === 72 ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'}`}
                    >
                      72kg
                    </button>
                    <button 
                      onClick={() => setPeso(90)} 
                      className={`text-xs px-2.5 py-2 rounded font-bold border ${peso === 90 ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'}`}
                    >
                      90kg
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Nivel técnico</label>
                <select
                  value={nivel}
                  onChange={(e) => setNivel(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-bold text-slate-800 focus:outline-teal-600"
                >
                  <option value="Principiante">Principiante</option>
                  <option value="Intermedio">Intermedio</option>
                  <option value="Avanzado">Avanzado</option>
                </select>
              </div>
            </div>
          </div>

          {/* Banner de Cálculo Aerodinámico */}
          <div className="bg-[#093546] text-white rounded-xl p-5 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-teal-300 uppercase tracking-wider">Recomendación para 18 Kts</p>
              <h3 className="text-3xl font-extrabold text-white mt-0.5">{superficie}</h3>
              <p className="text-xs text-teal-100/70 mt-1">
                Rango óptimo para {peso} kg • Nivel {nivel} • Orientación side-onshore
              </p>
            </div>
            <span className="bg-teal-800/60 border border-teal-400/40 text-teal-200 text-xs px-3 py-1.5 rounded-full font-bold">
              ● RANGO SEGURO
            </span>
          </div>

          {/* Selector de Vela */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Seleccionar vela / cometa</h4>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 1, name: 'Duotone Rebel 9m', desc: '9m² • 4 líneas • disponible', selected: selectedKite === 1 },
                { id: 2, name: 'North Reach 10m', desc: '10m² • All-round • disponible', selected: selectedKite === 2 }
              ].map(kite => (
                <div
                  key={kite.id}
                  onClick={() => setSelectedKite(kite.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    kite.selected 
                      ? 'border-teal-500 bg-teal-50/50 shadow-sm ring-1 ring-teal-500' 
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-bold text-slate-800 text-sm">{kite.name}</p>
                    <input type="radio" checked={kite.selected} readOnly className="accent-teal-600" />
                  </div>
                  <p className="text-xs text-slate-400">{kite.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Selector de Barra */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Seleccionar barra</h4>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 3, name: 'Trust Bar M/L', desc: '49-53 cm • adaptada hoy', selected: selectedBar === 3 },
                { id: 4, name: 'Navigator Bar', desc: '50-55 cm • disponible', selected: selectedBar === 4 }
              ].map(bar => (
                <div
                  key={bar.id}
                  onClick={() => setSelectedBar(bar.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    bar.selected 
                      ? 'border-teal-500 bg-teal-50/50 shadow-sm ring-1 ring-teal-500' 
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-bold text-slate-800 text-sm">{bar.name}</p>
                    <input type="radio" checked={bar.selected} readOnly className="accent-teal-600" />
                  </div>
                  <p className="text-xs text-slate-400">{bar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resumen Lateral de Asignación */}
        <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
              <h4 className="font-bold text-slate-800 text-sm">Resumen de asignación</h4>
              <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded">
                ASG-2948
              </span>
            </div>

            <div className="space-y-3.5 text-xs text-slate-600">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Alumno</p>
                <p className="font-bold text-slate-800 text-sm">Mateo Sánchez</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Vela / Cometa</p>
                <p className="font-bold text-slate-800 text-sm">
                  {selectedKite === 1 ? 'Duotone Rebel 9m' : 'North Reach 10m'}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Barra</p>
                <p className="font-bold text-slate-800 text-sm">
                  {selectedBar === 3 ? 'Trust Bar M/L' : 'Navigator Bar'}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Instructor a cargo</p>
                <p className="font-bold text-slate-800 text-sm">Lucía Martín</p>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100 mt-6 text-xs space-y-1">
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Condiciones Vinculadas</p>
              <div className="flex justify-between font-bold text-slate-700">
                <span>18 kts</span>
                <span>22 kts</span>
                <span>Side-onshore</span>
              </div>
            </div>

            <label className="flex items-start gap-2.5 mt-5 cursor-pointer text-xs text-slate-600">
              <input
                type="checkbox"
                checked={confirmedCheck}
                onChange={(e) => setConfirmedCheck(e.target.checked)}
                className="mt-0.5 accent-teal-600 rounded"
              />
              <span>He verificado el estado visual y compatibilidad del equipo</span>
            </label>
          </div>

          <button
            onClick={onNavigateNext}
            disabled={!confirmedCheck}
            className="w-full mt-6 bg-[#0E7490] hover:bg-[#0891B2] disabled:bg-slate-300 text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            Confirmar asignación
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}