<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Succursale extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function users() { return $this->hasMany(User::class); }
    public function equipements() { return $this->hasMany(Equipement::class); }
}