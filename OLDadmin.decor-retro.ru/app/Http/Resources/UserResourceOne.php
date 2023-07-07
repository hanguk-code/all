<?php

namespace App\Http\Resources;

use App\Models\User\Role;

use Illuminate\Http\Resources\Json\JsonResource;


class UserResourceOne extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            //'profile' => $this->profile,
            'role' => $this->role,
            'roles' => array_map(
                function ($role) {
                    return $role['name'];
                },
                $this->roles->toArray()
            ),
            'roles_id' => array_map(
                function ($role) {
                    return $role['id'];
                },
                $this->roles->toArray()
            ),
            'permissions' => array_unique(array_map(
                function ($permission) {
                    return $permission['name'];
                },
                $this->getAllPermissions()
            )),
            'avatar' => '#',
            'password' => $this->password,
            'status' => $this->status,
        ];
    }

    public function getAllPermissions()
    {
        $permissions = [];

        foreach ($this->roles as $item) {
            $role = Role::with('permissions');
            $role = $role->where('name', $item->name);
            $role = $role->first();

            if(isset($role['permissions'][0])){
                foreach ($role['permissions'] as $permission) {
                    $permissions[] = $permission;
                }
            }

        }
        return $permissions;
    }
}

/**
 * @OA\Property( property="data", title="Data",description="Data wrapper", ref="#/components/schemas/User")
 */
