from db import products_collection

sample_suits = [
    {
        "name": "Classic Navy Suit",
        "category": "ready-to-wear",
        "price": 250,
        "currency": "USD",
        "image": "https://images.unsplash.com/photo-1551727978-8f1efb2e9d96",
        "measurements": {
            "chest": 38,
            "waist": 32,
            "hip": 39,
            "sleeveLength": 24,
            "length": 42
        }
    },
    {
        "name": "Slim Fit Black Suit",
        "category": "ready-to-wear",
        "price": 280,
        "currency": "USD",
        "image": "https://images.unsplash.com/photo-1584467735871-45cd54f595e9",
        "measurements": {
            "chest": 36,
            "waist": 30,
            "hip": 37,
            "sleeveLength": 23,
            "length": 41
        }
    },
    {
        "name": "Formal Grey Suit",
        "category": "ready-to-wear",
        "price": 300,
        "currency": "USD",
        "image": "https://images.unsplash.com/photo-1602810311512-e4e4eb9fcb58",
        "measurements": {
            "chest": 40,
            "waist": 34,
            "hip": 41,
            "sleeveLength": 25,
            "length": 43
        }
    }
]

products_collection.insert_many(sample_suits)
print("✅ Sample suits inserted.")