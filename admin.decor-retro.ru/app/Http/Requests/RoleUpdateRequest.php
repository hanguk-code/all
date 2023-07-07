<?php

namespace App\Http\Requests;

use App\Models\User\Role;
use Illuminate\Foundation\Http\FormRequest;
use Symfony\Component\HttpFoundation\Response;

class RoleUpdateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name'         => [
                'sometimes',
                'required',
                'unique:role',
            ],
//            'permissions.*' => [
//                'integer',
//            ],
//            'permissions'   => [
//                'required',
//                'array',
//            ],
        ];
    }
}
