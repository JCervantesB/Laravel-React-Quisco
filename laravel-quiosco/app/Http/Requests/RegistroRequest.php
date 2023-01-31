<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rules\Password as PasswordRules;
use Illuminate\Foundation\Http\FormRequest;

class RegistroRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => [
                'required', 
                'confirmed',
                PasswordRules::min(8)
                    ->letters()
                    ->numbers()
                    ->symbols()
            ],
        ];
    }

    public function messages() 
    {
        return [
            'name' => 'El nombre es obligatorio',
            'email' => 'El email es obligatorio',
            'email.email' => 'El email no es válido',
            'email.unique' => 'El email ya está registrado',
            'password' => 'El password debe contener al menos 8 caracteres, una letra, un número y un símbolo',

        ];
    }
}
