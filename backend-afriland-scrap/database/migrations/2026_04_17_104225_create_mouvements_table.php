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
            $table->foreignId('equipement_id')->constrained('equipements');
    $table->enum('type_mouvement', ['entree', 'sortie', 'transfert', 'destruction']);
    $table->date('date_mouvement');
    $table->foreignId('utilisateur_id')->constrained('users');
    $table->string('localisation_destination')->nullable();
    $table->foreignId('validateur_id')->nullable()->constrained('users');
    $table->enum('statut_validation', ['en_attente', 'valide', 'refuse'])->default('en_attente');
    $table->text('justification')->nullable();
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
