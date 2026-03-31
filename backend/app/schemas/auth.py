from pydantic import BaseModel


class OTPRequest(BaseModel):
    phone: str


class OTPVerify(BaseModel):
    phone: str
    code: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserResponse(BaseModel):
    id: int
    phone: str
    name: str | None
    email: str | None
    role: str
    language: str
    loyalty_points: int

    class Config:
        from_attributes = True
