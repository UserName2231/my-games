import { memo } from 'react'

const CardRow = memo(({ card, onToggle, onEdit, onDelete }) => {
    return (
        <tr>
            <td>{card.q}</td>
            <td>{card.a}</td>
            <td>
                <input
                    type="checkbox"
                    checked={card.done}
                    onChange={() => onToggle(card.id)}
                />
            </td>
            <td>
                <button onClick={() => onEdit(card.id)}>Ред</button>
                <button onClick={() => onDelete(card.id)}>Удал</button>
            </td>
        </tr>
    )
})

const CardTable = ({ cards, onDelete, onEdit, onToggle, loading }) => {
    if (loading) {
        return (
            <div className="box">
                <h3>Список всех карточек</h3>
                <p>Загрузка карточек с opentdb.com...</p>
            </div>
        )
    }

    return (
        <div className="box">
            <h3>Список всех карточек</h3>
            <table>
                <thead>
                    <tr>
                        <th>Вопрос</th>
                        <th>Ответ</th>
                        <th>Выучено</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {cards.map((card) => (
                        <CardRow
                            key={card.id}
                            card={card}
                            onToggle={onToggle}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default memo(CardTable)