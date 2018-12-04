import os
import requests

from time import sleep

FILENAME = "uncommon_cube.txt"  # TODO: Parse CLI argument to get filename


def download_image(name, url, filename):
    """
    Save our downloaded image.
    From DeepSpace at https://stackoverflow.com/questions/30229231/python-save-image-from-url
    """
    print(f"Retrieving card {name}")
    response = requests.get(url)
    if not response.ok:
        print("ERROR: ")
        print(response)

    print(f"Downloading card {name}")
    with open(filename, "wb") as image:
        for block in response.iter_content(1024):
            if not block:
                break
            image.write(block)
    print("Download Successful")


def main():
    url_base = "https://api.scryfall.com/cards/named?exact={0}&set={1}&format=image&version=normal"
    image_path = os.path.join(
        os.path.dirname(os.path.realpath(__file__)), "card_images"
    )

    # Set up the directory if it doesn't exist
    if not os.path.exists(image_path):
        os.mkdir(image_path)

    with open(FILENAME) as file:
        lines = [line.strip().split("|") for line in file]

    card_list = [
        (
            name,
            url_base.format(name, set),
            os.path.join(image_path, f"{name.replace(' ', '-')}.jpg"),
        )
        for name, set in lines
    ]

    for card in card_list:
        if not os.path.isfile(card[2]):
            download_image(*card)
            sleep(0.2)


if __name__ == "__main__":
    main()
