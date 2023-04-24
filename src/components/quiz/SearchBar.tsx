import { questions } from "~/data/questions"

import { useQuiz } from "~/context/quiz/QuizContext"
import { isDuplicate } from "~/utils/questions"
import { Droppable } from "react-beautiful-dnd"
import { SearchBarQuestion } from "./SearchBarQuestion"

function QuestionSearchBar() {
  const { data } = useQuiz()

  return (
    <div className="relative h-full w-full">
      <Droppable droppableId="search-bar">
        {({ droppableProps, innerRef, placeholder }) => (
          <div
            ref={innerRef}
            {...droppableProps}
            className="absolute inset-4 flex flex-col gap-y-2 overflow-y-auto"
          >
            {questions.map((question, index) => (
              <SearchBarQuestion
                key={question.id}
                {...question}
                index={index}
                isDuplicate={isDuplicate(question.id, data.questions)}
              />
            ))}
            {placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export { QuestionSearchBar }
