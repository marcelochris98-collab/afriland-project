export const equipements = [
  { id: "PC-00412", sn: "SN-PC-00412", qr: "AF-2021-0412", categorie: "PC Fixe", marque: "Dell", modele: "OptiPlex 7090", agence: "Siège Social", utilisateur: "Marie-Claire Ondo", dateEntree: "12/03/2021", statut: "En service" },
  { id: "IMP-0091", sn: "SN-IMP-0091", qr: "AF-2019-0091", categorie: "Imprimante", marque: "HP", modele: "LaserJet 4015", agence: "Bonanjo", utilisateur: "Paul Biya Jr", dateEntree: "08/07/2019", statut: "Au rebut" },
  { id: "PC-00387", sn: "SN-PC-00387", qr: "AF-2022-0387", categorie: "PC Portable", marque: "Lenovo", modele: "ThinkPad E14", agence: "Yaoundé Centre", utilisateur: "Grace Ateba", dateEntree: "20/11/2022", statut: "En service" },
  { id: "PC-00401", sn: "SN-PC-00401", qr: "AF-2020-0401", categorie: "PC Fixe", marque: "HP", modele: "EliteDesk 800", agence: "Douala Bali", utilisateur: "Roger Nkeng", dateEntree: "05/05/2020", statut: "En maintenance" },
  { id: "SRV-008", sn: "SN-SRV-008", qr: "AF-2018-0008", categorie: "Serveur", marque: "Dell", modele: "PowerEdge R740", agence: "Siège Social", utilisateur: "IT Dept", dateEntree: "14/01/2018", statut: "Partiel" },
  { id: "PC-00390", sn: "SN-PC-00390", qr: "AF-2021-0390", categorie: "PC Fixe", marque: "Lenovo", modele: "ThinkCentre M90", agence: "Akwa", utilisateur: "Sophie Mba", dateEntree: "30/09/2021", statut: "En service" },
  { id: "IMP-0105", sn: "SN-IMP-0105", qr: "AF-2020-0105", categorie: "Imprimante", marque: "Canon", modele: "imageRUNNER 2625", agence: "Bafoussam", utilisateur: "Martin Essomba", dateEntree: "17/02/2020", statut: "En maintenance" },
  { id: "PC-00425", sn: "SN-PC-00425", qr: "AF-2023-0425", categorie: "PC Portable", marque: "HP", modele: "ProBook 450", agence: "Yaoundé Bastos", utilisateur: "Carine Foko", dateEntree: "03/01/2023", statut: "En service" },
  { id: "ECR-0044", sn: "SN-ECR-0044", qr: "AF-2020-0044", categorie: "Écran", marque: "Samsung", modele: "27\" S27A600", agence: "Akwa", utilisateur: "Jean Mpoudi", dateEntree: "22/06/2020", statut: "Au rebut" },
  { id: "PC-00310", sn: "SN-PC-00310", qr: "AF-2019-0310", categorie: "PC Fixe", marque: "Acer", modele: "Veriton X4680G", agence: "Limbé", utilisateur: "Alice Ngom", dateEntree: "11/04/2019", statut: "Au rebut" },
];

export const agences = [
  { id: 1, nom: "Siège Social", ville: "Douala", responsable: "Armel Kouam", equipements: 214, adresse: "Avenue de Gaulle, Douala" },
  { id: 2, nom: "Akwa", ville: "Douala", responsable: "Pierre Mbang", equipements: 156, adresse: "Rue Joffre, Akwa, Douala" },
  { id: 3, nom: "Bonanjo", ville: "Douala", responsable: "Claire Eba", equipements: 120, adresse: "Bd de la Liberté, Bonanjo" },
  { id: 4, nom: "Yaoundé Centre", ville: "Yaoundé", responsable: "Bernard Ndi", equipements: 98, adresse: "Avenue Kennedy, Yaoundé" },
  { id: 5, nom: "Bafoussam", ville: "Bafoussam", responsable: "Lucie Fotso", equipements: 74, adresse: "Rue du Commerce, Bafoussam" },
  { id: 6, nom: "Douala Bali", ville: "Douala", responsable: "Roger Nkeng", equipements: 68, adresse: "Quartier Bali, Douala" },
  { id: 7, nom: "Yaoundé Bastos", ville: "Yaoundé", responsable: "Patrick Abega", equipements: 55, adresse: "Quartier Bastos, Yaoundé" },
  { id: 8, nom: "Limbé", ville: "Limbé", responsable: "Alice Ngom", equipements: 42, adresse: "Down Beach Rd, Limbé" },
];

export const prestataires = [
  { id: 1, nom: "TechRepair SARL", contact: "techrepair@cm.com", telephone: "+237 699 001 122", specialite: "PC & Serveurs", ville: "Douala", contrat: "Actif" },
  { id: 2, nom: "PrintoService", contact: "printo@service.cm", telephone: "+237 677 234 500", specialite: "Imprimantes", ville: "Yaoundé", contrat: "Actif" },
  { id: 3, nom: "NetSys Cameroun", contact: "info@netsys.cm", telephone: "+237 655 789 011", specialite: "Réseau & Serveurs", ville: "Douala", contrat: "Expiré" },
];

