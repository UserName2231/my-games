import React from 'react'

class StudyMode extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            onlyUnlearned: false,
            shuffled: false,
            studyList: [],
            currentIdx: 0,
            showingQ: true
        }
        this.goNext = this.goNext.bind(this)
        this.goPrev = this.goPrev.bind(this)
        this.flip = this.flip.bind(this)
        this.shuffle = this.shuffle.bind(this)
        this.toggleFilter = this.toggleFilter.bind(this)
    }

    buildStudyList(cards, onlyUnlearned) {
        if (onlyUnlearned) {
            return cards.filter(c => !c.done)
        }
        return [...cards]
    }

    componentDidMount() {
        let list = this.buildStudyList(this.props.cards, this.state.onlyUnlearned)
        this.setState({ studyList: list })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.cards !== this.props.cards || prevState.onlyUnlearned !== this.state.onlyUnlearned) {
            let list = this.buildStudyList(this.props.cards, this.state.onlyUnlearned)
            this.setState({ studyList: list, currentIdx: 0, showingQ: true })
        }
    }

    goNext() {
        if (this.state.currentIdx < this.state.studyList.length - 1) {
            this.setState(prev => ({
                currentIdx: prev.currentIdx + 1,
                showingQ: true
            }))
        }
    }

    goPrev() {
        if (this.state.currentIdx > 0) {
            this.setState(prev => ({
                currentIdx: prev.currentIdx - 1,
                showingQ: true
            }))
        }
    }

    flip() {
        this.setState(prev => ({ showingQ: !prev.showingQ }))
    }

    shuffle() {
        let arr = [...this.state.studyList]
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1))
            let temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
        }
        this.setState({ studyList: arr, currentIdx: 0, showingQ: true })
    }

    toggleFilter() {
        this.setState(prev => ({ onlyUnlearned: !prev.onlyUnlearned }))
    }

    render() {
        let list = this.state.studyList
        let empty = list.length === 0
        let card = empty ? null : list[this.state.currentIdx]

        return (
            <div className="box">
                <h3>Режим изучения</h3>
                <label>
                    <input
                        type="checkbox"
                        checked={this.state.onlyUnlearned}
                        onChange={this.toggleFilter}
                    />
                    Учить только невыученные
                </label>
                <button className="ml-10" onClick={this.shuffle}>Перемешать</button>

                <div className="study-area">
                    <h2>
                        {empty
                            ? "Колода пуста"
                            : this.state.showingQ ? card.q : card.a
                        }
                    </h2>
                    <button className="mt-20" onClick={this.flip} disabled={empty}>
                        Перевернуть
                    </button>
                </div>

                <div className="nav-area">
                    <button onClick={this.goPrev} disabled={empty || this.state.currentIdx === 0}>
                        Назад
                    </button>
                    <span className="bold-text">
                        {empty ? "0/0" : (this.state.currentIdx + 1) + " / " + list.length}
                    </span>
                    <button onClick={this.goNext} disabled={empty || this.state.currentIdx === list.length - 1}>
                        Вперед
                    </button>
                </div>
            </div>
        )
    }
}

export default StudyMode