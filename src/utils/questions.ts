import { type IPool, type IQuestion } from "~/context/quiz/types"

function isDuplicate(id: string, list: Array<IQuestion | IPool>): boolean {
  let hasMatch = false
  list.forEach((item) => {
    if (item.id === id) {
      hasMatch = true
    } else {
      if (item.type === "pool") {
        item.questions.forEach((question) => {
          if (question.id === id) {
            hasMatch = true
          }
        })
      }
    }
  })

  return hasMatch
}

export { isDuplicate }
