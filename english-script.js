document.addEventListener("DOMContentLoaded", () => {
    const langBtnMain = document.getElementById("langBtnMain");
    const langSwitcher = document.querySelector(".lang-switcher-fixed");

    if (langBtnMain) {
        langBtnMain.addEventListener("click", (e) => {
            e.stopPropagation();
            langSwitcher.classList.toggle("active");
        });
    }

    document.addEventListener("click", () => {
        if (langSwitcher) langSwitcher.classList.remove("active");
    });

    window.updateLanguage = function(lang) {
        const elements = document.querySelectorAll(".lang-key");
        const bootstrapLink = document.getElementById("bootstrap-link");

        const bootstrapAr = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css";
        const bootstrapEn = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css";

        elements.forEach((el) => {
            if (!el.getAttribute("data-ar")) {
                el.setAttribute("data-ar", el.innerHTML.trim());
            }

            if (lang === "en") {
                const enText = el.getAttribute("data-en");
                if (enText) el.innerHTML = enText;
            } else {
                const arText = el.getAttribute("data-ar");
                if (arText) el.innerHTML = arText;
            }
        });

        // تغيير اتجاه الموقع والملفات
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === "en" ? "ltr" : "rtl";
        if (bootstrapLink) bootstrapLink.href = (lang === "en") ? bootstrapEn : bootstrapAr;

        // تحديث شكل الزر الثابت (العلم والنص)
        const flag = document.getElementById("currentFlag");
        const text = document.getElementById("currentLangText");
        if (flag && text) {
            if (lang === 'ar') {
                flag.src = "https://flagcdn.com/w20/sa.png";
                text.textContent = "العربية";
            } else {
                flag.src = "https://flagcdn.com/w20/us.png";
                text.textContent = "English";
            }
        }

        // حفظ الاختيار
        localStorage.setItem("selectedLang", lang);
        
        // إعادة تشغيل الأنيماشين (اختياري)
        if (window.AOS) AOS.refresh();
    };

    // 3. تشغيل اللغة المحفوظة عند تحميل الصفحة
    let savedLang = localStorage.getItem("selectedLang") || "ar";
    updateLanguage(savedLang);
});

// دالة يتم استدعاؤها من داخل الـ HTML للزر الجديد
function changeLanguage(lang) {
    if (typeof window.updateLanguage === "function") {
        window.updateLanguage(lang);
    }
}

// Function to show language switcher after loading screen vanishes
window.addEventListener('load', function() {
    // Select the loading screen and the language switcher
    const loader = document.querySelector('.loading-screen');
    const langSwitcher = document.querySelector('.lang-switcher-fixed');

    // Wait for the window to fully load
    setTimeout(() => {
        if (langSwitcher) {
            langSwitcher.classList.add('show-switcher');
        }
    }, 600); // 600ms matches most common fade-out animations
});

// ===========================
// Smart WhatsApp Button (Multilingual)
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    const whatsappBtn = document.querySelector('.whatsapp-float');
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const phoneNumber = '966551159850';
            
           
            const currentLang = document.documentElement.lang; 
            
            
            let message = '';
            if (currentLang === 'en') {
                message = ' I would like to inquire about your services.';
            } else {
                message = ' أرغب في الاستفسار عن خدماتكم.';
            }
            
            
            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        });
    }
});
