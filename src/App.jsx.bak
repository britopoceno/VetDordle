import { useState, useEffect, useRef } from "react";

const CASES = [
  {
    id: 1,
    diagnosis: "Parvovirose Canina",
    aliases: ["parvovirose", "parvo", "parvovirus", "parvovirose canina", "parvovírus canino"],
    clues: [
      { type: "Sinalamento", icon: "🐾", text: "Canino, SRD, macho, 3 meses de idade, sem histórico vacinal completo." },
      { type: "Queixa Principal", icon: "💬", text: "Tutor relata que o animal parou de comer há 2 dias, está muito prostrado e começou a apresentar vômitos frequentes." },
      { type: "Anamnese", icon: "📋", text: "Animal adquirido há 15 dias em uma feira de adoção. Convive com outros cães no domicílio. Não recebeu nenhuma dose de vacina polivalente. Alimentação com ração seca para filhotes." },
      { type: "Exame Físico", icon: "🩺", text: "Temperatura retal 40,2°C. Mucosas hipocoradas e secas. TPC > 3 segundos. Desidratação estimada em 8%. Dor à palpação abdominal. Presença de diarreia sanguinolenta fétida na região perianal." },
      { type: "Hemograma", icon: "🔬", text: "Leucopenia acentuada (1.800/µL) com linfopenia absoluta. Hematócrito 48%. Trombocitopenia leve. Proteínas totais reduzidas." },
      { type: "Exame Complementar", icon: "🧪", text: "Teste imunocromatográfico rápido (snap test) de fezes: POSITIVO para antígeno viral específico. Ultrassonografia abdominal revelou alças intestinais com espessamento de parede e hipermotilidade." }
    ]
  },
  {
    id: 2,
    diagnosis: "Cinomose",
    aliases: ["cinomose", "cinomose canina", "distemper", "vírus da cinomose"],
    clues: [
      { type: "Sinalamento", icon: "🐾", text: "Canino, Poodle, fêmea, 8 meses, protocolo vacinal incompleto (apenas uma dose de V8)." },
      { type: "Queixa Principal", icon: "💬", text: "Tutor relata que o animal apresenta secreção nasal e ocular há 5 dias, além de tosse e apatia progressiva." },
      { type: "Anamnese", icon: "📋", text: "O animal teve contato com cães de rua durante passeio sem supervisão há aproximadamente duas semanas. Inicialmente apresentou espirros e secreção serosa, que evoluiu para mucopurulenta. Apetite reduzido nos últimos 3 dias." },
      { type: "Exame Físico", icon: "🩺", text: "Temperatura retal 39,8°C. Secreção ocular e nasal mucopurulenta bilateral. Hiperqueratose de coxins plantares. Auscultação pulmonar com crepitação em campos cranioventrais. Pústulas abdominais." },
      { type: "Hemograma", icon: "🔬", text: "Linfopenia absoluta (900/µL). Anemia normocítica normocrômica leve. Presença de corpúsculos de inclusão de Lentz em linfócitos no esfregaço sanguíneo." },
      { type: "Evolução Neurológica", icon: "🧠", text: "Após 10 dias de internação, o animal passou a apresentar mioclonias em membros pélvicos, ataxia cerebelar e episódios convulsivos focais. Reflexo pupilar lentificado bilateralmente." }
    ]
  },
  {
    id: 3,
    diagnosis: "Torção Gástrica",
    aliases: ["torção gástrica", "dilatação vólvulo gástrica", "dvg", "dilatação gástrica", "vólvulo gástrico", "síndrome dilatação vólvulo gástrica", "torção de estômago"],
    clues: [
      { type: "Sinalamento", icon: "🐾", text: "Canino, Pastor Alemão, macho, 7 anos de idade, porte grande (38 kg)." },
      { type: "Queixa Principal", icon: "💬", text: "Tutor relata que o animal apresentou distensão abdominal súbita após a refeição noturna, com tentativas improdutivas de vômito e inquietação extrema." },
      { type: "Anamnese", icon: "📋", text: "O animal recebe uma única refeição volumosa ao dia e tem o hábito de se exercitar logo após comer. Episódio semelhante nunca havia ocorrido antes. Tutor relata que o animal ficou sialorreico e tentou vomitar repetidamente sem sucesso nas últimas 2 horas." },
      { type: "Exame Físico", icon: "🩺", text: "Abdômen cranial marcadamente distendido e timpânico à percussão. FC 160 bpm com pulso femoral fraco e filiforme. TPC > 4 segundos. Mucosas pálidas e acinzentadas. Tentativas de eructação sem sucesso. Passagem de sonda orogástrica encontrou resistência." },
      { type: "Exames Laboratoriais", icon: "🔬", text: "Lactato sérico 7,2 mmol/L (elevado). Gasometria com acidose metabólica. Hemograma com hemoconcentração (Ht 58%). Hipocalemia." },
      { type: "Imagem", icon: "📸", text: "Radiografia abdominal lateral direita revelou estômago marcadamente dilatado com gás, apresentando sinal de compartimentalização (double bubble sign) e deslocamento pilórico dorsocranial, compatível com vólvulo gástrico." }
    ]
  },
  {
    id: 4,
    diagnosis: "Erliquiose Canina",
    aliases: ["erliquiose", "erliquiose canina", "erlichiose", "ehrlichiose", "ehrlichia", "doença do carrapato", "pancitopenia tropical canina"],
    clues: [
      { type: "Sinalamento", icon: "🐾", text: "Canino, Labrador Retriever, macho, 4 anos, vacinação em dia. Acesso a área rural." },
      { type: "Queixa Principal", icon: "💬", text: "Tutor relata apatia progressiva há 10 dias, perda de apetite e sangramento nasal espontâneo observado pela manhã." },
      { type: "Anamnese", icon: "📋", text: "Animal com histórico de infestação recorrente por carrapatos, último tratamento ectoparasiticida há 3 meses. Tutor relata presença de petéquias na região abdominal notadas há 3 dias. Sem histórico de trauma recente." },
      { type: "Exame Físico", icon: "🩺", text: "Temperatura retal 40,5°C. Mucosas hipocoradas com petéquias em mucosa oral e gengival. Esplenomegalia à palpação abdominal. Linfadenomegalia generalizada. Epistaxe unilateral. Presença de carrapatos em região auricular." },
      { type: "Hemograma", icon: "🔬", text: "Pancitopenia: anemia (Ht 22%), leucopenia (3.200/µL) e trombocitopenia severa (18.000/µL). Presença de mórulas em monócitos no esfregaço sanguíneo." },
      { type: "Sorologia", icon: "🧪", text: "Teste rápido (snap 4DX) positivo para anticorpos contra Ehrlichia canis. PCR quantitativo confirmatório positivo com alta carga parasitária." }
    ]
  },
  {
    id: 5,
    diagnosis: "Lipidose Hepática Felina",
    aliases: ["lipidose hepática", "lipidose hepática felina", "lipidose", "esteatose hepática felina", "fígado gorduroso felino"],
    clues: [
      { type: "Sinalamento", icon: "🐾", text: "Felino, SRD, fêmea castrada, 9 anos, obesa (6,8 kg, escore corporal 9/9)." },
      { type: "Queixa Principal", icon: "💬", text: "Tutor relata que a gata parou de comer há 5 dias, está vomitando esporadicamente e ficou com a pele e os olhos amarelados." },
      { type: "Anamnese", icon: "📋", text: "O tutor adotou um novo gato há 3 semanas, desde então a paciente se esconde com frequência e demonstra sinais de estresse. Redução gradual do apetite até anorexia completa. Perda de peso perceptível apesar do histórico de obesidade." },
      { type: "Exame Físico", icon: "🩺", text: "Icterícia marcante em mucosas, pavilhões auriculares e esclera. Desidratação estimada em 6%. Hepatomegalia com bordas arredondadas à palpação. Sialorreia. Ventroflexão cervical discreta." },
      { type: "Bioquímica", icon: "🔬", text: "ALT 380 U/L e FA 520 U/L (ambas muito elevadas). Bilirrubina total 8,4 mg/dL. GGT discretamente elevada. Hipocalemia (2,9 mEq/L). Hipoalbuminemia." },
      { type: "Citologia Hepática", icon: "🧪", text: "Citologia aspirativa hepática guiada por ultrassom revelou hepatócitos marcadamente vacuolizados com acúmulo lipídico intracitoplasmático difuso, compatível com o diagnóstico de infiltração gordurosa hepática severa." }
    ]
  },
  {
    id: 6,
    diagnosis: "Laminite Equina",
    aliases: ["laminite", "laminite equina", "infosura", "aguamento"],
    clues: [
      { type: "Sinalamento", icon: "🐾", text: "Equino, Crioulo, macho castrado, 12 anos, utilizado em provas de laço." },
      { type: "Queixa Principal", icon: "💬", text: "Proprietário relata que o animal está relutante em se movimentar e adota postura anormal com os membros torácicos projetados para frente desde ontem." },
      { type: "Anamnese", icon: "📋", text: "O animal teve acesso acidental ao depósito de ração há 48 horas, consumindo grande quantidade de concentrado à base de milho. Desde então, apresentou redução do apetite e relutância crescente ao movimento. Sem alterações nos membros pélvicos inicialmente." },
      { type: "Exame Físico", icon: "🩺", text: "FC 56 bpm. Postura característica com membros torácicos estendidos cranialmente e membros pélvicos posicionados sob o corpo. Pulso digital aumentado e palpável bilateralmente nos membros torácicos. Sensibilidade intensa à pinça de casco na região da pinça. Grau de claudicação Obel III." },
      { type: "Exames Laboratoriais", icon: "🔬", text: "Hemograma sem alterações significativas. Glicemia 142 mg/dL (elevada). Insulina sérica aumentada. Triglicerídeos elevados. Cortisol dentro dos limites normais." },
      { type: "Imagem", icon: "📸", text: "Radiografia lateromedial dos dígitos torácicos revelou rotação distal da falange distal (P3) com aumento da distância entre a parede dorsal do casco e a superfície parietal de P3, confirmando deslocamento da terceira falange." }
    ]
  },
  {
    id: 7,
    diagnosis: "Obstrução Uretral Felina",
    aliases: ["obstrução uretral", "obstrução uretral felina", "doença do trato urinário inferior dos felinos", "dtuif", "flutd", "bloqueio uretral", "tampão uretral"],
    clues: [
      { type: "Sinalamento", icon: "🐾", text: "Felino, Persa, macho castrado, 5 anos, alimentação exclusiva com ração seca, estilo de vida indoor." },
      { type: "Queixa Principal", icon: "💬", text: "Tutor relata que o gato está entrando e saindo da caixa de areia repetidamente, vocalizando ao tentar urinar, e não produziu urina há aproximadamente 18 horas." },
      { type: "Anamnese", icon: "📋", text: "Animal sedentário com baixa ingestão hídrica. Tutor relata episódio semelhante há 6 meses que resolveu espontaneamente. Nos últimos 2 dias, o gato lambeu excessivamente a região perineal e apresentou hematúria. Mudança recente no domicílio (reforma)." },
      { type: "Exame Físico", icon: "🩺", text: "Bexiga firme, distendida e dolorosa à palpação, do tamanho de uma laranja. Pênis com discreta protrusão e presença de material cristaloide na extremidade. Mucosas pálidas. Bradicardia (FC 100 bpm). Hipotermia (36,8°C). Desidratação moderada." },
      { type: "Exames Laboratoriais", icon: "🔬", text: "Azotemia severa: ureia 320 mg/dL e creatinina 14,2 mg/dL. Hipercalemia grave (8,9 mEq/L). Acidose metabólica. ECG com ondas T apiculadas e bradicardia. Fósforo elevado." },
      { type: "Urinálise", icon: "🧪", text: "Após desobstrução por cateterismo uretral, urina turva e avermelhada. Densidade 1.065. pH 6,8. Presença abundante de cristais de estruvita (fosfato de amônio magnesiano). Hematúria e piúria. Cultura bacteriana negativa." }
    ]
  },
  {
    id: 8,
    diagnosis: "Babesiose Bovina",
    aliases: ["babesiose", "babesiose bovina", "babesia", "tristeza parasitária bovina", "tristeza parasitária", "piroplasmose", "TPB"],
    clues: [
      { type: "Sinalamento", icon: "🐾", text: "Bovino, Holandês, fêmea, 3 anos, em lactação, recém-introduzida na propriedade há 20 dias (procedente de região livre de carrapatos)." },
      { type: "Queixa Principal", icon: "💬", text: "Produtor relata que a vaca parou de comer, apresentou queda abrupta na produção leiteira e está com urina escurecida." },
      { type: "Anamnese", icon: "📋", text: "Animal adquirido de uma fazenda no sul do país com controle rigoroso de ectoparasitas. Após a chegada à nova propriedade em área endêmica, foi observada infestação massiva por carrapatos Rhipicephalus microplus. Nenhum protocolo de premunição foi realizado antes do transporte." },
      { type: "Exame Físico", icon: "🩺", text: "Temperatura retal 41,3°C. Mucosas ictéricas e hipocoradas. Taquicardia (100 bpm). Taquipneia (40 mpm). Hemoglobinúria evidente (urina cor de coca-cola). Infestação massiva por carrapatos. Rúmen hipomotílico." },
      { type: "Hemograma", icon: "🔬", text: "Anemia hemolítica severa (Ht 14%). Hemoglobina 4,2 g/dL. Reticulocitose. Bilirrubina indireta marcadamente elevada. Esfregaço sanguíneo com hemácias parasitadas por organismos piriformes intra-eritrocitários." },
      { type: "Confirmação", icon: "🧪", text: "Esfregaço de sangue periférico (ponta de orelha) corado com Giemsa revelou inclusões intraeritrocitárias piriformes pareadas em ângulo agudo, compatíveis com Babesia bovis. Parasitemia estimada em 2,5%." }
    ]
  }
];

