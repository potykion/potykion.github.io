import os
import subprocess
from pathlib import Path
from typing import Union

import yaml
from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:63342",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/qa_jobs/{job_id}/run")
def run_qa_job(job_id: str):
    proj_path = Path(r'C:\Users\potyk\PycharmProjects\automation-gae')
    os.chdir(proj_path)

    pre_commit_path = proj_path / '.pre-commit-config.yaml'
    with open(pre_commit_path, 'r') as f:
        pre_commit_content = yaml.safe_load(f)

    jobs = pre_commit_content['repos'][0]['hooks']
    matching_job = next((job for job in jobs if job['id'] == job_id))

    subprocess.run(f'pre-commit run {job_id}')

    return jobs


@app.get('/qa_jobs')
def get_qa_jobs():
    proj_path = r'C:\Users\potyk\PycharmProjects\automation-gae'
    pre_commit_path = Path(proj_path) / '.pre-commit-config.yaml'
    with open(pre_commit_path, 'r') as f:
        pre_commit_content = yaml.safe_load(f)

    jobs = pre_commit_content['repos'][0]['hooks']

    return jobs
