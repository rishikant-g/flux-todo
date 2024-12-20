<?php
namespace App\Http\Traits;

use Illuminate\Support\Facades\Log;

trait ResponseTrait {

    public function jsonSuccess($message = '', $data = [], $statusCode = 200)
    {
        $response = [];
        if(!empty($data)) $response = is_array($data) ? $data : [$data];
        $response['success'] = true;
        if(!empty($message)) $response['message'] = $message; 
        return response()->json($response, $statusCode);
    }

    public function jsonError($message = 'Failed', $errors = [], $statusCode = 400)
    {
        $response = [ 'message' => $message, 'success' => false];
        if(!empty($errors)) {
            $response['errors'] = $errors;
        }
        return response()->json($response, $statusCode);
    }
}