

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean, ARRAY
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="Raja's Collection API")

# Database configuration
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:rj123@localhost:5432/rajas_collection")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database Model
class ProductDB(Base):
    __tablename__ = "products"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String)
    price = Column(Float, nullable=False)
    category = Column(String, nullable=False)
    image = Column(String)
    sizes = Column(ARRAY(String))
    colors = Column(ARRAY(String))
    inStock = Column(Boolean, default=True)

class OrderDB(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, nullable=False)
    cnic = Column(String)
    address = Column(String, nullable=False)
    
    product_id = Column(Integer, nullable=False)
    product_name = Column(String, nullable=False)
    quantity = Column(Integer, default=1)
    total_price = Column(Float, nullable=False)
    payment_method = Column(String, default="COD") # COD or Online
    status = Column(String, default="pending")

# Create tables
Base.metadata.create_all(bind=engine)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # Vite/React port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Models
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

    class Config:
        from_attributes = True

class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    category: str
    image: str
    sizes: List[str]
    colors: List[str]
    inStock: bool = True

class OrderCreate(BaseModel):
    customer_name: str
    phone: str
    email: str
    cnic: str
    address: str
    product_id: int
    product_name: str
    quantity: int
    total_price: float
    payment_method: str

class Order(OrderCreate):
    id: int
    status: str
    
    class Config:
        from_attributes = True

class ContactMessage(BaseModel):
    name: str
    email: str
    message: str

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Routes
@app.get("/")
def read_root():
    return {"message": "Welcome to Raja's Collection API"}

@app.get("/api/products", response_model=List[Product])
def get_products(category: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(ProductDB)
    if category and category != "all":
        query = query.filter(ProductDB.category == category)
    products = query.all()
    return products

@app.get("/api/products/{product_id}", response_model=Product)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(ProductDB).filter(ProductDB.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@app.post("/api/products", response_model=Product)
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    db_product = ProductDB(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@app.put("/api/products/{product_id}", response_model=Product)
def update_product(product_id: int, product: ProductCreate, db: Session = Depends(get_db)):
    db_product = db.query(ProductDB).filter(ProductDB.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    for key, value in product.dict().items():
        setattr(db_product, key, value)
    
    db.commit()
    db.refresh(db_product)
    return db_product

@app.delete("/api/products/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    db_product = db.query(ProductDB).filter(ProductDB.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    db.delete(db_product)
    db.commit()
    return {"status": "success", "message": "Product deleted"}

@app.post("/api/orders", response_model=Order)
def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    db_order = OrderDB(**order.dict())
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

@app.get("/api/orders", response_model=List[Order])
def get_orders(db: Session = Depends(get_db)):
    return db.query(OrderDB).all()

@app.delete("/api/orders/{order_id}")
def delete_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(OrderDB).filter(OrderDB.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    db.delete(order)
    db.commit()
    return {"status": "success", "message": "Order deleted"}

class OrderStatusUpdate(BaseModel):
    status: str

@app.put("/api/orders/{order_id}/status")
def update_order_status(order_id: int, status_update: OrderStatusUpdate, db: Session = Depends(get_db)):
    order = db.query(OrderDB).filter(OrderDB.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    order.status = status_update.status
    db.commit()
    db.refresh(order)
    return order

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