import { Lesson } from "../types";

export const lessons: Lesson[] = [
  {
    id: "l1_concepto",
    title: "1. Concepto de Ceremonial y Protocolo",
    category: "fundamentos",
    description: "Aprende la diferencia fundamental entre protocolo y ceremonial, sus propósitos diplomáticos y sus principios jurídicos esenciales.",
    readTime: "6 min",
    sections: [
      {
        title: "Introducción al Ceremonial",
        subtitle: "Unidad 2. Reglas generales y sustentos legales",
        content: "El estudio de las reglas generales del ceremonial permite analizar los sustentos legales que rigen los mecanismos de cooperación entre las naciones, así como los aspectos prácticos de su aplicación ordinaria.",
        highlight: "Esta unidad fue desarrollada con base en la información y asesoría proporcionada por la Dirección General de Protocolo (DGPRO), corregida y actualizada con la práctica diplomática contemporánea."
      },
      {
        title: "Protocolo vs. Ceremonial",
        subtitle: "La distinción conceptual clave",
        content: "Aunque a menudo se usan como sinónimos, el protocolo y el ceremonial desempeñan funciones distintas pero complementarias dentro del ámbito de las relaciones diplomáticas:",
        bulletPoints: [
          "**Protocolo:** Es el procedimiento que organiza y facilita la interacción entre distintas partes para el desarrollo de sus actividades en un ambiente de armonía y respeto. En el ámbito diplomático, es el conjunto de normas consensuadas, derivadas del derecho internacional, diplomático e interno, que determina las relaciones, privilegios e inmunidades que garantizan el eficaz desempeño de las misiones extranjeras.",
          "**Ceremonial:** Es el conjunto de reglas, fórmulas y procedimientos, impuestos por la experiencia y la práctica internacional, a las que se deben ajustar las relaciones entre miembros de misiones extranjeras y autoridades locales y, en particular, las ceremonias en las que participan representantes de los Estados. Incluye el orden jerárquico, la precedencia en los actos oficiales, la vestimenta y el comportamiento."
        ]
      },
      {
        title: "Tipos de Ceremonial",
        subtitle: "Áreas de aplicación formal",
        content: "El ceremonial se divide principalmente en dos grandes vertientes dependiendo de los sujetos e instituciones involucradas:",
        bulletPoints: [
          "**1. Ceremonial de Estado:** Establece las reglas que se observan en relación con los títulos y honores debidos a jefes/as de Estado o de los miembros de gobierno en ceremonias oficiales de una nación.",
          "**2. Ceremonial Diplomático:** Se observa en la interacción con agentes diplomáticos de otros Estados. Está íntimamente ligado al **ceremonial de cancillería**, que se ocupa específicamente de la correspondencia oficial entre gobiernos."
        ],
        highlight: "El ceremonial diplomático es un elemento de orden creado para evitar fricciones y resolver las divergencias que de otro modo pudieran surgir en las actividades diplomáticas y oficiales. Asegura a cada uno de los participantes las prerrogativas a que tiene derecho bajo el principio de igualdad jurídica de los Estados. (Cárdenas, 1991)"
      }
    ]
  },
  {
    id: "l2_visitas",
    title: "2. Visitas de Alto Nivel y Conmemoraciones",
    category: "aplicaciones",
    description: "Estudia las tipologías de visitas oficiales, los elementos protocolares de un banquete y cómo se estructuran las ceremonias en el exterior.",
    readTime: "7 min",
    sections: [
      {
        title: "Visitas de Alto Nivel",
        subtitle: "Tipos de visitas de dignatarios",
        content: "El ceremonial diplomático se aplica de manera rigurosa en las visitas de autoridades extranjeras. Existen 4 tipos principales de visitas que se consideran de alto nivel:",
        bulletPoints: [
          "**Visitas de Estado:** Representan el máximo grado de formalidad y se realizan entre Jefes de Estado.",
          "**Visitas Oficiales:** Realizadas por Jefes de Estado o de Gobierno, Ministros o Cancilleres con un carácter político o diplomático específico.",
          "**Visitas de Trabajo:** Enfocadas en agendas temáticas de negociación directa, con un protocolo más ágil y reducido.",
          "**Visitas Privadas:** Visitas no oficiales (de carácter vacacional o de interés particular) donde los elementos protocolares son mínimos o inexistentes."
        ]
      },
      {
        title: "Elementos Comunes del Ceremonial de Visitas",
        subtitle: "Logística y solemnidad en visitas oficiales y de Estado",
        content: "Cada tipo de visita de alto nivel (con excepción de las privadas) debe incluir de manera obligatoria ciertos elementos solemnes de ceremonial coordinados por la Dirección General de Protocolo:",
        bulletPoints: [
          "Recepción oficial en el aeropuerto.",
          "Ceremonia oficial de bienvenida (himnos, guardia de honor).",
          "Ofrenda floral en el monumento a los héroes nacionales.",
          "Reunión privada entre Mandatarios/as.",
          "Reunión ampliada entre ambos/as Mandatarios/as y sus comitivas.",
          "Reuniones con titulares de los poderes legislativo y judicial en sus sedes.",
          "Intercambios de condecoraciones nacionales.",
          "Banquetes de gala u oficiales."
        ]
      },
      {
        title: "Conmemoraciones Nacionales y Embajadas",
        subtitle: "Efemérides y actividades en las RME",
        content: "Las efemérides de hechos histórico-cívicos nacionales se conmemoran tanto en el territorio nacional como en los países donde México tiene una Representación de México en el Exterior (RME - Embajadas y Consulados).",
        bulletPoints: [
          "En territorio nacional, son presididas por el titular del Ejecutivo y se suele invitar al cuerpo diplomático acreditado.",
          "En las RME, se invita a personalidades del gobierno receptor, del medio social, académico, empresarial, diplomáticos de países amigos, organismos internacionales y connacionales.",
          "**Fechas clave de conmemoración:** Aniversario de la Constitución, Inicio de la Independencia de México (15/16 de septiembre), Inicio de la Revolución Mexicana (20 de noviembre), Informes Presidenciales y la Ceremonia de Presentación de Cartas Credenciales."
        ]
      },
      {
        title: "Coordinación y Avanzada",
        subtitle: "La importancia de la planificación",
        content: "Las visitas y eventos sociales oficiales se acuerdan tradicionalmente por vía diplomática. La **DGPRO** da a conocer a las misiones diplomáticas todos los detalles. Los jefes de misión acreditados deben informar con antelación el itinerario, número de integrantes de la comitiva y detalles logísticos.",
        highlight: "Toda ceremonia supone trabajos de avanzada: actividades previas para coordinar la seguridad, los detalles ceremoniales, la difusión de prensa y la logística del visitante y sus comitivas. En el caso de visitas del Presidente de México al extranjero, la avanzada la coordina el equipo de la Dirección General de Protocolo."
      }
    ]
  },
  {
    id: "l3_precedencia_legal",
    title: "3. Marco Legal de la Precedencia",
    category: "precedencia",
    description: "Analiza el origen histórico de la precedencia y el articulado exacto de la Convención de Viena de 1961 que rige a nivel mundial.",
    readTime: "8 min",
    sections: [
      {
        title: "¿Qué es la Precedencia?",
        subtitle: "El reconocimiento del orden protocolario",
        content: "La precedencia se refiere al lugar y el orden que deben ocupar dignatarios/as, autoridades, banderas o firmas en documentos para el desarrollo de una ceremonia o actividad social. Se basa en las jerarquías y categorías de las personas para establecer su ubicación física.",
        highlight: "El ceremonial no crea jerarquías, solo las reconoce. Tampoco inventa honores ni provoca suntuosidad, simplemente establece un orden objetivo que hace posible relaciones fluidas, simplifica la organización y evita incidentes desfavorables."
      },
      {
        title: "Antecedentes Históricos",
        subtitle: "Del caos protocolario a las reglas de Viena",
        content: "En la antigüedad, al no existir reglas generales, los embajadores de las grandes potencias disputaban frecuentemente de forma violenta o airada los lugares de honor, entorpeciendo las negociaciones internacionales.",
        bulletPoints: [
          "**El Congreso de Viena (1814-1815):** Tras el fin del imperio napoleónico, se consolidó el sistema internacional de Estados soberanos. Nace el principio de igualdad jurídica de los Estados y se firma el primer reglamento sobre jerarquías y precedencia por ocho potencias europeas.",
          "**El Congreso de Aquisgrán (1818):** Se añade a la lista la categoría de 'ministros residentes' entre los ministros plenipotenciarios y encargados de negocios.",
          "**Convención de Viena sobre Relaciones Diplomáticas de 1961:** Convocada por la ONU, ratificada actualmente por más de 190 países, codifica y actualiza estas normas respetando las bases de 1815."
        ]
      },
      {
        title: "Regulación de Precedencias en la Convención de 1961",
        subtitle: "Artículos fundamentales para el Cuerpo Diplomático",
        content: "La Convención de Viena de 1961 establece reglas de oro en sus artículos para determinar el orden de prioridad entre los agentes diplomáticos:",
        viennaArticle: {
          num: "Artículo 13",
          text: "1. Se considerará que el jefe de misión ha asumido sus funciones en el Estado receptor desde el momento en que haya presentado sus cartas credenciales o en que haya comunicado su llegada y presentado copia de estilo de sus cartas credenciales al Ministerio de Relaciones Exteriores...\n2. El orden de presentación de las cartas credenciales o de su copia de estilo se determinará por la fecha y hora de llegada del jefe de misión."
        }
      },
      {
        title: "Clases de Jefes de Misión",
        subtitle: "Artículo 14",
        content: "Los Jefes de Misión se dividen en tres clases principales:",
        viennaArticle: {
          num: "Artículo 14",
          text: "1. Los jefes de misión se dividen en tres clases:\na) embajadores o nuncios acreditados ante los jefes de Estado, y otros jefes de misión de rango equivalente;\nb) enviados, ministros o internuncios acreditados ante los jefes de Estado;\nc) encargados de negocios acreditados ante los Ministros de Relaciones Exteriores.\n\n2. Salvo por lo que respecta a la precedencia y a la etiqueta, no se hará ninguna distinción entre los jefes de misión por razón de su clase."
        }
      },
      {
        title: "Precedencia de Acuerdo a la Antigüedad",
        subtitle: "Artículos 15, 16, 17 y 18",
        content: "La antigüedad en el cargo rige la precedencia interna de cada clase, respetando costumbres locales respecto al decanato de la Santa Sede:",
        viennaArticle: {
          num: "Artículo 16",
          text: "1. La precedencia de los jefes de misión, dentro de cada clase, se establecerá siguiendo el orden de la fecha y la hora en que hayan asumido sus funciones...\n2. Las modificaciones en las cartas credenciales de un jefe de misión que no entrañen cambio de clase no alterarán su orden de precedencia.\n3. Las disposiciones de este artículo se entenderán sin perjuicio de los usos que acepte el Estado receptor respecto de la precedencia del representante de la Santa Sede (Nuncio Apostólico)."
        }
      }
    ]
  },
  {
    id: "l4_aplicacion_practica",
    title: "4. Aplicación Práctica: Vehículos, Estrados y Mesas",
    category: "practica",
    description: "Aprende las reglas matemáticas y de etiqueta para ubicar personas en automóviles, caravanas, estrados de presídium y mesas de banquetes.",
    readTime: "10 min",
    sections: [
      {
        title: "1. Vehículos y Caravanas Oficiales",
        subtitle: "La regla del asiento de honor y los traslados",
        content: "La colocación de dignatarios en vehículos sigue una estricta jerarquía de seguridad y honor:",
        bulletPoints: [
          "**Lugar de honor:** Es el **asiento trasero que se encuentra en diagonal opuesta a la ubicación de quien conduce** (atrás a la derecha en países con volante a la izquierda). Se destina a la persona de más alto rango.",
          "**Segundo lugar:** El asiento trasero justo detrás del conductor. Se destina al cónyuge del dignatario, o al miembro de la comitiva que le siga en precedencia.",
          "**Tercer pasajero:** El asiento delantero al lado del conductor se reserva para la persona de menor rango o con funciones de servicio (edecán, intérprete, secretario).",
          "**Jefes de Estado y de Gobierno:** Para mandatarios, el asiento delantero junto al conductor lo ocupa **SIEMPRE la persona encargada de su seguridad**. Intérpretes o médicos deben viajar en un vehículo secundario.",
          "**Abordaje y descenso:** El de más alto rango aborda primero el vehículo. Al descender se hace a la inversa: el de menor rango baja primero (para abrir la puerta u organizar) y termina la persona de mayor rango."
        ]
      },
      {
        title: "La Caravana Presidencial en México",
        subtitle: "Composición reglamentaria de 9 vehículos",
        content: "En visitas de Estado en México, los vehículos viajan en una caravana con la siguiente estructura rígida:",
        bulletPoints: [
          "1. Vehículo guía.",
          "2. Vehículo de los encargados del protocolo (DGPRO) para atender incidentes rápidos.",
          "3. Vehículo de seguridad.",
          "4. **Vehículo principal donde viaja el invitado de honor** (asiento de honor).",
          "5. Vehículo de seguridad.",
          "6. Vehículo de seguridad 'ETRI' (Equipo Táctico de Reacción Inmediata).",
          "7. Vehículo de emergencia.",
          "8. Vehículos con el resto de la comitiva oficial.",
          "9. Ambulancia médica."
        ]
      },
      {
        title: "2. Ordenación en Estrados o Presídium",
        subtitle: "La regla del centro y la alternancia de flancos",
        content: "Un estrado es una plataforma elevada para presenciar un acto público (como un desfile o ceremonia civil). Se rige por la alternancia derecha-izquierda a partir del centro:",
        bulletPoints: [
          "**El anfitrión se ubica siempre en el centro.**",
          "**Si el número de integrantes es impar:** A la derecha del anfitrión (izquierda si se ve de frente) se coloca el **primer lugar de precedencia** (el invitado de honor). A la izquierda del anfitrión (derecha de frente) se coloca el segundo de precedencia. Se continúa alternando: el tercero a la derecha del anfitrión, el cuarto a la izquierda, y así sucesivamente.",
          "**Si el número de integrantes es par:** Partiendo de los dos lugares del centro, en el lugar del lado derecho (según la perspectiva de los sentados, que es la izquierda de frente) se ubicará el invitado de honor."
        ],
        highlight: "En la foto oficial de cumbres como el G20 se ordenan primero por categorías (1ª fila: Jefes de Estado, 2ª fila: Jefes de Gobierno, 3ª fila: Organismos Internacionales y países invitados). Dentro de cada fila, se ordenan por antigüedad en el cargo."
      },
      {
        title: "3. Montaje de Mesas oficiales",
        subtitle: "Mesas de trabajo y el sistema P+1+2",
        content: "Las necesidades del evento y la precedencia determinan la forma y el acomodo de la mesa para mantener un ambiente de armonía:",
        bulletPoints: [
          "**Mesa rectangular de trabajo (Bilateral):** Al centro, frente a frente, se sientan el Anfitrión (A) y el Invitado de Honor (IH). A sus derechas e izquierdas se sientan los miembros de sus comitivas siguiendo su orden de precedencia. En negociaciones previas consolidadas, pueden sentarse lado a lado en la cabecera.",
          "**Mesa circular de trabajo:** Se divide la mesa diametralmente por la mitad: un semicírculo para el anfitrión y su delegación, y el otro para el invitado de honor y la suya.",
          "**Mesa en herradura (Multilateral):** El anfitrión ocupa el centro (presidencia) y los representantes se ubican a ambos lados siguiendo el orden alfabético. En mecanismos rotatorios como el G20 se usa la **Troika**: el actual presidente en el centro flanqueado por el anterior (izquierda) y el próximo (derecha).",
          "**Disposición P+1+2 (Mesa Rusa/Cuadrada):** El jefe de delegación (P) se sienta en la mesa con un asistente a su izquierda (+1), y los otros dos acompañantes (+2) se sitúan de pie o sentados en la fila posterior para asistir sin participar directamente."
        ]
      },
      {
        title: "Mesas para Actividades Sociales",
        subtitle: "La regla de intercalar y la etiqueta mexicana",
        content: "A diferencia del trabajo (donde las delegaciones se agrupan), en las comidas y banquetes sociales el objetivo es la integración, por lo que las delegaciones se intercalan:",
        bulletPoints: [
          "**Rectangular Social:** El Anfitrión (A) y el Invitado de Honor (IH) se sientan frente a frente en el centro de los lados largos. A la derecha de A se sienta el 1er lugar de la comitiva de IH, a su izquierda el 2º lugar de IH. A manera de espejo, a la derecha de IH se sienta el 1er de la comitiva de A, a su izquierda el 2º de A, e intercalando consecutivamente.",
          "**Circular Social con Cónyuges:** El Anfitrión (A) en la cabecera y el Invitado de Honor (IH) a su derecha. En la práctica protocolaria contemporánea, los cónyuges se ubican al lado de su pareja: el cónyuge de A a su izquierda, y el cónyuge de IH a la derecha de este. Luego se intercalan los primeros lugares de las comitivas contrarias.",
          "**Monarquías (España/Japón):** El anfitrión y su cónyuge se sientan frente a frente. A la derecha del anfitrión se sienta el cónyuge del invitado de honor, y el invitado se sienta a la derecha del cónyuge del anfitrión (parejas cruzadas).",
          "**Mesa de cuatro presidencias:** Usada si hay cuatro copresidentes o varios invitados de honor muy relevantes. Los copresidentes se sientan en cruz en los cuatro extremos de la mesa."
        ],
        highlight: "La práctica mexicana actual dicta que los cónyuges de los invitados asistan y se sienten juntos a su pareja. Asimismo, debe aplicarse siempre la perspectiva de género: la precedencia es el criterio absoluto y objetivo para ubicar a las personas, independientemente de su sexo."
      }
    ]
  }
];
