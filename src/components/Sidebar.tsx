import React from "react";
import { 
  BookOpen, 
  Award, 
  Compass, 
  HelpCircle, 
  LogOut, 
  Menu, 
  X, 
  Flame, 
  GraduationCap, 
  CheckCircle2, 
  User 
} from "lucide-react";
import { UserProgress } from "../types";

interface SidebarProps {
  currentTab: string;
  setTab: (tab: string) => void;
  progress: UserProgress;
  userName: string;
  setUserName: (name: string) => void;
}

export default function Sidebar({ currentTab, setTab, progress, userName, setUserName }: SidebarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isEditingName, setIsEditingName] = React.useState(false);
  const [tempName, setTempName] = React.useState(userName);

  const menuItems = [
    { id: "lessons", label: "Biblioteca de Lectura", icon: BookOpen, desc: "Material oficial estructurado" },
    { id: "simulators", label: "Simuladores de Mesa", icon: Compass, desc: "Alineación y precedencia" },
    { id: "quizzes", label: "Cuestionarios Prácticos", icon: HelpCircle, desc: "Evaluación interactiva" },
    { id: "progress", label: "Mi Progreso y Medallas", icon: Award, desc: "Logros y estadísticas" },
  ];

  const totalLessons = 4;
  const completedLessons = progress.readLessons.length;
  const lessonPercent = Math.round((completedLessons / totalLessons) * 100);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      setUserName(tempName.trim());
      setIsEditingName(false);
    }
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <header className="lg:hidden w-full h-16 bg-diplomatic-cream text-diplomatic-dark flex items-center justify-between px-4 z-40 fixed top-0 border-b border-diplomatic-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-diplomatic-navy flex items-center justify-center rounded-sm rotate-45 mr-1">
            <GraduationCap className="w-4 h-4 text-diplomatic-accent -rotate-45" />
          </div>
          <span className="font-serif font-light text-lg tracking-wider text-diplomatic-dark uppercase">
            Protocolo
          </span>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="p-1 rounded-md text-diplomatic-navy hover:text-diplomatic-gold"
          id="mobile_menu_button"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Backdrop for mobile menu */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-30 lg:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-full w-72 bg-diplomatic-cream text-diplomatic-dark flex flex-col z-30 transition-transform duration-300 ease-in-out border-r border-diplomatic-border
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        pt-16 lg:pt-0
      `}>
        {/* Brand Header */}
        <div className="hidden lg:flex flex-col items-center justify-center py-8 border-b border-diplomatic-border px-6">
          <div className="w-10 h-10 bg-diplomatic-navy flex items-center justify-center rounded-sm rotate-45 mb-4 shadow-sm">
            <GraduationCap className="w-5 h-5 text-diplomatic-accent -rotate-45" />
          </div>
          <h1 className="font-serif text-lg tracking-[0.15em] uppercase text-center text-diplomatic-dark leading-tight font-light">
            Academia de Protocolo
          </h1>
          <p className="text-[9px] tracking-[0.2em] font-sans text-diplomatic-gold mt-1.5 uppercase font-semibold">
            Y Ceremonial Diplomático
          </p>
        </div>

        {/* User Card */}
        <div className="px-6 py-5 border-b border-diplomatic-border bg-diplomatic-panel">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-diplomatic-navy/10 border border-diplomatic-border flex items-center justify-center text-diplomatic-navy">
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1 overflow-hidden">
              {isEditingName ? (
                <form onSubmit={handleSaveName} className="flex gap-1">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="w-full text-xs px-2 py-1 bg-white text-diplomatic-dark rounded border border-diplomatic-border focus:outline-none focus:border-diplomatic-navy"
                    autoFocus
                  />
                  <button type="submit" className="text-xs text-diplomatic-gold font-bold px-1 hover:text-diplomatic-dark">✓</button>
                </form>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold truncate text-diplomatic-dark font-serif">
                    {userName}
                  </span>
                  <button 
                    onClick={() => setIsEditingName(true)} 
                    className="text-[10px] text-diplomatic-gold hover:underline ml-1"
                  >
                    Editar
                  </button>
                </div>
              )}
              <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-600 font-mono">
                <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                <span>Racha: <strong className="text-amber-700">{progress.streak} {progress.streak === 1 ? 'día' : 'días'}</strong></span>
              </div>
            </div>
          </div>

          {/* Core progress tracker bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1 font-mono text-slate-500">
              <span>Curso completado</span>
              <span>{lessonPercent}%</span>
            </div>
            <div className="w-full bg-[#D4C5B3] rounded-full h-[3px] overflow-hidden">
              <div 
                className="bg-diplomatic-navy h-full transition-all duration-500" 
                style={{ width: `${lessonPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto bg-diplomatic-cream">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setTab(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-md transition-all duration-200 text-left relative ${
                  isActive 
                    ? "bg-diplomatic-navy text-diplomatic-accent font-medium shadow-sm" 
                    : "text-slate-700 hover:bg-diplomatic-panel hover:text-diplomatic-dark"
                }`}
              >
                <IconComponent className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-diplomatic-accent" : "text-diplomatic-navy"}`} />
                <div className="overflow-hidden">
                  <p className={`text-xs uppercase tracking-wider font-semibold font-sans ${isActive ? "text-white" : "text-diplomatic-dark"}`}>{item.label}</p>
                  <p className={`text-[10px] mt-0.5 leading-none ${isActive ? "text-slate-300 italic" : "text-slate-500"}`}>{item.desc}</p>
                </div>
                {item.id === "lessons" && completedLessons > 0 && (
                  <span className="absolute right-3 top-3.5 flex items-center justify-center">
                    <CheckCircle2 className={`w-4 h-4 ${isActive ? "text-diplomatic-accent" : "text-emerald-600 fill-emerald-500/10"}`} />
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Legal Footer */}
        <div className="p-4 border-t border-diplomatic-border bg-diplomatic-panel text-center">
          <p className="text-[10px] text-slate-600 font-mono tracking-wider uppercase">
            México, 2026 • Convenio de Viena 1961
          </p>
          <p className="text-[9px] text-slate-500 mt-0.5 italic font-serif">
            Basado en las Directrices de la DGPRO
          </p>
        </div>
      </aside>
    </>
  );
}
