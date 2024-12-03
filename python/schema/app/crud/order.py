from sqlalchemy.orm import Session
from decimal import Decimal
from .. import models, schemas
from . import user as user_crud
from . import product as product_crud
from fastapi import HTTPException

def get_orders(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Order).offset(skip).limit(limit).all()

def get_order(db: Session, order_id: int):
    return db.query(models.Order).filter(models.Order.id == order_id).first()

def get_user_orders(db: Session, user_id: int):
    return db.query(models.Order).filter(models.Order.user_id == user_id).all()

def create_order(db: Session, user_id: int, order: schemas.OrderCreate):
    user = user_crud.get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db_order = models.Order(
        user_id=user_id,
        status=models.OrderStatus.PENDING,
        total_amount=Decimal('0')
    )
    
    total_amount = Decimal('0')
    
    for item in order.order_items:
        product = product_crud.get_product(db, item.product_id)
        if not product:
            raise HTTPException(status_code=404, detail=f"Product {item.product_id} not found")
            
        order_item = models.OrderItem(
            product=product,
            quantity=item.quantity,
            price=product.price
        )
        db_order.order_items.append(order_item)
        total_amount += product.price * Decimal(str(item.quantity))
    
    db_order.total_amount = total_amount
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

def update_order_status(db: Session, order_id: int, status: schemas.OrderUpdate):
    db_order = get_order(db, order_id)
    if not db_order:
        return None
        
    db_order.status = status.status
    db.commit()
    db.refresh(db_order)
    return db_order