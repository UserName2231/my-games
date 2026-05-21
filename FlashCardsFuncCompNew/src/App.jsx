import { useState, useEffect, useCallback } from 'react'
import DeckManager from './components/DeckManager.jsx'
import CardForm from './components/CardForm.jsx'
import CardTable from './components/CardTable.jsx'
import StudyMode from './components/StudyMode.jsx'
import { fetchCards } from './api.js'

const App = () => {
    const [decks, setDecks] = useState(() => {
        try {
            const raw = localStorage.getItem('flashcards-deck')
            if (raw) {
                const parsed = JSON.parse(raw)
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed
                }
            }
        } catch (e) {
            console.error(e)
        }
        return [{ name: 'Основная колода', cards: [] }]
    })

    const [currentDeck, setCurrentDeck] = useState(0)
    const [editData, setEditData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [fetchError, setFetchError] = useState(false)

    useEffect(() => {
        const deck = decks[currentDeck]
        if (deck && Array.isArray(deck.cards) && deck.cards.length === 0 && !loading && !fetchError) {
            setLoading(true)
            fetchCards()
                .then((cards) => {
                    setDecks((prev) => {
                        const copy = [...prev]
                        copy[currentDeck] = { ...copy[currentDeck], cards: cards }
                        return copy
                    })
                    setLoading(false)
                })
                .catch(() => {
                    setLoading(false)
                    setFetchError(true)
                })
        }
    }, [currentDeck])

    useEffect(() => {
        const timer = setInterval(() => {
            localStorage.setItem('flashcards-deck', JSON.stringify(decks))
        }, 5000)
        return () => clearInterval(timer)
    }, [decks])

    const handleChangeDeck = useCallback((id) => {
        setCurrentDeck(id)
        setEditData(null)
        setFetchError(false)
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
            const copy = [...prev]
            const cards = Array.isArray(copy[currentDeck].cards) ? [...copy[currentDeck].cards] : []

            if (editData) {
                for (let i = 0; i < cards.length; i++) {
                    if (cards[i].id === editData.id) {
                        cards[i] = { ...cards[i], q: q, a: a }
                        break
                    }
                }
            } else {
                cards.push({
                    id: Date.now() + Math.floor(Math.random() * 1000),
                    q: q,
                    a: a,
                    done: false
                })
            }

            copy[currentDeck] = { ...copy[currentDeck], cards: cards }
            return copy
        })
        setEditData(null)
    }, [currentDeck, editData])

    const handleDeleteCard = useCallback((id) => {
        setDecks((prev) => {
            const copy = [...prev]
            const cards = Array.isArray(copy[currentDeck].cards)
                ? copy[currentDeck].cards.filter((c) => c.id !== id)
                : []
            copy[currentDeck] = { ...copy[currentDeck], cards: cards }
            return copy
        })
        setEditData(null)
    }, [currentDeck])

    const handleEditCard = useCallback((id) => {
        const deck = decks[currentDeck]
        if (!deck || !Array.isArray(deck.cards)) return
        const cards = deck.cards
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].id === id) {
                setEditData({ id: cards[i].id, q: cards[i].q, a: cards[i].a })
                break
            }
        }
    }, [decks, currentDeck])

    const handleToggleDone = useCallback((id) => {
        setDecks((prev) => {
            const copy = [...prev]
            const cards = Array.isArray(copy[currentDeck].cards) ? [...copy[currentDeck].cards] : []
            for (let i = 0; i < cards.length; i++) {
                if (cards[i].id === id) {
                    cards[i] = { ...cards[i], done: !cards[i].done }
                    break
                }
            }
            copy[currentDeck] = { ...copy[currentDeck], cards: cards }
            return copy
        })
    }, [currentDeck])

    const cards = decks[currentDeck] && Array.isArray(decks[currentDeck].cards)
        ? decks[currentDeck].cards
        : []

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
                error={fetchError}
            />
            <StudyMode cards={cards} />
        </div>
    )
}

export default App