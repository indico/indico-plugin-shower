# This file is part of the Indico April Fools 2019 Plugin.
# Copyright (C) 2019 CERN
#
# This plugin is free software; you can redistribute it and/or
# modify it under the terms of the MIT License; see the LICENSE
# file for more details.

from __future__ import unicode_literals

import os
import random
import re

from indico.cli.core import cli_group
from indico.core.db import db
from indico.modules.rb import rb_settings
from indico.modules.rb.models.locations import Location
from indico.modules.rb.models.map_areas import MapArea
from indico.modules.rb.models.photos import Photo
from indico.modules.rb.models.rooms import Room
from indico.modules.users.models.users import User
from indico.util.console import cformat

ROOM_RE = re.compile(r'^(\d+)\/(\w)\-(\d+)$')

shower_names = [
    "5/R-104",
    "5/R-105",
    "25/R-103",
    "35/1-102",
    "101/R-103",
    "101/R-104",
    "104/S-101",
    "104/S-104",
    "112/R-101",
    "112/R-106",
    "162/S-103",
    "162/S-104",
    "272/S-102",
    "513/S-103",
    "513/S-105",
    "565/R-102",
    "565/R-105",
    "774/S-101",
    "774/S-104",
    "864/2-102",
    "865/R-103",
    "865/R-104",
    "892/1-103",
    "892/2-103",
    "904/R-103",
    "3196/R-101",
    "3196/R-103",
    "3594/1-101",
    "3594/1-102"
]

GEO_INFO = {
    '112': (46.23614754, 6.03988644025),
    '864': (46.2576187317, 6.061477305),
    '774': (46.25456716, 6.05617687),
    '3594': (46.30974077, 6.07673868),
    '865': (46.2569413019, 6.0604915727),
    '5': (46.23281919, 6.05504218),
    '3196': (46.23587499, 6.05567274),
    '892': (46.26053164, 6.05964647),
    '272': (46.23640731, 6.0388633),
    '513': (46.232541, 6.045702),
    '35': (46.23830353, 6.03592723),
    '104': (46.23371279, 6.05221444),
    '25': (46.2306719127, 6.0517924884)
}

MAP_AREAS = [
    ('Meyrin', 46.2256607105, 6.03003501892, 46.2434716325, 6.06329441071),
    ('Prevessin', 46.2501492379, 6.04110717773, 46.2679522118, 6.07436656952)
]


@cli_group(name='showers')
def cli():
    """Manage the Showers plugin."""


@cli.command()
def populate_db():
    """Populate DB with fun stuff"""

    # set tileserver URL
    rb_settings.set('tileserver_url', 'https://indico-maps.web.cern.ch/styles/cern/{z}/{x}/{y}.png')

    location = Location(name="CERN")
    owner = User.get(0)

    for area in MAP_AREAS:
        map_area = MapArea(
            name=area[0],
            top_left_latitude=area[1],
            top_left_longitude=area[2],
            bottom_right_latitude=area[3],
            bottom_right_longitude=area[4]
        )
        db.session.add(map_area)

    for name in shower_names:
        # split name in parts
        building, floor, number = ROOM_RE.match(name).groups()
        # random number of showers, since we don't have time
        # to figure out what it really is
        num_showers = random.choice([2, 4])
        file_name = './photos/{}.png'.format(name.replace('/', '_'))
        photo_data = None

        # Check if there's a photo in './photos/xxxx' and use it
        if os.path.exists(file_name):
            with open(file_name, 'r') as f:
                photo_data = f.read()
        else:
            print cformat("%{yellow}!%{reset} Photo for {} not found!").format(name)

        for num_shower in range(num_showers):
            room = Room(building=building, floor=floor, number=number, verbose_name="Shower {}".format(num_shower + 1),
                        location=location, division='CERN', owner=owner)
            if photo_data:
                room.photo = Photo(data=photo_data)
            if building in GEO_INFO:
                room.latitude, room.longitude = GEO_INFO[building]
            db.session.add(room)

    db.session.commit()
