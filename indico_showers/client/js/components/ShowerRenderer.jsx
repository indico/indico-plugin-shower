/* This file is part of the Indico April Fools 2019 Plugin.
 * Copyright (C) 2019 CERN
 *
 * This plugin is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License; see the LICENSE
 * file for more details.
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
