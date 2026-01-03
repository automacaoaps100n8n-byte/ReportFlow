
import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Mail, Phone, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_CLIENTS = [
  { id: '1', name: 'José Rafael', email: 'jose.rafael@gmail.com', phone: '(11) 98888-7777', status: 'active', lastVisit: '15 Out 2023' },
  { id: '2', name: 'Maria Silva', email: 'maria.s@outlook.com', phone: '(11) 97777-6666', status: 'active', lastVisit: '12 Out 2023' },
  { id: '3', name: 'Ana Clara Santos', email: 'anaclara@bol.com.br', phone: '(11) 96666-5555', status: 'inactive', lastVisit: '05 Set 2023' },
  { id: '4', name: 'Roberto Pereira', email: 'roberto.p@gmail.com', phone: '(11) 95555-4444', status: 'active', lastVisit: '20 Out 2023' },
];

const Clients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-800">Clientes</h1>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-all flex items-center gap-2">
          <Plus size={18} />
          Novo Cliente
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nome ou email..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-all">
          <Filter size={18} />
          Filtros
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Contato</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Última Atividade</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_CLIENTS.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <Link to={`/clients/${client.id}`} className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                        {client.name.charAt(0)}
                      </div>
                      <span className="font-medium text-slate-800 hover:text-indigo-600 transition-colors">{client.name}</span>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 text-sm text-slate-500">
                      <span className="flex items-center gap-1.5"><Mail size={14} /> {client.email}</span>
                      <span className="flex items-center gap-1.5"><Phone size={14} /> {client.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      client.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {client.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {client.lastVisit}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Clients;
