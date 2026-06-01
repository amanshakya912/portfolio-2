# Pemba Sherpa — Nepal Tourist Guide Portfolio

A professional, animated portfolio website for a Nepal tourist guide specializing in Chinese-speaking travelers.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🖼️ Adding Your Photos

Place images in `/public/images/` with these exact names:

| File | Used For |
|------|----------|
| `guide-main.jpg` | About section — main portrait |
| `dest-1.jpg` | Everest Base Camp card |
| `dest-2.jpg` | Kathmandu Valley card |
| `dest-3.jpg` | Annapurna Circuit card |
| `dest-4.jpg` | Chitwan National Park card |
| `dest-5.jpg` | Lumbini card |
| `dest-6.jpg` | Pokhara card |
| `gallery-1.jpg` through `gallery-8.jpg` | Gallery section |

**Recommended size:** 1200×800px minimum, JPG or WebP format.

## ✏️ Editing Your Content

All static data is in `/app/data/portfolio.ts`. Edit:
- `guide` — name, bio, certifications, languages, contact
- `destinations` — tour destinations
- `experiences` — service types
- `testimonials` — client reviews
- `timeline` — career history

## 🎨 Features

- **Dark mountain aesthetic** — deep greens, gold accents
- **Animated hero** with mountain silhouettes, stars, and parallax
- **Scroll-triggered animations** on every section
- **Responsive** — mobile, tablet, desktop
- **Security headers** — XSS protection, framing, content-type sniffing
- **Bilingual** — English + Chinese (中文) + Nepali (नेपाली)
- **Interactive gallery** with image slot system
- **Testimonials carousel**
- **Contact form** with validation

## 🔧 Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Google Fonts (Playfair Display, Cormorant Garamond, DM Sans)

## 🌐 Deployment

```bash
npm run build
```

Deploy to Vercel, Netlify, or any Node.js host.
