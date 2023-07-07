<?php

namespace App\Http\Controllers;

use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use App\Http\Resources\JResource;
use App\Repositories\CategoryRepository;

/**
 *
 * Class CategoryController
 *
 * @package  App\Http\Controllers
 */
class CategoryController extends Controller
{
    /**
     * @var CategoryRepository
     */
    protected $categoryRepository;

    /**
     * ItemController constructor.
     * @param CategoryRepository $categoryRepository
     */
    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    /**
     *
     */
    public function index(Request $request)
    {
        $category = $this->categoryRepository->all($request);
        return new JResource($category);
    }

    /**
     *
     */
    public function store(Request $request)
    {
        $this->categoryRepository->create($request->all());

        return (new JResource(['status' => 'success']))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    /**
     *
     */
    public function show(int $categoryId)
    {
        $category = $this->categoryRepository->find($categoryId);
        return new JResource($category);
    }

    /**
     *
     */
    public function update(Request $request, $categoryId)
    {
        $this->categoryRepository->update( $request->all(), $categoryId);

        return (new JResource(['status' => 'success', 'id' => request()->route('flower')]));
    }

    /**
     *
     */
    public function destroy(int $categoryId)
    {
        $this->categoryRepository->delete($categoryId);

        return response(null, Response::HTTP_NO_CONTENT);
    }
}

