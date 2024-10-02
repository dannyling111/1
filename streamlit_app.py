import streamlit as st

# Title of the app
st.title("Simple Streamlit App for Testing")

# Input: Text input for the user’s name
name = st.text_input("Enter your name:", "Type here...")

api_key = st.secrets["api_keys"]["my_api_key"]
st.write(api_key)

# Input: Slider to select a number
number = st.slider("Select a number:", 1, 100, 50)

# Button to submit
if st.button("Submit"):
    # Output: Display the name and the selected number
    st.write(f"Hello, {name}! You selected the number {number}.")
else:
    st.write("Waiting for your input...")

# Display some additional test output
st.write("This is a simple Streamlit app for testing basic functionality.")
