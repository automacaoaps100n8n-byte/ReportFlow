
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  FileType, 
  UserCircle, 
  Plus, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

// Components & Pages
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import ClientDetail from './pages/ClientDetail';
import Forms from './pages/Forms';
import FormBuilder from './pages/FormBuilder';
import FormFill from './pages/FormFill';
import PublicForm from './pages/PublicForm';
import PdfTemplates from './pages/PdfTemplates';
import PdfEditor from './pages/PdfEditor';
import Profile from './pages/Profile';
import Login from './pages/Login';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Simulated for demo
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Layout Wrapper
  const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const isPublic = location.pathname.startsWith('/f/');

    if (isPublic) return <>{children}</>;

    return (
      <div className="flex min-h-screen bg-slate-50">
        {/* Mobile Backdrop */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-20 lg:hidden" 
            onClick={() => setSidebarOpen(false)} 
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 transition-transform duration-300
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="flex flex-col h-full">
            <div className="p-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">R</div>
              <h1 className="text-xl font-bold tracking-tight text-slate-800">ReportFlow</h1>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1">
              <SidebarLink to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" active={location.pathname === '/'} />
              <SidebarLink to="/clients" icon={<Users size={20} />} label="Clientes" active={location.pathname.startsWith('/clients')} />
              <SidebarLink to="/forms" icon={<FileText size={20} />} label="Formulários" active={location.pathname.startsWith('/forms')} />
              <SidebarLink to="/templates" icon={<FileType size={20} />} label="Templates PDF" active={location.pathname.startsWith('/templates')} />
              <SidebarLink to="/profile" icon={<UserCircle size={20} />} label="Perfil" active={location.pathname === '/profile'} />
            </nav>

            <div className="p-4 border-t border-slate-100">
              <button 
                onClick={() => setIsAuthenticated(false)}
                className="flex items-center gap-3 px-4 py-2 w-full text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
              >
                <LogOut size={20} />
                <span className="font-medium">Sair</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <header className="h-16 bg-white border-b border-slate-200 flex items-center px-4 lg:px-8 shrink-0">
            <button 
              className="lg:hidden p-2 text-slate-600" 
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="flex-1" />
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-600 hidden sm:inline">Dr. Pedro Freitas</span>
              <img 
                src="https://picsum.photos/seed/doc/40/40" 
                className="w-10 h-10 rounded-full border border-slate-200" 
                alt="Avatar" 
              />
            </div>
          </header>

          <div className="flex-1 overflow-auto p-4 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    );
  };

  const SidebarLink = ({ to, icon, label, active }: { to: string, icon: any, label: string, active: boolean }) => (
    <Link 
      to={to} 
      className={`
        flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all
        ${active ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50'}
      `}
      onClick={() => setSidebarOpen(false)}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );

  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        
        {/* Protected Routes */}
        <Route path="/" element={isAuthenticated ? <Layout><Dashboard /></Layout> : <Navigate to="/login" />} />
        <Route path="/clients" element={isAuthenticated ? <Layout><Clients /></Layout> : <Navigate to="/login" />} />
        <Route path="/clients/:id" element={isAuthenticated ? <Layout><ClientDetail /></Layout> : <Navigate to="/login" />} />
        <Route path="/forms" element={isAuthenticated ? <Layout><Forms /></Layout> : <Navigate to="/login" />} />
        <Route path="/forms/new" element={isAuthenticated ? <Layout><FormBuilder /></Layout> : <Navigate to="/login" />} />
        <Route path="/forms/:id" element={isAuthenticated ? <Layout><FormBuilder /></Layout> : <Navigate to="/login" />} />
        <Route path="/forms/fill/:id" element={isAuthenticated ? <Layout><FormFill /></Layout> : <Navigate to="/login" />} />
        <Route path="/templates" element={isAuthenticated ? <Layout><PdfTemplates /></Layout> : <Navigate to="/login" />} />
        <Route path="/templates/:id" element={isAuthenticated ? <Layout><PdfEditor /></Layout> : <Navigate to="/login" />} />
        <Route path="/profile" element={isAuthenticated ? <Layout><Profile /></Layout> : <Navigate to="/login" />} />
        
        {/* Public Routes */}
        <Route path="/f/:id" element={<PublicForm />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
