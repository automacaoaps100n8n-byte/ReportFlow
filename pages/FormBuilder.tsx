
import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  GripVertical, 
  Save, 
  Eye, 
  Type, 
  AlignLeft, 
  Hash, 
  Calendar as CalendarIcon, 
  ChevronDown, 
  CheckSquare, 
  Zap,
  Send,
  ArrowLeft,
  Square,
  Check,
  Layout,
  Info
} from 'lucide-react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FormField, FieldType, FormCategory, Form } from '../types';

const FIELD_TYPES: { type: FieldType, label: string, icon: any }[] = [
  { type: 'text', label: 'Texto Curto', icon: <Type size={16} /> },
  { type: 'longtext', label: 'Texto Longo', icon: <AlignLeft size={16} /> },
  { type: 'number', label: 'Número', icon: <Hash size={16} /> },
  { type: 'date', label: 'Data', icon: <CalendarIcon size={16} /> },
  { type: 'select', label: 'Múltipla Escolha', icon: <ChevronDown size={16} /> },
  { type: 'checkbox', label: 'Checkboxes', icon: <CheckSquare size={16} /> },
];

const FormBuilder: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('Novo Formulário');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<FormCategory>('internal');
  const [fields, setFields] = useState<FormField[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (id && id !== 'new') {
      const savedForms = localStorage.getItem('reportflow_forms');
      if (savedForms) {
        const forms: Form[] = JSON.parse(savedForms);
        const currentForm = forms.find(f => f.id === id);
        if (currentForm) {
          setTitle(currentForm.title);
          setDescription(currentForm.description || '');
          setCategory(currentForm.category);
          setFields(currentForm.fields || []);
        }
      }
    }
  }, [id]);

  const addField = (type: FieldType, sectionId?: string) => {
    const newField: FormField = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      label: type === 'section' ? 'Título do Bloco' : '',
      required: false,
      order: fields.length,
      placeholder: '', // Usaremos este campo para a Descrição da pergunta
      sectionId: sectionId,
      options: type === 'select' || type === 'checkbox' ? ['Opção 1'] : undefined
    };
    setFields([...fields, newField]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map(f => {
      if (f.id === id) {
        if ((updates.type === 'select' || updates.type === 'checkbox') && !f.options) {
          return { ...f, ...updates, options: ['Opção 1'] };
        }
        return { ...f, ...updates };
      }
      return f;
    }));
  };

  const saveForm = () => {
    setIsSaving(true);
    const savedFormsStr = localStorage.getItem('reportflow_forms');
    let forms: Form[] = savedFormsStr ? JSON.parse(savedFormsStr) : [];
    
    const formData: Form = {
      id: id && id !== 'new' ? id : Math.random().toString(36).substr(2, 9),
      title,
      description,
      category,
      fields,
      status: 'active',
      userId: '1',
      createdAt: id && id !== 'new' ? forms.find(f => f.id === id)?.createdAt || Date.now() : Date.now()
    };

    if (id && id !== 'new') {
      forms = forms.map(f => f.id === id ? formData : f);
    } else {
      forms.push(formData);
    }

    localStorage.setItem('reportflow_forms', JSON.stringify(forms));
    setTimeout(() => { setIsSaving(false); navigate('/forms'); }, 500);
  };

  const renderFieldItem = (field: FormField) => {
    if (field.type === 'section') return null;

    return (
      <div key={field.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm group hover:border-indigo-300 transition-all animate-in slide-in-from-top-2 duration-200">
        <div className="flex items-start gap-4">
          <div className="cursor-move text-slate-300 pt-3 group-hover:text-slate-400 shrink-0">
            <GripVertical size={18} />
          </div>
          
          <div className="flex-1 space-y-4">
            {/* Linha 1: Pergunta e Tipo */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Enunciado da Pergunta</label>
                <input 
                  type="text" 
                  value={field.label}
                  onChange={(e) => updateField(field.id, { label: e.target.value })}
                  className="w-full font-bold text-slate-800 bg-slate-50 border border-slate-100 p-2.5 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder:text-slate-300"
                  placeholder="Ex: Como o cliente se sente hoje?"
                />
              </div>
              
              <div className="shrink-0 min-w-[180px]">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Resposta</label>
                <div className="relative">
                  <select 
                    value={field.type}
                    onChange={(e) => updateField(field.id, { type: e.target.value as FieldType })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-widest py-3 pl-4 pr-10 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    {FIELD_TYPES.map(ft => (
                      <option key={ft.type} value={ft.type}>{ft.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                </div>
              </div>
            </div>

            {/* Linha 2: Descrição da Pergunta (O CAMPO QUE VOCÊ PEDIU) */}
            <div className="bg-indigo-50/30 p-3 rounded-xl border border-indigo-100/50">
              <label className="flex items-center gap-1.5 text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1.5 ml-1">
                <Info size={12} /> Descrição / Instrução da Pergunta
              </label>
              <textarea 
                value={field.placeholder}
                onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                className="w-full bg-white border border-slate-100 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm text-slate-600 placeholder:text-slate-300 resize-none"
                placeholder="Ex: Instrua o cliente a respirar fundo e descrever a cor que visualiza..."
                rows={1}
              />
            </div>

            {/* Opções (Se for select ou checkbox) */}
            {(field.type === 'select' || field.type === 'checkbox') && (
              <div className="space-y-2 pl-4 border-l-2 border-indigo-200 ml-1">
                {field.options?.map((opt, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-300" />
                    <input 
                      value={opt} 
                      onChange={(e) => {
                        const next = [...(field.options || [])];
                        next[i] = e.target.value;
                        updateField(field.id, { options: next });
                      }}
                      className="bg-transparent border-none p-0 text-sm text-slate-600 focus:ring-0 flex-1 font-medium placeholder:text-slate-300"
                      placeholder="Opção"
                    />
                    <button onClick={() => updateField(field.id, { options: field.options?.filter((_, idx) => idx !== i) })}>
                      <Trash2 size={14} className="text-slate-300 hover:text-red-500 transition-colors" />
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => updateField(field.id, { options: [...(field.options || []), 'Nova Opção'] })}
                  className="text-[10px] text-indigo-600 font-black uppercase tracking-widest mt-2 flex items-center gap-1 hover:text-indigo-800 transition-colors"
                >
                  <Plus size={12} /> Adicionar Opção
                </button>
              </div>
            )}

            {/* Rodapé do Campo */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <button 
                onClick={() => updateField(field.id, { required: !field.required })}
                className={`flex items-center gap-2 transition-all ${field.required ? 'text-indigo-600' : 'text-slate-400'}`}
              >
                <div className={`w-4 h-4 rounded border flex items-center justify-center ${field.required ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-200'}`}>
                  {field.required && <Check size={12} className="text-white" />}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest">Obrigatório</span>
              </button>
              
              <button onClick={() => removeField(field.id)} className="p-2 text-slate-300 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 bg-slate-50/90 backdrop-blur-md py-4 z-20 border-b border-slate-100 -mx-4 px-4">
        <div className="flex items-center gap-4">
          <Link to="/forms" className="p-2 text-slate-400 hover:bg-white rounded-xl shadow-sm border border-slate-200">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Configurar {category === 'internal' ? 'Roteiro' : 'Link Público'}</h1>
            <div className="flex gap-4 mt-1">
              <button 
                onClick={() => setCategory('public')}
                className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${category === 'public' ? 'text-indigo-600 bg-indigo-100 border border-indigo-200' : 'text-slate-400 hover:bg-slate-100'}`}
              >
                <Send size={12} /> Link p/ Cliente
              </button>
              <button 
                onClick={() => setCategory('internal')}
                className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${category === 'internal' ? 'text-orange-600 bg-orange-100 border border-orange-200' : 'text-slate-400 hover:bg-slate-100'}`}
              >
                <Zap size={12} /> Roteiro Sessão
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={saveForm}
            disabled={isSaving}
            className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50"
          >
            <Save size={18} /> {isSaving ? 'Gravando...' : 'Salvar'}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-3xl font-black w-full bg-white border-none p-0 focus:ring-0 placeholder:text-slate-200 text-slate-800"
            placeholder="Título do Formulário"
          />
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Adicione uma descrição geral (opcional)..."
            className="w-full bg-white border-none p-0 focus:ring-0 text-slate-500 text-sm resize-none"
            rows={1}
          />
        </div>

        {category === 'internal' ? (
          <div className="space-y-12">
            {fields.filter(f => f.type === 'section').map(section => (
              <div key={section.id} className="bg-slate-100/50 border-2 border-slate-200 rounded-[2.5rem] p-8 space-y-6 relative">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                      <Layout size={20} />
                    </div>
                    <input 
                      value={section.label}
                      onChange={(e) => updateField(section.id, { label: e.target.value })}
                      className="bg-transparent border-none text-2xl font-black text-slate-800 focus:ring-0 p-0 placeholder:text-slate-300 w-full"
                      placeholder="Nome deste Bloco de Perguntas..."
                    />
                  </div>
                  <button onClick={() => removeField(section.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  {fields.filter(f => f.sectionId === section.id).map(field => renderFieldItem(field))}
                  
                  <button 
                    onClick={() => addField('text', section.id)}
                    className="w-full py-6 border-2 border-dashed border-indigo-200 bg-white rounded-2xl flex items-center justify-center gap-3 text-indigo-400 hover:border-indigo-400 hover:text-indigo-600 transition-all font-black text-[10px] uppercase tracking-widest"
                  >
                    <Plus size={18} /> Adicionar Pergunta a este Bloco
                  </button>
                </div>
              </div>
            ))}

            <button 
              onClick={() => addField('section')}
              className="w-full py-10 border-2 border-dashed border-slate-300 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 text-slate-400 hover:border-indigo-400 hover:text-indigo-500 hover:bg-indigo-50 transition-all"
            >
              <Layout size={32} className="opacity-20" />
              <span className="font-black text-xs uppercase tracking-widest">Criar Novo Bloco de Sessão</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {fields.map(field => renderFieldItem(field))}
            
            <button 
              onClick={() => addField('text')}
              className="w-full py-16 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 text-slate-400 hover:border-indigo-400 hover:text-indigo-500 hover:bg-indigo-50 transition-all"
            >
              <Plus size={32} className="opacity-30" />
              <span className="font-black text-xs uppercase tracking-widest">Adicionar Pergunta ao Formulário</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormBuilder;
