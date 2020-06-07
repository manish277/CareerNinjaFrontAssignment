import React from 'react';
import './SearchBar.css'
import Table from "./Table";
export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            suggestion: [],
            text: '',
            placeData: []
        };
    }
    onTextChange = async (e) => {
        const value = e.target.value;
        let location;
        const data = await fetch(`http://localhost:3000/autosearch?value=${value}`)
        location = await data.json();
        const items = location;
        let suggestion = []
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestion = items.sort().filter(val => regex.test(val))
        }
        this.setState(() => ({ suggestion, text: value }))
    }
    async  suggestionSelect(value) {

        let locationdata;

        const data = await fetch(`http://localhost:3000/search?location=${value}`)
        locationdata = await data.json();
        this.setState(() => ({
            text: value,
            suggestion: [],
            placeData:locationdata
        }))
    }

    renderSuggestion() {
        const { suggestion } = this.state;
        if (suggestion.length === 0) {
            return null
        }
        return (
            <ul>
                {suggestion.map((items) => <li onClick={() => this.suggestionSelect(items)}>{items}</li>)}
            </ul>
        )
    }
    render() {
        const { text } = this.state;
        return (
            <div className="hi">
                <h1>Search Bar for battle</h1>
                <div className='SearchBar'>
                    <input value={text} onChange={this.onTextChange} type="text" />
                    {this.renderSuggestion()}
                </div>
               
            </div>
        )
    }
}