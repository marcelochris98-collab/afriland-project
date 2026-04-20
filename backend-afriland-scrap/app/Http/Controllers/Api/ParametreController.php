<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Categorie;
use App\Models\Succursale;
use App\Models\Emplacement;
use Illuminate\Http\JsonResponse;

class ParametreController extends Controller
{
    // Retourne les catégories pour les filtres du frontend
    public function categories(): JsonResponse
    {
        return response()->json([
            'statut'  => 'succès',
            'donnees' => Categorie::orderBy('nom')->get(['id', 'nom'])
        ]);
    }

    // Retourne les SUCCURSALES (agences bancaires) — pas les emplacements physiques
    public function emplacements(): JsonResponse
    {
        return response()->json([
            'statut'  => 'succès',
            'donnees' => Succursale::orderBy('nom')->get(['id', 'nom', 'ville', 'code_agence'])
        ]);
    }
}