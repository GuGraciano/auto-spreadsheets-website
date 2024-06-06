const user = document.querySelector("#username");
const pass = document.querySelector("#password");
const form = document.querySelector("form");

form.onsubmit = async (event) => {
  event.preventDefault();
  const payload = createPayload(user.value, pass.value);
  const requestOptions = createRequestOptions(payload);

  try {
    const response = await fetch(
      "https://auto-spreadsheets-api.vercel.app/api/login",
      requestOptions
    );
    handleResponse(response);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

function createPayload(userValue, passValue) {
  return userValue.includes("@")
    ? { email: userValue, password: passValue }
    : { userName: userValue, password: passValue };
}

function createRequestOptions(payload) {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    redirect: "follow",
  };
}

async function handleResponse(response) {
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
      `Logged in as ${data.userData.userName} with roles: ${roles}`
    );
  } else {
    notify("danger", data.message);
  }
}

function notify(type, message) {
  const area = document.getElementById("notification-area");
  const notification = createNotificationElement(type, message);
  area.appendChild(notification);

  setTimeout(() => {
    notification.remove();
    if (area.children.length === 0) {
      area.style.display = "none";
    }
  }, 5000);

  area.style.display = "block";
}

function createNotificationElement(type, message) {
  const notificationId = generateUniqueId();
  const notification = document.createElement("div");
  notification.setAttribute("id", notificationId);
  notification.classList.add("notification", type);

  const typeText = type === "success" ? "Success" : "Error";
  notification.innerHTML = `<div><b>${typeText}</b></div>${message}`;

  const color = createColorElement(type);
  const icon = createIconElement(type);

  notification.appendChild(color);
  notification.appendChild(icon);

  return notification;
}

function createColorElement(type) {
  const colorId = generateUniqueId();
  const color = document.createElement("div");
  color.setAttribute("id", colorId);
  color.classList.add("notification-color", type);
  return color;
}

function createIconElement(type) {
  const iconId = generateUniqueId();
  const icon = document.createElement("a");
  icon.setAttribute("id", iconId);
  icon.classList.add("notification-icon", type);

  const iconClass =
    type === "success"
      ? "fa fa-2x fa-check-circle"
      : "fa fa-2x fa-exclamation-circle";
  icon.innerHTML = `<i class="${iconClass}"></i>`;

  return icon;
}

function generateUniqueId() {
  return Math.random().toString(36).substr(2, 10);
}
