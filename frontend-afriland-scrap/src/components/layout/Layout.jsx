import { useState } from "react";

const navItems = [
  { id: "dashboard",     label: "Dashboard",          icon: "◻" },
  { id: "parc",          label: "Parc informatique",  icon: "⊞" },
  { id: "interventions", label: "Interventions",       icon: "🔧" },
  { id: "logistique",    label: "Logistique",          icon: "⇄" },
  { id: "rapports",      label: "Rapports",            icon: "⊡" },
  { id: "parametres",    label: "Paramètres",          icon: "⚙" },
];

const titles = {
  dashboard:     "Tableau de bord",
  parc:          "Parc informatique",
  fiche:         "Fiche équipement",
  interventions: "Interventions",
  logistique:    "Logistique",
  rapports:      "Rapports",
  parametres:    "Paramètres",
};

export default function Layout({ currentPage, navigate, children }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const activePage = navItems.find(n => n.id === currentPage)?.id || currentPage;

  return (
    <div className="flex h-screen bg-[#F3F4F6] font-sans overflow-hidden">

      {/* ── SIDEBAR ── */}
      <aside className="w-56 min-w-[224px] flex flex-col" style={{ background: "#0F172A" }}>

        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 py-[18px] border-b border-white/10">
          <div className="w-8 h-8 rounded-lg bg-red-700 flex items-center justify-center text-white font-bold text-sm shrink-0">A</div>
          <div>
            <p className="text-white text-xs font-semibold leading-tight">Afriland Scrap</p>
            <p className="text-white/40 text-[10px]">IT Asset Management</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-3">
          <p className="text-white/30 text-[10px] uppercase tracking-widest px-2 pb-1.5 pt-2">Menu principal</p>
          {navItems.map(item => {
            const isActive = currentPage === item.id || (item.id === "parc" && currentPage === "fiche");
            return (
              <button key={item.id} onClick={() => navigate(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs mb-0.5 transition-colors ${
                  isActive
                    ? "bg-red-700 text-white font-medium"
                    : "text-white/60 hover:bg-white/8 hover:text-white"
                }`}>
                <span className="text-sm w-4 text-center">{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* User */}
        <div className="px-4 py-3 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-red-700 flex items-center justify-center text-white text-[10px] font-semibold shrink-0">AK</div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-[11px] font-medium truncate">Armel Kouam</p>
              <p className="text-white/40 text-[10px]">Admin IT</p>
            </div>
            <button className="text-white/30 hover:text-white/60 text-xs">⏏</button>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar */}
        <header className="bg-white border-b border-slate-200 h-[52px] flex items-center gap-3 px-5 shrink-0">
          <h1 className="flex-1 text-sm font-semibold text-slate-800">{titles[currentPage] || "—"}</h1>

          {/* Search */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-400 cursor-text w-52">
            <span>🔍</span> Rechercher S/N ou QR...
          </div>

          {/* Notifs */}
          <div className="relative">
            <button onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
              className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-sm hover:bg-slate-50 relative">
              🔔
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-600 rounded-full"></span>
            </button>
            {notifOpen && (
              <div className="absolute right-0 top-10 w-72 bg-white rounded-xl border border-slate-200 shadow-xl z-40 p-3">
                <p className="text-xs font-semibold text-slate-700 mb-2 px-1">Notifications</p>
                {[
                  { icon: "🔴", msg: "HP LaserJet 4015 mis au rebut", time: "Il y a 2h" },
                  { icon: "🔧", msg: "Dell OptiPlex 7090 — diagnostic créé", time: "Il y a 5h" },
                  { icon: "⇄",  msg: "Transfert Akwa → Siège validé", time: "Hier" },
                ].map((n, i) => (
                  <div key={i} className="flex items-start gap-2 px-2 py-2 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <span className="text-sm mt-0.5">{n.icon}</span>
                    <div className="flex-1">
                      <p className="text-xs text-slate-700">{n.msg}</p>
                      <p className="text-[10px] text-slate-400">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
              className="w-8 h-8 rounded-full bg-red-700 flex items-center justify-center text-white text-[11px] font-semibold hover:bg-red-800 transition-colors">
              AK
            </button>
            {profileOpen && (
              <div className="absolute right-0 top-10 w-48 bg-white rounded-xl border border-slate-200 shadow-xl z-40 p-1.5">
                <div className="px-3 py-2 border-b border-slate-100 mb-1">
                  <p className="text-xs font-semibold text-slate-700">Armel Kouam</p>
                  <p className="text-[10px] text-slate-400">Admin IT</p>
                </div>
                <button onClick={() => { navigate("parametres"); setProfileOpen(false); }}
                  className="w-full text-left text-xs text-slate-600 hover:bg-slate-50 px-3 py-2 rounded-lg">⚙ Paramètres</button>
                <button className="w-full text-left text-xs text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg">⏏ Déconnexion</button>
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-5">
          {children}
        </main>
      </div>
    </div>
  );
}
