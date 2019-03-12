$(document).ready(function () {

  const config = {
    apiKey: "AIzaSyCOfAAL_Al46MrmoItev-O5gMjj1uhbzNs",
    authDomain: "fir-auth-test-40008.firebaseapp.com",
    databaseURL: "https://fir-auth-test-40008.firebaseio.com",
    projectId: "fir-auth-test-40008",
    storageBucket: "fir-auth-test-40008.appspot.com",
    messagingSenderId: "84698175282"
  };
  firebase.initializeApp(config);

  const provider = new firebase.auth.GoogleAuthProvider();

  $(document).on('click', '.log-in', function () {
    auth(provider, loggedIn);
    $(this).removeClass('log-in')
      .addClass('log-out')
      .html('Logout');
  });

  $(document).on('click', '.log-out', function () {
    firebase.auth().signOut().then(() => {}, (error) => {
      if (error) throw error
    });
    $(this).removeClass('log-out')
      .addClass('log-in')
      .html('Login With Google');
    loggedOut();
  });

  function auth(provider, loggedIn) {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      firebase.auth().signInWithPopup(provider).then((result) => {
        const user = result.user;
        console.log(user)
        loggedIn(user);
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    })
  }

  const loggedIn = user => {
    //DO SOMETHING
    $("#user").text(`Welcome,`)
    $("#email").text(user.email)
    $(".start").append(`<img src="https://user-images.githubusercontent.com/42519030/54242956-f424a380-44fc-11e9-89e3-76ece045f9ca.jpg"></img>`)
  }

  const loggedOut = () => {
    //DO SOMETHING
    $("#user").html(`Goodbye`);
    $(".start, .welcome").empty()
  }
})