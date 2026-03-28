/* Interactivity & Animations for Miranty Catering */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-out-quart',
        once: true,
        offset: 100,
        disable: 'mobile'
    });

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('bg-white/95', 'shadow-md', 'py-2');
            navbar.classList.remove('bg-white/80', 'py-4');
        } else {
            navbar.classList.add('bg-white/80', 'py-4');
            navbar.classList.remove('bg-white/95', 'shadow-md', 'py-2');
        }
    });

    // 3. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const desktopMenu = document.querySelector('.hidden.md\\:flex');
    
    // In a real project, you would create a mobile menu drawer.
    // For this simple version, let's just add a basic toggle if needed.
    mobileMenuBtn.addEventListener('click', () => {
        // Toggle basic mobile menu logic here if required
        alert('Menu Mobile: Beranda, Tentang Kami, Layanan, Menu, Kontak');
    });

    // 4. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Contact Form Submission Logic
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values (basic validation)
            const formData = new FormData(contactForm);
            const name = formData.get('Nama');
            const phone = formData.get('Telepon');
            
            // Simulate submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Mengirim...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert(`Terima kasih, ${name}! Pesan Anda telah kami terima. Tim Miranty Catering akan segera menghubungi Anda di nomor ${phone}.`);
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
            }, 1500);
        });
    }

    // 6. Interactive Hover Effects for Menu Items
    const menuItems = document.querySelectorAll('#menu ul li');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.color = '#C5A021';
            item.style.fontWeight = '600';
        });
        item.addEventListener('mouseleave', () => {
            item.style.color = '#4B5563';
            item.style.fontWeight = '400';
        });
    });

    // 7. Dynamic Parallax-ish Effect for Hero Image
    const heroImage = document.querySelector('#home img');
    if (heroImage) {
        window.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            heroImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }

    // Log for verification
    console.log('Miranty Catering Website Scripts Initialized.');
});
