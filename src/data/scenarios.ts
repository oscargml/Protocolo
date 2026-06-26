import { SeatingScenario } from "../types";

export const scenarios: SeatingScenario[] = [
  {
    id: "sc_vehiculo",
    title: "1. Distribución en Vehículo Presidencial",
    description: "Ubica a los pasajeros en un vehículo oficial que transporta a un Jefe de Estado visitante en México, respetando la seguridad y los honores.",
    type: "vehicle",
    context: "Estás organizando el traslado del Presidente de Francia en su visita de Estado a México. El vehículo tiene volante a la izquierda (conducido por un chofer profesional). ¿Quién debe ocupar cada uno de los asientos?",
    hint: "El asiento de honor es el trasero en diagonal opuesta al chofer. Tratándose de un Jefe de Estado, el asiento del copiloto (delante junto al chofer) se reserva siempre por seguridad.",
    explanation: "El asiento trasero derecho (diagonal al conductor) es el lugar de honor (Jefe de Estado visitante). El asiento trasero izquierdo (detrás del chofer) es para su cónyuge o el primer miembro de su comitiva. El asiento delantero derecho (copiloto) siempre es para el Jefe de Seguridad del mandatario, nunca para asesores ni traductores.",
    itemsToPlace: [
      { id: "chofer", name: "Chofer Profesional", role: "Conductor asignado por el Estado receptor", gender: "neutral", delegation: "other" },
      { id: "jefe_estado", name: "Presidente de Francia", role: "Invitado de Honor (Máximo Rango)", gender: "M", delegation: "IH" },
      { id: "conyuge", name: "Primera Dama de Francia", role: "Cónyuge del Invitado de Honor", gender: "F", delegation: "IH" },
      { id: "seguridad", name: "Jefe de Seguridad", role: "Encargado de la seguridad inmediata", gender: "neutral", delegation: "other" }
    ],
    positions: [
      { id: "pos_driver", name: "Asiento del Conductor", description: "Conduce el automóvil (Lado Izquierdo)", correctItemId: "chofer" },
      { id: "pos_front_right", name: "Asiento Delantero Derecho", description: "Copiloto, junto al conductor", correctItemId: "seguridad" },
      { id: "pos_back_left", name: "Asiento Trasero Izquierdo", description: "Detrás del conductor", correctItemId: "conyuge" },
      { id: "pos_back_right", name: "Asiento Trasero Derecho (Honor)", description: "Diagonal opuesta al conductor", correctItemId: "jefe_estado" }
    ],
    correctOrder: ["chofer", "seguridad", "conyuge", "jefe_estado"]
  },
  {
    id: "sc_estrado",
    title: "2. Ordenación de Presídium Impar",
    description: "Ubica a cinco personalidades en un estrado de honor para presenciar un desfile militar, aplicando la regla de alternancia a partir del centro.",
    type: "estrado",
    context: "Debes ubicar en un estrado de 5 asientos (impar) a las siguientes autoridades: la Presidenta Anfitriona (A), el Primer Ministro Invitado (IH - 1º en precedencia), el Canciller Anfitrión (2º), el Embajador de la delegación visitante (3º) y el Secretario de Defensa (4º).",
    hint: "La persona anfitriona ocupa el centro. El primer lugar en precedencia (Invitado de Honor) va a su derecha (que es la izquierda desde el punto de vista del observador que mira de frente). El segundo lugar va a su izquierda, y se continúa alternando.",
    explanation: "En un estrado con asientos impares, el anfitrión se sienta en el centro (Posición 3). A su derecha (Posición 2, izquierda del espectador) se sienta el Invitado de Honor. A su izquierda (Posición 4, derecha del espectador) se sienta el segundo en rango. El tercero se sienta a la extrema derecha del anfitrión (Posición 1) y el cuarto a la extrema izquierda (Posición 5).",
    itemsToPlace: [
      { id: "sec_defensa", name: "Gral. Secretario de Defensa", role: "4º en Precedencia", gender: "M", delegation: "A" },
      { id: "invitado_honor", name: "Primer Ministro de Japón", role: "1º en Precedencia (Invitado de Honor)", gender: "M", delegation: "IH" },
      { id: "anfitrion", name: "Presidenta de México", role: "Anfitriona del Evento (Centro)", gender: "F", delegation: "A" },
      { id: "canciller", name: "Canciller Federal", role: "2º en Precedencia", gender: "M", delegation: "A" },
      { id: "embajador", name: "Embajador de Japón", role: "3º en Precedencia", gender: "M", delegation: "IH" }
    ],
    positions: [
      { id: "pos_est_1", name: "Extrema Izquierda (Vista Frente)", description: "Lugar 3º de precedencia (Extrema derecha protocolaria)", correctItemId: "embajador" },
      { id: "pos_est_2", name: "Centro-Izquierda (Vista Frente)", description: "Lugar 1º de precedencia (Derecha protocolaria inmediata del centro)", correctItemId: "invitado_honor" },
      { id: "pos_est_3", name: "Asiento Central", description: "Reservado para la persona Anfitriona", correctItemId: "anfitrion" },
      { id: "pos_est_4", name: "Centro-Derecha (Vista Frente)", description: "Lugar 2º de precedencia (Izquierda protocolaria inmediata del centro)", correctItemId: "canciller" },
      { id: "pos_est_5", name: "Extrema Derecha (Vista Frente)", description: "Lugar 4º de precedencia (Extrema izquierda protocolaria)", correctItemId: "sec_defensa" }
    ],
    correctOrder: ["embajador", "invitado_honor", "anfitrion", "canciller", "sec_defensa"]
  },
  {
    id: "sc_mesa_trabajo",
    title: "3. Mesa Rectangular Bilateral de Trabajo",
    description: "Ubica a los líderes y sus comitivas en una mesa de trabajo bilateral para iniciar negociaciones comerciales formales.",
    type: "mesa_trabajo",
    context: "Se celebra una sesión bilateral de trabajo entre la comitiva de México (Anfitriones) y la comitiva de Canadá (Invitados de Honor). Hay 6 participantes sentados frente a frente. ¿Cómo deben colocarse en el centro y a los costados de la mesa?",
    hint: "El anfitrión y el invitado de honor se sientan frente a frente en el centro de la mesa. Los miembros de sus respectivas comitivas los flanquean a derecha e izquierda alternadamente según su rango.",
    explanation: "En mesas de trabajo rectangulares bilaterales, el Anfitrión (A) y el Invitado de Honor (IH) se sientan frente a frente en el centro. Al lado derecho de la Presidenta Anfitriona se sienta su asesor de mayor rango (A1), y a su izquierda el de segundo rango (A2). Del mismo modo, el Primer Ministro de Canadá (IH) está flanqueado por sus respectivos asesores (IH1 a su derecha e IH2 a su izquierda) en espejo, permitiendo que las comitivas se apoyen de cerca.",
    itemsToPlace: [
      { id: "can_1", name: "Secretaria de Comercio (Canadá)", role: "Comitiva IH 1 (Sienta a derecha de su líder)", gender: "F", delegation: "IH" },
      { id: "mex_leader", name: "Presidenta de México (A)", role: "Anfitriona de la sesión", gender: "F", delegation: "A" },
      { id: "can_2", name: "Embajadora Canadiense (Canadá)", role: "Comitiva IH 2 (Sienta a izquierda de su líder)", gender: "F", delegation: "IH" },
      { id: "mex_1", name: "Secretario de Economía (México)", role: "Comitiva A 1 (Sienta a derecha de su líder)", gender: "M", delegation: "A" },
      { id: "can_leader", name: "Primer Ministro (Canadá)", role: "Invitado de Honor", gender: "M", delegation: "IH" },
      { id: "mex_2", name: "Director de Tratados (México)", role: "Comitiva A 2 (Sienta a izquierda de su líder)", gender: "M", delegation: "A" }
    ],
    positions: [
      { id: "pos_t_a1", name: "Lado Anfitrión - Derecha", description: "Flanco derecho de la Presidenta (A1)", correctItemId: "mex_1" },
      { id: "pos_t_ac", name: "Lado Anfitrión - Centro", description: "Lugar de la Presidenta de México (A)", correctItemId: "mex_leader" },
      { id: "pos_t_a2", name: "Lado Anfitrión - Izquierda", description: "Flanco izquierdo de la Presidenta (A2)", correctItemId: "mex_2" },
      { id: "pos_t_ih1", name: "Lado Invitado - Izquierda (Frente a A1)", description: "Flanco derecho del Primer Ministro (IH1)", correctItemId: "can_1" },
      { id: "pos_t_ihc", name: "Lado Invitado - Centro (Frente a AC)", description: "Lugar del Primer Ministro de Canadá (IH)", correctItemId: "can_leader" },
      { id: "pos_t_ih2", name: "Lado Invitado - Derecha (Frente a A2)", description: "Flanco izquierdo del Primer Ministro (IH2)", correctItemId: "can_2" }
    ],
    correctOrder: ["mex_1", "mex_leader", "mex_2", "can_1", "can_leader", "can_2"]
  },
  {
    id: "sc_mesa_social",
    title: "4. Banquete de Gala: Mesa Social Rectangular",
    description: "Distribuye un banquete social con el objetivo de integrar comitivas, alternando anfitriones e invitados.",
    type: "mesa_social",
    context: "Se organiza una cena de gala para celebrar la firma de un acuerdo cultural. A diferencia de las mesas de trabajo, en este banquete social el anfitrión (A) y el invitado de honor (IH) se sientan frente a frente, pero los miembros de las comitivas se deben intercalar para favorecer la conversación y la integración.",
    hint: "El anfitrión (A) y el invitado (IH) están frente a frente. A la derecha de A se sienta el 1º del invitado (IH1); a su izquierda, el 2º del invitado (IH2). A la derecha del invitado (IH) se sienta el 1º del anfitrión (A1); a su izquierda, el 2º del anfitrión (A2).",
    explanation: "En comidas y banquetes sociales se busca la integración de comitivas intercalándolas. El Anfitrión (A) se ubica frente al Invitado de Honor (IH). Para rendirle el máximo honor al invitado, la persona a la derecha de A es el miembro de mayor rango de la comitiva visitante (IH1) y a su izquierda el segundo (IH2). En espejo, a la derecha de IH se sienta el colaborador principal del anfitrión (A1) y a su izquierda el segundo colaborador (A2).",
    itemsToPlace: [
      { id: "soc_ih1", name: "Ministro de Cultura de España", role: "Invitado 1 (Sienta a derecha de A)", gender: "M", delegation: "IH" },
      { id: "soc_anfitrion", name: "Anfitrión (A)", role: "Anfitrión del banquete", gender: "M", delegation: "A" },
      { id: "soc_ih2", name: "Directora de Bellas Artes (España)", role: "Invitado 2 (Sienta a izquierda de A)", gender: "F", delegation: "IH" },
      { id: "soc_a1", name: "Secretaria de Cultura de México", role: "Anfitrión 1 (Sienta a derecha de IH)", gender: "F", delegation: "A" },
      { id: "soc_guest_of_honor", name: "Embajador de España (IH)", role: "Invitado de Honor", gender: "M", delegation: "IH" },
      { id: "soc_a2", name: "Director del INBAL (México)", role: "Anfitrión 2 (Sienta a izquierda de IH)", gender: "M", delegation: "A" }
    ],
    positions: [
      { id: "pos_s_ih1", name: "Asiento Derecha de Anfitrión", description: "Ocupado por el invitado de mayor rango (IH1)", correctItemId: "soc_ih1" },
      { id: "pos_s_a", name: "Asiento Central Anfitrión", description: "Ubicación del Anfitrión (A)", correctItemId: "soc_anfitrion" },
      { id: "pos_s_ih2", name: "Asiento Izquierda de Anfitrión", description: "Ocupado por el segundo invitado (IH2)", correctItemId: "soc_ih2" },
      { id: "pos_s_a1", name: "Asiento Derecha de Invitado Honor", description: "Frente a IH1, ocupado por el colaborador principal (A1)", correctItemId: "soc_a1" },
      { id: "pos_s_ih", name: "Asiento Central Invitado Honor", description: "Ubicación del Invitado de Honor (IH)", correctItemId: "soc_guest_of_honor" },
      { id: "pos_s_a2", name: "Asiento Izquierda de Invitado Honor", description: "Frente a IH2, ocupado por el segundo colaborador (A2)", correctItemId: "soc_a2" }
    ],
    correctOrder: ["soc_ih1", "soc_anfitrion", "soc_ih2", "soc_a1", "soc_guest_of_honor", "soc_a2"]
  }
];
