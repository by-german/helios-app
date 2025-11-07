<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('departments', function (Blueprint $table) {
            $table->id();
            $table->string('name', 45)->unique();
            $table->integer('level')->unsigned()->default(0);
            $table->integer('employee_count')->unsigned()->default(0);
            $table->string('ambassador_name')->nullable();

            # recursive relation
            $table->foreignId('parent_id')
                ->nullable()
                ->constrained('departments')
                ->onDelete('set null');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('departments');
    }
};
