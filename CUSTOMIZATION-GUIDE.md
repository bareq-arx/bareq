# دليل التخصيص السريع - BAREQ Landing Page

## 📞 تحديث معلومات الاتصال

### 1. أرقام الهاتف

**الملفات المطلوب تحديثها:**

#### في `index.html`:
ابحث عن `+20 123 456 7890` واستبدله برقمك:

```html
<!-- في قسم Contact Info -->
<p dir="ltr">+20 123 456 7890</p>

<!-- في Footer -->
<li><i class="fas fa-phone"></i> <span dir="ltr">+20 123 456 7890</span></li>

<!-- رابط الاتصال -->
<a href="tel:+201234567890" class="call-float">
```

**مواقع التحديث:**
- قسم معلومات الاتصال (Contact Section)
- الفوتر (Footer)
- زر الاتصال العائم (Call Float Button)

### 2. رقم WhatsApp

ابحث عن `https://wa.me/+201234567890` واستبدله:

```html
<a href="https://wa.me/+201234567890" class="whatsapp-float">
```

**نصيحة:** يمكنك إضافة رسالة افتراضية:
```html
<a href="https://wa.me/+201234567890?text=مرحباً، أريد الاستفسار عن مشروع بريق">
```

### 3. البريد الإلكتروني

ابحث عن `info@bariq-newdamietta.com` واستبدله:

```html
<p>info@bariq-newdamietta.com</p>
<p>sales@bariq-newdamietta.com</p>
```

## 🎨 تخصيص الألوان

### في `styles.css` (السطور 1-13):

```css
:root {
    --primary-color: #1a1a2e;        /* اللون الأساسي */
    --secondary-color: #16213e;      /* اللون الثانوي */
    --accent-color: #c29958;         /* لون الإبراز (الذهبي) */
    --accent-hover: #d4a968;         /* لون الإبراز عند التحويم */
}
```

**اقتراحات ألوان بديلة:**

#### نمط أزرق فاخر:
```css
--primary-color: #0a2463;
--secondary-color: #3e92cc;
--accent-color: #1e5f74;
--accent-hover: #2d7f91;
```

#### نمط أخضر عصري:
```css
--primary-color: #1b4332;
--secondary-color: #2d6a4f;
--accent-color: #52b788;
--accent-hover: #74c69d;
```

## 🏷️ تحديث الأسعار

### في `index.html`:

#### المحلات التجارية:
```html
<!-- ابحث عن: -->
<span class="detail-value">من 30 حتى 133 متر</span>
<span class="detail-value">من 130,500 حتى 196,000 جنيه</span>
<span class="detail-value highlight">3,784,500 جنيه</span>
```

#### المكاتب الإدارية:
```html
<span class="detail-value">من 40 حتى 110 متر</span>
<span class="detail-value">من 54,500 حتى 65,500 جنيه</span>
<span class="detail-value highlight">2,180,000 جنيه</span>
```

#### العيادات الطبية:
(نفس أسعار المكاتب)

#### الشقق السكنية:
```html
<span class="detail-value">160، 168، 174 متر</span>
<span class="detail-value">من 37,500 حتى 42,000 جنيه</span>
<span class="detail-value highlight">6,300,000 جنيه</span>
```

## 🎯 تحديث نسب الخصومات

### في `index.html`:

```html
<!-- المحلات -->
<div class="unit-badge">عرض محدود</div>

<!-- المكاتب والعيادات -->
<div class="unit-badge discount">خصم 13%</div>

<!-- الشقق -->
<div class="unit-badge special">خصم 10% للونش</div>
```

**تغيير النسبة:**
```html
<div class="unit-badge discount">خصم 15%</div>
```

## 🖼️ تغيير الصور

### استبدال الصور الموجودة:

احفظ صورك الجديدة في مجلد `public/media/` بنفس الأسماء:
```
public/media/
├── bareq_main_video.mp4
├── Bareq-logo.jpg
├── Bareq-General-Vertical-View.jpg
├── Bareq-Plaza-Water-Fountains-Interior-View.jpg
└── ...
```

### إضافة صور جديدة للمعرض:

في `index.html`، قسم Gallery:
```html
<div class="gallery-item">
    <img src="public/media/your-new-image.jpg" alt="وصف الصورة">
    <div class="gallery-overlay">
        <i class="fas fa-search-plus"></i>
    </div>
</div>
```

## 🎬 تغيير الفيديو

استبدل `bareq_main_video.mp4` في مجلد `public/media/`

أو غيّر المسار في `index.html`:
```html
<video class="hero-video" autoplay muted loop playsinline>
    <source src="public/media/your-video.mp4" type="video/mp4">
</video>
```

## 📝 تحديث النصوص

### العنوان الرئيسي:

```html
<h1 class="hero-title">
    <span class="title-top">بريق</span>
    <span class="title-main">BARIQ</span>
</h1>
```

### الوصف:

```html
<p class="hero-subtitle">
    ✨ مشروعك الاستثماري في قلب دمياط الجديدة ✨
</p>
```

### قسم "عن المشروع":

