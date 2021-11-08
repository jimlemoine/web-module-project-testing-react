import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Display from '../Display';

import mockFetchShow from '../../api/fetchShow';
jest.mock('../../api/fetchShow');

const testShow = {
    name: "test show name",
    summary: 'test show summary',
    seasons: [
        { 
            id: 1,
            name: "season 1",
            episodes: []},
        { 
            id: 2,
            name: "season 2",
            episodes: []},
        { 
            id: 3,
            name: "season 3",
            episodes: []},
        { 
            id: 4,
            name: "season 4",
            episodes: []}
    ]
}

test("renders without errors", () => {
    render(<Display />);
})

test("when fetch button is pressed the show component will display", async () => {
    
    mockFetchShow.mockResolvedValueOnce(testShow)
    render(<Display />);
    const button = screen.queryByRole("button");
    userEvent.click(button);

    const show =  await screen.findByTestId("show-container");
    expect(show).toBeInTheDocument();
})

test("when fetch button is pressed, the amount of select options rendered is equal to the seasons in the test data", async () => {
    
        mockFetchShow.mockResolvedValueOnce(testShow);
        render(<Display />);
        const button = screen.queryByRole("button");
        userEvent.click(button);
    
        await waitFor(() => {
            const seasonOptions = screen.queryAllByTestId("season-option");
            expect(seasonOptions).toHaveLength(4);
        })
})

test("when fetch button is pressed, displayFunc is called", async () => {
    const displayFunc = jest.fn();
    mockFetchShow.mockResolvedValueOnce(testShow);
    render(<Display displayFunc={displayFunc}/>);
    const button = screen.queryByRole("button");
    userEvent.click(button);

    await waitFor(() => {
        expect(displayFunc).toHaveBeenCalled();
    })
})




///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.