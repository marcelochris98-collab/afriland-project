<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;


class TransfertComposant extends Model
{
    protected $fillable = [
        'composant_id', 'equipement_source_id', 'equipement_destination_id', 
        'date_transfert', 'technicien_id', 'raison', 'resultat'
    ];

    public function composant(): BelongsTo
    {
        return $this->belongsTo(Composant::class);
    }

    public function source(): BelongsTo
    {
        return $this->belongsTo(Equipement::class, 'equipement_source_id');
    }

    public function destination(): BelongsTo
    {
        return $this->belongsTo(Equipement::class, 'equipement_destination_id');
    }

    public function technicien(): BelongsTo
    {
        return $this->belongsTo(User::class, 'technicien_id');
    }
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logAll()             // Surveille toutes les colonnes
            ->logOnlyDirty()       // N'enregistre que les colonnes qui ont réellement été modifiées
            ->dontSubmitEmptyLogs(); // Ne crée pas de log si rien n'a changé
    }
}