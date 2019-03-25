# This file is part of the CERN Indico plugins.
# Copyright (C) 2014 - 2018 CERN
#
# The CERN Indico plugins are free software; you can redistribute
# them and/or modify them under the terms of the MIT License; see
# the LICENSE file for more details.

from __future__ import unicode_literals

from flask import current_app, redirect, request, url_for

from indico.core.plugins import IndicoPlugin
from indico.modules.rb.controllers import RHRoomBookingBase
from indico.web.flask.util import make_view_func
from indico.web.views import WPNewBase

from indico_showers import _


class WPShowersBase(WPNewBase):
    template_prefix = 'rb/'
    title = _('Showers')
    bundles = ('common.js',)


class RHLanding(RHRoomBookingBase):
    def _process(self):
        return WPShowersBase.display('room_booking.html')


class ShowersPlugin(IndicoPlugin):
    """Showers

    Allows to book showers by employees
    """

    def init(self):
        super(ShowersPlugin, self).init()
        current_app.before_request(self._before_request)
        self.inject_bundle('react.js', WPShowersBase)
        self.inject_bundle('react.css', WPShowersBase)
        self.inject_bundle('semantic-ui.js', WPShowersBase)
        self.inject_bundle('semantic-ui.css', WPShowersBase)
        self.inject_bundle('showers.js', WPShowersBase)
        self.inject_bundle('showers.css', WPShowersBase)

    def _before_request(self):
        if request.endpoint == 'categories.display':
            return redirect(url_for('rooms_new.roombooking'))
        elif request.endpoint == 'rooms_new.roombooking':
            # render our own landing page instead of the original RH
            return make_view_func(RHLanding)()
