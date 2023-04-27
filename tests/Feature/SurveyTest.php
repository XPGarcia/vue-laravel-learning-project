<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Survey;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Sequence;

class SurveyTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_one_survey_by_id(): void
    {
        $survey = Survey::factory()->create();

        $user = User::find($survey->user_id);

        $response = $this->actingAs($user)->get('/api/survey/' . $survey->id);

        $response->assertJsonFragment([
            'id' => $survey->id,
            'title' => $survey->title,
            'slug' => $survey->slug,
            'status' => $survey->status,
            'description' => $survey->description,
        ]);

        $response->assertStatus(200);
    }
}
