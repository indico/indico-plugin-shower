/* This file is part of Indico.
 * Copyright (C) 2002 - 2018 European Organization for Nuclear Research (CERN).
 *
 * Indico is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; either version 3 of the
 * License, or (at your option) any later version.
 *
 * Indico is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Indico; if not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'semantic-ui-react';
import Room from 'indico/modules/rb_new/components/Room';
import {withHoverListener} from 'indico/modules/rb_new/common/map/util';

/**
 * `ShowerRenderer` encapsulates the rendering of showers
 */
class ShowerRenderer extends React.Component {
    static propTypes = {
        showers: PropTypes.array.isRequired,
        children: PropTypes.func
    };

    static defaultProps = {
        children: null
    };

    ShowerComponent = withHoverListener(({room, ...restProps}) => {
        const {children} = this.props;

        return (
                <Room key={room.id} room={room} showFavoriteButton {...restProps}>
                    {children ? children(room) : null}
                </Room>
            );
    });

    render() {
        const {showers} = this.props;
        return (
            <Card.Group stackable>
                {showers.map(shower => (
                    <this.ShowerComponent key={shower.id}
                                          room={shower} />
                ))}
            </Card.Group>
        );
    }
}

export default ShowerRenderer;
