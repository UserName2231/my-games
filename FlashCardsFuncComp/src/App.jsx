import { useState, useEffect, useCallback } from 'react'
import DeckManager from './DeckManager.jsx'
import CardForm from './CardForm.jsx'
import CardTable from './CardTable.jsx'
import StudyMode from './StudyMode.jsx'
import { fetchCards } from './api.js'

const App = () => {
    const [decks, setDecks] = useState(() => {
        const saved = localStorage.getItem('flashcards-deck')
        return saved ? JSON.parse(saved) : [{ name: 'Основная колода', cards: [] }]
    })
    const [currentDeck, setCurrentDeck] = useState(0)
    const [editData, setEditData] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const deck = decks[currentDeck]
        if (deck && deck.cards.length === 0 && !loading) {
            setLoading(true)
            fetchCards()
                .then((cards) => {
                    const newDecks = [...decks]
                    newDecks[currentDeck] = { ...newDecks[currentDeck], cards: cards }
                    setDecks(newDecks)
                    setLoading(false)
                })
                .catch(() => {
                    setLoading(false)
                })
        }
    }, [currentDeck, decks, loading])

    useEffect(() => {
        const timer = setInterval(() => {
            localStorage.setItem('flashcards-deck', JSON.stringify(decks))
        }, 5000)
        return () => clearInterval(timer)
    }, [decks])

    const handleChangeDeck = useCallback((id) => {
        setCurrentDeck(id)
        setEditData(null)
    }, [])

    const handleAddDeck = useCallback((name) => {
        setDecks((prev) => {
            const newDecks = [...prev, { name: name, cards: [] }]
            return newDecks
        })
        setCurrentDeck((prev) => decks.length)
        setEditData(null)
    }, [decks.length])

    const handleAddCard = useCallback((q, a) => {
        setDecks((prev) => {
            const newDecks = [...prev]
            const cards = [...newDecks[currentDeck].cards]

            if (editData) {
                for (let i = 0; i < cards.length; i++) {
                    if (cards[i].id === editData.id) {
                        cards[i] = { ...cards[i], q: q, a: a }
                        break
                    }
                }
            } else {
                const newCard = {
                    id: Date.now() + Math.floor(Math.random() * 1000),
                    q: q,
                    a: a,
                    done: false
                }
                cards.push(newCard)
            }

            newDecks[currentDeck] = { ...newDecks[currentDeck], cards: cards }
            return newDecks
        })
        setEditData(null)
    }, [currentDeck, editData])

    const handleDeleteCard = useCallback((id) => {
        setDecks((prev) => {
            const newDecks = [...prev]
            const cards = newDecks[currentDeck].cards.filter((c) => c.id !== id)
            newDecks[currentDeck] = { ...newDecks[currentDeck], cards: cards }
            return newDecks
        })
        setEditData(null)
    }, [currentDeck])

    const handleEditCard = useCallback((id) => {
        const cards = decks[currentDeck].cards
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].id === id) {
                setEditData({ id: cards[i].id, q: cards[i].q, a: cards[i].a })
                break
            }
        }
    }, [decks, currentDeck])

    const handleToggleDone = useCallback((id) => {
        setDecks((prev) => {
            const newDecks = [...prev]
            const cards = [...newDecks[currentDeck].cards]
            for (let i = 0; i < cards.length; i++) {
                if (cards[i].id === id) {
                    cards[i] = { ...cards[i], done: !cards[i].done }
                    break
                }
            }
            newDecks[currentDeck] = { ...newDecks[currentDeck], cards: cards }
            return newDecks
        })
    }, [currentDeck])

    const cards = decks[currentDeck] ? decks[currentDeck].cards : []

    return (
        <div>
            <DeckManager
                decks={decks}
                currentDeck={currentDeck}
                onChangeDeck={handleChangeDeck}
                onAddDeck={handleAddDeck}
            />
            <CardForm onAdd={handleAddCard} editData={editData} />
            <CardTable
                cards={cards}
                onDelete={handleDeleteCard}
                onEdit={handleEditCard}
                onToggle={handleToggleDone}
                loading={loading}
            />
            <StudyMode cards={cards} />
        </div>
    )
}

export default App