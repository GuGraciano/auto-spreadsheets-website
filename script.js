const user = document.querySelector("#username");
const pass = document.querySelector("#password");
const form = document.querySelector("form");

form.onsubmit = async (event) => {
  event.preventDefault();
  const userValue = user.value;
  const passValue = pass.value;

  if (userValue.includes("@")) {
    const response = await fetch(
      `https://auto-spreadsheets-api.vercel.app/api/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userValue,
          password: passValue,
        }),
      }
    );

    console.log(response);
    console.log(response.body);
  } else {
    console.log("teste");
  }
};
