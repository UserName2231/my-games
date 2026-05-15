import React from 'react'

class CardTable extends React.Component {
    render() {
        let rows = this.props.cards.map(card => {
            return (
                <tr key={card.id}>
                    <td>{card.q}</td>
                    <td>{card.a}</td>
                    <td>
                        <input type="checkbox" checked={card.done} onChange={() => this.props.onToggle(card.id)} />
                    </td>
                    <td>
                        <button onClick={() => this.props.onEdit(card.id)}>Ред</button>
                        <button onClick={() => this.props.onDelete(card.id)}>Удал</button>
                    </td>
                </tr>
            )
        })

        return (
            <div className="box">
                <h3>Список всех карточек</h3>
                <table>
                    <thead>
                        <tr><th>Вопрос</th><th>Ответ</th><th>Выучено</th><th>Действия</th></tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        )
    }
}

export default CardTable