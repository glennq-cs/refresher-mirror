<?php

namespace App\Http\Controllers;

use Validator;
use App\Category;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // use Notifiable;
    public function showAllCategories()
    {
        $categories = Category::all();

        $response = [
            'status' => 'success',
            'message' => 'Categories list.',
            'data' => $categories
        ];

        return response()->json($response, 200);
    }

    public function create(Request $request)
    {
        $validate = $this->validate($request, [
            'name' => 'required|unique:categories',
            'description' => 'required'
        ]);

        $category = Category::create($request->all());
        
        if ($category) {
            $response = [
                'status' => 'success',
                'message' => 'Category has been successfully created.',
                'data' => $category
            ];
        }
        
        return response()->json($response, 201);
    }

    public function update($id, Request $request)
    {

        $category = Category::findOrFail($id);

        $categoryResponse = $category->update($request->all());

        if ($categoryResponse) {
            $response = [
                'status' => 'success',
                'message' => "Category has been successfully updated.",
            ];

            return response()->json($response, 200);
        }

        $response = [
            'status' => 'failed',
            'message' => 'Category could not be update.',
            'data' => $categoryResponse
        ];

        return response()->json($response, 404);
    }

    public function delete($id)
    {
        Category::findOrFail($id)->delete();

        $response = [
            'status' => 'success',
            'message' => "Category has been deleted successfully.",
        ];

        return response($response, 200);
    }
}