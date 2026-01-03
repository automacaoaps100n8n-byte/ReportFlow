
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, User, CheckSquare, Square, Check, Layout, Info } from 'lucide-react';
import { Form, FormField } from '../types';

const FormFill: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<Form | null>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [clientName, setClientName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const savedForms = localStorage.getItem('reportflow_forms');
    if (savedForms) {
      const forms: Form[] = JSON.parse(savedForms);
      const found = forms.find(f => f.id === id);
      if (found) {
        setForm(found);
        const initial: Record<string, any> = {};
        found.fields.forEach(f => {
          if (f.type === 'checkbox') initial[f.id] = [];
          else initial[f.id] = '';
        });
        setAnswers(initial);
      }
    }
  }, [id]);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      alert('Sessão registrada com sucesso!');
      navigate('/forms');
    }, 800);
  };

  if (!form) return <div className="p-10 text-center text-slate-400 font-bold uppercase tracking-widest">Carregando roteiro...</div>;

  const sections = form.fields.filter(f => f.type === 'section');
  const orphanedFields = form.fields.filter(f => f.type !== 'section' && !f.sectionId);

  return (
    <div className="max-w-3xl mx-auto pb-20 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8 sticky top-0 bg-slate-50/90 backdrop-blur-md py-4 z-10 border-b border-slate-200 -mx-4 px-4">
        <div className="flex items-center gap-3">
          <Link to="/forms" className="p-2 text-slate-400 hover:text-slate-600 bg-white border border-slate-200 rounded-xl shadow-sm transition-all">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">{form.title}</h1>
            <p className="text-[10px] text-orange-500 font-black uppercase tracking-widest">Roteiro de Atendimento Profissional</p>
          </div>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 shadow-lg shadow-indigo-100 flex items-center gap-2 transition-all disabled:opacity-50"
        >
          <Save size={18} />
          {isSaving ? 'Gravando...' : 'Finalizar Atendimento'}
        </button>
      </div>

      <div className="space-y-10">
        {/* Identificação do Cliente */}
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Paciente / Cliente</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
            <input 
              type="text" 
              placeholder="Digite o nome completo do paciente..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all font-bold text-slate-700 placeholder:text-slate-300 shadow-sm"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </div>
        </div>

        {/* Perguntas Soltas */}
        {orphanedFields.length > 0 && (
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8 space-y-8">
            {orphanedFields.map(field => (
              <div key={field.id} className="space-y-3">
                <div className="space-y-1">
                  <label className="block text-sm font-black text-slate-700">
                    {field.label}
                    {field.required && <span className="text-red-400 ml-1">*</span>}
                  </label>
                  {field.placeholder && (
                    <div className="flex items-start gap-1.5 text-xs text-slate-400 bg-slate-50 p-2 rounded-lg italic border border-slate-100/50">
                      <Info size={12} className="shrink-0 mt-0.5" />
                      {field.placeholder}
                    </div>
                  )}
                </div>
                <RenderField 
                  field={field} 
                  value={answers[field.id]} 
                  onChange={(val) => setAnswers({...answers, [field.id]: val})} 
                />
              </div>
            ))}
          </div>
        )}

        {/* Blocos Organizados */}
        {sections.map(section => (
          <div key={section.id} className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-slate-50 px-8 py-5 border-b border-slate-100 flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
                <Layout size={18} />
              </div>
              <h2 className="text-xs font-black text-slate-800 uppercase tracking-widest">{section.label}</h2>
            </div>
            <div className="p-8 space-y-10">
              {form.fields.filter(f => f.sectionId === section.id).map(field => (
                <div key={field.id} className="space-y-3">
                  <div className="space-y-1">
                    <label className="block text-sm font-black text-slate-700">
                      {field.label}
                      {field.required && <span className="text-red-400 ml-1">*</span>}
                    </label>
                    {field.placeholder && (
                      <div className="flex items-start gap-1.5 text-xs text-slate-400 bg-slate-50 p-2 rounded-lg italic border border-slate-100/50">
                        <Info size={12} className="shrink-0 mt-0.5" />
                        {field.placeholder}
                      </div>
                    )}
                  </div>
                  <RenderField 
                    field={field} 
                    value={answers[field.id]} 
                    onChange={(val) => setAnswers({...answers, [field.id]: val})} 
                  />
                </div>
              ))}
              {form.fields.filter(f => f.sectionId === section.id).length === 0 && (
                <p className="text-slate-300 text-[10px] font-bold uppercase text-center py-4 tracking-widest italic">Nenhuma pergunta neste bloco.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AutoExpandingTextarea = ({ value, onChange, placeholder }: { value: string, onChange: (v: string) => void, placeholder?: string }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => { adjustHeight(); }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all resize-none overflow-hidden text-slate-700 leading-relaxed min-h-[80px] font-medium placeholder:text-slate-200 shadow-sm"
      rows={1}
    />
  );
};

const RenderField = ({ field, value, onChange }: { field: FormField, value: any, onChange: (v: any) => void }) => {
  switch (field.type) {
    case 'text':
      return (
        <input 
          type="text" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Digite a resposta aqui..."
          className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all font-medium text-slate-700 placeholder:text-slate-200 shadow-sm"
        />
      );
    case 'longtext':
      return (
        <AutoExpandingTextarea 
          value={value} 
          onChange={onChange} 
          placeholder="Escreva detalhadamente as percepções da sessão..." 
        />
      );
    case 'number':
      return (
        <input 
          type="number" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all shadow-sm font-bold"
        />
      );
    case 'date':
      return (
        <input 
          type="date" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all shadow-sm font-medium"
        />
      );
    case 'select':
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {field.options?.map(opt => (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              className={`p-4 rounded-xl border text-sm font-black uppercase tracking-widest transition-all text-left flex items-center justify-between group ${
                value === opt 
                ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-md' 
                : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
              }`}
            >
              {opt}
              {value === opt && <Check size={16} />}
            </button>
          ))}
        </div>
      );
    case 'checkbox':
      const current = Array.isArray(value) ? value : [];
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {field.options?.map(opt => {
            const isSelected = current.includes(opt);
            return (
              <button
                key={opt}
                onClick={() => {
                  const next = isSelected 
                    ? current.filter(i => i !== opt) 
                    : [...current, opt];
                  onChange(next);
                }}
                className={`p-4 rounded-xl border text-sm font-black uppercase tracking-widest transition-all text-left flex items-center gap-3 ${
                  isSelected 
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-md' 
                  : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                }`}
              >
                {isSelected ? <CheckSquare size={18} className="text-indigo-600" /> : <Square size={18} className="text-slate-300" />}
                {opt}
              </button>
            );
          })}
        </div>
      );
    default:
      return null;
  }
};

export default FormFill;
