<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EquipementController;
use App\Http\Controllers\Api\ParametreController;
use App\Http\Controllers\Api\MaintenanceController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TransfertComposantController;
use App\Http\Controllers\Api\DiagnosticController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\MouvementController;
use App\Http\Controllers\Api\RapportController;

// Route de test par défaut de Laravel
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Nos routes pour l'application Afriland (regroupées sous /api/v1/)
Route::prefix('v1')->group(function () {
    // Liste de tout le stock
    Route::get('/equipements', [EquipementController::class, 'index']);
    
    // Enregistrement
    Route::post('/equipements', [EquipementController::class, 'store']);
    
    // Voir un appareil précis
    Route::get('/equipements/{id}', [EquipementController::class, 'show']);
    
    // Modifier un appareil
    Route::put('/equipements/{id}', [EquipementController::class, 'update']);
    Route::get('/categories', [ParametreController::class, 'categories']);
    Route::get('/emplacements', [ParametreController::class, 'emplacements']);
    Route::post('/maintenances', [MaintenanceController::class, 'store']);
    Route::put('/maintenances/{id}/cloturer', [MaintenanceController::class, 'cloturer']);
    // L'API de transfert de pièces
Route::post('/transferts-composants', [TransfertComposantController::class, 'transferer']);
// L'API pour déclarer une panne
Route::post('/diagnostics', [DiagnosticController::class, 'store']);
});

Route::post('/login', [AuthController::class, 'login']);
// Gestion des Utilisateurs et Profils
Route::get('/utilisateurs', [UserController::class, 'index']);
Route::put('/utilisateurs/{id}/profil', [UserController::class, 'updateProfile']);
Route::put('/utilisateurs/{id}/mot-de-passe', [UserController::class, 'changePassword']);
// L'API pour transférer du matériel entre agences
Route::post('/mouvements/transfert', [MouvementController::class, 'transferer']);
// L'API pour télécharger les rapports
Route::get('/rapports/pdf', [RapportController::class, 'exportPdf']);
Route::get('/rapports/excel', [RapportController::class, 'exportExcel']);