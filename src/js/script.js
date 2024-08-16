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
    const { userName, password, email, roles } = data.userData;
    const userObject = { userName, password, email, roles }

    localStorage.setItem("user", JSON.stringify(userObject));

    const rolesStr = roles.join(", ");
    notify(
      "success",
      `Logged in as ${userName} with roles: ${rolesStr}`
    );
    window.location.href = './home.html'
  } else {
    notify("danger", data.message);
  }
}