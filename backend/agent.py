import requests, json, os
from dotenv import load_dotenv


load_dotenv(".env")

SYSTEM_PROMPT='''You are a Outfit recommendation engine for Clothes. 
Your goal is to find 20 Outfits which match user's outfit requirements, and then rank them. 
Among those 20, give the top 5 as response. 

Process: 
1. Take the outfit description. 
2. run a SEARCH_QUERY in the format "SEARCH_QUERY: <query>" for getting the outfit reccommendations from the web based on the user's description.
    example: if the user's body type is "Pear", occasion is "Party", weather is "Cold" and style is "Bohemian", then the SEARCH_QUERY should be : 
    SEARCH_QUERY: "Outfits for Pear body type, suitable for Party occasion, in Cold weather, with Bohemian style in pinterest" 
3. Once you have the search results, filter out the outfits which do not match the user's requirements.
4. Get the pictures of the outfits and make a list of 20 outfit pictures which best match the user's requirements. 
5. provide top 5 recommendations as objects in a class and provide me the class with all the objects as the output. 
'''

GROQ_BASE_URL = "https://api.groq.com/openai/v1"

class SearchAgent(): 

    def __init__(self): 
        self.llm_url = f"{GROQ_BASE_URL}/chat/completions"
        self.llm_key = os.getenv('GROQ_API_KEY')
        self.search_key = os.getenv('SERPER_API_KEY')
        self.search_url = "https://google.serper.dev/search" 

    def _llm_call(self, messages:list): 

        headers = {
            "Authorization" : f"Bearer {self.llm_key}", 
            "Content-Type":"application/json"
        }

        payload = {
            "model":"llama-3.3-70b-versatile", #tells which llm to use
            "messages": messages, #message is the data 
            "response_format":{"type":"json_object"} #forces llm to send a valid JSON 
        }

        resp = requests.post(self.llm_url, headers=headers, json=payload)

        return resp.json()['choices'][0]['message']['content']
    
    def _web_search(self, query): 

        headers = {
            'X-API-KEY':self.search_key, #API key for authentication 
            'Content-Type': 'application/json' #sending json data 
        }

        payload = { 'q' : query}

        resp = requests.post(self.search_url, headers=headers, json=payload)

        result = resp.json().get('organic', [])

        return result
    
    def run(self, user_input):

        messages = [
           { "role":"system", "content":SYSTEM_PROMPT }, 
           {"role": "user", "content":f"outfit_description: {user_input}. Do you need to perform a websearch? if yes, output only a SEARCH_QUERY"}
        ]

        first_response = self._llm_call(messages)

        if "SEARCH_QUERY" in first_response: 

            query = first_response.split("SEARCH_QUERY")[1].strip().replace('"', " ")
            search_data = self._web_search(query)

            messages.append({"role": "assistant", "content":first_response })
            messages.append({"role":"user", "content":f"Search results: {search_data}\nNow give the final JSON"})

            final_response = self._llm_call(messages)


            return (final_response)
        
        return (first_response)