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
        Schema::create('diagnostics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('equipement_id')->constrained('equipements')->onDelete('cascade');
    $table->date('date_diagnostic');
    $table->foreignId('technicien_id')->constrained('users');
    $table->string('type_panne');
    $table->text('description_detaillee');
    $table->json('composants_affectes')->nullable();
    $table->integer('niveau_gravite');
    $table->text('solution_proposee')->nullable();
    $table->decimal('cout_reparation_estime', 10, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('diagnostics');
    }
};
