// Code is not working not sure what broke :(

$(document).ready(function(){
	var config = {
    apiKey: "AIzaSyDzmMj656FtmsDdJBG6gCM7MJzh82vksz8",
    authDomain: "train-schedule-805c1.firebaseapp.com",
    databaseURL: "https://train-schedule-805c1.firebaseio.com",
    projectId: "train-schedule-805c1",
    storageBucket: "train-schedule-805c1.appspot.com",
    messagingSenderId: "6846098689"
  };
  firebase.initializeApp(config);

	// 2. Button for adding Trains
	$("#addTrainBtn").on("click", function(){

		// Grabs user input and assign to variables
		var trainName = $("#trainNameInput").val().trim();
		var destination = $("#destinationInput").val().trim();
		var trainTimeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
		var frequencyInput = $("#frequencyInput").val().trim();


		// Creates local "temporary" object for holding train data
		var newTrain = {
			name:  trainName,
			destination: destination,
			trainTime: trainTimeInput,
			frequency: frequencyInput,
		}

		// pushing trainInfo to Firebase
		database.ref().push(newTrain);

		// clear text-boxes
		$("#trainNameInput").val("");
		$("#destinationInput").val("");
		$("#trainInput").val("");
		$("#frequencyInput").val("");


		return false;
	});


		database.ref().on("value", function(snapshot){
		// assign firebase variables to snapshots.
		var firebaseName = childsnapshot.val().name;
		var firebaseDestination = childsnapshot.val().destination;
		var firebaseTrainTimeInput = childsnapshot.val().trainTime;
		var firebaseFrequency = childsnapshot.val().frequency;
		
		var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
		var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency ;
		var minutes = firebaseFrequency - timeRemainder;

		var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
		


		// Append train info to table on page
		$("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>"+ firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

	});
});
