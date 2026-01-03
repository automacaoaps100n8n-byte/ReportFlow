
import React from 'react';
// Added Plus to the imports from lucide-react
import { Users, FileText, CheckCircle, TrendingUp, Plus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 12 },
  { name: 'Fev', value: 19 },
  { name: 'Mar', value: 32 },
  { name: 'Abr', value: 25 },
  { name: 'Mai', value: 45 },
  { name: 'Jun', value: 38 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Bem-vindo, Dr. Pedro</h1>
          <p className="text-slate-500 text-sm">Aqui está o resumo das suas atividades recentes.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-all flex items-center gap-2 w-fit">
          <Plus size={18} />
          Novo Relatório
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Clientes" value="128" icon={<Users className="text-blue-600" />} trend="+12%" />
        <StatCard title="Relatórios Gerados" value="452" icon={<FileText className="text-indigo-600" />} trend="+5%" />
        <StatCard title="Formulários Ativos" value="8" icon={<CheckCircle className="text-emerald-600" />} trend="Estável" />
        <StatCard title="Novas Respostas" value="24" icon={<TrendingUp className="text-orange-600" />} trend="+18%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Relatórios por Mês</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Atividade Recente</h3>
          <div className="space-y-6">
            <ActivityItem 
              name="José Rafael" 
              action="respondeu Anamnese Inicial" 
              time="há 2 horas" 
              img="https://picsum.photos/seed/j/32/32" 
            />
            <ActivityItem 
              name="Maria Silva" 
              action="PDF gerado com sucesso" 
              time="há 5 horas" 
              img="https://picsum.photos/seed/m/32/32" 
            />
            <ActivityItem 
              name="Ana Clara" 
              action="respondeu Avaliação Mensal" 
              time="há 1 dia" 
              img="https://picsum.photos/seed/a/32/32" 
            />
          </div>
          <button className="w-full mt-6 text-sm text-indigo-600 font-medium hover:underline">Ver tudo</button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, trend }: { title: string, value: string, icon: any, trend: string }) => (
  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
      <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
        {trend}
      </span>
    </div>
    <div className="text-2xl font-bold text-slate-800">{value}</div>
    <div className="text-sm text-slate-500">{title}</div>
  </div>
);

const ActivityItem = ({ name, action, time, img }: { name: string, action: string, time: string, img: string }) => (
  <div className="flex gap-4">
    <img src={img} className="w-10 h-10 rounded-full shrink-0" alt={name} />
    <div>
      <p className="text-sm">
        <span className="font-semibold text-slate-800">{name}</span>{' '}
        <span className="text-slate-500">{action}</span>
      </p>
      <span className="text-xs text-slate-400">{time}</span>
    </div>
  </div>
);

export default Dashboard;
