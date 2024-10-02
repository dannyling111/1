import time
import pandas as pd
from fastapi_poe.types import ProtocolMessage
from fastapi_poe.client import get_bot_response
import json
import asyncio
from datetime import datetime
import requests
from PIL import Image
import os
import re
import streamlit as st
from requests.exceptions import MissingSchema

# Load the API key from Streamlit secrets
api_key = st.secrets["api_keys"]["my_api_key"]

# Select bot model from available options
image_bots = ["StableDiffusionXL", "DALL-E-3"]
bot_models = ["GPT-3.5-Turbo", "GPT-4", "Claude-3-Opus"] + image_bots

# Streamlit title and description
st.title("AI Bot and Image Generator")
st.write("Enter a prompt and select a bot model to generate text or images.")

# Text input for user prompt
input_prompt = st.text_input("Enter your prompt", value="Tell me a good intro about Japan")

# Dropdown for selecting bot model
selected_model = st.selectbox("Choose a bot model", bot_models)

# Placeholder for displaying the response or image
response_placeholder = st.empty()

# Button to generate the response
if st.button("Generate Response"):
    # Show a loading spinner while the response is being fetched
    with st.spinner("Generating response..."):
        
        async def fetch_response():
            message = ProtocolMessage(role="user", content=input_prompt)
            reply = ""

            if selected_model in image_bots:
                # Handling image generation using the image bot
                async for partial in get_bot_response(messages=[message], bot_name=selected_model, api_key=api_key):
                    response = json.loads(partial.raw_response["text"])
                    reply += response["text"]
                return reply, True  # Returning True indicates it's an image bot
            else:
                # Handling text generation for regular models like GPT
                async for partial in get_bot_response(messages=[message], bot_name=selected_model, api_key=api_key):
                    response = json.loads(partial.raw_response["text"])
                    reply += response["text"]
                return reply, False  # Returning False indicates it's not an image bot

        # Running the async function and getting the response
        bot_response, is_image = asyncio.run(fetch_response())

        if is_image:
            # If the response is an image, attempt to display the image
            image_url = bot_response.split("(")[-1].split(")")[0]  # Assuming image URL extraction
            try:
                image_data = requests.get(image_url).content
                # Save and display the image
                image_path = f"generated_image_{datetime.now().strftime('%Y%m%d_%H%M%S')}.jpg"
                with open(image_path, "wb") as f:
                    f.write(image_data)

                # Display the image using Streamlit
                st.image(image_data, caption="Generated Image", use_column_width=True)
            except MissingSchema:
                st.error(f"Invalid image URL: {image_url}")
            except Exception as e:
                st.error(f"Failed to load image: {str(e)}")
        else:
            # If it's a text response, display it
            st.success("Response:")
            st.write(bot_response)

