import { useState } from "react";
import { Modal, BtnPrimary, BtnGhost, BtnDanger, Input, Select, Textarea } from "../ui";

// ─── MODAL DIAGNOSTIC ────────────────────────────────────────────────────────
export function ModalDiagnostic({ open, onClose, equipement }) {
  const [desc, setDesc] = useState("");
  const [niveau, setNiveau] = useState("");
  const [action, setAction] = useState("");

  const handleSubmit = () => {
    if (!desc || !niveau || !action) return;
    alert(`Diagnostic enregistré :\n- Niveau : ${niveau}\n- Action : ${action}`);
    onClose();
    setDesc(""); setNiveau(""); setAction("");
  };

  return (
    <Modal open={open} onClose={onClose}
      icon="🔍" title="Diagnostic équipement"
      subtitle={equipement ? `${equipement.sn} · ${equipement.marque} ${equipement.modele}` : ""}
      footer={
        <>
          <BtnGhost onClick={onClose}>Annuler</BtnGhost>
          <BtnPrimary onClick={handleSubmit}>Confirmer le diagnostic</BtnPrimary>
        </>
      }>

      <Textarea label="Description de la panne *" value={desc} onChange={e => setDesc(e.target.value)}
        placeholder="Ex: Le PC ne démarre plus, écran noir après le logo Dell..." rows={3} />

      <div>
        <label className="block text-xs font-medium text-slate-500 mb-2">Niveau de défaillance *</label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { val: "Mineur", icon: "⚠️", sub: "Réparable, sans urgence", border: "border-amber-300 bg-amber-50" },
            { val: "Critique", icon: "🔴", sub: "Hors service, urgent", border: "border-red-400 bg-red-50" },
          ].map(opt => (
            <button key={opt.val} onClick={() => setNiveau(opt.val)}
              className={`flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-xl border-2 transition-all ${
                niveau === opt.val ? opt.border : "border-slate-200 bg-slate-50 hover:bg-white"
              }`}>
              <span className="text-xl">{opt.icon}</span>
              <span className="text-xs font-semibold text-slate-800">{opt.val}</span>
              <span className="text-[10px] text-slate-500">{opt.sub}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-500 mb-2">Action recommandée *</label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { val: "Envoyer en maintenance", icon: "🔧", color: "border-amber-300 bg-amber-50 text-amber-800" },
            { val: "Mettre au rebut", icon: "🗑", color: "border-red-400 bg-red-50 text-red-800" },
          ].map(opt => (
            <button key={opt.val} onClick={() => setAction(opt.val)}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl border-2 text-xs font-semibold transition-all ${
                action === opt.val ? opt.color : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-white"
              }`}>
              <span>{opt.icon}</span> {opt.val}
            </button>
          ))}
        </div>
      </div>

      {niveau === "Critique" && action === "Mettre au rebut" && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2">
          <span className="text-red-500 text-sm mt-0.5">⚠</span>
          <p className="text-xs text-red-700">Cette action est <strong>irréversible</strong>. L'équipement sera marqué comme <strong>Au rebut</strong> et retiré du parc actif.</p>
        </div>
      )}
    </Modal>
  );
}

// ─── MODAL TRANSFERT ─────────────────────────────────────────────────────────
export function ModalTransfert({ open, onClose, equipement }) {
  const [agenceDest, setAgenceDest] = useState("");
  const [motif, setMotif] = useState("");
  const [note, setNote] = useState("");

  const agences = ["Siège Social", "Akwa", "Bonanjo", "Yaoundé Centre", "Bafoussam", "Douala Bali", "Yaoundé Bastos", "Limbé"];

  const handleSubmit = () => {
    if (!agenceDest || !motif) return;
    alert(`Transfert validé vers ${agenceDest}`);
    onClose();
    setAgenceDest(""); setMotif(""); setNote("");
  };

  return (
    <Modal open={open} onClose={onClose}
      icon="⇄" title="Transfert inter-agences"
      subtitle={equipement ? `${equipement.sn} · ${equipement.marque} ${equipement.modele}` : ""}
      footer={
        <>
          <BtnGhost onClick={onClose}>Annuler</BtnGhost>
          <BtnPrimary onClick={handleSubmit}>Valider le transfert</BtnPrimary>
        </>
      }>

      {/* Arrow diagram */}
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-2">Mouvement</label>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
            <p className="text-xs text-slate-400 mb-0.5">Source</p>
            <p className="text-sm font-semibold text-slate-800">{equipement?.agence || "—"}</p>
          </div>
          <div className="flex flex-col items-center gap-1 px-2">
            <span className="text-red-600 text-xl">→</span>
            <span className="text-[10px] text-slate-400">vers</span>
          </div>
          <div className="flex-1 bg-red-50 border border-red-200 rounded-xl p-3 text-center">
            <p className="text-xs text-slate-400 mb-0.5">Destination</p>
            <select value={agenceDest} onChange={e => setAgenceDest(e.target.value)}
              className="text-sm font-semibold text-slate-800 bg-transparent border-none outline-none text-center w-full cursor-pointer">
              <option value="">Choisir...</option>
              {agences.filter(a => a !== equipement?.agence).map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <Select label="Motif du transfert *" value={motif} onChange={e => setMotif(e.target.value)}>
        <option value="">Sélectionner un motif...</option>
        <option>Réaffectation personnel</option>
        <option>Remplacement équipement défectueux</option>
        <option>Renforcement agence</option>
        <option>Réorganisation parc</option>
        <option>Demande de direction</option>
      </Select>

      <Input label="Note complémentaire" value={note} onChange={e => setNote(e.target.value)}
        placeholder="Précisions éventuelles..." />
    </Modal>
  );
}

// ─── MODAL AJOUT COMPOSANT ────────────────────────────────────────────────────
export function ModalAjoutComposant({ open, onClose, onAdd }) {
  const [nom, setNom] = useState("");
  const [spec, setSpec] = useState("");
  const [etat, setEtat] = useState("Bon");

  const handleSubmit = () => {
    if (!nom || !spec) return;
    onAdd({ nom, spec, etat });
    onClose();
    setNom(""); setSpec(""); setEtat("Bon");
  };

  return (
    <Modal open={open} onClose={onClose}
      icon="🔩" title="Ajouter un composant"
      subtitle="Enregistrer une nouvelle pièce"
      footer={
        <>
          <BtnGhost onClick={onClose}>Annuler</BtnGhost>
          <BtnPrimary onClick={handleSubmit}>Ajouter le composant</BtnPrimary>
        </>
      }>
      <Select label="Type de composant *" value={nom} onChange={e => setNom(e.target.value)}>
        <option value="">Sélectionner...</option>
        <option>Disque dur SSD</option>
        <option>Disque dur HDD</option>
        <option>Mémoire RAM</option>
        <option>Processeur</option>
        <option>Carte mère</option>
        <option>Carte graphique</option>
        <option>Alimentation</option>
        <option>Ventilateur</option>
        <option>Batterie</option>
        <option>Autre</option>
      </Select>
      <Input label="Spécification *" value={spec} onChange={e => setSpec(e.target.value)}
        placeholder="Ex: 512 GB · Samsung 870 EVO" />
      <Select label="État initial" value={etat} onChange={e => setEtat(e.target.value)}>
        <option>Bon</option>
        <option>Usé</option>
        <option>Défectueux</option>
      </Select>
    </Modal>
  );
}

// ─── MODAL EXTRACTION COMPOSANT ───────────────────────────────────────────────
export function ModalExtractionComposant({ open, onClose, composant, onConfirm }) {
  const [dest, setDest] = useState("");
  const [motif, setMotif] = useState("");

  const handleSubmit = () => {
    if (!motif) return;
    onConfirm({ composant, dest, motif });
    onClose();
    setDest(""); setMotif("");
  };

  return (
    <Modal open={open} onClose={onClose}
      icon="⬆️" title="Extraire un composant"
      subtitle={composant ? `${composant.nom} — ${composant.spec}` : ""}
      footer={
        <>
          <BtnGhost onClick={onClose}>Annuler</BtnGhost>
          <BtnDanger onClick={handleSubmit}>Confirmer l'extraction</BtnDanger>
        </>
      }>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2">
        <span className="text-amber-500">⚠️</span>
        <p className="text-xs text-amber-800">L'extraction retire ce composant de l'équipement actuel. Cette opération est tracée dans l'historique.</p>
      </div>
      <Input label="Équipement de destination (optionnel)" value={dest} onChange={e => setDest(e.target.value)}
        placeholder="Ex: SN-PC-00199" />
      <Select label="Motif de l'extraction *" value={motif} onChange={e => setMotif(e.target.value)}>
        <option value="">Sélectionner...</option>
        <option>Cannibalisme — réutilisation</option>
        <option>Mise en stock</option>
        <option>Pièce défectueuse</option>
        <option>Remplacement sous garantie</option>
      </Select>
    </Modal>
  );
}

// ─── MODAL AJOUT ÉQUIPEMENT ───────────────────────────────────────────────────
export function ModalAjoutEquipement({ open, onClose }) {
  const [form, setForm] = useState({ marque: "", modele: "", categorie: "", agence: "", sn: "", utilisateur: "" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    if (!form.marque || !form.modele || !form.categorie || !form.agence || !form.sn) return;
    alert(`Équipement ajouté :\n${form.marque} ${form.modele} — ${form.sn}`);
    onClose();
    setForm({ marque: "", modele: "", categorie: "", agence: "", sn: "", utilisateur: "" });
  };

  const agences = ["Siège Social", "Akwa", "Bonanjo", "Yaoundé Centre", "Bafoussam", "Douala Bali", "Yaoundé Bastos", "Limbé"];

  return (
    <Modal open={open} onClose={onClose}
      icon="➕" title="Ajouter un équipement"
      subtitle="Enregistrement dans le parc informatique"
      footer={
        <>
          <BtnGhost onClick={onClose}>Annuler</BtnGhost>
          <BtnPrimary onClick={handleSubmit}>Enregistrer l'équipement</BtnPrimary>
        </>
      }>
      <div className="grid grid-cols-2 gap-3">
        <Select label="Catégorie *" value={form.categorie} onChange={e => set("categorie", e.target.value)}>
          <option value="">Choisir...</option>
          <option>PC Fixe</option>
          <option>PC Portable</option>
          <option>Imprimante</option>
          <option>Serveur</option>
          <option>Écran</option>
          <option>Autre</option>
        </Select>
        <Input label="Marque *" value={form.marque} onChange={e => set("marque", e.target.value)} placeholder="Dell, HP, Lenovo..." />
        <Input label="Modèle *" value={form.modele} onChange={e => set("modele", e.target.value)} placeholder="OptiPlex 7090" />
        <Input label="Numéro de série *" value={form.sn} onChange={e => set("sn", e.target.value)} placeholder="SN-XX-00000" />
        <Select label="Agence *" value={form.agence} onChange={e => set("agence", e.target.value)}>
          <option value="">Choisir...</option>
          {agences.map(a => <option key={a}>{a}</option>)}
        </Select>
        <Input label="Utilisateur assigné" value={form.utilisateur} onChange={e => set("utilisateur", e.target.value)} placeholder="Nom Prénom" />
      </div>
    </Modal>
  );
}