const COMMON_DIAGNOSES = [
  "Parvovirose Canina", "Cinomose", "Erliquiose Canina", "Babesiose Canina",
  "Leishmaniose Visceral", "Torção Gástrica", "Piometra", "Pancreatite",
  "Doença Renal Crônica", "Diabetes Mellitus", "Hiperadrenocorticismo",
  "Hipotireoidismo", "Hipertireoidismo Felino", "Lipidose Hepática Felina",
  "Obstrução Uretral Felina", "Complexo Respiratório Felino", "PIF",
  "FIV", "FeLV", "Laminite Equina", "Cólica Equina", "Tétano",
  "Raiva", "Leptospirose", "Babesiose Bovina", "Tristeza Parasitária Bovina",
  "Mastite", "Cetose Bovina", "Brucelose", "Tuberculose Bovina",
  "Dermatofitose", "Sarna Demodécica", "Sarna Sarcóptica", "Otite Externa",
  "Displasia Coxofemoral", "Ruptura de Ligamento Cruzado", "Gastroenterite",
  "Corpo Estranho Gastrointestinal", "Intussuscepção", "Megaesôfago"
];

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function VetDordle() {
  const [gameState, setGameState] = useState("menu");
  const [cases, setCases] = useState([]);
  const [caseIndex, setCaseIndex] = useState(0);
  const [revealedClues, setRevealedClues] = useState(1);
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState([]);
  const [score, setScore] = useState(0);
  const [totalCases, setTotalCases] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [solved, setSolved] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [animatingClue, setAnimatingClue] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const currentCase = cases[caseIndex];
  const maxClues = currentCase ? currentCase.clues.length : 0;

  useEffect(() => {
    function handleClick(e) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function startGame() {
    const shuffled = shuffleArray(CASES);
    setCases(shuffled);
    setCaseIndex(0);
    setRevealedClues(1);
    setGuess("");
    setAttempts([]);
    setScore(0);
    setTotalCases(0);
    setShowAnswer(false);
    setSolved(false);
    setGameState("playing");
  }

  function revealNext() {
    if (revealedClues < maxClues) {
      const next = revealedClues + 1;
      setRevealedClues(next);
      setAnimatingClue(next - 1);
      setTimeout(() => setAnimatingClue(-1), 500);
    }
  }

  function checkGuess() {
    if (!guess.trim()) return;
    const g = guess.trim().toLowerCase();
    const isCorrect = currentCase.aliases.some(a => a.toLowerCase() === g) ||
      currentCase.diagnosis.toLowerCase() === g;
    
    const newAttempt = { text: guess.trim(), correct: isCorrect };
    setAttempts(prev => [...prev, newAttempt]);
    setGuess("");

    if (isCorrect) {
      const points = Math.max(maxClues - revealedClues + 1, 1);
      setScore(prev => prev + points);
      setSolved(true);
    } else if (attempts.length + 1 >= 3) {
      setShowAnswer(true);
    }
  }

  function nextCase() {
    const nextIdx = caseIndex + 1;
    setTotalCases(prev => prev + 1);
    if (nextIdx < cases.length) {
      setCaseIndex(nextIdx);
      setRevealedClues(1);
      setGuess("");
      setAttempts([]);
      setShowAnswer(false);
      setSolved(false);
    } else {
      setGameState("results");
    }
  }

  function getFilteredSuggestions() {
    if (!guess.trim()) return [];
    const q = guess.toLowerCase();
    return COMMON_DIAGNOSES.filter(d => d.toLowerCase().includes(q)).slice(0, 6);
  }

  function getScoreEmoji() {
    const maxPossible = cases.length * 6;
    const pct = score / maxPossible;
    if (pct > 0.7) return "🏆";
    if (pct > 0.4) return "🎯";
    if (pct > 0.2) return "📚";
    return "💪";
  }

  const suggestions = getFilteredSuggestions();

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0f1a",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: "#e8e6e3",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background texture */}
      <div style={{
        position: "fixed", inset: 0, opacity: 0.03, zIndex: 0,
        backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`,
        backgroundSize: "40px 40px"
      }} />

      {/* Accent glow */}
      <div style={{
        position: "fixed", top: "-200px", right: "-200px", width: "600px", height: "600px",
        background: "radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)",
        zIndex: 0
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto", padding: "24px 16px" }}>
        
        {/* Header */}
        <header style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            background: "linear-gradient(135deg, rgba(34,197,94,0.1), rgba(16,185,129,0.05))",
            border: "1px solid rgba(34,197,94,0.2)",
            borderRadius: 16, padding: "12px 24px", marginBottom: 12
          }}>
            <span style={{ fontSize: 32 }}>🩺</span>
            <div style={{ textAlign: "left" }}>
              <h1 style={{
                fontSize: 28, fontWeight: 800, margin: 0, letterSpacing: "-0.5px",
                background: "linear-gradient(135deg, #22c55e, #10b981)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>VetDordle</h1>
              <p style={{ margin: 0, fontSize: 11, color: "#6b7280", letterSpacing: "2px", textTransform: "uppercase" }}>
                Diagnóstico Veterinário
              </p>
            </div>
          </div>
        </header>

        {/* MENU */}
        {gameState === "menu" && (
          <div style={{ textAlign: "center", animation: "fadeIn 0.6s ease" }}>
            <div style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 20, padding: "40px 32px", marginBottom: 24
            }}>
              <p style={{ fontSize: 18, lineHeight: 1.7, color: "#9ca3af", marginBottom: 32 }}>
                Casos clínicos veterinários são revelados progressivamente.
                Analise os achados e adivinhe o diagnóstico usando o menor número de pistas possível.
              </p>
              <div style={{
                display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32
              }}>
                {[
                  { n: "6", label: "pistas por caso" },
                  { n: "3", label: "tentativas de resposta" },
                  { n: "8", label: "casos no total" }
                ].map((item, i) => (
                  <div key={i} style={{
                    background: "rgba(34,197,94,0.06)", borderRadius: 12, padding: "16px 8px",
                    border: "1px solid rgba(34,197,94,0.1)"
                  }}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: "#22c55e" }}>{item.n}</div>
                    <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>{item.label}</div>
                  </div>
                ))}
              </div>
              <button onClick={startGame} style={{
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                color: "#fff", border: "none", borderRadius: 14,
                padding: "16px 48px", fontSize: 18, fontWeight: 700,
                cursor: "pointer", letterSpacing: "0.5px",
                boxShadow: "0 4px 24px rgba(34,197,94,0.3)",
                transition: "transform 0.2s, box-shadow 0.2s"
              }}
                onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 32px rgba(34,197,94,0.4)"; }}
                onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 24px rgba(34,197,94,0.3)"; }}
              >
                Iniciar Jogo
              </button>
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
              {["🐶 Cães", "🐱 Gatos", "🐴 Equinos", "🐄 Bovinos"].map((tag, i) => (
                <span key={i} style={{
                  fontSize: 12, padding: "6px 14px", borderRadius: 20,
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                  color: "#9ca3af"
                }}>{tag}</span>
              ))}
            </div>
          </div>
        )}

        {/* PLAYING */}
        {gameState === "playing" && currentCase && (
          <div style={{ animation: "fadeIn 0.4s ease" }}>
            {/* Progress bar */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              marginBottom: 20, gap: 12
            }}>
              <span style={{ fontSize: 13, color: "#6b7280" }}>
                Caso {caseIndex + 1}/{cases.length}
              </span>
              <div style={{ flex: 1, height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 4 }}>
                <div style={{
                  height: "100%", borderRadius: 4,
                  background: "linear-gradient(90deg, #22c55e, #10b981)",
                  width: `${((caseIndex) / cases.length) * 100}%`,
                  transition: "width 0.5s ease"
                }} />
              </div>
              <span style={{
                fontSize: 13, color: "#22c55e", fontWeight: 700,
                background: "rgba(34,197,94,0.1)", padding: "4px 12px", borderRadius: 8
              }}>
                {score} pts
              </span>
            </div>

            {/* Clue cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              {currentCase.clues.map((clue, i) => {
                const revealed = i < revealedClues;
                const isAnimating = i === animatingClue;
                return (
                  <div key={i} style={{
                    background: revealed ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.015)",
                    border: `1px solid ${revealed ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.04)"}`,
                    borderRadius: 14, padding: revealed ? "16px 18px" : "12px 18px",
                    transition: "all 0.4s ease",
                    opacity: revealed ? 1 : 0.3,
                    transform: isAnimating ? "scale(1.01)" : "scale(1)",
                  }}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 10, marginBottom: revealed ? 8 : 0
                    }}>
                      <span style={{ fontSize: 18, filter: revealed ? "none" : "grayscale(1)" }}>{clue.icon}</span>
                      <span style={{
                        fontSize: 13, fontWeight: 700, textTransform: "uppercase",
                        letterSpacing: "1px", color: revealed ? "#22c55e" : "#4b5563"
                      }}>
                        {clue.type}
                      </span>
                      {!revealed && (
                        <span style={{
                          marginLeft: "auto", fontSize: 11, color: "#4b5563",
                          padding: "2px 10px", borderRadius: 6,
                          background: "rgba(255,255,255,0.03)"
                        }}>🔒</span>
                      )}
                    </div>
                    {revealed && (
                      <p style={{
                        margin: 0, fontSize: 14, lineHeight: 1.7, color: "#d1d5db",
                        animation: isAnimating ? "fadeIn 0.5s ease" : "none"
                      }}>
                        {clue.text}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Reveal button */}
            {!solved && !showAnswer && revealedClues < maxClues && (
              <button onClick={revealNext} style={{
                width: "100%", padding: "12px",
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12, color: "#9ca3af", fontSize: 14, cursor: "pointer",
                transition: "all 0.2s", marginBottom: 20, fontWeight: 500
              }}
                onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,0.07)"; e.target.style.color = "#e5e7eb"; }}
                onMouseLeave={e => { e.target.style.background = "rgba(255,255,255,0.04)"; e.target.style.color = "#9ca3af"; }}
              >
                Revelar próxima pista ({revealedClues}/{maxClues})
              </button>
            )}

            {/* Previous attempts */}
            {attempts.length > 0 && (
              <div style={{ marginBottom: 16, display: "flex", flexDirection: "column", gap: 6 }}>
                {attempts.map((a, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
                    borderRadius: 10,
                    background: a.correct ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.08)",
                    border: `1px solid ${a.correct ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.2)"}`
                  }}>
                    <span>{a.correct ? "✅" : "❌"}</span>
                    <span style={{
                      fontSize: 14, color: a.correct ? "#22c55e" : "#ef4444",
                      fontWeight: a.correct ? 700 : 400
                    }}>{a.text}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Guess input */}
            {!solved && !showAnswer && (
              <div style={{ position: "relative", marginBottom: 16 }} ref={suggestionsRef}>
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ flex: 1, position: "relative" }}>
                    <input
                      ref={inputRef}
                      type="text"
                      value={guess}
                      onChange={e => { setGuess(e.target.value); setShowSuggestions(true); }}
                      onFocus={() => setShowSuggestions(true)}
                      onKeyDown={e => e.key === "Enter" && checkGuess()}
                      placeholder="Digite seu diagnóstico..."
                      style={{
                        width: "100%", padding: "14px 16px",
                        background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 12, color: "#e8e6e3", fontSize: 15,
                        outline: "none", boxSizing: "border-box",
                        transition: "border-color 0.2s"
                      }}
                      onFocusCapture={e => e.target.style.borderColor = "rgba(34,197,94,0.4)"}
                      onBlurCapture={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                    />
                  </div>
                  <button onClick={checkGuess} style={{
                    padding: "14px 24px", background: "linear-gradient(135deg, #22c55e, #16a34a)",
                    border: "none", borderRadius: 12, color: "#fff",
                    fontWeight: 700, fontSize: 14, cursor: "pointer",
                    boxShadow: "0 2px 12px rgba(34,197,94,0.2)",
                    transition: "transform 0.15s", whiteSpace: "nowrap"
                  }}
                    onMouseEnter={e => e.target.style.transform = "scale(1.03)"}
                    onMouseLeave={e => e.target.style.transform = "scale(1)"}
                  >
                    Responder
                  </button>
                </div>
                {showSuggestions && suggestions.length > 0 && (
                  <div style={{
                    position: "absolute", top: "100%", left: 0, right: 80, marginTop: 4,
                    background: "#1a1f2e", border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12, overflow: "hidden", zIndex: 10,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.4)"
                  }}>
                    {suggestions.map((s, i) => (
                      <div key={i} onClick={() => { setGuess(s); setShowSuggestions(false); inputRef.current?.focus(); }}
                        style={{
                          padding: "10px 16px", cursor: "pointer", fontSize: 14,
                          borderBottom: i < suggestions.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                          transition: "background 0.15s"
                        }}
                        onMouseEnter={e => e.target.style.background = "rgba(34,197,94,0.1)"}
                        onMouseLeave={e => e.target.style.background = "transparent"}
                      >
                        {s}
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ marginTop: 8, fontSize: 12, color: "#6b7280" }}>
                  Tentativa {attempts.length + 1} de 3
                </div>
              </div>
            )}

            {/* Solved */}
            {solved && (
              <div style={{
                background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)",
                borderRadius: 16, padding: 24, textAlign: "center", marginBottom: 16,
                animation: "fadeIn 0.5s ease"
              }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>🎉</div>
                <h3 style={{ margin: 0, fontSize: 20, color: "#22c55e", fontWeight: 700 }}>
                  Diagnóstico Correto!
                </h3>
                <p style={{ margin: "8px 0 0", fontSize: 14, color: "#9ca3af" }}>
                  {currentCase.diagnosis} — acertou com {revealedClues} de {maxClues} pistas
                </p>
                <p style={{ margin: "4px 0 16px", fontSize: 22, color: "#22c55e", fontWeight: 800 }}>
                  +{Math.max(maxClues - revealedClues + 1, 1)} pontos
                </p>
                <button onClick={nextCase} style={{
                  padding: "12px 32px", background: "linear-gradient(135deg, #22c55e, #16a34a)",
                  border: "none", borderRadius: 12, color: "#fff",
                  fontWeight: 700, fontSize: 15, cursor: "pointer",
                  boxShadow: "0 2px 16px rgba(34,197,94,0.3)"
                }}>
                  {caseIndex + 1 < cases.length ? "Próximo Caso →" : "Ver Resultado"}
                </button>
              </div>
            )}

            {/* Failed */}
            {showAnswer && !solved && (
              <div style={{
                background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)",
                borderRadius: 16, padding: 24, textAlign: "center", marginBottom: 16,
                animation: "fadeIn 0.5s ease"
              }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>📖</div>
                <h3 style={{ margin: 0, fontSize: 18, color: "#ef4444" }}>Tentativas esgotadas</h3>
                <p style={{ margin: "12px 0", fontSize: 16, color: "#e8e6e3" }}>
                  O diagnóstico era: <strong style={{ color: "#22c55e" }}>{currentCase.diagnosis}</strong>
                </p>
                <button onClick={nextCase} style={{
                  padding: "12px 32px", background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12,
                  color: "#e8e6e3", fontWeight: 600, fontSize: 15, cursor: "pointer",
                  marginTop: 8
                }}>
                  {caseIndex + 1 < cases.length ? "Próximo Caso →" : "Ver Resultado"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* RESULTS */}
        {gameState === "results" && (
          <div style={{ textAlign: "center", animation: "fadeIn 0.6s ease" }}>
            <div style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 20, padding: "40px 32px"
            }}>
              <div style={{ fontSize: 56, marginBottom: 12 }}>{getScoreEmoji()}</div>
              <h2 style={{
                fontSize: 28, fontWeight: 800, margin: "0 0 8px",
                background: "linear-gradient(135deg, #22c55e, #10b981)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>Resultado Final</h2>
              <div style={{
                fontSize: 48, fontWeight: 800, color: "#22c55e", margin: "16px 0"
              }}>
                {score}
                <span style={{ fontSize: 20, color: "#6b7280", fontWeight: 400 }}> / {cases.length * 6} pts</span>
              </div>
              <p style={{ fontSize: 15, color: "#9ca3af", lineHeight: 1.6, marginBottom: 32 }}>
                {score >= cases.length * 4
                  ? "Excelente raciocínio clínico! Sua semiologia veterinária está afiada."
                  : score >= cases.length * 2
                  ? "Bom desempenho! Com mais prática nos achados clínicos, seu diagnóstico diferencial vai melhorar."
                  : "Continue estudando os casos clínicos. A semiologia é uma habilidade que se refina com a prática."}
              </p>
              <button onClick={startGame} style={{
                padding: "16px 48px",
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                border: "none", borderRadius: 14, color: "#fff",
                fontWeight: 700, fontSize: 17, cursor: "pointer",
                boxShadow: "0 4px 24px rgba(34,197,94,0.3)"
              }}>
                Jogar Novamente
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer style={{
          textAlign: "center", marginTop: 40, padding: "16px 0",
          borderTop: "1px solid rgba(255,255,255,0.04)"
        }}>
          <p style={{ fontSize: 11, color: "#4b5563", margin: 0 }}>
            VetDordle — Jogo educativo de diagnóstico veterinário
          </p>
        </footer>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        input::placeholder { color: #4b5563; }
      `}</style>
    </div>
  );
}
