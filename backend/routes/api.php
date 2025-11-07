<?php

use App\Http\Controllers\Api\V1\DepartmentController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
   Route::apiResource('departments', DepartmentController::class);
});

Route::fallback(function() {
    return response()->json(['message' => 'Not Found'], 404);
});