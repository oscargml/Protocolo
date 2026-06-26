import React from "react";
import { scenarios } from "../data/scenarios";
import { SeatingScenario, PlacementItem, UserProgress } from "../types";
import { 
  Compass, 
  HelpCircle, 
  Sparkles, 
  RotateCcw, 
  Check, 
  X, 
  Award, 
  Lightbulb, 
  Shield, 
  Car, 
  ArrowRight, 
  Users 
} from "lucide-react";

interface SimulatorViewProps {
  progress: UserProgress;
  saveSimulationSuccess: (scenarioId: string) => void;
  setTab: (tab: string) => void;
  initialScenarioId?: string;
}

export default function SimulatorView({ progress, saveSimulationSuccess, setTab, initialScenarioId }: SimulatorViewProps) {
  const [selectedScenarioId, setSelectedScenarioId] = React.useState<string | null>(initialScenarioId || null);
  
  // Simulation states
  const [selectedItem, setSelectedItem] = React.useState<PlacementItem | null>(null);
  const [seatAssignments, setSeatAssignments] = React.useState<Record<string, PlacementItem>>({}); // positionId -> PlacementItem
  const [showHint, setShowHint] = React.useState(false);
  const [checkResult, setCheckResult] = React.useState<{ checked: boolean; isCorrect: boolean; incorrectPositions: string[] } | null>(null);
  const [unplacedItems, setUnplacedItems] = React.useState<PlacementItem[]>([]);
  const [validationError, setValidationError] = React.useState<string | null>(null);

  // Sync state if initialScenarioId changes
  React.useEffect(() => {
    if (initialScenarioId) {
      setSelectedScenarioId(initialScenarioId);
    }
  }, [initialScenarioId]);

  const activeScenario = scenarios.find((s) => s.id === selectedScenarioId);

  // Initialize/Reset simulation states whenever active scenario changes
  React.useEffect(() => {
    if (activeScenario) {
      setSeatAssignments({});
      setSelectedItem(null);
      setShowHint(false);
      setCheckResult(null);
      setUnplacedItems([...activeScenario.itemsToPlace]);
      setValidationError(null);
    }
  }, [selectedScenarioId, activeScenario]);

  const handleSelectScenario = (id: string) => {
    setSelectedScenarioId(id);
  };

  const handleSelectCandidate = (item: PlacementItem) => {
    if (checkResult?.isCorrect) return; // Locked on success
    setSelectedItem(selectedItem?.id === item.id ? null : item);
  };

  const handleSeatClick = (positionId: string) => {
    if (checkResult?.isCorrect) return; // Locked on success

    const existingAssignment = seatAssignments[positionId];

    // If an item was selected, assign it to this seat
    if (selectedItem) {
      // If the seat is already occupied, return the occupied item back to unplaced
      const updatedUnplaced = [...unplacedItems];
      if (existingAssignment) {
        updatedUnplaced.push(existingAssignment);
      }

      // Remove newly placed item from unplaced list
      const finalUnplaced = updatedUnplaced.filter((i) => i.id !== selectedItem.id);

      setSeatAssignments({
        ...seatAssignments,
        [positionId]: selectedItem
      });
      setUnplacedItems(finalUnplaced);
      setSelectedItem(null);
      setCheckResult(null); // Clear previous error checks
      setValidationError(null);
    } else if (existingAssignment) {
      // If no item selected but clicked on an occupied seat, remove/unassign it
      const finalUnplaced = [...unplacedItems, existingAssignment];
      const updatedAssignments = { ...seatAssignments };
      delete updatedAssignments[positionId];

      setSeatAssignments(updatedAssignments);
      setUnplacedItems(finalUnplaced);
      setCheckResult(null); // Clear previous error checks
      setValidationError(null);
    }
  };

  const handleCheckDistribution = () => {
    if (!activeScenario) return;

    let allSeatsFilled = true;
    let isCorrect = true;
    const incorrectPositions: string[] = [];

    activeScenario.positions.forEach((pos) => {
      const assignedItem = seatAssignments[pos.id];
      if (!assignedItem) {
        allSeatsFilled = false;
        isCorrect = false;
        incorrectPositions.push(pos.id);
      } else if (assignedItem.id !== pos.correctItemId) {
        isCorrect = false;
        incorrectPositions.push(pos.id);
      }
    });

    if (!allSeatsFilled) {
      setValidationError("Por favor, asigna personas a todos los puestos antes de revisar.");
      return;
    }
    setValidationError(null);

    setCheckResult({
      checked: true,
      isCorrect,
      incorrectPositions
    });

    if (isCorrect) {
      saveSimulationSuccess(activeScenario.id);
    }
  };

  const handleReset = () => {
    if (!activeScenario) return;
    setSeatAssignments({});
    setSelectedItem(null);
    setShowHint(false);
    setCheckResult(null);
    setUnplacedItems([...activeScenario.itemsToPlace]);
    setValidationError(null);
  };

  // If no scenario is selected, show list
  if (!activeScenario) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-3 py-4">
          <Compass className="w-12 h-12 text-diplomatic-gold mx-auto" />
          <h1 className="font-serif text-3xl text-diplomatic-navy tracking-wide font-light">
            Simuladores de Precedencia y Alineación
          </h1>
          <p className="text-slate-600 text-sm font-serif">
            Pon a prueba tu intuición espacial y legal. Organiza asientos en automóviles oficiales, tribunas cívicas y mesas de gala diplomáticas. Haz clic en las tarjetas e inicia tu entrenamiento táctico.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {scenarios.map((scenario) => {
            const isCompleted = progress.completedSimulations.includes(scenario.id);
            return (
              <div 
                key={scenario.id}
                className="bg-white rounded-none border border-diplomatic-border p-6 flex flex-col justify-between hover:bg-diplomatic-panel transition duration-250 cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 bg-diplomatic-navy text-diplomatic-accent text-[9px] font-sans tracking-widest uppercase font-semibold">
                      Tipo: {scenario.type.replace("_", " ")}
                    </span>
                    {isCompleted && (
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-300 text-xs font-mono font-bold px-2 py-0.5 rounded-none flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Completado
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-lg text-diplomatic-navy font-semibold leading-snug">
                    {scenario.title}
                  </h3>
                  <p className="text-slate-600 text-xs mt-2 leading-relaxed font-serif italic">
                    {scenario.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-diplomatic-border flex items-center justify-between">
                  <span className="text-[10px] uppercase font-sans tracking-widest text-slate-500">
                    {scenario.positions.length} Puestos a Asignar
                  </span>
                  <button
                    onClick={() => handleSelectScenario(scenario.id)}
                    className="px-4 py-2 bg-diplomatic-navy hover:bg-slate-850 text-diplomatic-accent text-xs font-sans font-bold tracking-widest uppercase rounded-none transition-all"
                  >
                    {isCompleted ? "Re-intentar" : "Iniciar Práctica"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Simulation Screen Header */}
      <div className="bg-white rounded-none border border-diplomatic-border p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button 
            onClick={() => setSelectedScenarioId(null)} 
            className="text-xs text-[#A68F68] font-sans font-bold tracking-wider uppercase hover:underline mb-1 flex items-center gap-1"
          >
            ← Volver al listado de simulaciones
          </button>
          <h2 className="font-serif text-2xl sm:text-3xl text-diplomatic-navy font-light tracking-wide">
            {activeScenario.title}
          </h2>
          <p className="text-sm text-slate-600 mt-2 font-serif italic max-w-xl leading-normal">
            {activeScenario.description}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-4 py-2.5 border border-diplomatic-border hover:bg-diplomatic-panel text-slate-700 rounded-none text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-1.5 transition bg-white cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            Reiniciar
          </button>
          <button
            onClick={() => setShowHint(!showHint)}
            className="px-4 py-2.5 border border-diplomatic-border hover:bg-diplomatic-panel text-[#A68F68] rounded-none text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-1.5 transition bg-white cursor-pointer"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            {showHint ? "Ocultar Pista" : "Ver Pista"}
          </button>
        </div>
      </div>

      {/* Main Simulation Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Candidates Panel (Left) */}
        <div className="lg:col-span-4 bg-white rounded-none border border-diplomatic-border p-6 space-y-4">
          <div className="border-b border-diplomatic-border pb-3">
            <h3 className="font-serif text-base text-diplomatic-navy font-semibold">
              Personalidades Disponibles
            </h3>
            <p className="text-[11px] text-slate-500 mt-1 font-serif italic">
              Haz clic en una persona para seleccionarla, luego haz clic en el puesto donde deseas ubicarla.
            </p>
          </div>

          {unplacedItems.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400 italic font-serif">
              Todas las personas han sido ubicadas. Revisa la distribución a la derecha.
            </div>
          ) : (
            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {unplacedItems.map((item) => {
                const isSelected = selectedItem?.id === item.id;
                let colorBorder = "border-diplomatic-border bg-white";
                let textRole = "text-slate-500";
                
                if (item.delegation === "A") {
                  colorBorder = isSelected ? "border-diplomatic-navy bg-diplomatic-panel" : "border-diplomatic-border bg-white hover:bg-diplomatic-panel/40";
                  textRole = "text-blue-800 font-bold";
                } else if (item.delegation === "IH") {
                  colorBorder = isSelected ? "border-diplomatic-gold bg-amber-50" : "border-diplomatic-border bg-white hover:bg-diplomatic-panel/40";
                  textRole = "text-amber-800 font-bold";
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectCandidate(item)}
                    className={`w-full text-left p-3.5 rounded-none border transition-all flex items-center justify-between gap-3 cursor-pointer ${colorBorder} ${
                      isSelected ? "ring-2 ring-diplomatic-navy scale-98 shadow-sm" : ""
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate font-serif">{item.name}</p>
                      <p className={`text-[9px] uppercase tracking-widest font-sans mt-0.5 ${textRole}`}>{item.role}</p>
                    </div>
                    {isSelected && (
                      <span className="w-2.5 h-2.5 rounded-none bg-diplomatic-gold animate-ping flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Hint Block if requested */}
          {showHint && (
            <div className="bg-diplomatic-panel border border-diplomatic-border p-5 rounded-none text-slate-800 text-xs leading-relaxed animate-fadeIn space-y-1.5">
              <p className="font-bold font-serif flex items-center gap-1 text-amber-900">
                <Lightbulb className="w-3.5 h-3.5 flex-shrink-0 text-diplomatic-gold" /> Consejos del Coordinador
              </p>
              <p>{activeScenario.hint}</p>
            </div>
          )}
        </div>

        {/* Visual Seating Stage (Right) */}
        <div className="lg:col-span-8 bg-white rounded-none border border-diplomatic-border p-6 sm:p-8 flex flex-col justify-between min-h-[480px]">
          
          {/* Instructions and Scenario contexts */}
          <div className="space-y-2 mb-6">
            <span className="px-2.5 py-1 bg-diplomatic-navy text-diplomatic-accent text-[9px] font-sans tracking-widest uppercase font-semibold">
              Contexto de la Misión
            </span>
            <p className="text-slate-700 text-sm leading-relaxed font-serif pt-1">
              {activeScenario.context}
            </p>
          </div>

          {/* Visual representations depend on Scenario type */}
          <div className="flex-1 flex items-center justify-center p-4 bg-diplomatic-panel/30 border border-diplomatic-border/40">
            
            {/* 1. VEHICLE VISUAL */}
            {activeScenario.type === "vehicle" && (
              <div className="w-full max-w-md bg-diplomatic-navy text-slate-200 rounded-none p-6 sm:p-8 border border-diplomatic-border relative my-4">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] font-sans tracking-widest text-[#A68F68] uppercase font-bold">PARABRISAS / FRENTE</div>
                
                <div className="grid grid-cols-2 gap-6 mt-4">
                  {activeScenario.positions.map((pos) => {
                    const assigned = seatAssignments[pos.id];
                    const isIncorrect = checkResult?.checked && checkResult.incorrectPositions.includes(pos.id);
                    const isCorrect = checkResult?.checked && !checkResult.incorrectPositions.includes(pos.id);

                    return (
                      <button
                        key={pos.id}
                        onClick={() => handleSeatClick(pos.id)}
                        className={`h-28 rounded-none border p-3 text-center flex flex-col justify-between transition-all relative cursor-pointer ${
                          isIncorrect 
                            ? "border-rose-600 bg-rose-950/40 text-rose-100" 
                            : isCorrect 
                            ? "border-emerald-600 bg-emerald-950/40 text-emerald-100" 
                            : assigned
                            ? "border-[#A68F68] bg-[#1A252F] text-white hover:bg-slate-800"
                            : selectedItem
                            ? "border-dashed border-[#A68F68]/85 bg-white/5 hover:bg-white/10 text-slate-400 animate-pulse"
                            : "border-dashed border-slate-600 bg-white/5 text-slate-500 hover:bg-white/10"
                        }`}
                      >
                        <div className="text-left">
                          <p className="text-[10px] font-bold tracking-wide text-slate-400 uppercase truncate">{pos.name}</p>
                          <p className="text-[8px] text-slate-500 font-mono leading-none mt-0.5 truncate">{pos.description}</p>
                        </div>

                        {assigned ? (
                          <div className="text-center font-sans">
                            <p className="text-xs font-bold truncate font-serif">{assigned.name}</p>
                            <p className="text-[9px] text-[#A68F68] uppercase font-sans mt-0.5 tracking-wider truncate font-semibold">{assigned.role.substring(0, 24)}...</p>
                          </div>
                        ) : (
                          <div className="text-center text-xs italic font-serif text-slate-500 py-1">
                            {selectedItem ? "Haga clic para colocar" : "Vacío"}
                          </div>
                        )}
                        
                        {/* Little helper indicators */}
                        {pos.id === "pos_back_right" && (
                          <span className="absolute bottom-1 right-2 bg-[#A68F68] text-white font-sans font-bold px-1.5 py-0.5 text-[7px] tracking-wider">HONOR</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2. ESTRADO VISUAL */}
            {activeScenario.type === "estrado" && (
              <div className="w-full max-w-xl bg-white border border-diplomatic-border rounded-none p-6 sm:p-8 flex flex-col items-center justify-center my-4 relative">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] font-sans font-bold text-[#A68F68] uppercase tracking-wider">TRIBUNA DE HONOR ELEVADA</div>
                
                {/* Horizontal chairs row */}
                <div className="grid grid-cols-5 gap-3 w-full mt-6">
                  {activeScenario.positions.map((pos) => {
                    const assigned = seatAssignments[pos.id];
                    const isIncorrect = checkResult?.checked && checkResult.incorrectPositions.includes(pos.id);
                    const isCorrect = checkResult?.checked && !checkResult.incorrectPositions.includes(pos.id);

                    return (
                      <button
                        key={pos.id}
                        onClick={() => handleSeatClick(pos.id)}
                        className={`h-32 rounded-none border p-2 text-center flex flex-col justify-between transition-all relative cursor-pointer ${
                          isIncorrect 
                            ? "border-rose-600 bg-rose-50 text-rose-950" 
                            : isCorrect 
                            ? "border-emerald-600 bg-emerald-50 text-emerald-950" 
                            : assigned
                            ? "border-diplomatic-navy bg-[#FDFCFA] text-slate-800"
                            : selectedItem
                            ? "border-dashed border-diplomatic-gold bg-amber-500/5 text-amber-800/60 animate-pulse"
                            : "border-dashed border-slate-300 bg-white text-slate-400"
                        }`}
                      >
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase leading-none truncate font-sans">{pos.name}</p>
                          <p className="text-[7px] text-slate-500 font-sans leading-none mt-1 truncate font-medium">{pos.description}</p>
                        </div>

                        {assigned ? (
                          <div className="text-center font-sans">
                            <p className="text-xs font-semibold text-slate-800 leading-tight font-serif">{assigned.name}</p>
                            <p className="text-[8px] text-[#A68F68] uppercase font-sans mt-1 font-bold leading-none">{assigned.role.substring(0, 15)}</p>
                          </div>
                        ) : (
                          <div className="text-center text-[10px] italic font-serif text-slate-400 py-1">
                            {selectedItem ? "Colocar" : "Vacío"}
                          </div>
                        )}

                        <span className="text-[9px] font-bold text-slate-400 font-sans mt-auto pt-1 border-t border-slate-150">
                          Silla {pos.id.slice(-1)}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="w-full h-6 bg-diplomatic-navy text-[#A68F68] font-sans text-[9px] tracking-widest flex items-center justify-center rounded-none mt-6 font-bold">
                  PÚBLICO Y PRENSA DE FRENTE
                </div>
              </div>
            )}

            {/* 3. MESA TRABAJO VISUAL */}
            {activeScenario.type === "mesa_trabajo" && (
              <div className="w-full max-w-2xl bg-white border border-diplomatic-border rounded-none p-6 sm:p-8 flex flex-col items-center my-4 relative font-serif">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] font-sans font-bold text-[#A68F68] uppercase tracking-wider">SESIÓN BILATERAL EN BLOQUE</div>
                
                <div className="w-full mt-6 flex flex-col gap-4 font-sans">
                  {/* Top Row: Anfitrión (Positions 0, 1, 2) */}
                  <div className="grid grid-cols-3 gap-4">
                    {activeScenario.positions.slice(0, 3).map((pos) => {
                      const assigned = seatAssignments[pos.id];
                      const isIncorrect = checkResult?.checked && checkResult.incorrectPositions.includes(pos.id);
                      const isCorrect = checkResult?.checked && !checkResult.incorrectPositions.includes(pos.id);

                      return (
                        <button
                          key={pos.id}
                          onClick={() => handleSeatClick(pos.id)}
                          className={`h-24 rounded-none border p-2 text-center flex flex-col justify-between transition-all relative cursor-pointer ${
                            isIncorrect 
                              ? "border-rose-600 bg-rose-50 text-rose-950" 
                              : isCorrect 
                              ? "border-emerald-600 bg-emerald-50 text-emerald-950" 
                              : assigned
                              ? "border-blue-700 bg-[#FDFCFA] text-slate-800"
                              : selectedItem
                              ? "border-dashed border-blue-300 bg-blue-50/20 text-blue-900 animate-pulse"
                              : "border-dashed border-slate-300 bg-white text-slate-450"
                          }`}
                        >
                          <p className="text-[9px] font-bold text-blue-800 uppercase leading-none truncate font-sans">{pos.name}</p>
                          {assigned ? (
                            <p className="text-xs font-semibold truncate font-serif">{assigned.name}</p>
                          ) : (
                            <p className="text-[10px] italic font-serif text-slate-400">{selectedItem ? "Ubicar" : "Silla"}</p>
                          )}
                          <p className="text-[7px] text-slate-500 font-sans leading-none truncate font-semibold">{pos.description}</p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Central Table */}
                  <div className="h-16 bg-[#1A252F] text-slate-200 rounded-none flex items-center justify-center font-serif text-xs font-bold tracking-widest border-y border-diplomatic-border shadow-sm">
                    MESA RECTANGULAR DE TRABAJO
                  </div>

                  {/* Bottom Row: Invitados (Positions 3, 4, 5) */}
                  <div className="grid grid-cols-3 gap-4">
                    {activeScenario.positions.slice(3, 6).map((pos) => {
                      const assigned = seatAssignments[pos.id];
                      const isIncorrect = checkResult?.checked && checkResult.incorrectPositions.includes(pos.id);
                      const isCorrect = checkResult?.checked && !checkResult.incorrectPositions.includes(pos.id);

                      return (
                        <button
                          key={pos.id}
                          onClick={() => handleSeatClick(pos.id)}
                          className={`h-24 rounded-none border p-2 text-center flex flex-col justify-between transition-all relative cursor-pointer ${
                            isIncorrect 
                              ? "border-rose-600 bg-rose-50 text-rose-950" 
                              : isCorrect 
                              ? "border-emerald-600 bg-emerald-50 text-emerald-950" 
                              : assigned
                              ? "border-amber-700 bg-[#FDFCFA] text-slate-800"
                              : selectedItem
                              ? "border-dashed border-amber-300 bg-amber-50/20 text-amber-900 animate-pulse"
                              : "border-dashed border-slate-300 bg-white text-slate-450"
                          }`}
                        >
                          <p className="text-[9px] font-bold text-amber-800 uppercase leading-none truncate font-sans">{pos.name}</p>
                          {assigned ? (
                            <p className="text-xs font-semibold truncate font-serif">{assigned.name}</p>
                          ) : (
                            <p className="text-[10px] italic font-serif text-slate-400">{selectedItem ? "Ubicar" : "Silla"}</p>
                          )}
                          <p className="text-[7px] text-slate-500 font-sans leading-none truncate font-semibold">{pos.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* 4. MESA SOCIAL VISUAL */}
            {activeScenario.type === "mesa_social" && (
              <div className="w-full max-w-2xl bg-white border border-diplomatic-border rounded-none p-6 sm:p-8 flex flex-col items-center my-4 relative font-serif">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] font-sans font-bold text-[#A68F68] uppercase tracking-wider">BANQUETE SOCIAL (COMITIVAS INTERCALADAS)</div>
                
                <div className="w-full mt-6 flex flex-col gap-4 font-sans">
                  {/* Top Row: Positions 0, 1, 2 */}
                  <div className="grid grid-cols-3 gap-4">
                    {activeScenario.positions.slice(0, 3).map((pos) => {
                      const assigned = seatAssignments[pos.id];
                      const isIncorrect = checkResult?.checked && checkResult.incorrectPositions.includes(pos.id);
                      const isCorrect = checkResult?.checked && !checkResult.incorrectPositions.includes(pos.id);

                      return (
                        <button
                          key={pos.id}
                          onClick={() => handleSeatClick(pos.id)}
                          className={`h-24 rounded-none border p-2 text-center flex flex-col justify-between transition-all relative cursor-pointer ${
                            isIncorrect 
                              ? "border-rose-600 bg-rose-50 text-rose-950" 
                              : isCorrect 
                              ? "border-emerald-600 bg-emerald-50 text-emerald-950" 
                              : assigned
                              ? "border-diplomatic-gold bg-[#FDFCFA] text-slate-800"
                              : selectedItem
                              ? "border-dashed border-diplomatic-gold bg-amber-50/20 text-amber-900 animate-pulse"
                              : "border-dashed border-slate-300 bg-white text-slate-450"
                          }`}
                        >
                          <p className="text-[9px] font-bold text-slate-400 uppercase leading-none truncate font-sans">{pos.name}</p>
                          {assigned ? (
                            <p className="text-xs font-semibold truncate font-serif">{assigned.name}</p>
                          ) : (
                            <p className="text-[10px] italic font-serif text-slate-400">{selectedItem ? "Ubicar" : "Silla"}</p>
                          )}
                          <p className="text-[7px] text-slate-500 font-sans leading-none truncate font-semibold">{pos.description}</p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Central Table representing Banquete */}
                  <div className="h-16 bg-diplomatic-panel text-slate-850 rounded-none flex items-center justify-center font-serif text-xs font-bold tracking-widest border-y border-diplomatic-border shadow-sm">
                    MESA DE GALA E INTEGRACIÓN
                  </div>

                  {/* Bottom Row: Positions 3, 4, 5 */}
                  <div className="grid grid-cols-3 gap-4">
                    {activeScenario.positions.slice(3, 6).map((pos) => {
                      const assigned = seatAssignments[pos.id];
                      const isIncorrect = checkResult?.checked && checkResult.incorrectPositions.includes(pos.id);
                      const isCorrect = checkResult?.checked && !checkResult.incorrectPositions.includes(pos.id);

                      return (
                        <button
                          key={pos.id}
                          onClick={() => handleSeatClick(pos.id)}
                          className={`h-24 rounded-none border p-2 text-center flex flex-col justify-between transition-all relative cursor-pointer ${
                            isIncorrect 
                              ? "border-rose-600 bg-rose-50 text-rose-950" 
                              : isCorrect 
                              ? "border-emerald-600 bg-emerald-50 text-emerald-950" 
                              : assigned
                              ? "border-diplomatic-gold bg-[#FDFCFA] text-slate-800"
                              : selectedItem
                              ? "border-dashed border-diplomatic-gold bg-amber-50/20 text-amber-900 animate-pulse"
                              : "border-dashed border-slate-300 bg-white text-slate-450"
                          }`}
                        >
                          <p className="text-[9px] font-bold text-slate-400 uppercase leading-none truncate font-sans">{pos.name}</p>
                          {assigned ? (
                            <p className="text-xs font-semibold truncate font-serif">{assigned.name}</p>
                          ) : (
                            <p className="text-[10px] italic font-serif text-slate-400">{selectedItem ? "Ubicar" : "Silla"}</p>
                          )}
                          <p className="text-[7px] text-slate-500 font-sans leading-none truncate font-semibold">{pos.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Validation Error Banner */}
          {validationError && (
            <div className="bg-rose-50 border border-rose-300 text-rose-950 px-4 py-3 rounded-none text-xs font-serif italic mt-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-none bg-rose-600 animate-pulse" />
              {validationError}
            </div>
          )}

          {/* Action Check Results panel */}
          <div className="pt-6 border-t border-diplomatic-border flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div className="text-left">
              {checkResult?.checked && (
                <div className="flex items-center gap-2">
                  {checkResult.isCorrect ? (
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-4 py-1.5 rounded-none flex items-center gap-1.5 font-serif">
                      <Check className="w-3.5 h-3.5 text-emerald-600" /> ¡Distribución Perfecta!
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-rose-800 bg-rose-50 border border-rose-300 px-4 py-1.5 rounded-none flex items-center gap-1.5 font-serif">
                      <X className="w-3.5 h-3.5 text-rose-600" /> Hay puestos incorrectos
                    </span>
                  )}
                </div>
              )}
              {!checkResult?.checked && (
                <p className="text-xs text-slate-600 font-serif italic">
                  Completa la distribución de todos los participantes y presiona "Revisar"
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={handleReset}
                className="px-4 py-2.5 border border-diplomatic-border hover:bg-diplomatic-panel text-slate-700 rounded-none text-xs font-sans font-bold uppercase tracking-wider transition bg-white cursor-pointer"
              >
                Reiniciar Todo
              </button>
              <button
                onClick={handleCheckDistribution}
                disabled={checkResult?.isCorrect}
                className={`px-5 py-2.5 rounded-none text-xs font-sans font-bold uppercase tracking-wider transition-all ${
                  checkResult?.isCorrect
                    ? "bg-diplomatic-panel text-slate-400 border border-diplomatic-border cursor-not-allowed shadow-none"
                    : "bg-diplomatic-navy hover:bg-slate-850 text-diplomatic-accent cursor-pointer"
                }`}
              >
                Revisar Distribución
              </button>
            </div>
          </div>

          {/* Correct Explanation Banner */}
          {checkResult?.checked && checkResult.isCorrect && (
            <div className="bg-diplomatic-navy text-slate-250 p-6 rounded-none border border-diplomatic-border mt-6 animate-fadeIn space-y-3">
              <div className="flex items-center gap-2 text-diplomatic-accent font-sans text-[10px] font-bold uppercase tracking-widest">
                <Sparkles className="w-4 h-4 text-diplomatic-gold animate-pulse" />
                Sustento Teórico del Alineamiento
              </div>
              <p className="text-sm leading-relaxed text-slate-300 font-serif italic">
                {activeScenario.explanation}
              </p>
              
              <div className="flex items-center justify-end pt-3">
                <button
                  onClick={() => setSelectedScenarioId(null)}
                  className="px-4 py-2 bg-[#A68F68] hover:bg-amber-600 text-slate-950 font-sans font-bold uppercase tracking-widest text-[10px] rounded-none transition-all flex items-center gap-1 cursor-pointer"
                >
                  Continuar a Otras Simulaciones
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
