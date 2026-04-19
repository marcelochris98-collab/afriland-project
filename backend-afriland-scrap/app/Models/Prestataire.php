<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Prestataire extends Model
{
    use HasFactory;
    protected $guarded = [];

    // Un prestataire effectue plusieurs maintenances
    public function maintenances() { return $this->hasMany(Maintenance::class); }
}