import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Action from './Action'
import { act } from 'react-dom/test-utils'
import { profile } from '../../mocks/profile.json';
import { profile as profileSuccess } from '../../mocks/profileSuccess.json';

describe('Action ', () => {
  it('Should not be able to invoke Shenlong', () => {
    const { container, debug, getByText } = render(<Action balls={profile.balls} />)
  
    const button = getByText('Invocar').closest('button')
    fireEvent.click(button)
  
    expect(getByText('Você não tem todas as esferas para invocar o shenlong')).toBeTruthy()
  
    const backButton = getByText('Voltar').closest('button')
    fireEvent.click(backButton)
  
    expect(getByText('Invocar shenlong')).toBeInTheDocument()
  });

  it('should be able to invoke Shenlong', () => {
    const { container, debug, getByText, getByTestId, findByTa } = render(<Action balls={profileSuccess.balls} />);

    const button = getByText('Invocar').closest('button');

    fireEvent.click(button);

    const shenlongImg = getByTestId('shenlong');

    expect(shenlongImg).toBeTruthy();
  })
});
