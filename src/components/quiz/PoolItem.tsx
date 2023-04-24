import { type IPool } from "~/context/quiz/types"
import { RxDragHandleDots2 } from "react-icons/rx"
import { useQuiz } from "~/context/quiz/QuizContext"
import {
  CgChevronDown,
  CgChevronUp,
  CgPushChevronDown,
  CgPushChevronUp
} from "react-icons/cg"
import { BiTrash } from "react-icons/bi"

import { Draggable } from "react-beautiful-dnd"
import { AiOutlinePlusCircle } from "react-icons/ai"

type PoolProps = IPool & { index: number; isFirst: boolean; isLast: boolean }

function PoolItem({ index, isFirst, isLast, ...pool }: PoolProps) {
  const { dispatch } = useQuiz()

  return (
    <Draggable draggableId={pool.id} index={index}>
      {(
        { dragHandleProps, draggableProps, innerRef },
        { combineTargetFor }
      ) => (
        <div
          className="flex w-full items-start rounded-lg bg-white p-3"
          ref={innerRef}
          {...draggableProps}
        >
          <div className="relative flex w-full items-start">
            <div className="flex grow items-start">
              <div className="group flex grow flex-col">
                <div className="flex w-full items-center justify-between">
                  <div className="flex shrink grow flex-col overflow-hidden">
                    <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm italic text-zinc-500">
                      {pool.questions.length} QUESTIONS
                    </span>
                    <h4 className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold text-cyan-950">
                      {index + 1}. Pool #{pool.id}
                    </h4>
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
                      payload: pool.id
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
                      payload: pool.id
                    })
                  }
                >
                  <CgChevronUp className="fill-cyan-900" />
                </button>
                <button
                  type="button"
                  className="hover:bg-slate200 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 disabled:opacity-50"
                  disabled={isFirst}
                  onClick={() =>
                    dispatch({
                      type: "send_question_down",
                      payload: pool.id
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
                      payload: pool.id
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
                      payload: pool.id
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
              <div className="absolute inset-0 flex flex-col justify-center rounded border-2 border-solid border-blue-500 bg-white px-4">
                <div className="flex h-full items-center justify-start gap-x-4">
                  <AiOutlinePlusCircle size={20} className="fill-blue-400" />
                  <span className="text-sm font-semibold text-sky-900">
                    Add question to the pool
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

export { PoolItem }
