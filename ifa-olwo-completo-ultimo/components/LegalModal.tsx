import React from 'react';
import { X, Shield, FileText } from 'lucide-react';

interface Props {
    type: 'terms' | 'privacy' | null;
    onClose: () => void;
}

const LegalModal: React.FC<Props> = ({ type, onClose }) => {
    if (!type) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-ifa-base w-full max-w-2xl rounded-xl border border-ifa-gold/30 shadow-2xl relative flex flex-col max-h-[85vh]">
                <div className="flex justify-between items-center p-4 border-b border-ifa-border bg-ifa-base-dark rounded-t-xl">
                    <h2 className="text-xl font-serif text-ifa-gold flex items-center gap-2">
                        {type === 'terms' ? <FileText size={20}/> : <Shield size={20}/>}
                        {type === 'terms' ? 'Termos de Uso' : 'Política de Privacidade'}
                    </h2>
                    <button onClick={onClose} className="text-ifa-neutral hover:text-white"><X size={24}/></button>
                </div>
                
                <div className="p-6 overflow-y-auto text-ifa-text text-sm leading-relaxed space-y-4">
                    {type === 'terms' ? (
                        <>
                            <p><strong>1. Aceitação:</strong> Ao utilizar o Ifá Guia, você concorda com estes termos. Este aplicativo é uma ferramenta de auxílio litúrgico e educacional.</p>
                            <p><strong>2. Uso Responsável:</strong> As orientações espirituais (Ebós, Medicinas) são sugestões baseadas na tradição. O uso prático, especialmente de ervas e rituais, é de total responsabilidade do usuário/sacerdote.</p>
                            <p><strong>3. Propriedade Intelectual:</strong> O conteúdo, design e código fonte são propriedade do desenvolvedor. A engenharia reversa é proibida.</p>
                            <p><strong>4. Isenção:</strong> O desenvolvedor não se responsabiliza por resultados espirituais ou materiais decorrentes do uso das ferramentas.</p>
                        </>
                    ) : (
                        <>
                            <p><strong>1. Coleta de Dados:</strong> O aplicativo armazena dados (nomes de clientes, histórico) <strong>localmente</strong> no seu dispositivo via LocalStorage. Nós não enviamos seus dados para servidores externos.</p>
                            <p><strong>2. Fotos e Câmera:</strong> As imagens capturadas para análise (Opele, Ervas) são processadas em tempo real e não são armazenadas permanentemente em nossos servidores.</p>
                            <p><strong>3. Microfone:</strong> O uso do microfone para "Voz do Trovão" ou "Iyami" é instantâneo e não gravado.</p>
                            <p><strong>4. Segurança:</strong> Recomendamos que você utilize a função de Backup (Configurações) para proteger seus dados.</p>
                        </>
                    )}
                </div>

                <div className="p-4 border-t border-ifa-border bg-ifa-base-dark rounded-b-xl text-right">
                    <button onClick={onClose} className="px-6 py-2 bg-ifa-wood text-white rounded hover:opacity-90">Fechar</button>
                </div>
            </div>
        </div>
    );
};

export default LegalModal;