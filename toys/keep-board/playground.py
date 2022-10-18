from dotenv import load_dotenv

from keep_board_back.cases import ListNotes

if __name__ == '__main__':
    load_dotenv()
    ListNotes('daily')()