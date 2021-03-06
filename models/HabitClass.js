class Habit {
	constructor(HabitName, Description, Occurence, CurrentDate, HabitID, TimesPerOccurence, Color, Icon) {
		// User-defined parameters
		this.HabitName = HabitName;
		this.Description = Description;
		this.Occurence = Occurence.toLowerCase();
		this.TimesPerOccurence = TimesPerOccurence;
		this.Color = Color;
		this.Icon = Icon;

		// when this class's constructor is called, 
		// generate an ObjectID and pass it with the
		// user-defined parameters
		this._id = HabitID;
		
		// Getting the right lastcheck date 
		let dateAdjust = 0;
		if(this.Occurence == 'daily') {
			dateAdjust = -1;
		
		} else if (this.Occurence == 'weekly') {
			dateAdjust = -7;

		}

		const lastCheckIn = new Date(CurrentDate);
		lastCheckIn.setDate(lastCheckIn.getDate() + dateAdjust);
		lastCheckIn.setHours(0);
		lastCheckIn.setMinutes(0);
		lastCheckIn.setSeconds(0);


		//default parameters
		this.LastCheckinDate = lastCheckIn;
		this.CurrentStreak = 0;
		this.LongestStreak = 0;
		this.Progress = { Percent: 0, currDate: CurrentDate };
		this.Checkins = [];

		
	}

}

module.exports = Habit;