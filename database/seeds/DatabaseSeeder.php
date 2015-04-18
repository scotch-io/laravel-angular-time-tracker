<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\User;
use App\TimeEntry;

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Model::unguard();

		// Call the seed classes to run the seeds
		$this->call('UsersTableSeeder');
		$this->call('TimeEntriesTableSeeder');
	}

}

class UsersTableSeeder extends Seeder {

	public function run()
	{

		// We want to delete any already existing users table before running the seed
		DB::table('users')->delete();

		$users = array(
				['first_name' => 'Ryan', 'last_name' => 'Chenkie', 'email' => 'ryanchenkie@gmail.com', 'password' => Hash::make('secret')],
				['first_name' => 'Chris', 'last_name' => 'Sevilleja', 'email' => 'chris@scotch.io', 'password' => Hash::make('secret')],
				['first_name' => 'Holly', 'last_name' => 'Lloyd', 'email' => 'holly@scotch.io', 'password' => Hash::make('secret')],
				['first_name' => 'Adnan', 'last_name' => 'Kukic', 'email' => 'adnan@scotch.io', 'password' => Hash::make('secret')],
			);

		// Loop through each user above and create the record for them in the database
		foreach ($users as $user)
		{
			User::create($user);
		}
	}
}

class TimeEntriesTableSeeder extends Seeder {

	public function run()
	{
		DB::table('time_entries')->delete();

		$time_entries = array(
				['user_id' => 1, 'start_time' => '2015-02-21T18:56:48Z', 'end_time' => '2015-02-21T20:33:10Z', 'comment' => 'Initial project setup.'],
				['user_id' => 2, 'start_time' => '2015-02-27T10:22:42Z','end_time' => '2015-02-27T14:08:10Z','comment' => 'Review of project requirements and notes for getting started.'],
				['user_id' => 3, 'start_time' => '2015-03-03T09:55:32Z','end_time' => '2015-03-03T12:07:09Z','comment' => 'Front-end and backend setup.'],
			);

		foreach($time_entries as $time_entry)
		{
			TimeEntry::create($time_entry);	
		}	

	}
}
