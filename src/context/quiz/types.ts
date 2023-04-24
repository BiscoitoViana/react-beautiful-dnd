interface IQuizData {
  name: string
  questions: Array<IQuestion | IPool>
}

type IQuestion = {
  id: string
  type: "question"
  title: string
  data: {
    description: string
    options?: Array<{ label: string; value: string | number }>
    validation?: {
      valid_response?: {
        value: Array<string | number>
      }
    }
  }
}

type IPool = {
  id: string
  type: "pool"
  weight: number
  questions: IQuestion[]
}

type IReducerActions =
  | {
      type: "add_question_to_pool"
      payload: { question: IQuestion; poolId: string }
    }
  | { type: "add_question_to_quiz"; payload: IQuestion }
  | {
      type: "merge_into_a_pool"
      payload: { questions: IQuestion[]; index: number }
    }
  | { type: "remove_question"; payload: string }
  | { type: "send_question_up"; payload: string }
  | { type: "send_question_down"; payload: string }
  | { type: "send_question_first"; payload: string }
  | { type: "send_question_last"; payload: string }
  | { type: "sorting_drop"; payload: Array<IQuestion | IPool> }
  | {
      type: "add_question_at_index"
      payload: { item: IQuestion; index: number }
    }

export type { IPool, IQuestion, IQuizData, IReducerActions }
