import React from 'react';
import { LayoutDashboard, Compass, CalendarCheck, ShieldAlert } from 'lucide-react';

export default function Sidebar({ currentView, setCurrentView }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'assignment', label: 'Equipamiento', icon: Compass },
    { id: 'session', label: 'Sesiones', icon: CalendarCheck },
  ];

  return (
    <aside className="w-64 bg-[#080E18] text-white flex flex-col justify-between p-4 min-h-screen">
      <div>
        <div className="flex items-center gap-3 px-2 py-4 mb-6">
          <div className="w-9 h-9 rounded-lg bg-teal-500 flex items-center justify-center font-bold text-white shadow-lg">
            K
          </div>
          <div>
            <h1 className="font-bold text-base tracking-wide text-white leading-none">KiteSafe</h1>
            <p className="text-[10px] text-gray-400 tracking-wider uppercase mt-1">Gestión Náutica</p>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active 
                    ? 'bg-teal-600/20 text-teal-400 border-l-4 border-teal-400 font-semibold' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-gray-800/60 text-xs">
        <div className="bg-[#111C2E] p-3 rounded-xl mb-4 border border-gray-800/80">
          <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Centro Activo</p>
          <p className="font-bold text-white text-sm mt-0.5">Tarifa Kite Club</p>
          <p className="text-[11px] text-gray-400 mt-0.5">28 sep 2026 • Turno mañana</p>
        </div>
        <div className="flex items-center gap-2.5 px-2">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs text-white">
            LM
          </div>
          <div className="leading-tight">
            <p className="font-medium text-white text-xs">Lucía Martín</p>
            <p className="text-[10px] text-gray-400">Coordinadora</p>
          </div>
        </div>
      </div>
    </aside>
  );
}