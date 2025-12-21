import os
from pathlib import Path
import logging

logging.basicConfig(level=logging.INFO, format="[%(asctime)s] : %(message)s")

project_name = "AI_Chatbot_using_LLMs"

files_to_create = [
    ".env",
    ".env.example",
    "requirements.txt",
    "README.md",
    "setup.py",
    "main.py",
    "app.py",


    "api/__init__.py",
    "api/routes/__init__.py",
    "api/routes/chat_routes.py",

    f"src/{project_name}/__init__.py",

    f"src/{project_name}/core/__init__.py",
    f"src/{project_name}/core/model_loader.py",
    f"src/{project_name}/core/langgraph_builder.py",


    f"src/{project_name}/domains/__init__.py",
    f"src/{project_name}/domains/education_node.py",
    f"src/{project_name}/domains/legal_node.py",
    f"src/{project_name}/domains/medical_node.py",
    f"src/{project_name}/domains/sports_node.py",

    f"src/{project_name}/prompts/__init__.py",
    f"src/{project_name}/prompts/education_prompt.py",
    f"src/{project_name}/prompts/legal_prompt.py",
    f"src/{project_name}/prompts/medical_prompt.py",
    f"src/{project_name}/prompts/sports_prompt.py",

    f"src/{project_name}/utils/__init__.py",
    f"src/{project_name}/utils/state.py",
    f"src/{project_name}/utils/prompts.py",
    
    "research/trial.ipynb",
]

for filepath in files_to_create:
    filepath = Path(filepath)
    folder = filepath.parent

    if folder != Path(""):
        os.makedirs(folder, exist_ok=True)
        logging.info(f"Created folder: {folder}")

    if not filepath.exists():
        filepath.touch()
        logging.info(f"Created file: {filepath}")
    else:
        logging.info(f"File exists: {filepath}")
