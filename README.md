# 🐓 Guru Rooster Farm

A premium, modern, and high-performance React web application built for **Guru Rooster Farm**. Designed to showcase pure breed roosters, highlight farming values, and directly connect customers with the farm via WhatsApp.

![Guru Rooster Farm Banner](https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=1200&h=400&fit=crop&q=80)

## ✨ Features

- **🌐 Bilingual Support (English / Tamil)**: A robust, state-based localization system allowing users to instantly switch the entire website's language via a clean navigation toggle.
- **📱 Mobile-First Responsive Design**: Carefully crafted with Tailwind CSS to ensure a flawless experience across all devices, from small smartphones to large desktop monitors.
- **💬 WhatsApp Integration**: Instant lead generation! All "Contact" and "Enquiry" buttons are deeply integrated with the WhatsApp API, pre-filling customized messages for specific roosters or general queries.
- **🔍 Dynamic Product Filtering**: The "Roosters" page features instant, client-side filtering by breed, age, and a dynamic search bar for seamless product discovery.
- **🎨 Premium UI / UX**: Employs a stunning, rural-agriculture color palette (Emerald Greens, Soft Creams) with soft shadows, glassmorphism effects, and smooth micro-animations.

## 🛠 Tech Stack

- **Frontend Framework**: [React 18](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) for strict type safety
- **Build Tool**: [Vite](https://vitejs.dev/) for lightning-fast HMR and optimized builds
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) for utility-first styling
- **Routing**: [React Router DOM v6](https://reactrouter.com/) for SPA navigation
- **Icons**: [Lucide React](https://lucide.dev/) for clean, scalable SVG icons

## 📂 Project Structure

```text
├── public/                 # Static assets (Favicons, etc.)
├── src/
│   ├── components/         # Reusable UI components (Navbar, Footer, CTASection, RoosterCard)
│   ├── context/            # React Context providers (LanguageContext.tsx)
│   ├── pages/              # Application views (Home, Roosters, About, Gallery, Contact)
│   ├── App.tsx             # Main application layout and routing
│   ├── constants.ts        # Global constants, configuration, and data arrays
│   ├── index.css           # Global Tailwind styles and custom CSS components
│   ├── main.tsx            # React entry point
│   └── translations.ts     # Dictionary mapping English keys to Tamil translations
├── netlify.toml            # Netlify deployment configuration (SPA fallback)
├── vercel.json             # Vercel deployment configuration (SPA fallback)
├── tailwind.config.js      # Tailwind CSS configuration and theme tokens
└── vite.config.ts          # Vite build configuration
```

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v16 or higher).

### Installation

1. **Clone the repository** (if using Git) or download the project folder.
2. **Navigate to the project directory**:
   ```bash
   cd GRF
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```

### Running the Development Server
Start the Vite development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### Building for Production
To generate a production-ready optimized build:
```bash
npm run build
```
The compiled files will be output to the `dist` directory.

## ⚙️ Customization & Maintenance

### Adding or Updating Roosters
To add a new rooster to the inventory, open `src/constants.ts` and locate the `ROOSTER_BREEDS` array. Add a new object following this structure:
```javascript
{
  id: 'unique-id',
  name: 'Breed Name',
  breed: 'Breed Category',
  age: 'X Months',
  price: '₹X,XXX',
  image: 'https://link-to-image.jpg',
  badge: 'Available', // Optional: 'Popular', 'Premium'
  description: 'A short description of the rooster.'
}
```

### Updating Translations
If you add new text to the website, ensure it supports the Tamil toggle by adding it to `src/translations.ts`:
```typescript
'Your English Text Here': { ta: 'உங்கள் தமிழ் உரை இங்கே' },
```

### Updating Contact Information
To change the phone number, email, or physical address across the entire site, simply update the variables at the top of `src/constants.ts`.

## 🌍 Deployment

This project is configured as a Single Page Application (SPA). When deploying, all traffic must be routed to `index.html`. 

We have pre-configured files for smooth deployment:
- **Vercel**: Just run `npx vercel` in the terminal, and it will read `vercel.json`.
- **Netlify**: Drag and drop the `dist` folder to Netlify, or link your GitHub repo. It will read `netlify.toml`.
- **GitHub Pages**: Ensure you set up an action to deploy the `dist` folder and configure SPA fallback scripts.

## 📄 License
© 2026 Guru Rooster Farm. All Rights Reserved.
