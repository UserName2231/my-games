import { useState, useCallback } from 'react'

const DeckManager = ({ decks, currentDeck, onChangeDeck, onAddDeck }) => {
    const [newName, setNewName] = useState('')

    const handleAdd = useCallback(() => {
        const name = newName.trim()
        if (name === '') return
        onAddDeck(name)
        setNewName('')
    }, [newName, onAddDeck])

    const handleChange = useCallback((e) => {
        onChangeDeck(parseInt(e.target.value))
    }, [onChangeDeck])

    return (
        <div className="box">
            <h3>Управление колодами</h3>
            <select value={currentDeck} onChange={handleChange}>
                {decks.map((deck, i) => (
                    <option key={i} value={i}>{deck.name}</option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Имя новой колоды"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
            />
            <button onClick={handleAdd}>Создать колоду</button>
        </div>
    )
}

export default DeckManager