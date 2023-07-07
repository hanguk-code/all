<?php

namespace App\Repositories;

use App\Models\User\Role;
use App\Models\User\Permission;

class RoleRepository
{
    protected $role;
    protected $permission;

    /**
     * Instantiate a new instance.
     *
     * @return void
     */
    public function __construct(Role $role, Permission $permission)
    {
        $this->role = $role;
        $this->permission = $permission;
    }

    /**
     * {@inheritDoc}
     */
    public function all($request)
    {
        if ( $request->input('client') ) {
            return $this->role->select('id', 'name', 'created_at', 'updated_at', 'deleted_at')->get();
        }

        $columns = ['id', 'name', 'updated_at'];

        $length = $request->input('length');
        $column = $request->input('column'); //Index
        $dir = $request->input('dir');
        $searchValue = $request->input('search');

        $query = $this->role->select('id', 'name', 'created_at', 'updated_at')
            ->orderBy($columns[$column], $dir);

        if ($searchValue) {
            $query->where(function($query) use ($searchValue) {
                $query->where('id', 'like', '%' . $searchValue . '%')
                    ->orWhere('name', 'like', '%' . $searchValue . '%')
                    ->orWhere('created_at', 'like', '%' . $searchValue . '%')
                    ->orWhere('updated_at', 'like', '%' . $searchValue . '%');
            });
        }

        $roles = $query->paginate($length);
        $columns = array (
            array('width' => '33%','label' => 'Id', 'name' => 'id'),
            array('width' => '33%','label' => 'Имя', 'name' => 'name')
        );
        $sortKey = 'id';

        return [
            'data' => $roles,
            'columns' => $columns,
            'sortKey' => $sortKey,
            'draw' => $request->input('draw')
        ];
    }

    /**
     * {@inheritDoc}
     */
    public function find(int $roleId)
    {
        $role = $this->role->with('permissions')->findOrFail($roleId);

        return $role;
    }

    /**
     * {@inheritDoc}
     */
    public function create($request)
    {
        foreach ($request['roles'] as $item) {
            $role = $this->role->create([
                'name' => $request['name'],
                'platform_id' => $item['platform_id']
            ]);

            $p = $item['permissions'];
            $pd = $item['permissions_data'];

            $len = count($p);
            $c = [];

            for($i = 0; $i < $len; $i++) {
                if($p[$i] !== 0) {
                    $c[] = $pd[$i];
                }
            }

            $role->permissions()->sync($c);
        }
    }

    /**
     * {@inheritDoc}
     */
    public function update(array $request, int $roleId)
    {
        foreach ($request['roles'] as $item) {
            if($item['role_id']) {
                $role = $this->role->update([
                    'name' => $request['name'],
                    'platform_id' => $item['platform_id']
                ]);
            } else {
                $role = $this->role->create([
                    'name' => $request['name'],
                    'platform_id' => $item['platform_id']
                ]);
            }

            $p = $item['permissions'];
            $pd = $item['permissions_data'];

            $len = count($p);
            $c = [];

            for($i = 0; $i < $len; $i++) {
                if($p[$i] !== 0) {
                    $c[] = $pd[$i];
                }
            }

            if($item['role_id']) {
                $this->role::find($item['role_id'])->permissions()->sync($c);
            } else {
                $role->permissions()->sync($c);
            }

        }
    }

    /**
     * {@inheritDoc}
     */
    public function createData()
    {
        $permissions = $this->permission->get();
        $permissionIds = $permissions->pluck('id');

        // $len = count($permissionIds);
        // $c = [];

        // for($i = 0; $i < $len; $i++) {
        //     $c[] = 0;
        // }

        // foreach ($platform as $item) {
        //     $platformCreateData[] = [
        //         'platform_name' => $item['name'],
        //         'platform_id' => $item['id'],
        //         'permissions' => $c,
        //         'permissions_data' => $permissions->pluck('id')
        //     ];
        // }

        return ['permissions' => $permissions];
    }


    /**
     * {@inheritDoc}
     */
    public function updateData(int $roleId)
    {
        $platform = $this->platform->select('id', 'name')->where('status', PlatformStatus::active())->get();
        $permissions = $this->permission->get();
        $permissionIds = $permissions->pluck('id');

        $len = count($permissionIds);

        foreach ($platform as $item) {
            $role = $this->role->find($roleId);
            $roleForPlatform = $this->role->where('platform_id', $item['id'])->where('name', $role->name)->with('permissions')->first();

            if(isset($roleForPlatform->id)){
                $roleFPPermission = $roleForPlatform->permissions->pluck('id')->toArray();
                $permissionPlatform = [];
                for($i = 0; $i < $len; $i++) {
                    if(in_array($permissionIds[$i], $roleFPPermission, true)) {
                        $permissionPlatform[] = 1;
                    } else {
                        $permissionPlatform[] = 0;
                    }
                }
            } else {
                $permissionPlatform = [];
                for($i = 0; $i < $len; $i++) {
                    $permissionPlatform[] = 0;
                }
            }


            $platformUpdateData[] = [
                'platform_name' => $item['name'],
                'platform_id' => $item['id'],
                'role_id' => $roleForPlatform->id ?? NULL,
                'permissions' => $permissionPlatform,
                'permissions_data' => $permissionIds
            ];
        }

        return ['platform_update_data' => $platformUpdateData, 'name' => $role->name, 'platform' => $platform, 'permissions' => $permissions];
    }


}
