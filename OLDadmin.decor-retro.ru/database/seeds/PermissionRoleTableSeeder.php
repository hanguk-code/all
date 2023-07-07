<?php

use App\Models\User\Permission;
use App\Models\User\Role;
use Illuminate\Database\Seeder;

class PermissionRoleTableSeeder extends Seeder
{
    public function run()
    {
        $adminPermissions = Permission::all();
        Role::findOrFail(1)->permissions()->sync($adminPermissions->pluck('id'));
//        $user_permissions = $admin_permissions->filter(function ($permission) {
//            return substr($permission->title, 0, 5) != 'user_' && substr($permission->title, 0, 5) != 'role_' && substr($permission->title, 0, 11) != 'permission_';
//        });
        //Role::findOrFail(2)->permissions()->sync($user_permissions);
    }
}
