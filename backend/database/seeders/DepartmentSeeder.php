<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        # root department (no parent)
        Department::factory(5)->create(
            ['parent_id' => null]
        );

        # getting the ids of created departments
        $parentIds = Department::pluck('id');

        # Create subdepartments
        Department::factory(20)->create([
            'parent_id'=> $parentIds->random()
        ]);
    }
}
