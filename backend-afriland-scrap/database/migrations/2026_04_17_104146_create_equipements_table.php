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
        Schema::create('equipements', function (Blueprint $table) {
    $table->id();
    $table->string('numero_serie')->unique();
    $table->string('marque');
    $table->string('modele');
    $table->string('categorie');
    $table->date('date_acquisition')->nullable();
    $table->date('date_entree_rebut');
    $table->enum('statut', ['en_rebut', 'repare', 'detruit', 'transfere'])->default('en_rebut');
    $table->integer('niveau_defaillance')->nullable(); // 1-5
    $table->enum('etat_apres_prelevement', ['intact', 'donneur', 'receveur'])->default('intact');
    
    // Relation avec l'emplacement
    $table->foreignId('emplacement_id')->nullable()->constrained('emplacements')->nullOnDelete();
    
    $table->text('observations')->nullable();
    $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipements');
    }
};
