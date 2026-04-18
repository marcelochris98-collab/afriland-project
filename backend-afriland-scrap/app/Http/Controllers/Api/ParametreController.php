<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Categorie;
use App\Models\Emplacement;
use Illuminate\Http\JsonResponse;

class ParametreController extends Controller
{
    public function categories(): JsonResponse
    {
        return response()->json([
            'statut' => 'succès',
            'donnees' => Categorie::all()
        ]);
    }

    public function emplacements(): JsonResponse
    {
        return response()->json([
            'statut' => 'succès',
            'donnees' => Emplacement::all()
        ]);
    }
}