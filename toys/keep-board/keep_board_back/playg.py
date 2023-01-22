from dotenv import load_dotenv

from src.api_cli import KeepCli

if __name__ == '__main__':
    load_dotenv()
    KeepCli.setup().notes('daily')