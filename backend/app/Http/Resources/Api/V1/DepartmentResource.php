<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DepartmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'level' => $this->level,
            'employee_count' => $this->employee_count,
            'ambassador_name' => $this->ambassador_name,
            'superior' => new DepartmentResource($this->whenLoaded('parent')),
            'subdepartments' => DepartmentResource::collection(
                $this->whenLoaded('subdepartments')
            ),
            'subdepartments_count' => $this->whenCounted(
                'subdepartments', $this->subdepartments()->count()
            ),
            'created_at' => $this->created_at->toIso8601String(),
        ];
    }
}
