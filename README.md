# Modshine Interior - Premium Modular Furniture & Interior Design Web Application

A full-stack, dynamic website and administration system designed for **Modshine Interior** (Headquartered in Pasuvandhanai Road, Kovilpatti, serving homeowners across all 38 districts of Tamil Nadu), built strictly according to the official company portfolio presentation.

---

## 🌟 Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Bootstrap utilities, Lucide Icons.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose) with dual-engine persistent storage (runs flawlessly whether MongoDB daemon is online or offline).
- **Design Aesthetic**: Bespoke luxury architectural layout — Deep Emerald Green (`#0e2d24`), Champagne Gold accents (`#c49f64`), Warm Ivory & Beige, and authentic portfolio photography extracted directly from the client presentation.

---

## 📁 Project Structure

```
d:/ModShine/
├── backend/                  # Node.js + Express API Server
│   ├── data/
│   │   ├── seedData.js       # Real furniture designs, materials & Kovilpatti info
│   │   ├── storage.js        # Persistent dual-storage engine
│   │   └── db.json           # Live JSON database
│   ├── models/               # Mongoose schemas (Product, Inquiry, Category, Setting)
│   ├── public/assets/        # High-res interior imagery & cropped renders
│   ├── .env                  # Secrets (not committed) — see .env.example
│   ├── auth.js               # Admin login + token verification
│   ├── package.json
│   └── server.js             # Express REST API endpoints
│
├── frontend/                 # React 18 + Vite Web App
│   ├── public/assets/        # Real client presentation images
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx            # Luxury header & Admin switch
│   │   │   ├── HeroSection.jsx       # Dark emerald hero with real PDF living room
│   │   │   ├── AboutSection.jsx      # Story from PDF Page 2 & metrics
│   │   │   ├── ServicesSection.jsx   # 4 core services from PDF Page 3
│   │   │   ├── DesignPhilosophy.jsx  # 3 Pillars from PDF Page 4
│   │   │   ├── CategoryCatalog.jsx   # Dynamic furniture catalog + modal
│   │   │   ├── MaterialBrandSection.jsx # Action TESA, Greenply, Hettich, Ebco
│   │   │   ├── ProcessSection.jsx    # 6-Step roadmap from PDF Page 5
│   │   │   ├── CostEstimator.jsx     # Interactive live budget calculator
│   │   │   ├── ContactSection.jsx    # Live lead capture & Kovilpatti showroom
│   │   │   ├── ConsultationModal.jsx # Quick booking popup
│   │   │   └── Footer.jsx            # Address, phone & guarantees
│   │   ├── admin/                # Admin Studio (login, content editor, designs, leads)
│   │   ├── data/siteContent.js   # All website content defaults + merge logic
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
└── Brown Minimalist Interior Design Portfolio Present_261024_164643.pdf # Source presentation
```

---

## 🚀 Running the Project

### 🌐 Live Production Deployment
- **Backend API (Render)**: `https://modshine-j90i.onrender.com`
- **API Health Check**: `https://modshine-j90i.onrender.com/api/health`
- **Admin Studio**: `<your-site>/admin` (login required)

### 1. Backend Server (Local Port 5000)
```bash
cd backend
npm run dev
```
- API Base URL: `http://localhost:5000`
- Health Check: `http://localhost:5000/api/health`

### 2. Frontend Application (Port 3000)
```bash
cd frontend
npm run dev
```
- Open in browser: `http://localhost:3000`

---

## ⚡ Dynamic Features

1. **Admin Studio** (`/admin`, username + password login):
   - **Every website section is editable** — Hero, About, Services, Design Philosophy, Catalog texts, Materials & Brands, Process, Testimonials, Estimator, Contact & Forms, Footer and company details. Lists can be added to, edited, duplicated, re-ordered and deleted. Click **Save changes** to publish.
   - **Designs & Categories**: add / edit / delete portfolio items; changes go live immediately.
   - **Enquiries**: view leads, change status, call / WhatsApp, export CSV, delete.
   - **Images** are uploaded to **Cloudinary** only (files or pasted links are copied into Cloudinary). Images that are no longer used anywhere are removed from Cloudinary automatically.

   **Server environment variables** (local: `backend/.env`, production: Render → Environment) — see `backend/.env.example`:
   `MONGODB_URI`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `AUTH_SECRET`.
   In MongoDB Atlas → Network Access, allow the Render server (or `0.0.0.0/0`) so the live API uses the database instead of temporary local storage.

2. **Interactive Cost Estimator**:
   - Clients can choose their project scope (Kitchen, Wardrobe, TV Unit, 2BHK, 3BHK), board type (Action TESA HDHMR Boilo, Greenply Marine Ply), hardware tier (German Hettich, Ebco), and calculate their budget in real-time.

3. **Authentic Imagery**:
   - Uses real photos extracted from the client's PDF presentation — not generic placeholder images.
