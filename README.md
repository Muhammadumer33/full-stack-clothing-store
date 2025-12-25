# Raja's Collection - Full Stack E-commerce Website

A complete clothing brand website built with FastAPI (Backend) and Next.js (Frontend).

## 🚀 Quick Start Guide

### Prerequisites
- Python 3.8+
- Node.js 18+
- npm or yarn

---

## 📁 Project Setup

### Step 1: Create Project Structure

```bash
# Create main project folder
mkdir rajas-collection
cd rajas-collection
```

---

## 🔧 Backend Setup (FastAPI)

### Step 2: Setup Backend

```bash
# Create backend directory
mkdir backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install fastapi uvicorn python-multipart pillow

# Create main.py file and paste the backend code
touch main.py
```

**Copy the FastAPI backend code** from the artifact "FastAPI Backend - main.py" into `backend/main.py`

### Step 3: Run Backend

```bash
# Make sure you're in the backend directory with venv activated
python main.py

# OR using uvicorn directly:
uvicorn main:app --reload
```

Backend will run on: **http://localhost:8000**

---

## 💻 Frontend Setup (Next.js)

### Step 4: Create Next.js App

```bash
# Go back to project root
cd ..

# Create Next.js app
npx create-next-app@latest frontend
```

**When prompted, select:**
- ✅ TypeScript: **Yes**
- ✅ ESLint: **Yes**
- ✅ Tailwind CSS: **Yes**
- ✅ src/ directory: **No**
- ✅ App Router: **Yes**
- ✅ Import alias: **No** (or keep default @/*)

### Step 5: Install Frontend Dependencies

```bash
cd frontend
npm install axios lucide-react
```

### File Structure



```
frontend/
├── app/
│   ├── layout.tsx          
│   ├── page.tsx            
│   ├── globals.css        
│   ├── products/
│   │   └── page.tsx        
│   ├── about/
│   │   └── page.tsx        
│   └── contact/
│       └── page.tsx        
├── components/
│   ├── Navbar.tsx          
│   ├── Hero.tsx            
│   ├── ProductCard.tsx     
│   └── Footer.tsx         
└── next.config.js         
```

**Copy the code** from each artifact into the corresponding file:

1. **app/layout.tsx** - Copy from "Next.js Layout" artifact
2. **app/globals.css** - Copy from "Global Styles" artifact
3. **app/page.tsx** - Copy from "Home Page" artifact
4. **app/products/page.tsx** - Copy from "Products Page" artifact
5. **app/about/page.tsx** - Copy from "About Page" artifact
6. **app/contact/page.tsx** - Copy from "Contact Page" artifact
7. **components/Navbar.tsx** - Copy from "Navbar Component" artifact
8. **components/Hero.tsx** - Copy from "Hero Component" artifact
9. **components/ProductCard.tsx** - Copy from "ProductCard Component" artifact
10. **components/Footer.tsx** - Copy from "Footer Component" artifact
11. **next.config.js** - Copy from "Next.js Config" artifact

### Step 7: Run Frontend

```bash
# Make sure you're in the frontend directory
npm run dev
```

Frontend will run on: **http://localhost:3000**

---

## 🎯 Running the Complete Application

### Terminal 1 - Backend:
```bash
cd rajas-collection/backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
python main.py
```

### Terminal 2 - Frontend:
```bash
cd rajas-collection/frontend
npm run dev
```

Now open your browser and visit: **http://localhost:3000**

---

## 📱 Features

✅ **Home Page** - Hero section, featured products, category cards  
✅ **Products Page** - Complete product catalog with filtering  
✅ **About Page** - Company story, values, and mission  
✅ **Contact Page** - Contact form and information  
✅ **Responsive Design** - Mobile, tablet, and desktop friendly  
✅ **Modern UI** - Tailwind CSS with beautiful gradients and animations  
✅ **REST API** - FastAPI backend with product management  

---

## 🎨 Customization

### Adding More Products
Edit `backend/main.py` and add products to the `PRODUCTS` array:

```python
{
    "id": 9,
    "name": "Your Product Name",
    "description": "Product description",
    "price": 1999.00,
    "category": "men",  # or "women"
    "image": "https://images.unsplash.com/photo-xxx",
    "sizes": ["S", "M", "L", "XL"],
    "colors": ["Color1", "Color2"],
    "inStock": True
}
```

### Changing Colors
Edit `frontend/app/globals.css` and modify the color variables or Tailwind classes throughout the components.

---

## 📝 API Endpoints

- `GET /` - API welcome message
- `GET /api/products` - Get all products
- `GET /api/products?category=men` - Get products by category
- `GET /api/products/{id}` - Get single product
- `GET /api/categories` - Get all categories
- `POST /api/contact` - Submit contact form

---

## 🛠️ Tech Stack

**Backend:**
- FastAPI - Modern Python web framework
- Uvicorn - ASGI server
- Pydantic - Data validation

**Frontend:**
- Next.js 14 - React framework
- TypeScript - Type safety
- Tailwind CSS - Styling
- Axios - HTTP client
- Lucide React - Icons

---

## 🐛 Troubleshooting

**Backend not starting?**
- Make sure virtual environment is activated
- Check if port 8000 is available
- Install dependencies: `pip install fastapi uvicorn`

**Frontend errors?**
- Delete `node_modules` and `.next` folders
- Run `npm install` again
- Make sure backend is running on port 8000

**Images not loading?**
- Check `next.config.js` has the correct configuration
- Images use Unsplash URLs (requires internet)

**CORS errors?**
- Make sure backend CORS settings allow `http://localhost:3000`

---

## 📦 Production Deployment

### Backend (FastAPI)
```bash
pip install gunicorn
gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Frontend (Next.js)
```bash
npm run build
npm start
```

Or deploy to Vercel (recommended for Next.js):
```bash
vercel deploy
```

---

## 📄 License

This project is open source and available for educational purposes.

---

## 🤝 Support

For issues or questions, please contact:
- Email: umar.rajj616@gmail.com
- Phone: +92 340 8852252

---

**Happy Coding! 🚀**
