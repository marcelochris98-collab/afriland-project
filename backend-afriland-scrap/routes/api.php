<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EquipementController;
use App\Http\Controllers\Api\ParametreController;

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
});use App\Http\Controllers\Api\AuthController;

Route::post('/login', [AuthController::class, 'login']);