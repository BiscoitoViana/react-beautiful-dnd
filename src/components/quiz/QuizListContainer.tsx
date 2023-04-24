import { useQuiz } from "~/context/quiz/QuizContext"

import { Droppable } from "react-beautiful-dnd"
import { PoolItem } from "./PoolItem"
import { QuizListQuestion } from "./QuizListQuestion"

function QuizListContainer() {
  const { data } = useQuiz()

  return (
    <div className="relative flex grow flex-col">
      <Droppable droppableId="quiz-list" isCombineEnabled>
        {({ droppableProps, innerRef, placeholder }, { isDraggingOver }) => (
          <div
            ref={innerRef}
            {...droppableProps}
            className={`absolute inset-0 flex flex-col gap-y-4 overflow-y-auto rounded-lg p-4 ${
              isDraggingOver ? "bg-sky-500" : "bg-sky-300"
            }`}
          >
            {data.questions.map((question, index) => {
              if (question.type === "question") {
                return (
                  <QuizListQuestion
                    key={question.id}
                    {...question}
                    index={index}
                    isFirst={index === 0}
                    isLast={index === data.questions.length - 1}
                  />
                )
              }
              return (
                <PoolItem
                  key={question.id}
                  {...question}
                  index={index}
                  isFirst={index === 0}
                  isLast={index === data.questions.length - 1}
                />
              )
            })}
            {placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export { QuizListContainer }
