// Login:
const form = document.querySelector("#loginForm");
const emailForm = document.getElementById("loginEmailInput");
const email = emailForm.value;
const passwordForm = document.getElementById("loginPasswordInput");
const password = passwordForm.value;
const userList = document.querySelector("#usersList");

// Login success & failure
form.addEventListener("submit", function (e) {
  e.preventDefault();
  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: emailForm.value,
      password: passwordForm.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        document.getElementById("btn_showusers").style.display = "block";
      } else if (data.error) {
        console.log("Invalid user!");
        document.getElementById("error").innerHTML = "Invalid user";
        document.getElementById("error").style.display = "block";
      }
    });
  console.log(email);
  console.log(password);
});

//Show Users:

function showUsers() {
  fetch("https://reqres.in/api/users")
    .then((res) => res.json())
    .then((res) => {
      users = res.data;
      usersHtml = res.data
        .map((user) => {
          return (
            '<li><a href="#" onclick="showUser(' +
            user.id +
            '); return false;">' +
            user.first_name +
            "</a></li>"
          );
        })
        .join("");
      document.getElementById("usersList").innerHTML = usersHtml;
    });
}
//Display Users:

function showUser(id) {
  for (i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      var user = users[i];
      var userHtml =
        "<b>First name:</b>" +
        user.first_name +
        "<br>" +
        "<b>Last name:</b>" +
        user.last_name +
        "<br><b>E-mail:</b>" +
        user.email +
        '<br><img src="' +
        user.avatar +
        '">';
      document.getElementById("userInfoContainer").innerHTML = userHtml;
    }
  }
  //console.log(users);
}
