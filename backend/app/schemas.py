from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field

from app.models import OrderStatus, PaymentMethod, PaymentStatus, UserRole


# Auth
class UserRegister(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)
    full_name: str = Field(min_length=2)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    role: UserRole
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


# Category
class CategoryBase(BaseModel):
    name: str
    image_url: Optional[str] = None


class CategoryCreate(CategoryBase):
    pass


class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    image_url: Optional[str] = None


class CategoryResponse(CategoryBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


# Product
class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float = Field(gt=0)
    category_id: int
    front_img_url: str
    back_img_url: Optional[str] = None
    stock: int = Field(ge=0, default=100)
    is_active: bool = True


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = Field(default=None, gt=0)
    category_id: Optional[int] = None
    front_img_url: Optional[str] = None
    back_img_url: Optional[str] = None
    stock: Optional[int] = Field(default=None, ge=0)
    is_active: Optional[bool] = None


class ProductResponse(ProductBase):
    id: int
    created_at: datetime
    updated_at: datetime
    category: Optional[CategoryResponse] = None

    class Config:
        from_attributes = True


# Order
class OrderItemCreate(BaseModel):
    product_id: int
    size: str
    quantity: int = Field(ge=1)


class OrderCreate(BaseModel):
    customer_name: str
    customer_email: EmailStr
    customer_phone: str
    shipping_address: str
    city: str
    state: str
    payment_method: PaymentMethod
    items: list[OrderItemCreate]
    notes: Optional[str] = None


class OrderItemResponse(BaseModel):
    id: int
    product_id: Optional[int]
    product_name: str
    product_image: Optional[str]
    size: str
    quantity: int
    unit_price: float
    total_price: float

    class Config:
        from_attributes = True


class OrderResponse(BaseModel):
    id: int
    order_number: str
    customer_name: str
    customer_email: str
    customer_phone: str
    shipping_address: str
    city: str
    state: str
    subtotal: float
    shipping_cost: float
    total: float
    status: OrderStatus
    payment_method: PaymentMethod
    payment_status: PaymentStatus
    payment_reference: Optional[str]
    notes: Optional[str]
    created_at: datetime
    updated_at: datetime
    items: list[OrderItemResponse] = []

    class Config:
        from_attributes = True


class OrderStatusUpdate(BaseModel):
    status: OrderStatus
    notes: Optional[str] = None


class DashboardStats(BaseModel):
    total_products: int
    total_orders: int
    total_revenue: float
    pending_orders: int
    recent_orders: list[OrderResponse]


# Payment
class KhaltiInitiateRequest(BaseModel):
    order_id: int


class KhaltiInitiateResponse(BaseModel):
    payment_url: str
    pidx: str


class EsewaInitiateRequest(BaseModel):
    order_id: int


class EsewaInitiateResponse(BaseModel):
    amount: str
    tax_amount: str
    total_amount: str
    transaction_uuid: str
    product_code: str
    product_service_charge: str
    product_delivery_charge: str
    success_url: str
    failure_url: str
    signed_field_names: str
    signature: str
    payment_url: str


class PaymentVerifyRequest(BaseModel):
    order_id: int
    pidx: Optional[str] = None
    transaction_uuid: Optional[str] = None
    product_code: Optional[str] = None
    total_amount: Optional[str] = None
