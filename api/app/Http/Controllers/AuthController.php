<?php
namespace App\Http\Controllers;

use Validator;
use App\User;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Firebase\JWT\ExpiredException;
use Illuminate\Support\Facades\Hash;
use Laravel\Lumen\Routing\Controller as BaseController;

class AuthController extends BaseController
{
    private $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    protected function jwt(User $user)
    {
        $payload = [
            'iss' => 'lumen-jwt',
            'sub' => $user->id,
            'iat' => time(),
            'exp' => time() + 60*60
        ];

        return JWT::encode($payload, env('JWT_SECRET'));
    }

    public function authenticate(User $user)
    {
        $this->validate($this->request, [
            'username' => 'required',
            'password' => 'required'
        ]);

        $user = User::where('username', $this->request->input('username'))->first();

        if (!$user) {
            return response()->json([
                'error' => 'Username does not exist.'
            ], 400);
        }

        if (Hash::check($this->request->input('password'), $user->password)) {
            return response()->json([
                'code' => 200,
                'access_token' => $this->jwt($user),
                'token_type' => 'bearer'
            ], 200);
        }

        return response()->json([
            'error' => 'Username or password is invalid.'
        ], 400);
    }
    
}
