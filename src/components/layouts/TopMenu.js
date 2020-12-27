import React, {Component} from 'react'
import './style/TopMenu.css'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class TopMenu extends Component{
    render() {
        return (
            <div className="top-menu-holder">
                <FontAwesomeIcon className="option back" icon="arrow-left" onClick={this.props.goBack}/>
                <FontAwesomeIcon className="option delete" icon="trash-alt" onClick={this.props.onDelete}/>
            </div>
        );
    }
}

export default TopMenu;
