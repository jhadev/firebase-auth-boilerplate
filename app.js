$(document).ready(function () {

  //Copy config object from firebase
  const config = {
    apiKey: "AIzaSyCOfAAL_Al46MrmoItev-O5gMjj1uhbzNs",
    authDomain: "fir-auth-test-40008.firebaseapp.com",
    databaseURL: "https://fir-auth-test-40008.firebaseio.com",
    projectId: "fir-auth-test-40008",
    storageBucket: "fir-auth-test-40008.appspot.com",
    messagingSenderId: "84698175282"
  };

  firebase.initializeApp(config);

  //Choose providers to use in your firebase auth settings and whitelist domains where you allow it. localhost is whitelisted by default.

  const provider = new firebase.auth.GoogleAuthProvider();
  const auth = firebase.auth()

  $(document).on('click', '.log-in', function () {
    login(provider, isLoggedIn);
    $(this).removeClass('log-in')
      .addClass('log-out')
      .html('Logout');
  });

  $(document).on('click', '.log-out', function () {
    auth.signOut().then(() => {
      $(this).removeClass('log-out')
        .addClass('log-in')
        .html('Login With Google');
      isLoggedOut();
    }).catch((error) => {
      if (error) throw error
    });
  });

  const login = (provider, isLoggedIn) => {
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      auth.signInWithPopup(provider).then((result) => {
        const user = result.user;
        console.log(user)
        isLoggedIn(user);
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        if (error) {
          console.log(errorCode)
          console.log(errorMessage)
        }
      });
    })
  }

  const isLoggedIn = user => {
    //DO SOMETHING
    $("#user").text(`Welcome,`)
    $("#email").text(user.email)
    $(".start").append(`<img src="https://user-images.githubusercontent.com/42519030/54242956-f424a380-44fc-11e9-89e3-76ece045f9ca.jpg"></img>`)
  }

  const isLoggedOut = () => {
    //DO SOMETHING
    $("#user").html(`Goodbye`);
    $(".start, .welcome").empty()
  }
})