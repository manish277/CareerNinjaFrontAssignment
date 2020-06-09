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
        const data = await fetch(`https://radiant-harbor-26955.herokuapp.com/autosearch?value=${value}`)
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

        const data = await fetch(`https://radiant-harbor-26955.herokuapp.com/search?location=${value}`)
        locationdata = await data.json();
        this.setState(() => ({
            text: value,
            suggestion: [],
            placeData: locationdata
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
    renderTableData() {
        return this.state.placeData.map((placeData, index) => {
            const { attacker_1,
                attacker_2,
                attacker_3,
                attacker_4, defender_king,
                attacker_commander,
                attacker_king,
                attacker_outcome,
                attacker_size,
                battle_number,
                battle_type,
                defender_1,
                defender_2,
                defender_3,
                defender_4,
                defender_commander,
                defender_size,
                location,
                major_capture,
                major_death,
                name,
                note,
                region,
                summer,
                year,
                _id, } = placeData //destructuring
            return (
                <tr key={_id}>
                    <td>{_id}</td>
                    <td>{name}</td>
                    <td>{year}</td>
                    <td>{battle_number}</td>
                    <td>{attacker_king}</td>
                    <td>{defender_king}</td>
                    <td>{attacker_1}</td>
                    <td>{attacker_2}</td>
                    <td>{attacker_3}</td>
                    <td>{attacker_4}</td>
                    <td>{defender_1}</td>
                    <td>{defender_2}</td>
                    <td>{defender_3}</td>
                    <td>{defender_4}</td>
                    <td>{attacker_outcome}</td>
                    <td>{battle_type}</td>
                    <td>{major_death}</td>
                    <td>{major_capture}</td>
                    <td>{attacker_size}</td>
                    <td>{defender_size}</td>
                    <td>{attacker_commander}</td>
                    <td>{defender_commander}</td>
                    <td>{summer}</td>
                    <td>{location}</td>
                    <td>{region}</td>
                    <td>{note}</td>

                </tr>
            )
        })
    }
    renderTableHeader() {
        const { placeData } = this.state;
        if (placeData.length === 0) {
            return null
        }
        let header = Object.keys(this.state.placeData[0])
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
   
    render() {
        const { text } = this.state;
        return (
            <div className="main">
                <h1>Auto Search Bar for Battle Place</h1>
                <div className='SearchBar'>
                    <input value={text} onChange={this.onTextChange} type="text"  />
                    {this.renderSuggestion()}
                </div>
                <h1 id='title'>Battle Place Data</h1>
                <table id='battlePlace'>
                    <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {this.renderTableData()}
                    </tbody>
                </table>

            </div>
        )
    }
}