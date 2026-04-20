<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Ajouter succursale_id à equipements
        Schema::table('equipements', function (Blueprint $table) {
            $table->foreignId('succursale_id')
                  ->nullable()
                  ->after('emplacement_id')
                  ->constrained('succursales')
                  ->nullOnDelete();

            // Corriger l'enum statut pour inclure tous les cas frontend
            $table->enum('statut', [
                'en_service',
                'en_maintenance',
                'en_rebut',
                'repare',
                'transfere',
                'detruit',
                'partiel',
            ])->default('en_service')->change();
        });

        // Corriger mouvements pour aligner migration et modèle
        Schema::table('mouvements', function (Blueprint $table) {
            // Ajouter les colonnes du modèle manquantes dans la migration
            $table->dateTime('date_mouvement')->nullable()->after('type_mouvement');
            $table->string('localisation_destination')->nullable()->after('agence_arrivee');
            $table->foreignId('validateur_id')->nullable()->after('user_id')->constrained('users')->nullOnDelete();
            $table->enum('statut_validation', ['en_attente', 'valide', 'rejete'])->default('en_attente')->after('validateur_id');
            $table->text('justification')->nullable()->after('statut_validation');

            // Renommer user_id en utilisateur_id pour coller au modèle
            $table->renameColumn('user_id', 'utilisateur_id');
        });

        // Ajouter prestataire_id à maintenances
        Schema::table('maintenances', function (Blueprint $table) {
            $table->foreignId('prestataire_id')
                  ->nullable()
                  ->after('equipement_id')
                  ->constrained('prestataires')
                  ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('equipements', function (Blueprint $table) {
            $table->dropForeign(['succursale_id']);
            $table->dropColumn('succursale_id');
        });

        Schema::table('mouvements', function (Blueprint $table) {
            $table->renameColumn('utilisateur_id', 'user_id');
            $table->dropForeign(['validateur_id']);
            $table->dropColumn([
                'date_mouvement', 'localisation_destination',
                'validateur_id', 'statut_validation', 'justification'
            ]);
        });

        Schema::table('maintenances', function (Blueprint $table) {
            $table->dropForeign(['prestataire_id']);
            $table->dropColumn('prestataire_id');
        });
    }
};