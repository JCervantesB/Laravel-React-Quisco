<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rules\Password as PasswordRules;
use Illuminate\Foundation\Http\FormRequest;

class RecuperarRequest extends FormRequest
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
        // Recuperar cuenta que contenga el recoveryToken
        return [
            'email' => 'email|exists:users,email',
            'recoveryToken' => 'required|exists:users,recoveryToken',
            'password' => [
                'required', 
                PasswordRules::min(8)
                    ->letters()
                    ->numbers()
                    ->symbols()
            ]
        ];
    }

    public function messages() 
    {
        return [
            'recoveryToken' => 'El token de recuperación es obligatorio',
            'recoveryToken.exists' => 'El token de recuperación no es válido',
            'password' => 'El password debe contener al menos 8 caracteres, una letra, un número y un símbolo',
        ];
    }
}
