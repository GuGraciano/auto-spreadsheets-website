document.addEventListener("DOMContentLoaded", async function () {
    const userString = localStorage.getItem("user");

    if (!userString) {
        location.href = "./login.html";
        return;
    }

    const user = JSON.parse(userString);

    async function reLogin() {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userName: user.userName,
                password: user.password,
            }),
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
            console.log("Re-login response:", data);

            if (data.status) {
                const { userName, password, email, roles } = data.userData;

                if (roles.includes("adm")) {
                    const userObject = {
                        userName,
                        password,
                        email,
                        roles,
                    };

                    localStorage.setItem("user", JSON.stringify(userObject));

                    const rolesStr = roles.join(", ");
                    notify("success", `Logged in as ${userName} with roles: ${rolesStr}`);

                    // handleLogged();
                } else {
                    notify("danger", `User ${userName} has no permissions`);
                    const main = document.querySelector("main");
                    main.style.height = "90vh";
                    main.innerHTML = "";

                    setTimeout(() => {
                        location.href = "./login.html";
                    }, 3000);
                }
            } else {
                notify("danger", data.message);
                localStorage.removeItem("user");
                location.href = "./login.html";
            }
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
            notify("danger", "Failed to re-login. Redirecting to login...");
            localStorage.removeItem("user");
            // location.href = "./login.html";
        }
    }

    await reLogin();
});

let currentSlide = 0;
const slideInterval = 3000; // Tempo em milissegundos (3 segundos)

const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;

// Cria indicadores dinamicamente
const indicatorsContainer = document.querySelector('.carousel-indicators');
slides.forEach((_, i) => {
    const indicator = document.createElement('div');
    indicator.className = 'carousel-indicator';
    indicator.addEventListener('click', () => goToSlide(i));
    indicatorsContainer.appendChild(indicator);
});

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
    document.querySelector('.carousel-images').style.transform = `translateX(-${index * 100}%)`;

    // Atualiza indicadores
    document.querySelectorAll('.carousel-indicator').forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
    clearInterval(autoSlideInterval); // Pausa o auto-slide
    autoSlideInterval = setInterval(nextSlide, slideInterval); // Reinicia o auto-slide
}

// Slide inicial
showSlide(currentSlide);

// Auto-slide functionality
let autoSlideInterval = setInterval(nextSlide, slideInterval);

// Para o auto-slide ao passar o mouse sobre o carrossel
document.querySelector('.carousel').addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

// Retoma o auto-slide quando o mouse sai do carrossel
document.querySelector('.carousel').addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(nextSlide, slideInterval);
});
