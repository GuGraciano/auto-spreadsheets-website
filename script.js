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
      email: userValue,
      password: passValue,
    });

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
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  } else {
    console.log("Invalid email format");
  }
};
