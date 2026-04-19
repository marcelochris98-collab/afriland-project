<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class NiveauDefaillance extends Model
{
  

    use HasFactory;
    protected $guarded = [];

    // Un niveau de défaillance peut concerner plusieurs équipements
    public function equipements() { return $this->hasMany(Equipement::class); }

}
