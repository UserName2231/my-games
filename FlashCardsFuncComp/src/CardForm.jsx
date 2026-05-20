import { useState, useEffect, useCallback } from 'react'

const CardForm = ({ onAdd, editData }) => {
    const [q, setQ] = useState('')
    const [a, setA] = useState('')

    useEffect(() => {
        if (editData) {
            setQ(editData.q)
            setA(editData.a)
        }
    }, [editData])

    const handleAdd = useCallback(() => {
        const qTrimmed = q.trim()
        const aTrimmed = a.trim()
        if (qTrimmed === '' || aTrimmed === '') return
        onAdd(qTrimmed, aTrimmed)
        setQ('')
        setA('')
    }, [q, a, onAdd])

    return (
        <div className="box">
            <h3>{editData ? 'Редактировать карточку' : 'Добавить карточку'}</h3>
            <input
                type="text"
                placeholder="Вопрос (лицевая)"
                value={q}
                onChange={(e) => setQ(e.target.value)}
            />
            <input
                type="text"
                placeholder="Ответ (оборотная)"
                value={a}
                onChange={(e) => setA(e.target.value)}
            />
            <button onClick={handleAdd}>
                {editData ? 'Сохранить' : 'Добавить'}
            </button>
        </div>
    )
}

export default CardForm