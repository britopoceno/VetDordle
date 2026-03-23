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
  { name: "Hipotireoidismo Canino", species: "canino", system: "endócrino", etiology: "degenerativa", course: "crônico", age: "adulto" },
  { name: "Megaesôfago", species: "canino", system: "gastrointestinal", etiology: "degenerativa", course: "crônico", age: "jovem" },
  { name: "Gastroenterite Hemorrágica", species: "canino", system: "gastrointestinal", etiology: "infecciosa", course: "agudo", age: "adulto" },
  { name: "Traqueobronquite Infecciosa Canina", species: "canino", system: "respiratório", etiology: "infecciosa", course: "agudo", age: "jovem" },
  { name: "Hepatite Infecciosa Canina", species: "canino", system: "hepático", etiology: "infecciosa", course: "agudo", age: "jovem" },
  { name: "Insuficiência Cardíaca Congestiva", species: "canino", system: "cardiovascular", etiology: "degenerativa", course: "crônico", age: "idoso" },
  { name: "Dermatite Atópica Canina", species: "canino", system: "tegumentar", etiology: "imunomediada", course: "crônico", age: "jovem" },
  { name: "Pênfigo Foliáceo", species: "canino", system: "tegumentar", etiology: "imunomediada", course: "crônico", age: "adulto" },
  { name: "Anemia Hemolítica Imunomediada", species: "canino", system: "hematológico", etiology: "imunomediada", course: "agudo", age: "adulto" },
  { name: "Trombocitopenia Imunomediada", species: "canino", system: "hematológico", etiology: "imunomediada", course: "agudo", age: "adulto" },
  { name: "Miastenia Gravis", species: "canino", system: "neurológico", etiology: "imunomediada", course: "crônico", age: "adulto" },
  { name: "Epilepsia Idiopática", species: "canino", system: "neurológico", etiology: "degenerativa", course: "crônico", age: "jovem" },
  { name: "Doença do Disco Intervertebral", species: "canino", system: "neurológico", etiology: "degenerativa", course: "agudo", age: "adulto" },
  { name: "Ruptura de Ligamento Cruzado", species: "canino", system: "locomotor", etiology: "mecânica", course: "agudo", age: "adulto" },
  { name: "Hipocalcemia Puerperal Bovina", species: "bovino", system: "metabólico", etiology: "metabólica", course: "agudo", age: "adulto" },
  { name: "Acidose Ruminal", species: "bovino", system: "gastrointestinal", etiology: "metabólica", course: "agudo", age: "adulto" },
  { name: "Reticulopericardite Traumática", species: "bovino", system: "cardiovascular", etiology: "mecânica", course: "agudo", age: "adulto" },
  { name: "Anaplasmose Bovina", species: "bovino", system: "hematológico", etiology: "infecciosa", course: "agudo", age: "adulto" },
  { name: "Obstrução Esofágica Bovina", species: "bovino", system: "gastrointestinal", etiology: "mecânica", course: "agudo", age: "adulto" },
  { name: "Adenite Equina", species: "equino", system: "respiratório", etiology: "infecciosa", course: "agudo", age: "jovem" },
  { name: "Rabdomiólise de Esforço Equina", species: "equino", system: "locomotor", etiology: "metabólica", course: "agudo", age: "adulto" },
  { name: "Asma Felina", species: "felino", system: "respiratório", etiology: "imunomediada", course: "crônico", age: "adulto" },
  { name: "Pancreatite Felina", species: "felino", system: "gastrointestinal", etiology: "metabólica", course: "agudo", age: "adulto" },
  { name: "Diabetes Mellitus Felina", species: "felino", system: "endócrino", etiology: "metabólica", course: "crônico", age: "idoso" },
  { name: "Linfoma Felino", species: "felino", system: "hematológico", etiology: "neoplásica", course: "crônico", age: "idoso" },
  { name: "Linfoma Canino", species: "canino", system: "hematológico", etiology: "neoplásica", course: "crônico", age: "adulto" },
  { name: "Osteossarcoma Canino", species: "canino", system: "locomotor", etiology: "neoplásica", course: "crônico", age: "adulto" },
  { name: "Mastocitoma Canino", species: "canino", system: "tegumentar", etiology: "neoplásica", course: "crônico", age: "adulto" },
  { name: "Hemangissarcoma Esplênico", species: "canino", system: "hematológico", etiology: "neoplásica", course: "agudo", age: "idoso" },
  { name: "Esporotricose Felina", species: "felino", system: "tegumentar", etiology: "infecciosa", course: "crônico", age: "adulto" },
  { name: "Dermatofitose", species: "felino", system: "tegumentar", etiology: "infecciosa", course: "crônico", age: "jovem" },
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
  {
    answer: "Piometra",
    vignette: "Canino, Golden Retriever, fêmea inteira, 8 anos. Tutor relata apatia, polidipsia e inapetência progressiva há 4 dias. Último cio há aproximadamente 6 semanas. Presença de secreção vulvar purulenta e fétida. Ao exame: temperatura 39,9°C, mucosas hiperêmicas, desidratação 7%, abdômen tenso e doloroso à palpação caudal. Hemograma com leucocitose por neutrofilia com desvio à esquerda (28.000/µL). Ultrassonografia abdominal revela útero marcadamente distendido com conteúdo anecogênico a hipoecogênico."
  },
  {
    answer: "Doença Renal Crônica",
    vignette: "Felino, Siamês, macho castrado, 14 anos. Tutor relata emagrecimento progressivo nos últimos 3 meses, aumento do consumo de água e aumento do volume urinário. Pelagem opaca e apetite seletivo. Ao exame: desidratação 5%, mucosas pálidas, rins de tamanho reduzido e contornos irregulares à palpação. Bioquímica com creatinina 4,8 mg/dL, ureia 120 mg/dL, fósforo 8,2 mg/dL. Urinálise com densidade 1.015, proteinúria. Pressão arterial sistólica 185 mmHg."
  },
  {
    answer: "Diabetes Mellitus Canina",
    vignette: "Canino, Schnauzer Miniatura, fêmea castrada, 9 anos, obesa. Poliúria, polidipsia e polifagia com perda de peso progressiva há 3 semanas. Ao exame: escore corporal 7/9, catarata bilateral incipiente, hepatomegalia discreta. Glicemia de jejum 386 mg/dL. Frutosamina 520 µmol/L (elevada). Urinálise com glicosúria acentuada (4+) e densidade 1.040. Triglicerídeos e colesterol elevados. Sem cetonúria."
  },
  {
    answer: "Hipertireoidismo Felino",
    vignette: "Felino, SRD, macho castrado, 13 anos. Tutor relata apetite voraz com perda de peso paradoxal nos últimos 2 meses, hiperatividade incomum para a idade e episódios de vômito. Ao exame: peso 3,2 kg (era 5 kg há 6 meses), taquicardia (260 bpm), sopro sistólico grau III/VI, nódulo palpável na região cervical ventral à esquerda, pelagem ressecada. Bioquímica com ALT levemente elevada. T4 total 9,8 µg/dL (referência até 4,0)."
  },
  {
    answer: "Leishmaniose Visceral Canina",
    vignette: "Canino, Boxer, macho, 5 anos, região endêmica do semiárido nordestino. Emagrecimento progressivo há 2 meses, lesões cutâneas descamativas e onicogrifose. Ao exame: linfadenomegalia generalizada, esplenomegalia, dermatite furfurácea periocular, úlceras em pavilhão auricular, mucosas hipocoradas. Hemograma com anemia normocítica normocrômica e trombocitopenia. Proteinograma com hiperproteinemia por hiperglobulinemia e relação A/G invertida. Sorologia reagente (ELISA e DPP)."
  },
  {
    answer: "Hiperadrenocorticismo Canino",
    vignette: "Canino, Poodle, fêmea castrada, 10 anos. Tutor relata abdômen pendular progressivo, poliúria, polidipsia e alopecia bilateral simétrica no tronco há meses. Ao exame: pele fina e hipotônica, comedões abdominais, abdômen distendido e pendular, hepatomegalia. Hemograma com leucograma de estresse (linfopenia, eosinopenia). Bioquímica com FA 1.280 U/L, colesterol elevado, glicemia 145 mg/dL. Relação cortisol/creatinina urinária elevada. Teste de supressão com dexametasona em dose baixa sem supressão adequada do cortisol."
  },
  {
    answer: "Complexo Respiratório Felino",
    vignette: "Felino, SRD, fêmea, 4 meses, resgatada de colônia de gatos há 10 dias, sem vacinação. Espirros frequentes, secreção nasal serosa evoluindo para mucopurulenta, conjuntivite bilateral com quemose e úlcera corneana no olho esquerdo. Ao exame: temperatura 39,7°C, desidratação leve, estertores nasais, sialorreia. Presença de úlceras em ponta de língua e palato duro. Redução do apetite por provável anosmia."
  },
  {
    answer: "Cólica Equina",
    vignette: "Equino, Mangalarga, fêmea, 8 anos. Apresentação aguda de dor abdominal há 4 horas com cavação, olhar para o flanco, rolamento no solo e sudorese profusa. Mudança recente de feno. Ao exame: FC 64 bpm, mucosas congestas, TPC 3s, borborigmos intestinais reduzidos no quadrante ventral direito. Sondagem nasogástrica com refluxo de 6 litros de líquido esverdeado. Palpação retal com distensão de intestino delgado. Lactato 4,5 mmol/L. Paracentese com líquido peritoneal serossanguinolento."
  },
  {
    answer: "Mastite Bovina",
    vignette: "Bovino, Girolando, fêmea, 5 anos, em lactação (DEL 45). Produtor relata queda abrupta na produção leiteira e que o quarto mamário posterior esquerdo está inchado e quente desde ontem. Ao exame: temperatura 40,1°C, quarto afetado com edema, hiperemia, dor à palpação e endurecimento. Secreção com grumos e coloração amarelada. Teste da caneca de fundo preto com grumos visíveis. CMT fortemente positivo (3+) no quarto afetado. Leite enviado para cultura com isolamento de Staphylococcus aureus."
  },
  {
    answer: "Sarna Demodécica",
    vignette: "Canino, Bulldog Inglês, macho, 7 meses. Áreas de alopecia multifocal em face, membros e tronco com progressão nos últimos 30 dias. Sem prurido intenso inicialmente, mas com piodermite secundária em algumas lesões. Ao exame: alopecia periocular bilateral, comedões, cilindros foliculares, eritema e pápulas. Múltiplas áreas de hiperpigmentação. Raspado cutâneo profundo com presença abundante de ácaros fusiformes em todas as fases de desenvolvimento (ovos, larvas, ninfas e adultos)."
  },
  {
    answer: "Cardiomiopatia Dilatada",
    vignette: "Canino, Dobermann, macho, 6 anos. Tutor relata intolerância ao exercício progressiva, tosse noturna e dois episódios de síncope nas últimas semanas. Ao exame: mucosas pálidas, FC 180 bpm irregular, déficit de pulso, sopro sistólico apical esquerdo grau IV/VI, crepitação pulmonar bilateral. Ascite discreta. ECG com fibrilação atrial e complexos ventriculares prematuros. Radiografia torácica com cardiomegalia generalizada e edema pulmonar perihilar. Ecocardiograma com fração de encurtamento 12% e câmaras dilatadas."
  },
  {
    answer: "Cardiomiopatia Hipertrófica Felina",
    vignette: "Felino, Maine Coon, macho, 4 anos. Apresentação aguda de dispneia e vocalização intensa. Tutor nega histórico prévio de doença. Ao exame: taquipneia (60 mpm), padrão respiratório restritivo, mucosas cianóticas, temperatura 36,5°C, membro pélvico esquerdo com ausência de pulso femoral, coxins plantares pálidos e frios, dor intensa à palpação do membro. Auscultação com ritmo de galope (S3). Radiografia torácica com edema pulmonar. Ecocardiograma com espessamento de septo interventricular (8 mm) e SAM."
  },
  {
    answer: "Displasia Coxofemoral",
    vignette: "Canino, Pastor Alemão, macho, 10 meses. Tutor relata dificuldade progressiva para levantar, relutância em subir escadas e marcha bamboleante há 2 meses. Ao exame: atrofia muscular em membros pélvicos, dor à extensão e abdução bilateral dos quadris, teste de Ortolani positivo bilateralmente, sinal de Barlow presente. Sem crepitação articular. Radiografia ventrodorsal com subluxação bilateral das cabeças femorais, índice de Norberg 85° e remodelamento acetabular incipiente."
  },
  {
    answer: "Cetose Bovina",
    vignette: "Bovino, Holandês, fêmea, 4 anos, alta produção leiteira (42 L/dia), DEL 18. Queda progressiva na produção, inapetência seletiva com recusa de concentrado e preferência por volumoso. Ao exame: leve desidratação, rúmen hipomotílico (1 contração/2 minutos), fezes ressecadas e escuras. Hálito com odor adocicado de cetona. Teste de Rothera positivo no leite e na urina. Beta-hidroxibutirato sérico 2,8 mmol/L. Glicemia 38 mg/dL. Condição corporal caiu de 3,5 para 2,5 em duas semanas."
  },
  {
    answer: "Corpo Estranho Gastrointestinal",
    vignette: "Canino, SRD, macho, 6 meses, histórico de roer brinquedos e objetos domésticos. Vômitos agudos intermitentes há 48 horas, inicialmente alimentares e depois biliosos. Tentativa de alimentação resulta em vômito projetado minutos depois. Ao exame: desidratação 6%, dor à palpação abdominal cranial, presença de estrutura firme e tubular palpável em região mesogástrica. Radiografia abdominal com dilatação gástrica e de alças de intestino delgado proximais, com padrão de empilhamento sugestivo de obstrução mecânica."
  },
  {
    answer: "Pancreatite Canina",
    vignette: "Canino, Yorkshire, fêmea castrada, 8 anos, obesa. Vômitos incoercíveis e prostração súbita há 24 horas, após ingestão de restos de churrasco. Posição de prece (membros torácicos estendidos, tronco baixo). Ao exame: temperatura 39,6°C, dor intensa à palpação epigástrica, abdômen tenso. Hemograma com leucocitose e desvio à esquerda. Bioquímica com lipase pancreática específica canina (cPLI) marcadamente elevada, ALT 210 U/L, hipertrigliceridemia. Ultrassonografia com pâncreas hipoecogênico, aumentado de volume e mesentério peripancreático hiperecogênico."
  },
  {
    answer: "PIF",
    vignette: "Felino, Abissínio, macho, 10 meses, proveniente de gatil com múltiplos gatos. Febre flutuante e não responsiva a antibióticos há 15 dias, perda de peso e apatia progressiva. Ao exame: temperatura 40,0°C, abdômen distendido com onda líquida positiva, mucosas ictéricas, linfadenomegalia mesentérica. Efusão abdominal viscosa, amarelada, com alta proteína (5,8 g/dL) e relação A/G < 0,4. Teste de Rivalta positivo. Hiperglobulinemia sérica. PCR positivo para coronavírus felino com alta carga viral na efusão."
  },
  {
    answer: "Raiva",
    vignette: "Canino, SRD, macho, 3 anos, sem vacinação antirrábica, zona rural. Mudança comportamental abrupta há 3 dias: inicialmente se escondendo e recusando alimento, depois evoluiu com agressividade imotivada, tentativas de mordida e salivação abundante. Ao exame: sialorreia intensa, mandíbula caída (paralisia de masseteres), disfagia, olhar fixo, midríase bilateral. Evolui com paresia de membros pélvicos progressiva e incoordenação. Tutor relata contato com morcego hematófago na propriedade há 30 dias."
  },
  {
    answer: "Tétano Equino",
    vignette: "Equino, SRD, macho, 5 anos, sem vacinação antitetânica. Ferimento perfurante em casco do membro pélvico direito há 8 dias, tratado apenas com limpeza local. Há 2 dias com rigidez progressiva e dificuldade para se alimentar. Ao exame: cauda em bandeira, orelhas eretas, prolapso de terceira pálpebra bilateral, trismo mandibular, rigidez muscular generalizada com postura de cavalete. Hiperestesia ao toque e ao som. Sudorese profusa. Espasmos musculares intermitentes com estímulos mínimos."
  },
  {
    answer: "Leptospirose Canina",
    vignette: "Canino, Beagle, macho, 3 anos, acesso a quintal com presença de roedores, vacinação polivalente atrasada. Anorexia, vômitos e prostração há 3 dias. Tutor relata urina escurecida. Ao exame: temperatura 39,8°C, mucosas ictéricas, dor lombar e renal à palpação, desidratação 7%. Hemograma com leucocitose e trombocitopenia. Bioquímica com ureia 280 mg/dL, creatinina 8,5 mg/dL, bilirrubina total 6,2 mg/dL, ALT 340 U/L, FA 290 U/L. Urinálise com bilirrubinúria, cilindrúria e isostenúria."
  },
  {
    answer: "Otite Externa",
    vignette: "Canino, Cocker Spaniel, fêmea castrada, 5 anos, histórico de otites recorrentes. Tutor relata que o animal sacode a cabeça, coça as orelhas e apresenta odor fétido auricular há 2 semanas. Ao exame: pavilhões auriculares eritematosos e edemaciados, secreção ceruminosa escura e abundante bilateral, dor à palpação da base auricular. Canal auricular estenosado por hiperplasia. Citologia do cerúmen com presença abundante de leveduras (Malassezia pachydermatis) e cocos."
  },
  {
    answer: "Intussuscepção",
    vignette: "Canino, SRD, fêmea, 4 meses, desverminada há 3 dias. Vômitos e diarreia sanguinolenta (tipo geleia de framboesa) com início abrupto há 12 horas. Tenesmo intenso. Ao exame: desidratação 8%, dor abdominal à palpação com estrutura cilíndrica firme palpável em região mesogástrica direita. Mucosas hipocoradas. Ultrassonografia abdominal com imagem em alvo (target sign) em corte transversal de alça intestinal, com camadas concêntricas alternando ecogenicidade, compatível com invaginação intestinal."
  },
  {
    answer: "Anemia Hemolítica Imunomediada",
    vignette: "Canino, Cocker Spaniel, fêmea, 6 anos. Prostração súbita, mucosas pálidas e ictéricas, urina escurecida desde ontem. Sem histórico de trauma ou ingestão de tóxicos. Ao exame: taquicardia (160 bpm), taquipneia, sopro sistólico funcional, esplenomegalia. Hemograma com anemia severa regenerativa (Ht 12%), esferócitos e autoaglutinação persistente em salina. Reticulocitose marcada. Bilirrubina indireta elevada. Teste de Coombs direto positivo. Plaquetas normais."
  },
  {
    answer: "Doença do Disco Intervertebral",
    vignette: "Canino, Dachshund, macho, 5 anos. Início agudo de dor cervicotorácica e relutância ao movimento há 24 horas, evoluindo para paraparesia dos membros pélvicos. Tutor relata episódio após pular do sofá. Ao exame: dor à palpação da coluna toracolombar (T12-L2), propriocepção ausente em membros pélvicos, reflexo patelar exacerbado bilateralmente, reflexo do panículo ausente caudalmente a T13, sensibilidade dolorosa profunda preservada. Radiografia com redução do espaço intervertebral T12-T13 e opacificação do forame."
  },
  {
    answer: "Hipocalcemia Puerperal Bovina",
    vignette: "Bovino, Jersey, fêmea, 7 anos, multípara (5ª lactação), alto potencial produtivo. Parto há 18 horas. Encontrada em decúbito esternal com cabeça voltada para o flanco. Ao exame: temperatura 37,2°C (hipotermia), extremidades frias, focinho seco, atonia ruminal, reflexo anal diminuído, pupilas dilatadas. Incapaz de se levantar mesmo com estímulo. FC 80 bpm com bulhas abafadas. Cálcio sérico total 4,2 mg/dL (referência 8,5-10,5). Fósforo sérico reduzido."
  },
  {
    answer: "Acidose Ruminal",
    vignette: "Bovino, Nelore, macho, 2 anos, confinamento, dieta com 85% de concentrado. Encontrado prostrado, anorético e com diarreia aquosa e fétida há 12 horas. Houve erro na formulação da ração com excesso de grãos de milho no dia anterior. Ao exame: temperatura 36,8°C, desidratação 8%, rúmen distendido e atônico, líquido ruminal obtido por sondagem com pH 4,5, coloração leitosa e odor ácido. FC 100 bpm. Hemograma com hemoconcentração. Gasometria com acidose metabólica (pH sanguíneo 7,18, bicarbonato 12 mEq/L)."
  },
  {
    answer: "Adenite Equina",
    vignette: "Equino, SRD, fêmea, 2 anos, recém-introduzida em haras há 10 dias. Febre (39,8°C), secreção nasal mucopurulenta bilateral e tosse há 4 dias. Aumento de volume submandibular bilateral, firme e doloroso à palpação. Ao exame: linfonodos submandibulares e retrofaríngeos marcadamente aumentados, disfagia, extensão de cabeça e pescoço, dispneia inspiratória leve por compressão de vias aéreas superiores. Endoscopia com hiperemia e edema de faringe. Aspirado do linfonodo com material purulento espesso. Cultura com isolamento de Streptococcus equi subsp. equi."
  },
  {
    answer: "Asma Felina",
    vignette: "Felino, Siamês, fêmea castrada, 6 anos, indoor. Episódios recorrentes de tosse seca paroxística e dispneia expiratória há 3 meses, com piora ao contato com produtos de limpeza e areia sanitária perfumada. Ao exame: sibilos expiratórios bilaterais à auscultação, postura ortopneica durante crise, leve esforço abdominal expiratório. Radiografia torácica com padrão bronquial difuso e hiperinsuflação pulmonar com achatamento diafragmático. Hemograma com eosinofilia periférica (1.800/µL). Citologia de lavado broncoalveolar com eosinófilos acima de 20%."
  },
  {
    answer: "Linfoma Canino",
    vignette: "Canino, Rottweiler, macho castrado, 7 anos. Tutor relata aumento de volume em pescoço e axilas percebido há 2 semanas, com perda de apetite recente. Ao exame: linfadenomegalia generalizada (submandibulares, pré-escapulares, axilares, inguinais e poplíteos), consistência firme e indolor, de 3 a 5 vezes o tamanho normal. Fígado e baço palpáveis. Hemograma sem alterações significativas. Citologia aspirativa de linfonodo com população monomórfica de linfoblastos de grande diâmetro, nucléolos proeminentes e alta relação núcleo-citoplasma. Imunofenotipagem: células B."
  },
  {
    answer: "Osteossarcoma Canino",
    vignette: "Canino, Rottweiler, macho, 8 anos, porte grande (45 kg). Claudicação progressiva do membro torácico esquerdo há 6 semanas, sem resposta a anti-inflamatórios. Tutor nota aumento de volume na região distal do rádio. Ao exame: tumefação firme, quente e dolorosa na região metafisária distal do rádio esquerdo. Atrofia muscular do membro. Radiografia com lise óssea agressiva, levantamento periosteal (triângulo de Codman) e reação tipo raios de sol na metáfise distal do rádio. Radiografia torácica sem evidência de metástases visíveis. FA sérica elevada."
  },
  {
    answer: "Esporotricose Felina",
    vignette: "Felino, SRD, macho inteiro, 4 anos, semi-domiciliado com acesso à rua e histórico de brigas frequentes. Lesões cutâneas ulceradas e crostosas em face (plano nasal e pavilhões auriculares) e membros torácicos há 40 dias, sem resposta a antibioticoterapia empírica. Ao exame: úlceras com bordas elevadas, drenagem de exsudato purulento, linfadenomegalia regional. Lesões em distribuição linfocutânea ascendente no membro. Citologia de imprint corada com Wright revelou presença abundante de estruturas leveduriformes ovaladas intracelulares em macrófagos."
  },
  {
    answer: "Reticulopericardite Traumática",
    vignette: "Bovino, mestiço, fêmea, 6 anos, sistema extensivo com acesso a área de descarte de materiais. Anorexia progressiva há 5 dias, queda na produção leiteira, gemidos expiratórios e relutância ao movimento. Ao exame: temperatura 39,5°C, taquicardia (90 bpm) com bulhas abafadas, distensão de jugulares bilateralmente, edema submandibular e de barbela. Dor ao pinçamento de cernelha (prova do bastão positiva). Rúmen hipomotílico. Ultrassonografia torácica com efusão pericárdica e depósitos de fibrina. Hemograma com leucocitose por neutrofilia."
  },
  {
    answer: "Hemangissarcoma Esplênico",
    vignette: "Canino, Pastor Alemão, fêmea castrada, 11 anos. Colapso agudo durante passeio, com mucosas pálidas e abdômen distendido de início súbito. Tutor relata episódios intermitentes de fraqueza e apatia nos últimos dias que resolviam espontaneamente. Ao exame: FC 160 bpm, pulso fraco, TPC > 3s, mucosas pálidas, abdominocentese com líquido sanguinolento que não coagula. Ht 18%. Ultrassonografia com massa esplênica heterogênea de 8 cm e efusão abdominal ecogênica. Ecocardiograma sem massas em átrio direito neste momento."
  },
  {
    answer: "Dermatofitose",
    vignette: "Felino, Persa, fêmea, 5 meses, adquirida em pet shop há 3 semanas. Áreas circulares de alopecia em face, pavilhões auriculares e membros anteriores, com margens eritematosas e descamação central. Prurido leve. Outro gato do domicílio começou a apresentar lesões semelhantes, e a tutora relata lesões pruriginosas em seu próprio antebraço. Ao exame: lâmpada de Wood com fluorescência verde-maçã em algumas lesões. Tricograma com esporos artroconídios ao redor dos pelos (padrão ectothrix). Cultura fúngica em DTM positiva com identificação de Microsporum canis."
  },
  {
    answer: "Rabdomiólise de Esforço Equina",
    vignette: "Equino, Puro-Sangue Inglês, fêmea, 4 anos, treinamento intensivo. Após exercício vigoroso, apresentou rigidez e dor muscular intensa em região lombar e glúteos, relutância extrema ao movimento e sudorese profusa. Ao exame: musculatura lombar e glútea firme e dolorosa à palpação, taquicardia (60 bpm), taquipneia, mioglobinúria (urina escura marrom-avermelhada). CK sérica 85.000 UI/L (referência até 400). AST 3.200 UI/L. Creatinina discretamente elevada. Histórico de episódio semelhante mais leve há 2 meses."
  },
  {
    answer: "Ruptura de Ligamento Cruzado",
    vignette: "Canino, Labrador, fêmea castrada, 6 anos, 35 kg, sobrepeso. Claudicação aguda do membro pélvico direito após corrida no parque, com apoio em pinça e relutância à extensão completa. Ao exame: efusão articular do joelho direito, gaveta cranial positiva, teste de compressão tibial (thrust tibial) positivo, dor à hiperextensão. Espessamento periarticular medial palpável (buttress sign). Radiografia com efusão articular, deslocamento caudal do coxim gorduroso infrapatelar e osteofitose incipiente em polo patelar."
  },
  {
    answer: "Epilepsia Idiopática",
    vignette: "Canino, Border Collie, macho, 2 anos. Tutor relata três episódios de convulsões tônico-clônicas generalizadas no último mês, cada um durando cerca de 2 minutos, com fase pós-ictal de desorientação, salivação e cegueira transitória por até 30 minutos. Entre os episódios, animal completamente normal. Ao exame: exame neurológico interictal normal, reflexos preservados, propriocepção sem alterações. Hemograma e bioquímica sérica completa (hepática, renal, glicemia, eletrólitos) sem alterações. Ressonância magnética de crânio sem lesões estruturais."
  },
  {
    answer: "Mastocitoma Canino",
    vignette: "Canino, Boxer, macho, 7 anos. Tutor relata nódulo cutâneo em região inguinal notado há 1 mês, com flutuações de tamanho. Ao exame: massa cutânea de 4 cm, firme, parcialmente alopécica, com eritema perilesional. Edema e eritema periférico (sinal de Darier positivo à manipulação). Linfonodo inguinal ipsilateral aumentado. Citologia aspirativa com células redondas contendo grânulos metacromáticos abundantes corados com Giemsa. Estadiamento com ultrassonografia abdominal e radiografia torácica sem evidências de metástases."
  },
  {
    answer: "Obstrução Esofágica Bovina",
    vignette: "Bovino, Nelore, fêmea, 3 anos, sistema semi-intensivo com acesso a pomar de manga. Timpanismo agudo e sialorreia intensa de início súbito há 2 horas. Animal inquieto, com extensão de pescoço e tentativas de eructação sem sucesso. Ao exame: distensão severa da fossa paralombar esquerda (timpanismo gasoso), sialorreia abundante, impossibilidade de passagem de sonda esofágica que encontra resistência firme na região cervical do esôfago. Palpação cervical com estrutura firme arredondada palpável no trajeto esofágico à esquerda."
  },
  {
    answer: "Dermatite Atópica Canina",
    vignette: "Canino, Bulldog Francês, fêmea castrada, 3 anos. Prurido intenso sazonal (piora no verão) em face, axilas, virilhas e espaços interdigitais há 2 anos, com resposta parcial a corticoides. Ao exame: eritema em face ventral, axilas e virilha, hiperpigmentação e liquenificação interdigital, otite eritematosa bilateral. Sem lesões em dorso. Raspado cutâneo negativo para ácaros. Citologia auricular com Malassezia secundária. Dieta de eliminação sem melhora. Histórico familiar com pai atópico. IgE alérgeno-específica elevada para ácaros de poeira domiciliar."
  },
  {
    answer: "Linfoma Felino",
    vignette: "Felino, SRD, macho castrado, 12 anos. Vômitos crônicos intermitentes há 2 meses com perda de peso progressiva (de 5,5 para 3,8 kg). Apetite reduzido e episódios alternados de diarreia e constipação. Ao exame: alças intestinais espessadas à palpação, massa mesentérica palpável em região mesogástrica. Ultrassonografia com espessamento difuso de parede intestinal (perda da estratificação em camadas) e linfadenomegalia mesentérica. Biópsia intestinal endoscópica com infiltrado difuso de linfócitos monoclonais em lâmina própria. Imunohistoquímica compatível com linfoma alimentar de células T de baixo grau."
  },
  {
    answer: "Anaplasmose Bovina",
    vignette: "Bovino, Holandês, fêmea, 4 anos, região com histórico de carrapatos. Anorexia, queda na produção leiteira e icterícia progressiva há 4 dias. Ao exame: temperatura 40,8°C, mucosas marcadamente ictéricas e pálidas, taquicardia (96 bpm), taquipneia, desidratação moderada. Fezes normais, sem hemoglobinúria (urina amarelo-escura, não avermelhada). Hemograma com anemia severa (Ht 16%) sem reticulocitose adequada. Esfregaço sanguíneo com corpúsculos basofílicos marginais intra-eritrocitários. Bilirrubina indireta elevada."
  },
  {
    answer: "Diabetes Mellitus Felina",
    vignette: "Felino, Persa, macho castrado, 11 anos, obeso (8,2 kg). Poliúria, polidipsia e perda de peso progressiva há 4 semanas. Tutor relata que a caixa de areia precisa ser trocada com muito mais frequência. Ao exame: desidratação leve, plantigradismo bilateral (apoio sobre os jarretes), hepatomegalia. Glicemia 420 mg/dL. Frutosamina 600 µmol/L. Urinálise com glicosúria (4+) e cetonúria leve (+). Triglicerídeos 380 mg/dL. Sem acidose metabólica na gasometria."
  },
  {
    answer: "Miastenia Gravis",
    vignette: "Canino, Golden Retriever, fêmea, 4 anos. Fraqueza muscular progressiva que piora com o exercício e melhora com o repouso. Regurgitação pós-prandial frequente. Ao exame: fraqueza dos membros que se acentua após caminhada curta, ventroflexão cervical intermitente, reflexo palpebral fatigável (fechamento incompleto após estímulos repetidos). Radiografia torácica com megaesôfago e massa mediastínica cranial sugestiva de timoma. Teste com edrofônio (Tensilon) com melhora dramática e transitória da força muscular. Anticorpos anti-receptor de acetilcolina positivos."
  },
  {
    answer: "Pênfigo Foliáceo",
    vignette: "Canino, Akita, macho, 5 anos. Lesões cutâneas pustulares e crostosas iniciadas em plano nasal e pavilhões auriculares há 6 semanas, com progressão para coxins plantares e região periocular. Sem resposta a antibioticoterapia. Ao exame: crostas espessas e aderentes em plano nasal, bordas auriculares e coxins (hiperqueratose e fissuras), pústulas flácidas coalescentes em abdômen ventral. Prurido leve. Citologia de pústula intacta com acantócitos (queratinócitos arredondados livres) e neutrófilos. Histopatologia com clivagem subcorneal e acantólise. Sem bactérias na cultura."
  },
  {
    answer: "Traqueobronquite Infecciosa Canina",
    vignette: "Canino, SRD, macho, 5 meses, retornado de hospedagem há 5 dias. Tosse seca, alta e paroxística tipo \"grasno de ganso\", provocada por palpação traqueal e excitação. Animal alerta e com apetite preservado. Ao exame: temperatura 38,7°C, reflexo de tosse positivo à palpação traqueal, auscultação pulmonar limpa sem crepitação. Sem secreção nasal. Mucosas normocoradas. Demais parâmetros normais. Hemograma sem alterações significativas. Outros cães da hospedagem apresentam sinais semelhantes."
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
const CASES_PER_GAME = 10;

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
    setCases(shuffleArray(CASES).slice(0, CASES_PER_GAME));
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
                São {CASES.length} casos no banco, com 10 sorteados a cada rodada.
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
                {[{ n: "6", l: "tentativas" }, { n: "5", l: "categorias" }, { n: "10", l: "casos/rodada" }].map((s, i) => (
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
