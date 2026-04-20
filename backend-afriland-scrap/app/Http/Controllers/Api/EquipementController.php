<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Equipement;
use App\Http\Requests\StoreEquipementRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class EquipementController extends Controller
{
    /**
     * LISTER TOUT LE STOCK
     */
   public function index(Request $request): JsonResponse
{
    $query = Equipement::with(['succursale', 'emplacement'])->latest();

    if ($request->filled('search')) {
        $s = $request->search;
        $query->where(function ($q) use ($s) {
            $q->where('numero_serie', 'like', "%{$s}%")
              ->orWhere('marque', 'like', "%{$s}%")
              ->orWhere('modele', 'like', "%{$s}%");
        });
    }

    if ($request->filled('categorie')) {
        $query->where('categorie', $request->categorie);
    }

    if ($request->filled('statut')) {
        $map = [
            'En service'     => ['en_service', 'repare'],
            'En maintenance' => ['en_maintenance'],
            'Au rebut'       => ['en_rebut', 'detruit'],
            'Transféré'      => ['transfere'],
            'Partiel'        => ['partiel'],
        ];
        $valeurs = $map[$request->statut] ?? [$request->statut];
        $query->whereIn('statut', $valeurs);
    }

    if ($request->filled('agence')) {
        $query->whereHas('succursale', function ($q) use ($request) {
            $q->where('nom', $request->agence);
        });
    }

    return response()->json([
        'statut'  => 'succès',
        'donnees' => $query->get()
    ]);
}

    /**
     * ENREGISTRER (Déjà fait, on le garde)
     */
    public function store(StoreEquipementRequest $request): JsonResponse
{
    $donnees = $request->validated();
    $equipement = Equipement::create($donnees);

    $qrCodeSvg = QrCode::size(200)->generate($equipement->numero_serie);
    $qrCodeBase64 = base64_encode($qrCodeSvg);

    return response()->json([
        'statut'  => 'succès',
        'message' => 'Équipement enregistré avec succès.',
        'donnees' => [                                    // ← était "data"
            'equipement' => $equipement,
            'qr_code'    => 'data:image/svg+xml;base64,' . $qrCodeBase64
        ]
    ], 201);
}

    /**
     * VOIR UN APPAREIL PRÉCIS (Détails)
     */
    public function show($id): JsonResponse
    {
        $equipement = Equipement::find($id);

        if (!$equipement) {
            return response()->json(['message' => 'Équipement non trouvé'], 404);
        }

        return response()->json([
            'statut' => 'succès',
            'donnees' => $equipement
        ]);
    }

    /**
     * MODIFIER UN APPAREIL
     */
    public function update(Request $request, $id): JsonResponse
    {
        $equipement = Equipement::find($id);

        if (!$equipement) {
            return response()->json(['message' => 'Équipement non trouvé'], 404);
        }

        // On valide seulement ce qui est envoyé (parfois on ne change que l'état)
        $valide = $request->validate([
            'marque' => 'sometimes|string',
            'modele' => 'sometimes|string',
            'observations' => 'nullable|string',
        ]);

        $equipement->update($valide);

        return response()->json([
            'statut' => 'succès',
            'message' => 'Mise à jour réussie',
            'donnees' => $equipement
        ]);
    }
}