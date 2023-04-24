import { type IPool, type IQuestion, type IQuizData } from "./types"

function removeQuestionFromQuiz(
  state: IQuizData,
  reference: string
): IQuizData {
  const questions =
    state.questions.filter((question) => question.id !== reference) || []
  return { ...state, questions: questions }
}

function sendQuestionUp(state: IQuizData, reference: string): IQuizData {
  if (state.questions.length <= 1) {
    return state
  }

  const index = state.questions.findIndex(
    (question) => question.id === reference
  )

  const questions = [...state.questions]
  const question = questions.splice(index, 1)[0]

  if (!question) {
    return state
  }

  questions.splice(index - 1, 0, question)

  return { ...state, questions: questions }
}

function sendQuestionDown(state: IQuizData, reference: string): IQuizData {
  if (state.questions.length <= 1) {
    return state
  }

  const index = state.questions.findIndex(
    (question) => question.id === reference
  )

  const questions = [...state.questions]
  const question = questions.splice(index, 1)[0]

  if (!question) {
    return state
  }

  questions.splice(index + 1, 0, question)

  return { ...state, questions: questions }
}

function sendQuestionToTheFirstPosition(
  state: IQuizData,
  reference: string
): IQuizData {
  const index = state.questions.findIndex(
    (question) => question.id === reference
  )

  const questions = [...state.questions]
  const question = questions.splice(index, 1)[0]

  if (!question) {
    return state
  }

  return { ...state, questions: [question, ...questions] }
}

function sendQuestionToTheLastPosition(
  state: IQuizData,
  reference: string
): IQuizData {
  const index = state.questions.findIndex(
    (question) => question.id === reference
  )

  const questions = [...state.questions]
  const question = questions.splice(index, 1)[0]

  if (!question) {
    return state
  }

  return { ...state, questions: [...questions, question] }
}

function addQuestionAtIndex(
  state: IQuizData,
  item: IQuestion,
  index: number
): IQuizData {
  const questions = [...state.questions]
  questions.splice(index, 0, item)

  return { ...state, questions }
}

function sortByDropping(state: IQuizData, questions: Array<IQuestion | IPool>) {
  return { ...state, questions }
}

function mergeQuestionsIntoAPool(
  state: IQuizData,
  questions: IQuestion[],
  targetIndex: number
) {
  const pool: IPool = {
    id: Date.now().toString(),
    type: "pool",
    questions: questions,
    weight: questions.length
  }

  const questionsIds = questions.map((item) => item.id)

  const items = [...state.questions]
  items.splice(targetIndex, 1, pool)

  const quizItems = items.filter((item) => !questionsIds.includes(item.id))

  return { ...state, questions: quizItems }
}

function addQuestionToAPool(
  state: IQuizData,
  question: IQuestion,
  poolId: string
) {
  const pool = state.questions.find((item) => item.id === poolId)

  if (pool?.type === "pool") {
    const quizItems = state.questions.map((item) => {
      if (item.id === poolId && item.type === "pool") {
        return { ...item, questions: [...item.questions, question] }
      }

      return item
    })

    const items = quizItems.filter((item) => item.id !== question.id) || []

    return { ...state, questions: items }
  }

  return state
}

export {
  addQuestionAtIndex,
  addQuestionToAPool,
  mergeQuestionsIntoAPool,
  removeQuestionFromQuiz,
  sendQuestionDown,
  sendQuestionToTheFirstPosition,
  sendQuestionToTheLastPosition,
  sendQuestionUp,
  sortByDropping
}
