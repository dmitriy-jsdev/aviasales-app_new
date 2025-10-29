import { type UnknownAction } from 'redux';
import { type ThunkDispatch } from 'redux-thunk';

export type FilterType = 'cheapest' | 'fastest' | 'optimal';

type Segment = {
  origin: string;
  destination: string;
  date: string;
  duration: number;
  stops: string[];
};

type Ticket = {
  price: number;
  carrier: string;
  segments: [Segment, Segment];
};

type TicketsResponse = {
  tickets: Ticket[];
  stop: boolean;
};

type SearchResponse = {
  searchId: string;
};

type AppDispatch = ThunkDispatch<unknown, unknown, UnknownAction>;

export const showMoreTickets = () => ({ type: 'SHOW_MORE_TICKETS' }) as const;

export const setFilterTickets = (filterType: FilterType) =>
  ({
    type: 'SET_SORT_FILTER',
    payload: filterType,
  }) as const;

export const startLoadingTickets = () =>
  ({ type: 'START_LOADING_TICKETS' }) as const;

export const finishLoadingTickets = () =>
  ({ type: 'FINISH_LOADING_TICKETS' }) as const;

export const finishLoadingAllTickets =
  () =>
  (dispatch: AppDispatch): void => {
    dispatch({
      type: 'FINISH_LOADING_ALL_TICKETS',
      payload: 'download complete',
    });
    setTimeout(() => {
      dispatch({ type: 'FINISH_LOADING_ALL_TICKETS', payload: true });
    }, 2000);
  };

export const getTickets =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    const setTickets = (tickets: Ticket[]) =>
      ({ type: 'SET_TICKETS', payload: tickets }) as const;

    let allTickets: Ticket[] = [];

    const fetchTickets = async (searchId: string): Promise<void> => {
      try {
        const ticketsResponse = await fetch(
          `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`,
        );

        if (!ticketsResponse.ok) {
          throw new Error(
            `Network response was not ok for tickets, status: ${ticketsResponse.status}`,
          );
        }

        const { tickets, stop } =
          (await ticketsResponse.json()) as TicketsResponse;

        allTickets = [...allTickets, ...tickets];
        dispatch(setTickets(allTickets));

        if (stop) {
          dispatch(finishLoadingAllTickets());
        } else {
          await fetchTickets(searchId);
        }
      } catch {
        await fetchTickets(searchId);
      }
    };

    try {
      const response = await fetch(
        'https://aviasales-test-api.kata.academy/search',
      );
      if (!response.ok)
        throw new Error('Network response was not ok for searchId');

      const { searchId } = (await response.json()) as SearchResponse;
      if (!searchId) return;

      await fetchTickets(searchId);
    } catch (error) {
      console.error('Произошла ошибка при получении searchId:', error);
    }
  };
