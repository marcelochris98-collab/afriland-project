import { useState } from "react";
import { mouvements as allMouvements } from "../data/mockData";
import { Badge, SnCode, BtnPrimary, BtnGhost, Card, PageHeader } from "../components/ui";
import { ModalTransfert } from "../components/modals/ActionModals";

export default function Logistique({ navigate }) {
  const [mouvements] = useState(allMouvements);
  const [showTransfert, setShowTransfert] = useState(false);

  return (
    <div>
      <PageHeader
        title="Logistique — Mouvements inter-agences"
        subtitle={`${mouvements.length} transferts enregistrés`}
        actions={
          <>
            <BtnGhost>⬇ Exporter</BtnGhost>
            <BtnPrimary onClick={() => setShowTransfert(true)}>+ Nouveau transfert</BtnPrimary>
          </>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Transferts ce mois", val: mouvements.length, sub: "Tous statuts" },
          { label: "En transit", val: mouvements.filter(m => m.statut === "En transit").length, sub: "En attente de réception" },
          { label: "Validés", val: mouvements.filter(m => m.statut === "Validé").length, sub: "Reçus et confirmés" },
        ].map((s, i) => (
          <Card key={i} className="p-4">
            <p className="text-xs text-slate-400 mb-1">{s.label}</p>
            <p className="text-2xl font-semibold text-slate-800">{s.val}</p>
            <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>
          </Card>
        ))}
      </div>

      {/* Mouvements list */}
      <Card>
        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
          <p className="text-xs font-semibold text-slate-700">Historique des transferts</p>
          <BtnGhost>Filtrer</BtnGhost>
        </div>
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              {["ID", "Équipement", "Agence source", "", "Agence dest.", "Motif", "Agent", "Date", "Statut"].map((h, i) => (
                <th key={i} className="text-left text-[11px] font-medium text-slate-400 px-4 py-3 border-b border-slate-100">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mouvements.map(m => (
              <tr key={m.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                <td className="px-4 py-3 text-xs font-mono text-slate-400">{m.id}</td>
                <td className="px-4 py-3">
                  <p className="text-xs font-medium text-slate-800">{m.equipementNom}</p>
                  <SnCode value={m.equipementSn} />
                </td>
                <td className="px-4 py-3 text-xs font-medium text-slate-700">{m.agenceDepart}</td>
                <td className="px-4 py-3 text-red-600 text-base">→</td>
                <td className="px-4 py-3 text-xs font-medium text-slate-700">{m.agenceArrivee}</td>
                <td className="px-4 py-3 text-xs text-slate-500">{m.motif}</td>
                <td className="px-4 py-3 text-xs text-slate-500">{m.agent}</td>
                <td className="px-4 py-3 text-xs text-slate-400">{m.date}</td>
                <td className="px-4 py-3"><Badge statut={m.statut} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <ModalTransfert open={showTransfert} onClose={() => setShowTransfert(false)} equipement={null} />
    </div>
  );
}
