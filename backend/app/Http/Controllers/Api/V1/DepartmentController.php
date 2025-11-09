<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\DepartmentResource;
use App\Http\Requests\Api\V1\StoreDepartmentRequest;
use App\Http\Requests\Api\V1\UpdateDepartmentRequest;
use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);

        $departments = Department::with('parent')
            ->with('subdepartments')
            ->withCount('subdepartments')
            ->latest()
            ->paginate($perPage);
        
        return DepartmentResource::collection($departments);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDepartmentRequest $request)
    {
        $department = Department::create($request->validated());
        return new DepartmentResource($department);
    }

    /**
     * Display the specified resource.
     */
    public function show(Department $department)
    {
        $department->load(['parent', 'subdepartments']);
        // $department->loadCount('subdepartments');
        return new DepartmentResource($department);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDepartmentRequest $request, Department $department)
    {
        $department->update($request->validated());
        return new DepartmentResource($department);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Department $department)
    {
        $department->delete();
        return response()->noContent(); // 204
    }

    /**
     * List subdepartments of a department
     */
    public function subdepartments(Department $department)
    {
        return DepartmentResource::collection($department->subdepartments);
    }
}
