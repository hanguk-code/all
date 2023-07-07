<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;

use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\JResource;
use App\Http\Resources\UserResourceOne;
use App\Repositories\UserRepository;
use App\Models\User\User;

/**
 * Class UserController
 *
 * @package  App\Http\Controllers
 */
class UserController extends Controller
{
    /**
     * @var UserRepository
     */
    protected $userRepository;

    /**
     * UserController constructor.
     * @param UserRepository $userRepository
     */
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }


    public function index(Request $request)
    {
        $user = $this->userRepository->all($request);
        return new JResource($user);
    }

    public function store(UserStoreRequest $request)
    {
        $user = $this->userRepository->create($request->all());

        return (new JResource(['status' => 'success', 'user_id' => $user['id']]))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function meUser()
    {
        return new UserResourceOne($this->userRepository->find(Auth::id()));
    }


    public function show($userId)
    {
        $user = $this->userRepository->find($userId);
        return new UserResourceOne($user);
    }


    public function update(UserUpdateRequest $request, $userId)
    {
        $this->userRepository->update($request->all(), $userId);

        return (new JResource(['status' => 'success', 'id' => $userId]));
    }

    public function destroy($userId)
    {
        $this->userRepository->delete($userId);

        return response(null, Response::HTTP_NO_CONTENT);
    }

    public function createData()
    {
        $user = $this->userRepository->createData();
        return new JResource($user);
    }

    public function updateData()
    {
        $user = $this->userRepository->createData();
        return new JResource($user);
    }
}

