import yfinance as yf
import streamlit as st
import pandas as pd


st.write("""
# Simple Stock Price App

Shown are the stock **closing price** and ***volume*** of Google!

""")

tickerDf=pd.DataFrame()

tickerDf["Close"]=[1,2,4,5,6,7,8]
tickerDf["Volume"]=[12,22,24,25,46,27,38]
st.write("""
## Closing Price
""")
st.line_chart(tickerDf.Close)
st.write("""
## Volume Price
""")
st.line_chart(tickerDf.Volume)