<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AuthController extends ApiController
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => [
                'required',
                'string',
                'min:8', // Minimum length of password
                'max:20', // Maximum length of password
                'regex:/[a-z]/', // At least one lowercase letter
                'regex:/[A-Z]/', // At least one uppercase letter
                // 'regex:/[0-9]/', // At least one number
                'regex:/[@$!%*?&]/', // At least one special character
            ],
        ]);

        // If validation fails, return errors
        if ($validator->fails()) {
            return $this->jsonError("Validation Error", $validator->errors(), 422);
        }

        $userValidated = $validator->validate();

        try {

            // Create the new user
            $user = User::create([
                'name' => $userValidated['name'],
                'email' => $userValidated['email'],
                'password' => Hash::make($userValidated['password']), // Hash the password
            ]);
            
            $token = $user?->createToken('FLUX')->plainTextToken;
        } catch(\Exception $e) {
            return $this->jsonError("Failed to create User", ['SQL_ERROR' => $e->getMessage()], 400);
        }

        // Return a successful response with the token
        return $this->jsonSuccess("User registered succesfully", ['token' => $token], 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);

        // If validation fails, return errors
        if ($validator->fails()) {
            return $this->jsonError("Validation Error", $validator->errors(), 422);
        }

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return $this->jsonError("Invalid credential", [], 401);
        }

        $token = $user->createToken($request->email)->plainTextToken;
        return $this->jsonSuccess('', ['token' => $token], 200);
    }

    public function logout(Request $request)
    {
        $request->user()?->currentAccessToken()->delete();
        return $this->jsonSuccess('User logged out successfully',[], 200);
    }

    
}
