from fastapi import FastAPI, WebSocket, Depends, HTTPException
from backend.whisper_service import transcribe_audio
from backend.tools import login, create_supplier, create_sim_product, order_sim
from langchain.chat_models import ChatOpenAI
from langchain.agents import initialize_agent, Tool
from fastapi_login import LoginManager

SECRET = "super-secret"
manager = LoginManager(SECRET, token_url="/auth/login")

app = FastAPI()

users_db = {"admin": {"name": "Admin", "password": "password"}}

@manager.user_loader
def load_user(username: str):
    return users_db.get(username)

@app.post("/auth/login")
def auth_login(data: dict):
    username = data.get("username")
    password = data.get("password")
    user = load_user(username)
    if not user or user["password"] != password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = manager.create_access_token(data={"sub": username})
    return {"access_token": token}

llm = ChatOpenAI(temperature=0, model="gpt-4o")

tools = [
    Tool(name="Login", func=login, description="Login to get JWT"),
    Tool(name="Create Supplier", func=create_supplier, description="Create supplier"),
    Tool(name="Create SIM Product", func=create_sim_product, description="Create SIM product"),
    Tool(name="Order SIM", func=order_sim, description="Order SIM cards"),
]

agent = initialize_agent(
    tools,
    llm,
    agent_type="zero-shot-react-description",
    verbose=True
)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_bytes()
        text = transcribe_audio(data)
        response = agent.run(text)
        await websocket.send_text(response)