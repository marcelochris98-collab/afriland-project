<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Diagnostic;
use App\Models\Equipement;
use App\Models\Mouvement;
use App\Models\NiveauDefaillance;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class DiagnosticController extends Controller
{
    /**
     * ENREGISTRER LE CONSTAT TECHNIQUE D'UNE PANNE
     */
    public function store(Request $request): JsonResponse
    {
        // 1. Validation des données
        $valide = $request->validate([
            'equipement_id' => 'required|exists:equipements,id',
            'niveau_defaillance_id' => 'required|exists:niveau_defaillances,id',
            'user_id' => 'required|exists:users,id', // L'agent IT qui examine
            'description_panne' => 'required|string',
            'action_recommandee' => 'required|in:Maintenance,Rebut,Aucune'
        ]);

        $equipement = Equipement::findOrFail($valide['equipement_id']);

        // 2. Création de la fiche de diagnostic
        $diagnostic = Diagnostic::create([
            'equipement_id' => $equipement->id,
            'niveau_defaillance_id' => $valide['niveau_defaillance_id'],
            'user_id' => $valide['user_id'],
            'description_panne' => $valide['description_panne'],
            'action_recommandee' => $valide['action_recommandee'],
            'date_diagnostic' => now(),
        ]);

        // 3. AUTOMATISATION : Décision selon la recommandation
        $motifMouvement = 'Suite au diagnostic : ' . $valide['description_panne'];

        if ($valide['action_recommandee'] === 'Rebut') {
            $equipement->statut = 'Au Rebut';
            
            // On trace la mise au rebut
            Mouvement::create([
                'equipement_id' => $equipement->id,
                'type_mouvement' => 'MISE_AU_REBUT',
                'motif' => $motifMouvement,
                'user_id' => $valide['user_id']
            ]);
        } 
        elseif ($valide['action_recommandee'] === 'Maintenance') {
            $equipement->statut = 'En Attente Maintenance';
            // Pas de mouvement ici, le mouvement se fera quand on l'enverra chez le prestataire
        }

        $equipement->save();

        return response()->json([
            'statut' => 'succès',
            'message' => 'Diagnostic enregistré. Statut de l\'équipement mis à jour : ' . $equipement->statut,
            'donnees' => $diagnostic
        ], 201);
    }
}