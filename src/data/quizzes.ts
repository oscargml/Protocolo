import { Quiz } from "../types";

export const quizzes: Quiz[] = [
  {
    id: "q_fundamentos",
    title: "Fundamentos y Conceptos de Ceremonial",
    category: "Conceptos Básicos",
    description: "Evalúa tus conocimientos sobre la diferencia entre protocolo y ceremonial, los tipos de ceremonial y los principios del derecho internacional aplicados.",
    questions: [
      {
        id: "qf_1",
        question: "¿Cuál es la diferencia primordial entre protocolo y ceremonial en el ámbito diplomático?",
        options: [
          "El protocolo regula la vestimenta y el ceremonial regula las inmunidades diplomáticas.",
          "El protocolo es el conjunto de normas (derecho internacional e interno) que define relaciones y privilegios; mientras que el ceremonial es el conjunto de reglas y fórmulas prácticas para las solemnidades y actos oficiales.",
          "El protocolo se aplica únicamente a nivel local y el ceremonial tiene validez internacional.",
          "No existe ninguna diferencia, son dos palabras para el mismo concepto legal."
        ],
        correctAnswerIndex: 1,
        explanation: "El protocolo se define como el marco normativo consensuado (derecho internacional, interno) que regula relaciones, inmunidades y privilegios. Por su parte, el ceremonial representa las reglas prácticas, fórmulas y procedimientos tradicionales para la organización física, orden jerárquico y vestimenta en actos públicos."
      },
      {
        id: "qf_2",
        question: "¿Cuál es la función principal del ceremonial según Cárdenas (1991)?",
        options: [
          "Establecer la suntuosidad y riqueza de los banquetes del Estado.",
          "Crear nuevas jerarquías y títulos de nobleza entre las naciones participantes.",
          "Evitar fricciones, resolver divergencias y asegurar a cada participante las prerrogativas a las que tiene derecho en virtud de la igualdad jurídica.",
          "Obligar a todos los países a adoptar las mismas leyes civiles internas."
        ],
        correctAnswerIndex: 2,
        explanation: "Cárdenas (1991) señala que el ceremonial diplomático es un elemento de orden creado para evitar fricciones y resolver divergencias, asegurando a cada participante las prerrogativas de las que goza gracias al principio de igualdad jurídica de los Estados."
      },
      {
        id: "qf_3",
        question: "¿A qué se refiere el 'ceremonial de cancillería'?",
        options: [
          "A las reglas de comportamiento dentro del palacio presidencial.",
          "Al protocolo específico para recibir cartas de felicitación personales.",
          "A las reglas y formalidades que rigen la correspondencia oficial entre gobiernos.",
          "Al orden en que deben viajar los vehículos de escolta de los embajadores."
        ],
        correctAnswerIndex: 2,
        explanation: "El ceremonial de cancillería se ocupa específicamente de las reglas formales, fórmulas de cortesía y procedimientos de redacción aplicables a la correspondencia oficial entre gobiernos y misiones diplomáticas."
      }
    ]
  },
  {
    id: "q_visitas",
    title: "Visitas de Alto Nivel y Conmemoraciones",
    category: "Eventos y Conmemoraciones",
    description: "Pon a prueba tu comprensión sobre la clasificación de visitas de dignatarios extranjeros y las efemérides conmemoradas en el exterior.",
    questions: [
      {
        id: "qv_1",
        question: "¿Cuál de las siguientes opciones NO se considera una visita de alto nivel bajo las normas del ceremonial diplomático?",
        options: [
          "Visita de Estado",
          "Visita de Trabajo",
          "Visita Turística No Informada",
          "Visita Oficial"
        ],
        correctAnswerIndex: 2,
        explanation: "Las visitas de alto nivel son cuatro: de Estado, Oficiales, de Trabajo y Privadas. Una visita turística que se haga de manera informal y no informada a través de canales diplomáticos queda fuera de la clasificación del ceremonial diplomático formal."
      },
      {
        id: "qv_2",
        question: "Durante una Visita de Estado en México, ¿cuál de los siguientes elementos del ceremonial NO es obligatorio coordinar con la DGPRO?",
        options: [
          "La ofrenda floral en el monumento a los héroes nacionales.",
          "El itinerario privado de compras de la comitiva en centros comerciales locales.",
          "La recepción oficial en el aeropuerto y ceremonia oficial de bienvenida.",
          "Un banquete u cena oficial en honor al visitante."
        ],
        correctAnswerIndex: 1,
        explanation: "Los elementos obligatorios del ceremonial formal incluyen la recepción en aeropuerto, bienvenida oficial, ofrenda floral, reuniones de trabajo, banquetes oficiales e intercambios de condecoraciones. Las actividades de ocio o compras de carácter estrictamente personal no forman parte del programa oficial de ceremonial."
      },
      {
        id: "qv_3",
        question: "¿Qué fechas cívicas suelen conmemorarse formalmente mediante ceremonias en las Representaciones de México en el Exterior (RME)?",
        options: [
          "El Día de San Valentín y el Día de Muertos exclusivamente.",
          "El Aniversario de la Constitución, el Inicio de la Independencia y de la Revolución, y los Informes Presidenciales.",
          "Únicamente los cumpleaños de los embajadores titulares.",
          "El aniversario del Congreso de Viena de 1815."
        ],
        correctAnswerIndex: 1,
        explanation: "De acuerdo con el manual oficial, las fechas cívicas de relevancia nacional que se conmemoran en las Representaciones de México en el Exterior (RME) son el Aniversario de la Constitución, el Inicio de la Independencia de México, el Inicio de la Revolución y los Informes Presidenciales."
      }
    ]
  },
  {
    id: "q_precedencia",
    title: "Marco Legal y Convención de Viena 1961",
    category: "Normativa Internacional",
    description: "Preguntas técnicas avanzadas sobre el articulado de la Convención de Viena y las reglas históricas de precedencia.",
    questions: [
      {
        id: "qp_1",
        question: "De acuerdo con el Artículo 13 de la Convención de Viena de 1961, ¿cómo se determina exactamente el orden de presentación de las cartas credenciales de los Jefes de Misión?",
        options: [
          "Por la importancia económica o militar del país acreditante.",
          "Por la fecha y hora de llegada del jefe de misión al Estado receptor.",
          "Por orden de edad del embajador designado.",
          "Por sorteo público ante el Ministerio de Relaciones Exteriores."
        ],
        correctAnswerIndex: 1,
        explanation: "El Artículo 13, numeral 2 de la Convención de Viena de 1961 establece expresamente que: 'El orden de presentación de las cartas credenciales o de su copia de estilo se determinará por la fecha y hora de llegada del jefe de misión'."
      },
      {
        id: "qp_2",
        question: "¿En qué clases se dividen los Jefes de Misión según el Artículo 14 de la Convención de Viena de 1961?",
        options: [
          "1. Embajadores/Nuncios, 2. Enviados/Ministros/Internuncios, 3. Encargados de Negocios.",
          "1. Cónsules Generales, 2. Vicecónsules, 3. Agregados Culturales.",
          "1. Jefes de Estado, 2. Jefes de Gobierno, 3. Ministros de Relaciones Exteriores.",
          "1. Embajadores Plenipotenciarios, 2. Consejeros, 3. Secretarios de Legación."
        ],
        correctAnswerIndex: 0,
        explanation: "El Artículo 14 de la Convención de Viena divide a los Jefes de Misión en tres clases: a) embajadores o nuncios (acreditados ante Jefes de Estado), b) enviados, ministros o internuncios (acreditados ante Jefes de Estado), y c) encargados de negocios (acreditados ante el Ministro de Relaciones Exteriores)."
      },
      {
        id: "qp_3",
        question: "Según el Artículo 16 de la Convención de Viena, ¿qué uso especial acepta el Estado receptor respecto a la precedencia diplomática?",
        options: [
          "Dar prioridad siempre al embajador del país con mayores lazos comerciales.",
          "La precedencia especial del representante de la Santa Sede (Nuncio Apostólico) como decano del cuerpo diplomático, según los usos locales.",
          "Permitir que los embajadores decidan por sorteo quién preside cada reunión.",
          "Otorgar mayor jerarquía a quienes tengan cónyuges de la misma nacionalidad."
        ],
        correctAnswerIndex: 1,
        explanation: "El Artículo 16 de la Convención, en su numeral 3, señala que las reglas de precedencia se entenderán 'sin perjuicio de los usos que acepte el Estado receptor respecto de la precedencia del representante de la Santa Sede' (quien tradicionalmente ejerce de Decano en muchos países católicos)."
      }
    ]
  }
];
