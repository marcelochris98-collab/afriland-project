import { KpiCard, Card, Badge, SnCode } from "../components/ui";

const activites = [
  { date: "15/06 09:41", sn: "SN-PC-00412", action: "Transfert inter-agence", agent: "P. Mbang", agence: "Akwa → Siège", statut: "Transféré" },
  { date: "15/06 08:20", sn: "SN-IMP-0091", action: "Mise en rebut", agent: "A. Kouam", agence: "Bonanjo", statut: "Au rebut" },
  { date: "14/06 16:55", sn: "SN-PC-00387", action: "Retour maintenance", agent: "C. Eba", agence: "Yaoundé", statut: "En service" },
  { date: "14/06 14:10", sn: "SN-PC-00401", action: "Envoi en maintenance", agent: "P. Mbang", agence: "Douala Bali", statut: "En maintenance" },
  { date: "14/06 11:30", sn: "SN-SRV-008", action: "Extraction RAM (cannibalisme)", agent: "A. Kouam", agence: "Siège Social", statut: "Partiel" },
];

const barData = [
  { label: "Siège", val: 214, max: 214 },
  { label: "Akwa", val: 156, max: 214 },
  { label: "Bonanjo", val: 120, max: 214 },
  { label: "Yaoundé", val: 98, max: 214 },
  { label: "Bafoussam", val: 74, max: 214 },
];

export default function Dashboard({ navigate }) {
  return (
    <div>
      {/* KPIs */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        <KpiCard label="Total équipements" value="1 247" sub="↑ 3.2% ce mois" trend="up" icon="🖥" iconBg="bg-blue-50" />
        <KpiCard label="En maintenance" value="84" sub="↑ 5 depuis hier" trend="down" icon="🔧" iconBg="bg-amber-50" />
        <KpiCard label="Au rebut" value="213" sub="17.1% du parc total" trend="down" icon="🗑" iconBg="bg-red-50" />
        <KpiCard label="Total agences" value="38" sub="↑ 2 nouvelles" trend="up" icon="🏦" iconBg="bg-green-50" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-2 gap-4 mb-4">

        {/* Donut */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-slate-700">Répartition par statut</p>
            <button className="text-xs text-red-600 hover:underline">Voir tout</button>
          </div>
          <div className="flex items-center gap-5">
            <svg width="110" height="110" viewBox="0 0 110 110">
              <circle cx="55" cy="55" r="38" fill="none" stroke="#F1F5F9" strokeWidth="18"/>
              <circle cx="55" cy="55" r="38" fill="none" stroke="#22C55E" strokeWidth="18"
                strokeDasharray="143 96" strokeDashoffset="-24" strokeLinecap="round"/>
              <circle cx="55" cy="55" r="38" fill="none" stroke="#F59E0B" strokeWidth="18"
                strokeDasharray="51 188" strokeDashoffset="-167" strokeLinecap="round"/>
              <circle cx="55" cy="55" r="38" fill="none" stroke="#C53030" strokeWidth="18"
                strokeDasharray="45 194" strokeDashoffset="-118" strokeLinecap="round"/>
              <text x="55" y="51" textAnchor="middle" fontSize="16" fontWeight="500" fill="#1E293B">950</text>
              <text x="55" y="63" textAnchor="middle" fontSize="10" fill="#94A3B8">en service</text>
            </svg>
            <div className="flex-1 space-y-2">
              {[
                { dot: "#22C55E", label: "En service", val: 950 },
                { dot: "#F59E0B", label: "En maintenance", val: 84 },
                { dot: "#C53030", label: "Au rebut", val: 213 },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: item.dot }}></span>
                  <span className="text-xs text-slate-500 flex-1">{item.label}</span>
                  <span className="text-xs font-medium text-slate-700">{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Bars */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-slate-700">Équipements par agence (top 5)</p>
            <button className="text-xs text-red-600 hover:underline">Détail</button>
          </div>
          <div className="space-y-2.5">
            {barData.map((b, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs text-slate-500 w-20 shrink-0">{b.label}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-2">
                  <div className="h-2 rounded-full bg-red-600" style={{ width: `${(b.val / b.max) * 100}%` }}></div>
                </div>
                <span className="text-xs font-medium text-slate-700 w-8 text-right">{b.val}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Activity */}
      <Card>
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
          <p className="text-xs font-semibold text-slate-700">Activités récentes</p>
          <button className="text-xs text-red-600 hover:underline">Journal complet</button>
        </div>
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              {["Date", "N° Série", "Action", "Agent", "Agence", "Statut"].map(h => (
                <th key={h} className="text-left text-[11px] font-medium text-slate-400 px-4 py-2.5 border-b border-slate-100">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {activites.map((a, i) => (
              <tr key={i} className="hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-0"
                onClick={() => navigate("parc")}>
                <td className="px-4 py-3 text-xs text-slate-400">{a.date}</td>
                <td className="px-4 py-3"><SnCode value={a.sn} /></td>
                <td className="px-4 py-3 text-xs text-slate-700">{a.action}</td>
                <td className="px-4 py-3 text-xs text-slate-600">{a.agent}</td>
                <td className="px-4 py-3 text-xs text-slate-500">{a.agence}</td>
                <td className="px-4 py-3"><Badge statut={a.statut} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
