import { useState, useEffect, useRef } from "react";

/* ─── DIAGNOSIS DATABASE ─── */
const ALL_DIAGNOSES = [
  { name: "Parvovirose Canina", species: "canino", system: "gastrointestinal", etiology: "infecciosa", course: "agudo", age: "jovem" },
  { name: "Cinomose", species: "canino", system: "multissistêmico", etiology: "infecciosa", course: "agudo", age: "jovem" },
  { name: "Torção Gástrica", species: "canino", system: "gastrointestinal", etiology: "mecânica", course: "agudo", age: "adulto" },
  { name: "Erliquiose Canina", species: "canino", system: "hematológico", etiology: "infecciosa", course: "agudo", age: "adulto" },
  { name: "Lipidose Hepática Felina", species: "felino", system: "hepático", etiology: "metabólica", course: "agudo", age: "adulto" },
  { name: "Laminite Equina", species: "equino", system: "locomotor", etiology: "metabólica", course: "agudo", age: "adulto" },
  { name: "Obstrução Uretral Felina", species: "felino", system: "urinário", etiology: "mecânica", course: "agudo", age: "adulto" },
  { name: "Babesiose Bovina", species: "bovino", system: "hematológico", etiology: "infecciosa", course: "agudo", age: "adulto" },
  { name: "Piometra", species: "canino", system: "reprodutor", etiology: "infecciosa", course: "agudo", age: "adulto" },
  { name: "Doença Renal Crônica", species: "felino", system: "urinário", etiology: "degenerativa", course: "crônico", age: "idoso" },
  { name: "Diabetes Mellitus Canina", species: "canino", system: "endócrino", etiology: "metabólica", course: "crônico", age: "adulto" },
  { name: "Hipertireoidismo Felino", species: "felino", system: "endócrino", etiology: "neoplásica", course: "crônico", age: "idoso" },
  { name: "Leishmaniose Visceral Canina", species: "canino", system: "multissistêmico", etiology: "infecciosa", course: "crônico", age: "adulto" },
  { name: "Hiperadrenocorticismo Canino", species: "canino", system: "endócrino", etiology: "neoplásica", course: "crônico", age: "adulto" },
  { name: "Complexo Respiratório Felino", species: "felino", system: "respiratório", etiology: "infecciosa", course: "agudo", age: "jovem" },
  { name: "Cólica Equina", species: "equino", system: "gastrointestinal", etiology: "mecânica", course: "agudo", age: "adulto" },
  { name: "Mastite Bovina", species: "bovino", system: "reprodutor", etiology: "infecciosa", course: "agudo", age: "adulto" },
  { name: "Sarna Demodécica", species: "canino", system: "tegumentar", etiology: "parasitária", course: "crônico", age: "jovem" },
  { name: "Cardiomiopatia Dilatada", species: "canino", system: "cardiovascular", etiology: "degenerativa", course: "crônico", age: "adulto" },
  { name: "Cardiomiopatia Hipertrófica Felina", species: "felino", system: "cardiovascular", etiology: "degenerativa", course: "crônico", age: "adulto" },
  { name: "Displasia Coxofemoral", species: "canino", system: "locomotor", etiology: "degenerativa", course: "crônico", age: "jovem" },
  { name: "Cetose Bovina", species: "bovino", system: "metabólico", etiology: "metabólica", course: "agudo", age: "adulto" },
  { name: "Corpo Estranho Gastrointestinal", species: "canino", system: "gastrointestinal", etiology: "mecânica", course: "agudo", age: "jovem" },
  { name: "Pancreatite Canina", species: "canino", system: "gastrointestinal", etiology: "metabólica", course: "agudo", age: "adulto" },
  { name: "PIF", species: "felino", system: "multissistêmico", etiology: "infecciosa", course: "crônico", age: "jovem" },
  { name: "Raiva", species: "canino", system: "neurológico", etiology: "infecciosa", course: "agudo", age: "adulto" },
  { name: "Tétano Equino", species: "equino", system: "neurológico", etiology: "infecciosa", course: "agudo", age: "adulto" },
  { name: "Leptospirose Canina", species: "canino", system: "multissistêmico", etiology: "infecciosa", course: "agudo", age: "adulto" },
  { name: "Otite Externa", species: "canino", system: "tegumentar", etiology: "infecciosa", course: "crônico", age: "adulto" },
  { name: "Intussuscepção", species: "canino", system: "gastrointestinal", etiology: "mecânica", course: "agudo", age: "jovem" },
];

