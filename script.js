/* Theme Toggle */
let themeToggle = document.querySelector('.theme-toggle');
let themeIcon = themeToggle.querySelector('i');
let body = document.body;

// Check local storage for theme
if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

themeToggle.onclick = () => {
    body.classList.toggle('light-mode');
    if (body.classList.contains('light-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark');
    }
};

/* Email Obfuscation (Security) */
// Encode email parts to avoid simple scrapers
const user = 'autajoy2003';
const domain = 'gmail.com';
const emailAddress = `${user}@${domain}`;

// Inject into links
document.querySelectorAll('.email-link').forEach(link => {
    link.href = `mailto:${emailAddress}`;
});

// Inject into text display
const emailTextElement = document.querySelector('.email-text');
if (emailTextElement) {
    // Keep the icon
    const icon = emailTextElement.querySelector('i').outerHTML;
    emailTextElement.innerHTML = `${icon} ${emailAddress}`;
}

// Update form action dynamically
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.action = `mailto:${emailAddress}`;
    contactForm.enctype = "text/plain";
}

/* Dynamic Year (Functionality) */
document.getElementById('year').textContent = new Date().getFullYear();

let menuToggle = document.querySelector('.menu-toggle');
let sidebar = document.querySelector('.sidebar');
let navLinks = document.querySelectorAll('.nav-links a');

menuToggle.onclick = () => {
    sidebar.classList.toggle('active');
    // Change icon based on state
    let icon = menuToggle.querySelector('i');
    if (sidebar.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
};

/* Close sidebar when clicking a link (on mobile) */
navLinks.forEach(link => {
    link.onclick = () => {
        if (window.innerWidth <= 991) {
            sidebar.classList.remove('active');
            let icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    };
});

/* scroll sections active link */
let sections = document.querySelectorAll('section');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                let target = document.querySelector('.nav-links a[href*=' + id + ']');
                if (target) target.classList.add('active');
            });
        };
    });
};


/* Scroll Animation (Intersection Observer) */
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

/* Form Validation */
const form = document.querySelector('form');
form.addEventListener('submit', function(e) {
    const name = form.querySelector('input[name="name"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const message = form.querySelector('textarea[name="message"]').value;

    if (!name || !email || !message) {
        e.preventDefault();
        alert('Please fill in all required fields.');
    } else {
        // Optional: Email Obfuscation logic could go here if we were generating the mailto link dynamically
        // For now, standard HTML5 validation + this check is good.
    }
});
