import { type NextPage } from "next"
import Head from "next/head"
import { QuizContainer } from "~/components/quiz/QuizContainer"
import { QuizContextProvider } from "~/context/quiz/QuizContext"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Quiz</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen">
        <QuizContextProvider>
          <QuizContainer />
        </QuizContextProvider>
      </main>
    </>
  )
}

export default Home
