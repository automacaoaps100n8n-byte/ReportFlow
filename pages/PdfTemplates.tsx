
import React from 'react';
import { Plus, FileType, MoreVertical, Layout, Edit3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_TEMPLATES = [
  { id: '1', name: 'Relatório de Sessão Apométrica', formName: 'Anamnese Inicial', blocks: 6, lastEdit: 'há 2 dias' },
  { id: '2', name: 'Avaliação Nutricional Completa', formName: 'Questionário Alimentar', blocks: 4, lastEdit: 'há 1 semana' },
  { id: '3', name: 'Relatório de Consultoria Financeira', formName: 'Diagnóstico Mensal', blocks: 8, lastEdit: 'há 1 mês' },
];

const PdfTemplates: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Templates de PDF</h1>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-all flex items-center gap-2">
          <Plus size={18} />
          Criar Template
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_TEMPLATES.map((tpl) => (
          <div key={tpl.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
            <div className="h-40 bg-slate-100 flex items-center justify-center border-b border-slate-100 group-hover:bg-indigo-50 transition-colors">
              <div className="w-16 h-20 bg-white border border-slate-200 rounded shadow-sm flex flex-col gap-1.5 p-2">
                <div className="h-1 w-full bg-slate-100 rounded" />
                <div className="h-1 w-2/3 bg-slate-100 rounded" />
                <div className="h-6 w-full bg-indigo-100 rounded" />
                <div className="h-1 w-full bg-slate-100 rounded" />
                <div className="h-1 w-full bg-slate-100 rounded" />
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-slate-800">{tpl.name}</h3>
                <button className="p-1 text-slate-400 hover:text-slate-600">
                  <MoreVertical size={18} />
                </button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-500">
                  <Layout size={14} />
                  Vinculado a: <span className="text-slate-700 font-medium">{tpl.formName}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Edit3 size={14} />
                  Editado: <span className="text-slate-700 font-medium">{tpl.lastEdit}</span>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <Link 
                  to={`/templates/${tpl.id}`}
                  className="flex-1 py-2 bg-indigo-50 text-indigo-600 text-center font-bold rounded-lg hover:bg-indigo-100 transition-colors"
                >
                  Editar Layout
                </Link>
                <div className="px-3 py-2 bg-slate-50 text-slate-400 rounded-lg">
                  <FileType size={18} />
                </div>
              </div>
            </div>
          </div>
        ))}

        <button className="border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-8 gap-4 text-slate-400 hover:border-indigo-300 hover:text-indigo-400 transition-all">
          <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center">
            <Plus size={24} />
          </div>
          <span className="font-semibold">Novo Template</span>
        </button>
      </div>
    </div>
  );
};

export default PdfTemplates;
