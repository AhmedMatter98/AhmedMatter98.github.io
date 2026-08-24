// 1. Initialize AOS (Animate On Scroll)
AOS.init({ duration: 1000, once: true });

// 2. Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// 3. Dark/Light Mode Toggle
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;

themeBtn.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.setAttribute('data-theme', 'light');
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        body.setAttribute('data-theme', 'dark');
        themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// 4. Bilingual Toggle (English / Arabic)
const langBtn = document.getElementById('lang-toggle');
langBtn.addEventListener('click', () => {
    if (body.getAttribute('lang') === 'en') {
        body.setAttribute('lang', 'ar');
        langBtn.innerText = 'English';
        navLinks.classList.remove('active'); 
    } else {
        body.setAttribute('lang', 'en');
        langBtn.innerText = 'عربي';
        navLinks.classList.remove('active');
    }
    if(typeof renderQuote === 'function') renderQuote();
});

// 5. Dynamic Project Filtering (بدون تعارض مع AOS ويدعم التصنيفات المتعددة)
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            // إيقاف تعارض مكتبة AOS بمجرد بدء الفلترة
            card.removeAttribute('data-aos');
            
            const cardCategories = card.getAttribute('data-category').toLowerCase().split(' ');
            
            if (filterValue === 'all' || cardCategories.includes(filterValue)) {
                card.style.display = 'flex';
                // أضفنا forwards لضمان بقاء المشروع ظاهراً بقوة
                card.style.animation = 'none'; // تفريغ الأنيميشن القديم
                setTimeout(() => {
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                }, 10);
            } else {
                card.style.display = 'none';
            }
        });
    });
});

const style = document.createElement('style');
style.innerHTML = `@keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }`;
document.head.appendChild(style);

// 6. Typewriter Effect
const textsEn = ["Financial Data Analyst", "Power BI Developer", "BI Instructor"];
const textsAr = ["محلل بيانات مالية", "مطور Power BI", "مدرب ذكاء أعمال"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type() {
    const currentLang = document.body.getAttribute('lang');
    const textsArray = currentLang === 'en' ? textsEn : textsAr;
    
    if (count >= textsArray.length) { count = 0; }
    
    currentText = textsArray[count];
    letter = currentText.slice(0, ++index);
    
    const typewriterElement = document.getElementById("typewriter");
    if (typewriterElement) {
        typewriterElement.textContent = letter;
    }
    
    if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(type, 2000);
    } else {
        setTimeout(type, 100);
    }
}());

// // 7. Interactive Dashboard Modal Logic (Case Study)
// const modal = document.getElementById('dashboard-modal');
// const closeBtn = document.querySelector('.close-btn');
// const modalIframeContainer = document.getElementById('modal-iframe-container');
// const openDashboardBtns = document.querySelectorAll('.open-dashboard-btn');

// openDashboardBtns.forEach(btn => {
//     btn.addEventListener('click', (e) => {
//         e.preventDefault();
//         const embedLink = btn.getAttribute('data-embed');
//         modalIframeContainer.innerHTML = `<iframe title="Interactive Dashboard" src="${embedLink}" frameborder="0" allowFullScreen="true"></iframe>`;
        
//         document.getElementById('modal-title-en').textContent = btn.getAttribute('data-title-en') || "Project details";
//         document.getElementById('modal-title-ar').textContent = btn.getAttribute('data-title-ar') || "تفاصيل المشروع";
        
//         document.getElementById('modal-prob-en').textContent = btn.getAttribute('data-prob-en') || "No data provided.";
//         document.getElementById('modal-prob-ar').textContent = btn.getAttribute('data-prob-ar') || "لا توجد بيانات.";
        
//         document.getElementById('modal-sol-en').textContent = btn.getAttribute('data-sol-en') || "No data provided.";
//         document.getElementById('modal-sol-ar').textContent = btn.getAttribute('data-sol-ar') || "لا توجد بيانات.";
        
//         document.getElementById('modal-imp-en').textContent = btn.getAttribute('data-imp-en') || "No data provided.";
//         document.getElementById('modal-imp-ar').textContent = btn.getAttribute('data-imp-ar') || "لا توجد بيانات.";

