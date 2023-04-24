import {
  createContext,
  useContext,
  type Dispatch,
  type ReactNode,
  useReducer
} from "react"
import { type IReducerActions, type IQuizData } from "./types"
import { reducer } from "./reducer"

interface ProviderProps {
  children: ReactNode
}

interface QuizContextProps {
  data: IQuizData
  dispatch: Dispatch<IReducerActions>
}

const QuizContext = createContext({} as QuizContextProps)

function useQuiz() {
  return useContext(QuizContext)
}

function QuizContextProvider({ children }: ProviderProps) {
  const [state, dispatch] = useReducer(reducer, {
    name: "React Beautiful DND",
    questions: []
  })

  return (
    <QuizContext.Provider
      value={{
        data: state,
        dispatch
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

export { QuizContextProvider, useQuiz }
