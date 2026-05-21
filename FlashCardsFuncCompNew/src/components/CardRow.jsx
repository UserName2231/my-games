import { memo, useCallback } from 'react'
import './CardRow.css'

const CardRow = ({ card, onToggle, onEdit, onDelete }) => {
    const handleToggle = useCallback(() => {
        onToggle(card.id)
    }, [onToggle, card.id])

    const handleEdit = useCallback(() => {
        onEdit(card.id)
    }, [onEdit, card.id])

    const handleDelete = useCallback(() => {
        onDelete(card.id)
    }, [onDelete, card.id])

    return (
        <tr>
            <td>{card.q}</td>
            <td>{card.a}</td>
            <td>
                <input
                    type="checkbox"
                    checked={card.done}
                    onChange={handleToggle}
                />
            </td>
            <td>
                <button onClick={handleEdit}>Ред</button>
                <button onClick={handleDelete}>Удал</button>
            </td>
        </tr>
    )
}

export default memo(CardRow)