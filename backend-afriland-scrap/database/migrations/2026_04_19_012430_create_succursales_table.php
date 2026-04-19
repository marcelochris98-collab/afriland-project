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
        Schema::create('succursales', function (Blueprint $table) {
           $table->id();
        $table->string('nom'); // Ex: Agence Akwa
        $table->string('ville')->default('Douala'); 
        $table->string('code_agence')->unique(); // Ex: AFR-AKW-01
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('succursales');
    }
};
