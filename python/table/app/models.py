from sqlalchemy import Column, Integer, String, ForeignKey, Numeric, DateTime, Enum as SQLAlchemyEnum, UniqueConstraint, event
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declared_attr
from datetime import datetime
import enum
from .database import Base

class TenantMixin:
    @declared_attr
    def tenant_id(cls):
        return Column(String(50), nullable=False)

    @classmethod
    def __declare_last__(cls):
        # Skip if not a tenant-aware entity
        if not hasattr(cls, "tenant_id"):
            return

        # Add event listeners for insert and update
        @event.listens_for(cls, "before_insert")
        def before_insert(mapper, connection, target):
            from .context.tenant import get_current_tenant_id
            if target.tenant_id is None:
                target.tenant_id = get_current_tenant_id()
            assert target.tenant_id is not None, "tenant_id cannot be None"

        @event.listens_for(cls, "before_update")
        def before_update(mapper, connection, target):
            from .context.tenant import get_current_tenant_id
            if target.tenant_id != get_current_tenant_id():
                raise ValueError("Cannot change tenant_id")

class OrderStatus(str, enum.Enum):
    PENDING = "PENDING"
    PROCESSING = "PROCESSING"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"

class User(Base, TenantMixin):
    __tablename__ = "users"
    __table_args__ = (
        UniqueConstraint('tenant_id', 'email', name='uq_user_tenant_email'),
    )

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), nullable=False)
    email = Column(String(120), nullable=False)
    password = Column(String(128), nullable=False)
    
    orders = relationship("Order", back_populates="user")

class Product(Base, TenantMixin):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(String(500))
    price = Column(Numeric(10, 2), nullable=False)
    
    order_items = relationship("OrderItem", back_populates="product")

class Order(Base, TenantMixin):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    order_date = Column(DateTime, nullable=False, default=datetime.utcnow)
    total_amount = Column(Numeric(10, 2), nullable=False)
    status = Column(SQLAlchemyEnum(OrderStatus), nullable=False, default=OrderStatus.PENDING)
    
    user = relationship("User", back_populates="orders")
    order_items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")

class OrderItem(Base, TenantMixin):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    quantity = Column(Integer, nullable=False)
    price = Column(Numeric(10, 2), nullable=False)
    
    order = relationship("Order", back_populates="order_items")
    product = relationship("Product", back_populates="order_items")