import React, { useState } from 'react';
import { generateSocialMediaContent, SocialMediaContent } from '../services/geminiService';
import { Video, Image, PlaySquare, Copy, Check, Sparkles, Loader2, Info } from 'lucide-react';

export const SocialMediaStudio: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [contentType, setContentType] = useState<'reels' | 'carousel' | 'story'>('reels');
  const [tone, setTone] = useState('Pedagógico');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SocialMediaContent | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const data = await generateSocialMediaContent(topic, contentType, tone);
      setResult(data);
    } catch (e) {
      console.error(e);
      alert('Erro ao gerar conteúdo. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tones = ['Pedagógico', 'Misterioso', 'Acolhedor', 'Impactante/Viral', 'Inspirador'];

  const getFullText = () => {
    if (!result) return '';
    let text = '';
    if (result.reelsScript) {
      text += `--- ROTEIRO REELS ---\nGANCHO (0-3s): ${result.reelsScript.hook}\n\nCORPO: ${result.reelsScript.body}\n\nCTA: ${result.reelsScript.callToAction}\n\nSUGESTÕES VISUAIS:\n- ${result.reelsScript.visualSuggestions?.join('\n- ')}\n\n`;
    }
    if (result.carouselSlides) {
      text += `--- CARROSSEL ---\n`;
      result.carouselSlides.forEach(s => {
        text += `Slide ${s.slideNumber}: ${s.text}\n(Visual: ${s.imagePrompt})\n\n`;
      });
    }
    if (result.storySequence) {
      text += `--- STORIES ---\n`;
      result.storySequence.forEach(s => {
        text += `Story ${s.part}:\nTexto: ${s.text}\nInteração: ${s.interactionIdea}\n\n`;
      });
    }
    text += `--- LEGENDA ---\n${result.caption}\n\n${result.hashtags?.join(' ')}`;
    return text;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-slate-900 rounded-2xl shadow-xl border border-slate-700/50">
      <div className="flex items-center gap-3 mb-6 border-b border-slate-700/50 pb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-100 font-serif">Estúdio de Criação</h2>
          <p className="text-sm text-slate-400">Gere roteiros virais e carrosséis sobre Ifá com IA</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Qual o tema do conteúdo?</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ex: O poder de Exu, Conselho para amor..."
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Formato</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'reels', icon: Video, label: 'Reels/TikTok' },
                { id: 'carousel', icon: Image, label: 'Carrossel' },
                { id: 'story', icon: PlaySquare, label: 'Stories' }
              ].map(format => {
                const Icon = format.icon;
                const active = contentType === format.id;
                return (
                  <button
                    key={format.id}
                    onClick={() => setContentType(format.id as any)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                      active
                        ? 'bg-indigo-500/10 border-indigo-500 text-indigo-400'
                        : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs font-medium">{format.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Tom de Voz</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            >
              {tones.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!topic.trim() || loading}
            className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-medium py-3.5 rounded-xl shadow-lg shadow-indigo-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Criando Magia...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Gerar Roteiro
              </>
            )}
          </button>
        </div>

        <div className="bg-slate-800/30 rounded-2xl border border-slate-700/50 p-4 h-full min-h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-slate-200 flex items-center gap-2">
              {contentType === 'reels' ? <Video className="w-5 h-5 text-indigo-400" /> :
               contentType === 'carousel' ? <Image className="w-5 h-5 text-indigo-400" /> :
               <PlaySquare className="w-5 h-5 text-indigo-400" />}
              Resultado
            </h3>
            {result && (
              <button
                onClick={() => handleCopy(getFullText())}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2 text-sm"
                title="Copiar tudo"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span className="hidden sm:inline">{copied ? 'Copiado!' : 'Copiar'}</span>
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
            {!result && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center space-y-3">
                <Sparkles className="w-12 h-12 opacity-20" />
                <p>Descreva um tema ao lado para gerar seu roteiro.</p>
              </div>
            )}

            {loading && (
              <div className="h-full flex flex-col items-center justify-center text-indigo-400 space-y-4">
                <Loader2 className="w-10 h-10 animate-spin" />
                <p className="animate-pulse">Consultando a sabedoria para viralizar...</p>
              </div>
            )}

            {result?.reelsScript && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                  <div className="text-xs font-bold text-amber-500 mb-1 uppercase tracking-wider">Hook (0-3 Segundos)</div>
                  <p className="text-slate-200 font-medium text-lg leading-relaxed">"{result.reelsScript.hook}"</p>
                </div>
                
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
                  <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Corpo do Vídeo</div>
                  <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{result.reelsScript.body}</p>
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                  <div className="text-xs font-bold text-emerald-500 mb-1 uppercase tracking-wider">Call to Action (CTA)</div>
                  <p className="text-slate-200">{result.reelsScript.callToAction}</p>
                </div>

                <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-xl p-4">
                  <div className="text-xs font-bold text-indigo-400 mb-2 uppercase tracking-wider flex items-center gap-1"><Info className="w-3 h-3" /> Ideias Visuais</div>
                  <ul className="list-disc pl-4 text-sm text-slate-400 space-y-1">
                    {result.reelsScript.visualSuggestions?.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
              </div>
            )}

            {result?.carouselSlides && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {result.carouselSlides.map((slide, idx) => (
                  <div key={idx} className="bg-slate-800 border border-slate-700 rounded-xl p-4 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 bg-slate-700 text-xs font-bold px-3 py-1 rounded-bl-xl text-slate-300">
                      Slide {slide.slideNumber}
                    </div>
                    <p className="text-slate-200 font-medium text-lg pr-12 mb-3 mt-2">{slide.text}</p>
                    <div className="bg-slate-900/50 rounded-lg p-3 text-sm text-slate-400 flex gap-2">
                      <Image className="w-4 h-4 mt-0.5 shrink-0 text-indigo-400" />
                      <p>{slide.imagePrompt}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {result?.storySequence && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {result.storySequence.map((story, idx) => (
                  <div key={idx} className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex gap-4">
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold border border-indigo-500/30">
                        {story.part}
                      </div>
                      {idx < result.storySequence!.length - 1 && <div className="w-0.5 h-full bg-slate-700 my-1"></div>}
                    </div>
                    <div className="flex-1 pb-2">
                      <p className="text-slate-200 mb-3">{story.text}</p>
                      {story.interactionIdea && story.interactionIdea !== 'Nenhuma' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-500 text-xs font-medium border border-amber-500/20">
                          <Sparkles className="w-3 h-3" /> {story.interactionIdea}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {result?.caption && (
              <div className="mt-8 pt-6 border-t border-slate-700/50">
                <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Legenda Sugerida</div>
                <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">{result.caption}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {result.hashtags?.map(tag => (
                    <span key={tag} className="text-xs text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-md">{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
