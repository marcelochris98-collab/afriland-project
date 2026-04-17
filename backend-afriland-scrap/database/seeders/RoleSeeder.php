<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        // Les 5 rôles stricts du cahier des charges
        $roles = [
            'Administrateur système',
            'Responsable IT',
            'Technicien',
            'Agent de sécurité',
            'Auditeur'
        ];

        foreach ($roles as $role) {
            Role::create(['name' => $role]);
        }
    }
}