<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Emplacement extends Model
{
    protected $fillable = [
        'zone', 
        'reference_classeur', 
        'niveau_etagere'
    ];

    public function equipements(): HasMany
    {
        return $this->hasMany(Equipement::class);
    }
}