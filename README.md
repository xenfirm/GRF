# 🐓 GRF Growths

A premium, modern, and high-performance React web application built for **GRF Growths** — a dedicated rooster farm based in **Tirupattur District, Tamil Nadu**. Designed to showcase pure breed roosters, highlight farming values, and directly connect customers via WhatsApp and Phone.

---

## ✨ Features

- **🌐 Bilingual Support (English / Tamil)** — Full localization system allowing instant language switching across all pages via a navigation toggle.
- **📱 Mobile-First Responsive Design** — Built with Tailwind CSS for a flawless experience on all screen sizes.
- **💬 WhatsApp Contact Form** — The contact form collects Name, Phone, and Requirement, then pre-fills a WhatsApp message and opens it in a new tab — no backend required.
- **📞 Floating Action Buttons** — Persistent Phone & WhatsApp buttons fixed to the bottom-right corner across the entire site for instant customer reach.
- **🔍 Dynamic Product Filtering** — The Roosters page features live search and breed filtering with client-side performance.
- **🗺 Google Maps Integration** — The Contact page embeds a live map pointing to the exact farm location with a direct Google Maps directions link.
- **📸 Local Asset Gallery** — Gallery page powered entirely by local farm photos (no external URLs), with category-based filtering.
- **🎨 Premium UI / UX** — Curated color palette (deep maroon/crimson brand tones) with smooth micro-animations, drop shadows, and glassmorphism accents.

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| [React 18](https://react.dev/) | Frontend Framework |
| [TypeScript](https://www.typescriptlang.org/) | Type Safety |
| [Vite](https://vitejs.dev/) | Build Tool & Dev Server |
| [Tailwind CSS v3](https://tailwindcss.com/) | Utility-first Styling |
| [React Router DOM v6](https://reactrouter.com/) | Client-side SPA Routing |
| [Lucide React](https://lucide.dev/) | SVG Icon Library |

---

## 📂 Project Structure

```text
GRF/
├── public/                   # Static assets (favicons, etc.)
├── src/
│   ├── assets/               # Local images and logo (rooster.png, grf-growths.jpeg, etc.)
│   ├── components/           # Reusable UI components
│   │   ├── Navbar.tsx        # Top navigation bar with language toggle
│   │   ├── Footer.tsx        # Footer with social links & contact info
│   │   ├── RoosterCard.tsx   # Product card for rooster listings
│   │   ├── CTASection.tsx    # Call-to-action banner component
│   │   ├── WhatsAppFloat.tsx # Floating WhatsApp button
│   │   └── PhoneFloat.tsx    # Floating Phone call button
│   ├── context/
│   │   └── LanguageContext.tsx  # React Context for EN/TA language state
│   ├── pages/
│   │   ├── Home.tsx          # Landing page with hero, about preview & testimonials
│   │   ├── Roosters.tsx      # Product listing with search & breed filter
│   │   ├── About.tsx         # Farm story, values, and commitment section
│   │   ├── Gallery.tsx       # Photo gallery with category tabs
│   │   └── Contact.tsx       # Contact form (WhatsApp redirect) + Google Maps
│   ├── App.tsx               # Root layout: Navbar, Routes, Footer, Float buttons
│   ├── constants.ts          # ⭐ Single source of truth for all business data
│   ├── translations.ts       # EN → TA translation dictionary
│   ├── index.css             # Global styles & Tailwind component classes
│   └── main.tsx              # React entry point
├── netlify.toml              # Netlify SPA fallback config
├── vercel.json               # Vercel SPA fallback config
├── tailwind.config.js        # Tailwind theme tokens & custom colors
└── vite.config.ts            # Vite build configuration
```

---

## 🚀 Getting Started

### Prerequisites
Ensure [Node.js](https://nodejs.org/) v16+ is installed.

### Installation & Development

```bash
# 1. Navigate to the project directory
cd GRF

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be live at `http://localhost:5173`.

### Production Build

```bash
npm run build
```

Output is placed in the `dist/` directory.

---

## ⚙️ Customization & Maintenance

### 📌 Updating Business Info (Phone, Address, Socials)
All business data is centralized in **`src/constants.ts`**. Edit there and changes propagate everywhere:

```typescript
export const PHONE = '+91 99529 08818';
export const EMAIL = 'grf.entrepreneur@gmail.com';
export const ADDRESS = 'No.81, Mankanoor, Puthagaram, Tamil Nadu 635602';
export const LOCATION = 'Tirupattur district, Tamil Nadu';
export const FACEBOOK_LINK = 'https://www.facebook.com/share/1ChfWmbqgN/';
export const INSTAGRAM_LINK = 'https://www.instagram.com/guru_rooster/';
export const MAPS_LINK = 'https://maps.app.goo.gl/gRkaQ4JexHB9AtSr6';
```

### 🐓 Adding a New Rooster
Open `src/constants.ts` and add to the `ROOSTER_BREEDS` array:

```typescript
{
  id: 7,
  name: 'Breed Name',
  nameTa: 'இன பெயர்',
  breed: 'Category',
  age: 'X – Y Months',
  price: 'Affordable Prices',
  badge: 'Available',       // or 'Popular', 'Premium'
  badgeColor: 'bg-primary', // or 'bg-amber-500', 'bg-purple-600'
  description: 'Short description.',
  image: imgVariable,       // import at the top of constants.ts
}
```

### 🌐 Adding a Translation
Add new English text keys to `src/translations.ts`:

```typescript
'Your English Text': { ta: 'உங்கள் தமிழ் உரை' },
```

### 🖼 Adding Gallery Images
1. Drop your image into `src/assets/`
2. Import it in `src/constants.ts`
3. Add an entry to the `GALLERY_IMAGES` array:

```typescript
{ id: 18, src: myNewImg, alt: 'Description', category: 'Roosters' }
```

Categories available: `Roosters`, `Farm`, `Chicks`, `Farm Life`, `Facilities`

---

## 🌍 Deployment

The project is pre-configured as a Single Page Application (SPA). All traffic is routed through `index.html`.

| Platform | How to Deploy |
|---|---|
| **Vercel** | Run `npx vercel` — reads `vercel.json` automatically |
| **Netlify** | Drag & drop `dist/` folder or link GitHub repo — reads `netlify.toml` |
| **GitHub Pages** | Deploy `dist/` via GitHub Actions with SPA fallback enabled |

---

## 🏢 Credits

- **Developed by**: [XenFirm Technologies](https://xenfirm.com)
- **Client**: GRF Growths, Tirupattur District, Tamil Nadu

---

## 📄 License
© 2026 GRF Growths. All Rights Reserved.
