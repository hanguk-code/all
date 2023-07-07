<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoleStoreRequest;
use App\Http\Requests\RoleUpdateRequest;
use App\Http\Resources\JResource;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Repositories\RoleRepository;

class RoleController extends Controller
{

    /**
     * @var RoleRepository
     */
    protected $roleRepository;

    /**
     * RoleController constructor.
     * @param RoleRepository $roleRepository
     */
    public function __construct(RoleRepository $roleRepository)
    {
        $this->roleRepository = $roleRepository;
    }

    
    public function index(Request $request)
    {
        $role = $this->roleRepository->all($request);
        return new JResource($role);
    }

    public function store(RoleStoreRequest $request)
    {
        $this->roleRepository->create($request->all());

        return (new JResource(['status' => 'success']))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function show($roleId)
    {
        $role = $this->roleRepository->find($roleId);

        return new JResource($role);
    }

    public function update(RoleUpdateRequest $request, $roleId)
    {
        $this->roleRepository->update($request->all(), $roleId);

        return (new JResource(['status' => 'success', 'id' => $roleId]))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function destroy(Role $role)
    {
        $role->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }

    public function createData()
    {
        $role = $this->roleRepository->createData();
        return new JResource($role);
    }

    public function updateData(int $roleId)
    {
        $role = $this->roleRepository->updateData($roleId);
        return new JResource($role);
    }
}
