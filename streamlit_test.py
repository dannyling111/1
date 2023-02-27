import streamlit as st

# Everything is accessible via the st.secrets dict:

st.write("stripe_key is:", st.secrets["stripe_key"])
st.write("endpoint_key is :", st.secrets["endpoint_key"])
st.write("My cool secrets:", st.secrets["my_cool_secrets"]["things_i_like"])
