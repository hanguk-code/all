<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Hash;
use App\Models\User\User;
use App\Models\User\Role;

class UserRepository
{
    protected $user;
    protected $role;

    /**
     * UserRepository constructor.
     * @param User $user
     * @param Role $role
     */
    public function __construct(User $user, Role $role)
    {
        $this->user = $user;
        $this->role = $role;
    }

    /**
     * {@inheritDoc}
     */
    public function all($request)
    {
        if ($request->input('client')) {
            return $this->user->select('id', 'name', 'email', 'status', 'created_at', 'updated_at', 'deleted_at')->get();
        }

        $columns = ['id', 'name', 'email', 'status', 'updated_at'];

        $length = $request->input('length');
        $column = $request->input('column'); //Index
        $dir = $request->input('dir');
        $searchValue = $request->input('search');

        $query = $this->user->select('id', 'name', 'password', 'email', 'status', 'created_at', 'updated_at')
            ->orderBy($columns[$column], $dir);

        if ($searchValue) {
            $query->where(function ($query) use ($searchValue) {
                $query->where('id', 'like', '%' . $searchValue . '%')
                    ->orWhere('name', 'like', '%' . $searchValue . '%')
                    ->orWhere('email', 'like', '%' . $searchValue . '%')
                    ->orWhere('status', 'like', '%' . $searchValue . '%')
                    ->orWhere('created_at', 'like', '%' . $searchValue . '%')
                    ->orWhere('updated_at', 'like', '%' . $searchValue . '%');
            });
        }

        $data = $query->paginate($length);
        $columns = array(
            array('width' => '33%', 'label' => 'Id', 'name' => 'id'),
            array('width' => '33%', 'label' => 'ФИО', 'name' => 'name'),
            array('width' => '33%', 'label' => 'Email', 'name' => 'email'),
            array('width' => '33%', 'label' => 'Статус', 'name' => 'status'),
            array('width' => '33%', 'label' => 'Даты', 'name' => 'dates')
        );

        $statusClass = array(
            array('status' => 'active', 'badge' => 'kt-badge--success'),
            array('status' => 'blocked', 'badge' => 'kt-badge--danger')
        );

        $sortKey = 'id';

        return [
            'data' => $data,
            'columns' => $columns,
            'statusClass' => $statusClass,
            'sortKey' => $sortKey,
            'draw' => $request->input('draw')
        ];
    }

    /**
     * {@inheritDoc}
     */
    public function create(array $request)
    {
        $user = $this->user->create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => Hash::make($request['password']),
            'status' => $request['status'],
            'role' => $request['role'],
        ]);
        //$user = $this->user->create($request);
        // if(isset($request['profile'])){
        //     $user->profile()->create($request['profile']);
        // }
        // if(isset($request['roles'])){
        //     $user->roles()->sync($request['roles']);
        // }

        return $user;
    }

    /**
     * {@inheritDoc}
     */
    public function find(int $userId)
    {
        return $this->user->with(['roles'])->findOrFail($userId);
    }

    /**
     * {@inheritDoc}
     */
    public function update(array $request, int $userId)
    {
        if (!empty($request['password'])) {
            $request['password'] = Hash::make($request['password']);
        }

        $this->user::find($userId)->update($request);
        if (isset($request['profile'])) {
            if (isset($request['profile']['id'])) {
                $this->user::find($userId)->profile()->update($request['profile']);
            } else {
                $this->user::find($userId)->profile()->create($request['profile']);
            }
        }
        // if(isset($request['roles'])){
        //     $this->user::find($userId)->roles()->sync($request['roles']);
        // }
    }

    /**
     * {@inheritDoc}
     */
    public function destroy(int $userId)
    {
        $user = $this->user->find($userId);
        $user->delete();
    }

    /**
     * {@inheritDoc}
     */
    public function createData()
    {
        $role = $this->role->select('id', 'name')->get();
        $roleU = $role->unique('name');
        $status = ['active', 'blocked'];

        $roleUnique = [];
        foreach ($roleU as $item) {
            $roleUnique[] = $item;
        }

        $data = [
            'role' => $roleUnique,
            'status' => $status,
        ];

        return $data;
    }

    /**
     * {@inheritDoc}
     */
    public function updateData(int $userId)
    {
//        $user = $this->userRepository->createData();
//
//        return $user;
    }

}
