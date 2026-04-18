<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEquipementRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Pour l'instant on autorise, Spatie s'occupera des rôles sur la route
        return true; 
    }

    public function rules(): array
    {
        return [
            'numero_serie' => 'required|string|unique:equipements,numero_serie|max:255',
            'marque' => 'required|string|max:255',
            'modele' => 'required|string|max:255',
            'categorie' => 'required|string|max:255',
            'date_acquisition' => 'nullable|date',
            'date_entree_rebut' => 'required|date',
            'emplacement_id' => 'nullable|exists:emplacements,id',
            'observations' => 'nullable|string'
        ];
    }

    public function messages(): array
    {
        return [
            'numero_serie.unique' => 'Un équipement avec ce numéro de série est déjà enregistré au rebut.',
            'emplacement_id.exists' => 'L\'emplacement sélectionné n\'existe pas dans le magasin.'
        ];
    }
}