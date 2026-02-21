from fastapi import FastAPI 
from pydantic import BaseModel, Field
from agent import SearchAgent
import json

app = FastAPI(title="Outfit Recommendation App")

body_type_categories = ['Rectangle', 'Inverted Triangle', 'Pear', 'Hourglass', 'Straight', 'Triangle', 'Apple', 'Petite', 'Plus Size', 'Tall']
Occassion_categories = ['Casual', 'Formal', 'Party', 'Workwear', 'Evening Wear', 'Athletic', 'Date Night', 'Buiseness Casual', 'Vacation', 'Wedding']
weather_categories = ['Hot', 'Cold', 'Rainy', 'Snowy', 'Windy', 'Humid', 'Dry', 'Mild', 'Extreme Heat', 'Extreme Cold']
style_categories = ['Bohemian', 'Classic', 'Edgy', 'Preppy', 'Romantic', 'Sporty', 'Trendy', 'Vintage', 'Minimalist', 'Glamorous']
categories = {
    "body_type": body_type_categories,
    "occasion": Occassion_categories,
    "weather": weather_categories,
    "style": style_categories
}

class RecommendationRequest(BaseModel): 
    body_type: str = Field(..., description="Body Type of the person")
    occasion: str = Field(..., description="Occasion for the outfit")
    weather: str = Field(..., description="Weather conditions")
    style: str = Field(..., description="Style preference")

def category_validation(request:RecommendationRequest, categories: dict): 

    if request.body_type not in categories["body_type"]:
        return {"error": f"Invalid body type. Please choose from: {categories['body_type']}"}
    
    if request.occasion not in categories["occasion"]:
        return {"error": f"Invalid occasion. Please choose from: {categories['occasion']}"}
        return {"error": f"Invalid occasion. Please choose from: {Occassion_categories}"}
    
    if request.weather not in categories["weather"]:
        return {"error": f"Invalid weather. Please choose from: {categories['weather']}"}
    
    if request.style not in categories["style"]:
        return {"error": f"Invalid style. Please choose from: {categories['style']}"}

@app.get('/')
def home(): 
    return {"Message":"Welcome to the App"}

@app.post('/recommend')
def recommend(request:RecommendationRequest):

    category_validation(request, categories)
    
    try: 
        agent = SearchAgent()
        response = agent.run(request.Product_Description)
        return json.loads(json.loads(response))
    except Exception as e: 
        return {"error": str(e)}
