import { useState, useEffect, useCallback } from 'react'

const StudyMode = ({ cards }) => {
    const [onlyUnlearned, setOnlyUnlearned] = useState(false)
    const [studyList, setStudyList] = useState([])
    const [currentIdx, setCurrentIdx] = useState(0)
    const [showingQ, setShowingQ] = useState(true)

    useEffect(() => {
        let list
        if (onlyUnlearned) {
            list = cards.filter((c) => !c.done)
        } else {
            list = [...cards]
        }
        setStudyList(list)
        setCurrentIdx(0)
        setShowingQ(true)
    }, [cards, onlyUnlearned])

    const goNext = useCallback(() => {
        setCurrentIdx((prev) => {
            if (prev < studyList.length - 1) {
                return prev + 1
            }
            return prev
        })
        setShowingQ(true)
    }, [studyList.length])

    const goPrev = useCallback(() => {
        setCurrentIdx((prev) => {
            if (prev > 0) {
                return prev - 1
            }
            return prev
        })
        setShowingQ(true)
    }, [])

    const flip = useCallback(() => {
        setShowingQ((prev) => !prev)
    }, [])

    const shuffle = useCallback(() => {
        const arr = [...studyList]
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            const temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
        }
        setStudyList(arr)
        setCurrentIdx(0)
        setShowingQ(true)
    }, [studyList])

    const toggleFilter = useCallback(() => {
        setOnlyUnlearned((prev) => !prev)
    }, [])

    const empty = studyList.length === 0
    const card = empty ? null : studyList[currentIdx]

    return (
        <div className="box">
            <h3>Режим изучения</h3>
            <label>
                <input type="checkbox" checked={onlyUnlearned} onChange={toggleFilter} />
                Учить только невыученные
            </label>
            <button className="ml-10" onClick={shuffle}>Перемешать</button>

            <div className="study-area">
                <h2>{empty ? 'Колода пуста' : showingQ ? card.q : card.a}</h2>
                <button className="mt-20" onClick={flip} disabled={empty}>Перевернуть</button>
            </div>

            <div className="nav-area">
                <button onClick={goPrev} disabled={empty || currentIdx === 0}>Назад</button>
                <span className="bold-text">{empty ? '0/0' : (currentIdx + 1) + ' / ' + studyList.length}</span>
                <button onClick={goNext} disabled={empty || currentIdx === studyList.length - 1}>Вперед</button>
            </div>
        </div>
    )
}

export default StudyMode