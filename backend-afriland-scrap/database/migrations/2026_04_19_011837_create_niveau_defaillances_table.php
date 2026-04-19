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
        Schema::create('niveau_defaillances', function (Blueprint $table) {
           $table->id();
        $table->string('libelle'); // Ex: Mineure, Majeure, Critique, Irréparable
        $table->string('code_couleur')->nullable(); // Ex: #ff0000 (Rouge) pour le Frontend
        $table->integer('ordre_priorite')->default(1); // Pour trier du moins grave au plus grave
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('niveau_defaillances');
    }
};
