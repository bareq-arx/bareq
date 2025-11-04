# دليل النشر - BAREQ Landing Page

## 📋 المتطلبات

قبل نشر الموقع، تأكد من:
- [ ] تحديث أرقام الهواتف
- [ ] تحديث عناوين البريد الإلكتروني
- [ ] تحديث رابط WhatsApp
- [ ] التأكد من وجود جميع الصور
- [ ] اختبار الموقع على متصفحات مختلفة

## 🌐 طرق النشر

### 1. استضافة ثابتة (Static Hosting)

#### GitHub Pages (مجاني)
```bash
# إنشاء مستودع جديد على GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/bareq.git
git push -u origin main

# تفعيل GitHub Pages من إعدادات المستودع
# Settings > Pages > Source: main branch
```

#### Netlify (مجاني)
1. قم بإنشاء حساب على [Netlify](https://www.netlify.com)
2. اسحب المجلد إلى Netlify Drop
3. أو اربط مستودع GitHub
4. الموقع سيكون جاهزاً فوراً!

#### Vercel (مجاني)
```bash
# تثبيت Vercel CLI
npm i -g vercel

# نشر الموقع
cd /path/to/ARX-Bareq
vercel
```

### 2. استضافة على خادم خاص

#### باستخدام cPanel
1. اضغط المجلد إلى ملف ZIP
2. ارفع الملف عبر File Manager في cPanel
3. فك الضغط في مجلد `public_html`
4. تأكد من الصلاحيات المناسبة

#### باستخدام FTP
```bash
# باستخدام FileZilla أو أي برنامج FTP
# ارفع جميع الملفات إلى المجلد الرئيسي
```

### 3. استضافة مع Backend

إذا كنت تريد إضافة Backend لحفظ البيانات:

#### Node.js + Express
```javascript
// server.js
const express = require('express');
const app = express();

app.use(express.static('.'));
app.use(express.json());

app.post('/api/leads', (req, res) => {
    const lead = req.body;
    // حفظ في قاعدة البيانات
    console.log('New lead:', lead);
    res.json({ success: true });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

## 🔧 التحسينات قبل النشر

### 1. ضغط الصور
```bash
# باستخدام ImageOptim أو TinyPNG
# تقليل حجم الصور بدون فقدان الجودة
```

### 2. تصغير الملفات (Minification)

#### CSS
```bash
# باستخدام cssnano
npx cssnano styles.css styles.min.css
```

#### JavaScript
```bash
# باستخدام terser
npx terser script.js -o script.min.js
```

### 3. إضافة ملف robots.txt
```txt
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

### 4. إضافة ملف sitemap.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2025-11-04</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

## 📱 التكامل مع خدمات خارجية

### Google Analytics
```html
<!-- أضف في <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Facebook Pixel
```html
<!-- أضف في <head> -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
```

### Google Maps
استبدل `.map-placeholder` بخريطة حقيقية:
```html
<iframe 
  src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE"
  width="100%" 
  height="500" 
  style="border:0;" 
  allowfullscreen="" 
  loading="lazy">
</iframe>
```

## 🔒 الأمان

### 1. HTTPS
تأكد من تفعيل SSL Certificate على الاستضافة

### 2. حماية البيانات
إذا كنت تستخدم Backend:
```javascript
// تفعيل CORS
app.use(cors({
    origin: 'https://yourdomain.com'
}));

// حماية من XSS
app.use(helmet());

// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use('/api/', limiter);
```

## 📊 إعداد إدارة العملاء المحتملين

### خيار 1: Google Sheets
استخدم Google Apps Script لإرسال البيانات إلى Google Sheets

### خيار 2: Email Notifications
```javascript
// باستخدام SendGrid أو Nodemailer
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-password'
    }
});

app.post('/api/leads', (req, res) => {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'sales@bariq.com',
        subject: 'عميل جديد محتمل',
        html: `
            <h2>عميل جديد</h2>
            <p><strong>الاسم:</strong> ${req.body.name}</p>
            <p><strong>الهاتف:</strong> ${req.body.phone}</p>
            ...
        `
    };

    transporter.sendMail(mailOptions);
    res.json({ success: true });
});
```

### خيار 3: CRM Integration
تكامل مع أنظمة CRM مثل:
- HubSpot
- Salesforce
- Zoho CRM

## ✅ قائمة التحقق النهائية

قبل النشر:
- [ ] اختبار على Chrome, Safari, Firefox
- [ ] اختبار على أجهزة الهاتف
- [ ] اختبار النموذج والتأكد من عمله
- [ ] التأكد من سرعة تحميل الموقع
- [ ] مراجعة المحتوى والأسعار
- [ ] إضافة Favicon
- [ ] إضافة Meta Tags للسيو
- [ ] اختبار روابط WhatsApp والهاتف
- [ ] التأكد من ظهور الصور بشكل صحيح
- [ ] اختبار على سرعات انترنت مختلفة

## 📈 بعد النشر

1. **مراقبة الأداء**: استخدم Google Analytics
2. **تتبع التحويلات**: راقب معدل ملء النماذج
3. **تحسين SEO**: راجع الكلمات المفتاحية
4. **A/B Testing**: جرب عناوين وتصاميم مختلفة
5. **جمع الملاحظات**: استمع لآراء المستخدمين

## 🆘 الدعم الفني

في حالة وجود مشاكل:
1. تحقق من console في المتصفح (F12)
2. تأكد من وجود جميع الملفات
3. تحقق من مسارات الصور
4. راجع ملف README.md

---

**نصيحة**: ابدأ بنشر تجريبي أولاً على Netlify أو Vercel للتأكد من عمل كل شيء بشكل صحيح قبل النشر على الاستضافة الرئيسية.

