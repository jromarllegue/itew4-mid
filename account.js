let userlist = [];


$(document).ready(function() {
	if (JSON.parse(localStorage.getItem("currentUser")) != null) {		
		window.location.href = "appointment.html";
	}

	if (typeof(Storage) === "undefined") {
		alert("Sorry, you are unable to use this site. Please change to a browser that has Web Storage support to continue.");
		window.history.back;
	}
	console.log(localStorage.getItem("userlist"));

	userlist = JSON.parse(localStorage.getItem("userlist")) || [];

	//Base64 code//
	let image = new Image();

	image.src = "https://raw.githubusercontent.com/jromarllegue/final_itew2/main/YaL3s.jpg";
	image.crossOrigin = "anonymous";

	image.onload = function () {
		let canvas = document.createElement("canvas");
		canvas.width = image.width;
		canvas.height = image.height;
			
		let context = canvas.getContext("2d");
		context.drawImage(image, 0, 0);

		localStorage.setItem("pfp-base64-plusgrade", canvas.toDataURL("pfp/jpeg"));
	}
	//Base64 code//
});

class User {
	constructor (firstName, lastName, email, password) {
		this.userID = userlist.length + 1;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;

		this.joined = new Date();
		this.appointCount = 0;
		this.appointments = [];
		//this.doctor = "";

		this.pfp = localStorage.getItem("pfp-base64-plusgrade");
	}
}

function loginAccount() {

		let emailAdmin = $("#txtEmail").val() == "admin";
		let passwordAdmin = $("#txtPassword").val() == "admin";

		if (emailAdmin && passwordAdmin) {
			window.location.href = "admin.html";
		}

	let userlist = JSON.parse(localStorage.getItem("userlist")) || [];
	let index = 0;

	let currentUser = userlist.find(user  => {
		let emailMatched = $("#txtEmail").val() == user.email;
		let passwordMatched = $("#txtPassword").val() == user.password;

		console.log($("#txtEmail").val() == user.email);
		console.log($("#txtPassword").val() == user.password);		

		if (emailMatched && passwordMatched) {
			return user;
		}
		index ++;	
	});

	if (currentUser === undefined) {
		alert("Invalid credentials!");
	} else {
		localStorage.setItem("currentUser", JSON.stringify(currentUser));
		localStorage.setItem("currentIndex", index);
		window.location.href = "appointment.html";
	}
}

function createAccount() {
	let inputs = document.querySelectorAll("input");
	let isBlank = false;

	for (let element of inputs) {
		
		if (element.value == "") {
			element.style = "border: 2px solid red";
			isBlank = true;

		} else {
			element.style = "border: 1px solid black";		
		}
	}

	if (isBlank) {
		alert("You left a blank input.");
		return;
	}

	if ($("#txtPassword").val() == $("#txtConfPassword").val()) {

		let reportList = localStorage.getItem("reportList") || "";

		let user = new User($("#txtFirstName").val(), $("#txtLastName").val(), $("#txtEmail").val(), $("#txtPassword").val());		
		localStorage.setItem("currentUser", JSON.stringify(user));

		userlist.push(user);
		localStorage.setItem("userlist", JSON.stringify(userlist));

		let userIndex = userlist.length - 1;
		localStorage.setItem("currentIndex", userIndex);
			 
		reportList = "<p>User #" + user.userID + " has been created.</p>" + reportList;
		localStorage.setItem("reportList", reportList);

		window.location.href = "appointment.html";
	} else {
		alert("The Password and Confirm Password doesn't match!");
		$("#txtPassword").css("border", "2px solid red");

		$("#txtConfPassword").css("border", "2px solid red");
	}
}
