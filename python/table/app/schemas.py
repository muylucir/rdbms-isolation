from pydantic import BaseModel, EmailStr, constr, condecimal, ConfigDict
from pydantic.alias_generators import to_camel
from typing import List, Optional
from datetime import datetime
from decimal import Decimal
from .models import OrderStatus

class UserBase(BaseModel):
    username: constr(min_length=3, max_length=50)
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    username: Optional[constr(min_length=3, max_length=50)] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True
    )

class User(UserBase):
    id: int

    class Config:
        from_attributes = True

class ProductBase(BaseModel):
    name: constr(min_length=3, max_length=100)
    description: Optional[constr(max_length=500)] = None
    price: condecimal(ge=0, max_digits=10, decimal_places=2)

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True
    )

class ProductCreate(ProductBase):
    pass

class ProductUpdate(ProductBase):
    pass

class Product(ProductBase):
    id: int

    class Config:
        from_attributes = True

class ProductSimple(BaseModel):
    id: int
    name: str
    price: Decimal

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True
    )

class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True
    )

class OrderItemResponse(BaseModel):
    id: int
    product: ProductSimple
    quantity: int
    price: Decimal

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True
    )

class OrderCreate(BaseModel):
    order_items: List[OrderItemCreate]

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True
    )

class OrderUpdate(BaseModel):
    status: OrderStatus

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True
    )

class OrderResponse(BaseModel):
    id: int
    user: User
    order_date: datetime
    total_amount: Decimal
    status: OrderStatus
    order_items: List[OrderItemResponse]

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True
    )

class OrderSimpleResponse(BaseModel):
    id: int
    order_date: datetime
    total_amount: Decimal
    status: OrderStatus

    class Config:
        from_attributes = True