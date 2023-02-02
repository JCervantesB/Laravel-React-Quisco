<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\OlvideRequest;
use App\Http\Requests\RecuperarRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Http\Requests\RegistroRequest;

class AuthController extends Controller
{
    
    public function register(RegistroRequest $request) 
    {
        // Validar el registro
        $data = $request->validated();

        // Crear el usuario
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'recoveryToken' => Str::random(30)        
        ]);

        return [
            'token' => $user->createToken('token')->plainTextToken,
            'user' => $user
        ];
    }

    public function login(LoginRequest $request) 
    {
        $data = $request->validated();

        // Revisar el password
        if(!auth()->attempt($data)) {
            return response([
                'errors' => ['El email o la contraseña no son válidos']
            ], 422);
        }

        // Autenticar al usuario
        $user = Auth::user();

        return [
            'token' => $user->createToken('token')->plainTextToken,
            'user' => $user
        ];
    }

    public function logout(Request $request)
    {
       $user = $request->user();
       $user->currentAccessToken()->delete();

       return [
        'user' => null
       ];
    }

    
    public function olvide(OlvideRequest $request) 
    {
        $data = $request->validated();
        $user = User::where('email', $data['email'])->first();

        if($user) {
            $user->recoveryToken = Str::random(30);
            $user->save();
            
            Mail::send('emails.recovery', ['token' => $user->recoveryToken, 'nombre' => $user->name], function ($message) use ($user) {
                $message->to($user->email)
                        ->subject('Recuperación de Contraseña');
            });
        }

        return [
            'message' => 'Se ha enviado un email con las instrucciones para recuperar tu cuenta'
        ];
    }

    public function recuperar_cuenta(RecuperarRequest $request) 
    {   
        $data = $request->validated();
        $user = User::where('recoveryToken', $data['recoveryToken'])->first();

        if($user) {
            $user->password = bcrypt($data['password']);
            $user->recoveryToken = null;
            $user->save();
        }

        return [
            'user' => $user
        ];
    }
}
