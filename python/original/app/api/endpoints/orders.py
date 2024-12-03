from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ... import crud, schemas
from ...database import get_db

router = APIRouter()

@router.get("", response_model=List[schemas.OrderResponse])
def read_orders(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    orders = crud.order.get_orders(db, skip=skip, limit=limit)
    return orders

@router.get("/{order_id}", response_model=schemas.OrderResponse)
def read_order(order_id: int, db: Session = Depends(get_db)):
    db_order = crud.order.get_order(db, order_id)
    if db_order is None:
        raise HTTPException(status_code=404, detail="Order not found")
    return db_order

@router.get("/user/{user_id}", response_model=List[schemas.OrderSimpleResponse])
def read_user_orders(user_id: int, db: Session = Depends(get_db)):
    orders = crud.order.get_user_orders(db, user_id)
    return orders

@router.post("/user/{user_id}", response_model=schemas.OrderResponse)
def create_order(
    user_id: int, 
    order: schemas.OrderCreate, 
    db: Session = Depends(get_db)
):
    return crud.order.create_order(db=db, user_id=user_id, order=order)

@router.put("/{order_id}/status", response_model=schemas.OrderResponse)
def update_order_status(
    order_id: int, 
    status: schemas.OrderUpdate, 
    db: Session = Depends(get_db)
):
    db_order = crud.order.update_order_status(db, order_id, status)
    if db_order is None:
        raise HTTPException(status_code=404, detail="Order not found")
    return db_order