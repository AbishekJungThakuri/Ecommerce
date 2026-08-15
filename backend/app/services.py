import hashlib
import hmac
import uuid
from typing import Optional

import cloudinary
import cloudinary.uploader
import httpx

from app.config import get_settings

settings = get_settings()


def configure_cloudinary():
    if settings.cloudinary_configured:
        cloudinary.config(
            cloud_name=settings.cloudinary_cloud_name,
            api_key=settings.cloudinary_api_key,
            api_secret=settings.cloudinary_api_secret,
            secure=True,
        )


def upload_image(file_bytes: bytes, folder: str = "brocade/products") -> dict:
    configure_cloudinary()
    if not settings.cloudinary_configured:
        raise ValueError("Cloudinary is not configured. Set CLOUDINARY_* env variables.")

    result = cloudinary.uploader.upload(
        file_bytes,
        folder=folder,
        resource_type="image",
    )
    return {"url": result.get("secure_url"), "public_id": result.get("public_id")}


def delete_image(public_id: str) -> None:
    configure_cloudinary()
    if settings.cloudinary_configured and public_id:
        cloudinary.uploader.destroy(public_id)


async def initiate_khalti_payment(
    amount: float,
    order_number: str,
    customer_info: dict,
) -> dict:
    if not settings.khalti_secret_key:
        # Sandbox mock for development
        return {
            "payment_url": f"{settings.frontend_url}/payment/khalti/mock?order={order_number}",
            "pidx": f"mock-{uuid.uuid4().hex[:12]}",
        }

    payload = {
        "return_url": f"{settings.frontend_url}/payment/khalti/callback",
        "website_url": settings.frontend_url,
        "amount": int(amount * 100),
        "purchase_order_id": order_number,
        "purchase_order_name": f"Order {order_number}",
        "customer_info": customer_info,
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://khalti.com/api/v2/epayment/initiate/",
            json=payload,
            headers={
                "Authorization": f"Key {settings.khalti_secret_key}",
                "Content-Type": "application/json",
            },
            timeout=30.0,
        )
        response.raise_for_status()
        data = response.json()
        return {"payment_url": data["payment_url"], "pidx": data["pidx"]}


async def verify_khalti_payment(pidx: str) -> dict:
    if pidx.startswith("mock-"):
        return {"status": "Completed", "transaction_id": pidx}

    if not settings.khalti_secret_key:
        return {"status": "Completed", "transaction_id": pidx}

    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://khalti.com/api/v2/epayment/lookup/",
            json={"pidx": pidx},
            headers={
                "Authorization": f"Key {settings.khalti_secret_key}",
                "Content-Type": "application/json",
            },
            timeout=30.0,
        )
        response.raise_for_status()
        return response.json()


def generate_esewa_signature(
    total_amount: str,
    transaction_uuid: str,
    product_code: str,
) -> str:
    message = f"total_amount={total_amount},transaction_uuid={transaction_uuid},product_code={product_code}"
    secret = settings.esewa_secret_key.encode("utf-8")
    digest = hmac.new(secret, message.encode("utf-8"), hashlib.sha256).digest()
    import base64

    return base64.b64encode(digest).decode("utf-8")


def initiate_esewa_payment(amount: float, order_number: str) -> dict:
    transaction_uuid = f"{order_number}-{uuid.uuid4().hex[:8]}"
    total_amount = f"{amount:.2f}"
    product_code = settings.esewa_merchant_code
    tax_amount = "0"
    product_service_charge = "0"
    product_delivery_charge = "0"

    signature = generate_esewa_signature(total_amount, transaction_uuid, product_code)

    return {
        "amount": total_amount,
        "tax_amount": tax_amount,
        "total_amount": total_amount,
        "transaction_uuid": transaction_uuid,
        "product_code": product_code,
        "product_service_charge": product_service_charge,
        "product_delivery_charge": product_delivery_charge,
        "success_url": f"{settings.frontend_url}/payment/esewa/success",
        "failure_url": f"{settings.frontend_url}/payment/esewa/failure",
        "signed_field_names": "total_amount,transaction_uuid,product_code",
        "signature": signature,
        "payment_url": settings.esewa_payment_url,
    }


async def verify_esewa_payment(
    product_code: str,
    total_amount: str,
    transaction_uuid: str,
) -> dict:
    if transaction_uuid.startswith("mock-"):
        return {"status": "COMPLETE", "transaction_uuid": transaction_uuid}

    url = (
        f"{settings.esewa_verify_url}"
        f"?product_code={product_code}"
        f"&total_amount={total_amount}"
        f"&transaction_uuid={transaction_uuid}"
    )

    async with httpx.AsyncClient() as client:
        response = await client.get(url, timeout=30.0)
        if response.status_code == 200:
            return response.json()
        return {"status": "NOT_FOUND"}


def generate_order_number() -> str:
    return f"BRD-{uuid.uuid4().hex[:8].upper()}"
