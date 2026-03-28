/* Interactivity & Gourmet UI Logic for Miranty Catering */

// 1. Tailwind Gourmet Configuration
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#1a1c20',
                    light: '#2d3436',
                },
                secondary: {
                    DEFAULT: '#a5c695', // Gourmet Green
                    dark: '#8eb37d',
                },
                accent: {
                    DEFAULT: '#ecb365',
                    light: '#f2c98d',
                },
                neutral: '#f9f7f2',
            },
            fontFamily: {
                serif: ['Playfair Display', 'serif'],
                sans: ['Inter', 'sans-serif'],
            },
            animation: {
                'spin-slow': 'spin 12s linear infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // 2. Initialize AOS
    AOS.init({
        duration: 1200,
        easing: 'ease-out-quint',
        once: false,
        offset: 80
    });

    // 3. Navbar Logic
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('bg-white/95', 'shadow-2xl', 'py-4');
            navbar.classList.remove('py-6');
        } else {
            navbar.classList.add('py-6');
            navbar.classList.remove('bg-white/95', 'shadow-2xl', 'py-4');
        }
    });

    // 4. Sidebar Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeSidebarBtn = document.getElementById('close-sidebar');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    const toggleSidebar = () => {
        sidebar.classList.toggle('translate-x-full');
        sidebarOverlay.classList.toggle('opacity-0');
        sidebarOverlay.classList.toggle('invisible');
        document.body.classList.toggle('overflow-hidden');
    };

    mobileMenuBtn?.addEventListener('click', toggleSidebar);
    closeSidebarBtn?.addEventListener('click', toggleSidebar);
    sidebarOverlay?.addEventListener('click', toggleSidebar);

    // 5. Menu Modal Logic
    const menuItems = document.querySelectorAll('.menu-item, .marquee-item');
    const menuModal = document.getElementById('menu-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const closeMenuModal = document.getElementById('close-menu-modal');

    const menuPhotos = {
        "Nasi Goreng Singapore": "https://images.unsplash.com/photo-1512058560366-cd242955a63e?q=80&w=1200&auto=format&fit=crop",
        "Beef Black Pepper": "https://images.unsplash.com/photo-1534422298391-e4f8c170db06?q=80&w=1200&auto=format&fit=crop",
        "Beef Teriyaki": "https://images.unsplash.com/photo-1581546129535-76c49a5d29c9?q=80&w=1200&auto=format&fit=crop",
        "Daging Rendang": "https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=1200&auto=format&fit=crop",
        "Ayam Kodok": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1200&auto=format&fit=crop",
        "Dory Saus Lemon": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1200&auto=format&fit=crop",
        "Empal Gentong": "https://images.unsplash.com/photo-1547573854-74d2a71d0826?q=80&w=1200&auto=format&fit=crop",
        "Mie Kocok Bandung": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=1200&auto=format&fit=crop",
        "Tom Yum": "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?q=80&w=1200&auto=format&fit=crop",
        "Dimsum & Kebab": "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1200&auto=format&fit=crop",
        "Fish n Chips": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1200&auto=format&fit=crop",
        "Aneka Puding Premium": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1200&auto=format&fit=crop",
        "Salad Bangkok": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
        "Buah Potong Segar": "https://images.unsplash.com/photo-1519996529931-28324d5a630e?q=80&w=1200&auto=format&fit=crop",
        "Ice Cream Selection": "https://images.unsplash.com/photo-1497034841475-e1149696655a?q=80&w=1200&auto=format&fit=crop",
        "Es Leci Tea": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1200&auto=format&fit=crop",
        "Kopi & Teh": "https://images.unsplash.com/photo-1544787210-2213d84ad96b?q=80&w=1200&auto=format&fit=crop",
        "Aneka Jus Buah": "https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=1200&auto=format&fit=crop",
        "Infused Water": "https://images.unsplash.com/photo-1559839914-17aae19cea9e?q=80&w=1200&auto=format&fit=crop"
    };

    const openModal = (name) => {
        const photoUrl = menuPhotos[name] || "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1200&auto=format&fit=crop";
        modalImage.src = photoUrl;
        modalTitle.innerText = name;
        
        menuModal.classList.remove('hidden');
        setTimeout(() => menuModal.classList.add('active'), 10);
        document.body.classList.add('overflow-hidden');
    };

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const name = item.getAttribute('data-menu') || item.innerText.trim();
            openModal(name);
        });
    });

    const hideMenuModal = () => {
        menuModal.classList.remove('active');
        setTimeout(() => {
            menuModal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }, 500);
    };

    closeMenuModal?.addEventListener('click', hideMenuModal);
    menuModal?.addEventListener('click', (e) => {
        if (e.target === menuModal) hideMenuModal();
    });

    // 6. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log('Miranty Gourmet UI v5 Initialized.');
});
