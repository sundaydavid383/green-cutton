# model/suit_model.py

from pymongo import MongoClient
from dotenv import load_dotenv
import os
import math

# load enviroment variables from .rnv file
load_dotenv()

# Connect to MongoDB usin URI from .env
client = MongoClient(os.getenv("MONGO_URI"))
db = client[os.getenv("DB_NAME")]
products_collection = db["products"]

# --------------------------
# 🧠 Core ML Function: KNN
# --------------------------

def calculate_distance(user, suit):
    """
    Compute the Euclidean distance between user's body and a suit's measurement.
    This tells us how similar they are.
    """
    fields = ["chest", "waist", "hip", "sleeveLength", "length"]

    # Only compare fields that both user and suit have
    total = 0
    for field in fields:
        if field in user and field in suit:
            diff = user[field] - suit[field]
            total += diff ** 2
    return math.sqrt(total)

def find_best_suits(user_measurements, k=3):
    """
    Finds the best K suits that match the user's measurements.
    """
    suits = list(products_collection.find()) # Fetch all suits from MongoDB
   
    # Each suit will be compared using distance
    suit_distances = []
    for suit in suits:
        distance = calculate_distance(user_measurements, suit["measurements"])
        suit_distances.append({
            "suit": {
                "name": suit["name"],
                "price": suit["price"],
                "currency": suit["currency"],
                "image": suit.get("image"),
                "measurements": suit["measurements"]
            },
            "distance": distance
        })

    # Sort by how close the suit is to the user's measurements (smallest distance first)
    suit_distances.sort(key=lambda x:x["distance"])

    # Retrun top K matches
    return suit_distances


