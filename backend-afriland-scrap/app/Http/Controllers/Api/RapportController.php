<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Equipement;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Response;

class RapportController extends Controller
{
    /**
     * 1. EXPORT PDF (Le rapport visuel pour la direction)
     */
    public function exportPdf()
    {
        // On récupère tout le matériel avec les noms des agences et catégories
        $equipements = Equipement::with(['succursale', 'categorie'])->get();

        // On construit un tableau HTML simple pour le PDF
        $html = '<h2 style="text-align:center; color:#004b87;">Rapport d\'Inventaire - Afriland</h2>';
        $html .= '<table border="1" width="100%" cellpadding="5" cellspacing="0" style="border-collapse: collapse; font-family: sans-serif; font-size: 12px;">';
        $html .= '<tr style="background-color:#f2f2f2;"><th>SN / QR</th><th>Catégorie</th><th>Agence</th><th>Statut</th></tr>';

        foreach ($equipements as $eq) {
            $agence = $eq->succursale ? $eq->succursale->nom : 'Non assigné';
            $categorie = $eq->categorie ? $eq->categorie->nom : 'N/A';
            
            $html .= '<tr>';
            $html .= '<td>' . $eq->numero_serie . '</td>';
            $html .= '<td>' . $categorie . '</td>';
            $html .= '<td>' . $agence . '</td>';
            $html .= '<td>' . $eq->statut . '</td>';
            $html .= '</tr>';
        }
        $html .= '</table>';

        // Génération du PDF
        $pdf = Pdf::loadHTML($html);
        
        // Retourne le fichier directement téléchargeable
        return $pdf->download('rapport_inventaire_afriland.pdf');
    }

    /**
     * 2. EXPORT EXCEL/CSV (Pour l'analyse des données)
     */
    public function exportExcel()
    {
        $equipements = Equipement::with(['succursale', 'categorie'])->get();

        // On ouvre un fichier en mémoire
        $handle = fopen('php://output', 'w');
        
        // Pour que les accents français passent bien dans Excel (BOM UTF-8)
        fputs($handle, "\xEF\xBB\xBF");

        // On ajoute les en-têtes des colonnes
        fputcsv($handle, ['Numéro de Série', 'Catégorie', 'Succursale', 'Statut', 'Date d\'ajout'], ';');

        // On ajoute les données ligne par ligne
        foreach ($equipements as $eq) {
            fputcsv($handle, [
                $eq->numero_serie,
                $eq->categorie ? $eq->categorie->nom : 'N/A',
                $eq->succursale ? $eq->succursale->nom : 'N/A',
                $eq->statut,
                $eq->created_at->format('d/m/Y')
            ], ';');
        }

        fclose($handle);

        // On force le navigateur à télécharger le fichier
        $headers = [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="donnees_inventaire.csv"',
        ];

        return Response::make('', 200, $headers);
    }
}