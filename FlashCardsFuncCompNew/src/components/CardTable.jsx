import { memo } from 'react'
import CardRow from './CardRow.jsx'
import './CardTable.css'

const CardTable = ({ cards, onDelete, onEdit, onToggle, loading, error }) => {
    if (loading) {
        return (
            <div className="box">
                <h3>Список всех карточек</h3>
                <p>Загружаю карточки с opentdb.com...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="box">
                <h3>Список всех карточек</h3>
                <p>Не получилось загрузить карточки. Попробуй переключить колоду.</p>
            </div>
        )
    }

    if (!Array.isArray(cards) || cards.length === 0) {
        return (
            <div className="box">
                <h3>Список всех карточек</h3>
                <p>Нет карточек. Добавь новую или переключи колоду.</p>
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