import { Card, BtnPrimary, BtnGhost, PageHeader } from "../components/ui";

const rapports = [
  { titre: "Inventaire complet du parc", desc: "Liste complète avec statuts, agences et utilisateurs", icon: "📋", categorie: "Parc" },
  { titre: "Rapport des équipements au rebut", desc: "Historique et synthèse des mises au rebut", icon: "🗑", categorie: "Rebut" },
  { titre: "Suivi des maintenances", desc: "Toutes les interventions et leur résolution", icon: "🔧", categorie: "Maintenance" },
  { titre: "Mouvements inter-agences", desc: "Journal de tous les transferts effectués", icon: "⇄", categorie: "Logistique" },
  { titre: "Vieillissement du parc", desc: "Analyse par âge et durée de vie des équipements", icon: "📈", categorie: "Analyse" },
  { titre: "Rapport par agence", desc: "Répartition et état du matériel par agence", icon: "🏦", categorie: "Agences" },
];

export default function Rapports() {
  return (
    <div>
      <PageHeader
        title="Rapports"
        subtitle="Générez et exportez les rapports du parc informatique"
        actions={<BtnPrimary>+ Rapport personnalisé</BtnPrimary>}
      />

      <div className="grid grid-cols-2 gap-4">
        {rapports.map((r, i) => (
          <Card key={i} className="p-4 hover:border-slate-300 transition-colors cursor-pointer">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-xl shrink-0">{r.icon}</div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-800 mb-1">{r.titre}</p>
                <p className="text-xs text-slate-400 mb-3">{r.desc}</p>
                <div className="flex gap-2">
                  <BtnGhost>⬇ Excel</BtnGhost>
                  <BtnGhost>⬇ PDF</BtnGhost>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
