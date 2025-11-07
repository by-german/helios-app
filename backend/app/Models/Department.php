<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Department extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'parent_id',
        'ambassador_name',
        # level and employee_count are not editable, 
        # they are generated automatically
    ];

    /**
     * Domain logic: the level and employee_count are generated automatically
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($department) {
            $department->level = rand(1, 5);
            $department->employee_count = rand(1, 100);
        });
    }


    /**
     * A department has a superior department (a parent)
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Department::class, 'parent_id');
    }

    /**
     * A department has many sub-departments (children)
     */
    public function subdepartments(): HasMany
    {
        return $this->hasMany(Department::class, 'parent_id');
    }
}
