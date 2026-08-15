from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    database_url: str = "postgresql://postgres:postgres@localhost:5432/brocade_ecommerce"
    secret_key: str = "dev-secret-key-change-in-production"
    access_token_expire_minutes: int = 1440
    algorithm: str = "HS256"

    cloudinary_cloud_name: str = ""
    cloudinary_api_key: str = ""
    cloudinary_api_secret: str = ""

    khalti_secret_key: str = ""
    khalti_public_key: str = ""

    esewa_merchant_code: str = "EPAYTEST"
    esewa_secret_key: str = "8gBm/:&EnhH.1/q"
    esewa_payment_url: str = "https://rc-epay.esewa.com.np/api/epay/main/v2/form"
    esewa_verify_url: str = "https://rc.esewa.com.np/api/epay/transaction/status/"

    frontend_url: str = "http://localhost:5173"
    cors_origins: str = "http://localhost:5173,http://127.0.0.1:5173"

    shipping_cost: float = 150.0

    class Config:
        env_file = ".env"
        case_sensitive = False

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]

    @property
    def cloudinary_configured(self) -> bool:
        return bool(self.cloudinary_cloud_name and self.cloudinary_api_key and self.cloudinary_api_secret)


@lru_cache
def get_settings() -> Settings:
    return Settings()
