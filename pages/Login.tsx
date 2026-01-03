
import React from 'react';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="p-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200">R</div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">ReportFlow</h1>
          </div>
          
          <h2 className="text-xl font-bold text-slate-800 mb-2">Bem-vindo de volta</h2>
          <p className="text-slate-500 text-sm mb-8">Faça login para gerenciar seus relatórios.</p>

          <form className="space-y-6" onSubmit={e => e.preventDefault()}>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
              <input 
                type="email" 
                className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                placeholder="pedro.freitas@instituto.com"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-semibold text-slate-700">Senha</label>
                <button className="text-xs text-indigo-600 font-medium hover:underline">Esqueceu a senha?</button>
              </div>
              <input 
                type="password" 
                className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            
            <button 
              className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all transform active:scale-[0.98]"
            >
              Entrar na Conta
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              Não tem uma conta? <button className="text-indigo-600 font-bold hover:underline">Criar agora</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
