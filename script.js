document.addEventListener('DOMContentLoaded', function() {
    // Add animation delay to submenu items
    const submenus = document.querySelectorAll('.submenu');
    submenus.forEach(submenu => {
        const items = submenu.querySelectorAll('li');
        items.forEach((item, index) => {
            item.style.setProperty('--i', index);
        });
    });

    // Close submenus when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = event.target.closest('.main-menu');
        if (!isClickInsideMenu) {
            const openSubmenus = document.querySelectorAll('.submenu');
            openSubmenus.forEach(submenu => {
                submenu.style.opacity = '0';
                submenu.style.visibility = 'hidden';
                setTimeout(() => {
                    if (!submenu.matches(':hover')) {
                        submenu.style = '';
                    }
                }, 300);
            });
        }
    });

    // Add hover effect for menu items
    const menuItems = document.querySelectorAll('.main-menu a');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    const slides = document.querySelectorAll('.slide');
    const slidesContainer = document.querySelector('.slide-indicators');
    let currentSlide = 0;
    let slideInterval;

    // إنشاء مؤشرات الشرائح
    function createIndicators() {
        slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            indicator.addEventListener('click', () => goToSlide(index));
            slidesContainer.appendChild(indicator);
        });
    }

    // تحديث مؤشرات الشرائح
    function updateIndicators() {
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }

    // الانتقال إلى شريحة محددة
    function goToSlide(index) {
        // إزالة الصنف النشط من جميع الشرائح
        slides.forEach(slide => {
            slide.classList.remove('active', 'fade-in', 'fade-out');
        });

        // إضافة تأثير الخروج للشريحة الحالية
        if (slides[currentSlide]) {
            slides[currentSlide].classList.add('fade-out');
        }

        currentSlide = index;
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;

        // إضافة تأثير الدخول للشريحة الجديدة
        slides[currentSlide].classList.add('active', 'fade-in');
        updateIndicators();
    }

    // الانتقال إلى الشريحة التالية
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // بدء العرض التلقائي
    function startSlideshow() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        slideInterval = setInterval(nextSlide, 5000); // تغيير كل 5 ثوان
    }

    // إيقاف العرض التلقائي مؤقتاً عند تحريك الماوس فوق العرض
    document.querySelector('.slideshow-container').addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    // إعادة تشغيل العرض التلقائي عند إزالة الماوس
    document.querySelector('.slideshow-container').addEventListener('mouseleave', startSlideshow);

    // تهيئة العرض
    createIndicators();
    goToSlide(0);
    startSlideshow();

    // شريط الصور
    let stripCurrentSlide = 0;
    const totalStripSlides = 5;
    let stripInterval;

    function goToStripSlide(index) {
        const strip = document.querySelector('.image-strip');
        const slides = document.querySelectorAll('.strip-slide');
        const dots = document.querySelectorAll('.nav-dot');
        
        stripCurrentSlide = index;
        
        // تحريك الشريط
        strip.style.transform = `translateX(${-100 * stripCurrentSlide}%)`;
        
        // تحديث الصورة النشطة
        slides.forEach(slide => slide.classList.remove('active'));
        slides[stripCurrentSlide].classList.add('active');
        
        // تحديث النقطة النشطة
        dots.forEach(dot => dot.classList.remove('active'));
        dots[stripCurrentSlide].classList.add('active');
    }

    function nextStripSlide() {
        stripCurrentSlide = (stripCurrentSlide + 1) % totalStripSlides;
        goToStripSlide(stripCurrentSlide);
    }

    function startStripShow() {
        stripInterval = setInterval(nextStripSlide, 4000);
    }

    // تشغيل العرض عند تحميل الصفحة
    goToStripSlide(0);
    startStripShow();
    
    // إيقاف العرض التلقائي عند التحويم
    const container = document.querySelector('.image-strip-container');
    container.addEventListener('mouseenter', () => clearInterval(stripInterval));
    container.addEventListener('mouseleave', startStripShow);
});
