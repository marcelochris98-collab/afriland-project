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
        Schema::create('composants', function (Blueprint $table) {
    
    $table->id();
    $table->string('type_composant'); // CPU, RAM, etc.
    $table->string('marque')->nullable();
    $table->string('modele')->nullable();
    $table->string('numero_serie')->nullable();
    $table->enum('statut', ['fonctionnel', 'defectueux', 'en_test', 'installe']);
    
    // Traçabilité double
    $table->foreignId('equipement_origine_id')->constrained('equipements');
    $table->foreignId('equipement_actuel_id')->nullable()->constrained('equipements');
    
    $table->date('date_prelevement')->nullable();
    $table->json('compatibilite')->nullable();
    

     $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('composants');
    }
};