//         modal.style.display = 'block';
//         document.body.style.overflow = 'hidden'; 
//     });
// });

// const closeDashboardModal = () => {
//     modal.style.display = 'none';
//     modalIframeContainer.innerHTML = ''; 
//     document.body.style.overflow = 'auto'; 
// };

// const closeDashboardBtn = document.getElementById('close-dashboard-btn');
// if(closeDashboardBtn) {
//     closeDashboardBtn.addEventListener('click', closeDashboardModal);
// }

// window.addEventListener('click', (e) => {
//     if (e.target === modal) {
//         closeModal();
//     }
// });

// =========================================
// 7. Interactive Modal Logic (Supports Iframes, Sliders & Downloads)
// =========================================
const modal = document.getElementById('dashboard-modal');
const modalIframeContainer = document.getElementById('modal-iframe-container');
const openDashboardBtns = document.querySelectorAll('.open-dashboard-btn');
const modalDownloadBtn = document.getElementById('modal-download-btn'); // تعريف زر التحميل

openDashboardBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const embedLink = btn.getAttribute('data-embed');
        const imagesData = btn.getAttribute('data-images');
        const downloadLink = btn.getAttribute('data-download'); // سحب رابط التحميل
        
        if (imagesData) {
            const imgArray = imagesData.split(',');
            let sliderHTML = `<div class="slider-container">`;
            
            imgArray.forEach((img, idx) => {
                sliderHTML += `<img src="${img.trim()}" class="slider-img ${idx === 0 ? 'active' : ''}" alt="Case Study Image">`;
            });
            
            if (imgArray.length > 1) {
                sliderHTML += `
                    <button class="slider-nav slider-prev"><i class="fas fa-chevron-left"></i></button>
                    <button class="slider-nav slider-next"><i class="fas fa-chevron-right"></i></button>
                `;
            }
            sliderHTML += `</div>`;
            modalIframeContainer.innerHTML = sliderHTML;
            
            if (imgArray.length > 1) {
                let currentIndex = 0;
                const allImgs = modalIframeContainer.querySelectorAll('.slider-img');
                
                modalIframeContainer.querySelector('.slider-next').addEventListener('click', () => {
                    allImgs[currentIndex].classList.remove('active');
                    currentIndex = (currentIndex + 1) % allImgs.length;
                    allImgs[currentIndex].classList.add('active');
                });
                
                modalIframeContainer.querySelector('.slider-prev').addEventListener('click', () => {
                    allImgs[currentIndex].classList.remove('active');
                    currentIndex = (currentIndex - 1 + allImgs.length) % allImgs.length;
                    allImgs[currentIndex].classList.add('active');
                });
            }
        } else if (embedLink) {
            modalIframeContainer.innerHTML = `<iframe title="Interactive Dashboard" src="${embedLink}" frameborder="0" allowFullScreen="true" style="width:100%; height:100%; border:none;"></iframe>`;
        }
        
        document.getElementById('modal-title-en').textContent = btn.getAttribute('data-title-en') || "Project details";
        document.getElementById('modal-title-ar').textContent = btn.getAttribute('data-title-ar') || "تفاصيل المشروع";
        
        document.getElementById('modal-prob-en').textContent = btn.getAttribute('data-prob-en') || "No data provided.";
        document.getElementById('modal-prob-ar').textContent = btn.getAttribute('data-prob-ar') || "لا توجد بيانات.";
        
        document.getElementById('modal-sol-en').textContent = btn.getAttribute('data-sol-en') || "No data provided.";
        document.getElementById('modal-sol-ar').textContent = btn.getAttribute('data-sol-ar') || "لا توجد بيانات.";
        
        document.getElementById('modal-imp-en').textContent = btn.getAttribute('data-imp-en') || "No data provided.";
        document.getElementById('modal-imp-ar').textContent = btn.getAttribute('data-imp-ar') || "لا توجد بيانات.";

