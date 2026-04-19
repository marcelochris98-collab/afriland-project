<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Composant;
use App\Models\TransfertComposant;
use App\Models\Mouvement;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TransfertComposantController extends Controller
{
    /**
     * EFFECTUER UN TRANSFERT DE PIÈCE (Cannibalisme IT)
     */
    public function transferer(Request $request): JsonResponse
    {
        // 1. Validation stricte
        $valide = $request->validate([
            'composant_id' => 'required|exists:composants,id',
            'equipement_source_id' => 'required|exists:equipements,id',
            'equipement_destination_id' => 'required|exists:equipements,id',
            'motif' => 'required|string',
            'user_id' => 'required|exists:users,id' // L'agent IT qui opère
        ]);

        // Sécurité : on ne transfère pas sur le même appareil
        if ($valide['equipement_source_id'] === $valide['equipement_destination_id']) {
            return response()->json(['message' => 'L\'appareil source et destination doivent être différents.'], 400);
        }

        $composant = Composant::findOrFail($valide['composant_id']);

        // 2. Traçabilité spécifique (Historique du transfert)
        $transfert = TransfertComposant::create([
            'composant_id' => $composant->id,
            'equipement_source_id' => $valide['equipement_source_id'],
            'equipement_destination_id' => $valide['equipement_destination_id'],
            'motif' => $valide['motif'],
            'user_id' => $valide['user_id']
        ]);

        // 3. L'Action : On déplace physiquement le composant dans la base
        $composant->equipement_id = $valide['equipement_destination_id'];
        $composant->save();

        // 4. Mouvement global pour le journal d'audit de la banque
        // Trace pour l'appareil qui a perdu la pièce
        Mouvement::create([
            'equipement_id' => $valide['equipement_source_id'],
            'type_mouvement' => 'EXTRACTION_COMPOSANT',
            'motif' => 'Extraction de la pièce : ' . $composant->nom_composant . ' pour réparation d\'un autre poste.',
            'user_id' => $valide['user_id']
        ]);

        // Trace pour l'appareil qui a reçu la pièce
        Mouvement::create([
            'equipement_id' => $valide['equipement_destination_id'],
            'type_mouvement' => 'AJOUT_COMPOSANT',
            'motif' => 'Ajout de la pièce : ' . $composant->nom_composant . ' issue du stock de rebut.',
            'user_id' => $valide['user_id']
        ]);

        return response()->json([
            'statut' => 'succès',
            'message' => 'Transfert du composant effectué et tracé avec succès.',
            'donnees' => $transfert
        ], 200);
    }
}