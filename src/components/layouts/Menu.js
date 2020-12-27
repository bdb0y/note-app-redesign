import React, {Component} from 'react'
import './style/Menu.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


class Menu extends Component {
    render() {
        return (
            <div className="menu-holder">
                <input className="search-box" type="text" name="search" placeholder="Search for notes..."
                value={this.props.searchValue} onChange={this.props.onSearch}/>
                <FontAwesomeIcon className="add-btn" icon="plus-square" onClick={this.props.addNote} />
            </div>
        );
    }
}

export default Menu;
