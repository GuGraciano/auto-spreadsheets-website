const user = document.querySelector("#username");
const pass = document.querySelector("#password");
const form = document.querySelector("form");

form.onsubmit = async (event) => {
  event.preventDefault();
  const userValue = user.value;
  const passValue = pass.value;

  if (userValue.includes("@")) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      userName: userValue,
      password: passValue,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      "https://auto-spreadsheets-api.vercel.app/api/login",
      requestOptions
    );

    console.log(response);
    console.log(response.body);
  } else {
    console.log("teste");
  }
};
