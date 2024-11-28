const user = document.querySelector("#username");
const pass = document.querySelector("#password");
const form = document.querySelector("form");

form.onsubmit = async (event) => {
  event.preventDefault();

  const data = {
    userName: "Valdemir",
    email: "valdemir@gmail.com",
    password: "123",
  };

  console.log("Response body:", data);

  notify("success", `Logged in as ${data.userName}`);
  window.location.href = "./home.html";
};
