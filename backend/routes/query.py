import os
from dotenv import load_dotenv
from flask import jsonify, Blueprint, request
import win32com.client as win32
from pathlib import Path
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import NLTKTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_core.messages import SystemMessage
from langchain_core.prompts import ChatPromptTemplate, HumanMessagePromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

load_dotenv()

import pythoncom

def load_documents(file_path):
    # Initialize COM
    pythoncom.CoInitialize()
    
    # Initialize the Excel application
    excel = win32.Dispatch("Excel.Application")
    
    workbook = excel.Workbooks.Open(file_path)
    
    # Access the first worksheet
    worksheet = workbook.Worksheets[0]
    
    output_file_path = Path(file_path).with_suffix('.pdf').as_posix()
    
    # Export the worksheet as a PDF
    worksheet.ExportAsFixedFormat(0, output_file_path)
    workbook.Close(False)
    
    excel.Quit()
    
    return output_file_path


query_bp = Blueprint("query", __name__)

@query_bp.route("/ask_query", methods=["POST"])
def get_user_query():
    API_KEY = os.getenv('GEMINI_API_KEY')
    chat_model = ChatGoogleGenerativeAI(google_api_key=API_KEY, model="gemini-1.5-pro-latest")
    
    request_data = request.get_json()
    # file_path = request_data.get('file_path')
    # file_path = "C:\Users\Nancy Yadav\OneDrive\Desktop\DarkFLow\Bombay_OG_Aayush\backend\dataset\Historicalinvesttemp.xlsx"

    file_path = "C:\\Users\\Nancy Yadav\\OneDrive\\Desktop\\DarkFLow\\Bombay_OG_Aayush\\backend\\dataset\\Historicalinvesttemp.xlsx"

    if not file_path:
        return jsonify({"error": "file_path is required"}), 400
    
    if file_path.endswith('.xlsx'):
        file_path = load_documents(file_path)

    loader = PyPDFLoader(file_path)
    pages = loader.load_and_split()
    text_splitter = NLTKTextSplitter(chunk_size=500, chunk_overlap=100)
    chunks = text_splitter.split_documents(pages)

    embedding_model = GoogleGenerativeAIEmbeddings(google_api_key=API_KEY, model="models/embedding-001")
    db = Chroma.from_documents(chunks, embedding_model, persist_directory="./chroma_db_")
    db_connection = Chroma(persist_directory="./chroma_db_", embedding_function=embedding_model)

    # Converting CHROMA db_connection to Retriever Object
    retriever = db_connection.as_retriever(search_kwargs={"k": 5})

    chat_template = ChatPromptTemplate.from_messages([
        SystemMessage(content="""You are a Helpful AI Bot.
                    Given a context and question from user,
                    you should answer based on the given context."""),
        HumanMessagePromptTemplate.from_template("""Answer the question based on the given context.
        Context: {context}
        Question: {question}
        Answer: """)
    ])

    output_parser = StrOutputParser()

    rag_chain = (
        {"context": retriever | format_docs, "question": RunnablePassthrough()}
        | chat_template
        | chat_model
        | output_parser
    )

    user_question = request_data.get('question')
    if not user_question:
        return jsonify({"error": "question is required"}), 400

    response = rag_chain.invoke(user_question)

    return jsonify({"response": response})

def format_docs(docs):
    return "\n\n".join(doc['text'] for doc in docs)

