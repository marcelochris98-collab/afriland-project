<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class Equipement extends Model
{
    protected $fillable = [
        'numero_serie', 'marque', 'modele', 'categorie', 
        'date_acquisition', 'date_entree_rebut', 'statut', 
        'niveau_defaillance', 'etat_apres_prelevement', 
        'emplacement_id', 'observations'
    ];

    // Les pièces qu'il contient d'origine
    public function composantsOrigine(): HasMany
    {
        return $this->hasMany(Composant::class, 'equipement_origine_id');
    }

    // Les pièces qui sont actuellement installées dedans (suite à un transfert)
    public function composantsActuels(): HasMany
    {
        return $this->hasMany(Composant::class, 'equipement_actuel_id');
    }

    public function diagnostics(): HasMany
    {
        return $this->hasMany(Diagnostic::class);
    }

    public function emplacement(): BelongsTo
    {
        return $this->belongsTo(Emplacement::class);
    }
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logAll()             // Surveille toutes les colonnes
            ->logOnlyDirty()       // N'enregistre que les colonnes qui ont réellement été modifiées
            ->dontSubmitEmptyLogs(); // Ne crée pas de log si rien n'a changé
    }
    public function succursale() { return $this->belongsTo(Succursale::class); }
    public function niveauDefaillance() { return $this->belongsTo(NiveauDefaillance::class); }
    
    // Historique
    public function maintenances() { return $this->hasMany(Maintenance::class); }
    public function mouvements() { return $this->hasMany(Mouvement::class); }
}