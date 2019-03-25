/* This file is part of the CERN Indico plugins.
 * Copyright (C) 2014 - 2019 CERN
 *
 * The CERN Indico plugins are free software; you can redistribute
 * them and/or modify them under the terms of the MIT License; see
 * the LICENSE file for more details.
 */

import setup from 'indico/modules/rb_new/setup';
import DefaultApp from 'indico/modules/rb_new/components/App';
import DefaultMenu from 'indico/modules/rb_new/components/Menu';

import {Translate} from 'indico/react/i18n';
import {parametrize} from 'indico/react/util';


const ShowersApp = parametrize(DefaultApp, {
    title: Translate.string('Showers'),
    iconName: 'shower'
});

const ShowersMenu = parametrize(DefaultMenu, () => ({
    labels: {
        bookRoom: Translate.string('Reserve a shower'),
        roomList: Translate.string('List of Showers')
    }
}));

const parametrized = {
    App: ShowersApp,
    Menu: ShowersMenu,
};

setup({...parametrized});