// التحكم في ظهور زر التحميل
        if (modalDownloadBtn) {
            if (downloadLink) {
                modalDownloadBtn.href = downloadLink;
                // مسحنا الـ target="_blank" عشان نمنع الشاشة اللي بتفتح وتقفل
                modalDownloadBtn.removeAttribute('target'); 
                modalDownloadBtn.setAttribute('download', ''); // أمر مباشر بالتحميل
                modalDownloadBtn.style.display = 'inline-flex'; // إظهار الزر
            } else {
                modalDownloadBtn.style.display = 'none'; // إخفاء الزر
                modalDownloadBtn.href = '#';
                modalDownloadBtn.removeAttribute('download');
            }
        }

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; 
    });
});

const closeDashboardModal = () => {
    modal.style.display = 'none';
    modalIframeContainer.innerHTML = ''; 
    document.body.style.overflow = 'auto'; 
};

const closeDashboardBtn = document.getElementById('close-dashboard-btn');
if(closeDashboardBtn) {
    closeDashboardBtn.addEventListener('click', closeDashboardModal);
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeDashboardModal();
    }
});

// 8. Services Modal Logic
const requestServiceBtn = document.getElementById('request-service-btn');
if(requestServiceBtn) {
    requestServiceBtn.addEventListener('click', () => {
        serviceModal.style.display = 'none';
        document.body.style.overflow = 'auto'; 
    });
}
const serviceModal = document.getElementById('service-modal');
const closeServiceBtn = document.getElementById('close-service-btn');
const clickableServices = document.querySelectorAll('.clickable-service');

const servModalTitle = document.getElementById('serv-modal-title');
const servModalDesc = document.getElementById('serv-modal-desc');

