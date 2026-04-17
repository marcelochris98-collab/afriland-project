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
        Schema::create('transfert_composants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('composant_id')->constrained('composants');
    $table->foreignId('equipement_source_id')->constrained('equipements');
    $table->foreignId('equipement_destination_id')->constrained('equipements');
    $table->date('date_transfert');
    $table->foreignId('technicien_id')->constrained('users');
    $table->string('raison');
    $table->enum('resultat', ['succes', 'echec', 'en_cours']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transfert_composants');
    }
};
