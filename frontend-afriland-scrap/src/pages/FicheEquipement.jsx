import { useState } from "react";
import { equipements, composants as allComposants, historique as allHistorique } from "../data/mockData";
import { Badge, SnCode, BtnPrimary, BtnGhost, Card } from "../components/ui";
import { ModalDiagnostic, ModalTransfert, ModalAjoutComposant, ModalExtractionComposant } from "../components/modals/ActionModals";

const typeColors = {
  transfer:   { dot: "bg-blue-500", label: "Transfert" },
  maintenance: { dot: "bg-amber-500", label: "Maintenance" },
  panne:      { dot: "bg-orange-500", label: "Panne" },
  cannibal:   { dot: "bg-slate-400", label: "Extraction" },
  init:       { dot: "bg-green-500", label: "Initialisation" },
};

export default function FicheEquipement({ id, navigate }) {
  const eq = equipements.find(e => e.id === id) || equipements[0];
  const [tab, setTab] = useState("info");
  const [composants, setComposants] = useState(allComposants[eq.id] || []);
  const [historique] = useState(allHistorique[eq.id] || []);
  const [showDiag, setShowDiag] = useState(false);
  const [showTransfert, setShowTransfert] = useState(false);
  const [showAddComp, setShowAddComp] = useState(false);
  const [showExtract, setShowExtract] = useState(false);
  const [extractTarget, setExtractTarget] = useState(null);

  const catIcons = { "PC Fixe": "🖥", "PC Portable": "💻", "Imprimante": "🖨", "Serveur": "🗄", "Écran": "🖵" };

  const handleAddComp = (comp) => {
    setComposants(prev => [...prev, { ...comp, id: Date.now() }]);
  };

  const handleExtract = ({ composant, motif }) => {
    setComposants(prev => prev.filter(c => c.id !== composant.id));
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
        <button onClick={() => navigate("parc")} className="text-red-600 hover:underline">Parc informatique</button>
        <span>/</span>
        <span>{eq.marque} {eq.modele}</span>
      </div>

      {/* Header card */}
      <Card className="p-4 mb-4">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center text-3xl shrink-0">
            {catIcons[eq.categorie] || "📦"}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold text-slate-800 mb-1">{eq.marque} {eq.modele}</h2>
                <div className="text-xs text-slate-400 mb-2">
                  S/N : <SnCode value={eq.sn} /> &nbsp;·&nbsp; QR : <span className="font-mono">{eq.qr}</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge statut={eq.statut} />
                  <Badge statut={eq.categorie} />
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-600">{eq.agence}</span>
                </div>
              </div>
              {/* QR mini */}
              <div className="w-14 h-14 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                <svg width="42" height="42" viewBox="0 0 42 42">
                  {[
                    [2,2,10,10],[2,16,4,4],[2,22,4,4],[8,16,4,4],[14,2,4,4],[16,8,4,4],[14,14,10,10],
                    [16,16,6,6],[20,2,4,4],[24,2,4,10],[28,6,4,4],[24,14,4,4],[28,14,10,10],[32,16,6,6],
                    [2,28,10,10],[4,30,6,6],[14,26,4,4],[20,24,4,4],[24,20,4,4],[28,20,4,4],[32,20,4,4],
                    [20,28,4,4],[24,26,4,4],[28,28,4,4],[36,24,4,4],[20,34,4,4],[26,32,4,4],[30,32,8,6],
                  ].map(([x,y,w,h], i) => (
                    <rect key={i} x={x} y={y} width={w} height={h} rx="0.5" fill="white" />
                  ))}
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            <BtnGhost onClick={() => setShowDiag(true)}>🔍 Diagnostic</BtnGhost>
            <BtnGhost onClick={() => setShowTransfert(true)}>⇄ Transfert</BtnGhost>
            <BtnPrimary>⬇ Export fiche</BtnPrimary>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-slate-200 mb-4">
        {[
          { id: "info", label: "Informations" },
          { id: "composants", label: `Composants (${composants.length})` },
          { id: "historique", label: `Historique (${historique.length})` },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-4 py-2.5 text-xs font-medium border-b-2 -mb-px transition-colors ${
              tab === t.id ? "border-red-600 text-red-600" : "border-transparent text-slate-500 hover:text-slate-700"
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab: Informations */}
      {tab === "info" && (
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <p className="text-xs font-semibold text-slate-700 mb-3">Informations générales</p>
            {[
              ["Marque", eq.marque],
              ["Modèle", eq.modele],
              ["Catégorie", <Badge key="cat" statut={eq.categorie} />],
              ["Numéro de série", <SnCode key="sn" value={eq.sn} />],
              ["Code QR", <span key="qr" className="font-mono text-xs">{eq.qr}</span>],
              ["Agence actuelle", eq.agence],
              ["Utilisateur assigné", eq.utilisateur],
              ["Date d'entrée", eq.dateEntree],
              ["Statut actuel", <Badge key="st" statut={eq.statut} />],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <span className="text-xs text-slate-400">{k}</span>
                <span className="text-xs font-medium text-slate-700">{v}</span>
              </div>
            ))}
          </Card>
          <Card className="p-4">
            <p className="text-xs font-semibold text-slate-700 mb-3">État et traçabilité</p>
            <div className="space-y-3">
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-[11px] text-slate-400 mb-1">Durée en service</p>
                <p className="text-sm font-semibold text-slate-800">4 ans 3 mois</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-[11px] text-slate-400 mb-1">Interventions totales</p>
                <p className="text-sm font-semibold text-slate-800">3 interventions</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-[11px] text-slate-400 mb-1">Transferts effectués</p>
                <p className="text-sm font-semibold text-slate-800">2 transferts</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-[11px] text-slate-400 mb-1">Composants extraits</p>
                <p className="text-sm font-semibold text-slate-800">1 extraction</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Tab: Composants */}
      {tab === "composants" && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-slate-700">Composants internes</p>
            <BtnPrimary onClick={() => setShowAddComp(true)}>+ Ajouter un composant</BtnPrimary>
          </div>
          {composants.length === 0 ? (
            <div className="text-center py-10 text-xs text-slate-400">Aucun composant enregistré</div>
          ) : (
            <div className="divide-y divide-slate-50">
              {composants.map(c => (
                <div key={c.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{c.nom}</p>
                    <p className="text-xs text-slate-400">{c.spec}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge statut={c.etat} />
                    <button
                      onClick={() => { setExtractTarget(c); setShowExtract(true); }}
                      className="text-xs text-red-600 hover:bg-red-50 border border-red-200 px-2.5 py-1 rounded-lg transition-colors">
                      Extraire
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {/* Tab: Historique */}
      {tab === "historique" && (
        <Card className="p-4">
          <p className="text-xs font-semibold text-slate-700 mb-5">Ligne de vie</p>
          <div className="relative pl-5">
            {historique.map((h, i) => {
              const tc = typeColors[h.type] || typeColors.init;
              return (
                <div key={i} className="relative pb-5 last:pb-0">
                  {/* Line */}
                  {i < historique.length - 1 && (
                    <div className="absolute left-[-12px] top-3.5 bottom-0 w-px bg-slate-100"></div>
                  )}
                  {/* Dot */}
                  <div className={`absolute left-[-16px] top-1.5 w-2.5 h-2.5 rounded-full ${tc.dot} ring-2 ring-white`}></div>
                  {/* Content */}
                  <div className="bg-slate-50 rounded-xl p-3">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-xs font-semibold text-slate-800">{h.titre}</p>
                      <span className="text-[10px] text-slate-400 shrink-0">{h.date}</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-1">{h.desc}</p>
                    <p className="text-[10px] text-slate-400">Agent : {h.agent}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Modals */}
      <ModalDiagnostic open={showDiag} onClose={() => setShowDiag(false)} equipement={eq} />
      <ModalTransfert open={showTransfert} onClose={() => setShowTransfert(false)} equipement={eq} />
      <ModalAjoutComposant open={showAddComp} onClose={() => setShowAddComp(false)} onAdd={handleAddComp} />
      <ModalExtractionComposant open={showExtract} onClose={() => setShowExtract(false)} composant={extractTarget} onConfirm={handleExtract} />
    </div>
  );
}
