import React from "react";
import { UserProgress, Badge } from "../types";
import { 
  Award, 
  Flame, 
  CheckCircle, 
  Lock, 
  Landmark, 
  Car, 
  Users, 
  FileText, 
  ShieldAlert, 
  BookOpen, 
  Clock, 
  PartyPopper 
} from "lucide-react";

interface ProgressDashboardProps {
  progress: UserProgress;
  userName: string;
  resetProgress: () => void;
  setTab: (tab: string) => void;
}

export const BADGES: Badge[] = [
  {
    id: "badge_iniciado",
    name: "Diplomático Iniciado",
    description: "Has leído tu primer módulo de ceremonial oficial.",
    icon: "BookOpen",
    criteria: "Lee al menos 1 lección en la Biblioteca."
  },
  {
    id: "badge_caravana",
    name: "Maestro de Caravanas",
    description: "Has organizado correctamente la distribución de vehículos presidenciales.",
    icon: "Car",
    criteria: "Completa con éxito el Simulador de Vehículos."
  },
  {
    id: "badge_estrado",
    name: "Maestro de Estrados",
    description: "Ubicación impecable del presídium bajo la regla de alternancia.",
    icon: "Landmark",
    criteria: "Completa con éxito el Simulador de Estrados."
  },
  {
    id: "badge_mesas",
    name: "Experto en Banquetes",
    description: "Dominio de la integración y el trabajo bilateral en mesas de gala.",
    icon: "Users",
    criteria: "Completa las dos simulaciones de montaje de Mesas."
  },
  {
    id: "badge_viena",
    name: "Legislador de Viena",
    description: "Comprensión perfecta del articulado de la Convención de Viena de 1961.",
    icon: "FileText",
    criteria: "Obtén un puntaje de 3/3 en el Cuestionario de Marco Legal."
  },
  {
    id: "badge_consul",
    name: "Cónsul de Oro",
    description: "Lograste completar la totalidad del temario y todos los cuestionarios.",
    icon: "Award",
    criteria: "Lee las 4 lecciones y obtén un récord guardado en todos los cuestionarios."
  }
];

