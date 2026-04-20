import { useState } from "react";
import { agences as allAgences, prestataires as allPrestataires, utilisateurs as allUtilisateurs } from "../data/mockData";
import { Badge, BtnPrimary, BtnGhost, BtnDanger, Input, Select, Card, Modal, ConfirmModal } from "../components/ui";

// ─── SUB: MON PROFIL ─────────────────────────────────────────────────────────
function MonProfil() {
  const [form, setForm] = useState({ prenom: "Armel", nom: "Kouam", email: "a.kouam@afrilandfirstbank.com", tel: "+237 6XX XXX XXX" });
  const [pwForm, setPwForm] = useState({ ancien: "", nouveau: "", confirmer: "" });
  const [showAncien, setShowAncien] = useState(false);
  const [showNouv, setShowNouv] = useState(false);
  const [saved, setSaved] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const setPw = (k, v) => setPwForm(f => ({ ...f, [k]: v }));

  const strength = pwForm.nouveau.length;
  const strengthLabel = strength === 0 ? "" : strength < 6 ? "Faible" : strength < 10 ? "Moyen" : "Fort";
  const strengthColor = strength < 6 ? "bg-red-500" : strength < 10 ? "bg-amber-400" : "bg-green-500";

  return (
    <div className="space-y-6">
      {/* Avatar */}
      <div>
        <p className="text-xs font-semibold text-slate-700 mb-3 pb-2 border-b border-slate-100">Photo & identité</p>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-red-700 flex items-center justify-center text-white text-xl font-bold">AK</div>
          <div>
            <p className="text-sm font-semibold text-slate-800">Armel Kouam</p>
            <p className="text-xs text-slate-400 mb-2">Administrateur IT · Siège Social</p>
            <BtnGhost>Changer la photo</BtnGhost>
          </div>
        </div>
      </div>

      {/* Info form */}
      <div>
        <p className="text-xs font-semibold text-slate-700 mb-3 pb-2 border-b border-slate-100">Informations personnelles</p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Input label="Prénom" value={form.prenom} onChange={e => set("prenom", e.target.value)} />
          <Input label="Nom" value={form.nom} onChange={e => set("nom", e.target.value)} />
          <Input label="Email professionnel" value={form.email} onChange={e => set("email", e.target.value)} />
          <Input label="Téléphone" value={form.tel} onChange={e => set("tel", e.target.value)} />
        </div>
        {saved && <p className="text-xs text-green-600 mb-2">✓ Modifications enregistrées</p>}
        <BtnPrimary onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}>
          Enregistrer les modifications
        </BtnPrimary>
      </div>

      {/* Password */}
      <div>
        <p className="text-xs font-semibold text-slate-700 mb-3 pb-2 border-b border-slate-100">Sécurité — Changer le mot de passe</p>
        <div className="space-y-3 mb-3">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Mot de passe actuel</label>
            <div className="relative">
              <input type={showAncien ? "text" : "password"} value={pwForm.ancien} onChange={e => setPw("ancien", e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 pr-8 focus:outline-none focus:ring-2 focus:ring-red-200" />
              <button onClick={() => setShowAncien(!showAncien)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                {showAncien ? "🙈" : "👁"}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Nouveau mot de passe</label>
              <div className="relative">
                <input type={showNouv ? "text" : "password"} value={pwForm.nouveau} onChange={e => setPw("nouveau", e.target.value)}
                  placeholder="Min. 8 caractères"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 pr-8 focus:outline-none focus:ring-2 focus:ring-red-200 placeholder-slate-400" />
                <button onClick={() => setShowNouv(!showNouv)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                  {showNouv ? "🙈" : "👁"}
                </button>
              </div>
            </div>
            <Input label="Confirmer le mot de passe" type="password" value={pwForm.confirmer}
              onChange={e => setPw("confirmer", e.target.value)} placeholder="Répéter..." />
          </div>
        </div>
        {pwForm.nouveau && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-1 flex-1">
              {[1, 2, 3, 4].map(n => (
                <div key={n} className={`h-1 flex-1 rounded-full ${strength / 3 >= n ? strengthColor : "bg-slate-200"}`}></div>
              ))}
            </div>
            <span className="text-[11px] text-slate-500">{strengthLabel}</span>
          </div>
        )}
        {pwForm.confirmer && pwForm.nouveau !== pwForm.confirmer && (
          <p className="text-xs text-red-500 mb-2">Les mots de passe ne correspondent pas</p>
        )}
        <BtnPrimary onClick={() => {}}>Mettre à jour le mot de passe</BtnPrimary>
      </div>
    </div>
  );
}

// ─── SUB: GESTION DES ACCÈS ──────────────────────────────────────────────────
function GestionAcces() {
  const [users, setUsers] = useState(allUtilisateurs);
  const [showAdd, setShowAdd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [targetUser, setTargetUser] = useState(null);
  const [form, setForm] = useState({ nom: "", email: "", role: "Agent IT", agence: "" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const agences = ["Siège Social", "Akwa", "Bonanjo", "Yaoundé Centre", "Bafoussam"];

  const handleAdd = () => {
    if (!form.nom || !form.email || !form.agence) return;
    setUsers(prev => [...prev, { id: Date.now(), ...form, statut: "Actif", dateCreation: new Date().toLocaleDateString("fr-FR") }]);
    setShowAdd(false);
    setForm({ nom: "", email: "", role: "Agent IT", agence: "" });
  };

  const handleToggle = (u) => {
    setUsers(prev => prev.map(x => x.id === u.id ? { ...x, statut: x.statut === "Actif" ? "Inactif" : "Actif" } : x));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold text-slate-700">Utilisateurs du système ({users.length})</p>
        <BtnPrimary onClick={() => setShowAdd(true)}>+ Ajouter un utilisateur</BtnPrimary>
      </div>

      <div className="space-y-2">
        {users.map(u => (
          <div key={u.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-white border border-slate-100 hover:border-slate-200 transition-all">
            <div className="w-9 h-9 rounded-full bg-red-700 flex items-center justify-center text-white text-xs font-semibold shrink-0">
              {u.nom.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-800">{u.nom}</p>
              <p className="text-xs text-slate-400">{u.email} · {u.agence}</p>
            </div>
            <Badge statut={u.role} />
            <Badge statut={u.statut} />
            <div className="flex gap-1.5">
              <BtnGhost onClick={() => handleToggle(u)} className="text-xs py-1">
                {u.statut === "Actif" ? "Désactiver" : "Activer"}
              </BtnGhost>
              <BtnDanger onClick={() => { setTargetUser(u); setShowConfirm(true); }}>Supprimer</BtnDanger>
            </div>
          </div>
        ))}
      </div>

      {/* Modal add user */}
      <Modal open={showAdd} onClose={() => setShowAdd(false)}
        icon="👤" title="Ajouter un utilisateur"
        footer={<><BtnGhost onClick={() => setShowAdd(false)}>Annuler</BtnGhost><BtnPrimary onClick={handleAdd}>Créer le compte</BtnPrimary></>}>
        <Input label="Nom complet *" value={form.nom} onChange={e => set("nom", e.target.value)} placeholder="Prénom Nom" />
        <Input label="Email professionnel *" value={form.email} onChange={e => set("email", e.target.value)} placeholder="prenom.nom@afrilandfirstbank.com" />
        <Select label="Rôle *" value={form.role} onChange={e => set("role", e.target.value)}>
          <option>Admin IT</option>
          <option>Technicien</option>
          <option>Agent IT</option>
        </Select>
        <Select label="Agence *" value={form.agence} onChange={e => set("agence", e.target.value)}>
          <option value="">Choisir...</option>
          {agences.map(a => <option key={a}>{a}</option>)}
        </Select>
      </Modal>

      <ConfirmModal open={showConfirm} onClose={() => setShowConfirm(false)}
        onConfirm={() => { setUsers(prev => prev.filter(u => u.id !== targetUser?.id)); setShowConfirm(false); }}
        title="Supprimer l'utilisateur ?" message={`L'accès de ${targetUser?.nom} sera définitivement supprimé.`}
        confirmLabel="Supprimer" danger />
    </div>
  );
}

// ─── SUB: LISTE DES AGENCES ──────────────────────────────────────────────────
function ListeAgences() {
  const [agences, setAgences] = useState(allAgences);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ nom: "", ville: "", responsable: "", adresse: "" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleAdd = () => {
    if (!form.nom || !form.ville) return;
    setAgences(prev => [...prev, { id: Date.now(), ...form, equipements: 0 }]);
    setShowAdd(false);
    setForm({ nom: "", ville: "", responsable: "", adresse: "" });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold text-slate-700">Agences ({agences.length})</p>
        <BtnPrimary onClick={() => setShowAdd(true)}>+ Ajouter une agence</BtnPrimary>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {agences.map(a => (
          <div key={a.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-white transition-all">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm font-semibold text-slate-800">{a.nom}</p>
                <p className="text-xs text-slate-400">{a.ville} · {a.adresse}</p>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-red-50 text-red-700 font-medium">{a.equipements} équip.</span>
            </div>
            <p className="text-xs text-slate-500">Responsable IT : <strong>{a.responsable}</strong></p>
            <div className="flex gap-2 mt-2.5">
              <BtnGhost className="text-xs py-1">Modifier</BtnGhost>
            </div>
          </div>
        ))}
      </div>

      <Modal open={showAdd} onClose={() => setShowAdd(false)}
        icon="🏦" title="Ajouter une agence"
        footer={<><BtnGhost onClick={() => setShowAdd(false)}>Annuler</BtnGhost><BtnPrimary onClick={handleAdd}>Enregistrer</BtnPrimary></>}>
        <Input label="Nom de l'agence *" value={form.nom} onChange={e => set("nom", e.target.value)} placeholder="Ex: Douala Bali" />
        <Input label="Ville *" value={form.ville} onChange={e => set("ville", e.target.value)} placeholder="Ex: Douala" />
        <Input label="Responsable IT" value={form.responsable} onChange={e => set("responsable", e.target.value)} placeholder="Prénom Nom" />
        <Input label="Adresse" value={form.adresse} onChange={e => set("adresse", e.target.value)} placeholder="Adresse complète" />
      </Modal>
    </div>
  );
}

// ─── SUB: PRESTATAIRES ───────────────────────────────────────────────────────
function Prestataires() {
  const [prestataires, setPrestataires] = useState(allPrestataires);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ nom: "", contact: "", telephone: "", specialite: "", ville: "" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleAdd = () => {
    if (!form.nom) return;
    setPrestataires(prev => [...prev, { id: Date.now(), ...form, contrat: "Actif" }]);
    setShowAdd(false);
    setForm({ nom: "", contact: "", telephone: "", specialite: "", ville: "" });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold text-slate-700">Prestataires ({prestataires.length})</p>
        <BtnPrimary onClick={() => setShowAdd(true)}>+ Ajouter un prestataire</BtnPrimary>
      </div>
      <div className="space-y-3">
        {prestataires.map(p => (
          <div key={p.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:bg-white hover:border-slate-200 transition-all">
            <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-lg shrink-0">🤝</div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{p.nom}</p>
                  <p className="text-xs text-slate-400">{p.specialite} · {p.ville}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{p.contact} · {p.telephone}</p>
                </div>
                <Badge statut={p.contrat} />
              </div>
            </div>
            <div className="flex gap-1.5">
              <BtnGhost className="text-xs py-1">Modifier</BtnGhost>
            </div>
          </div>
        ))}
      </div>

      <Modal open={showAdd} onClose={() => setShowAdd(false)}
        icon="🤝" title="Ajouter un prestataire"
        footer={<><BtnGhost onClick={() => setShowAdd(false)}>Annuler</BtnGhost><BtnPrimary onClick={handleAdd}>Enregistrer</BtnPrimary></>}>
        <Input label="Nom du prestataire *" value={form.nom} onChange={e => set("nom", e.target.value)} placeholder="TechRepair SARL" />
        <Input label="Email de contact" value={form.contact} onChange={e => set("contact", e.target.value)} placeholder="contact@prestataire.com" />
        <Input label="Téléphone" value={form.telephone} onChange={e => set("telephone", e.target.value)} placeholder="+237 6XX XXX XXX" />
        <Select label="Spécialité" value={form.specialite} onChange={e => set("specialite", e.target.value)}>
          <option value="">Choisir...</option>
          <option>PC &amp; Serveurs</option>
          <option>Imprimantes</option>
          <option>Réseau &amp; Serveurs</option>
          <option>Tout matériel</option>
        </Select>
        <Input label="Ville" value={form.ville} onChange={e => set("ville", e.target.value)} placeholder="Douala" />
      </Modal>
    </div>
  );
}

// ─── SUB: CATÉGORIES ─────────────────────────────────────────────────────────
function Categories() {
  const [cats, setCats] = useState([
    { id: 1, nom: "PC Fixe", icon: "🖥", count: 412 },
    { id: 2, nom: "PC Portable", icon: "💻", count: 238 },
    { id: 3, nom: "Imprimante", icon: "🖨", count: 196 },
    { id: 4, nom: "Serveur", icon: "🗄", count: 24 },
    { id: 5, nom: "Écran", icon: "🖵", count: 377 },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [newCat, setNewCat] = useState("");

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold text-slate-700">Catégories de matériel</p>
        <BtnPrimary onClick={() => setShowAdd(true)}>+ Ajouter</BtnPrimary>
      </div>
      <div className="space-y-2">
        {cats.map(c => (
          <div key={c.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-xl">{c.icon}</span>
            <span className="flex-1 text-sm font-medium text-slate-800">{c.nom}</span>
            <span className="text-xs text-slate-400">{c.count} équipements</span>
            <BtnGhost className="text-xs py-1">Modifier</BtnGhost>
          </div>
        ))}
      </div>
      <Modal open={showAdd} onClose={() => setShowAdd(false)}
        icon="📦" title="Nouvelle catégorie"
        footer={<><BtnGhost onClick={() => setShowAdd(false)}>Annuler</BtnGhost>
          <BtnPrimary onClick={() => { if(newCat) { setCats(p => [...p, { id: Date.now(), nom: newCat, icon: "📦", count: 0 }]); setShowAdd(false); setNewCat(""); } }}>Créer</BtnPrimary></>}>
        <Input label="Nom de la catégorie *" value={newCat} onChange={e => setNewCat(e.target.value)} placeholder="Ex: Tablette" />
      </Modal>
    </div>
  );
}

// ─── MAIN PARAMETRES ──────────────────────────────────────────────────────────
const sections = [
  { id: "profil",      icon: "👤", label: "Mon profil" },
  { id: "acces",       icon: "🔐", label: "Gestion des accès" },
  { id: "agences",     icon: "🏦", label: "Liste des agences" },
  { id: "prestataires",icon: "🤝", label: "Prestataires" },
  { id: "categories",  icon: "📋", label: "Catégories matériel" },
];

export default function Parametres() {
  const [active, setActive] = useState("profil");

  const views = {
    profil: <MonProfil />,
    acces: <GestionAcces />,
    agences: <ListeAgences />,
    prestataires: <Prestataires />,
    categories: <Categories />,
  };

  return (
    <div className="flex gap-4">
      {/* Left nav */}
      <div className="w-48 shrink-0">
        <Card className="p-2">
          {sections.map(s => (
            <button key={s.id} onClick={() => setActive(s.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-xs mb-0.5 transition-colors ${
                active === s.id ? "bg-red-50 text-red-700 font-semibold" : "text-slate-600 hover:bg-slate-50"
              }`}>
              <span>{s.icon}</span> {s.label}
            </button>
          ))}
        </Card>
      </div>

      {/* Right content */}
      <Card className="flex-1 p-5">
        {views[active]}
      </Card>
    </div>
  );
}
