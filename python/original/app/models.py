from sqlalchemy import Column, Integer, String, ForeignKey, Numeric, DateTime, Enum as SQLAlchemyEnum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from .database import Base

class OrderStatus(str, enum.Enum):
    PENDING = "PENDING"
    PROCESSING = "PROCESSING"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    password = Column(String(128), nullable=False)
    
    orders = relationship("Order", back_populates="user")

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(String(500))
    price = Column(Numeric(10, 2), nullable=False)
    
    order_items = relationship("OrderItem", back_populates="product")

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    order_date = Column(DateTime, nullable=False, default=datetime.utcnow)
    total_amount = Column(Numeric(10, 2), nullable=False)
    status = Column(SQLAlchemyEnum(OrderStatus), nullable=False, default=OrderStatus.PENDING)
    
    user = relationship("User", back_populates="orders")
    order_items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")

class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    quantity = Column(Integer, nullable=False)
    price = Column(Numeric(10, 2), nullable=False)
    
    order = relationship("Order", back_populates="order_items")
    product = relationship("Product", back_populates="order_items")