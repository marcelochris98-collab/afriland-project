<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Diagnostic extends Model
{
    protected $fillable = [
        'equipement_id', 'date_diagnostic', 'technicien_id', 
        'type_panne', 'description_detaillee', 'composants_affectes', 
        'niveau_gravite', 'solution_proposee', 'cout_reparation_estime'
    ];

    protected $casts = [
        'composants_affectes' => 'array',
    ];

    public function equipement(): BelongsTo
    {
        return $this->belongsTo(Equipement::class);
    }

    public function technicien(): BelongsTo
    {
        return $this->belongsTo(User::class, 'technicien_id');
    }
}