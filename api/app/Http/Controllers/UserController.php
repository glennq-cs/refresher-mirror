<?php
namespace App\Http\Controllers;

use App\User;

class UserController extends Controller
{
    // use Notifiable;
    public function showAllUsers()
    {
        return response()->json(User::all());
    }
}