/* ─── CLINICAL CASES ─── */
const CASES = [
  {
    answer: "Parvovirose Canina",
    vignette: "Canino, SRD, macho, 3 meses, sem vacinação. Há 2 dias com anorexia, prostração intensa e vômitos frequentes. Adquirido em feira de adoção há 15 dias. Ao exame: temperatura 40,2°C, mucosas hipocoradas e secas, TPC > 3s, desidratação 8%, dor abdominal, diarreia sanguinolenta fétida. Hemograma com leucopenia acentuada (1.800/µL), linfopenia absoluta e trombocitopenia leve."
  },
  {
    answer: "Cinomose",
    vignette: "Canino, Poodle, fêmea, 8 meses, apenas uma dose de V8. Secreção nasal e ocular mucopurulenta bilateral há 5 dias, tosse e apatia progressiva. Contato com cães de rua há duas semanas. Ao exame: hiperqueratose de coxins plantares, crepitação pulmonar cranioventral, pústulas abdominais. Hemograma com linfopenia (900/µL) e corpúsculos de inclusão de Lentz em linfócitos. Evolui com mioclonias e convulsões focais."
  },
  {
    answer: "Torção Gástrica",
    vignette: "Canino, Pastor Alemão, macho castrado, 7 anos, 38 kg. Distensão abdominal súbita após refeição volumosa única, com tentativas improdutivas de vômito e inquietação extrema há 2 horas. Hábito de exercício pós-prandial. Ao exame: abdômen cranial timpânico, FC 160 bpm, pulso filiforme, TPC > 4s, mucosas acinzentadas. Sonda orogástrica com resistência à passagem. Lactato 7,2 mmol/L. Radiografia com sinal de double bubble e deslocamento pilórico dorsocranial."
  },
  {
    answer: "Erliquiose Canina",
    vignette: "Canino, Labrador, macho, 4 anos, acesso a área rural. Apatia progressiva há 10 dias com epistaxe espontânea. Infestação recorrente por carrapatos, último ectoparasiticida há 3 meses. Ao exame: temperatura 40,5°C, petéquias em mucosa oral, esplenomegalia, linfadenomegalia generalizada, carrapatos em região auricular. Hemograma com pancitopenia (Ht 22%, leucócitos 3.200/µL, plaquetas 18.000/µL) e mórulas em monócitos."
  },
  {
    answer: "Lipidose Hepática Felina",
    vignette: "Felino, SRD, fêmea castrada, 9 anos, obesa (escore 9/9). Anorexia há 5 dias com vômitos esporádicos e icterícia. Estresse por introdução de novo gato há 3 semanas. Ao exame: icterícia marcante, desidratação 6%, hepatomegalia com bordas arredondadas, ventroflexão cervical. Bioquímica com ALT 380 U/L, FA 520 U/L, bilirrubina total 8,4 mg/dL, hipocalemia (2,9 mEq/L). Citologia hepática com hepatócitos vacuolizados por acúmulo lipídico difuso."
  },
  {
    answer: "Laminite Equina",
    vignette: "Equino, Crioulo, macho castrado, 12 anos. Relutância ao movimento e postura com membros torácicos projetados cranialmente desde ontem. Acesso acidental a depósito de concentrado há 48 horas com ingestão de grande quantidade de milho. Ao exame: pulso digital aumentado bilateralmente, sensibilidade intensa à pinça de casco na região da pinça, claudicação Obel III. Glicemia 142 mg/dL, insulina elevada. Radiografia com rotação distal de P3."
  },
  {
    answer: "Obstrução Uretral Felina",
    vignette: "Felino, Persa, macho castrado, 5 anos, indoor, ração seca exclusiva. Idas frequentes à caixa de areia com vocalização, sem produção de urina há 18 horas. Episódio semelhante autolimitante há 6 meses. Lambedura perineal excessiva e hematúria recente. Reforma no domicílio. Ao exame: bexiga firme e distendida, bradicardia (100 bpm), hipotermia (36,8°C). Ureia 320 mg/dL, creatinina 14,2 mg/dL, hipercalemia 8,9 mEq/L, ECG com ondas T apiculadas."
  },
  {
    answer: "Babesiose Bovina",
    vignette: "Bovino, Holandês, fêmea, 3 anos, em lactação, introduzida há 20 dias procedente de região sem carrapatos. Anorexia, queda na produção leiteira e hemoglobinúria. Infestação massiva por Rhipicephalus microplus sem premunição prévia. Ao exame: temperatura 41,3°C, mucosas ictéricas e hipocoradas, taquicardia, hemoglobinúria (urina cor de coca-cola). Hemograma com Ht 14%, reticulocitose, bilirrubina indireta elevada. Esfregaço com inclusões piriformes pareadas intra-eritrocitárias."
  },
];

