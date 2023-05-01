<?php

namespace Database\Seeders;

use App\Models\Survey;
use App\Models\User;
use DateInterval;
use DateTime;
use Illuminate\Database\Seeder;

class SurveySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'xpgarcia',
            'email' => 'xavier@test.com',
        ]);
        $now = new DateTime();
        $expire_date = $now->add(new DateInterval('P1W'));
        Survey::factory()->create([
            'user_id' => $user->id,
            'title' => 'Angular Fundamentals for Novices',
            'slug' => 'angular-fundamentals-for-novices',
            'status' => true,
            'description' => 'Entry-level course designed to introduce beginners to the Angular framework. In this course, students will learn the foundational concepts of Angular, including the Angular CLI, components, modules, services, and dependency injection. By the end of the course, students will have a solid understanding of how to use Angular to build web applications from scratch. This course is ideal for individuals who are new to web development and want to gain hands-on experience with one of the most popular front-end frameworks.',
            'expire_date' => $expire_date
        ]);
        Survey::factory()->create([
            'user_id' => $user->id,
            'title' => 'Python Programming for Data Science',
            'slug' => 'python-programming-for-data-science',
            'status' => true,
            'description' => 'Comprehensive course that teaches students how to use Python for data analysis and visualization. Students will learn the fundamental concepts of programming in Python, including data types, control structures, functions, and object-oriented programming. Additionally, the course will cover libraries such as NumPy, Pandas, Matplotlib, and Scikit-learn, which are essential for data manipulation and machine learning. By the end of the course, students will be able to perform data analysis tasks such as cleaning, transforming, and visualizing data, as well as building machine learning models using Python. This course is ideal for individuals who are interested in pursuing a career in data science or who want to add Python programming skills to their existing skill set.',
            'expire_date' => $expire_date
        ]);
        Survey::factory()->create([
            'user_id' => $user->id,
            'title' => 'JavaScript for Web Development',
            'slug' => 'javascript-for-web-development',
            'status' => true,
            'description' => 'Beginner-friendly course that focuses on teaching the fundamental concepts of JavaScript programming language. Students will learn how to use JavaScript to create dynamic and interactive web pages, including DOM manipulation, event handling, and asynchronous programming. The course will also cover popular JavaScript libraries and frameworks such as jQuery, React, and Node.js. By the end of the course, students will have a solid understanding of how to use JavaScript to build web applications and will be able to apply their knowledge to a variety of web development projects. This course is ideal for individuals who are new to web development or who want to expand their skill set in JavaScript programming.',
            'expire_date' => $expire_date
        ]);
        Survey::factory()->create([
            'user_id' => $user->id,
            'title' => 'Java Programming: From Basics to Advanced',
            'slug' => 'java-programming-basics-to-advanced',
            'status' => true,
            'description' => 'Comprehensive course that covers the fundamentals of Java programming language, including data types, control structures, methods, and object-oriented programming. The course also covers more advanced topics such as multi-threading, networking, and database programming. Students will learn how to create Java applications from scratch and gain hands-on experience with Java tools such as Eclipse and IntelliJ IDEA. By the end of the course, students will have a solid understanding of Java programming and be able to build complex Java applications. This course is ideal for individuals who are interested in pursuing a career in software development or who want to add Java programming skills to their existing skill set.',
            'expire_date' => $expire_date
        ]);
        Survey::factory()->create([
            'user_id' => $user->id,
            'title' => 'C++ Programming: Mastering the Fundamentals',
            'slug' => 'cpp-programming-mastering-fundamentals',
            'status' => true,
            'description' => 'Course designed to teach students the basics of C++ programming language. Students will learn the core concepts of C++, including data types, control structures, functions, and object-oriented programming. Additionally, the course will cover advanced topics such as templates, exception handling, and memory management. Students will gain hands-on experience with C++ tools such as Visual Studio and Code::Blocks. By the end of the course, students will be able to write C++ code and develop applications with confidence. This course is ideal for individuals who are new to programming or who want to expand their skill set in C++ programming.',
            'expire_date' => $expire_date
        ]);
    }
}
