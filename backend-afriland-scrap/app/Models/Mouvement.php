<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Mouvement extends Model
{
    protected $fillable = [
        'equipement_id', 'type_mouvement', 'date_mouvement', 
        'utilisateur_id', 'localisation_destination', 
        'validateur_id', 'statut_validation', 'justification'
    ];

    public function equipement(): BelongsTo
    {
        return $this->belongsTo(Equipement::class);
    }

    public function utilisateur(): BelongsTo
    {
        return $this->belongsTo(User::class, 'utilisateur_id');
    }

    public function validateur(): BelongsTo
    {
        return $this->belongsTo(User::class, 'validateur_id');
    }
}