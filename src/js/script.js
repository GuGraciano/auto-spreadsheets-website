const user = document.querySelector("#username");
const pass = document.querySelector("#password");
const form = document.querySelector("form");

form.onsubmit = async (event) => {
  event.preventDefault();
  const userValue = user.value;
  const passValue = pass.value;

  let payload = {
    password: passValue,
  };

  if (userValue.includes("@")) {
    payload.email = userValue;
  } else {
    payload.userName = userValue;
  }

  const raw = JSON.stringify(payload);

  console.log(raw);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "https://auto-spreadsheets-api.vercel.app/api/login",
      requestOptions
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    console.log("Response:", response);
    console.log("Response body:", data);

    if (data.status) {
      const roles = data.userData.roles.join(", ");
      notify(
        "success",
        `logged as ${data.userData.userName} with roles: ${roles}`
      );
    } else {
      notify("danger", data.message);
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

function notify(type, message) {
  (() => {
    var area = document.getElementById("notification-area");
    let n = document.createElement("div");
    let notification = Math.random().toString(36).substr(2, 10);
    n.setAttribute("id", notification);
    n.classList.add("notification", type);
    n.innerHTML = "<div><b>Message</b></div>" + message;
    area.appendChild(n);

    let color = document.createElement("div");
    let colorid = "color" + Math.random().toString(36).substr(2, 10);
    color.setAttribute("id", colorid);
    color.classList.add("notification-color", type);
    document.getElementById(notification).appendChild(color);

    let icon = document.createElement("a");
    let iconid = "icon" + Math.random().toString(36).substr(2, 10);
    icon.setAttribute("id", iconid);
    icon.classList.add("notification-icon", type);
    document.getElementById(notification).appendChild(icon);

    let _icon = document.createElement("i");
    let _iconid = "_icon" + Math.random().toString(36).substr(2, 10);
    _icon.setAttribute("id", _iconid);

    if (type == "success") {
      _icon.className = "fa fa-2x fa-check-circle";
    } else {
      _icon.className = "fa fa-2x fa-exclamation-circle";
    }
    document.getElementById(iconid).appendChild(_icon);

    area.style.display = "block";
    setTimeout(() => {
      var notifications = document
        .getElementById("notification-area")
        .getElementsByClassName("notification");
      for (let i = 0; i < notifications.length; i++) {
        if (notifications[i].getAttribute("id") == notification) {
          notifications[i].remove();
          break;
        }
      }

      if (notifications.length == 0) {
        area.style.display = "none";
      }
    }, 5000);
  })();
}
