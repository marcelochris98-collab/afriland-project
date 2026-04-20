import { useState } from "react";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import ParcInformatique from "./pages/ParcInformatique";
import FicheEquipement from "./pages/FicheEquipement";
import Interventions from "./pages/Interventions";
import Logistique from "./pages/Logistique";
import Rapports from "./pages/Rapports";
import Parametres from "./pages/Parametres";

export default function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(null);

  const navigate = (page, id = null) => {
    setCurrentPage(page);
    if (id) setSelectedEquipmentId(id);
  };

  const pages = {
    dashboard: <Dashboard navigate={navigate} />,
    parc: <ParcInformatique navigate={navigate} />,
    fiche: <FicheEquipement id={selectedEquipmentId} navigate={navigate} />,
    interventions: <Interventions navigate={navigate} />,
    logistique: <Logistique navigate={navigate} />,
    rapports: <Rapports navigate={navigate} />,
    parametres: <Parametres navigate={navigate} />,
  };

  return (
    <Layout currentPage={currentPage} navigate={navigate}>
      {pages[currentPage] || <Dashboard navigate={navigate} />}
    </Layout>
  );
}
