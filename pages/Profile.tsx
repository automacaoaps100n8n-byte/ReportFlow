
import React from 'react';
import { Camera, Save, Mail, Briefcase, MapPin, Globe, Instagram } from 'lucide-react';

const Profile: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Meu Perfil Profissional</h1>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 shadow-md transition-all font-bold">
          <Save size={18} />
          Salvar Alterações
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
            <div className="relative inline-block mb-4">
              <img 
                src="https://picsum.photos/seed/doc/150/150" 
                className="w-32 h-32 rounded-full border-4 border-slate-50 object-cover mx-auto"
                alt="Profile"
              />
              <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full border-2 border-white hover:bg-indigo-700 transition-colors">
                <Camera size={18} />
              </button>
            </div>
            <h2 className="text-xl font-bold text-slate-800">Pedro Freitas</h2>
            <p className="text-indigo-600 font-medium text-sm">Terapeuta Holístico e Mentor</p>
            <div className="mt-4 flex justify-center gap-3">
              <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer">
                <Instagram size={18} />
              </div>
              <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer">
                <Globe size={18} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Identidade Visual</h3>
            <div className="space-y-4">
              <div>
                <span className="block text-xs font-bold text-slate-400 mb-2 uppercase">Logo Principal</span>
                <div className="w-full h-24 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center bg-slate-50 text-slate-400 hover:border-indigo-200 transition-all cursor-pointer">
                  Clique para upload
                </div>
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-400 mb-2 uppercase">Assinatura Digital</span>
                <div className="w-full h-20 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center bg-slate-50 text-slate-400 hover:border-indigo-200 transition-all cursor-pointer">
                  Adicionar Assinatura
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Briefcase size={20} className="text-indigo-600" />
              Informações do Profissional
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfileInput label="Nome Completo" defaultValue="Pedro Freitas" />
              <ProfileInput label="Título Profissional" defaultValue="Terapeuta Holístico e Mentor" />
              <ProfileInput label="E-mail de Contato" defaultValue="contato@pedrofreitas.com" icon={<Mail size={16} />} />
              <ProfileInput label="WhatsApp / Telefone" defaultValue="(11) 98765-4321" />
              <div className="md:col-span-2">
                <ProfileInput label="Bio / Slogan para Relatórios" defaultValue="Transformando vidas através da cura energética e autoconhecimento." isArea />
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <MapPin size={20} className="text-indigo-600" />
              Presença Online & Links
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfileInput label="Instagram" defaultValue="@veka.pedrofreitas" />
              <ProfileInput label="Website" defaultValue="https://institutoveka.com.br" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileInput = ({ label, defaultValue, icon, isArea }: { label: string, defaultValue: string, icon?: any, isArea?: boolean }) => (
  <div>
    <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
    <div className="relative">
      {icon && <div className="absolute left-3 top-3.5 text-slate-400">{icon}</div>}
      {isArea ? (
        <textarea 
          rows={3}
          defaultValue={defaultValue}
          className={`w-full ${icon ? 'pl-10' : 'px-4'} py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all bg-white`}
        />
      ) : (
        <input 
          type="text" 
          defaultValue={defaultValue}
          className={`w-full ${icon ? 'pl-10' : 'px-4'} py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all bg-white`}
        />
      )}
    </div>
  </div>
);

export default Profile;
