
import openai
import streamlit as st

# Get API key

openai.organization = "org-ixe83K3WLxi5O4MhZwLa0ABR"
openai.api_key = "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"


st.set_page_config(page_title="Resume Generator", page_icon=":guardsman:", layout="wide")

def generate_resume(prompt):
    completions = openai.Completion.create(engine="text-davinci-002", prompt=prompt, max_tokens=1024)
    message = completions.choices[0].text
    return message.strip()

def main():
    st.title("Resume Generator")
    name = st.text_input("Name")
    email = st.text_input("Email")
    job_title = st.text_input("Job Title")
    job_description = st.text_area("Job Description")
    length = st.selectbox("Select Length", ["Short", "Medium", "Long"])
    tone = st.selectbox("Select Tone", ["Formal", "Informal"])
    if st.button("Generate Resume"):
        if length == "Short":
            prompt = (f"Write a short resume for {name} who is applying for the position of {job_title}. {job_description}")
        elif length == "Medium":
            prompt = (f"Write a medium resume for {name} who is applying for the position of {job_title}. {job_description}")
        else:
            prompt = (f"Write a long resume for {name} who is applying for the position of {job_title}. {job_description}")
        if tone == "Formal":
            prompt += " Use a formal tone."
        else:
            prompt += " Use an informal tone."
        resume = generate_resume(prompt)
        st.success("Resume Generated!")
        st.write(resume)
    if st.button("Download Resume"):
        st.write("Downloading...")
        st.file_downloader(resume, "resume.txt")
        st.write("Download Complete!")

if __name__== "__main__":
    main()
