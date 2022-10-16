import dotenv

from keep_board_back.api_cli import KeepCli


def main():
    dotenv.load_dotenv()
    daily = KeepCli().setup().notes(label='daily')
    notes_json = [note.to_json() for note in daily]
    s = 'as'


if __name__ == '__main__':
    main()
