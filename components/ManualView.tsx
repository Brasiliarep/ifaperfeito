
import React, { useState } from 'react';
import { ArrowLeft, Printer, BookOpen, UserCheck, GraduationCap, CircleDot, Mic, Sparkles, User, Scale, Leaf, Hammer, FlaskConical, Database, Baby, Book, Music, Gamepad2, Move, PenTool, Moon, Package, MapPin, ArrowLeft as ArrowIcon, GitBranch, BarChart3, History, Shield, Activity, Eye, Compass, Calendar, Ghost, Drum, DollarSign, Truck, ShoppingCart, Calculator, CalendarDays, Star, Zap } from 'lucide-react';

interface SectionProps {
    title: string;
    icon: React.ElementType;
    colorClass?: string;
    children?: React.ReactNode;
}

const Section = ({ title, icon: Icon, colorClass = "text-ifa-wood", children }: SectionProps) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden break-inside-avoid mb-6 shadow-md hover:shadow-lg transition-shadow duration-300 print:shadow-none print:border-none print:mb-8">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 transition-all print:hidden"
            >
                <div className={`flex items-center gap-4 font-serif font-bold text-xl ${colorClass}`}>
                    <div className={`p-3 rounded-full bg-opacity-10 ${colorClass.replace('text-', 'bg-')}`}>
                        <Icon size={28} />
                    </div>
                    {title}
                </div>
                <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${isOpen ? 'bg-gray-800 text-white' : 'bg-white text-gray-500'}`}>
                    {isOpen ? 'Recolher' : 'Expandir'}
                </span>
            </button>
            {/* For Print: Always show content regardless of state */}
            <div className={`p-6 md:p-8 bg-white text-gray-700 leading-relaxed space-y-8 border-t border-gray-100 animate-fade-in ${isOpen ? 'block' : 'hidden'} print:block print:p-0 print:border-none`}>
                {children}
            </div>
        </div>
    )
}

const ManualView = ({ onBack }: { onBack: () => void }) => {

    const handlePrint = () => {
        window.print();
    }

    const FeatureBlock = ({ title, purpose, howTo, proTip }: { title: string, purpose: string, howTo: string, proTip?: string }) => (
        <div className="relative pl-6 border-l-4 border-[#D4AF37] hover:bg-gray-50 transition-colors p-4 rounded-r-lg group print:border-black">
            <h4 className="font-serif font-bold text-[#1a1510] text-lg mb-3 flex items-center gap-2 print:text-black">
                {title} <Star size={12} className="text-[#D4AF37] fill-current print:text-black" />
            </h4>
            
            <div className="mb-4">
                <p className="text-sm font-bold text-[#D4AF37] uppercase tracking-wide mb-1 flex items-center gap-1 print:text-black">
                    <Sparkles size={14}/> O Poder da Ferramenta
                </p>
                <p className="text-gray-800 text-justify leading-relaxed text-sm md:text-base print:text-black">
                    {purpose}
                </p>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 print:bg-transparent print:border-black">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1 print:text-black">
                    <Zap size={14}/> Como Operar
                </p>
                <p className="text-gray-700 text-sm leading-relaxed print:text-black">
                    {howTo}
                </p>
            </div>
            
            {proTip && (
                <p className="mt-2 text-xs text-[#5D4037] italic flex items-center gap-1 print:text-black">
                    <strong>Dica de Ouro:</strong> {proTip}
                </p>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-ifa-base text-ifa-text p-4 md:p-8 font-sans pt-safe">
            <div id="printable-area" className="max-w-5xl mx-auto bg-white text-black rounded-2xl shadow-2xl overflow-hidden print:shadow-none mt-4 print:w-full print:max-w-none print:m-0">
                
                {/* Header (No Print) */}
                <div className="bg-[#1a1510] text-[#D4AF37] p-6 flex justify-between items-center print:hidden sticky top-0 z-50 shadow-lg border-b border-[#D4AF37]">
                    <button onClick={onBack} className="flex items-center gap-2 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest p-2">
                        <ArrowLeft size={18} /> Voltar ao App
                    </button>
                    <h1 className="font-serif font-bold text-xl hidden md:block uppercase tracking-[0.2em] text-[#F5F5DC]">Manual do Sacerdote</h1>
                    <button onClick={handlePrint} className="flex items-center gap-2 bg-[#D4AF37] text-black px-6 py-2 rounded-full font-bold hover:bg-white transition-all transform hover:scale-105 shadow-lg text-xs uppercase">
                        <Printer size={16} /> Imprimir
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 md:p-12 space-y-12 print:p-0">
                    
                    <div className="text-center border-b-2 border-[#5D4037] pb-10 print:border-black">
                        <div className="inline-block p-4 rounded-full bg-[#1a1510] mb-4 shadow-xl print:hidden">
                            <BookOpen size={48} className="text-[#D4AF37]" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#1a1510] mb-4 print:text-black">IFÁ OLUWO <span className="text-[#D4AF37] print:text-black">3.0</span></h1>
                        <p className="text-gray-600 uppercase tracking-[0.3em] text-sm md:text-base font-bold print:text-black">Codex Sacerdotal & Oráculo Supremo</p>
                        <p className="text-[#D4AF37] font-bold text-lg mt-4 uppercase tracking-wide print:text-black">
                            "O guia espiritual de matriz africana mais completo do mundo"
                        </p>
                        <p className="max-w-2xl mx-auto mt-6 text-gray-500 italic print:text-black">
                            "Este manual detalha o funcionamento de cada módulo do sistema, unindo a precisão da Inteligência Artificial com os segredos milenares da tradição Yoruba. Domine estas ferramentas e eleve seu sacerdócio."
                        </p>
                    </div>

                    <div className="prose max-w-none text-gray-800 print:text-black">

                        {/* SEÇÃO 1: PILARES */}
                        <h2 className="text-2xl font-bold text-[#1a1510] border-b-4 border-[#D4AF37] pb-2 inline-block mb-8 uppercase tracking-wider print:border-black print:text-black">
                            1. O Coração do Sistema
                        </h2>
                        
                        <Section title="Atendimento ao Consulente" icon={UserCheck} colorClass="text-[#D4AF37]">
                            <FeatureBlock 
                                title="Consulta Profissional Completa"
                                purpose="Transforme seu atendimento em uma experiência de elite. Este módulo gerencia todo o ciclo de vida da consulta: desde a anamnese inicial até a entrega de um PDF sofisticado com as orientações. A IA atua como um 'Apetebi Digital', sugerindo interpretações profundas baseadas em tratados antigos, enquanto você mantém o controle total das prescrições."
                                howTo="1. Inicie cadastrando os dados do cliente (Nome, Data de Nascimento, Mãe). 2. Realize a abertura ritualística com o Iba Digital. 3. Escolha o oráculo (Opele/Búzios/Ikin). 4. Lance o Odu. 5. Leia a interpretação da IA e selecione os Ebós necessários nas abas (Amor, Saúde, etc). 6. Finalize adicionando notas privadas e gere o documento de impressão."
                                proTip="Use o campo 'Notas Confidenciais' para registrar impressões espirituais que não devem aparecer no PDF do cliente."
                            />
                            <FeatureBlock 
                                title="Iba Digital (Abertura/Fechamento)"
                                purpose="Uma solução para quando você está em trânsito ou sem acesso a terra/água física. O sistema simula o ato de libação (pingo d'água) com feedback sonoro e visual, permitindo que você cumpra o preceito de reverência aos ancestrais digitalmente antes de qualquer jogo."
                                howTo="Toque na tela repetidamente para 'derramar' a água virtual enquanto recita a oração exibida. O sistema só libera o acesso ao oráculo após as 3 libações obrigatórias."
                            />
                        </Section>

                        <Section title="Modo Estudo Individual" icon={GraduationCap} colorClass="text-[#5D4037]">
                            <FeatureBlock 
                                title="Treinador de Memorização (Brain Trainer)"
                                purpose="Acelere seu aprendizado em 10x. Ideal para iniciantes que precisam decorar os 256 Odus visualmente. O sistema usa repetição espaçada e gamificação para fixar o conhecimento das caídas do Opele na sua memória de longo prazo."
                                howTo="O app gera uma configuração aleatória do Opele. Você tem 3 opções de nomes. Acerte para ganhar pontos e manter a 'chama' (streak) acesa. Se errar, o app mostra a resposta correta e o verso associado para estudo."
                            />
                        </Section>

                        <Section title="Oráculos Sagrados" icon={CircleDot} colorClass="text-yellow-700">
                            <FeatureBlock 
                                title="Opon Ifá / Opele / Mérìndílógún"
                                purpose="Interfaces de alta fidelidade que respeitam a matemática binária de Ifá. Diferente de geradores aleatórios simples, nosso algoritmo simula a probabilidade física das correntes e búzios, garantindo uma distribuição estatística fiel à realidade."
                                howTo="Toque em cada semente ou búzio para alternar entre Aberto/Fechado. O sistema calcula instantaneamente o Odu resultante, identifica se é Meji, e busca a interpretação correspondente."
                            />
                            <FeatureBlock 
                                title="Obi Abata (Comunicação Rápida)"
                                purpose="Para perguntas de 'Sim' ou 'Não' com nuances. O sistema interpreta as 5 caídas clássicas (Alafia, Etawa, Ejife, Okanran, Oyeku) e dá o conselho imediato: se precisa repetir, se é um 'não' absoluto ou um 'sim' firme."
                                howTo="Mentalize a pergunta e pressione 'Lançar'. Os 4 gomos cairão. O resultado aparece com a interpretação tradicional."
                            />
                            <FeatureBlock 
                                title="Ibo (Determinante)"
                                purpose="Resolva dúvidas binárias durante a consulta (Mão Esquerda vs Direita) sem precisar de objetos físicos. Essencial para determinar Irê ou Osogbo rapidamente."
                                howTo="O cliente mentaliza a pergunta. Você escolhe uma 'mão' virtual. O sistema revela onde está a 'Pedra Branca' (Sim) ou a 'Concha Preta' (Não)."
                            />
                            <FeatureBlock 
                                title="Assistente de Ita (Validador)"
                                purpose="Um checklist inteligente para o momento de confirmar o Ebó. Ele guia o Babalawo nas perguntas obrigatórias: 'Ebó Fin?', 'Ebó Da?', identificando automaticamente o que falta (Oti, Omi, Owo) se a resposta for negativa."
                                howTo="Responda às perguntas sequenciais. Se o Ebó for rejeitado, o sistema sugere qual ingrediente adicionar baseado na ordem hierárquica tradicional."
                            />
                        </Section>

                        <Section title="Voz do Trovão (Comando)" icon={Mic} colorClass="text-gray-600">
                            <FeatureBlock 
                                title="Comando de Voz Hands-Free"
                                purpose="Sinta o poder de controlar o sistema apenas com sua voz. Fundamental para quando suas mãos estão sujas de dendê, efun ou sangue durante rituais. Você mantém a sacralidade do momento sem tocar na tela."
                                howTo="Ative o microfone. Diga comandos claros como 'Iniciar Ebó' (para o cronômetro), 'Tocar Adura' (para música) ou 'Parar'."
                            />
                        </Section>

                        {/* SEÇÃO 2: ESOTÉRICO */}
                        <h2 className="text-2xl font-bold text-[#1a1510] border-b-4 border-[#D4AF37] pb-2 inline-block mb-8 mt-8 uppercase tracking-wider print:border-black print:text-black">
                            2. Metafísica & Sensores
                        </h2>

                        <Section title="Ferramentas Esotéricas" icon={Sparkles} colorClass="text-purple-900">
                            <FeatureBlock 
                                title="Opon AR (Realidade Aumentada)"
                                purpose="Impressione. Projete um tabuleiro de Ifá virtual em 3D sobre qualquer mesa real usando a câmera do celular. Permite jogar em qualquer lugar sem carregar o peso da madeira."
                                howTo="Aponte a câmera para uma superfície plana. O Opon aparecerá. Toque na tela para lançar o Opele virtual sobre o tabuleiro real."
                            />
                            <FeatureBlock 
                                title="Mojuba Voice (Autenticador)"
                                purpose="Tecnologia de reconhecimento de fala calibrada para palavras em Yoruba. O sistema verifica se a sua reza inicial contém as palavras-chave de poder (Aseda, Akoda, Olodumare), validando a abertura do trabalho."
                                howTo="Pressione o botão e recite a saudação. O sistema dará um 'Check Verde' se a frequência e as palavras estiverem corretas."
                            />
                            <FeatureBlock 
                                title="Atunwa (Reencarnação IA)"
                                purpose="Uma das ferramentas mais avançadas. Usa visão computacional para comparar a biometria facial de uma pessoa viva com a foto de um ancestral, buscando semelhanças genéticas e espirituais que indiquem reencarnação familiar."
                                howTo="Carregue a foto do cliente e a foto antiga do ancestral. A IA gera um 'Score de Semelhança' e uma análise mística dos traços compartilhados."
                            />
                            <FeatureBlock 
                                title="Sensor de Iyami (Espectral)"
                                purpose="Transforma o microfone em um detector de anomalias sonoras de alta frequência, tradicionalmente associadas à presença de 'Pássaros da Noite' (Iyami). Uma ferramenta de alerta espiritual."
                                howTo="Ative em silêncio total. Observe o gráfico. Picos vermelhos na zona aguda indicam 'presença' ou carga no ambiente."
                            />
                            <FeatureBlock 
                                title="Guardião da Porta (AR)"
                                purpose="Projeção de Sigilo. Use a câmera para 'selar' visualmente a entrada da sua casa com o Odu Ejiogbe, criando uma barreira psíquica de proteção."
                                howTo="Aponte para o batente da porta. Toque para fixar o selo brilhante de proteção no mundo virtual."
                            />
                        </Section>

                        <Section title="Ori & Ara (Alinhamento)" icon={User} colorClass="text-blue-800">
                            <FeatureBlock 
                                title="Mapeamento Corporal Interativo"
                                purpose="Um guia visual para o Ebori (Limpeza de Cabeça). Mostra exatamente onde tocar, o que rezar e qual material usar em cada ponto vital (Testa, Nuca, Peito, Mãos, Pés)."
                                howTo="Toque em uma parte do corpo no modelo 3D. O card se abre com o nome em Yoruba (ex: Ipako), o significado esotérico e a oração específica para aquela zona."
                            />
                        </Section>

                        {/* SEÇÃO 3: MAGIA PRÁTICA */}
                        <h2 className="text-2xl font-bold text-[#1a1510] border-b-4 border-[#D4AF37] pb-2 inline-block mb-8 mt-8 uppercase tracking-wider print:border-black print:text-black">
                            3. Grimório Digital (Magia)
                        </h2>

                        <Section title="Roda de Xangô" icon={Scale} colorClass="text-red-800">
                            <FeatureBlock 
                                title="Oráculo Jurídico Especializado"
                                purpose="Desenvolvido especificamente para causas legais, disputas e processos. Ele consulta a egrégora de Xangô para prever o desfecho de um julgamento."
                                howTo="Insira os nomes das partes e o número do processo (simbólico). O sistema gira a roda e revela se a vitória virá por luta (Ogun), diplomacia (Otura) ou se há perigo de perda."
                            />
                        </Section>

                        <Section title="ID Ewé (Reconhecimento Botânico)" icon={Leaf} colorClass="text-green-800">
                            <FeatureBlock 
                                title="O 'Shazam' das Plantas Sagradas"
                                purpose="Nunca mais confunda uma folha. Tire uma foto de qualquer planta e a IA identificará seu nome científico, popular e, o mais importante, seu uso litúrgico em Ifá (Ofó, Banho, Ewe Oogun)."
                                howTo="Aponte a câmera para a folha. Aguarde a análise. Veja a ficha completa com as propriedades mágicas e medicinais."
                            />
                        </Section>

                        <Section title="Assentamentos (Guia Igbodu)" icon={Hammer} colorClass="text-gray-700">
                            <FeatureBlock 
                                title="Fichas Técnicas de Fundamentação"
                                purpose="Um manual secreto de montagem. Contém a lista exata de materiais para assentar Orixás (Igba) e preparar oferendas complexas (Adimus), evitando erros rituais."
                                howTo="Busque pelo Orixá (ex: Sango). Veja a lista de 'ingredientes' (pedras, metais, ervas) e o passo-a-passo da montagem."
                            />
                        </Section>

                        <Section title="Akoses (Magia Prática)" icon={FlaskConical} colorClass="text-emerald-800">
                            <FeatureBlock 
                                title="Biblioteca de Remédios Mágicos"
                                purpose="Acesso direto a receitas de pós, sabões e amuletos. O diferencial é a divisão por níveis: Básico (para o cliente fazer), Médio e Completo (Sacerdotal)."
                                howTo="Busque pelo problema (ex: 'atração', 'venda de casa'). O sistema entrega a receita e permite adicionar os materiais direto à lista de compras ou estoque."
                            />
                            <FeatureBlock 
                                title="Criador de Isegun (Amulet Maker)"
                                purpose="Um assistente passo-a-passo para confeccionar patuás personalizados. Ele sugere a base (couro/cabaça), os elementos de carga e gera um 'Certificado de Consagração' digital."
                                howTo="Selecione a finalidade. Arraste os ingredientes virtuais para a bolsa. Ao final, 'consagre' para gerar o documento."
                            />
                        </Section>

                        {/* SEÇÃO 4: ENGENHARIA */}
                        <h2 className="text-2xl font-bold text-[#1a1510] border-b-4 border-[#D4AF37] pb-2 inline-block mb-8 mt-8 uppercase tracking-wider print:border-black print:text-black">
                            4. Engenharia do Destino
                        </h2>

                        <Section title="Matemática Reversa" icon={Database} colorClass="text-teal-800">
                            <FeatureBlock 
                                title="Engenharia Reversa de Ebó"
                                purpose="Uma ferramenta de detetive. Você vê os restos de um ebó na rua ou tem apenas alguns ingredientes em casa? O sistema deduz qual Odu rege aquela combinação."
                                howTo="Digite os materiais (ex: 'pimenta, carvão, óleo'). O algoritmo cruza os dados e diz: 'Isso pertence a Okanran Meji', explicando o significado."
                            />
                        </Section>

                        <Section title="Nomes Yorubá (Amutorunwa)" icon={Baby} colorClass="text-pink-800">
                            <FeatureBlock 
                                title="Revelador de Nomes Predestinados"
                                purpose="Descubra o nome espiritual de uma criança baseado nas circunstâncias do nascimento (parto pélvico, cordão umbilical, gêmeos). Recupera a identidade ancestral."
                                howTo="Selecione a condição do nascimento na lista. O app revela o nome (ex: Ige, Ojo, Taiwo) e seu significado profundo."
                            />
                        </Section>

                        {/* SEÇÃO 5: ATMOSFERA */}
                        <h2 className="text-2xl font-bold text-[#1a1510] border-b-4 border-[#D4AF37] pb-2 inline-block mb-8 mt-8 uppercase tracking-wider print:border-black print:text-black">
                            5. Atmosfera & Som
                        </h2>

                        <Section title="Biblioteca Sagrada" icon={Book} colorClass="text-indigo-800">
                            <FeatureBlock 
                                title="Acervo Vivo de Orikis"
                                purpose="Um repositório de rezas textuais com suporte a áudio. Ideal para aprender a pronúncia correta do Yoruba tonal."
                                howTo="Navegue pelas categorias (Esu, Ogun, Aje). Pressione 'Ouvir' para que a IA recite o texto com a entonação correta."
                            />
                        </Section>

                        <Section title="Sons Sagrados (Sound Hub)" icon={Music} colorClass="text-violet-800">
                            <FeatureBlock title="Karaokê Iyere" purpose="Aprenda a cantar os versos de Ifá. A letra rola na tela em sincronia com o ritmo, permitindo que você treine a entoação dos cânticos." howTo="Escolha o Odu. Acompanhe a letra colorida enquanto o áudio guia toca." />
                            <FeatureBlock title="Som do Odu (Binaural)" purpose="Gera uma frequência sonora (Hz) baseada na matemática binária do Odu para induzir estados de transe e alinhar as ondas cerebrais do consulente." howTo="Coloque fones de ouvido no cliente durante o Ebó." />
                            <FeatureBlock title="Sussurro Egun (3D)" purpose="Experiência de áudio 3D onde vozes ancestrais parecem circular ao redor da cabeça. Potente para meditações de conexão com antepassados." howTo="Use fones. Feche os olhos. Sinta a presença." />
                            <FeatureBlock title="Ayan Agalu (Oráculo de Ritmo)" purpose="Mede a estabilidade emocional através do toque. Você batuca na tela e o sistema analisa o BPM e a variação para diagnosticar ansiedade ou foco." howTo="Toque na tela ritmadamente por 10 segundos." />
                        </Section>

                        {/* SEÇÃO 6: GESTÃO */}
                        <h2 className="text-2xl font-bold text-[#1a1510] border-b-4 border-[#D4AF37] pb-2 inline-block mb-8 mt-8 uppercase tracking-wider print:border-black print:text-black">
                            6. Gestão do Templo
                        </h2>

                        <Section title="Gestão Profissional" icon={Package} colorClass="text-orange-800">
                            <FeatureBlock title="Livro Caixa & CRM" purpose="Profissionalize seu templo. Controle pagamentos, parcele consultas, registre devedores e mantenha um histórico financeiro impecável." howTo="No 'Novo Lançamento', associe um valor a um cliente. O sistema calcula parcelas e datas de vencimento." />
                            <FeatureBlock title="Agenda Litúrgica" purpose="Nunca mais perca um retorno de 16 dias. O sistema agenda automaticamente os ciclos rituais e envia lembretes prontos para o WhatsApp do cliente." howTo="Após a consulta, clique em 'Agendar Retorno'." />
                            <FeatureBlock title="Controle de Estoque" purpose="Evite ficar sem Obi ou Dendê na hora H. Monitore a quantidade de materiais sagrados e receba alertas de reposição." howTo="Defina o estoque mínimo. O app avisa quando estiver acabando." />
                            <FeatureBlock title="Tabela de Preços" purpose="Calcule o preço justo do seu Axé. Some o custo dos materiais + sua mão de obra para nunca ter prejuízo." howTo="Cadastre o custo de cada item. O app sugere o preço final." />
                        </Section>

                        <Section title="Mapa de Ervas (Geo)" icon={MapPin} colorClass="text-green-700">
                            <FeatureBlock title="Mapeamento de Colheita GPS" purpose="Crie seu mapa do tesouro botânico. Marque no GPS onde você encontrou aquela erva rara na mata ou na rua para voltar lá depois." howTo="Ao encontrar a planta, abra o app e clique em 'Marcar Localização Atual'." />
                        </Section>

                        <Section title="Painel Egrégora (Analytics)" icon={BarChart3} colorClass="text-gray-800">
                            <FeatureBlock title="Termômetro Espiritual (Big Data)" purpose="Analise a saúde espiritual da sua comunidade. O gráfico mostra quais Odus estão saindo mais (tendência coletiva) e o equilíbrio entre Irê (Sorte) e Osogbo (Azar) no seu templo." howTo="Acesse o painel para ver gráficos de pizza e barras sobre os atendimentos do mês." />
                        </Section>

                    </div>

                    <div className="mt-16 pt-8 border-t-2 border-gray-100 text-center">
                        <p className="text-sm font-bold text-[#D4AF37] uppercase tracking-widest mb-2 print:text-black">Ifá Oluwo - Tecnologia a Serviço do Sagrado</p>
                        <p className="text-xs text-gray-400 print:text-black">Desenvolvido com respeito e axé por Babalawo Ifálore • v3.0.0</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ManualView;
