<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('maintenances', function (Blueprint $table) {
           $table->id();
        $table->foreignId('equipement_id')->constrained();
        // On enregistre le nom du technicien externe
        $table->string('nom_technicien_externe'); 
        // L'employé de la banque qui valide le travail
        $table->foreignId('user_id')->constrained(); 
        $table->text('diagnostic_technique');
        $table->dateTime('date_heure_intervention');
        $table->enum('statut_final', ['Réparé', 'Irréparable', 'En attente']);
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maintenances');
    }
};
