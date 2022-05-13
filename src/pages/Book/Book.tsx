import { useQuery, gql } from '@apollo/client'
import { useState } from 'react'
import Nav from '../../components/Nav/Nav'
import Word from '../../components/Word/Word'
import styles from './Book.module.css'
import { BOOK_PAGES } from '../../queries/queries'



interface IToken {
  value: string
  position: number[]
}

// To monitor the position of the cursor on both pages
const position = [0, 0]

export default function Book() {
  const [currentPage, setCurrentPage] = useState(0)
  const { loading, error, data } = useQuery(BOOK_PAGES)
  const content1: string = data?.book?.pages?.[currentPage].content
  const content2: string = data?.book?.pages?.[currentPage + 1].content
  const tokens1: IToken[] = data?.book?.pages?.[currentPage].tokens
  const tokens2: IToken[] = data?.book?.pages?.[currentPage + 1].tokens
  const tokens: IToken[][] = [tokens1, tokens2]
  const contents: string[] = [content1, content2]
  const pageLength = data?.book?.pages?.length

  const page1 = tokens1?.map((token) => {
    return {
      word: content1.slice(token.position[0], token.position[1]),
      position: token.position
    }
  })

  const page2 = tokens2?.map((token) => {
    // I'll call these word objects
    return {
      word: content2.slice(token.position[0], token.position[1]),
      position: token.position
    }
  })

  // Aggregating both pages into a single array, to enable mapping
  const pages = [page1, page2]

  // Go to next double page
  const next = () => {
    position[0] = 0
    position[1] = 0

    setCurrentPage((prevState) => (prevState + 2 > pageLength - 1 ? pageLength - 2 : prevState + 2))
  }

  // Go to previous double page
  const back = () => {
    position[0] = 0
    position[1] = 0
    setCurrentPage((prevState) => (prevState === 0 ? 0 : prevState - 2))
  }

  // Loading indicator
  if (loading) return <p className={styles.main}>Loading...</p>

  // Display GrphQL error
  if (error) return <p className={styles.main}>Error : {error.message}</p>

  return (
    <div className={styles.main}>
      <Nav
        back={back}
        enabled={[currentPage !== 0, currentPage + 2 < pageLength]}
        pages={`${currentPage}-${currentPage + 1}`}
        next={next}
      />

      <div className={styles.pages}>
        {pages.map((page, pageIndex) => {
          // Loop through the pages
          return (
            <div className={styles.content} key={contents[pageIndex]}>
              {page &&
                page.map((word, wordIndex) => {
                  // Loop through each word object

                  // Post will be any text after the clickable text
                  let post = ''

                  // Post will be any text before the clickable text
                  let pre = ''

                  // Where the last clickable text ended, to get its post
                  let end = word.position[1]

                  // Where the new clickable text starts, to get it's pre
                  let start = wordIndex === 0 ? -1 : word.position[0] - 1

                  // Loop till you hit a space, or the end of the previous clickable text, when there's actually a pre
                  while (
                    start > 0 &&
                    contents[pageIndex][start] !== ' ' &&
                    start !== position[pageIndex]
                  ) {
                    if (wordIndex > 0 && start === page[wordIndex - 1].position[1] - 1) break

                    pre = contents[pageIndex][start] + pre
                    start -= 1
                  }

                  // Loop till you hit a space, or the start of the next clickable text, when there's actually a pre
                  while (end < contents[pageIndex].length - 1) {
                    if (
                      wordIndex < tokens[pageIndex].length - 1 &&
                      end === page[wordIndex + 1].position[0]
                    ) {
                      position[pageIndex] = end
                      break
                    }

                    if (contents[pageIndex][end] === ' ') {
                      post += '\u00A0'
                      position[pageIndex] = end
                      break
                    }

                    post += contents[pageIndex][end]
                    end += 1
                  }

                  return (
                    <div key={word.position[0]} className={styles.wordsGroup}>
                      {pre}
                      <Word>{word.word}</Word>
                      {post}
                    </div>
                  )
                })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
