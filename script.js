const user = document.querySelector("#username");
const pass = document.querySelector("#password");
const form = document.querySelector("form");

form.onsubmit = async (event) => {
    event.preventDefault();
    const userValue = user.value;
    const passValue = pass.value;

    if (userValue.includes("@")) {
        const response = await fetch(`https://auto-spreadsheets-api.vercel.app/login`, {
            method: "POST",
            body: {
                email: userValue,
                password: passValue
            }
        })

        console.log(response);
    } else {
        console.log("teste")
    }
};