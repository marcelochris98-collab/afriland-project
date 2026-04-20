// ─── BADGE ────────────────────────────────────────────────────────────────────
export function Badge({ statut }) {
  const map = {
    "En service":     "bg-green-100 text-green-800",
    "Au rebut":       "bg-red-100 text-red-800",
    "En maintenance": "bg-amber-100 text-amber-800",
    "En transit":     "bg-blue-100 text-blue-800",
    "Partiel":        "bg-slate-100 text-slate-600",
    "Actif":          "bg-green-100 text-green-800",
    "Inactif":        "bg-slate-100 text-slate-500",
    "Validé":         "bg-green-100 text-green-800",
    "En cours":       "bg-amber-100 text-amber-800",
    "Résolu":         "bg-blue-100 text-blue-800",
    "Clôturé":        "bg-slate-100 text-slate-600",
    "Critique":       "bg-red-100 text-red-800",
    "Mineur":         "bg-amber-100 text-amber-800",
    "Expiré":         "bg-red-100 text-red-700",
    "Bon":            "bg-green-100 text-green-800",
    "Usé":            "bg-amber-100 text-amber-800",
    "PC Fixe":        "bg-blue-50 text-blue-700",
    "PC Portable":    "bg-purple-50 text-purple-700",
    "Imprimante":     "bg-orange-50 text-orange-700",
    "Serveur":        "bg-slate-100 text-slate-700",
    "Écran":          "bg-teal-50 text-teal-700",
    "Admin IT":       "bg-red-50 text-red-700",
    "Technicien":     "bg-blue-50 text-blue-700",
    "Agent IT":       "bg-slate-100 text-slate-600",
  };
  const cls = map[statut] || "bg-slate-100 text-slate-600";
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${cls}`}>
      {statut}
    </span>
  );
}

// ─── BUTTON ───────────────────────────────────────────────────────────────────
export function BtnPrimary({ children, onClick, className = "", type = "button" }) {
  return (
    <button type={type} onClick={onClick}
      className={`inline-flex items-center gap-1.5 bg-red-700 hover:bg-red-800 text-white text-xs font-medium px-3.5 py-2 rounded-lg transition-colors ${className}`}>
      {children}
    </button>
  );
}

export function BtnGhost({ children, onClick, className = "", type = "button" }) {
  return (
    <button type={type} onClick={onClick}
      className={`inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium px-3.5 py-2 rounded-lg border border-slate-200 transition-colors ${className}`}>
      {children}
    </button>
  );
}

export function BtnDanger({ children, onClick, className = "" }) {
  return (
    <button onClick={onClick}
      className={`inline-flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-medium px-3.5 py-2 rounded-lg border border-red-200 transition-colors ${className}`}>
      {children}
    </button>
  );
}

// ─── INPUT / SELECT ───────────────────────────────────────────────────────────
export function Input({ label, type = "text", value, onChange, placeholder, className = "" }) {
  return (
    <div className={className}>
      {label && <label className="block text-xs font-medium text-slate-500 mb-1.5">{label}</label>}
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 placeholder-slate-400" />
    </div>
  );
}

export function Select({ label, value, onChange, children, className = "" }) {
  return (
    <div className={className}>
      {label && <label className="block text-xs font-medium text-slate-500 mb-1.5">{label}</label>}
      <select value={value} onChange={onChange}
        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400">
        {children}
      </select>
    </div>
  );
}

export function Textarea({ label, value, onChange, placeholder, rows = 3 }) {
  return (
    <div>
      {label && <label className="block text-xs font-medium text-slate-500 mb-1.5">{label}</label>}
      <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows}
        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 placeholder-slate-400 resize-none" />
    </div>
  );
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
export function Modal({ open, onClose, title, subtitle, icon, children, footer }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(15,23,42,0.55)" }} onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            {icon && <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-lg">{icon}</div>}
            <div>
              <div className="text-sm font-semibold text-slate-800">{title}</div>
              {subtitle && <div className="text-xs text-slate-400">{subtitle}</div>}
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-lg leading-none">&times;</button>
        </div>
        <div className="px-6 py-5 space-y-4">{children}</div>
        {footer && <div className="px-6 py-4 border-t border-slate-100 flex gap-2 justify-end">{footer}</div>}
      </div>
    </div>
  );
}

// ─── CARD ─────────────────────────────────────────────────────────────────────
export function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 ${className}`}>
      {children}
    </div>
  );
}

// ─── PAGE HEADER ──────────────────────────────────────────────────────────────
export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="flex items-start justify-between mb-5">
      <div>
        <h1 className="text-base font-semibold text-slate-800">{title}</h1>
        {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

// ─── TABLE ────────────────────────────────────────────────────────────────────
export function Table({ headers, children }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="text-left text-xs font-medium text-slate-400 px-4 py-3 border-b border-slate-200">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">{children}</tbody>
      </table>
    </div>
  );
}

export function Td({ children, className = "" }) {
  return <td className={`px-4 py-3 text-sm text-slate-700 ${className}`}>{children}</td>;
}

// ─── STATS KPI ────────────────────────────────────────────────────────────────
export function KpiCard({ label, value, sub, icon, iconBg, trend }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-400 mb-2">{label}</p>
          <p className="text-2xl font-semibold text-slate-800">{value}</p>
          {sub && <p className={`text-xs mt-1 ${trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-slate-400"}`}>{sub}</p>}
        </div>
        {icon && <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-base ${iconBg}`}>{icon}</div>}
      </div>
    </div>
  );
}

// ─── EMPTY STATE ──────────────────────────────────────────────────────────────
export function EmptyState({ icon, title, desc }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-4xl mb-3">{icon}</div>
      <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
      <p className="text-xs text-slate-400">{desc}</p>
    </div>
  );
}

// ─── SN CODE ──────────────────────────────────────────────────────────────────
export function SnCode({ value }) {
  return <span className="font-mono text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{value}</span>;
}

// ─── CONFIRM MODAL ────────────────────────────────────────────────────────────
export function ConfirmModal({ open, onClose, onConfirm, title, message, confirmLabel = "Confirmer", danger = false }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(15,23,42,0.55)" }} onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-sm p-6" onClick={e => e.stopPropagation()}>
        <div className="text-sm font-semibold text-slate-800 mb-2">{title}</div>
        <p className="text-xs text-slate-500 mb-5">{message}</p>
        <div className="flex gap-2 justify-end">
          <BtnGhost onClick={onClose}>Annuler</BtnGhost>
          {danger
            ? <BtnDanger onClick={onConfirm}>{confirmLabel}</BtnDanger>
            : <BtnPrimary onClick={onConfirm}>{confirmLabel}</BtnPrimary>
          }
        </div>
      </div>
    </div>
  );
}
