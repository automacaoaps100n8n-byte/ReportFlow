
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Calendar, 
  Clock, 
  FileText, 
  Download, 
  Eye, 
  MessageSquare,
  Plus
} from 'lucide-react';

const ClientDetail: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/clients" className="p-2 text-slate-400 hover:bg-white hover:text-slate-600 rounded-lg transition-all border border-transparent">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">José Rafael</h1>
            <p className="text-slate-500 text-sm">Cliente desde 15 de Julho, 2023</p>
          </div>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-all flex items-center gap-2">
          <Plus size={18} />
          Gerar Novo Relatório
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex flex-col items-center text-center pb-6 border-b border-slate-100">
              <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-3xl font-bold mb-4">
                JR
              </div>
              <h2 className="text-xl font-bold text-slate-800">José Rafael</h2>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded mt-2">CLIENTE ATIVO</span>
            </div>
            
            <div className="py-6 space-y-4">
              <InfoItem icon={<Mail size={16} />} label="Email" value="jose.rafael@gmail.com" />
              <InfoItem icon={<Phone size={16} />} label="WhatsApp" value="(11) 98888-7777" />
              <InfoItem icon={<Calendar size={16} />} label="Nascimento" value="12/04/1988" />
              <InfoItem icon={<Clock size={16} />} label="Última Sessão" value="15 Out 2023" />
            </div>
            
            <div className="pt-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Observações</h4>
              <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100 italic">
                Apresenta quadro de ansiedade recorrente. Foco no desbloqueio da prosperidade financeira.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - History */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Forms */}
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <MessageSquare size={20} className="text-indigo-600" />
              Formulários Respondidos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <HistoryCard 
                title="Anamnese Inicial" 
                date="15 Out 2023" 
                icon={<FileText className="text-blue-500" />} 
                action="Visualizar Respostas" 
              />
              <HistoryCard 
                title="Avaliação Mensal" 
                date="12 Out 2023" 
                icon={<FileText className="text-emerald-500" />} 
                action="Visualizar Respostas" 
              />
            </div>
          </div>

          {/* Generated Reports */}
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Download size={20} className="text-indigo-600" />
              Relatórios PDF Gerados
            </h3>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Nome do Relatório</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Data</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-50 text-red-600 rounded-lg"><FileText size={18} /></div>
                        <span className="font-medium text-slate-800">Sessão de Apometria - José Rafael</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">15 Out 2023, 14:30</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"><Eye size={18} /></button>
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"><Download size={18} /></button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="p-4 text-center border-t border-slate-100">
                <button className="text-sm font-semibold text-indigo-600 hover:underline">Ver todo histórico</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex items-center gap-3 text-sm">
    <div className="text-slate-400">{icon}</div>
    <div className="flex-1">
      <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">{label}</div>
      <div className="text-slate-700 font-semibold">{value}</div>
    </div>
  </div>
);

const HistoryCard = ({ title, date, icon, action }: { title: string, date: string, icon: any, action: string }) => (
  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-all group">
    <div className="flex items-center gap-4 mb-4">
      <div className="p-2 bg-slate-50 rounded-lg group-hover:scale-110 transition-transform">{icon}</div>
      <div>
        <h4 className="font-bold text-slate-800 text-sm">{title}</h4>
        <span className="text-xs text-slate-500">Recebido em: {date}</span>
      </div>
    </div>
    <button className="w-full py-2 bg-slate-50 text-indigo-600 text-xs font-bold rounded-lg hover:bg-indigo-50 transition-colors">
      {action}
    </button>
  </div>
);

export default ClientDetail;
