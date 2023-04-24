import { Draggable } from "react-beautiful-dnd"
import { AiOutlinePlusCircle } from "react-icons/ai"
import { RxDragHandleDots2 } from "react-icons/rx"
import { useQuiz } from "~/context/quiz/QuizContext"
import { type IQuestion } from "~/context/quiz/types"

type QuestionProps = IQuestion & { isDuplicate: boolean; index: number }

function SearchBarQuestion({ index, isDuplicate, ...question }: QuestionProps) {
  const { dispatch } = useQuiz()

  return (
    <Draggable
      draggableId={JSON.stringify(question)}
      index={index}
      isDragDisabled={isDuplicate}
    >
      {({ draggableProps, dragHandleProps, innerRef }) => (
        <div
          ref={innerRef}
          className="flex w-full items-start rounded-lg bg-white p-3"
          {...draggableProps}
        >
          <div className="relative flex w-full items-start">
            <div className="flex w-9 shrink-0 grow-0 items-start">
              <button
                type="button"
                className="flex h-10 w-6 items-center justify-center rounded bg-white hover:bg-slate-100"
                {...dragHandleProps}
              >
                <RxDragHandleDots2 />
              </button>
            </div>
            <div
              className={`flex grow items-start${
                isDuplicate ? " opacity-50" : ""
              }`}
            >
              <div className="group flex grow flex-col">
                <div className="flex w-full items-center justify-between">
                  <div className="flex shrink grow flex-col overflow-hidden">
                    <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm italic text-zinc-500">
                      {question.id}
                    </span>
                    <h4 className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold text-cyan-950">
                      {question.title}
                    </h4>
                  </div>
                </div>
                <div className="hidden flex-col group-hover:flex">
                  <div
                    className="mb-3 text-base font-normal text-zinc-500"
                    dangerouslySetInnerHTML={{
                      __html: question.data.description
                    }}
                  ></div>
                </div>
              </div>
              <div className="flex w-6 grow-0 items-center justify-center">
                <button
                  type="button"
                  disabled={isDuplicate}
                  onClick={() =>
                    dispatch({
                      type: "add_question_to_quiz",
                      payload: { ...question, type: "question" }
                    })
                  }
                >
                  <AiOutlinePlusCircle size={20} className="fill-blue-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export { SearchBarQuestion }