export default function ProgressDashboard({ progress, userName, resetProgress, setTab }: ProgressDashboardProps) {
  
  // Calculate unlocked badges based on actual progress
  const unlockedBadgeIds: string[] = [];

  // 1. Iniciado
  if (progress.readLessons.length >= 1) {
    unlockedBadgeIds.push("badge_iniciado");
  }
  // 2. Caravana
  if (progress.completedSimulations.includes("sc_vehiculo")) {
    unlockedBadgeIds.push("badge_caravana");
  }
  // 3. Estrados
  if (progress.completedSimulations.includes("sc_estrado")) {
    unlockedBadgeIds.push("badge_estrado");
  }
  // 4. Experto en mesas (both sc_mesa_trabajo and sc_mesa_social)
  if (progress.completedSimulations.includes("sc_mesa_trabajo") && progress.completedSimulations.includes("sc_mesa_social")) {
    unlockedBadgeIds.push("badge_mesas");
  }
  // 5. Legislador de Viena (100% on q_precedencia)
  const vienaQuizScore = progress.completedQuizzes["q_precedencia"];
  if (vienaQuizScore && vienaQuizScore.score === vienaQuizScore.total) {
    unlockedBadgeIds.push("badge_viena");
  }
  // 6. Cónsul de Oro (all 4 lessons read and all 3 quizzes completed)
  const completedAllQuizzes = Object.keys(progress.completedQuizzes).length >= 3;
  if (progress.readLessons.length >= 4 && completedAllQuizzes) {
    unlockedBadgeIds.push("badge_consul");
  }

  const badgeIconMap: Record<string, React.ComponentType<any>> = {
    BookOpen: BookOpen,
    Car: Car,
    Landmark: Landmark,
    Users: Users,
    FileText: FileText,
    Award: Award
  };

  const handleResetClick = () => {
    if (confirm("¿Estás seguro de que deseas restablecer todo tu progreso de estudio, rachas y medallas? Esta acción es irreversible.")) {
      resetProgress();
    }
  };

  // Stats summaries
  const readCount = progress.readLessons.length;
  const quizCount = Object.keys(progress.completedQuizzes).length;
  const simCount = progress.completedSimulations.length;

  const totalPossibleBadges = BADGES.length;
  const unlockedBadgesCount = unlockedBadgeIds.length;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Welcome & General progress */}
      <div className="bg-diplomatic-navy text-white rounded-none p-6 sm:p-8 border border-diplomatic-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-diplomatic-gold/5 rounded-full blur-3xl -z-10" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-diplomatic-accent font-sans text-xs font-bold tracking-widest uppercase">
              <Award className="w-5 h-5 text-diplomatic-gold" />
              Certificación de Competencias
            </div>
            <h1 className="font-serif text-3xl font-light tracking-wide text-diplomatic-cream">
              ¡Buen trabajo, {userName}!
            </h1>
            <p className="text-slate-300 text-sm max-w-xl leading-relaxed font-serif italic">
              Estás estudiando las directrices oficiales de la Dirección General de Protocolo. Sigue completando módulos prácticos para consolidar tu racha de estudio de ceremonial.
            </p>
          </div>

          <div className="bg-[#1A252F] border border-diplomatic-border rounded-none p-4 flex items-center gap-3.5 flex-shrink-0">
            <Flame className="w-10 h-10 text-amber-500 fill-amber-500 animate-pulse" />
            <div className="font-mono">
              <p className="text-slate-400 text-[10px] leading-tight">RACHA ACTUAL</p>
              <p className="text-2xl font-bold text-amber-500">{progress.streak} {progress.streak === 1 ? 'Día' : 'Días'}</p>
            </div>
          </div>
        </div>

        {/* Global Progress Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-700/60 font-mono text-xs">
          <div className="bg-white/5 p-3 rounded-none border border-slate-700/50">
            <p className="text-slate-400 text-[10px]">LECCIONES LEÍDAS</p>
            <p className="text-xl font-bold text-diplomatic-gold mt-1">{readCount} <span className="text-xs text-slate-500">/ 4</span></p>
          </div>
          <div className="bg-white/5 p-3 rounded-none border border-slate-700/50">
            <p className="text-slate-400 text-[10px]">CUESTIONARIOS</p>
            <p className="text-xl font-bold text-diplomatic-gold mt-1">{quizCount} <span className="text-xs text-slate-500">/ 3</span></p>
          </div>
          <div className="bg-white/5 p-3 rounded-none border border-slate-700/50">
            <p className="text-slate-400 text-[10px]">SIMULACIONES</p>
            <p className="text-xl font-bold text-diplomatic-gold mt-1">{simCount} <span className="text-xs text-slate-500">/ 4</span></p>
          </div>
          <div className="bg-white/5 p-3 rounded-none border border-slate-700/50">
            <p className="text-slate-400 text-[10px]">MEDALLAS GANADAS</p>
            <p className="text-xl font-bold text-diplomatic-gold mt-1">{unlockedBadgesCount} <span className="text-xs text-slate-500">/ {totalPossibleBadges}</span></p>
          </div>
        </div>
      </div>

      {/* Badges and Achievements Grid */}
      <div className="space-y-4">
        <h2 className="font-serif text-xl sm:text-2xl font-semibold text-diplomatic-navy flex items-center gap-2">
          <Award className="w-6 h-6 text-diplomatic-gold" />
          Medallero Cívico y Diplomas
        </h2>
        <p className="text-slate-600 text-sm font-serif italic">
          Cumple con los requisitos académicos del manual para desbloquear estas insignias de honor, que confirman tus habilidades en la organización de actos de alto nivel.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {BADGES.map((badge) => {
            const isUnlocked = unlockedBadgeIds.includes(badge.id);
            const Icon = badgeIconMap[badge.icon] || Award;

            return (
              <div 
                key={badge.id}
                className={`bg-white rounded-none border p-5 flex flex-col justify-between transition-all relative ${
                  isUnlocked 
                    ? "border-diplomatic-gold/60 bg-[#FDFCFA]" 
                    : "border-slate-200/80 bg-slate-50 opacity-65"
                }`}
              >
                {/* Lock icon overlay for locked badges */}
                {!isUnlocked && (
                  <div className="absolute top-4 right-4 bg-slate-100 p-1.5 rounded-none border border-slate-200 text-slate-400">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                )}

                {/* Unlocked marker */}
                {isUnlocked && (
                  <div className="absolute top-4 right-4 bg-emerald-50 text-emerald-800 border border-emerald-300 p-1 px-2 text-[9px] font-sans font-bold rounded-none flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-600" /> Desbloqueado
                  </div>
                )}

                <div>
                  <div className={`w-12 h-12 rounded-none flex items-center justify-center border mb-4 ${
                    isUnlocked 
                      ? "bg-diplomatic-navy text-[#A68F68] border-diplomatic-border" 
                      : "bg-slate-100 text-slate-400 border-slate-250"
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className={`font-serif text-base font-semibold ${isUnlocked ? "text-diplomatic-navy" : "text-slate-600"}`}>
                    {badge.name}
                  </h3>
                  <p className="text-slate-600 text-xs mt-1.5 leading-relaxed font-serif">
                    {badge.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-diplomatic-border/45 font-sans text-[10px] uppercase tracking-wider text-slate-500">
                  <span className="font-bold">Criterio:</span> {badge.criteria}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Graduation Banner if all badges are unlocked */}
      {unlockedBadgesCount === totalPossibleBadges && (
        <div className="bg-emerald-50 border border-emerald-300 p-6 rounded-none flex flex-col sm:flex-row items-center gap-5 text-emerald-950 animate-pulse">
          <PartyPopper className="w-12 h-12 text-emerald-600 flex-shrink-0" />
          <div className="text-center sm:text-left space-y-1">
            <h3 className="font-serif text-lg font-bold text-emerald-900">¡Felicidades, Maestro/a de Ceremonias!</h3>
            <p className="text-xs text-emerald-700">
              Has desbloqueado todas las medallas de competencias y completado de forma perfecta todo el material de estudio y simuladores prácticos. Estás capacitado en el más alto orden protocolar del Estado.
            </p>
          </div>
        </div>
      )}

      {/* Reset progress and other actions */}
      <div className="pt-6 border-t border-diplomatic-border flex flex-col sm:flex-row items-center justify-between gap-4 font-serif text-sm">
        <p className="text-slate-500 italic">
          Plataforma de estudio autoevaluativa. Todos los datos se guardan de manera local.
        </p>
        <button
          onClick={handleResetClick}
          className="px-4 py-2 text-rose-600 hover:text-white hover:bg-rose-600 border border-rose-300 hover:border-rose-600 rounded-none font-sans font-bold uppercase tracking-wider transition text-xs cursor-pointer bg-white"
        >
          Restablecer Todo el Progreso
        </button>
      </div>
    </div>
  );
}
