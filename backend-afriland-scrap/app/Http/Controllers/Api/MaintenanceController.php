<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Maintenance;
use App\Models\Equipement;
use App\Models\Mouvement;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class MaintenanceController extends Controller
{
    /**
     * ENREGISTRER UNE NOUVELLE INTERVENTION
     */
    public function store(Request $request): JsonResponse
    {
        // 1. Validation stricte des données envoyées par le Frontend
        $valide = $request->validate([
            'equipement_id' => 'required|exists:equipements,id',
            'prestataire_id' => 'required|exists:prestataires,id',
            'user_id' => 'required|exists:users,id', // L'agent IT
            'diagnostic_technique' => 'required|string',
            'date_heure_intervention' => 'required|date',
            'cout_reparation' => 'nullable|numeric'
        ]);

        // 2. Création de la fiche de maintenance
        $valide['statut_final'] = 'En attente'; // Statut par défaut
        $maintenance = Maintenance::create($valide);

        // 3. AUTOMATISATION : Mise à jour de l'équipement
        $equipement = Equipement::find($request->equipement_id);
        $equipement->statut = 'En Maintenance';
        $equipement->save();

        // 4. AUTOMATISATION : Traçabilité (Le Mouvement)
        Mouvement::create([
            'equipement_id' => $equipement->id,
            'type_mouvement' => 'ENVOI_MAINTENANCE',
            'agence_depart' => 'Stock Central', // À dynamiser plus tard
            'agence_arrivee' => 'Atelier Prestataire',
            'motif' => 'Envoi pour réparation suite au diagnostic',
            'user_id' => $request->user_id
        ]);

        return response()->json([
            'statut' => 'succès',
            'message' => 'Intervention enregistrée. Le statut de l\'appareil a été mis à jour automatiquement.',
            'donnees' => $maintenance
        ], 201);
    }
}