from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List, Optional
import json
import os

app = FastAPI(title="Raja's Collection API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class Product(BaseModel):
    id: int
    name: str
    description: str
    price: float
    category: str
    image: str
    sizes: List[str]
    colors: List[str]
    inStock: bool

class ContactMessage(BaseModel):
    name: str
    email: str
    message: str

# Sample product data
PRODUCTS = [
    {
        "id": 1,
        "name": "Premium Cotton Kurta",
        "description": "Elegant handcrafted cotton kurta with intricate embroidery",
        "price": 2499.00,
        "category": "men",
        "image": "https://s.alicdn.com/@sc04/kf/A6f2f93f1a303404992a4a090fbd6457bw/2025-Premium-Soft-Cotton-M-4XL-Size-Kurta-with-Beautiful-Foil-Printed-Design-and-Plain-White-Bottom-for-Men-Boys-for-Parties.jpg",
        "sizes": ["S", "M", "L", "XL", "XXL"],
        "colors": ["White", "Cream", "Blue"],
        "inStock": True
    },
    {
        "id": 2,
        "name": "Designer Lehenga Set",
        "description": "Royal designer lehenga with heavy work and dupatta",
        "price": 8999.00,
        "category": "women",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpDHhd_aryujavrfYgeR8UeNG2I76AjNzF1Q&s",
        "sizes": ["S", "M", "L", "XL"],
        "colors": ["Red", "Pink", "Maroon", "Gold"],
        "inStock": True
    },
    {
        "id": 3,
        "name": "Silk Saree Collection",
        "description": "Pure silk saree with traditional border and pallu",
        "price": 5499.00,
        "category": "women",
        "image": "https://khanboutique.pk/cdn/shop/files/WhatsAppImage2024-04-17at3.56.01PM.jpg?v=1713351601",
        "sizes": ["Free Size"],
        "colors": ["Green", "Purple", "Orange", "Red"],
        "inStock": True
    },
    {
        "id": 4,
        "name": "Sherwani Set",
        "description": "Luxurious sherwani with dupatta and churidar",
        "price": 12999.00,
        "category": "men",
        "image": "https://wearzones.com/cdn/shop/files/Untitled_design_7_c8f73232-5470-4b20-8d41-e8aad055e35a.png?v=1751516582",
        "sizes": ["S", "M", "L", "XL", "XXL"],
        "colors": ["Ivory", "Gold", "Maroon"],
        "inStock": True
    },
    {
        "id": 5,
        "name": "Anarkali Suit",
        "description": "Beautiful anarkali suit with embroidered work",
        "price": 3999.00,
        "category": "women",
        "image": "https://i.pinimg.com/236x/fc/fc/bf/fcfcbf530f6dd0df3b9e90005a0c8971.jpg",
        "sizes": ["S", "M", "L", "XL"],
        "colors": ["Pink", "Blue", "Green"],
        "inStock": True
    },
    {
        "id": 6,
        "name": "Pathani Suit",
        "description": "Comfortable pathani suit for daily wear",
        "price": 1899.00,
        "category": "men",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeQHgC0mWyffPDRX9_k9J4bacr35_JVvU0Ug&s",
        "sizes": ["S", "M", "L", "XL", "XXL"],
        "colors": ["White", "Black", "Grey"],
        "inStock": True
    },
    {
        "id": 7,
        "name": "Palazzo Suit Set",
        "description": "Trendy palazzo suit with dupatta",
        "price": 2799.00,
        "category": "women",
        "image": "https://clothsvilla.com/cdn/shop/files/red-tabby-organza-work-suit-set-with-plazo-dupatta_10_500x500.jpg?v=1750400314",
        "sizes": ["S", "M", "L", "XL"],
        "colors": ["Yellow", "Pink", "Mint"],
        "inStock": True
    },
    {
        "id": 8,
        "name": "Nehru Jacket",
        "description": "Stylish nehru jacket with button detailing",
        "price": 3499.00,
        "category": "men",
        "image": "https://cdn.shopify.com/s/files/1/0862/9350/files/IvyGreenVelvetNehruJacket_df5cf9ad-1ad5-410e-9b2c-d61a354ee755_480x480.jpg?v=1638199838",
        "sizes": ["S", "M", "L", "XL", "XXL"],
        "colors": ["Navy", "Black", "Wine"],
        "inStock": True
    }
]

# Routes
@app.get("/")
def read_root():
    return {"message": "Welcome to Raja's Collection API"}

@app.get("/api/products", response_model=List[Product])
def get_products(category: Optional[str] = None):
    if category:
        filtered = [p for p in PRODUCTS if p["category"] == category]
        return filtered
    return PRODUCTS

@app.get("/api/products/{product_id}", response_model=Product)
def get_product(product_id: int):
    product = next((p for p in PRODUCTS if p["id"] == product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@app.get("/api/categories")
def get_categories():
    return {
        "categories": [
            {"id": "men", "name": "Men's Collection"},
            {"id": "women", "name": "Women's Collection"},
            {"id": "all", "name": "All Products"}
        ]
    }

@app.post("/api/contact")
def submit_contact(message: ContactMessage):
    # In production, save to database or send email
    print(f"Contact message from {message.name}: {message.message}")
    return {"status": "success", "message": "Thank you for contacting us!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)