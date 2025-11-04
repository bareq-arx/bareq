// ======================
// MOBILE MENU
// ======================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// ======================
// VIDEO SOUND CONTROL
// ======================
const heroVideo = document.getElementById('heroVideo');
const videoSoundBtn = document.getElementById('videoSoundBtn');

if (heroVideo && videoSoundBtn) {
    videoSoundBtn.addEventListener('click', () => {
        if (heroVideo.muted) {
            heroVideo.muted = false;
            videoSoundBtn.classList.add('unmuted');
            videoSoundBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            videoSoundBtn.setAttribute('aria-label', 'إيقاف الصوت');
        } else {
            heroVideo.muted = true;
            videoSoundBtn.classList.remove('unmuted');
            videoSoundBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            videoSoundBtn.setAttribute('aria-label', 'تشغيل الصوت');
        }
    });
}

// ======================
// HEADER SCROLL EFFECT
// ======================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ======================
// SMOOTH SCROLL
// ======================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ======================
// UNITS TABS
// ======================
const unitTabs = document.querySelectorAll('.unit-tab');
const unitContents = document.querySelectorAll('.unit-content');

unitTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        unitTabs.forEach(t => t.classList.remove('active'));
        unitContents.forEach(c => c.classList.remove('active'));

        // Add active class to clicked tab
        tab.classList.add('active');

        // Show corresponding content
        const tabId = tab.getAttribute('data-tab');
        const content = document.getElementById(tabId);
        if (content) {
            content.classList.add('active');
        }
    });
});

// ======================
// SET MINIMUM DATE FOR VISIT
// ======================
const visitDateInput = document.getElementById('visit-date');
if (visitDateInput) {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    visitDateInput.setAttribute('min', today);
}

// ======================
// FORM SUBMISSION
// ======================
const leadForm = document.getElementById('leadForm');
const successModal = document.getElementById('successModal');

if (leadForm) {
    leadForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Show loading state
        const submitBtn = leadForm.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-block';
        submitBtn.disabled = true;

        // Get form data with all new fields
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            unitType: document.getElementById('unit-type').value,
            purpose: document.querySelector('input[name="purpose"]:checked')?.value || '',
            callTime: document.getElementById('call-time').value,
            visitDate: document.getElementById('visit-date').value,
            visitTime: document.getElementById('visit-time').value || 'غير محدد',
            notes: document.getElementById('notes').value || '',
            timestamp: new Date().toISOString(),
            formattedDate: new Date().toLocaleString('ar-EG'),
        };

        // Log to console (in production, send to backend)
        console.log('Lead Form Submission:', formData);

        // Here you would typically send the data to your backend
        // Example:
        // try {
        //     const response = await fetch('/api/leads', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(formData),
        //     });
        //     
        //     if (response.ok) {
        //         // Show success message
        //         showSuccessModal();
        //         leadForm.reset();
        //     }
        // } catch (error) {
        //     console.error('Error:', error);
        //     alert('حدث خطأ أثناء إرسال النموذج. يرجى المحاولة مرة أخرى.');
        // }

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // For now, just show success modal and store locally
        storeLeadLocally(formData);
        showSuccessModal();
        leadForm.reset();

        // Reset button state
        btnText.style.display = 'inline-block';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
    });
}

// ======================
// STORE LEAD LOCALLY
// ======================
function storeLeadLocally(leadData) {
    try {
        // Get existing leads from localStorage
        const leads = JSON.parse(localStorage.getItem('bareq_leads') || '[]');
        
        // Add new lead
        leads.push(leadData);
        
        // Store back to localStorage
        localStorage.setItem('bareq_leads', JSON.stringify(leads));
        
        console.log('Lead stored locally:', leadData);
    } catch (error) {
        console.error('Error storing lead:', error);
    }
}

// ======================
// MODAL FUNCTIONS
// ======================
function showSuccessModal() {
    if (successModal) {
        successModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    if (successModal) {
        successModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
if (successModal) {
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            closeModal();
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && successModal?.classList.contains('show')) {
        closeModal();
    }
});

// ======================
// GALLERY LIGHTBOX (Simple)
// ======================
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img src="${img.src}" alt="${img.alt}">
                </div>
            `;
            
            // Add styles
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.95);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            `;
            
            const lightboxContent = lightbox.querySelector('.lightbox-content');
            lightboxContent.style.cssText = `
                position: relative;
                max-width: 90%;
                max-height: 90%;
            `;
            
            const lightboxImg = lightbox.querySelector('img');
            lightboxImg.style.cssText = `
                max-width: 100%;
                max-height: 90vh;
                border-radius: 10px;
            `;
            
            const closeBtn = lightbox.querySelector('.lightbox-close');
            closeBtn.style.cssText = `
                position: absolute;
                top: -40px;
                right: 0;
                font-size: 40px;
                color: white;
                cursor: pointer;
                font-weight: 300;
                transition: all 0.3s ease;
            `;
            
            // Close lightbox
            closeBtn.addEventListener('click', () => {
                lightbox.remove();
            });
            
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    lightbox.remove();
                }
            });
            
            document.body.appendChild(lightbox);
        }
    });
});

