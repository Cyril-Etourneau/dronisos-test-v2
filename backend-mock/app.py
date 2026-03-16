from flask import Flask, jsonify
from flask_cors import CORS
import os
import random

DEFAULT_DRONES_COUNT = 500
FAMILIES = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
FAMILY_INNER_ROWS = 3
FAMILY_INNER_COLS = FAMILY_INNER_ROWS
FAMILY_SLOTS = FAMILY_INNER_COLS * FAMILY_INNER_ROWS
FAMILY_COLS = 10
FAMILY_INNER_SPACING = 0.5
FAMILY_SPACING = 1.0 + FAMILY_INNER_SPACING * (FAMILY_INNER_ROWS - 1)
ERROR_STATUSES = [
    'LOST_LINK',
    'BAD_CONFIG',
    'MOTOR_KO',
    'LOW_BATTERY'
]

app = Flask(__name__)
CORS(app)


def get_drones_count():
    try:
        return int(os.environ.get('DRONES_COUNT', DEFAULT_DRONES_COUNT))
    except:
        return DEFAULT_DRONES_COUNT


def get_family_name(family_index):
    base = len(FAMILIES)
    if family_index == 0:
        return FAMILIES[0]

    letters = []
    while family_index:
        letters.append(FAMILIES[family_index % base])
        family_index = family_index // base

    letters.reverse()

    return ''.join(letters)


def get_family_origin(family_index):
    family_column = family_index % FAMILY_COLS
    family_row = family_index // FAMILY_COLS

    return [family_column * FAMILY_SPACING, family_row * FAMILY_SPACING, 0]


def get_position(family_index, family_slot):
    family_origin = get_family_origin(family_index)
    imprecision = [random.uniform(-0.15, 0.15), random.uniform(-0.15, 0.15), random.uniform(-0.15, 0.15)]

    return [
        imprecision[0] + family_origin[0] + (family_slot % FAMILY_INNER_ROWS) * FAMILY_INNER_SPACING,
        imprecision[1] + family_origin[1] + (family_slot // FAMILY_INNER_ROWS) * FAMILY_INNER_SPACING,
        imprecision[2] + family_origin[2]
    ]


def get_name(family_index, family_slot):
    return get_family_name(family_index) + str(family_slot % FAMILY_INNER_ROWS) + str(family_slot // FAMILY_INNER_ROWS)


def generate_status():
    r = random.random()

    if r < 0.9:
        return 'OK'

    return ERROR_STATUSES[random.randrange(0, len(ERROR_STATUSES))]


def get_drones():
    count = get_drones_count()
    drones = []

    for i in range(count):
        family_index = i // FAMILY_SLOTS
        family_slot = i % FAMILY_SLOTS

        drones.append({
            'position': get_position(family_index, family_slot),
            'name': get_name(family_index, family_slot),
            'status': generate_status()
        })

    return drones


@app.route("/")
def list_drones():
    return jsonify(get_drones())