clickableServices.forEach(card => {
    card.addEventListener('click', () => {
        const currentLang = document.body.getAttribute('lang') || 'en';
        const title = card.getAttribute(`data-title-${currentLang}`);
        const desc = card.getAttribute(`data-desc-${currentLang}`);
        
        servModalTitle.textContent = title;
        servModalDesc.textContent = desc;
        
        serviceModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

if(closeServiceBtn) {
    closeServiceBtn.addEventListener('click', () => {
        serviceModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

window.addEventListener('click', (e) => {
    if (e.target === serviceModal) {
        serviceModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// 9. Data Nodes Animation (Particles.js)
if(document.getElementById('particles-js')) {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 50, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#a855f7" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.3, "random": false, "anim": { "enable": false } },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#a855f7", "opacity": 0.2, "width": 1.5 },
            "move": { "enable": true, "speed": 1.5, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
            "modes": { "grab": { "distance": 180, "line_linked": { "opacity": 0.5 } }, "push": { "particles_nb": 3 } }
        },
        "retina_detect": true
    });
}

// 10. Dynamic Floating Quotes Logic
const quotesData = [
    {
        en: { text: "Without data, you're just another person with an opinion.", author: "- W. Edwards Deming", label: "Real-world Value:", example: "Data shows exactly which product caused the decline, replacing guesswork with facts." },
        ar: { text: "بدون بيانات، أنت مجرد شخص آخر لديه رأي.", author: "- إدواردز ديمينج", label: "مثال واقعي:", example: "البيانات توضح بدقة المنتج الذي تسبب في التراجع، مما يستبدل التخمين بالحقائق." }
    },
    {
        en: { text: "Data is the new oil. It’s valuable, but if unrefined it cannot really be used.", author: "- Clive Humby", label: "Real-world Value:", example: "Raw data is meaningless until cleaned (ETL) and turned into an interactive dashboard." },
        ar: { text: "البيانات هي النفط الجديد. قيمة جداً، ولكن إذا لم يتم تكريرها فلا يمكن استخدامها.", author: "- كلايف همبي", label: "مثال واقعي:", example: "البيانات الخام ليس لها معنى حتى يتم تنظيفها (ETL) وتحويلها للوحة تحكم." }
    },
    {
        en: { text: "The greatest value of a picture is when it forces us to notice what we never expected to see.", author: "- John Tukey", label: "Real-world Value:", example: "A well-designed chart reveals hidden trends like sudden churn spikes on weekends." },
        ar: { text: "القيمة العظمى لتصوير البيانات هي عندما يجبرنا على ملاحظة ما لم نتوقع رؤيته.", author: "- جون توكي", label: "مثال واقعي:", example: "الرسم البياني يكشف اتجاهات خفية كزيادة تسرب العملاء فجأة في العطلات." }
    }
];

let currentQuoteIndex = 0;
let quoteInterval;
let isQuoteEnabled = true; 

const quotePopup = document.getElementById('quote-popup');
const toggleQuoteBtn = document.getElementById('toggle-quote-btn');
const popupCloseBtn = document.getElementById('close-quote-btn');

const popupText = document.getElementById('popup-text');
const popupAuthor = document.getElementById('popup-author');
const popupLabel = document.getElementById('popup-label');
const popupExample = document.getElementById('popup-example-text');

function renderQuote() {
    const currentLang = document.body.getAttribute('lang') || 'en';
    const quote = quotesData[currentQuoteIndex][currentLang];
    
    popupText.textContent = `"${quote.text}"`;
    popupAuthor.textContent = quote.author;
    popupLabel.textContent = quote.label;
    popupExample.textContent = quote.example;
}

function showNextQuote() {
    if (!isQuoteEnabled) return;
    
    quotePopup.classList.remove('show');
    
    setTimeout(() => {
        currentQuoteIndex = (currentQuoteIndex + 1) % quotesData.length;
        renderQuote();
        quotePopup.classList.add('show');
        
        setTimeout(() => {
            quotePopup.classList.remove('show');
        }, 7000);

    }, 500); 
}

function startQuotes() {
    if (!isQuoteEnabled) return;
    renderQuote();
    quotePopup.classList.add('show');
    
    setTimeout(() => { quotePopup.classList.remove('show'); }, 7000);
    
    quoteInterval = setInterval(showNextQuote, 12000);
}

if(popupCloseBtn && toggleQuoteBtn) {
    popupCloseBtn.addEventListener('click', () => {
        quotePopup.classList.remove('show');
    });

    toggleQuoteBtn.addEventListener('click', () => {
        isQuoteEnabled = !isQuoteEnabled;
        if (isQuoteEnabled) {
            toggleQuoteBtn.classList.remove('muted');
            toggleQuoteBtn.title = "Disable Data Insights";
            showNextQuote();
            quoteInterval = setInterval(showNextQuote, 12000);
        } else {
            toggleQuoteBtn.classList.add('muted');
            toggleQuoteBtn.title = "Enable Data Insights";
            quotePopup.classList.remove('show');
            clearInterval(quoteInterval);
        }
    });

    setTimeout(startQuotes, 3000);
}

// 11. Formspree AJAX Submission (No Redirect)
async function handleFormSubmit(event, formId, statusId) {
    event.preventDefault(); 
    
    const form = document.getElementById(formId);
    const status = document.getElementById(statusId);
    const currentLang = document.body.getAttribute('lang') || 'en';
    const btn = form.querySelector('button[type="submit"]');

    const originalBtnText = btn.innerHTML;
    btn.innerHTML = currentLang === 'ar' ? 'جاري الإرسال...' : 'Sending...';

    const data = new FormData(form);
    
    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            status.style.color = '#25d366'; 
            status.innerHTML = currentLang === 'ar' ? 'تم الإرسال بنجاح! شكراً لك.' : 'Sent successfully! Thank you.';
            status.style.display = 'block';
            form.reset(); 
        } else {
            status.style.color = '#ff0000'; 
            status.innerHTML = currentLang === 'ar' ? 'حدث خطأ، يرجى المحاولة مرة أخرى.' : 'Oops! There was a problem submitting your form.';
            status.style.display = 'block';
        }
    } catch (error) {
        status.style.color = '#ff0000';
        status.innerHTML = currentLang === 'ar' ? 'تأكد من اتصالك بالإنترنت.' : 'Network error occurred.';
        status.style.display = 'block';
    }

    btn.innerHTML = originalBtnText;
    
    setTimeout(() => {
        status.style.display = 'none';
    }, 5000);
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => handleFormSubmit(e, 'contact-form', 'contact-status'));
}

const feedbackForm = document.getElementById('feedback-form');
if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => handleFormSubmit(e, 'feedback-form', 'feedback-status'));
}
// =========================================
// 12. Scroll Progress Bar & Back to Top
// =========================================
const scrollProgress = document.getElementById('scroll-progress');
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    // حساب النسبة المئوية للنزول في الصفحة
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    let windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollPercentage = (scrollTop / windowHeight) * 100;
    
    if (scrollProgress) {
        scrollProgress.style.width = scrollPercentage + '%';
    }

    // إظهار وإخفاء زر العودة للأعلى
    if (backToTopBtn) {
        if (scrollTop > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// =========================================
// 13. Animated Number Counters (Smooth & Synchronized)
// =========================================
const startCounting = (counter) => {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    
    // إجمالي مدة العداد (2000 ملي ثانية = ثانيتين) - تقدر تزودها لو حابب أبطأ
    const duration = 2000; 
    
    // زيادة الرقم بمقدار 1 
    const increment = Math.max(1, Math.ceil(target / 100)); 
    
    // الحساب الذكي للوقت بين كل رقم والتاني عشان كلهم يخلصوا مع بعض
    const stepTime = Math.abs(Math.floor(duration / (target / increment)));

    const updateCount = () => {
        count += increment;
        if (count < target) {
            counter.textContent = count;
            setTimeout(updateCount, stepTime);
        } else {
            counter.textContent = target; // التأكد من الوقوف عند الرقم المطلوب بالضبط
        }
    };
    updateCount();
};

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                counter.textContent = '0'; // تصفير الأرقام قبل البدء
                startCounting(counter);
            });
            observer.unobserve(entry.target); // إيقاف المراقبة ليعمل مرة واحدة فقط
        }
    });
}, { threshold: 0.2 });

