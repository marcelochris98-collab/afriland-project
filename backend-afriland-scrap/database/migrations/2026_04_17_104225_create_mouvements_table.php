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
        Schema::create('mouvements', function (Blueprint $table) {
          $table->id();
        $table->foreignId('equipement_id')->constrained()->onDelete('cascade');
        $table->string('type_mouvement'); // Ex: TRANSFERT, MISE_AU_REBUT, RETOUR_MAINTENANCE
        $table->string('agence_depart')->nullable(); 
        $table->string('agence_arrivee')->nullable();
        $table->text('motif');
        $table->foreignId('user_id')->constrained(); // L'agent IT qui enregistre l'action
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mouvements');
    }
};
