import React from 'react'

class CardForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { q: '', a: '' }
        this.handleAdd = this.handleAdd.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (this.props.editData && this.props.editData !== prevProps.editData) {
            this.setState({ q: this.props.editData.q, a: this.props.editData.a })
        }
    }

    handleAdd() {
        let q = this.state.q.trim()
        let a = this.state.a.trim()
        if (q === "" || a === "") return
        this.props.onAdd(q, a)
        this.setState({ q: '', a: '' })
    }

    render() {
        return (
            <div className="box">
                <h3>{this.props.editData ? 'Редактировать карточку' : 'Добавить карточку'}</h3>
                <input
                    type="text"
                    placeholder="Вопрос (лицевая)"
                    value={this.state.q}
                    onChange={e => this.setState({ q: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Ответ (оборотная)"
                    value={this.state.a}
                    onChange={e => this.setState({ a: e.target.value })}
                />
                <button onClick={this.handleAdd}>
                    {this.props.editData ? 'Сохранить' : 'Добавить'}
                </button>
            </div>
        )
    }
}

export default CardForm