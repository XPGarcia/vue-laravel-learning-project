<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Survey;
use App\Models\User;
use DateInterval;
use DateTime;
use Illuminate\Testing\Fluent\AssertableJson;

class SurveyTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_one_survey_by_id(): void
    {
        $survey = Survey::factory()->create();
        $user = User::find($survey->user_id);

        $response = $this->actingAs($user)->get('/api/surveys/' . $survey->id);

        $response->assertJson(
            fn (AssertableJson $json) => $json
                ->hasAll([
                    'data',
                    'data.id',
                    'data.title',
                    'data.slug',
                    'data.status',
                    'data.description',
                    'data.created_at',
                    'data.updated_at',
                    'data.expire_date',
                    'data.questions'
                ])
        );

        $response->assertOk();
    }

    public function test_get_surveys_list_count(): void
    {
        $count = 5;
        $user = User::factory()->create();
        Survey::factory()->count($count)->create([
            "user_id" => $user->id
        ]);

        $response = $this->actingAs($user)->get("/api/surveys");

        $response->assertOk();
        $response->assertJson(
            fn (AssertableJson $json) => $json
                ->hasAll(["data", "meta", "links"])
                ->has("data", $count)
        );
    }

    public function test_get_surveys_structure(): void
    {
        $count = 2;
        $user = User::factory()->create();
        Survey::factory()->count($count)->create([
            "user_id" => $user->id
        ]);

        $response = $this->actingAs($user)->get("/api/surveys");

        $response->assertOk();
        $response->assertJson(
            fn (AssertableJson $json) => $json
                ->hasAll(["data", "meta", "links"])
                ->has(
                    "data.0",
                    fn ($json) =>
                    $json->hasAll([
                        "id",
                        "title",
                        "slug",
                        "status",
                        "description",
                        "created_at",
                        "updated_at",
                        "expire_date",
                        "questions"
                    ])
                )
        );
    }

    public function test_create_survey(): void
    {
        $user = User::factory()->create();
        $now = new DateTime();
        $expire_date = $now->add(new DateInterval('P1W'));
        $survey = [
            "user_id" => $user->id,
            "title" => "New title",
            "status" => true,
            "description" => "A whole new description",
            "expire_date" => $expire_date->format('Y-m-d H:i:s')
        ];

        $response = $this->actingAs($user)->post("/api/surveys", $survey);

        $response->assertCreated();
        $response->assertJson(
            fn (AssertableJson $json) => $json
                ->hasAll([
                    'data',
                    'data.id',
                    'data.title',
                    'data.slug',
                    'data.status',
                    'data.description',
                    'data.created_at',
                    'data.updated_at',
                    'data.expire_date',
                    'data.questions'
                ])
                ->where("data.title", $survey["title"])
                ->where("data.status", $survey["status"])
                ->where("data.description", $survey["description"])
                ->where("data.expire_date", $survey["expire_date"])
        );
    }

    public function test_delete_survey(): void
    {
        $survey = Survey::factory()->create();
        $user = User::find($survey->user_id);

        $response = $this->actingAs($user)->delete("/api/surveys/" . $survey->id);

        $response->dump();
        $response->assertStatus(204);
        $response->assertNoContent();
    }
}
