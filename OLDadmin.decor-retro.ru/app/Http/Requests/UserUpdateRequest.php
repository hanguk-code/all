<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Symfony\Component\HttpFoundation\Response;

class UserUpdateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name'    => [
                'sometimes',
                'required',
            ],
            'email'   => [
                'sometimes',
                'required',
                'email',
                'unique:user,email,' . request()->route('user'),
            ],
            'password' => [
                'sometimes',
                'required',
            ],
            'roles'    => [
                'sometimes',
                'required',
            ],
        ];
    }

}