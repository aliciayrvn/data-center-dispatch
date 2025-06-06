from fastapi.testclient import TestClient
from app.main import app
from hypothesis import given, strategies as st

client = TestClient(app)

@given(
    username=st.text(min_size=1, max_size=20),
    password=st.text(min_size=1, max_size=20)
)
def test_login_fuzz(username, password):
    response = client.post("/auth/login", data={"username": username, "password": password})
    # Только admin/1234 должен проходить, остальные — 401
    if username == "admin" and password == "1234":
        assert response.status_code == 200
        assert "access_token" in response.json()
    else:
        assert response.status_code == 401