<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class TimeEntry extends Model {

	protected $table = "time_entries";

	// An array of the fields we can fill in the time_entries table
	protected $fillable = ['user_id', 'start_time', 'end_time', 'comment'];

	protected $hidden = ['user_id'];

	// Eloquent relationship that says one user belongs to each time entry
	public function user()
	{
		return $this->belongsTo('App\User');
	}

}
