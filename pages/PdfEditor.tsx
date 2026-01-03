
import React, { useState } from 'react';
import { 
  Plus, 
  GripVertical, 
  Trash2, 
  Eye, 
  Download, 
  Layout, 
  Type, 
  List, 
  Image as ImageIcon, 
  CheckCircle2,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { BlockType, PdfBlock } from '../types';

const BLOCK_DEFINITIONS: { type: BlockType, label: string, icon: any, desc: string }[] = [
  { type: 'header', label: 'Cabeçalho Profissional', icon: <Layout size={18} />, desc: 'Logo, Nome e Dados do Cliente' },
  { type: 'text', label: 'Bloco de Texto', icon: <Type size={18} />, desc: 'Textos fixos ou explicações' },
  { type: 'answers', label: 'Bloco de Respostas', icon: <List size={18} />, desc: 'Perguntas e respostas do formulário' },
  { type: 'image', label: 'Imagem / Gráfico', icon: <ImageIcon size={18} />, desc: 'Destaque visual ou logo secundário' },
  { type: 'footer', label: 'Rodapé e Assinatura', icon: <CheckCircle2 size={18} />, desc: 'Links, redes sociais e assinatura' },
];

const PdfEditor: React.FC = () => {
  const [templateName, setTemplateName] = useState('Relatório de Sessão Apométrica');
  const [blocks, setBlocks] = useState<PdfBlock[]>([
    { id: '1', type: 'header', order: 0, visible: true, config: { title: 'RELATÓRIO APOMÉTRICO', color: '#4c1d4e' } },
    { id: '2', type: 'image', order: 1, visible: true, config: { src: 'https://picsum.photos/seed/cosmo/600/400' } },
    { id: '3', type: 'text', order: 2, visible: true, config: { content: 'Como disse Jesus: "A tua fé te curou. Vai e não peques mais."' } },
    { id: '4', type: 'answers', order: 3, visible: true, config: { style: 'list' } },
  ]);

  const addBlock = (type: BlockType) => {
    const newBlock: PdfBlock = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      order: blocks.length,
      visible: true,
      config: {}
    };
    setBlocks([...blocks, newBlock]);
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] lg:flex-row gap-8">
      {/* Configuration Column */}
      <div className="lg:w-96 flex flex-col gap-6 h-full overflow-hidden">
        <div className="shrink-0">
          <h1 className="text-xl font-bold text-slate-800">Editor de Template</h1>
          <p className="text-sm text-slate-500">Configure os blocos do seu relatório PDF.</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Nome do Template</span>
            <input 
              type="text" 
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="mt-1 w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </label>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Adicionar Blocos</h3>
          {BLOCK_DEFINITIONS.map(bd => (
            <button 
              key={bd.type}
              onClick={() => addBlock(bd.type)}
              className="flex items-center gap-3 w-full p-3 bg-white border border-slate-200 rounded-xl text-left hover:border-indigo-500 hover:shadow-sm transition-all group"
            >
              <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                {bd.icon}
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-700">{bd.label}</div>
                <div className="text-xs text-slate-400">{bd.desc}</div>
              </div>
              <Plus size={16} className="ml-auto text-slate-300 group-hover:text-indigo-600" />
            </button>
          ))}
        </div>
      </div>

      {/* Preview Column */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full">
            <Sparkles size={14} />
            Visualização em tempo real
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-200">
              <Eye size={18} />
              Preview
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm transition-all">
              <Download size={18} />
              Exportar PDF
            </button>
          </div>
        </div>

        {/* The PDF Canvas Simulator */}
        <div className="flex-1 bg-slate-200 rounded-2xl overflow-y-auto p-8 shadow-inner">
          <div className="pdf-page bg-white shadow-2xl transition-all duration-300 transform-gpu hover:scale-[1.01]">
            {blocks.map((block) => (
              <div key={block.id} className="relative group/block mb-4">
                {/* Control Overlay */}
                <div className="absolute -left-12 top-0 flex flex-col gap-2 opacity-0 group-hover/block:opacity-100 transition-opacity no-print">
                  <div className="p-1.5 bg-white border border-slate-200 rounded-lg shadow-sm cursor-move text-slate-400">
                    <GripVertical size={16} />
                  </div>
                  <button 
                    onClick={() => removeBlock(block.id)}
                    className="p-1.5 bg-white border border-slate-200 rounded-lg shadow-sm text-red-400 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Render Block Content */}
                <div className="p-4 rounded border-2 border-transparent group-hover/block:border-indigo-100 group-hover/block:border-dashed transition-all">
                  {block.type === 'header' && (
                    <div className="flex flex-col items-center text-center py-6 border-b-2 border-slate-100">
                      <div className="w-24 h-24 bg-[#4c1d4e] rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4">VEKA</div>
                      <h1 className="text-3xl font-bold tracking-tight text-[#4c1d4e] uppercase">{block.config.title || 'RELATÓRIO'}</h1>
                      <div className="mt-8 space-y-1 text-slate-500 tracking-[0.2em] text-xs uppercase">
                        <p>N O M E C O M P L E T O</p>
                        <p>D A T A D E N A S C I M E N T O</p>
                        <p>C I D A D E O N D E N A S C E U</p>
                      </div>
                    </div>
                  )}

                  {block.type === 'text' && (
                    <div className="py-6 italic text-center text-slate-600 font-light leading-relaxed px-12">
                      {block.config.content || 'Seu texto personalizado aparecerá aqui...'}
                    </div>
                  )}

                  {block.type === 'image' && (
                    <div className="py-4">
                      <img src={block.config.src || 'https://picsum.photos/600/300'} className="w-full rounded-lg shadow-md" alt="Relatório" />
                    </div>
                  )}

                  {block.type === 'answers' && (
                    <div className="py-6 space-y-6">
                      <div className="space-y-2">
                        <h3 className="font-bold text-[#4c1d4e] text-lg">Frequência Vibracional</h3>
                        <p className="text-slate-600">Frequência inicial: 125 Hertz Desejo</p>
                        <p className="text-slate-600">Frequência final: 200 Hertz Coragem</p>
                      </div>
                      <div className="space-y-4">
                        <h3 className="font-bold text-[#4c1d4e] text-lg">Resumo da Sessão</h3>
                        <p className="text-sm leading-relaxed text-slate-700">
                          A sessão revelou um campo marcado por ansiedade e sentimentos de incapacidade. O trabalho apométrico atuou na liberação dessas amarras, promovendo reorganização energética.
                        </p>
                      </div>
                    </div>
                  )}

                  {block.type === 'footer' && (
                    <div className="mt-12 pt-8 border-t-2 border-slate-100">
                       <div className="bg-[#4c1d4e] text-white p-3 text-center text-xs font-bold tracking-wider rounded">
                        VEKA INSTITUTO DE TERAPIAS E FORMAÇÃO DE TERAPEUTAS
                       </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfEditor;
