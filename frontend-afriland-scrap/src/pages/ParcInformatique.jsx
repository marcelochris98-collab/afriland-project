import { useState } from "react";
import { equipements as allEquipements } from "../data/mockData";
import { Badge, SnCode, BtnPrimary, BtnGhost, Table, Td, PageHeader } from "../components/ui";
import { ModalAjoutEquipement } from "../components/modals/ActionModals";

export default function ParcInformatique({ navigate }) {
  const [filterAgence, setFilterAgence] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [filterStatut, setFilterStatut] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  const agences = [...new Set(allEquipements.map(e => e.agence))];
  const categories = [...new Set(allEquipements.map(e => e.categorie))];

  const filtered = allEquipements.filter(e => {
    const matchSearch = !search || e.sn.toLowerCase().includes(search.toLowerCase()) || e.modele.toLowerCase().includes(search.toLowerCase());
    const matchAgence = !filterAgence || e.agence === filterAgence;
    const matchCat = !filterCat || e.categorie === filterCat;
    const matchStatut = !filterStatut || e.statut === filterStatut;
    return matchSearch && matchAgence && matchCat && matchStatut;
  });

  const toggleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    setSelected(selected.length === filtered.length ? [] : filtered.map(e => e.id));
  };

  const catIcons = { "PC Fixe": "🖥", "PC Portable": "💻", "Imprimante": "🖨", "Serveur": "🗄", "Écran": "🖵" };

  return (
    <div>
      <PageHeader
        title="Parc informatique"
        subtitle={`${filtered.length} équipements affichés sur ${allEquipements.length}`}
        actions={
          <>
            <BtnGhost>⬇ Excel</BtnGhost>
            <BtnGhost>⬇ PDF</BtnGhost>
            <BtnPrimary onClick={() => setShowAdd(true)}>+ Ajouter un équipement</BtnPrimary>
          </>
        }
      />

      {/* Filtres */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-400 flex-1 min-w-48">
          <span>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher S/N, modèle..."
            className="outline-none flex-1 bg-transparent text-slate-700 placeholder-slate-400" />
        </div>
        <select value={filterAgence} onChange={e => setFilterAgence(e.target.value)}
          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-600 outline-none focus:ring-2 focus:ring-red-200">
          <option value="">Toutes les agences</option>
          {agences.map(a => <option key={a}>{a}</option>)}
        </select>
        <select value={filterCat} onChange={e => setFilterCat(e.target.value)}
          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-600 outline-none focus:ring-2 focus:ring-red-200">
          <option value="">Toutes catégories</option>
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={filterStatut} onChange={e => setFilterStatut(e.target.value)}
          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-600 outline-none focus:ring-2 focus:ring-red-200">
          <option value="">Tous les statuts</option>
          <option>En service</option>
          <option>En maintenance</option>
          <option>Au rebut</option>
          <option>Partiel</option>
        </select>
        {(filterAgence || filterCat || filterStatut || search) && (
          <button onClick={() => { setFilterAgence(""); setFilterCat(""); setFilterStatut(""); setSearch(""); }}
            className="text-xs text-red-600 hover:underline px-2">✕ Réinitialiser</button>
        )}
      </div>

      {/* Sélection action bar */}
      {selected.length > 0 && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 mb-3">
          <span className="text-xs text-red-700 font-medium">{selected.length} sélectionné(s)</span>
          <div className="flex gap-2 ml-auto">
            <BtnGhost className="text-xs py-1">⇄ Transfert groupé</BtnGhost>
            <BtnGhost className="text-xs py-1">⬇ Exporter sélection</BtnGhost>
            <button onClick={() => setSelected([])} className="text-xs text-red-600 hover:underline">Désélectionner</button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 border-b border-slate-200 w-8">
                <input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0}
                  onChange={toggleAll} className="rounded border-slate-300" />
              </th>
              {["N° Série / QR", "Catégorie", "Marque / Modèle", "Agence actuelle", "Date entrée", "Statut", "Actions"].map(h => (
                <th key={h} className="text-left text-[11px] font-medium text-slate-400 px-4 py-3 border-b border-slate-200">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={8} className="text-center py-12 text-sm text-slate-400">Aucun équipement trouvé</td></tr>
            ) : filtered.map(eq => (
              <tr key={eq.id} className={`border-b border-slate-50 last:border-0 hover:bg-slate-50 cursor-pointer ${selected.includes(eq.id) ? "bg-red-50/50" : ""}`}>
                <Td><input type="checkbox" checked={selected.includes(eq.id)} onChange={() => toggleSelect(eq.id)} className="rounded border-slate-300" /></Td>
                <Td><SnCode value={eq.sn} /></Td>
                <Td>
                  <div className="flex items-center gap-2">
                    <span className="text-base">{catIcons[eq.categorie] || "📦"}</span>
                    <Badge statut={eq.categorie} />
                  </div>
                </Td>
                <Td>
                  <div className="font-medium text-slate-800">{eq.marque}</div>
                  <div className="text-slate-400 text-[11px]">{eq.modele}</div>
                </Td>
                <Td className="text-slate-500">{eq.agence}</Td>
                <Td className="text-slate-400 text-[11px]">{eq.dateEntree}</Td>
                <Td><Badge statut={eq.statut} /></Td>
                <Td>
                  <button
                    onClick={() => navigate("fiche", eq.id)}
                    className="text-xs text-red-600 hover:underline font-medium">
                    Voir fiche →
                  </button>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-3">
        <span className="text-xs text-slate-400">Affichage 1–{filtered.length} sur {allEquipements.length} résultats</span>
        <div className="flex gap-1">
          {["←", "1", "2", "3", "→"].map((p, i) => (
            <button key={i} className={`w-7 h-7 rounded-lg text-xs border transition-colors ${
              p === "1" ? "bg-red-700 text-white border-red-700" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}>{p}</button>
          ))}
        </div>
      </div>

      <ModalAjoutEquipement open={showAdd} onClose={() => setShowAdd(false)} />
    </div>
  );
}
