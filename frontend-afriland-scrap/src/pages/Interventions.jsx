import { useState } from "react";
import { interventions as allInterventions } from "../data/mockData";
import { Badge, SnCode, BtnPrimary, BtnGhost, Card, PageHeader } from "../components/ui";
import { ModalDiagnostic } from "../components/modals/ActionModals";

export default function Interventions({ navigate }) {
  const [filter, setFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [interventions, setInterventions] = useState(allInterventions);

  const filtered = interventions.filter(i =>
    !filter || i.statut === filter || i.type === filter || i.niveau === filter
  );

  return (
    <div>
      <PageHeader
        title="Interventions — Diagnostics & Maintenances"
        subtitle={`${interventions.length} interventions enregistrées`}
        actions={
          <>
            <BtnGhost>⬇ Exporter</BtnGhost>
            <BtnPrimary onClick={() => setShowModal(true)}>+ Nouveau diagnostic</BtnPrimary>
          </>
        }
      />

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label: "Total interventions", val: interventions.length, color: "text-slate-800" },
          { label: "En cours", val: interventions.filter(i => i.statut === "En cours").length, color: "text-amber-600" },
          { label: "Résolues", val: interventions.filter(i => i.statut === "Résolu").length, color: "text-green-600" },
          { label: "Clôturées (rebut)", val: interventions.filter(i => i.statut === "Clôturé").length, color: "text-slate-500" },
        ].map((s, i) => (
          <Card key={i} className="p-4">
            <p className="text-xs text-slate-400 mb-1">{s.label}</p>
            <p className={`text-2xl font-semibold ${s.color}`}>{s.val}</p>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {["", "En cours", "Résolu", "Clôturé", "Critique", "Mineur"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${
              filter === f
                ? "bg-red-700 text-white border-red-700"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}>
            {f || "Tout afficher"}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map(item => (
          <Card key={item.id} className="p-4 hover:border-slate-300 transition-colors cursor-pointer">
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${
                item.type === "Rebut" ? "bg-red-50" : item.niveau === "Critique" ? "bg-orange-50" : "bg-amber-50"
              }`}>
                {item.type === "Rebut" ? "🗑" : item.type === "Maintenance" ? "🔧" : "🔍"}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-slate-800">{item.equipementNom}</span>
                      <SnCode value={item.equipementSn} />
                    </div>
                    <p className="text-xs text-slate-500 mb-2">{item.description}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge statut={item.statut} />
                      <Badge statut={item.niveau} />
                      <span className="text-[10px] text-slate-400">Type: {item.type}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-slate-400 mb-1">{item.date}</p>
                    <p className="text-[11px] text-slate-500">Agent : {item.agent}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 shrink-0">
                <BtnGhost onClick={() => navigate("fiche", item.equipementSn.replace("SN-", ""))}>Voir fiche</BtnGhost>
                {item.statut === "En cours" && (
                  <BtnPrimary onClick={() => {}}>Clôturer</BtnPrimary>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <ModalDiagnostic open={showModal} onClose={() => setShowModal(false)} equipement={null} />
    </div>
  );
}