/* ─── HELPERS ─── */
const CATEGORIES = [
  { key: "species", label: "Espécie", icon: "🐾" },
  { key: "system", label: "Sistema", icon: "🫀" },
  { key: "etiology", label: "Etiologia", icon: "🦠" },
  { key: "course", label: "Curso", icon: "⏱" },
  { key: "age", label: "Faixa Etária", icon: "📅" },
];

function getDiagData(name) {
  return ALL_DIAGNOSES.find(d => d.name === name);
}

function compareDiag(guessName, answerName) {
  const g = getDiagData(guessName);
  const a = getDiagData(answerName);
  if (!g || !a) return null;
  return CATEGORIES.map(cat => ({
    ...cat,
    guessVal: g[cat.key],
    answerVal: a[cat.key],
    match: g[cat.key] === a[cat.key],
  }));
}

function normalize(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const MAX_ATTEMPTS = 6;

/* ─── COMPONENT ─── */
export default function VetDordle() {
  const [screen, setScreen] = useState("menu");
  const [cases, setCases] = useState([]);
  const [caseIdx, setCaseIdx] = useState(0);
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState([]);
  const [solved, setSolved] = useState(false);
  const [failed, setFailed] = useState(false);
  const [score, setScore] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [animRow, setAnimRow] = useState(-1);
  const inputRef = useRef(null);
  const sugRef = useRef(null);

  const currentCase = cases[caseIdx];
  const answerData = currentCase ? getDiagData(currentCase.answer) : null;

  useEffect(() => {
    function onClick(e) {
      if (sugRef.current && !sugRef.current.contains(e.target)) setShowSuggestions(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function startGame() {
    setCases(shuffleArray(CASES));
    setCaseIdx(0);
    setAttempts([]);
    setSolved(false);
    setFailed(false);
    setScore(0);
    setGuess("");
    setScreen("playing");
  }

  function submitGuess() {
    const trimmed = guess.trim();
    if (!trimmed || solved || failed) return;
    const matched = ALL_DIAGNOSES.find(d => normalize(d.name) === normalize(trimmed));
    if (!matched) return;
    const isCorrect = matched.name === currentCase.answer;
    const comparison = compareDiag(matched.name, currentCase.answer);
    const newAttempts = [...attempts, { name: matched.name, correct: isCorrect, comparison }];
    setAttempts(newAttempts);
    setGuess("");
    setAnimRow(newAttempts.length - 1);
    setTimeout(() => setAnimRow(-1), 800);
    if (isCorrect) {
      setSolved(true);
      setScore(prev => prev + Math.max(MAX_ATTEMPTS - newAttempts.length + 1, 1));
    } else if (newAttempts.length >= MAX_ATTEMPTS) {
      setFailed(true);
    }
  }

  function nextCase() {
    if (caseIdx + 1 < cases.length) {
      setCaseIdx(caseIdx + 1);
      setAttempts([]);
      setSolved(false);
      setFailed(false);
      setGuess("");
    } else {
      setScreen("results");
    }
  }

  const suggestions = guess.trim().length >= 2
    ? ALL_DIAGNOSES.filter(d => normalize(d.name).includes(normalize(guess)))
        .filter(d => !attempts.some(a => a.name === d.name))
        .slice(0, 6)
    : [];

  const pct = cases.length ? score / (cases.length * MAX_ATTEMPTS) : 0;

  return (
    <div style={S.root}>
      <div style={S.bgDots} />
      <div style={S.bgGlow} />
      <div style={S.container}>

        {/* Header */}
        <header style={S.header}>
          <div style={S.logo}>
            <span style={{ fontSize: 28 }}>🩺</span>
            <div>
              <h1 style={S.h1}>VetDordle</h1>
              <p style={S.sub}>DIAGNÓSTICO VETERINÁRIO</p>
            </div>
          </div>
          {screen === "playing" && <div style={S.pts}>{score} pts</div>}
        </header>

        {/* ── MENU ── */}
        {screen === "menu" && (
          <div style={{ animation: "fu .5s ease" }}>
            <div style={S.card}>
              <p style={S.desc}>
                Leia o caso clínico completo e tente acertar o diagnóstico.
                A cada tentativa você recebe feedback em 5 categorias, igual ao Wordle:
                verde se a categoria combina com a resposta, vermelho se não combina.
                Use esse feedback para refinar suas próximas tentativas.
              </p>
              <div style={S.catRow}>
                {CATEGORIES.map((c, i) => (
                  <div key={i} style={S.catChip}><span>{c.icon}</span><span style={{ fontSize: 12 }}>{c.label}</span></div>
                ))}
              </div>
              <div style={S.legendRow}>
                <div style={S.legendItem}><div style={{ ...S.legendDot, background: "#22c55e" }} /><span style={{ fontSize: 13, color: "#d1d5db" }}>Combina</span></div>
                <div style={S.legendItem}><div style={{ ...S.legendDot, background: "#ef4444" }} /><span style={{ fontSize: 13, color: "#d1d5db" }}>Não combina</span></div>
              </div>
              <div style={S.numRow}>
                {[{ n: "6", l: "tentativas" }, { n: "5", l: "categorias" }, { n: "8", l: "casos" }].map((s, i) => (
                  <div key={i} style={S.numBox}><div style={S.numN}>{s.n}</div><div style={S.numL}>{s.l}</div></div>
                ))}
              </div>
              <button onClick={startGame} style={S.btnG}>Iniciar</button>
            </div>
          </div>
        )}

        {/* ── PLAYING ── */}
        {screen === "playing" && currentCase && (
          <div style={{ animation: "fu .4s ease" }}>
            <div style={S.progRow}>
              <span style={S.progLbl}>Caso {caseIdx + 1}/{cases.length}</span>
              <div style={S.progBar}><div style={{ ...S.progFill, width: `${(caseIdx / cases.length) * 100}%` }} /></div>
            </div>

            {/* Vignette */}
            <div style={S.vig}>
              <div style={S.vigH}><span style={{ fontSize: 16 }}>📋</span><span style={S.vigT}>Caso Clínico</span></div>
              <p style={S.vigP}>{currentCase.vignette}</p>
            </div>

            {/* Grid */}
            {attempts.length > 0 && (
              <div style={S.grid}>
                <div style={S.ghRow}>
                  <div style={{ ...S.ghCell, flex: 2.2 }}>Diagnóstico</div>
                  {CATEGORIES.map((c, i) => <div key={i} style={S.ghCell} title={c.label}>{c.icon}</div>)}
                </div>
                {attempts.map((att, ri) => (
                  <div key={ri} style={{
                    ...S.gRow,
                    animation: ri === animRow ? "fu .4s ease" : "none",
                    border: att.correct ? "1px solid rgba(34,197,94,0.4)" : "1px solid rgba(255,255,255,0.04)",
                    background: att.correct ? "rgba(34,197,94,0.06)" : "rgba(255,255,255,0.02)",
                  }}>
                    <div style={{ ...S.gDiag, color: att.correct ? "#22c55e" : "#e8e6e3", fontWeight: att.correct ? 700 : 400 }}>
                      {att.correct && <span style={{ marginRight: 4 }}>✓</span>}{att.name}
                    </div>
                    {att.comparison && att.comparison.map((cat, ci) => (
                      <div key={ci} style={{
                        ...S.gCell,
                        background: cat.match ? "rgba(34,197,94,0.18)" : "rgba(239,68,68,0.13)",
                        color: cat.match ? "#4ade80" : "#f87171",
                        animation: ri === animRow ? `fi .35s ease ${ci * 80}ms backwards` : "none",
                      }}>
                        <div style={{ fontSize: 15, fontWeight: 700 }}>{cat.match ? "✓" : "✗"}</div>
                        <div style={{ fontSize: 9, opacity: 0.75, marginTop: 1, textAlign: "center", lineHeight: 1.2 }}>{cat.guessVal}</div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* Input */}
            {!solved && !failed && (
              <div style={{ position: "relative", marginTop: 16 }} ref={sugRef}>
                <div style={S.inRow}>
                  <div style={{ flex: 1, position: "relative" }}>
                    <input ref={inputRef} value={guess}
                      onChange={e => { setGuess(e.target.value); setShowSuggestions(true); }}
                      onFocus={() => setShowSuggestions(true)}
                      onKeyDown={e => e.key === "Enter" && submitGuess()}
                      placeholder="Digite um diagnóstico..." style={S.inp} />
                  </div>
                  <button onClick={submitGuess} style={S.btnS}>Enviar</button>
                </div>
                {showSuggestions && suggestions.length > 0 && (
                  <div style={S.sugBox}>
                    {suggestions.map((s, i) => (
                      <div key={i} onClick={() => { setGuess(s.name); setShowSuggestions(false); inputRef.current?.focus(); }}
                        style={S.sugI}
                        onMouseEnter={e => e.target.style.background = "rgba(34,197,94,0.1)"}
                        onMouseLeave={e => e.target.style.background = "transparent"}>
                        <span>{s.name}</span>
                        <span style={S.sugM}>{s.species} · {s.system}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div style={S.attL}>Tentativa {attempts.length + 1} de {MAX_ATTEMPTS}</div>
              </div>
            )}

            {/* Solved */}
            {solved && (
              <div style={{ ...S.resCard, borderColor: "rgba(34,197,94,0.3)", background: "rgba(34,197,94,0.06)" }}>
                <div style={{ fontSize: 40 }}>🎉</div>
                <h3 style={{ color: "#22c55e", fontSize: 20, margin: "8px 0 4px", fontWeight: 700 }}>Diagnóstico Correto!</h3>
                <p style={{ color: "#9ca3af", fontSize: 14 }}>Acertou na tentativa {attempts.length} de {MAX_ATTEMPTS}</p>
                <p style={{ color: "#22c55e", fontSize: 24, fontWeight: 800, margin: "8px 0 16px" }}>+{Math.max(MAX_ATTEMPTS - attempts.length + 1, 1)} pts</p>
                <button onClick={nextCase} style={S.btnG}>{caseIdx + 1 < cases.length ? "Próximo Caso →" : "Ver Resultado"}</button>
              </div>
            )}

            {/* Failed */}
            {failed && (
              <div style={{ ...S.resCard, borderColor: "rgba(239,68,68,0.25)", background: "rgba(239,68,68,0.05)" }}>
                <div style={{ fontSize: 40 }}>📖</div>
                <h3 style={{ color: "#ef4444", fontSize: 18, margin: "8px 0 4px" }}>Tentativas esgotadas</h3>
                <p style={{ color: "#e8e6e3", fontSize: 15, margin: "8px 0" }}>O diagnóstico era: <strong style={{ color: "#22c55e" }}>{currentCase.answer}</strong></p>
                {answerData && (
                  <div style={S.ansTags}>
                    {CATEGORIES.map((c, i) => <span key={i} style={S.ansTag}>{c.icon} {answerData[c.key]}</span>)}
                  </div>
                )}
                <button onClick={nextCase} style={{ ...S.btnG, background: "rgba(255,255,255,0.08)", boxShadow: "none", marginTop: 16 }}>
                  {caseIdx + 1 < cases.length ? "Próximo Caso →" : "Ver Resultado"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── RESULTS ── */}
        {screen === "results" && (
          <div style={{ textAlign: "center", animation: "fu .5s ease" }}>
            <div style={S.card}>
              <div style={{ fontSize: 56, marginBottom: 8 }}>{pct > 0.6 ? "🏆" : pct > 0.3 ? "🎯" : "📚"}</div>
              <h2 style={S.resT}>Resultado Final</h2>
              <div style={S.resSc}>{score}<span style={S.resMx}> / {cases.length * MAX_ATTEMPTS}</span></div>
              <p style={S.resMsg}>
                {pct > 0.6
                  ? "Raciocínio clínico exemplar. Sua capacidade de diagnóstico diferencial está refinada."
                  : pct > 0.3
                  ? "Bom desempenho. Revisando os sistemas e etiologias, o diferencial fica mais rápido."
                  : "Continue treinando. A prática com casos clínicos é o que consolida o raciocínio semiológico."}
              </p>
              <button onClick={startGame} style={S.btnG}>Jogar Novamente</button>
            </div>
          </div>
        )}

        <footer style={S.foot}>VetDordle — Jogo educativo de diagnóstico veterinário</footer>
      </div>

      <style>{`
        @keyframes fu { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fi { from { opacity:0; transform:rotateX(90deg) scale(.8); } to { opacity:1; transform:rotateX(0) scale(1); } }
        input::placeholder { color:#4b5563; }
        input:focus { border-color:rgba(34,197,94,.4)!important; outline:none; }
        button { transition: transform .15s, box-shadow .2s; }
      `}</style>
    </div>
  );
}

/* ─── STYLES ─── */
const S = {
  root: { minHeight: "100vh", background: "#0a0f1a", fontFamily: "'Segoe UI',system-ui,sans-serif", color: "#e8e6e3", position: "relative", overflow: "hidden" },
  bgDots: { position: "fixed", inset: 0, opacity: .025, zIndex: 0, backgroundImage: "radial-gradient(circle at 1px 1px,#fff 1px,transparent 0)", backgroundSize: "40px 40px" },
  bgGlow: { position: "fixed", top: -200, right: -200, width: 600, height: 600, background: "radial-gradient(circle,rgba(34,197,94,.07) 0%,transparent 70%)", zIndex: 0 },
  container: { position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", padding: "20px 16px" },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 },
  logo: { display: "inline-flex", alignItems: "center", gap: 10, background: "linear-gradient(135deg,rgba(34,197,94,.08),rgba(16,185,129,.04))", border: "1px solid rgba(34,197,94,.15)", borderRadius: 14, padding: "10px 20px" },
  h1: { fontSize: 24, fontWeight: 800, margin: 0, letterSpacing: -.5, background: "linear-gradient(135deg,#22c55e,#10b981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  sub: { margin: 0, fontSize: 9, color: "#6b7280", letterSpacing: 2 },
  pts: { fontSize: 14, fontWeight: 700, color: "#22c55e", background: "rgba(34,197,94,.1)", padding: "6px 16px", borderRadius: 10 },
  card: { background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.05)", borderRadius: 20, padding: "36px 28px", textAlign: "center" },
  desc: { fontSize: 16, lineHeight: 1.7, color: "#9ca3af", marginBottom: 24, textAlign: "left" },
  catRow: { display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 20 },
  catChip: { display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 10, background: "rgba(34,197,94,.06)", border: "1px solid rgba(34,197,94,.1)", color: "#d1d5db", fontSize: 13 },
  legendRow: { display: "flex", gap: 16, justifyContent: "center", marginBottom: 24 },
  legendItem: { display: "flex", alignItems: "center", gap: 8 },
  legendDot: { width: 16, height: 16, borderRadius: 4 },
  numRow: { display: "flex", gap: 12, justifyContent: "center", marginBottom: 28 },
  numBox: { background: "rgba(34,197,94,.05)", borderRadius: 12, padding: "14px 24px", border: "1px solid rgba(34,197,94,.08)" },
  numN: { fontSize: 26, fontWeight: 800, color: "#22c55e" },
  numL: { fontSize: 11, color: "#6b7280", marginTop: 2 },
  btnG: { background: "linear-gradient(135deg,#22c55e,#16a34a)", color: "#fff", border: "none", borderRadius: 14, padding: "14px 44px", fontSize: 17, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 24px rgba(34,197,94,.25)" },
  progRow: { display: "flex", alignItems: "center", gap: 12, marginBottom: 16 },
  progLbl: { fontSize: 13, color: "#6b7280", whiteSpace: "nowrap" },
  progBar: { flex: 1, height: 4, background: "rgba(255,255,255,.05)", borderRadius: 4 },
  progFill: { height: "100%", borderRadius: 4, background: "linear-gradient(90deg,#22c55e,#10b981)", transition: "width .5s" },
  vig: { background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 16, padding: "20px 22px", marginBottom: 20 },
  vigH: { display: "flex", alignItems: "center", gap: 8, marginBottom: 12 },
  vigT: { fontSize: 13, fontWeight: 700, color: "#22c55e", textTransform: "uppercase", letterSpacing: 1 },
  vigP: { fontSize: 15, lineHeight: 1.8, color: "#d1d5db", margin: 0, textAlign: "left" },
  grid: { display: "flex", flexDirection: "column", gap: 6 },
  ghRow: { display: "flex", gap: 6, padding: "0 4px", marginBottom: 4 },
  ghCell: { flex: 1, textAlign: "center", fontSize: 12, color: "#6b7280", padding: "4px 0" },
  gRow: { display: "flex", gap: 6, padding: "8px 4px", borderRadius: 12, alignItems: "center" },
  gDiag: { flex: 2.2, fontSize: 13, padding: "0 4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  gCell: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px 2px", borderRadius: 8, minHeight: 48 },
  inRow: { display: "flex", gap: 8 },
  inp: { width: "100%", padding: "14px 16px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 12, color: "#e8e6e3", fontSize: 15, boxSizing: "border-box" },
  btnS: { padding: "14px 24px", background: "linear-gradient(135deg,#22c55e,#16a34a)", border: "none", borderRadius: 12, color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", boxShadow: "0 2px 12px rgba(34,197,94,.2)", whiteSpace: "nowrap" },
  sugBox: { position: "absolute", top: "100%", left: 0, right: 80, marginTop: 4, zIndex: 10, background: "#1a1f2e", border: "1px solid rgba(255,255,255,.1)", borderRadius: 12, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,.4)" },
  sugI: { padding: "10px 16px", cursor: "pointer", fontSize: 14, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,.03)", transition: "background .15s" },
  sugM: { fontSize: 11, color: "#6b7280" },
  attL: { marginTop: 8, fontSize: 12, color: "#6b7280" },
  resCard: { border: "1px solid", borderRadius: 16, padding: 28, textAlign: "center", marginTop: 16, animation: "fu .5s ease" },
  ansTags: { display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", margin: "12px 0" },
  ansTag: { fontSize: 11, padding: "4px 10px", borderRadius: 8, background: "rgba(255,255,255,.05)", color: "#9ca3af" },
  resT: { fontSize: 26, fontWeight: 800, margin: "0 0 8px", background: "linear-gradient(135deg,#22c55e,#10b981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  resSc: { fontSize: 48, fontWeight: 800, color: "#22c55e", margin: "16px 0" },
  resMx: { fontSize: 20, color: "#6b7280", fontWeight: 400 },
  resMsg: { fontSize: 15, color: "#9ca3af", lineHeight: 1.6, marginBottom: 28 },
  foot: { textAlign: "center", marginTop: 40, padding: 16, borderTop: "1px solid rgba(255,255,255,.03)", fontSize: 11, color: "#4b5563" },
};
