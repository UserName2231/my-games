const API_URL = 'https://opentdb.com/api.php?amount=50'

export async function fetchCards() {
    const response = await fetch(API_URL)
    const data = await response.json()

    if (data.response_code !== 0) {
        throw new Error('Ошибка загрузки с сервера')
    }

    const cards = data.results.map((item, index) => {
        return {
            id: Date.now() + index + Math.floor(Math.random() * 1000),
            q: item.question,
            a: item.correct_answer,
            done: false
        }
    })

    return cards
}