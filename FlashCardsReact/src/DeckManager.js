import React from 'react'

class DeckManager extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newName: ''
        }
        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleAdd() {
        let name = this.state.newName.trim()
        if (name === "") return
        this.props.onAddDeck(name)
        this.setState({ newName: '' })
    }

    handleChange(e) {
        this.props.onChangeDeck(parseInt(e.target.value))
    }

    render() {
        let options = this.props.decks.map((deck, i) => {
            return <option key={i} value={i}>{deck.name}</option>
        })

        return (
            <div className="box">
                <h3>Управление колодами</h3>
                <select value={this.props.currentDeck} onChange={this.handleChange}>
                    {options}
                </select>
                <input
                    type="text"
                    placeholder="Имя новой колоды"
                    value={this.state.newName}
                    onChange={e => this.setState({ newName: e.target.value })}
                />
                <button onClick={this.handleAdd}>Создать колоду</button>
            </div>
        )
    }
}

export default DeckManager