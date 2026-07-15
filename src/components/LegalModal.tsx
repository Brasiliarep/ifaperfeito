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
                            <p><strong>1. Aceitação:</strong> Ao criar uma conta e utilizar o Ifá Oluwo, você declara ter lido, compreendido e aceitado estes Termos de Uso. Caso não concorde, não utilize a plataforma.</p>
                            <p><strong>2. Uso Responsável:</strong> As orientações espirituais (Ebós, Medicinas, interpretações de Odù) são sugestões baseadas na tradição de Ifá. O uso prático, especialmente de ervas, rituais e ingredientes, é de total responsabilidade do usuário/sacerdote. O Ifá Oluwo não se responsabiliza por decisões tomadas com base no conteúdo gerado.</p>
                            <p><strong>3. Conta e Segurança:</strong> Você é responsável por manter a confidencialidade de sua senha e por todas as atividades em sua conta. Notifique imediatamente sobre qualquer uso não autorizado.</p>
                            <p><strong>4. Propriedade Intelectual:</strong> O conteúdo, design, código fonte e identidade visual são propriedade do desenvolvedor. É proibida a reprodução, distribuição ou engenharia reversa sem autorização expressa.</p>
                            <p><strong>5. Dados de Saúde e Pagamento:</strong> O Ifá Oluwo pode armazenar históricos de consultas espirituais, diagnósticos de Ajogun e registros de ebós. Dados de cartão de crédito são processados exclusivamente pelo PayPal, sem armazenamento em nossos servidores.</p>
                            <p><strong>6. Isenção de Responsabilidade:</strong> O desenvolvedor não se responsabiliza por resultados espirituais, materiais, físicos ou emocionais decorrentes do uso das ferramentas. Consulte sempre um Babalawo presencial para decisões importantes.</p>
                            <p><strong>7. Alterações:</strong> Estes termos podem ser alterados a qualquer momento. O uso continuado após alterações constitui aceitação dos novos termos.</p>
                            <p><strong>8. LGPD (Lei Geral de Proteção de Dados - Lei 13.709/2018):</strong> Você tem direito a solicitar a exclusão dos seus dados, exportar suas informações e revogar o consentimento a qualquer momento. Para exercer seus direitos, entre em contato pelo e-mail de suporte.</p>
                        </>
                    ) : (
                        <>
                            <p><strong>Última atualização:</strong> Junho de 2026</p>
                            <p>O Ifá Oluwo respeita sua privacidade e está comprometido com a proteção dos seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018).</p>

                            <p><strong>1. Dados Coletados:</strong></p>
                            <p>- <strong>Cadastro:</strong> Nome, e-mail e plano de assinatura (armazenados no Firebase Firestore).</p>
                            <p>- <strong>Uso local:</strong> Nomes de clientes, históricos de consultas, inventário de templo, registros financeiros e agenda — armazenados exclusivamente no LocalStorage do seu navegador.</p>
                            <p>- <strong>Pagamentos:</strong> Processados pelo PayPal. NÃO armazenamos números de cartão de crédito ou dados bancários.</p>
                            <p>- <strong>Dados de saúde espiritual:</strong> Diagnósticos de Ajogun, ebós prescritos e históricos de consultas — armazenados localmente e/ou no Firestore conforme sua conta.</p>

                            <p><strong>2. Finalidade do Tratamento:</strong></p>
                            <p>Os dados são utilizados exclusivamente para: (a) autenticação e gestão de conta; (b) processamento de assinaturas via PayPal; (c) funcionamento das ferramentas litúrgicas e de interpretação; (d) melhoria contínua do serviço.</p>

                            <p><strong>3. Compartilhamento:</strong></p>
                            <p>Não compartilhamos seus dados com terceiros, exceto: (a) PayPal para processamento de pagamentos; (b) Google Firebase para autenticação e armazenamento; (c) Groq Inc. para processamento das interpretações por IA (nenhum dado de identificação pessoal é enviado).</p>

                            <p><strong>4. Seus Direitos (LGPD):</strong></p>
                            <p>Você pode, a qualquer momento: (a) confirmar a existência de tratamento de dados; (b) acessar seus dados; (c) corrigir dados incompletos ou desatualizados; (d) solicitar a anonimização ou exclusão de dados desnecessários; (e) solicitar a portabilidade dos dados; (f) revogar o consentimento.</p>

                            <p><strong>5. Segurança:</strong></p>
                            <p>Adotamos medidas técnicas e organizacionais para proteger seus dados, incluindo criptografia em trânsito (HTTPS), regras de segurança no Firestore e chave de IA armazenada exclusivamente no servidor (Netlify Function).</p>

                            <p><strong>6. Retenção:</strong></p>
                            <p>Seus dados serão mantidos enquanto sua conta estiver ativa. Após exclusão da conta, os dados serão removidos em até 30 dias.</p>

                            <p><strong>7. Contato:</strong></p>
                            <p>Para exercer seus direitos LGPD ou esclarecer dúvidas: <strong>babaifalore@gmail.com</strong></p>

                            <p><strong>8. Consentimento:</strong></p>
                            <p>Ao criar sua conta e marcar a opção "Aceito os Termos de Uso e Política de Privacidade", você consente com o tratamento de seus dados conforme descrito nesta política.</p>
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
