let userlist = [];
let reportList = "";


$(document).ready(function() {
	 reportList = localStorage.getItem("reportList") || "";

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

	userlist = JSON.parse(localStorage.getItem("userlist")) || [];

	if (userlist.length != 0){
		for (let user of userlist) {
			$("#userTable").append("<tr>"
				+  "<td>" + user.userID +  "</td>"
				+ "<td>" + user.firstName +  "</td>"
				+ "<td>" + user.lastName + "</td>"
				+ "<td>" + user.email + "</td>"
				+ "<td>" + user.password + "</td>"
				+ "</tr>" );
		}
	}

	$(".report-box").append(reportList);
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

		this.pfp = localStorage.getItem("pfp-base64-plusgrade");
	}
}

function addAccount() {		

  if ($('body').find(".create-form").length == false) { 	
    $("body").prepend("<div class='gray-screen'></div><div class='create-form'>"
    	+ "<label>Create a new User</label>"
    	+ "<input type='text' id='txtFirstName' size='15' placeholder='First Name'></input>"
		+ "<input type='text' id='txtLastName' size='15' placeholder='Last Name'></input>"
		+ "<input type='text' id='txtEmail' size='41' placeholder='Email Address'></input>"
		+ "<input type='password' id='txtPassword' size='41' placeholder='Password'></input>"
		+ "<button id='btnSignup' onclick='createAccount()'>SIGN UP</button>"

      + "</div>");
    $("create-form").fadeIn("ease");
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

		userlist = JSON.parse(localStorage.getItem("userlist")) || [];
				
		let user = new User($("#txtFirstName").val(), $("#txtLastName").val(), $("#txtEmail").val(), $("#txtPassword").val());
		userlist.push(user);

		localStorage.setItem("userlist", JSON.stringify(userlist));

		reportList = "<p>User #" + user.userID + " has been created.</p>" + reportList;
		localStorage.setItem("reportList", reportList);

		window.location.href = "admin.html";
}

function getID() {		

  if ($('body').find(".update-form").length == false) { 	
    $("body").prepend("<div class='gray-screen'></div><div class='update-form'>"
    	+ "<label>Update User</label>"
    	+ "<input type='text' id='txtuserID' size=15 display='inline-block' placeholder='User ID'></input>" + "<button id='btnFindID' onclick='findID()'>FIND ID</button>"
    	+ "<input type='text' id='txtFirstName' size='15' placeholder='First Name'></input >"
		+ "<input type='text' id='txtLastName' size='15' placeholder='Last Name'></input>"
		+ "<input type='text' id='txtEmail' size='41' placeholder='Email Address'></input>"
		+ "<input type='password' id='txtPassword' size='41' placeholder='Password'></input>"
		+ "<button id='btnUpdate' onclick='updateAccount()'>Update</button>"

      + "</div>");
    $("update-form").fadeIn("ease");
  }
}

function findID() {
	let selectedUser = userlist[$("#txtuserID").val() - 1];

	txtFirstName.value = selectedUser.firstName;
	txtLastName.value = selectedUser.lastName;
	txtEmail.value = selectedUser.email;
	txtPassword.value = selectedUser.password;
}

function updateAccount() {
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

	let selectedUser = userlist[$("#txtuserID").val() - 1];

	selectedUser.firstName = txtFirstName.value;
	selectedUser.lastName = txtLastName.value;
	selectedUser.email = txtEmail.value;
	selectedUser.password = txtPassword.value;

	localStorage.setItem("currentUser", JSON.stringify(selectedUser));

	userlist = JSON.parse(localStorage.getItem("userlist")) || [];
	userlist[$("#txtuserID").val() - 1] = selectedUser;
	localStorage.setItem("userlist", JSON.stringify(userlist));
	
	reportList = "<p>User #" + $("#txtuserID").val() + " has been updated.</p>" + reportList;
	localStorage.setItem("reportList", reportList);

	window.location.href = "admin.html";

}


