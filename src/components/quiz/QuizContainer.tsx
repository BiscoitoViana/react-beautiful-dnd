import { useQuiz } from "~/context/quiz/QuizContext"
import { QuestionSearchBar } from "./SearchBar"
import { QuizListContainer } from "./QuizListContainer"

import { DragDropContext, type DropResult } from "react-beautiful-dnd"
import { useEffect, useState } from "react"
import { type IQuestion } from "~/context/quiz/types"

function QuizContainer() {
  const [inBrowser, setInBrowser] = useState<boolean>(false)
  const { data, dispatch } = useQuiz()

  function handleDragEng({
    combine,
    destination,
    draggableId,
    source
  }: DropResult) {
    // if dropped in the list
    if (destination?.droppableId === "quiz-list") {
      //if dragged from the quiz
      if (source.droppableId === "quiz-list") {
        const itemsList = [...data.questions]
        const item = itemsList.splice(source.index, 1)[0]
        if (item) {
          itemsList.splice(destination.index, 0, item)

          dispatch({ type: "sorting_drop", payload: itemsList })
        }
      }
      // if dragged from the search bar
      if (source.droppableId === "search-bar") {
        const item = JSON.parse(draggableId) as IQuestion

        const itemExists = !!data.questions.find(
          (question) => question.id === item.id
        )

        // if the item does not exist in the quiz
        if (!itemExists) {
          dispatch({
            type: "add_question_at_index",
            payload: { index: destination.index, item: item }
          })
        }
      }
    }

    // if is combining items
    if (combine?.draggableId) {
      console.log("combine =>", combine)
      console.log("destination =>", destination)
      console.log("source =>", source)
      console.log("draggableId", draggableId)
      // if is being combining in a item at quiz
      if (combine.droppableId === "quiz-list") {
        if (source.droppableId === "search-bar") {
          const draggedOverItem = JSON.parse(draggableId) as IQuestion
          const droppedOverItem = data.questions.find(
            (item) => item.id === combine.draggableId
          )

          if (droppedOverItem) {
            if (droppedOverItem.type === "question") {
              const index = data.questions.findIndex(
                (item) => item.id === droppedOverItem.id
              )
              dispatch({
                type: "merge_into_a_pool",
                payload: {
                  questions: [draggedOverItem, droppedOverItem],
                  index: index
                }
              })
            } else {
              dispatch({
                type: "add_question_to_pool",
                payload: {
                  question: draggedOverItem,
                  poolId: droppedOverItem.id
                }
              })
            }
          }
        }

        if (source.droppableId === "quiz-list") {
          const draggable = data.questions.find(
            (item) => item.id === draggableId
          )

          if (draggable) {
            if (draggable.type !== "pool") {
              const droppable = data.questions.find(
                (item) => item.id === combine.draggableId
              )
              if (droppable) {
                if (droppable.type === "pool") {
                  dispatch({
                    type: "add_question_to_pool",
                    payload: { poolId: droppable.id, question: draggable }
                  })
                }

                if (droppable.type === "question") {
                  const index = data.questions.findIndex(
                    (item) => item.id === droppable.id
                  )
                  dispatch({
                    type: "merge_into_a_pool",
                    payload: { index, questions: [draggable, droppable] }
                  })
                }
              }
            }
          }
        }
      }
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      setInBrowser(true)
    }
  }, [])

  if (!inBrowser) return null

  return (
    <DragDropContext onDragEnd={handleDragEng}>
      {inBrowser && (
        <div className="grid min-h-screen w-full grid-cols-[1fr_440px] bg-sky-100">
          <div className="p-4">
            <div className="flex h-full w-full flex-col rounded-lg bg-sky-200 p-4">
              <div className="flex grow-0 flex-col items-center justify-center py-12">
                <h2 className="text-5xl font-semibold text-cyan-950">
                  {data.name}
                </h2>
              </div>
              <div className="flex grow">
                <QuizListContainer />
              </div>
            </div>
          </div>
          <QuestionSearchBar />
        </div>
      )}
    </DragDropContext>
  )
}

export { QuizContainer }
