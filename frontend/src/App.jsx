import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardView from './views/DashboardView';
import AssignmentView from './views/AssignmentView';
import CloseSessionView from './views/CloseSessionView';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="flex-1 overflow-y-auto">
        {currentView === 'dashboard' && (
          <DashboardView onNavigateNext={() => setCurrentView('assignment')} />
        )}
        {currentView === 'assignment' && (
          <AssignmentView onNavigateNext={() => setCurrentView('session')} />
        )}
        {currentView === 'session' && (
          <CloseSessionView onReset={() => setCurrentView('dashboard')} />
        )}
      </main>
    </div>
  );
}