// const firebaseConfig = {
//   apiKey: "AIzaSyCp5ciiNeHHH-qzO5TP4oNsYeWAAUUCob0",
//   authDomain: "authentication-and-database-fb.firebaseapp.com",
//   projectId: "authentication-and-database-fb",
//   storageBucket: "authentication-and-database-fb.appspot.com",
//   messagingSenderId: "84947591860",
//   appId: "1:84947591860:web:885b99f8f1b18871082de1"
// };

const firebaseConfig = {
  apiKey: "AIzaSyCp5ciiNeHHH-qzO5TP4oNsYeWAAUUCob0",
  authDomain: "authentication-and-database-fb.firebaseapp.com",
  databaseURL: "https://authentication-and-database-fb-default-rtdb.firebaseio.com",
  projectId: "authentication-and-database-fb",
  storageBucket: "authentication-and-database-fb.appspot.com",
  messagingSenderId: "84947591860",
  appId: "1:84947591860:web:885b99f8f1b18871082de1"
};

// Initialize Firebase
const frb = firebase.initializeApp(firebaseConfig);
console.log(frb.database);



// 1st
// SIGNUP USER
const signup = () => {
  let email = document.getElementById('signupEmail').value;
  let password = document.getElementById('signupPassword').value;
  // console.log(email, password);

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      window.location.href='login.html'
      console.log(user)
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage)
    });
}



// 2nd
// LOGIN USER
const login = () => {
  let email = document.getElementById('loginEmail').value;
  let password = document.getElementById('loginPassword').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
}



// 3rd
// SAVE DATA IN REAL TIME DATABASE
const database = () => {

  let fname = document.getElementById('fname').value;
  let lname = document.getElementById('lname').value;

  let obj = {
    fname,
    lname
  }

  // // set : for replace
  // frb.database().ref('fullName').set(obj);
  frb.database().ref('fullName').push(obj);
}



// 4th
// GET DATA FROM REAL TIME DATABASE
const getRealTimeData = () => {

  // // 1st
  // 'once' : works when we refresh
  // 'value' is default word

  // frb.database().ref('fullName').once('value', (data) => {
  //   // console.log(data);
  //   console.log(data.val());
  // })

  
  // // 2nd
  // 'on' : works on realtime, with out refresh
  // 'child_added' : is default word

  frb.database().ref('fullName').on('child_added', (data) => {
    console.log(data.val());
  })
}

getRealTimeData();



// 5th
// DELETE DATA FROM REAL TIME DATABASE
const deleteData = () => {
  frb.database().ref('fullName/-NmaOUVtsiJQP32VaMma').remove();
}
deleteData();



// 6th
// DELETE DATA FROM REAL TIME DATABASE
const editData = () => {
  frb.database().ref('fullName/-NmaWQ_VaYgSEeJgQc2v').set({
    fname: "edit_firstname",
    lname: "edit_last tname"
  });
}
editData();