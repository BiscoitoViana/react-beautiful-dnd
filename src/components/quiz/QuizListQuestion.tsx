import { useQuiz } from "~/context/quiz/QuizContext"
import { type IQuestion } from "~/context/quiz/types"
import {
  CgChevronDown,
  CgChevronUp,
  CgPushChevronDown,
  CgPushChevronUp
} from "react-icons/cg"
import { BiGitMerge, BiTrash } from "react-icons/bi"
import { Draggable } from "react-beautiful-dnd"
import { RxDragHandleDots2 } from "react-icons/rx"

type QuestionProps = IQuestion & {
  index: number
  isFirst: boolean
  isLast: boolean
}

function QuizListQuestion({
  index,
  isFirst,
  isLast,
  ...question
}: QuestionProps) {
  const { dispatch } = useQuiz()

  return (
    <Draggable draggableId={question.id} index={index}>
      {(
        { draggableProps, dragHandleProps, innerRef },
        { combineTargetFor }
      ) => (
        <div
          ref={innerRef}
          className="flex w-full items-start rounded-lg bg-white p-3"
          {...draggableProps}
        >
          <div className="relative flex w-full items-start">
            <div className="flex grow items-start">
              <div className="group flex grow flex-col">
                <div className="flex w-full items-center justify-between">
                  <div className="flex shrink grow flex-col overflow-hidden">
                    <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm italic text-zinc-500">
                      {question.id}
                    </span>
                    <h4 className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold text-cyan-950">
                      {index + 1}. {question.title}
                    </h4>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div
                    className="mb-3 text-base font-normal text-zinc-500"
                    dangerouslySetInnerHTML={{
                      __html: question.data.description
                    }}
                  ></div>
                  <div>
                    {question.data.options?.map((option) => (
                      <p
                        key={option.value}
                        className={`mb-2 text-sm ${
                          question.data.validation?.valid_response?.value.includes(
                            option.value
                          )
                            ? "font-semibold text-blue-400"
                            : "text-zinc-500"
                        }`}
                      >
                        {option.label}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex h-full w-[12rem] grow-0 items-center justify-end gap-x-1.5 px-4">
                <button
                  type="button"
                  className="hover:bg-slate200 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 disabled:opacity-50"
                  disabled={isFirst}
                  onClick={() =>
                    dispatch({
                      type: "send_question_first",
                      payload: question.id
                    })
                  }
                >
                  <CgPushChevronUp className="fill-cyan-900" />
                </button>
                <button
                  type="button"
                  className="hover:bg-slate200 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 disabled:opacity-50"
                  disabled={isFirst}
                  onClick={() =>
                    dispatch({
                      type: "send_question_up",
                      payload: question.id
                    })
                  }
                >
                  <CgChevronUp className="fill-cyan-900" />
                </button>
                <button
                  type="button"
                  className="hover:bg-slate200 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 disabled:opacity-50"
                  disabled={isLast}
                  onClick={() =>
                    dispatch({
                      type: "send_question_down",
                      payload: question.id
                    })
                  }
                >
                  <CgChevronDown className="fill-cyan-900" />
                </button>
                <button
                  type="button"
                  className="hover:bg-slate200 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 disabled:opacity-50"
                  disabled={isLast}
                  onClick={() =>
                    dispatch({
                      type: "send_question_last",
                      payload: question.id
                    })
                  }
                >
                  <CgPushChevronDown className="fill-cyan-900" />
                </button>
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 hover:bg-rose-100"
                  onClick={() =>
                    dispatch({
                      type: "remove_question",
                      payload: question.id
                    })
                  }
                >
                  <BiTrash className="fill-rose-900" />
                </button>
              </div>
            </div>
            <div className="flex w-9 shrink-0 grow-0 items-start">
              <button
                type="button"
                className="flex h-10 w-6 items-center justify-center rounded bg-white hover:bg-slate-100"
                {...dragHandleProps}
              >
                <RxDragHandleDots2 />
              </button>
            </div>
            {!!combineTargetFor && (
              <div className="absolute inset-0 flex flex-col justify-center gap-x-4 rounded border-2 border-solid border-blue-500 bg-white px-4">
                <div className="flex items-center justify-start gap-x-4">
                  <BiGitMerge color="#38bdf8" size={18} />
                  <span className="text-sm font-semibold text-sky-900">
                    Merge questions in a pool
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  )
}

export { QuizListQuestion }
