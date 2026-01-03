
import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  MoreHorizontal, 
  Send, 
  ClipboardCheck, 
  Layout, 
  Zap, 
  Copy,
  Trash2,
  Edit
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, FormCategory } from '../types';

const Forms: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FormCategory>('public');
  const [forms, setForms] = useState<Form[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const navigate = useNavigate();

  // Load forms from localStorage
  useEffect(() => {
    const savedForms = localStorage.getItem('reportflow_forms');
    if (savedForms) {
      setForms(JSON.parse(savedForms));
    } else {
      // Initial seed if empty
      const initialForms: Form[] = [
        { id: '1', title: 'Anamnese Inicial - Apometria', category: 'public', status: 'active', fields: [], description: '', userId: '1', createdAt: Date.now() },
        { id: '3', title: 'Sessão de Apometria (Padrão)', category: 'internal', status: 'active', fields: [], description: '', userId: '1', createdAt: Date.now() },
      ];
      setForms(initialForms);
      localStorage.setItem('reportflow_forms', JSON.stringify(initialForms));
    }
  }, []);

  const handleDelete = (id: string) => {
    const updatedForms = forms.filter(f => f.id !== id);
    setForms(updatedForms);
    localStorage.setItem('reportflow_forms', JSON.stringify(updatedForms));
    setShowDeleteConfirm(null);
  };

  const copyLink = (id: string) => {
    const url = `${window.location.origin}/#/f/${id}`;
    navigator.clipboard.writeText(url);
    alert('Link público copiado para a área de transferência!');
  };

  const filteredForms = forms.filter(f => f.category === activeTab);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Meus Formulários</h1>
          <p className="text-sm text-slate-500">Gerencie seus links de coleta e roteiros de sessão.</p>
        </div>
        <Link 
          to="/forms/new"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all flex items-center gap-2 w-fit"
        >
          <Plus size={20} />
          Criar Formulário
        </Link>
      </div>

      <div className="flex p-1 bg-slate-200/50 rounded-2xl w-full max-w-lg">
        <button 
          onClick={() => setActiveTab('public')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'public' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Send size={18} />
          Links para Clientes
        </button>
        <button 
          onClick={() => setActiveTab('internal')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'internal' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Zap size={18} />
          Roteiros de Sessão
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredForms.map((form) => (
          <div key={form.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-1 px-3 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase rounded-bl-xl tracking-tighter">
              {form.category === 'public' ? 'COLETA EXTERNA' : 'USO INTERNO'}
            </div>

            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-2xl ${form.category === 'public' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                {form.category === 'public' ? <Send size={24} /> : <ClipboardCheck size={24} />}
              </div>
              <div className="flex gap-1">
                <button 
                  onClick={() => navigate(`/forms/${form.id}`)}
                  className="p-2 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                  title="Editar"
                >
                  <Edit size={18} />
                </button>
                <button 
                  onClick={() => setShowDeleteConfirm(form.id)}
                  className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                  title="Excluir"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-800 mb-1">{form.title}</h3>
            <p className="text-sm text-slate-500 mb-6 flex items-center gap-2">
              Criado em: {new Date(form.createdAt).toLocaleDateString('pt-BR')}
            </p>

            <div className="flex items-center gap-2">
              {form.category === 'public' ? (
                <button 
                  className="flex-1 py-3 bg-indigo-600 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 transition-all"
                  onClick={() => copyLink(form.id)}
                >
                  <Copy size={14} /> Copiar Link
                </button>
              ) : (
                <button 
                  className="flex-1 py-3 bg-orange-500 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-orange-600 shadow-lg shadow-orange-100 flex items-center justify-center gap-2 transition-all"
                  onClick={() => navigate(`/forms/fill/${form.id}`)}
                >
                  <Plus size={14} /> Nova Sessão
                </button>
              )}
              <Link 
                to="/templates"
                className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-indigo-600 hover:bg-indigo-50 transition-all border border-slate-100"
                title="Configurar PDF"
              >
                <Layout size={18} />
              </Link>
            </div>

            {/* Delete Confirmation Overlay */}
            {showDeleteConfirm === form.id && (
              <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center p-6 text-center z-10 animate-in fade-in duration-200">
                <p className="font-bold text-slate-800 mb-4">Tem certeza que deseja excluir este formulário?</p>
                <div className="flex gap-3 w-full">
                  <button 
                    onClick={() => setShowDeleteConfirm(null)}
                    className="flex-1 py-2 text-sm font-bold text-slate-500 bg-slate-100 rounded-lg"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={() => handleDelete(form.id)}
                    className="flex-1 py-2 text-sm font-bold text-white bg-red-500 rounded-lg"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {filteredForms.length === 0 && (
          <div className="col-span-full py-20 text-center bg-white border-2 border-dashed border-slate-200 rounded-3xl">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
               {activeTab === 'public' ? <Send size={32} /> : <Zap size={32} />}
            </div>
            <h3 className="text-lg font-bold text-slate-800">Nenhum formulário aqui ainda</h3>
            <p className="text-slate-500 text-sm max-w-xs mx-auto mt-2">
              {activeTab === 'public' ? 
                "Crie formulários que seus clientes podem responder via link." : 
                "Crie roteiros de sessão que você preenche durante o atendimento."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Forms;
