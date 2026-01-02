document.addEventListener("DOMContentLoaded", () => {
    const langBtnMain = document.getElementById("langBtnMain");
    const langSwitcher = document.querySelector(".lang-switcher-fixed");

    // 1. وظيفة فتح وإغلاق قائمة الزر الجديد
    if (langBtnMain) {
        langBtnMain.addEventListener("click", (e) => {
            e.stopPropagation();
            langSwitcher.classList.toggle("active");
        });
    }

    document.addEventListener("click", () => {
        if (langSwitcher) langSwitcher.classList.remove("active");
    });

    // 2. الدالة الرئيسية لتحويل اللغة (تحديث شامل)
    window.updateLanguage = function(lang) {
        const elements = document.querySelectorAll(".lang-key");
        const bootstrapLink = document.getElementById("bootstrap-link");

        // الروابط (تأكدي من مطابقة id="bootstrap-link" في الهيد)
        const bootstrapAr = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css";
        const bootstrapEn = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css";

        elements.forEach((el) => {
            // حفظ النص العربي الأصلي أول مرة فقط
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