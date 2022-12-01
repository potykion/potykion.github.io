import glob
import random
import webbrowser
from pathlib import Path

root = Path(__file__).resolve().parent.parent
pages_glob = str(root / 'docs/**/*.md')
pages = glob.glob(pages_glob, recursive=True)
pages = [
    page[len(str(root)) + len('\\docs\\'):].replace('\\', '/').replace('index.md', '').replace('.md', '')
    for page in pages
]
r_page = random.choice(pages)
print(r_page)

url = f'http://127.0.0.1:8001/{r_page}'
webbrowser.open_new_tab(url)
