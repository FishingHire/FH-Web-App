
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

    var street_number = $('#street_number').val();
    var street = $('#route').val();
    var city = $('#locality').val();
    var state = $('#administrative_area_level_1').val();
    var postal_code = $('#postal_code').val();
    var country = $('#country').val();

    var user = Parse.User.current();

    var Listing = Parse.Object.extend("Listing");
    var listing = new Listing();
      listing.save(
        {
          fName: firstname,
          lName: lastname,
          email: email,
          location: location,
          street_number: street_number,
          street: street,
          city: city,
          state: state,
          postal_code: postal_code,
          country: country,
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

// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.

var placeSearch, autocomplete;
var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
      {types: ['geocode']});

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
}

// [START region_fillform]
function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();

  for (var component in componentForm) {
    document.getElementById(component).value = '';
    document.getElementById(component).disabled = false;
  }

  // Get each component of the address from the place details
  // and fill the corresponding field on the form.
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      document.getElementById(addressType).value = val;
    }
  }
}
// [END region_fillform]

// [START region_geolocation]
// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}
// [END region_geolocation]