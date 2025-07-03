from langchain.tools import tool
import httpx

@tool
def login(username: str, password: str) -> str:
    response = httpx.post(
        "http://your-java-backend/login",
        json={"username": username, "password": password}
    )
    return response.json().get("token", "Failed")

@tool
def create_supplier(name: str, country: str, token: str) -> str:
    response = httpx.post(
        "http://your-java-backend/supplier",
        headers={"Authorization": f"Bearer {token}"},
        json={"name": name, "country": country}
    )
    return response.text

@tool
def create_sim_product(name: str, type_: str, token: str) -> str:
    response = httpx.post(
        "http://your-java-backend/sim-product",
        headers={"Authorization": f"Bearer {token}"},
        json={"name": name, "type": type_}
    )
    return response.text

@tool
def order_sim(quantity: int, product_id: str, token: str) -> str:
    response = httpx.post(
        "http://your-java-backend/sim-order",
        headers={"Authorization": f"Bearer {token}"},
        json={"quantity": quantity, "product_id": product_id}
    )
    return response.text