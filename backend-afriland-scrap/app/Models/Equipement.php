<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
}