<?php

use App\Models\User\Permission;
use Illuminate\Database\Seeder;

class PermissionsTableSeeder extends Seeder
{
    public function run()
    {
        /**
         * Create - if user can create Object and view own Objects
         * Edit - if user can edit all Objects and view own Objects
         * Show - if user can view all Objects in table
         * Delete - if user can delete all Objects in table
         */
        $permissions = [
            [
                'name' => 'role_create',
            ],
            [
                'name' => 'role_edit',
            ],
            [
                'name' => 'role_show',
            ],
            [
                'name' => 'role_delete',
            ],
            [
                'name' => 'user_system_create',
            ],
            [
                'name' => 'user_system_edit',
            ],
            [
                'name' => 'user_system_show',
            ],
            [
                'name' => 'user_system_delete',
            ],
            [
                'name' => 'user_web_create',
            ],
            [
                'name' => 'user_web_edit',
            ],
            [
                'name' => 'user_web_show',
            ],
            [
                'name' => 'user_web_delete',
            ],
            [
                'name' => 'item_create',
            ],
            [
                'name' => 'item_edit',
            ],
            [
                'name' => 'item_show',
            ],
            [
                'name' => 'item_delete',
            ],
            [
                'name' => 'order_create',
            ],
            [
                'name' => 'order_edit',
            ],
            [
                'name' => 'order_show',
            ],
            [
                'name' => 'order_delete',
            ],
            [
                'name' => 'language_create',
            ],
            [
                'name' => 'language_edit',
            ],
            [
                'name' => 'language_show',
            ],
            [
                'name' => 'language_delete',
            ],
            [
                'name' => 'language_texts_show',
            ],
            [
                'name' => 'language_texts_edit',
            ],
            [
                'name' => 'language_export',
            ],

        ];

        Permission::insert($permissions);
    }
}
