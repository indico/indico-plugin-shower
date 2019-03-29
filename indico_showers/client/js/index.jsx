/* This file is part of the Indico April Fools 2019 Plugin.
 * Copyright (C) 2019 CERN
 *
 * This plugin is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License; see the LICENSE
 * file for more details.
 */

import moment from 'moment';

import setup from 'indico/modules/rb_new/setup';
import DefaultApp from 'indico/modules/rb_new/components/App';
import DefaultBookingBootstrapForm from 'indico/modules/rb_new/components/BookingBootstrapForm';
import DefaultBookRoom from 'indico/modules/rb_new/modules/bookRoom/BookRoom';
import DefaultBookRoomModal from 'indico/modules/rb_new/modules/bookRoom/BookRoomModal';
import DefaultLandingStatistics from 'indico/modules/rb_new/modules/landing/LandingStatistics';
import DefaultMenu from 'indico/modules/rb_new/components/Menu';
import DefaultRoomBookingMap from 'indico/modules/rb_new/common/map/RoomBookingMap';
import DefaultRoomDetailsModal from 'indico/modules/rb_new/common/rooms/RoomDetailsModal';

import {Translate} from 'indico/react/i18n';
import {parametrize} from 'indico/react/util';

import MapMarkers from './components/MapMarkers';
import SplitRenderer from './components/SplitRenderer';


const App = parametrize(DefaultApp, {
    title: Translate.string('Showers'),
    iconName: 'shower'
});

const BookingBootstrapForm = parametrize(DefaultBookingBootstrapForm, () => ({
    defaults: {
        timeSlot: {
            startTime: moment().startOf('hour').add(1, 'h'),
            endTime: moment().startOf('hour').add(1, 'h').add(15, 'm')
        }
    }
}));

const Menu = parametrize(DefaultMenu, () => ({
    labels: {
        bookRoom: Translate.string('Reserve a shower'),
        roomList: Translate.string('List of Showers')
    }
}));

const BookRoom = parametrize(DefaultBookRoom, {
    showSuggestions: false,
    labels: {
        bookButton: Translate.string('Book Shower'),
        preBookButton: Translate.string('Pre-Book Shower'),
        detailsButton: Translate.string('See details')
    }
});

const LandingStatistics = parametrize(DefaultLandingStatistics, () => ({
    labels: {
        activeRooms: Translate.string('Showers available'),
        bookingsToday: Translate.string('Refreshing Showers Today')
    }
}));

const RoomDetailsModal = parametrize(DefaultRoomDetailsModal, () => ({
    title: Translate.string('Shower Details')
}));

const BookRoomModal = parametrize(DefaultBookRoomModal, () => ({
    defaultTitles: {
        booking: Translate.string('Book a Shower'),
        preBooking: Translate.string('Pre-book a Shower')
    },
    reasonRequired: false,
}));

const RoomBookingMap = parametrize(DefaultRoomBookingMap, {
    markerComponent: MapMarkers
});

const parametrized = {
    App,
    BookingBootstrapForm,
    Menu,
    BookRoom,
    LandingStatistics,
    RoomDetailsModal,
    BookRoomModal,
    RoomBookingMap
};

const overrides = {
    RoomRenderer: SplitRenderer
};

setup({...parametrized, ...overrides});
