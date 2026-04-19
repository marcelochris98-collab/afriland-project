<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Diagnostic extends Model
{
    use HasFactory;
    
    protected $guarded = [];

    protected $fillable = [
        'equipement_id', 'date_diagnostic', 'technicien_id', 
        'type_panne', 'description_detaillee', 'composants_affectes', 
        'niveau_gravite', 'solution_proposee', 'cout_reparation_estime'
    ];

    protected $casts = [
        'composants_affectes' => 'array',
    ];

   // Les liaisons
    public function equipement() { return $this->belongsTo(Equipement::class); }
    public function niveauDefaillance() { return $this->belongsTo(NiveauDefaillance::class); }
    public function user() { return $this->belongsTo(User::class); }
}