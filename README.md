# Modshine Interior - Premium Modular Furniture & Interior Design Web Application

A full-stack, dynamic website and administration system designed for **Modshine Interior** (Pasuvandhanai Road, Kovilpatti, Tamil Nadu), built strictly according to the official company portfolio presentation.

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
│   ├── .env                  # Port (5000) & MongoDB URI
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
│   │   │   ├── AdminDashboard.jsx    # Full CRUD Admin panel
│   │   │   ├── ConsultationModal.jsx # Quick booking popup
│   │   │   └── Footer.jsx            # Address, phone & guarantees
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

### 1. Backend Server (Port 5000)
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

1. **Admin Portal**:
   - Click the **"Admin Portal"** button in the top navigation bar.
   - **Products Management**: Add, edit, or delete modular furniture items with custom board types, hardware brands, prices, and images. Changes reflect instantly on the landing page!
   - **Leads & Inquiries**: View all consultations submitted through the customer landing page form. Update statuses (`New`, `Contacted`, `In-Progress`, `Completed`) with a single click.
   - **Showroom Settings**: Edit phone numbers (`+91 99944 12345` / `082208 05159`), address, announcement banner, and hours.
   - **Reset Defaults**: Instantly restore the original 12 curated designs from the PDF presentation.

2. **Interactive Cost Estimator**:
   - Clients can choose their project scope (Kitchen, Wardrobe, TV Unit, 2BHK, 3BHK), board type (Action TESA HDHMR Boilo, Greenply Marine Ply), hardware tier (German Hettich, Ebco), and calculate their budget in real-time.

3. **Authentic Imagery**:
   - Uses real photos extracted from the client's PDF presentation — not generic placeholder images.
