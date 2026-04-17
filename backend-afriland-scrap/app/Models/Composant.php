<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;


class Composant extends Model
{
    protected $fillable = [
        'type_composant', 'marque', 'modele', 'numero_serie', 
        'statut', 'equipement_origine_id', 'equipement_actuel_id', 
        'date_prelevement', 'compatibilite'
    ];

    protected $casts = [
        'compatibilite' => 'array', // Transforme le JSON en tableau PHP automatiquement
    ];

    public function equipementOrigine(): BelongsTo
    {
        return $this->belongsTo(Equipement::class, 'equipement_origine_id');
    }

    public function equipementActuel(): BelongsTo
    {
        return $this->belongsTo(Equipement::class, 'equipement_actuel_id');
    }

    public function transferts(): HasMany
    {
        return $this->hasMany(TransfertComposant::class);
    }
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logAll()             // Surveille toutes les colonnes
            ->logOnlyDirty()       // N'enregistre que les colonnes qui ont réellement été modifiées
            ->dontSubmitEmptyLogs(); // Ne crée pas de log si rien n'a changé
    }
}