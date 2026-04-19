<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Maintenance extends Model
{
    use HasFactory;
    
    // Autorise le remplissage de toutes les colonnes
    protected $guarded = []; 

    // La maintenance concerne UN équipement
    public function equipement() { 
        return $this->belongsTo(Equipement::class); 
    }

    // La maintenance est faite par UN prestataire (entreprise externe)
    public function prestataire() { 
        return $this->belongsTo(Prestataire::class); 
    }

    // La maintenance a été validée/supervisée par UN agent IT (User)
    public function agentIt() { 
        // On précise la clé étrangère 'user_id' pour être sûr que Laravel trouve le bon champ
        return $this->belongsTo(User::class, 'user_id'); 
    }
}