```html
<p class="lead-text">
    يقع بريق في قلب دمياط الجديدة...
</p>
```

## 📊 تحديث الإحصائيات

في قسم Quick Stats:

```html
<div class="stat-item">
    <div class="stat-icon">
        <i class="fas fa-map-marked-alt"></i>
    </div>
    <h3 class="stat-number">23,000</h3>
    <p class="stat-label">متر مربع</p>
</div>
```

**غيّر الأرقام والنصوص حسب الحاجة**

## 🗺️ إضافة خريطة Google Maps

استبدل `.map-placeholder` بهذا الكود:

```html
<div class="location-map">
    <iframe 
        src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE"
        width="100%" 
        height="500" 
        style="border:0; border-radius: 15px;" 
        allowfullscreen="" 
        loading="lazy">
    </iframe>
</div>
```

**للحصول على كود الخريطة:**
1. افتح Google Maps
2. ابحث عن موقع المشروع
3. اضغط "Share" > "Embed a map"
4. انسخ الكود

## 🔔 إضافة إشعارات

### تفعيل إرسال البريد عند استلام Lead:

في `script.js`، فعّل هذا الكود:

```javascript
const response = await fetch('/api/leads', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
});
```

ستحتاج إلى إنشاء Backend API (انظر DEPLOYMENT.md)

## 📱 تخصيص روابط السوشيال ميديا

في Footer:

```html
<div class="social-links">
    <a href="https://facebook.com/yourpage" aria-label="Facebook">
        <i class="fab fa-facebook-f"></i>
    </a>
    <a href="https://instagram.com/yourpage" aria-label="Instagram">
        <i class="fab fa-instagram"></i>
    </a>
    <a href="https://twitter.com/yourpage" aria-label="Twitter">
        <i class="fab fa-twitter"></i>
    </a>
    <a href="https://youtube.com/yourchannel" aria-label="YouTube">
        <i class="fab fa-youtube"></i>
    </a>
    <a href="https://wa.me/+201234567890" aria-label="WhatsApp">
        <i class="fab fa-whatsapp"></i>
    </a>
</div>
```

## 🏷️ تحديث Meta Tags للسيو

في `<head>` في `index.html`:

```html
<meta name="description" content="وصفك هنا">
<meta name="keywords" content="الكلمات المفتاحية">

<!-- Open Graph للسوشيال ميديا -->
<meta property="og:title" content="بريق - BARIQ">
<meta property="og:description" content="وصفك هنا">
<meta property="og:image" content="public/media/Bareq-logo.jpg">
<meta property="og:url" content="https://yourdomain.com">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="بريق - BARIQ">
<meta name="twitter:description" content="وصفك هنا">
<meta name="twitter:image" content="public/media/Bareq-logo.jpg">
```

## 🎨 إضافة Favicon

1. احفظ أيقونتك كـ `favicon.ico` في المجلد الرئيسي
2. أضف في `<head>`:

```html
<link rel="icon" type="image/x-icon" href="favicon.ico">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
```

## ⚡ نصائح للأداء

### 1. ضغط الصور
- استخدم أدوات مثل TinyPNG
- حجم الصور المثالي: 150-300 KB

### 2. تحسين الفيديو
- استخدم صيغة MP4
- دقة 1920x1080 أو أقل
- حجم أقل من 10 MB

### 3. تفعيل Lazy Loading
للصور الكبيرة:
```html
<img src="image.jpg" loading="lazy" alt="وصف">
```

## 🔧 تخصيصات متقدمة

### تغيير الخط:

في `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;700&display=swap" rel="stylesheet">
```

في `styles.css`:
```css
body {
    font-family: 'Tajawal', sans-serif;
}
```

### تغيير سرعة الرسوم المتحركة:

في `styles.css`:
```css
:root {
    --transition: all 0.3s ease;  /* غيّر 0.3s حسب الحاجة */
}
```

## 📋 قائمة التخصيصات السريعة

- [ ] أرقام الهاتف (3 مواقع)
- [ ] رقم WhatsApp (موقع واحد)
- [ ] البريد الإلكتروني (موقعان)
- [ ] الأسعار (4 أنواع وحدات)
- [ ] الخصومات (3 شارات)
- [ ] روابط السوشيال ميديا (5 روابط)
- [ ] خريطة Google Maps
- [ ] Meta Tags
- [ ] Favicon
- [ ] الصور والفيديو

## ⚠️ ملاحظات مهمة

1. **النسخ الاحتياطي**: احتفظ بنسخة من الملفات الأصلية
2. **الاختبار**: اختبر الموقع بعد كل تغيير
3. **التنسيق**: حافظ على تنسيق الكود
4. **المتصفحات**: اختبر على Chrome, Safari, Firefox
5. **الهاتف**: اختبر على أجهزة مختلفة

## 🆘 المساعدة

في حالة حدوث مشاكل:
1. افتح Console في المتصفح (F12)
2. راجع الأخطاء الموجودة
3. تأكد من المسارات الصحيحة
4. راجع ملف README.md

---

**نصيحة احترافية**: اعمل تغيير واحد في كل مرة واختبره قبل الانتقال للتالي!

