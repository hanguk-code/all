<?php

use App\Models\User\Role;
use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    public function run()
    {
        $roles = [
            [
                'id'    => 1,
                'name' => 'Admin',
            ],
        ];

        Role::insert($roles);
    }
}
