import React from 'react'
import DeckManager from './DeckManager'
import CardForm from './CardForm'
import CardTable from './CardTable'
import StudyMode from './StudyMode'

class App extends React.Component {
    constructor(props) {
        super(props)
        let saved = localStorage.getItem('flashcards-deck')
        let decks = saved ? JSON.parse(saved) : [{ name: "Основная колода", cards: [] }]
        if (!decks.length) {
            decks = [{ name: "Основная колода", cards: [] }]
        }

        this.state = {
            decks: decks,
            currentDeck: 0,
            editData: null
        }

        this.changeDeck = this.changeDeck.bind(this)
        this.addDeck = this.addDeck.bind(this)
        this.addCard = this.addCard.bind(this)
        this.deleteCard = this.deleteCard.bind(this)
        this.editCard = this.editCard.bind(this)
        this.toggleDone = this.toggleDone.bind(this)
    }

    componentDidMount() {
        this.saveInterval = setInterval(() => {
            localStorage.setItem('flashcards-deck', JSON.stringify(this.state.decks))
        }, 5000)
    }

    componentWillUnmount() {
        clearInterval(this.saveInterval)
    }

    getCards() {
        let deck = this.state.decks[this.state.currentDeck]
        return deck ? deck.cards : []
    }

    changeDeck(id) {
        this.setState({ currentDeck: id, editData: null })
    }

    addDeck(name) {
        let newDecks = [...this.state.decks, { name: name, cards: [] }]
        this.setState({
            decks: newDecks,
            currentDeck: newDecks.length - 1,
            editData: null
        })
    }

    addCard(q, a) {
        let newCard = {
            id: Date.now() + Math.floor(Math.random() * 1000),
            q: q,
            a: a,
            done: false
        }
        let decksCopy = [...this.state.decks]

        if (this.state.editData) {
            let cards = decksCopy[this.state.currentDeck].cards
            for (let i = 0; i < cards.length; i++) {
                if (cards[i].id === this.state.editData.id) {
                    cards[i].q = q
                    cards[i].a = a
                    break
                }
            }
        } else {
            decksCopy[this.state.currentDeck].cards.push(newCard)
        }

        this.setState({ decks: decksCopy, editData: null })
    }

    deleteCard(id) {
        let decksCopy = [...this.state.decks]
        let cards = decksCopy[this.state.currentDeck].cards
        decksCopy[this.state.currentDeck].cards = cards.filter(c => c.id !== id)
        this.setState({ decks: decksCopy, editData: null })
    }

    editCard(id) {
        let cards = this.getCards()
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].id === id) {
                this.setState({ editData: { id: cards[i].id, q: cards[i].q, a: cards[i].a } })
                break
            }
        }
    }

    toggleDone(id) {
        let decksCopy = [...this.state.decks]
        let cards = decksCopy[this.state.currentDeck].cards
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].id === id) {
                cards[i].done = !cards[i].done
                break
            }
        }
        this.setState({ decks: decksCopy })
    }

    render() {
        let cards = this.getCards()

        return (
            <div>
                <DeckManager
                    decks={this.state.decks}
                    currentDeck={this.state.currentDeck}
                    onChangeDeck={this.changeDeck}
                    onAddDeck={this.addDeck}
                />

                <CardForm
                    onAdd={this.addCard}
                    editData={this.state.editData}
                />

                <CardTable
                    cards={cards}
                    onDelete={this.deleteCard}
                    onEdit={this.editCard}
                    onToggle={this.toggleDone}
                />

                <StudyMode cards={cards} />
            </div>
        )
    }
}

export default App