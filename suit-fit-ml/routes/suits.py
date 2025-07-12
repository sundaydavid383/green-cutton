from flask import Blueprint, request, jsonify
from db import products_collection
from model.suit_model import find_best_suits   # Import ML logic 

suits_bp = Blueprint("suits", __name__)

@suits_bp.route("/api/suits", methods=["POST"])
def add_suit():
    data = request.json
    if not data:
        return jsonify({"error":"No data sent"}), 400
    
    # Ensure data is always a list (support both single and multiple)
    if isinstance(data, dict):
        data = [data]
    
    required_fields = ["name", "price", "measurements"]
    for i, suit in enumerate(data):
        for field in required_fields:
            if field not in suit:
                return jsonify({"error":f"MIssing '{field}' in item {i + 1}"}), 400
    
    result = products_collection.insert_many(data)
    inserted_ids = [str(_id) for _id in result.inserted_ids]
    return jsonify({"message":"Suit added successfully", "inserted_ids": inserted_ids}), 201



# ---------------------------
# 🔍 POST /api/suit-match
# ---------------------------

@suits_bp.route("/api/suit-match", methods=["POST"])
def match_suit():
    data = request.json

    if not data or "bodyMeasurements" not in data:
        return jsonify({"error": "Missing 'bodyMeasurements' in request"}), 400
    
    user_measurements = data["bodyMeasurements"]

    # Call the ml Model to get best matches
    try:
        matches = find_best_suits(user_measurements, k=3)

        # Only return suit info (not raw distance unless you want to show it)
        matched_suits = [
            {
            "name": match["suit"]["name"],
            "price": match["suit"]["price"],
            "currency": match["suit"]["currency"],
            "image": match["suit"]["image"],
            "measurements": match["suit"]["measurements"],
            "distance": round(match["suit"]["distance"],2)
        }
        for match in matches
        ]
        return jsonify({"matches": matched_suits}), 200
    
    except Exception as e:
        return jsonify({"error": f"this is the error that ocurred {str(e)}"}), 500


