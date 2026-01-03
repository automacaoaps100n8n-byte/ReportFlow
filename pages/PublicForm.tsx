
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Send, CheckCircle2, Info } from 'lucide-react';
import { Form, FormField } from '../types';

const PublicForm: React.FC = () => {
  const { id } = useParams();
  const [form, setForm] = useState<Form | null>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-8 shadow-xl shadow-emerald-100/50">
          <CheckCircle2 size={48} />
        </div>
        <h1 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">Formulário Enviado!</h1>
        <p className="text-slate-500 max-w-md text-lg leading-relaxed">
          Suas respostas foram registradas com sucesso. Agradecemos pela sua colaboração.
        </p>
        <button onClick={() => window.location.reload()} className="mt-10 text-indigo-600 font-black uppercase text-xs tracking-widest hover:underline">Responder novamente</button>
      </div>
    );
  }

  if (!form) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-slate-300 font-black uppercase tracking-widest">Aguardando formulário...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f0ebf8] pb-20">
      <div className="max-w-3xl mx-auto pt-8 px-4">
        <div className="bg-white rounded-xl border-t-[10px] border-indigo-600 shadow-sm overflow-hidden mb-4">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">{form.title}</h1>
            <p className="text-slate-600 text-sm leading-relaxed">{form.description || 'Preencha as informações solicitadas abaixo.'}</p>
            <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-3 text-red-500">
              <span className="text-xs font-medium">* Indica um campo obrigatório</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {form.fields.filter(f => f.type !== 'section').map((field) => (
            <div key={field.id} className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="space-y-1">
                <label className="block text-base font-medium text-slate-800">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {field.placeholder && (
                  <p className="text-xs text-slate-500 italic flex items-center gap-1.5">
                    <Info size={12} className="shrink-0" />
                    {field.placeholder}
                  </p>
                )}
              </div>
              
              <RenderPublicField 
                field={field} 
                value={answers[field.id]} 
                onChange={(val) => setAnswers({...answers, [field.id]: val})} 
              />
            </div>
          ))}

          <div className="pt-4 flex items-center justify-between">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all flex items-center gap-3 disabled:opacity-50"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Respostas'}
              <Send size={18} />
            </button>
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Powered by ReportFlow</span>
          </div>
        </form>
      </div>
    </div>
  );
};

const RenderPublicField = ({ field, value, onChange }: { field: FormField, value: any, onChange: (v: any) => void }) => {
  switch (field.type) {
    case 'text':
      return (
        <input 
          type="text" 
          required={field.required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Sua resposta"
          className="w-full border-b border-slate-200 py-2 focus:border-indigo-600 focus:outline-none transition-all text-slate-800"
        />
      );
    case 'longtext':
      return (
        <textarea 
          required={field.required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Sua resposta detalhada"
          className="w-full border-b border-slate-200 py-2 focus:border-indigo-600 focus:outline-none transition-all text-slate-800 min-h-[100px] resize-none"
        />
      );
    case 'number':
      return (
        <input 
          type="number" 
          required={field.required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0"
          className="w-full md:w-48 border-b border-slate-200 py-2 focus:border-indigo-600 focus:outline-none transition-all text-slate-800"
        />
      );
    case 'date':
      return (
        <input 
          type="date" 
          required={field.required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full md:w-64 border border-slate-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none transition-all text-slate-800"
        />
      );
    case 'select':
      return (
        <div className="space-y-3">
          {field.options?.map(opt => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="radio" 
                name={field.id}
                checked={value === opt}
                onChange={() => onChange(opt)}
                className="w-5 h-5 text-indigo-600 focus:ring-indigo-500 border-slate-300"
              />
              <span className="text-slate-700 group-hover:text-slate-900 font-medium transition-colors">{opt}</span>
            </label>
          ))}
        </div>
      );
    case 'checkbox':
      const current = Array.isArray(value) ? value : [];
      return (
        <div className="space-y-3">
          {field.options?.map(opt => {
            const isSelected = current.includes(opt);
            return (
              <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => {
                    const next = isSelected 
                      ? current.filter(i => i !== opt) 
                      : [...current, opt];
                    onChange(next);
                  }}
                  className="w-5 h-5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                />
                <span className="text-slate-700 group-hover:text-slate-900 font-medium transition-colors">{opt}</span>
              </label>
            );
          })}
        </div>
      );
    default:
      return null;
  }
};

export default PublicForm;
