<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Foundation\Http\FormRequest;

class StoreDepartmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // no authorization required
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            # the name should be unique in the name column of the departments table
            'name' => 'required|string|max:45|unique:departments,name',
            # if parent_id is not null, it should be an integer 
            # and it should exist in the id column of the departments table
            'parent_id' => 'nullable|integer|exists:departments,id',
            'ambassador_name' => 'nullable|string|max:255'
        ];
    }
}
