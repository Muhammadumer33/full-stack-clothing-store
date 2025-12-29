from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from main import ProductDB, Base
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Database configuration
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:rj123@localhost:5432/rajas_collection")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

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

def seed_database():
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    # Create session
    db = SessionLocal()
    
    try:
        # Check if products already exist
        existing_count = db.query(ProductDB).count()
        if existing_count > 0:
            print(f"Database already has {existing_count} products. Skipping seed.")
            return
        
        # Add products
        for product_data in PRODUCTS:
            product = ProductDB(**product_data)
            db.add(product)
        
        db.commit()
        print(f"Successfully seeded {len(PRODUCTS)} products!")
        
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()