export const utilisateurs = [
  { id: 1, nom: "Armel Kouam", email: "a.kouam@afrilandfirstbank.com", role: "Admin IT", agence: "Siège Social", statut: "Actif", dateCreation: "01/01/2020" },
  { id: 2, nom: "Pierre Mbang", email: "p.mbang@afrilandfirstbank.com", role: "Technicien", agence: "Akwa", statut: "Actif", dateCreation: "15/03/2021" },
  { id: 3, nom: "Claire Eba", email: "c.eba@afrilandfirstbank.com", role: "Technicien", agence: "Bonanjo", statut: "Actif", dateCreation: "10/06/2021" },
  { id: 4, nom: "Bernard Ndi", email: "b.ndi@afrilandfirstbank.com", role: "Agent IT", agence: "Yaoundé Centre", statut: "Inactif", dateCreation: "20/09/2022" },
  { id: 5, nom: "Lucie Fotso", email: "l.fotso@afrilandfirstbank.com", role: "Agent IT", agence: "Bafoussam", statut: "Actif", dateCreation: "05/02/2023" },
];

export const interventions = [
  { id: "INT-001", equipementSn: "SN-PC-00401", equipementNom: "HP EliteDesk 800", type: "Diagnostic", description: "Surchauffe critique, ventilateur bloqué", niveau: "Critique", action: "Maintenance", agent: "A. Kouam", date: "14/01/2025", statut: "En cours" },
  { id: "INT-002", equipementSn: "SN-IMP-0091", equipementNom: "HP LaserJet 4015", type: "Rebut", description: "Carte mère grillée, irréparable", niveau: "Critique", action: "Rebut", agent: "A. Kouam", date: "15/06/2025", statut: "Clôturé" },
  { id: "INT-003", equipementSn: "SN-PC-00387", equipementNom: "Lenovo ThinkPad E14", type: "Maintenance", description: "Remplacement batterie défectueuse", niveau: "Mineur", action: "Maintenance", agent: "P. Mbang", date: "02/03/2025", statut: "Résolu" },
  { id: "INT-004", equipementSn: "SN-IMP-0105", equipementNom: "Canon imageRUNNER", type: "Diagnostic", description: "Bourrage papier récurrent, rouleaux usés", niveau: "Mineur", action: "Maintenance", agent: "C. Eba", date: "10/05/2025", statut: "En cours" },
];

export const mouvements = [
  { id: "MOV-001", equipementSn: "SN-PC-00412", equipementNom: "Dell OptiPlex 7090", agenceDepart: "Akwa", agenceArrivee: "Siège Social", motif: "Réaffectation personnel", agent: "P. Mbang", date: "15/06/2025", statut: "Validé" },
  { id: "MOV-002", equipementSn: "SN-PC-00425", equipementNom: "HP ProBook 450", agenceDepart: "Siège Social", agenceArrivee: "Yaoundé Bastos", motif: "Renforcement agence", agent: "A. Kouam", date: "10/06/2025", statut: "Validé" },
  { id: "MOV-003", equipementSn: "SN-ECR-0044", equipementNom: "Samsung 27\" S27A600", agenceDepart: "Bonanjo", agenceArrivee: "Akwa", motif: "Remplacement équipement défectueux", agent: "C. Eba", date: "05/06/2025", statut: "En transit" },
];

export const composants = {
  "PC-00412": [
    { id: 1, nom: "Disque dur SSD", spec: "512 GB · Samsung 870 EVO", etat: "Bon" },
    { id: 2, nom: "Mémoire RAM", spec: "16 GB · DDR4 Kingston", etat: "Bon" },
    { id: 3, nom: "Processeur", spec: "Intel Core i7-10700", etat: "Bon" },
    { id: 4, nom: "Carte mère", spec: "Dell 0GDG8Y", etat: "Usé" },
  ],
};

export const historique = {
  "PC-00412": [
    { date: "15/06/2025", agent: "P. Mbang", titre: "Transfert : Akwa → Siège Social", desc: "Motif : Réaffectation suite à mutation de personnel", type: "transfer" },
    { date: "02/03/2025", agent: "C. Eba", titre: "Retour de maintenance — Réparé", desc: "Remplacement ventilateur CPU, vérification alimentation", type: "maintenance" },
    { date: "14/01/2025", agent: "A. Kouam", titre: "Envoi en maintenance externe (TechRepair SARL)", desc: "Panne : Surchauffe — Niveau : Mineur", type: "panne" },
    { date: "20/08/2023", agent: "A. Kouam", titre: "Extraction RAM 8GB (cannibalisme → SN-PC-00199)", desc: "RAM récupérée pour équiper un autre poste en panne", type: "cannibal" },
    { date: "12/03/2021", agent: "Système", titre: "Enregistrement initial dans le parc", desc: "Agence : Akwa · Bon d'achat n° BON-2021-0057", type: "init" },
  ],
};
