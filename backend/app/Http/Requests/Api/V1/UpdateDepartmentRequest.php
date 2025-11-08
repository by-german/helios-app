<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDepartmentRequest extends FormRequest
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
        $departmentId = $this->route('department')->id;

        // the unique rule must ignore the current record
        return [
            'name' => [
                # 'sometimes' is used for update requests. 
                # Executes the rest of the rules only if the field is present
                'sometimes',
                'required',
                'string',
                'max:45',
                # Check if the 'name' is unique in departments table
                # but ignore the current record (the one that is being updated)
                Rule::unique('departments')->ignore($departmentId)
            ],
            'parent_id' => 'nullable|integer|exists:departments,id',
            'ambassador_name' => 'nullable|string|max:255'
        ];
    }
}
