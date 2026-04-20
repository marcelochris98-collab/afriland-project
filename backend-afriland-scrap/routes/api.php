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

// Toutes les routes de l'application sous /api/v1/
Route::prefix('v1')->group(function () {

    // ── AUTH (publique, sans token) ──────────────────
    Route::post('/login', [AuthController::class, 'login']);

    // ── ROUTES PROTÉGÉES (token Sanctum requis) ──────
    Route::middleware('auth:sanctum')->group(function () {

        // Équipements
        Route::get('/equipements',        [EquipementController::class, 'index']);
        Route::post('/equipements',       [EquipementController::class, 'store']);
        Route::get('/equipements/{id}',   [EquipementController::class, 'show']);
        Route::put('/equipements/{id}',   [EquipementController::class, 'update']);

        // Paramètres (catégories et emplacements/agences)
        Route::get('/categories',         [ParametreController::class, 'categories']);
        Route::get('/emplacements',       [ParametreController::class, 'emplacements']);

        // Maintenances
        Route::post('/maintenances',                    [MaintenanceController::class, 'store']);
        Route::put('/maintenances/{id}/cloturer',       [MaintenanceController::class, 'cloturer']);

        // Diagnostics (déclarer une panne)
        Route::post('/diagnostics',                     [DiagnosticController::class, 'store']);

        // Transferts de composants (cannibalisme IT)
        Route::post('/transferts-composants',           [TransfertComposantController::class, 'transferer']);

        // Mouvements inter-agences
        Route::post('/mouvements/transfert',            [MouvementController::class, 'transferer']);

        // Utilisateurs et profils
        Route::get('/utilisateurs',                     [UserController::class, 'index']);
        Route::put('/utilisateurs/{id}/profil',         [UserController::class, 'updateProfile']);
        Route::put('/utilisateurs/{id}/mot-de-passe',   [UserController::class, 'changePassword']);

        // Rapports (export PDF et Excel)
        Route::get('/rapports/pdf',                     [RapportController::class, 'exportPdf']);
        Route::get('/rapports/excel',                   [RapportController::class, 'exportExcel']);
    });
});