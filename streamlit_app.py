# -- coding:utf-8 --

import asyncio
import json
import streamlit as st
from fastapi_poe.types import ProtocolMessage
from fastapi_poe.client import get_bot_response

# Load API key securely from Streamlit secrets
api_key = st.secrets["api_keys"]["my_api_key"]

# Streamlit title and description
st.title("Interactive Bot Response Generator")
st.write("Enter your prompt and select a bot model to get responses.")

# Text input for the user's prompt
input_prompt = st.text_input("Enter your prompt", value="Tell a good intro about Japan")

# Dropdown to select the bot model
model = st.selectbox(
    "Choose a bot model",
    ["GPT-3.5-Turbo", "GPT-4", "Claude-3-Opus", "Claude-Instant-100k", "Claude-2-100k", "ChatGPT-16k", "GPT-4-32k"]
)

# Button to trigger the response generation
if st.button("Generate Response"):
    # Show a loading indicator while fetching the response
    with st.spinner("Fetching response..."):
        # Define an async function to get the bot response
        async def main():
            message = ProtocolMessage(role="user", content=input_prompt)
            reply = ""  # Define a variable to store the concatenated text

            # Use async for inside the async function to get partial responses
            async for partial in get_bot_response(messages=[message], bot_name=model, api_key=api_key):
                response = json.loads(partial.raw_response["text"])  # Parse the raw response
                reply += response["text"]  # Concatenate the text with the reply variable

            return reply

        # Run the async function using asyncio
        bot_response = asyncio.run(main())

        # Display the final response in the Streamlit app
        st.success("Bot response:")
        st.write(bot_response)
