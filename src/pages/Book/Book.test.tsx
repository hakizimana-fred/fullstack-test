import React from 'react'
import { render, screen } from '@testing-library/react'
import Book from './Book'

test('renders learn react link', () => {
  render(<Book />)
  const text = screen.getByText('Book')
  expect(text).toBeInTheDocument()
})
