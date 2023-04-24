import {
  addQuestionAtIndex,
  addQuestionToAPool,
  mergeQuestionsIntoAPool,
  removeQuestionFromQuiz,
  sendQuestionDown,
  sendQuestionToTheFirstPosition,
  sendQuestionToTheLastPosition,
  sendQuestionUp,
  sortByDropping
} from "./controller"
import { type IQuizData, type IReducerActions } from "./types"

function reducer(
  state: IQuizData,
  { type, payload }: IReducerActions
): IQuizData {
  switch (type) {
    case "add_question_to_quiz":
      return { ...state, questions: [...state.questions, payload] }
    case "add_question_at_index":
      return addQuestionAtIndex(state, payload.item, payload.index)
    case "merge_into_a_pool":
      return mergeQuestionsIntoAPool(state, payload.questions, payload.index)
    case "remove_question":
      return removeQuestionFromQuiz(state, payload)
    case "send_question_down":
      return sendQuestionDown(state, payload)
    case "send_question_first":
      return sendQuestionToTheFirstPosition(state, payload)
    case "send_question_last":
      return sendQuestionToTheLastPosition(state, payload)
    case "send_question_up":
      return sendQuestionUp(state, payload)
    case "sorting_drop":
      return sortByDropping(state, payload)
    case "add_question_to_pool":
      return addQuestionToAPool(state, payload.question, payload.poolId)
  }
}

export { reducer }
