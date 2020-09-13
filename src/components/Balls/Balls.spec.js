import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Balls from './Balls'
import { act } from 'react-dom/test-utils'

import { profile } from '../../mocks/profile.json';
import { profile as profileSuccess } from '../../mocks/profileSuccess.json';
import { balls } from '../../mocks/esferas.json';
import { balls as ballsSuccess } from '../../mocks/esferasSuccess.json';

describe('Balls', () => {
  it('Should be able to show 4 found dragon balls and 3 not found dragon balls', () => {
    const { getAllByText, debug } = render(<Balls balls={balls} profile={profile} />);
    const found = getAllByText('Encontrada');
    const notFound = getAllByText('Não encontrada');

    expect(found.length).toBe(4);
    expect(notFound.length).toBe(3);
  });

  it('Should be able to find one dragon ball', () => {
    const { getAllByText, debug, getByText, getByPlaceholderText } = render(<Balls balls={balls} profile={profile} />);

    const findDragonBallButton = getAllByText('encontrei').map((element) => element.closest('button'));
    expect(findDragonBallButton.length).toBeGreaterThan(0)

    const dragonBallsNotFound = getAllByText('Não encontrada');
    const dragonBallsFoundInitially = getAllByText('Encontrada');

    expect(dragonBallsNotFound.length).toEqual(findDragonBallButton.length);

    fireEvent.click(findDragonBallButton[0]);
    const inputCode = getByPlaceholderText('Ex: 123').closest('input');
    fireEvent.change(inputCode, { target: { value: profile.id } });
    const validateButton = getByText('Validar').closest('button');
    fireEvent.click(validateButton);

    const dragonBallsFoundUpdated = getAllByText('Encontrada');
    expect(dragonBallsFoundUpdated.length).toEqual(dragonBallsFoundInitially.length + 1);
  });

  it('Should show all 7 dragon balls found initially', () => {
    const { getAllByText } = render(<Balls balls={ballsSuccess} profile={profileSuccess} />);

    const dragonBallFound = getAllByText('Encontrada').map((element) => element.closest('span'));

    expect(dragonBallFound.length).toEqual(7);
  });

  it('Should be able to find all missing dragon ball', () => {
    const { getAllByText, getByPlaceholderText, getByText } = render(<Balls balls={balls} profile={profile} />)

    const findDragonBallButtons = getAllByText('encontrei').map((element) => element.closest('button'));

    findDragonBallButtons.forEach((findButton) => {
      fireEvent.click(findButton);
      const inputCode = getByPlaceholderText('Ex: 123');
      fireEvent.change(inputCode, { target: { value: profile.id } });
      const validateButton = getByText('Validar');
      fireEvent.click(validateButton);
    });

    const dragonBallsFound = getAllByText('Encontrada').map((element) => element.closest('span'));

    expect(dragonBallsFound.length).toEqual(7);
  });

  it('Should be able to show all missing dragon balls', () => {
    const { getByTestId, queryAllByText, getAllByText, getByText } = render(<Balls balls={balls} profile={profile} />);

    const notFound = balls.filter(ball => !ball.owner);
    const found = balls.filter(ball => ball.owner);

    const inputSelectFilter = getByTestId('filter').closest('select');
    const notFoundDragonBalls = getAllByText('Não encontrada');
    const foundDragonBalls = getAllByText('Encontrada');

    expect(notFoundDragonBalls.length + foundDragonBalls.length).toEqual(7);
    
    fireEvent.change(inputSelectFilter, { target: { value: 'notme' }});

    const notFoundDragonBallsFiltered = getAllByText('Não encontrada');
    const foundDragonBallsFiltered = queryAllByText('Encontrada');

    expect(notFoundDragonBallsFiltered.length).toEqual(notFound.length);
    expect(foundDragonBallsFiltered).toHaveLength(0);
  });

  it('Should be able to show all dragon balls found', () => {
    const { queryAllByText, getByTestId } = render(<Balls balls={balls} profile={profile} />);

    const found = balls.filter((ball) => ball.owner);

    const inputSelectFilter = getByTestId('filter').closest('select');

    fireEvent.change(inputSelectFilter, { target: { value: 'me' } });

    const notFoundDragonBallsFiltered = queryAllByText('Não encontrada');
    const foundDragonBallsFiltered = queryAllByText('Encontrada');

    expect(foundDragonBallsFiltered.length).toEqual(found.length);
    expect(notFoundDragonBallsFiltered).toHaveLength(0);
  });

  it('should be able to use all filters', () => {
    const { queryAllByText, getByTestId } = render(<Balls balls={balls} profile={profile} />);

    const found = balls.filter((ball) => ball.owner);
    const notFound = balls.filter((ball) => !ball.owner);

    const inputSelectFilter = getByTestId('filter');
    const notFoundDragonBalls = queryAllByText('Não encontrada');
    const foundDragonBalls = queryAllByText('Encontrada');

    expect(notFoundDragonBalls).toHaveLength(notFound.length);
    expect(foundDragonBalls).toHaveLength(found.length);
    expect(notFoundDragonBalls.length + foundDragonBalls.length).toEqual(7);

    fireEvent.change(inputSelectFilter, { target: { value: 'notme' } });

    const emptyFoundDragonBall = queryAllByText('Encontrada');
    const filteredNotFoundDragonBalls = queryAllByText('Não encontrada');
    expect(emptyFoundDragonBall).toHaveLength(0);
    expect(filteredNotFoundDragonBalls).toHaveLength(notFound.length);

    fireEvent.change(inputSelectFilter, { target: { value: 'me' } });
    const emptyNotFoundDragonBalls = queryAllByText('Não encontrada');
    const filteredFoundDragonBalls = queryAllByText('Encontrada');
    expect(emptyNotFoundDragonBalls).toHaveLength(0);
    expect(filteredFoundDragonBalls).toHaveLength(found.length);
  });

  it('should be able to find dragon balls and filter with the updated', () => {
    const { queryAllByText, getByTestId, getByPlaceholderText, getByText } = render(<Balls balls={balls} profile={profile} />);

    const foundInitial = balls.filter((ball) => ball.owner);
    const notFoundInitial = balls.filter((ball) => !ball.owner);

    const inputSelectFilter = getByTestId('filter');

    let notFoundDragonBalls = queryAllByText('Não encontrada');
    let foundDragonBalls = queryAllByText('Encontrada');

    expect(notFoundDragonBalls).toHaveLength(notFoundInitial.length);
    expect(foundDragonBalls).toHaveLength(foundInitial.length);

    fireEvent.change(inputSelectFilter, { target: { value: 'me' } });
    foundDragonBalls = queryAllByText('Encontrada');
    const emptyNotFoundDragonBalls = queryAllByText('Não encontrada');

    expect(foundDragonBalls).toHaveLength(foundInitial.length);
    expect(emptyNotFoundDragonBalls).toHaveLength(0);

    fireEvent.change(inputSelectFilter, { target: { value: 'notme' } });
    notFoundDragonBalls = queryAllByText('Não encontrada');
    const emptyFoundDragonBalls = queryAllByText('Encontrada');

    expect(notFoundDragonBalls).toHaveLength(notFoundInitial.length);
    expect(emptyFoundDragonBalls).toHaveLength(0);


    const findDragonBallButtons = queryAllByText('encontrei').map((element) => element.closest('button'));
    fireEvent.click(findDragonBallButtons[0]);

    const inputCode = getByPlaceholderText('Ex: 123').closest('input');
    const validateButton = getByText('Validar').closest('button');

    fireEvent.change(inputCode, { target: { value: 1} });
    fireEvent.click(validateButton);

    notFoundDragonBalls = queryAllByText('Não encontrada');
    foundDragonBalls = queryAllByText('Encontrada');

    expect(notFoundDragonBalls.length + foundDragonBalls.length).toEqual(7);
    expect(notFoundDragonBalls).toHaveLength(notFoundInitial.length - 1);
    expect(foundDragonBalls).toHaveLength(foundInitial.length + 1);
  });
});
