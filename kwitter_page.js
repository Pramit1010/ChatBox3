
var firebaseConfig = {
  apiKey: "AIzaSyDNWJ8cbYzdIvI68zf5Y8tedHNrsAj_NFI",
  authDomain: "kwitter-37944.firebaseapp.com",
  databaseURL: "https://kwitter-37944-default-rtdb.firebaseio.com",
  projectId: "kwitter-37944",
  storageBucket: "kwitter-37944.appspot.com",
  messagingSenderId: "305939564656",
  appId: "1:305939564656:web:f67fc2f8559eeac5750cb5"
};
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name : user_name,
        message : msg,
        like : 0
    });

    document.getElementById("msg").value = "";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
       firebase_message_id = childKey;
       message_data = childData;
console.log(firebase_message_id);
console.log(message_data);
name = message_data['name'];
message = message_data['message'];
like = message_data['like'];
name_tag = "<h4>"+ name +"<img class = 'user_tick' src = 'tick.png'></h4>";
message_tag = "<h4 class='message_h4'>" + message + "</h4>";
like_button = "<button class = 'btn btn-warning' id="+firebase_message_id+" value = "+like+" onclick = 'update_like(this.id)'>"
span_tag = "<span class = 'glyphicon glyphicon-thumbs-up'>Like: " + like + "</span> </button><hr>";

row = name_tag + message_tag + like_button +span_tag;
document.getElementById("output").innerHTML +=row;
    } });  }); }
getData();

function update_like(message_id)
{
  button_id = message_id;
  likes = document.getElementById(button_id).value;
  updated_likes = Number(likes)+1;
  firebase.database().ref(room_name).child(message_id).update({like: updated_likes});
}

function logout(){
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "kwitter_start.html";
}