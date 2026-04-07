import streamlit as st
from openai import OpenAI

st.set_page_config(page_title="AI 内容生成器", page_icon="✨", layout="centered")
st.title("✨ AI 内容生成器")

client = OpenAI(
    api_key=st.secrets["DEEPSEEK_API_KEY"],
    base_url="https://api.deepseek.com",
)

# ── 通用参数 ──────────────────────────────────────────────
st.subheader("通用参数")
col1, col2, col3, col4 = st.columns(4)

with col1:
    language = st.selectbox("语言", ["中文", "英文", "日语"])

with col2:
    style = st.selectbox("形式", [
        "适合社交媒体",
        "轻松幽默",
        "严肃文章",
        "故事叙述",
        "问答互动",
    ])

with col3:
    length = st.selectbox("长度", ["短（50字内）", "中（100-200字）", "长（300字以上）"])

with col4:
    count = st.number_input("生成数量", min_value=1, max_value=10, value=5, step=1)

st.divider()

# ── 生成函数 ──────────────────────────────────────────────
def generate(topic_type: str):
    lang_map = {"中文": "Chinese", "英文": "English", "日语": "Japanese"}
    length_map = {
        "短（50字内）": "very short (within 50 characters)",
        "中（100-200字）": "medium length (100-200 characters)",
        "长（300字以上）": "long (300+ characters)",
    }

    if topic_type == "parenting":
        topic_desc = "parenting tips, child development advice, or family bonding activities"
    else:
        topic_desc = "psychology facts, mental health tips, or emotional wellness advice suitable for social media"

    prompt = (
        f"Generate exactly {int(count)} unique pieces of content about {topic_desc}. "
        f"Language: {lang_map[language]}. "
        f"Style: {style}. "
        f"Each piece should be {length_map[length]}. "
        f"Number each item starting from 1. "
        f"Do not add any extra explanation outside the numbered list."
    )

    with st.spinner("生成中，请稍候..."):
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[{"role": "user", "content": prompt}],
        )
    return response.choices[0].message.content

# ── 两个按钮 ──────────────────────────────────────────────
col_a, col_b = st.columns(2)

with col_a:
    if st.button("👶 育儿内容", use_container_width=True, type="primary"):
        result = generate("parenting")
        st.session_state["result"] = result
        st.session_state["result_title"] = "👶 育儿内容"

with col_b:
    if st.button("🧠 心理学小知识", use_container_width=True, type="primary"):
        result = generate("psychology")
        st.session_state["result"] = result
        st.session_state["result_title"] = "🧠 心理学小知识"

# ── 显示结果 ──────────────────────────────────────────────
if "result" in st.session_state:
    st.divider()
    st.subheader(st.session_state["result_title"])
    st.markdown(st.session_state["result"])

    st.download_button(
        label="📋 下载内容",
        data=st.session_state["result"],
        file_name="generated_content.txt",
        mime="text/plain",
    )
