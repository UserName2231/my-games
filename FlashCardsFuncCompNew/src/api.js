const API_URL = 'https://opentdb.com/api.php?amount=50'

export async function fetchCards() {
    const resp = await fetch(API_URL)
    const json = await resp.json()

    if (json.response_code !== 0) {
        throw new Error('Сервер не отдал карточки')
    }

    return json.results.map((item, idx) => ({
        id: Date.now() + idx + Math.floor(Math.random() * 1000),
        q: item.question,
        a: item.correct_answer,
        done: false
    }))
}