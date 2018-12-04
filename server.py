import os
from random import sample
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS

from cubes import cubes

image_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), "card_images")


app = Flask(__name__)
CORS(app)

"""
@app.route("/load-cards/<cube>", methods=["GET"])
def load_cards(cube):
    filename = f"{cube}.txt"
    if not os.path.isfile(filename):
        return "Cube not found", 404

    return "Load Successful", 200
"""


@app.route("/get-pack/<cube>", methods=["GET"])
def get_pack(cube):
    try:
        response = sample(cubes[cube], 15)
        return jsonify(response), 200
    except KeyError:
        return "Cube not found", 404


@app.route("/get-image/<card>", methods=["GET"])
def get_image(card):
    return send_from_directory(image_path, f"{card}.jpg")


if __name__ == "__main__":
    app.run()
