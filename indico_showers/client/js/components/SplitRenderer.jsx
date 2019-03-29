/* This file is part of the Indico April Fools 2019 Plugin.
 * Copyright (C) 2019 CERN
 *
 * This plugin is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License; see the LICENSE
 * file for more details.
 */

import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {Icon} from 'semantic-ui-react';

import ShowerRenderer from './ShowerRenderer';

import './SplitRenderer.module.scss';


function BuildingRenderer({id, showers, actions}) {
    const allShowers = Array.prototype.concat(...showers.map(([_, showers]) => showers));
    return (
        <div styleName="building">
            <h2><Icon name="building outline" /> {id}</h2>
            <div styleName="building-container">
                <ShowerRenderer showers={_.sortBy(allShowers, ['building', 'floor', 'number', 'verboseName'])}>
                    {actions}
                </ShowerRenderer>
            </div>
        </div>
    );
}

BuildingRenderer.propTypes = {
    id: PropTypes.string.isRequired,
    showers: PropTypes.array.isRequired,
    actions: PropTypes.func
};

export default function SplitRenderer({rooms: showers, children}) {
    const byRoom = Object.entries(_.groupBy(showers, r => `${r.building}/${r.floor}-${r.number}`));
    const byBuilding = Object.entries(_.groupBy(byRoom, ([k]) => k.split('/')[0]));

    return (
        <div style={{marginTop: 30}}>
            {byBuilding.map(([bldgId, showers]) => (
                <BuildingRenderer key={bldgId} id={bldgId} showers={showers} actions={children} />
            ))}
        </div>
    );
}

SplitRenderer.propTypes = {
    rooms: PropTypes.array.isRequired,
    children: PropTypes.func
};
