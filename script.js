/* ================================================
   Luxury Corner - Fit-out Solutions
   Main JavaScript File
   ================================================ */

// ===========================
// Loading Screen
// ===========================
window.addEventListener('load', function() {
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1500);
});

// ===========================
// Navbar Scroll Effect
// ===========================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===========================
// Active Nav Link
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
});

// ===========================
// Counter Animation
// ===========================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.ceil(start) + '+';
        }
    }, 16);
}

// Intersection Observer for Counter
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
        }
    });
}, observerOptions);

// Observe all stat numbers
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => counterObserver.observe(stat));
});


// ===========================
// Contact Form Validation
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (name === '' || email === '' || phone === '' || message === '') {
                alert('الرجاء ملء جميع الحقول المطلوبة');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('الرجاء إدخال بريد إلكتروني صحيح');
                return;
            }
            
            // Phone validation (Saudi format)
            const phoneRegex = /^(05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
            if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
                alert('الرجاء إدخال رقم جوال صحيح');
                return;
            }
            
            // Success message
            alert('شكراً لتواصلك معنا! سنقوم بالرد عليك في أقرب وقت ممكن.');
            contactForm.reset();
        });
    }
});

// ===========================
// Smooth Scroll for Anchor Links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// AOS (Animate On Scroll) Initialization
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
});



// ===========================
// Parallax Effect for Hero
// ===========================
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero-section');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// ===========================
// WhatsApp Button
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    const whatsappBtn = document.querySelector('.whatsapp-float');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const phoneNumber = '966500000000'; // Replace with actual number
            const message = 'مرحباً، أرغب في الاستفسار عن خدماتكم';
            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        });
    }
});

// ==============================
// clients logo track duplication
// ==============================
document.addEventListener("DOMContentLoaded", function() {
    const track = document.getElementById('clientTrack');
    if (track) {
        const content = track.innerHTML;
        track.innerHTML = content + content + content;
    }
});


// ==============================
// Highlight Active Nav Link
// ==============================
document.addEventListener("DOMContentLoaded", function() {
    const currentPath = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    navLinks.forEach(link => {
        const linkPath = link.getAttribute("href");
        if (currentPath === linkPath || (currentPath === "" && linkPath === "index.html")) {
            link.classList.add("active");
        }
    });
});

// ==============================
// Close Mobile Menu on Nav Link Click
// ==============================
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const menu = document.querySelector('.navbar-collapse');
        if (menu.classList.contains('show')) {
            bootstrap.Collapse.getInstance(menu).hide();
        }
    });
});