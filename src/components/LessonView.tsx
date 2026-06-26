import React from "react";
import { lessons } from "../data/lessons";
import { Lesson, UserProgress } from "../types";
import { 
  CheckCircle, 
  Check, 
  ChevronRight, 
  BookOpen, 
  Clock, 
  HelpCircle, 
  Shield, 
  Car, 
  UserCheck, 
  Users, 
  Sparkles, 
  Flag 
} from "lucide-react";
import { motion } from "motion/react";

interface LessonViewProps {
  progress: UserProgress;
  markLessonRead: (id: string) => void;
  startQuizByCategory: (category: string) => void;
  startSimulationByType: (type: string) => void;
}

export default function LessonView({ progress, markLessonRead, startQuizByCategory, startSimulationByType }: LessonViewProps) {
  const [activeLessonId, setActiveLessonId] = React.useState(lessons[0].id);
  const activeLesson = lessons.find((l) => l.id === activeLessonId) || lessons[0];

  const handleComplete = () => {
    markLessonRead(activeLesson.id);
  };

  const isCompleted = progress.readLessons.includes(activeLesson.id);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 h-full items-start">
      {/* Chapter List */}
      <div className="xl:col-span-4 bg-white rounded-none border border-diplomatic-border p-6 sticky top-24">
        <h2 className="font-serif text-lg font-light text-diplomatic-navy border-b border-diplomatic-border pb-3 mb-4 flex items-center gap-2 tracking-wide">
          <BookOpen className="w-5 h-5 text-diplomatic-gold" />
          Temario de la Unidad 2
        </h2>
        <div className="space-y-2">
          {lessons.map((lesson, idx) => {
            const isRead = progress.readLessons.includes(lesson.id);
            const isActive = activeLessonId === lesson.id;
            return (
              <button
                key={lesson.id}
                onClick={() => setActiveLessonId(lesson.id)}
                className={`w-full flex items-start gap-3 p-3.5 rounded-none text-left transition-all border-b border-transparent ${
                  isActive
                    ? "bg-diplomatic-panel border-l-4 border-diplomatic-navy pl-3 text-diplomatic-navy font-semibold"
                    : "hover:bg-diplomatic-panel/40 border-l-4 border-transparent pl-3 text-slate-700"
                }`}
              >
                <div className="mt-0.5">
                  {isRead ? (
                    <CheckCircle className="w-5 h-5 text-emerald-600 fill-emerald-500/10 flex-shrink-0" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-xs font-semibold text-slate-400 flex-shrink-0">
                      {idx + 1}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm leading-snug ${isActive ? "font-semibold text-diplomatic-navy" : "text-slate-700"}`}>
                    {lesson.title.substring(3)}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-400 font-mono">
                    <span className="capitalize">{lesson.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {lesson.readTime}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Quick links */}
        <div className="mt-6 pt-5 border-t border-diplomatic-border space-y-2 bg-diplomatic-panel p-4 rounded-none border border-diplomatic-border">
          <p className="text-[10px] font-bold text-diplomatic-gold font-sans tracking-widest uppercase">Accesos rápidos</p>
          <button 
            onClick={() => startQuizByCategory("Conceptos Básicos")}
            className="w-full flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-diplomatic-navy p-2 hover:bg-white border border-transparent hover:border-diplomatic-border transition duration-200"
          >
            <span>Cuestionario Teórico</span>
            <ChevronRight className="w-4 h-4 text-diplomatic-gold" />
          </button>
          <button 
            onClick={() => startSimulationByType("vehicle")}
            className="w-full flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-diplomatic-navy p-2 hover:bg-white border border-transparent hover:border-diplomatic-border transition duration-200"
          >
            <span>Simulador de Vehículos</span>
            <ChevronRight className="w-4 h-4 text-diplomatic-gold" />
          </button>
          <button 
            onClick={() => startSimulationByType("estrado")}
            className="w-full flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-diplomatic-navy p-2 hover:bg-white border border-transparent hover:border-diplomatic-border transition duration-200"
          >
            <span>Simulador de Estrados</span>
            <ChevronRight className="w-4 h-4 text-diplomatic-gold" />
          </button>
        </div>
      </div>

      {/* Chapter Reader */}
      <div className="xl:col-span-8 bg-white rounded-none border border-diplomatic-border p-8 sm:p-12">
        {/* Header */}
        <div className="border-b border-diplomatic-border pb-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-2.5 py-1 bg-diplomatic-navy text-diplomatic-accent text-[9px] font-sans tracking-widest uppercase font-semibold">
              Categoría: {activeLesson.category}
            </span>
            <span className="text-diplomatic-border">•</span>
            <span className="text-[11px] text-slate-500 flex items-center gap-1 font-mono uppercase tracking-wide">
              <Clock className="w-3.5 h-3.5 text-diplomatic-gold" /> Lectura de {activeLesson.readTime}
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-diplomatic-navy tracking-normal leading-[1.25] mt-1 font-light">
            {activeLesson.title}
          </h1>
          <p className="text-slate-700 text-base mt-4 font-serif italic leading-relaxed">
            {activeLesson.description}
          </p>
        </div>

        {/* Content sections */}
        <div className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          {activeLesson.sections.map((sec, idx) => (
            <div key={idx} className="space-y-4">
              {sec.title && (
                <h3 className="font-serif text-xl sm:text-2xl text-diplomatic-navy border-l-2 border-diplomatic-gold pl-4 font-light tracking-wide">
                  {sec.title}
                </h3>
              )}
              {sec.subtitle && (
                <span className="text-[#A68F68] font-sans text-xs uppercase tracking-[0.2em] block mb-1 italic font-semibold">
                  {sec.subtitle}
                </span>
              )}
              {sec.content && (
                <p className="whitespace-pre-line text-slate-800 leading-relaxed font-serif text-[15px]">
                  {sec.content}
                </p>
              )}

              {/* Highlight Quotes */}
              {sec.highlight && (
                <div className="bg-diplomatic-panel border-y border-diplomatic-border px-8 py-6 my-6 italic text-diplomatic-navy text-base font-serif relative">
                  <Sparkles className="absolute -top-3 right-6 w-6 h-6 text-diplomatic-gold/40" />
                  <p className="relative z-10">"{sec.highlight}"</p>
                </div>
              )}

              {/* Legal Articles */}
              {sec.viennaArticle && (
                <div className="bg-diplomatic-navy text-slate-100 font-serif text-sm p-6 rounded-none border border-diplomatic-border relative my-6">
                  <div className="absolute top-0 right-0 p-1 px-3 bg-diplomatic-gold text-slate-950 font-sans font-bold tracking-widest text-[9px] uppercase">
                    Viena 1961
                  </div>
                  <h4 className="text-diplomatic-accent font-bold mb-3 text-[15px] tracking-wide">
                    {sec.viennaArticle.num}
                  </h4>
                  <p className="whitespace-pre-line leading-relaxed text-slate-300 font-sans text-xs sm:text-sm">
                    {sec.viennaArticle.text}
                  </p>
                </div>
              )}

              {/* Bullet Points */}
              {sec.bulletPoints && (
                <ul className="space-y-2 mt-2">
                  {sec.bulletPoints.map((bp, bpIdx) => {
                    const isBoldLabel = bp.includes(":");
                    let text = bp;
                    let boldPart = "";
                    if (isBoldLabel) {
                      const split = bp.split(":");
                      boldPart = split[0] + ":";
                      text = split.slice(1).join(":");
                    }
                    return (
                      <li key={bpIdx} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-600">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-diplomatic-gold flex-shrink-0" />
                        <div>
                          {boldPart && <strong className="text-diplomatic-navy font-semibold">{boldPart}</strong>}
                          <span dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}

          {/* CUSTOM INLINE INTERACTIVE MODULES BASED ON THE READINGS */}
          
          {/* Lección 4 Vehicles Interactive Diagram */}
          {activeLesson.id === "l4_aplicacion_practica" && (
            <div className="mt-12 space-y-8 pt-8 border-t border-slate-100">
              <h3 className="font-serif text-xl font-bold text-diplomatic-navy flex items-center gap-2">
                <Car className="w-5.5 h-5.5 text-diplomatic-gold" />
                Infografía Interactiva: Distribución de Pasajeros
              </h3>
              
              {/* Car Cabin diagram */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-inner">
                <p className="text-xs text-slate-400 font-mono uppercase tracking-wider mb-4">ESQUEMA DE CABINA (Volante a la izquierda)</p>
                <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto bg-slate-900 text-white rounded-3xl p-6 relative border-4 border-slate-700 shadow-md">
                  <div className="col-span-2 text-center text-[10px] font-mono tracking-widest text-slate-500 mb-2">FRENTE DEL VEHÍCULO</div>
                  
                  {/* Front row */}
                  <div className="bg-slate-800 rounded-xl p-3 border border-slate-700 text-center relative group hover:border-diplomatic-gold transition">
                    <p className="text-xs font-semibold text-slate-300">Izquierda (Chofer)</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-1">Conductor asignado</p>
                  </div>
                  <div className="bg-slate-800 rounded-xl p-3 border border-slate-700 text-center relative group hover:border-diplomatic-gold transition">
                    <span className="absolute -top-1.5 -right-1.5 px-1 bg-amber-500 text-[8px] text-slate-950 font-bold rounded">SEGURIDAD</span>
                    <p className="text-xs font-semibold text-slate-300">Derecha (Copiloto)</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-1">Jefe de Seguridad inmediata (Visitas de Estado)</p>
                  </div>
                  
                  {/* Space representing rear seats divider */}
                  <div className="col-span-2 h-4 flex items-center justify-center font-mono text-[9px] text-slate-600">DIVISOR/RESPALDO</div>

                  {/* Rear row */}
                  <div className="bg-slate-800 rounded-xl p-3 border border-slate-700 text-center relative group hover:border-diplomatic-gold transition">
                    <span className="absolute -top-1.5 -left-1.5 px-1 bg-slate-600 text-[8px] text-slate-100 font-bold rounded">2º EN HONOR</span>
                    <p className="text-xs font-semibold text-slate-300">Trasero Izquierdo</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-1">Cónyuge o 1º de comitiva del invitado</p>
                  </div>
                  <div className="bg-diplomatic-navy rounded-xl p-3 border-2 border-diplomatic-gold text-center relative group shadow-md shadow-diplomatic-gold/10">
                    <span className="absolute -top-2 right-2 px-1.5 py-0.5 bg-diplomatic-gold text-[8px] text-slate-950 font-bold rounded tracking-widest uppercase">HONOR</span>
                    <p className="text-xs font-bold text-diplomatic-gold">Trasero Derecho</p>
                    <p className="text-[10px] text-slate-100 font-mono mt-1">Invitado de Honor (Diagonal opuesto al chofer)</p>
                  </div>
                </div>
              </div>

              {/* 9 Vehicle Caravana Diagram */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest font-mono">Composición Reglamentaria de la Caravana (México)</h4>
                <p className="text-sm text-slate-600">En las visitas de Estado en México, la caravana presidencial viaja en este orden preciso. Haz scroll o revisa los vehículos:</p>
                
                <div className="flex gap-3 overflow-x-auto pb-4 pt-1 snap-x scrollbar-thin">
                  {[
                    { num: 1, title: "Vehículo Guía", role: "Abre paso, marca la ruta segura y el ritmo." },
                    { num: 2, title: "Vehículo de Protocolo", role: "Dirección General de Protocolo (DGPRO). Atiende incidentes rápidos." },
                    { num: 3, title: "Vehículo de Seguridad", role: "Resguardo delantero para el coche principal." },
                    { num: 4, title: "Invitado de Honor", role: "Vehículo Principal. Viaja el mandatario extranjero en el asiento trasero derecho.", principal: true },
                    { num: 5, title: "Vehículo de Seguridad", role: "Resguardo trasero inmediato." },
                    { num: 6, title: "Equipo ETRI", role: "Equipo Táctico de Reacción Inmediata de élite." },
                    { num: 7, title: "Vehículo de Emergencia", role: "Seguimiento técnico y resguardo adicional." },
                    { num: 8, title: "Vehículos de Comitiva", role: "Transporte para cancilleres, ministros, secretarios y agregados." },
                    { num: 9, title: "Ambulancia Médica", role: "Asistencia médica especializada para cualquier eventualidad." }
                  ].map((car) => (
                    <div 
                      key={car.num} 
                      className={`min-w-[200px] flex-shrink-0 snap-start p-4 rounded-xl border ${
                        car.principal 
                          ? "bg-diplomatic-navy text-white border-diplomatic-gold shadow-md" 
                          : "bg-white border-slate-200 text-slate-800"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          car.principal ? "bg-diplomatic-gold text-slate-950" : "bg-slate-100 text-slate-500"
                        }`}>
                          Posición {car.num}
                        </span>
                        <Car className={`w-4 h-4 ${car.principal ? "text-diplomatic-gold" : "text-slate-400"}`} />
                      </div>
                      <h5 className={`font-serif text-sm font-bold ${car.principal ? "text-diplomatic-gold" : "text-diplomatic-navy"}`}>
                        {car.title}
                      </h5>
                      <p className="text-xs mt-1 text-slate-400 leading-normal font-sans">
                        {car.role}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Estrado Rules diagram */}
              <div className="space-y-4 border-t border-slate-100 pt-8">
                <h3 className="font-serif text-xl font-bold text-diplomatic-navy flex items-center gap-2">
                  <UserCheck className="w-5.5 h-5.5 text-diplomatic-gold" />
                  Orden de Estrados (Presídium)
                </h3>
                <p className="text-sm text-slate-600">
                  La regla de oro para estrados establece colocar a la persona anfitriona en el centro. A partir de allí, se ubica la precedencia alternando a la derecha e izquierda protocolarias (mirando al público).
                </p>

                {/* Odd diagram */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <p className="text-xs font-mono font-bold text-slate-400 tracking-wider mb-2">FÓRMULA IMPAR (5 personas)</p>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-center gap-1.5 sm:gap-3 bg-white p-4 rounded-lg shadow-sm border border-slate-100 font-mono text-xs text-center">
                      <div className="flex-1 p-2 bg-slate-100 rounded border border-slate-200">
                        <p className="font-bold">Embajador (3º)</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Extrema Izq.</p>
                      </div>
                      <div className="flex-1 p-2 bg-amber-500/10 text-amber-950 rounded border border-amber-300">
                        <p className="font-bold text-amber-700">Invitado de Honor (1º)</p>
                        <p className="text-[10px] text-amber-600 mt-0.5">Derecha de A</p>
                      </div>
                      <div className="flex-1 p-2 bg-diplomatic-navy text-diplomatic-gold rounded border border-diplomatic-gold font-serif">
                        <p className="font-bold">Anfitrión (A)</p>
                        <p className="text-[10px] text-slate-300 mt-0.5">CENTRO</p>
                      </div>
                      <div className="flex-1 p-2 bg-slate-100 rounded border border-slate-200">
                        <p className="font-bold">Canciller (2º)</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Izquierda de A</p>
                      </div>
                      <div className="flex-1 p-2 bg-slate-100 rounded border border-slate-200">
                        <p className="font-bold">Gral. Defensa (4º)</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Extrema Der.</p>
                      </div>
                    </div>
                    <p className="text-center text-[10px] font-mono text-slate-400 uppercase tracking-widest">PÚBLICO / ESPECTADORES DE FRENTE</p>
                  </div>
                </div>
              </div>

              {/* Table Seating layouts */}
              <div className="space-y-4 border-t border-slate-100 pt-8">
                <h3 className="font-serif text-xl font-bold text-diplomatic-navy flex items-center gap-2">
                  <Users className="w-5.5 h-5.5 text-diplomatic-gold" />
                  Montaje de Mesas: Reuniones de Trabajo vs. Actividades Sociales
                </h3>
                <p className="text-sm text-slate-600">
                  La diferencia de objetivos es crucial: en reuniones de trabajo se sientan **en bloque** para negociar de cerca, mientras que en banquetes sociales se busca la integración **intercalando** comitivas.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Bilateral work table */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
                    <div>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[9px] font-mono font-bold rounded"> TRABAJO BILATERAL </span>
                      <h5 className="font-serif text-sm font-bold text-diplomatic-navy mt-1.5">Estructura en Bloque</h5>
                      <p className="text-xs text-slate-500 mt-1">Los líderes se sientan de frente en el centro de la mesa, rodeados a los lados por sus propios asesores.</p>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-slate-100 mt-4 text-xs font-mono">
                      <div className="flex justify-between px-3 text-emerald-600">
                        <span>Canadá A1</span>
                        <span className="font-bold">Primer Min (IH)</span>
                        <span>Canadá A2</span>
                      </div>
                      <div className="h-6 my-2 bg-slate-200 rounded flex items-center justify-center text-[10px] text-slate-500 font-bold border-y border-slate-300">
                        MESA RECTANGULAR DE TRABAJO
                      </div>
                      <div className="flex justify-between px-3 text-blue-700">
                        <span>México A1</span>
                        <span className="font-bold">Presidenta (A)</span>
                        <span>México A2</span>
                      </div>
                    </div>
                  </div>

                  {/* Intercalated social table */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
                    <div>
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[9px] font-mono font-bold rounded"> BANQUETE SOCIAL </span>
                      <h5 className="font-serif text-sm font-bold text-diplomatic-navy mt-1.5">Estructura Intercalada (Espejo)</h5>
                      <p className="text-xs text-slate-500 mt-1">Los líderes se sientan de frente, pero sus comitivas se cruzan a los costados para facilitar la charla.</p>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-slate-100 mt-4 text-xs font-mono">
                      <div className="flex justify-between px-3">
                        <span className="text-blue-700">México A1</span>
                        <span className="font-bold text-emerald-700">Embajador (IH)</span>
                        <span className="text-blue-700">México A2</span>
                      </div>
                      <div className="h-6 my-2 bg-amber-500/10 rounded flex items-center justify-center text-[10px] text-amber-700 font-bold border-y border-amber-300">
                        CENA DE GALA / BANQUETE SOCIAL
                      </div>
                      <div className="flex justify-between px-3">
                        <span className="text-emerald-700">España IH1</span>
                        <span className="font-bold text-blue-700">Anfitrión (A)</span>
                        <span className="text-emerald-700">España IH2</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Completion area */}
        <div className="mt-12 pt-6 border-t border-diplomatic-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-slate-600 text-sm">
            {isCompleted ? (
              <div className="flex items-center gap-2 text-emerald-700 font-semibold font-serif">
                <Check className="w-5 h-5 bg-emerald-600 text-white rounded-none p-0.5" />
                ¡Has completado el estudio de esta lección!
              </div>
            ) : (
              <p className="font-serif">¿Terminaste de leer con atención el contenido?</p>
            )}
          </div>
          <button
            onClick={handleComplete}
            disabled={isCompleted}
            className={`px-8 py-4 font-sans text-xs uppercase tracking-widest transition-all rounded-none ${
              isCompleted
                ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-diplomatic-border"
                : "bg-diplomatic-navy text-diplomatic-accent hover:bg-slate-800 cursor-pointer font-bold shadow-sm"
            }`}
          >
            {isCompleted ? "Lección Completada" : "Marcar como Leída"}
          </button>
        </div>
      </div>
    </div>
  );
}
