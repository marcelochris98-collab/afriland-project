<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Mouvement;
use App\Models\Equipement;
use App\Models\Succursale;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class MouvementController extends Controller
{
    /**
     * TRANSFERER UN ÉQUIPEMENT D'UNE AGENCE À UNE AUTRE
     */
    public function transferer(Request $request): JsonResponse
    {
        $valide = $request->validate([
            'equipement_id' => 'required|exists:equipements,id',
            'succursale_destination_id' => 'required|exists:succursales,id',
            'motif' => 'required|string',
            'user_id' => 'required|exists:users,id' // L'agent IT qui fait l'action
        ]);

        $equipement = Equipement::findOrFail($valide['equipement_id']);
        $succursaleDepart = $equipement->succursale; // L'agence où il se trouve actuellement
        $succursaleArrivee = Succursale::findOrFail($valide['succursale_destination_id']);

        // Sécurité : On ne peut pas l'envoyer là où il est déjà
        if ($equipement->succursale_id === $succursaleArrivee->id) {
            return response()->json([
                'statut' => 'erreur',
                'message' => 'Cet appareil se trouve déjà dans cette agence.'
            ], 400);
        }

        $nomAgenceDepart = $succursaleDepart ? $succursaleDepart->nom : 'Stock Central';

        // 1. Enregistrer la trace légale (Le Mouvement)
        $mouvement = Mouvement::create([
            'equipement_id' => $equipement->id,
            'type_mouvement' => 'TRANSFERT_AGENCE',
            'agence_depart' => $nomAgenceDepart,
            'agence_arrivee' => $succursaleArrivee->nom,
            'motif' => $valide['motif'],
            'user_id' => $valide['user_id']
        ]);

        // 2. Mettre à jour l'adresse physique de l'appareil
        $equipement->succursale_id = $succursaleArrivee->id;
        $equipement->save();

        return response()->json([
            'statut' => 'succès',
            'message' => 'Transfert validé de ' . $nomAgenceDepart . ' vers ' . $succursaleArrivee->nom,
            'donnees' => $mouvement
        ], 200);
    }
}