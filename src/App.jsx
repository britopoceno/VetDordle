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
    presentation: "Canino, SRD, macho, 3 meses, sem vacinação. Tutor relata que o animal parou de comer há 2 dias, está muito prostrado e apresenta vômitos frequentes.",
    history: "Animal adquirido em feira de adoção há 15 dias. Convive com outros cães no domicílio. Não recebeu nenhuma dose de vacina polivalente. Alimentação com ração seca para filhotes.",
    physicalExam: "Temperatura 40,2°C, mucosas hipocoradas e secas, TPC > 3s, desidratação 8%, dor abdominal, diarreia sanguinolenta fétida.",
    complementaryExams: "Hemograma com leucopenia acentuada (1.800/µL), linfopenia absoluta e trombocitopenia leve. Snap test fecal positivo."
  },
  {
    answer: "Cinomose",
    presentation: "Canino, Poodle, fêmea, 8 meses, protocolo vacinal incompleto (apenas uma dose de V8). Tutor relata secreção nasal e ocular há 5 dias, tosse e apatia progressiva.",
    history: "Contato com cães de rua durante passeio sem supervisão há duas semanas. Secreção inicialmente serosa evoluiu para mucopurulenta. Apetite reduzido nos últimos 3 dias.",
    physicalExam: "Hiperqueratose de coxins plantares, crepitação pulmonar cranioventral, pústulas abdominais.",
    complementaryExams: "Linfopenia (900/µL), corpúsculos de inclusão de Lentz em linfócitos. Mioclonias em membros pélvicos e convulsões focais em evolução."
  },
  {
    answer: "Torção Gástrica",
    presentation: "Canino, Pastor Alemão, macho castrado, 7 anos, 38 kg. Tutor relata distensão abdominal súbita após a refeição, com tentativas improdutivas de vômito e inquietação extrema há 2 horas.",
    history: "Animal recebe uma única refeição volumosa ao dia e tem o hábito de se exercitar logo após comer. Episódio nunca havia ocorrido antes. Sialorreia intensa.",
    physicalExam: "Abdômen cranial timpânico, FC 160 bpm, pulso filiforme, TPC > 4s, mucosas acinzentadas. Sonda orogástrica com resistência.",
    complementaryExams: "Lactato 7,2 mmol/L. Radiografia com double bubble sign e deslocamento pilórico dorsocranial."
  },
  {
    answer: "Erliquiose Canina",
    presentation: "Canino, Labrador, macho, 4 anos, acesso a área rural. Tutor relata apatia progressiva há 10 dias, perda de apetite e sangramento nasal espontâneo.",
    history: "Histórico de infestação recorrente por carrapatos, último ectoparasiticida há 3 meses. Petéquias na região abdominal notadas há 3 dias. Sem trauma recente.",
    physicalExam: "Temperatura 40,5°C, petéquias em mucosa oral, esplenomegalia, linfadenomegalia generalizada, carrapatos em região auricular.",
    complementaryExams: "Pancitopenia (Ht 22%, leucócitos 3.200/µL, plaquetas 18.000/µL), mórulas em monócitos. Snap 4DX positivo para Ehrlichia canis."
  },
  {
    answer: "Lipidose Hepática Felina",
    presentation: "Felino, SRD, fêmea castrada, 9 anos, obesa (escore 9/9). Tutor relata que a gata parou de comer há 5 dias, está vomitando e ficou com a pele e os olhos amarelados.",
    history: "Introdução de novo gato no domicílio há 3 semanas. Desde então a paciente se esconde com frequência e demonstra estresse. Redução gradual do apetite até anorexia completa.",
    physicalExam: "Icterícia marcante, desidratação 6%, hepatomegalia com bordas arredondadas, ventroflexão cervical.",
    complementaryExams: "ALT 380 U/L, FA 520 U/L, bilirrubina total 8,4 mg/dL, hipocalemia (2,9 mEq/L). Citologia hepática com hepatócitos vacuolizados por acúmulo lipídico difuso."
  },
  {
    answer: "Laminite Equina",
    presentation: "Equino, Crioulo, macho castrado, 12 anos. Proprietário relata que o animal está relutante em se movimentar e adota postura anormal com membros torácicos projetados para frente.",
    history: "Acesso acidental ao depósito de ração há 48 horas, consumindo grande quantidade de concentrado à base de milho. Redução do apetite e relutância crescente ao movimento desde então.",
    physicalExam: "Pulso digital aumentado bilateralmente nos torácicos, sensibilidade intensa à pinça de casco na pinça, claudicação Obel III.",
    complementaryExams: "Glicemia 142 mg/dL, insulina elevada. Radiografia com rotação distal de P3 e aumento da distância parede dorsal-P3."
  },
  {
    answer: "Obstrução Uretral Felina",
    presentation: "Felino, Persa, macho castrado, 5 anos, indoor. Tutor relata que o gato está entrando e saindo da caixa de areia repetidamente, vocalizando, e não produziu urina há 18 horas.",
    history: "Alimentação exclusiva com ração seca, baixa ingestão hídrica. Episódio semelhante autolimitante há 6 meses. Hematúria e lambedura perineal excessiva nos últimos 2 dias. Reforma recente no domicílio.",
    physicalExam: "Bexiga firme, distendida e dolorosa do tamanho de uma laranja. Material cristaloide na extremidade peniana. Bradicardia (100 bpm), hipotermia (36,8°C).",
    complementaryExams: "Ureia 320 mg/dL, creatinina 14,2 mg/dL, hipercalemia 8,9 mEq/L. ECG com ondas T apiculadas."
  },
  {
    answer: "Babesiose Bovina",
    presentation: "Bovino, Holandês, fêmea, 3 anos, em lactação. Produtor relata que a vaca parou de comer, apresentou queda abrupta na produção leiteira e está com urina escurecida.",
    history: "Recém-introduzida na propriedade há 20 dias, procedente de região com controle rigoroso de ectoparasitas. Infestação massiva por carrapatos após chegada. Nenhum protocolo de premunição realizado.",
    physicalExam: "Temperatura 41,3°C, mucosas ictéricas e hipocoradas, taquicardia, hemoglobinúria (urina cor de coca-cola).",
    complementaryExams: "Ht 14%, reticulocitose, bilirrubina indireta elevada. Esfregaço com inclusões piriformes pareadas intra-eritrocitárias compatíveis com Babesia bovis."
  },
  {
    answer: "Piometra",
    presentation: "Canino, Golden Retriever, fêmea inteira, 8 anos. Tutor relata apatia, aumento da sede e inapetência progressiva há 4 dias, com secreção vulvar purulenta.",
    history: "Último cio há aproximadamente 6 semanas. Nunca foi castrada, sem gestações prévias. Secreção vulvar com odor fétido percebida há 2 dias.",
    physicalExam: "Temperatura 39,9°C, mucosas hiperêmicas, desidratação 7%, abdômen tenso e doloroso caudalmente.",
    complementaryExams: "Leucocitose por neutrofilia com desvio à esquerda (28.000/µL). Ultrassonografia com útero marcadamente distendido com conteúdo anecogênico a hipoecogênico."
  },
  {
    answer: "Doença Renal Crônica",
    presentation: "Felino, Siamês, macho castrado, 14 anos. Tutor relata emagrecimento progressivo nos últimos 3 meses, aumento do consumo de água e do volume urinário.",
    history: "Pelagem opaca e apetite seletivo há semanas. Sem histórico de doença prévia diagnosticada. Alimentação com ração seca sem controle de fósforo.",
    physicalExam: "Desidratação 5%, mucosas pálidas, rins reduzidos e irregulares à palpação.",
    complementaryExams: "Creatinina 4,8 mg/dL, ureia 120 mg/dL, fósforo 8,2 mg/dL. Urinálise com densidade 1.015 e proteinúria. Pressão arterial sistólica 185 mmHg."
  },
  {
    answer: "Diabetes Mellitus Canina",
    presentation: "Canino, Schnauzer Miniatura, fêmea castrada, 9 anos, obesa. Tutor relata que o animal urina muito, bebe muita água e come bastante, mas está emagrecendo.",
    history: "Poliúria, polidipsia e polifagia com perda de peso há 3 semanas. Tutor nota opacidade nos olhos recentemente.",
    physicalExam: "Escore corporal 7/9, catarata bilateral incipiente, hepatomegalia discreta.",
    complementaryExams: "Glicemia de jejum 386 mg/dL. Frutosamina 520 µmol/L. Urinálise com glicosúria (4+), densidade 1.040. Triglicerídeos e colesterol elevados. Sem cetonúria."
  },
  {
    answer: "Hipertireoidismo Felino",
    presentation: "Felino, SRD, macho castrado, 13 anos. Tutor relata apetite voraz com perda de peso paradoxal nos últimos 2 meses e hiperatividade incomum para a idade.",
    history: "Vômitos esporádicos. Tutor nota agitação e vocalização noturna. Peso caiu de 5 kg para 3,2 kg em 6 meses.",
    physicalExam: "Taquicardia (260 bpm), sopro sistólico III/VI, nódulo palpável cervical ventral esquerdo, pelagem ressecada.",
    complementaryExams: "ALT levemente elevada. T4 total 9,8 µg/dL (referência até 4,0). Ecocardiograma com hipertrofia ventricular esquerda concêntrica leve."
  },
  {
    answer: "Leishmaniose Visceral Canina",
    presentation: "Canino, Boxer, macho, 5 anos, região endêmica do semiárido. Tutor relata emagrecimento progressivo há 2 meses, lesões na pele e unhas grandes demais.",
    history: "Lesões cutâneas descamativas e onicogrifose percebidas gradualmente. Vive em área com presença de flebotomíneos. Sem coleira repelente ou vacinação específica.",
    physicalExam: "Linfadenomegalia generalizada, esplenomegalia, dermatite furfurácea periocular, úlceras auriculares, mucosas hipocoradas.",
    complementaryExams: "Anemia e trombocitopenia. Hiperglobulinemia com relação A/G invertida. Sorologia reagente (ELISA e DPP)."
  },
  {
    answer: "Hiperadrenocorticismo Canino",
    presentation: "Canino, Poodle, fêmea castrada, 10 anos. Tutor relata barriga grande, bebe e urina muito e está perdendo pelo no tronco há meses.",
    history: "Abdômen pendular progressivo, alopecia bilateral simétrica no tronco, pele cada vez mais fina. Sem prurido.",
    physicalExam: "Pele fina e hipotônica, comedões abdominais, hepatomegalia.",
    complementaryExams: "Leucograma de estresse. FA 1.280 U/L, colesterol elevado, glicemia 145 mg/dL. Relação cortisol/creatinina urinária elevada. Supressão com dexametasona sem supressão adequada."
  },
  {
    answer: "Complexo Respiratório Felino",
    presentation: "Felino, SRD, fêmea, 4 meses, resgatada de colônia, sem vacinação. Espirros frequentes, secreção nasal e olhos lacrimejando há dias.",
    history: "Resgatada há 10 dias de colônia com muitos gatos. Secreção nasal evoluiu de serosa para mucopurulenta. Apetite reduzido.",
    physicalExam: "Temperatura 39,7°C, conjuntivite bilateral com quemose, úlcera corneana no olho esquerdo, estertores nasais, sialorreia. Úlceras em ponta de língua e palato duro. Desidratação leve.",
    complementaryExams: "Diagnóstico predominantemente clínico. PCR de swab oronasal pode identificar herpesvírus felino tipo 1 e/ou calicivírus como agentes etiológicos."
  },
  {
    answer: "Cólica Equina",
    presentation: "Equino, Mangalarga, fêmea, 8 anos. Apresentação aguda de dor abdominal há 4 horas com cavação, olhar para o flanco e rolamento.",
    history: "Mudança recente de feno. Sudorese profusa desde o início dos sinais. Animal se joga no chão repetidamente.",
    physicalExam: "FC 64 bpm, mucosas congestas, TPC 3s, borborigmos reduzidos. Sondagem nasogástrica com refluxo de 6 litros esverdeado. Palpação retal com distensão de delgado.",
    complementaryExams: "Lactato 4,5 mmol/L. Paracentese com líquido serossanguinolento sugestivo de comprometimento isquêmico."
  },
  {
    answer: "Mastite Bovina",
    presentation: "Bovino, Girolando, fêmea, 5 anos, em lactação (DEL 45). Produtor relata queda abrupta na produção e que um teto está inchado e quente desde ontem.",
    history: "Manejo de ordenha mecânica sem pré e pós-dipping adequado. Úbere posterior esquerdo afetado. Animal relutante durante a ordenha.",
    physicalExam: "Temperatura 40,1°C, quarto afetado com edema, hiperemia, dor e endurecimento. Secreção com grumos amarelados. Caneca de fundo preto com grumos.",
    complementaryExams: "CMT 3+ no quarto afetado. Cultura com Staphylococcus aureus."
  },
  {
    answer: "Sarna Demodécica",
    presentation: "Canino, Bulldog Inglês, macho, 7 meses. Tutor relata áreas de falhas de pelo em face, membros e tronco, piorando no último mês.",
    history: "Sem prurido intenso inicialmente, mas algumas lesões começaram a infeccionar. Alopecia progressiva multifocal.",
    physicalExam: "Alopecia periocular bilateral, comedões, cilindros foliculares, eritema e pápulas. Hiperpigmentação. Piodermite secundária.",
    complementaryExams: "Raspado cutâneo profundo com ácaros fusiformes abundantes em todas as fases (ovos, larvas, ninfas, adultos)."
  },
  {
    answer: "Cardiomiopatia Dilatada",
    presentation: "Canino, Dobermann, macho, 6 anos. Tutor relata intolerância ao exercício, tosse noturna e dois episódios de desmaio nas últimas semanas.",
    history: "Piora progressiva da disposição nos últimos 2 meses. Tosse especialmente ao deitar. Barriga levemente distendida recentemente.",
    physicalExam: "Mucosas pálidas, FC 180 bpm irregular, déficit de pulso, sopro IV/VI apical esquerdo, crepitação pulmonar bilateral. Ascite.",
    complementaryExams: "ECG com fibrilação atrial e VPCs. Radiografia com cardiomegalia e edema pulmonar. Ecocardiograma com fração de encurtamento 12%."
  },
  {
    answer: "Cardiomiopatia Hipertrófica Felina",
    presentation: "Felino, Maine Coon, macho, 4 anos. Apresentação aguda de dispneia e vocalização intensa. Tutor nega histórico prévio de doença.",
    history: "Animal era assintomático até o episódio. Tutor percebeu que o gato parou de usar a pata traseira esquerda ao mesmo tempo que começou a respirar mal.",
    physicalExam: "Taquipneia (60 mpm), cianose, membro pélvico esquerdo sem pulso femoral, coxins frios e pálidos. Ritmo de galope (S3).",
    complementaryExams: "Radiografia com edema pulmonar. Ecocardiograma com septo 8 mm, SAM e trombo em bifurcação aórtica."
  },
  {
    answer: "Displasia Coxofemoral",
    presentation: "Canino, Pastor Alemão, macho, 10 meses. Tutor relata dificuldade para levantar, relutância em subir escadas e marcha bamboleante.",
    history: "Piora progressiva há 2 meses. Crescimento rápido. Pais sem certificação de displasia.",
    physicalExam: "Atrofia muscular pélvica, dor à extensão e abdução bilateral dos quadris, Ortolani positivo bilateral, Barlow presente.",
    complementaryExams: "Radiografia ventrodorsal com subluxação bilateral, Norberg 85° e remodelamento acetabular incipiente."
  },
  {
    answer: "Cetose Bovina",
    presentation: "Bovino, Holandês, fêmea, 4 anos, alta produção (42 L/dia), 18 dias pós-parto. Queda progressiva na produção e inapetência seletiva.",
    history: "Recusa concentrado mas aceita volumoso. Condição corporal caiu de 3,5 para 2,5 em duas semanas. Sem alteração de fezes inicialmente percebida pelo produtor.",
    physicalExam: "Leve desidratação, rúmen hipomotílico, fezes escuras. Hálito com odor de cetona.",
    complementaryExams: "Rothera positivo no leite e urina. Beta-hidroxibutirato 2,8 mmol/L. Glicemia 38 mg/dL."
  },
  {
    answer: "Corpo Estranho Gastrointestinal",
    presentation: "Canino, SRD, macho, 6 meses. Tutor relata vômitos intermitentes há 48 horas e que o animal não consegue manter alimento.",
    history: "Histórico de roer brinquedos e objetos domésticos. Vômitos inicialmente alimentares, depois biliosos. Cada tentativa de alimentação resulta em vômito projetado.",
    physicalExam: "Desidratação 6%, dor abdominal cranial, estrutura firme palpável em mesogástrio.",
    complementaryExams: "Radiografia com dilatação gástrica e de delgado proximal com padrão de empilhamento sugestivo de obstrução mecânica."
  },
  {
    answer: "Pancreatite Canina",
    presentation: "Canino, Yorkshire, fêmea castrada, 8 anos, obesa. Vômitos incoercíveis e prostração súbita há 24 horas. Animal assume posição de prece.",
    history: "Ingestão de restos de churrasco no dia anterior. Membros torácicos estendidos, tronco baixo. Sem acesso a lixo ou tóxicos além do relatado.",
    physicalExam: "Temperatura 39,6°C, dor epigástrica intensa, abdômen tenso.",
    complementaryExams: "Leucocitose com desvio à esquerda. cPLI marcadamente elevada, ALT 210 U/L, hipertrigliceridemia. Ultrassonografia com pâncreas hipoecogênico, aumentado, mesentério peripancreático hiperecogênico."
  },
  {
    answer: "PIF",
    presentation: "Felino, Abissínio, macho, 10 meses, proveniente de gatil. Febre flutuante e não responsiva a antibióticos há 15 dias, perda de peso e apatia.",
    history: "Gatil com múltiplos gatos. Tratamentos com antibióticos sem resposta. Barriga está aumentando progressivamente.",
    physicalExam: "Temperatura 40,0°C, abdômen distendido com onda líquida, mucosas ictéricas.",
    complementaryExams: "Efusão viscosa amarelada com alta proteína (5,8 g/dL) e A/G < 0,4. Rivalta positivo. Hiperglobulinemia. PCR positivo para coronavírus felino com alta carga na efusão."
  },
  {
    answer: "Raiva",
    presentation: "Canino, SRD, macho, 3 anos, sem vacinação antirrábica, zona rural. Tutor relata mudança comportamental abrupta há 3 dias com agressividade imotivada.",
    history: "Inicialmente se escondendo e recusando alimento. Depois evoluiu com tentativas de mordida e salivação abundante. Contato com morcego hematófago na propriedade há 30 dias.",
    physicalExam: "Sialorreia intensa, mandíbula caída, disfagia, olhar fixo, midríase bilateral. Paralisia de masseteres. Paresia progressiva de membros pélvicos e incoordenação.",
    complementaryExams: "Diagnóstico confirmado post-mortem por imunofluorescência direta (IFD) em SNC. Zoonose de notificação compulsória — isolamento imediato obrigatório."
  },
  {
    answer: "Tétano Equino",
    presentation: "Equino, SRD, macho, 5 anos, sem vacinação antitetânica. Rigidez progressiva e dificuldade para se alimentar há 2 dias.",
    history: "Ferimento perfurante em casco há 8 dias, tratado apenas com limpeza local. Sem sutura ou antibioticoterapia sistêmica.",
    physicalExam: "Cauda em bandeira, orelhas eretas, prolapso de terceira pálpebra bilateral, trismo mandibular, postura de cavalete. Hiperestesia ao toque e som. Sudorese profusa.",
    complementaryExams: "Diagnóstico eminentemente clínico. Espasmos musculares com estímulos mínimos. Cultura anaeróbia do ferimento pode identificar Clostridium tetani (raramente necessária)."
  },
  {
    answer: "Leptospirose Canina",
    presentation: "Canino, Beagle, macho, 3 anos. Tutor relata anorexia, vômitos e prostração há 3 dias, com urina escurecida.",
    history: "Acesso a quintal com presença de roedores. Vacinação polivalente atrasada. Choveu bastante na última semana com alagamento no quintal.",
    physicalExam: "Temperatura 39,8°C, mucosas ictéricas, dor lombar e renal, desidratação 7%.",
    complementaryExams: "Leucocitose e trombocitopenia. Ureia 280 mg/dL, creatinina 8,5 mg/dL, bilirrubina 6,2 mg/dL, ALT 340 U/L. Urinálise com bilirrubinúria, cilindrúria e isostenúria."
  },
  {
    answer: "Otite Externa",
    presentation: "Canino, Cocker Spaniel, fêmea castrada, 5 anos. Tutor relata que o animal sacode a cabeça, coça as orelhas e há odor fétido auricular há 2 semanas.",
    history: "Histórico de otites recorrentes. Último tratamento há 4 meses. Piora após banho recente.",
    physicalExam: "Pavilhões auriculares eritematosos e edemaciados, secreção ceruminosa escura bilateral, dor à palpação da base auricular. Canal estenosado por hiperplasia.",
    complementaryExams: "Citologia auricular com Malassezia pachydermatis abundante e cocos."
  },
  {
    answer: "Intussuscepção",
    presentation: "Canino, SRD, fêmea, 4 meses. Vômitos e diarreia sanguinolenta tipo geleia de framboesa com início abrupto há 12 horas. Tenesmo intenso.",
    history: "Desverminada há 3 dias. Fezes mudaram de aspecto abruptamente. Animal cada vez mais prostrado.",
    physicalExam: "Desidratação 8%, dor abdominal com estrutura cilíndrica firme palpável em mesogástrio direito. Mucosas hipocoradas.",
    complementaryExams: "Ultrassonografia com imagem em alvo (target sign) em corte transversal, camadas concêntricas compatíveis com invaginação intestinal."
  },
  {
    answer: "Anemia Hemolítica Imunomediada",
    presentation: "Canino, Cocker Spaniel, fêmea, 6 anos. Prostração súbita, mucosas pálidas e amareladas, urina escurecida desde ontem.",
    history: "Sem histórico de trauma, ingestão de tóxicos ou medicações recentes. Animal estava saudável até 2 dias atrás.",
    physicalExam: "Taquicardia (160 bpm), taquipneia, sopro funcional, esplenomegalia.",
    complementaryExams: "Anemia severa regenerativa (Ht 12%), esferócitos, autoaglutinação persistente em salina. Reticulocitose marcada. Bilirrubina indireta elevada. Coombs direto positivo."
  },
  {
    answer: "Doença do Disco Intervertebral",
    presentation: "Canino, Dachshund, macho, 5 anos. Início agudo de dor e dificuldade para andar com as patas traseiras há 24 horas.",
    history: "Episódio ocorreu após pular do sofá. Evolução de dor para fraqueza progressiva dos membros pélvicos.",
    physicalExam: "Dor à palpação toracolombar (T12-L2), propriocepção ausente em pélvicos, patelar exacerbado bilateral, panículo ausente caudal a T13, dor profunda preservada.",
    complementaryExams: "Radiografia com redução do espaço T12-T13 e opacificação do forame intervertebral."
  },
  {
    answer: "Hipocalcemia Puerperal Bovina",
    presentation: "Bovino, Jersey, fêmea, 7 anos, multípara (5ª lactação). Encontrada em decúbito esternal com cabeça voltada para o flanco. Parto há 18 horas.",
    history: "Alto potencial produtivo. Parto sem intercorrências aparentes. Incapaz de se levantar desde que foi encontrada.",
    physicalExam: "Temperatura 37,2°C, extremidades frias, focinho seco, atonia ruminal, reflexo anal diminuído, pupilas dilatadas. FC 80 bpm com bulhas abafadas.",
    complementaryExams: "Cálcio total 4,2 mg/dL (ref 8,5-10,5). Fósforo reduzido."
  },
  {
    answer: "Acidose Ruminal",
    presentation: "Bovino, Nelore, macho, 2 anos, confinamento. Encontrado prostrado, anorético e com diarreia aquosa e fétida há 12 horas.",
    history: "Dieta com 85% de concentrado. Erro na formulação da ração com excesso de milho no dia anterior.",
    physicalExam: "Temperatura 36,8°C, desidratação 8%, rúmen distendido e atônico. FC 100 bpm.",
    complementaryExams: "Líquido ruminal pH 4,5, coloração leitosa, odor ácido. Hemoconcentração. Gasometria com acidose metabólica (pH 7,18, bicarbonato 12 mEq/L)."
  },
  {
    answer: "Adenite Equina",
    presentation: "Equino, SRD, fêmea, 2 anos. Febre, secreção nasal mucopurulenta e aumento de volume submandibular doloroso há 4 dias.",
    history: "Recém-introduzida em haras há 10 dias. Outros equinos do lote com sinais respiratórios leves.",
    physicalExam: "Linfonodos submandibulares e retrofaríngeos marcadamente aumentados, disfagia, extensão de cabeça, dispneia inspiratória leve.",
    complementaryExams: "Endoscopia com hiperemia faríngea. Aspirado com pus espesso. Cultura com Streptococcus equi subsp. equi."
  },
  {
    answer: "Asma Felina",
    presentation: "Felino, Siamês, fêmea castrada, 6 anos, indoor. Episódios recorrentes de tosse seca e dificuldade para respirar há 3 meses.",
    history: "Piora ao contato com produtos de limpeza e areia sanitária perfumada. Crises intermitentes com períodos assintomáticos.",
    physicalExam: "Sibilos expiratórios bilaterais, postura ortopneica durante crise.",
    complementaryExams: "Radiografia com padrão bronquial difuso e hiperinsuflação com achatamento diafragmático. Eosinofilia periférica (1.800/µL). Lavado broncoalveolar com eosinófilos acima de 20%."
  },
  {
    answer: "Linfoma Canino",
    presentation: "Canino, Rottweiler, macho castrado, 7 anos. Tutor relata caroços no pescoço e axilas percebidos há 2 semanas, com perda de apetite recente.",
    history: "Aumento de volume progressivo e indolor. Animal menos disposto nos últimos dias.",
    physicalExam: "Linfadenomegalia generalizada (3 a 5x o normal), firme e indolor. Fígado e baço palpáveis.",
    complementaryExams: "Citologia com população monomórfica de linfoblastos grandes, nucléolos proeminentes. Imunofenotipagem: células B."
  },
  {
    answer: "Osteossarcoma Canino",
    presentation: "Canino, Rottweiler, macho, 8 anos, 45 kg. Claudicação progressiva do membro torácico esquerdo há 6 semanas, sem resposta a anti-inflamatórios.",
    history: "Tutor nota inchaço na pata dianteira. Piora constante. Animal evita apoiar o membro.",
    physicalExam: "Tumefação firme, quente e dolorosa na metáfise distal do rádio esquerdo. Atrofia muscular.",
    complementaryExams: "Radiografia com lise agressiva, triângulo de Codman e reação em raios de sol. Tórax sem metástases visíveis. FA elevada."
  },
  {
    answer: "Esporotricose Felina",
    presentation: "Felino, SRD, macho inteiro, 4 anos, semi-domiciliado. Lesões ulceradas em face e patas há 40 dias, sem resposta a antibióticos.",
    history: "Acesso à rua e brigas frequentes com outros gatos. Lesões começaram como nódulos que ulceraram progressivamente.",
    physicalExam: "Úlceras com bordas elevadas, exsudato purulento, linfadenomegalia regional. Distribuição linfocutânea ascendente.",
    complementaryExams: "Citologia de imprint com estruturas leveduriformes ovaladas intracelulares em macrófagos. Zoonose — uso de EPI obrigatório no manejo."
  },
  {
    answer: "Reticulopericardite Traumática",
    presentation: "Bovino, mestiço, fêmea, 6 anos. Anorexia progressiva há 5 dias, queda na produção, gemidos ao respirar e relutância ao movimento.",
    history: "Sistema extensivo com acesso a área de descarte de materiais (arames, pregos). Sem histórico de imã ruminal.",
    physicalExam: "Temperatura 39,5°C, taquicardia (90 bpm) com bulhas abafadas, distensão de jugulares, edema submandibular e de barbela. Prova do bastão positiva. Rúmen hipomotílico.",
    complementaryExams: "Ultrassonografia torácica com efusão pericárdica e fibrina. Leucocitose por neutrofilia."
  },
  {
    answer: "Hemangissarcoma Esplênico",
    presentation: "Canino, Pastor Alemão, fêmea castrada, 11 anos. Colapso agudo durante passeio, com mucosas pálidas e barriga que inchou de repente.",
    history: "Episódios intermitentes de fraqueza nos últimos dias que resolviam sozinhos. Tutor achava que era da idade.",
    physicalExam: "FC 160 bpm, pulso fraco, TPC > 3s, mucosas pálidas.",
    complementaryExams: "Abdominocentese com líquido sanguinolento que não coagula. Ht 18%. Ultrassonografia com massa esplênica heterogênea de 8 cm e efusão abdominal ecogênica."
  },
  {
    answer: "Dermatofitose",
    presentation: "Felino, Persa, fêmea, 5 meses, adquirida em pet shop há 3 semanas. Falhas circulares de pelo em face, orelhas e patas.",
    history: "Outro gato do domicílio com lesões semelhantes. Tutora relata lesões pruriginosas em seu próprio antebraço. Prurido leve no filhote.",
    physicalExam: "Falhas circulares de pelo com bordas eritematosas e leve descamação em face, orelhas e patas.",
    complementaryExams: "Lâmpada de Wood com fluorescência verde-maçã. Tricograma com esporos artroconídios ao redor dos pelos (ectothrix). Cultura em DTM positiva com Microsporum canis."
  },
  {
    answer: "Rabdomiólise de Esforço Equina",
    presentation: "Equino, PSI, fêmea, 4 anos, treinamento intensivo. Rigidez e dor muscular intensa em lombo e glúteos após exercício vigoroso, com relutância extrema ao movimento.",
    history: "Sudorese profusa após o treino. Episódio semelhante mais leve há 2 meses. Animal recusa andar.",
    physicalExam: "Musculatura lombar e glútea firme e dolorosa. Taquicardia (60 bpm), taquipneia. Mioglobinúria (urina marrom-avermelhada).",
    complementaryExams: "CK 85.000 UI/L (ref até 400). AST 3.200 UI/L. Creatinina discretamente elevada."
  },
  {
    answer: "Ruptura de Ligamento Cruzado",
    presentation: "Canino, Labrador, fêmea castrada, 6 anos, 35 kg, sobrepeso. Claudicação aguda do membro pélvico direito após corrida no parque.",
    history: "Apoio em pinça e relutância à extensão completa. Sem histórico de trauma direto. Piora ao tentar andar.",
    physicalExam: "Efusão articular do joelho direito, gaveta cranial positiva, teste de compressão tibial positivo, dor à hiperextensão. Buttress sign medial.",
    complementaryExams: "Radiografia com efusão e osteofitose incipiente em polo patelar."
  },
  {
    answer: "Epilepsia Idiopática",
    presentation: "Canino, Border Collie, macho, 2 anos. Tutor relata três episódios de convulsões generalizadas no último mês, com duração de 2 minutos cada.",
    history: "Fase pós-ictal com desorientação, salivação e cegueira transitória por até 30 minutos. Entre episódios, animal completamente normal.",
    physicalExam: "Exame neurológico interictal completamente normal, sem déficits detectáveis entre crises.",
    complementaryExams: "Hemograma e bioquímica (hepática, renal, glicemia, eletrólitos) sem alterações. Ressonância magnética de crânio sem lesões estruturais."
  },
  {
    answer: "Mastocitoma Canino",
    presentation: "Canino, Boxer, macho, 7 anos. Tutor relata nódulo na região da virilha há 1 mês, que muda de tamanho de um dia para o outro.",
    history: "Massa flutuante com eritema ao redor quando manipulada. Crescimento gradual no último mês.",
    physicalExam: "Massa cutânea de 4 cm, firme, alopécica, eritema perilesional. Sinal de Darier positivo. Linfonodo inguinal aumentado.",
    complementaryExams: "Citologia com células redondas contendo grânulos metacromáticos abundantes (Giemsa). Estadiamento sem metástases."
  },
  {
    answer: "Obstrução Esofágica Bovina",
    presentation: "Bovino, Nelore, fêmea, 3 anos. Timpanismo agudo e sialorreia intensa de início súbito há 2 horas. Animal inquieto.",
    history: "Sistema semi-intensivo com acesso a pomar de manga. Extensão de pescoço e tentativas de eructação sem sucesso.",
    physicalExam: "Distensão severa da fossa paralombar esquerda (timpanismo gasoso). Palpação cervical com estrutura arredondada e firme no trajeto esofágico.",
    complementaryExams: "Impossibilidade de passagem de sonda esofágica com resistência firme na região cervical. Diagnóstico confirmado por palpação e sondagem."
  },
  {
    answer: "Dermatite Atópica Canina",
    presentation: "Canino, Bulldog Francês, fêmea castrada, 3 anos. Prurido intenso em face, axilas, virilha e entre os dedos, piorando no verão, há 2 anos.",
    history: "Resposta parcial a corticoides. Otites recorrentes. Dieta de eliminação sem melhora. Pai com histórico de atopia.",
    physicalExam: "Eritema ventral, axilar e inguinal, hiperpigmentação e liquenificação interdigital, otite eritematosa bilateral.",
    complementaryExams: "Raspado negativo para ácaros. Malassezia secundária em citologia auricular. IgE alérgeno-específica elevada para ácaros de poeira doméstica."
  },
  {
    answer: "Linfoma Felino",
    presentation: "Felino, SRD, macho castrado, 12 anos. Vômitos crônicos intermitentes há 2 meses com perda de peso progressiva.",
    history: "Apetite reduzido, alternância de diarreia e constipação. Peso caiu de 5,5 para 3,8 kg. Sem resposta a tratamentos empíricos.",
    physicalExam: "Alças intestinais espessadas e massa mesentérica palpável à palpação abdominal.",
    complementaryExams: "Ultrassonografia com espessamento difuso de parede intestinal com perda de estratificação e linfadenomegalia mesentérica. Biópsia com linfócitos monoclonais. Imunohistoquímica: linfoma T alimentar de baixo grau."
  },
  {
    answer: "Anaplasmose Bovina",
    presentation: "Bovino, Holandês, fêmea, 4 anos. Anorexia, queda na produção e amarelamento progressivo há 4 dias.",
    history: "Região com histórico de carrapatos. Sem hemoglobinúria (diferente de outros animais que adoeceram antes na fazenda).",
    physicalExam: "Temperatura 40,8°C, mucosas ictéricas e pálidas, taquicardia (96 bpm). Urina amarelo-escura sem ser avermelhada.",
    complementaryExams: "Anemia severa (Ht 16%) sem reticulocitose adequada. Esfregaço com corpúsculos basofílicos marginais intra-eritrocitários. Bilirrubina indireta elevada."
  },
  {
    answer: "Diabetes Mellitus Felina",
    presentation: "Felino, Persa, macho castrado, 11 anos, obeso (8,2 kg). Tutor relata que o gato urina demais e a caixa de areia enche muito rápido. Emagrecendo.",
    history: "Poliúria e polidipsia há 4 semanas. Perda de peso apesar de comer normalmente. Tutor percebeu que o gato anda de forma estranha, apoiando nos jarretes.",
    physicalExam: "Desidratação leve, plantigradismo bilateral, hepatomegalia.",
    complementaryExams: "Glicemia 420 mg/dL. Frutosamina 600 µmol/L. Glicosúria 4+, cetonúria leve. Triglicerídeos 380 mg/dL. Sem acidose."
  },
  {
    answer: "Miastenia Gravis",
    presentation: "Canino, Golden Retriever, fêmea, 4 anos. Fraqueza muscular que piora com exercício e melhora com repouso. Regurgitação frequente após comer.",
    history: "Tutor nota que o animal cansa rápido durante passeios e não consegue manter os olhos abertos. Regurgitação pós-prandial piorou nas últimas semanas.",
    physicalExam: "Fraqueza que se acentua após caminhada curta, reflexo palpebral fatigável.",
    complementaryExams: "Radiografia com megaesôfago e massa mediastínica cranial. Teste com edrofônio com melhora dramática e transitória. Anticorpos anti-receptor de acetilcolina positivos."
  },
  {
    answer: "Pênfigo Foliáceo",
    presentation: "Canino, Akita, macho, 5 anos. Lesões com crostas em focinho, orelhas e almofadas plantares há 6 semanas, sem resposta a antibióticos.",
    history: "Pústulas e crostas que começaram no nariz e progrediram para orelhas, coxins e abdômen. Prurido leve. Sem melhora com cefalexina.",
    physicalExam: "Crostas espessas em plano nasal e bordas auriculares, hiperqueratose e fissuras em coxins, pústulas flácidas abdominais.",
    complementaryExams: "Citologia de pústula com acantócitos e neutrófilos. Histopatologia com clivagem subcorneal e acantólise. Cultura sem bactérias."
  },
  {
    answer: "Traqueobronquite Infecciosa Canina",
    presentation: "Canino, SRD, macho, 5 meses. Tosse seca, alta e paroxística há 5 dias. Animal alerta e com apetite preservado.",
    history: "Retornado de hospedagem há 5 dias. Tosse provocada por excitação e toque no pescoço. Outros cães da hospedagem com sinais semelhantes.",
    physicalExam: "Temperatura 38,7°C, reflexo de tosse positivo à palpação traqueal, auscultação pulmonar limpa. Sem secreção nasal. Mucosas normocoradas.",
    complementaryExams: "Hemograma sem alterações. Diagnóstico clínico-epidemiológico (histórico de aglomeração em canil ou pet shop)."
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

const ANIMAL_CATEGORIES = {
  pequeno: ["canino", "felino"],
  grande: ["equino", "bovino"],
};

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
const START_POINTS = 10;
const EXAM_COSTS = { history: 1, physicalExam: 2, complementaryExams: 3 };

/* ─── COMPONENT ─── */
export default function VetDoctordle() {
  const [screen, setScreen] = useState("menu");
  const [animalCategory, setAnimalCategory] = useState(null);
  const [cases, setCases] = useState([]);
  const [activeDiagnoses, setActiveDiagnoses] = useState([]);
  const [caseIdx, setCaseIdx] = useState(0);
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState([]);
  const [solved, setSolved] = useState(false);
  const [failed, setFailed] = useState(false);
  const [score, setScore] = useState(0);
  const [casePoints, setCasePoints] = useState(START_POINTS);
  const [showHistory, setShowHistory] = useState(false);
  const [showPhysical, setShowPhysical] = useState(false);
  const [showComplementary, setShowComplementary] = useState(false);
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

  function startGame(category) {
    const species = ANIMAL_CATEGORIES[category];
    const filteredCases = CASES.filter(c => {
      const d = getDiagData(c.answer);
      return d && species.includes(d.species);
    });
    const filteredDiag = ALL_DIAGNOSES.filter(d => species.includes(d.species));
    setCases(shuffleArray(filteredCases).slice(0, CASES_PER_GAME));
    setActiveDiagnoses(filteredDiag);
    setAnimalCategory(category);
    setCaseIdx(0);
    setAttempts([]);
    setSolved(false);
    setFailed(false);
    setScore(0);
    setCasePoints(START_POINTS);
    setShowHistory(false);
    setShowPhysical(false);
    setShowComplementary(false);
    setGuess("");
    setScreen("playing");
  }

  function requestHistory() {
    if (showHistory || solved || failed) return;
    setShowHistory(true);
    setCasePoints(p => Math.max(p - EXAM_COSTS.history, 0));
  }

  function requestPhysicalExam() {
    if (showPhysical || solved || failed) return;
    setShowPhysical(true);
    setCasePoints(p => Math.max(p - EXAM_COSTS.physicalExam, 0));
  }

  function requestComplementaryExams() {
    if (showComplementary || solved || failed) return;
    setShowComplementary(true);
    setCasePoints(p => Math.max(p - EXAM_COSTS.complementaryExams, 0));
  }

  function submitGuess() {
    const trimmed = guess.trim();
    if (!trimmed || solved || failed) return;
    const matched = activeDiagnoses.find(d => normalize(d.name) === normalize(trimmed));
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
      setScore(prev => prev + casePoints);
    } else {
      setCasePoints(p => Math.max(p - 1, 0));
      if (newAttempts.length >= MAX_ATTEMPTS) setFailed(true);
    }
  }

  function nextCase() {
    if (caseIdx + 1 < cases.length) {
      setCaseIdx(caseIdx + 1);
      setAttempts([]);
      setSolved(false);
      setFailed(false);
      setCasePoints(START_POINTS);
      setShowHistory(false);
      setShowPhysical(false);
      setShowComplementary(false);
      setGuess("");
    } else {
      setScreen("results");
    }
  }

  const suggestions = guess.trim().length >= 2
    ? activeDiagnoses
        .filter(d => normalize(d.name).includes(normalize(guess)))
        .filter(d => !attempts.some(a => a.name === d.name))
        .slice(0, 6)
    : [];

  const pct = score / 100;

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
              <h1 style={S.h1}>VetDoctordle</h1>
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
                Cada caso começa com o sinalamento e a queixa principal.
                Acerte de primeira e ganhe 10 pontos. Cada erro custa 1 ponto.
                Você pode solicitar anamnese, exame físico ou exames complementares
                para refinar seu diagnóstico — cada um custa progressivamente mais pontos.
                O feedback estilo Wordle mostra se espécie, sistema, etiologia,
                curso e faixa etária combinam com a resposta.
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
                {[{ n: "10", l: "pts iniciais" }, { n: "−1/2/3", l: "custo exames" }, { n: "100", l: "pts máximos" }].map((s, i) => (
                  <div key={i} style={S.numBox}><div style={S.numN}>{s.n}</div><div style={S.numL}>{s.l}</div></div>
                ))}
              </div>
              <button onClick={() => setScreen("category")} style={S.btnG}>Iniciar</button>
            </div>
          </div>
        )}

        {/* ── CATEGORY SELECTION ── */}
        {screen === "category" && (
          <div style={{ animation: "fu .5s ease" }}>
            <div style={S.card}>
              <h2 style={{ ...S.resT, marginBottom: 8 }}>Escolha a Categoria</h2>
              <p style={{ color: "#9ca3af", fontSize: 14, marginBottom: 28 }}>
                Selecione a área de atuação para esta rodada
              </p>
              <div style={S.catSelectRow}>
                <button onClick={() => startGame("pequeno")} style={S.catCard}>
                  <div style={{ fontSize: 40, marginBottom: 10 }}>🐕🐈</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#e8e6e3", marginBottom: 6 }}>Pequenos Animais</div>
                  <div style={{ fontSize: 13, color: "#6b7280" }}>Cão e Gato</div>
                </button>
                <button onClick={() => startGame("grande")} style={S.catCard}>
                  <div style={{ fontSize: 40, marginBottom: 10 }}>🐴🐄</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#e8e6e3", marginBottom: 6 }}>Grandes Animais</div>
                  <div style={{ fontSize: 13, color: "#6b7280" }}>Equino e Bovino</div>
                </button>
              </div>
              <button onClick={() => setScreen("menu")} style={{ ...S.btnG, background: "rgba(255,255,255,.06)", boxShadow: "none", fontSize: 14, padding: "10px 28px", marginTop: 20 }}>
                ← Voltar
              </button>
            </div>
          </div>
        )}

        {/* ── PLAYING ── */}
        {screen === "playing" && currentCase && (
          <div style={{ animation: "fu .4s ease" }}>
            {/* Progress */}
            <div style={S.progRow}>
              <span style={S.progLbl}>Caso {caseIdx + 1}/{cases.length}</span>
              <div style={S.progBar}><div style={{ ...S.progFill, width: `${(caseIdx / cases.length) * 100}%` }} /></div>
              <div style={{
                fontSize: 13, fontWeight: 700, padding: "4px 12px", borderRadius: 8,
                background: casePoints > 6 ? "rgba(34,197,94,0.1)" : casePoints > 3 ? "rgba(234,179,8,0.1)" : "rgba(239,68,68,0.1)",
                color: casePoints > 6 ? "#22c55e" : casePoints > 3 ? "#eab308" : "#ef4444",
              }}>
                {casePoints} pts possíveis
              </div>
            </div>

            {/* Presentation */}
            <div style={S.vig}>
              <div style={S.vigH}><span style={{ fontSize: 16 }}>🐾</span><span style={S.vigT}>Sinalamento e Queixa</span></div>
              <p style={S.vigP}>{currentCase.presentation}</p>
            </div>

            {/* Action buttons */}
            {!solved && !failed && (
              <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                <button
                  onClick={requestHistory}
                  disabled={showHistory}
                  style={{ ...S.actionBtn, opacity: showHistory ? 0.4 : 1, cursor: showHistory ? "default" : "pointer" }}>
                  📋 {showHistory ? "Anamnese revelada" : `Anamnese (−${EXAM_COSTS.history} pt)`}
                </button>
                <button
                  onClick={requestPhysicalExam}
                  disabled={showPhysical}
                  style={{ ...S.actionBtn, opacity: showPhysical ? 0.4 : 1, cursor: showPhysical ? "default" : "pointer" }}>
                  🩺 {showPhysical ? "Exame Físico revelado" : `Exame Físico (−${EXAM_COSTS.physicalExam} pts)`}
                </button>
                <button
                  onClick={requestComplementaryExams}
                  disabled={showComplementary}
                  style={{ ...S.actionBtn, opacity: showComplementary ? 0.4 : 1, cursor: showComplementary ? "default" : "pointer" }}>
                  🔬 {showComplementary ? "Complementares revelados" : `Complementares (−${EXAM_COSTS.complementaryExams} pts)`}
                </button>
              </div>
            )}

            {/* History */}
            {showHistory && (
              <div style={{ ...S.vig, borderColor: "rgba(234,179,8,0.15)", animation: "fu .4s ease" }}>
                <div style={S.vigH}><span style={{ fontSize: 16 }}>📋</span><span style={{ ...S.vigT, color: "#eab308" }}>Anamnese</span></div>
                <p style={S.vigP}>{currentCase.history}</p>
              </div>
            )}

            {/* Physical Exam */}
            {showPhysical && (
              <div style={{ ...S.vig, borderColor: "rgba(59,130,246,0.15)", animation: "fu .4s ease" }}>
                <div style={S.vigH}><span style={{ fontSize: 16 }}>🩺</span><span style={{ ...S.vigT, color: "#3b82f6" }}>Exame Físico</span></div>
                <p style={S.vigP}>{currentCase.physicalExam}</p>
              </div>
            )}

            {/* Complementary Exams */}
            {showComplementary && (
              <div style={{ ...S.vig, borderColor: "rgba(168,85,247,0.15)", animation: "fu .4s ease" }}>
                <div style={S.vigH}><span style={{ fontSize: 16 }}>🔬</span><span style={{ ...S.vigT, color: "#a855f7" }}>Exames Complementares</span></div>
                <p style={S.vigP}>{currentCase.complementaryExams}</p>
              </div>
            )}

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
                <p style={{ color: "#9ca3af", fontSize: 14 }}>
                  {currentCase.answer} — tentativa {attempts.length}
                  {showHistory && " · anamnese solicitada"}
                  {showPhysical && " · exame físico solicitado"}
                  {showComplementary && " · complementares solicitados"}
                </p>
                <p style={{ color: "#22c55e", fontSize: 24, fontWeight: 800, margin: "8px 0 16px" }}>+{casePoints} pts</p>
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
                {!showHistory && <p style={{ color: "#6b7280", fontSize: 13, marginTop: 12 }}>📋 Anamnese: {currentCase.history}</p>}
                {!showPhysical && <p style={{ color: "#6b7280", fontSize: 13, marginTop: 8 }}>🩺 Exame Físico: {currentCase.physicalExam}</p>}
                {!showComplementary && <p style={{ color: "#6b7280", fontSize: 13, marginTop: 8 }}>🔬 Complementares: {currentCase.complementaryExams}</p>}
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
              <div style={S.resSc}>{score}<span style={S.resMx}> / 100</span></div>
              <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 4 }}>
                {animalCategory === "pequeno" ? "🐕🐈 Pequenos Animais" : "🐴🐄 Grandes Animais"}
              </p>
              <p style={S.resMsg}>
                {pct > 0.7
                  ? "Diagnóstico clínico de alto nível. Você identifica padrões com pouquíssimas informações."
                  : pct > 0.4
                  ? "Bom raciocínio clínico. Tente depender menos dos exames e mais da apresentação inicial."
                  : pct > 0.2
                  ? "Resultado sólido. Pratique a formulação de diferenciais já no primeiro contato com o caso."
                  : "Continue treinando. A prática com casos clínicos refina o olhar semiológico."}
              </p>
              <button onClick={() => setScreen("category")} style={S.btnG}>Jogar Novamente</button>
            </div>
          </div>
        )}

        <footer style={S.foot}>VetDoctordle — Jogo educativo de diagnóstico veterinário</footer>
      </div>

      <style>{`
        @keyframes fu { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fi { from { opacity:0; transform:rotateX(90deg) scale(.8); } to { opacity:1; transform:rotateX(0) scale(1); } }
        input::placeholder { color:#4b5563; }
        input:focus { border-color:rgba(34,197,94,.4)!important; outline:none; }
        button { transition: transform .15s, box-shadow .2s; }
        .catCard:hover { border-color: rgba(34,197,94,0.4) !important; background: rgba(34,197,94,0.08) !important; }
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
  h1: { fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: -.5, background: "linear-gradient(135deg,#22c55e,#10b981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  sub: { margin: 0, fontSize: 9, color: "#6b7280", letterSpacing: 2 },
  pts: { fontSize: 14, fontWeight: 700, color: "#22c55e", background: "rgba(34,197,94,.1)", padding: "6px 16px", borderRadius: 10 },
  card: { background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.05)", borderRadius: 20, padding: "36px 28px", textAlign: "center" },
  desc: { fontSize: 15, lineHeight: 1.7, color: "#9ca3af", marginBottom: 24, textAlign: "left" },
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
  catSelectRow: { display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 8 },
  catCard: {
    flex: "1 1 180px", maxWidth: 220, padding: "28px 20px", background: "rgba(255,255,255,.03)",
    border: "1px solid rgba(255,255,255,.08)", borderRadius: 18, cursor: "pointer",
    textAlign: "center", transition: "all .2s", color: "inherit",
  },
  progRow: { display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" },
  progLbl: { fontSize: 13, color: "#6b7280", whiteSpace: "nowrap" },
  progBar: { flex: 1, height: 4, background: "rgba(255,255,255,.05)", borderRadius: 4, minWidth: 60 },
  progFill: { height: "100%", borderRadius: 4, background: "linear-gradient(90deg,#22c55e,#10b981)", transition: "width .5s" },
  vig: { background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 16, padding: "20px 22px", marginBottom: 16 },
  vigH: { display: "flex", alignItems: "center", gap: 8, marginBottom: 12 },
  vigT: { fontSize: 13, fontWeight: 700, color: "#22c55e", textTransform: "uppercase", letterSpacing: 1 },
  vigP: { fontSize: 15, lineHeight: 1.8, color: "#d1d5db", margin: 0, textAlign: "left" },
  actionBtn: {
    flex: 1, minWidth: 120, padding: "12px 8px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)",
    borderRadius: 12, color: "#d1d5db", fontSize: 13, fontWeight: 500, cursor: "pointer",
    transition: "all .2s", textAlign: "center",
  },
  grid: { display: "flex", flexDirection: "column", gap: 6, marginTop: 8 },
  ghRow: { display: "flex", gap: 6, padding: "0 4px", marginBottom: 4 },
  ghCell: { flex: 1, textAlign: "center", fontSize: 12, color: "#6b7280", padding: "4px 0" },
  gRow: { display: "flex", gap: 6, padding: "8px 4px", borderRadius: 12, alignItems: "center" },
  gDiag: { flex: 2.2, fontSize: 13, padding: "0 4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  gCell: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px 2px", borderRadius: 8, minHeight: 48 },
  inRow: { display: "flex", gap: 8 },
  inp: { width: "100%", padding: "14px 16px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 12, color: "#e8e6e3", fontSize: 15, boxSizing: "border-box" },
  btnS: { padding: "14px 24px", background: "linear-gradient(135deg,#22c55e,#16a34a)", border: "none", borderRadius: 12, color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", boxShadow: "0 2px 12px rgba(34,197,94,.2)", whiteSpace: "nowrap" },
  sugBox: { position: "absolute", top: "100%", left: 0, right: 80, marginTop: 4, zIndex: 10, background: "#1a1f2e", border: "1px solid rgba(255,255,255,.1)", borderRadius: 12, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,.4)" },
  sugI: { padding: "10px 16px", cursor: "pointer", fontSize: 14, borderBottom: "1px solid rgba(255,255,255,.03)", transition: "background .15s" },
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
