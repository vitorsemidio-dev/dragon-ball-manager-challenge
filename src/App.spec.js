import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import App from './App'
import { act } from 'react-dom/test-utils'

describe('App', () => {
  it('link', () => {
    const {
      getByTestId
    } = render(<App />)
    const linkDragonBallManager = getByTestId('link-dragon-ball-manager');
  
    expect(linkDragonBallManager).toBeTruthy();
  })
})