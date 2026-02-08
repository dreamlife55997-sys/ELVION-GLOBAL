// Parallax Effect
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translate(-${x * 30}px, -${y * 30}px)`;
    }

    // Parallax for product cards
    document.querySelectorAll('.product-card').forEach(card => {
        const speed = card.getAttribute('data-speed');
        const moveX = (window.innerWidth - e.pageX * speed) / 100;
        const moveY = (window.innerHeight - e.pageY * speed) / 100;

        card.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// Countdown Timer
const countdownDate = new Date();
countdownDate.setDate(countdownDate.getDate() + 120); // 120 days from now

function updateTimer() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const pad = (n) => n < 10 ? '0' + n : n;

    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = pad(hours);
    document.getElementById('minutes').innerText = pad(minutes);
    document.getElementById('seconds').innerText = pad(seconds);
}

setInterval(updateTimer, 1000);
updateTimer();

// Scroll Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Add staggered animation class for children if needed
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in-section');
    observer.observe(section);
});

// Formspree AJAX Handler
var form = document.getElementById("signup-form");

async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("form-status");
    var data = new FormData(event.target);
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            status.innerHTML = "You're on the list. Get ready to hear the future.";
            status.className = "form-status success";
            form.reset();
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                } else {
                    status.innerHTML = "Oops! There was a problem joining the revolution.";
                }
                status.className = "form-status error";
            })
        }
    }).catch(error => {
        status.innerHTML = "Oops! There was a problem joining the revolution.";
        status.className = "form-status error";
    });
}
form.addEventListener("submit", handleSubmit);
