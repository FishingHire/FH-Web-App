
$( document ).ready(function() {
    console.log( "Parse initialized" );
    Parse.initialize("a3hE9Y9qVMyx6R5bbzcBPto8F5b7H0PdfUikKrsR", "o2vvcrZEKYHBvQjoo5d1VKgOoMwPIevhQr3NZO0i");

    var user = Parse.User.current();
    console.log("User " + user);

  $('#btn').click(function() {
      if (user == null) {
        createUser();
      }
      createListing();
    });

  isLoggedIn();
});



function createListing() {

    var firstname = $('#fname').val();
    var lastname = $('#lname').val();
    var email = $('#email').val();
    var location = $('#autocomplete').val();
    var user = Parse.User.current();

    var Listing = Parse.Object.extend("Listing");
    var listing = new Listing();
      listing.save(
        {
          fName: firstname,
          lName: lastname,
          email: email,
          location: location,
          user: user
        }, 
        {
          success: function(object) {
            $(".success").show();
        },
          error: function(model, error) {
            $(".error").show();
        }
    });


}

function createUser() {

  var firstname = $('#fname').val();
  var lastname = $('#lname').val();
  var email = $('#email').val();
  var location = $('#autocomplete').val();

  var user = new Parse.User();
  user.set("firstname", firstname);
  user.set("lastname", lastname);
  user.set("email", email);
  user.set("username", email);
  user.set("location", location);
  user.set("password", "password");


  user.signUp(null, {
    success: function(user) {
      // Hooray! Let them use the app now.
      logIn(email,"password");
    },
    error: function(user, error) {
      // Show the error message somewhere and let the user try again.
      alert("Error: " + error.code + " " + error.message);
    }
  });
}

function logIn(username, password) {
    Parse.User.logIn(username, password, {
      success: function(user) {
        // Do stuff after successful login.
        console.log("LOGGED IN!");
      },
      error: function(user, error) {
        // The login failed. Check error to see why.
      }
    });
}

function isLoggedIn() {
  var currentUser = Parse.User.current();
  var name = currentUser.get("username");
    if (currentUser) {
    // do stuff with the user
    console.log(name + " IN SESSION!");
    $('.username').append(name);
    } else {
    // show the signup or login page
    console.log("NOT LOGGED IN!");
  }
}