// ======================
// SCROLL ANIMATIONS
// ======================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(`
        .stat-item,
        .feature-card,
        .plaza-feature,
        .unit-card,
        .gallery-item,
        .info-card
    `);
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});

// ======================
// PHONE NUMBER VALIDATION
// ======================
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        // Remove non-numeric characters
        let value = e.target.value.replace(/\D/g, '');
        
        // Limit to 11 digits for Egyptian phone numbers
        if (value.length > 11) {
            value = value.slice(0, 11);
        }
        
        e.target.value = value;
    });
}

// ======================
// COUNTER ANIMATION
// ======================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString('ar-EG');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString('ar-EG');
        }
    }, 16);
}

// Animate counters when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const number = entry.target;
            const target = parseInt(number.getAttribute('data-target') || number.textContent.replace(/,/g, ''));
            number.setAttribute('data-target', target);
            animateCounter(number, target);
            statsObserver.unobserve(number);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// ======================
// UTILITY FUNCTIONS
// ======================

// Format Egyptian phone number
function formatPhoneNumber(phone) {
    // Remove all non-numeric characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Format as Egyptian number
    if (cleaned.length === 11) {
        return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
    }
    
    return phone;
}

// Validate email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        font-family: 'Cairo', sans-serif;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ======================
// WHATSAPP CLICK TRACKING
// ======================
const whatsappBtn = document.querySelector('.whatsapp-float');
if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
        console.log('WhatsApp button clicked');
        // Track analytics here if needed
    });
}

// ======================
// CALL BUTTON TRACKING
// ======================
const callBtn = document.querySelector('.call-float');
if (callBtn) {
    callBtn.addEventListener('click', () => {
        console.log('Call button clicked');
        // Track analytics here if needed
    });
}

// ======================
// PAGE LOAD ANALYTICS
// ======================
window.addEventListener('load', () => {
    console.log('Page loaded:', {
        url: window.location.href,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        language: navigator.language,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
    });
    
    // Track page view
    // In production, send this data to your analytics service
});

// ======================
// TRACK TIME ON PAGE
// ======================
let startTime = Date.now();

window.addEventListener('beforeunload', () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    console.log(`Time spent on page: ${timeSpent} seconds`);
    // Track this in your analytics
});

// ======================
// TRACK SCROLL DEPTH
// ======================
let maxScroll = 0;

window.addEventListener('scroll', () => {
    const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );
    
    if (scrollPercentage > maxScroll) {
        maxScroll = scrollPercentage;
        
        // Track milestones
        if (maxScroll === 25 || maxScroll === 50 || maxScroll === 75 || maxScroll === 100) {
            console.log(`User scrolled ${maxScroll}% of the page`);
            // Track this in your analytics
        }
    }
});

// ======================
// VIEW LEADS (ADMIN FUNCTION)
// ======================
// This function can be called from browser console to view stored leads
// Usage: viewLeads()
window.viewLeads = function() {
    try {
        const leads = JSON.parse(localStorage.getItem('bareq_leads') || '[]');
        console.table(leads);
        return leads;
    } catch (error) {
        console.error('Error retrieving leads:', error);
        return [];
    }
};

// ======================
// EXPORT LEADS TO CSV (ADMIN FUNCTION)
// ======================
// Usage: exportLeads()
window.exportLeads = function() {
    try {
        const leads = JSON.parse(localStorage.getItem('bareq_leads') || '[]');
        
        if (leads.length === 0) {
            alert('لا توجد بيانات للتصدير');
            return;
        }
        
        // Create CSV content with all new fields
        const headers = ['الاسم', 'رقم الهاتف', 'نوع الوحدة', 'الغرض', 'وقت الاتصال', 'تاريخ الزيارة', 'وقت الزيارة', 'ملاحظات', 'التاريخ'];
        const csvContent = [
            headers.join(','),
            ...leads.map(lead => [
                lead.name,
                lead.phone,
                lead.unitType || '',
                lead.purpose || '',
                lead.callTime || '',
                lead.visitDate || '',
                lead.visitTime || '',
                `"${lead.notes || ''}"`,
                lead.formattedDate || new Date(lead.timestamp).toLocaleString('ar-EG')
            ].join(','))
        ].join('\n');
        
        // Create download link
        const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `bareq_leads_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        
        console.log(`Exported ${leads.length} leads`);
    } catch (error) {
        console.error('Error exporting leads:', error);
    }
};

// ======================
// CLEAR LEADS (ADMIN FUNCTION)
// ======================
// Usage: clearLeads()
window.clearLeads = function() {
    if (confirm('هل أنت متأكد من حذف جميع البيانات؟')) {
        localStorage.removeItem('bareq_leads');
        console.log('All leads cleared');
        alert('تم حذف جميع البيانات بنجاح');
    }
};

// Log admin functions
console.log('%cAdmin Functions Available:', 'color: #c29958; font-size: 16px; font-weight: bold;');
console.log('- viewLeads() : عرض جميع العملاء المحتملين');
console.log('- exportLeads() : تصدير البيانات إلى CSV');
console.log('- clearLeads() : حذف جميع البيانات');

// ======================
// CONSOLE WELCOME MESSAGE
// ======================
console.log(
    '%cبريق - BARIQ',
    'color: #c29958; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);'
);
console.log(
    '%cمشروعك الاستثماري في قلب دمياط الجديدة',
    'color: #1a1a2e; font-size: 14px;'
);
console.log('');