const aboutMetricsSection = document.querySelector('.about-metrics');
if (aboutMetricsSection) {
    counterObserver.observe(aboutMetricsSection);
}

// =========================================
// 14. Local Storage (Theme & Language Memory)
// =========================================
// 1. Theme Memory
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
    const themeBtn = document.getElementById('theme-toggle');
    if (savedTheme === 'light') {
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
}
document.getElementById('theme-toggle').addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    localStorage.setItem('theme', currentTheme);
});

// 2. Language Memory
const savedLang = localStorage.getItem('lang');
if (savedLang) {
    document.body.setAttribute('lang', savedLang);
    const langBtn = document.getElementById('lang-toggle');
    if (savedLang === 'ar') {
        langBtn.innerText = 'English';
    } else {
        langBtn.innerText = 'عربي';
    }
    if (typeof renderQuote === 'function') renderQuote();
}
document.getElementById('lang-toggle').addEventListener('click', () => {
    const currentLang = document.body.getAttribute('lang');
    localStorage.setItem('lang', currentLang);
});
// =========================================
// 15. Feedback Images Slider Logic
// =========================================
const fSlides = document.querySelectorAll('.f-slide');
const fPrevBtn = document.querySelector('.f-prev');
const fNextBtn = document.querySelector('.f-next');
const fDots = document.querySelectorAll('.f-dot');
let currentFSlide = 0;

if (fSlides.length > 0) {
    const showFSlide = (index) => {
        // إخفاء كل الصور والنقاط
        fSlides.forEach(slide => slide.classList.remove('active'));
        fDots.forEach(dot => dot.classList.remove('active'));
        
        // إظهار الصورة والنقطة المطلوبة
        fSlides[index].classList.add('active');
        fDots[index].classList.add('active');
    };

    if (fNextBtn) {
        fNextBtn.addEventListener('click', () => {
            currentFSlide = (currentFSlide + 1) % fSlides.length;
            showFSlide(currentFSlide);
        });
    }

    if (fPrevBtn) {
        fPrevBtn.addEventListener('click', () => {
            currentFSlide = (currentFSlide - 1 + fSlides.length) % fSlides.length;
            showFSlide(currentFSlide);
        });
    }

    fDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            currentFSlide = parseInt(e.target.getAttribute('data-index'));
            showFSlide(currentFSlide);
        });
    });
}