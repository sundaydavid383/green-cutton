# app.py
from flask import Flask
from flask_cors import CORS
from routes.suits import suits_bp  # You’ll create this next

app = Flask(__name__)
CORS(app)

# Register your blueprint
app.register_blueprint(suits_bp)

if __name__ == "__main__":
    print("✅ Server is running on http://localhost:5100")
    app.run(debug=True, port=5100)