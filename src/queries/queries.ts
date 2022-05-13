import { gql } from '@apollo/client'

export const BOOK_PAGES = gql`
  query GetBookPages {
    book {
      pages {
        content
        tokens {
          position
          value
        }
      }
    }
  }
`