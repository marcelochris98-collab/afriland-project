<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * 1. LISTER LES UTILISATEURS (Pour le panneau Super-Admin)
     */
    public function index(): JsonResponse
    {
        // On récupère les utilisateurs avec le nom de leur agence (succursale)
        $users = User::with('succursale')->get();
        
        return response()->json([
            'statut' => 'succès',
            'donnees' => $users
        ], 200);
    }

    /**
     * 2. METTRE À JOUR SON PROFIL (Nom, Email, etc.)
     */
    public function updateProfile(Request $request, $id): JsonResponse
    {
        $user = User::findOrFail($id);

        $valide = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,' . $user->id,
            'avatar' => 'nullable|string', // Pour une future photo de profil
        ]);

        $user->update($valide);

        return response()->json([
            'statut' => 'succès',
            'message' => 'Profil mis à jour avec succès.',
            'donnees' => $user
        ], 200);
    }

    /**
     * 3. CHANGER SON MOT DE PASSE (Sécurité Bancaire)
     */
    public function changePassword(Request $request, $id): JsonResponse
    {
        $user = User::findOrFail($id);

        $request->validate([
            'ancien_mot_de_passe' => 'required',
            'nouveau_mot_de_passe' => 'required|min:8|confirmed', // Confirmed oblige à envoyer 'nouveau_mot_de_passe_confirmation'
        ]);

        // Vérification que l'ancien mot de passe est correct
        if (!Hash::check($request->ancien_mot_de_passe, $user->password)) {
            return response()->json([
                'statut' => 'erreur',
                'message' => 'L\'ancien mot de passe est incorrect.'
            ], 400);
        }

        // Hashage et sauvegarde du nouveau mot de passe
        $user->password = Hash::make($request->nouveau_mot_de_passe);
        $user->save();

        return response()->json([
            'statut' => 'succès',
            'message' => 'Le mot de passe a été modifié et sécurisé.'
        ], 200);
    }
}