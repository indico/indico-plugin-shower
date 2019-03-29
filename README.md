# indico-plugin-shower :shower:

A **Shower Management** plugin based on Indico's Room Booking module.

**Made for April Fools' Day 2019.**

## Installation

These are **development mode** instructions, since this is supposed to be a joke plugin.

### Install the package
```
$ git clone https://github.com/indico/indico-plugin-shower.git
$ cd indico-plugin-shower
$ pip install -e .
```

### Build the assets

From Indico's core source directory:
```
$ python bin/maintenance/build-assets.py plugin --clean --dev ../path/to/indico-plugin-shower
```

### Enable the plugin

Edit `indico.conf`, and add `showers` to the `PLUGINS` set.

### Populate with some data

This is CERN test data. We are not including any room images for obvious reasons. You can edit the `cli.py` file to set your own rooms/coordinates.

```
$ indico showers populate-db
```

By default you will get a CERN map, but you can build your own using the [indico-maps](https://github.com/indico/indico-maps) repo (you'll have to set your own `tileserver_url` in `cli.py` before populating the DB).

When you access your Indico server, you should be redirected to the room booking system.
