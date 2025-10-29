import type { Action, UnknownAction } from 'redux';

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

type FilterType = '' | 'cheapest' | 'fastest' | 'optimal';

type TicketsState = {
  ticketsData: Ticket[];
  visibleTickets: number;
  filterTickets: FilterType;
  loadingTickets: boolean;
  allTicketsLoaded: boolean | 'download complete';
};

export const initialTicketsState: TicketsState = {
  ticketsData: [],
  visibleTickets: 5,
  filterTickets: '',
  loadingTickets: true,
  allTicketsLoaded: false,
};

// ---- Action interfaces
interface SetTicketsAction {
  type: 'SET_TICKETS';
  payload: Ticket[];
}
interface ShowMoreTicketsAction {
  type: 'SHOW_MORE_TICKETS';
}
interface SetSortFilterAction {
  type: 'SET_SORT_FILTER';
  payload: FilterType;
}
interface StartLoadingTicketsAction {
  type: 'START_LOADING_TICKETS';
}
interface FinishLoadingTicketsAction {
  type: 'FINISH_LOADING_TICKETS';
}
interface FinishLoadingAllTicketsAction {
  type: 'FINISH_LOADING_ALL_TICKETS';
  payload: boolean | 'download complete';
}

const FILTER_VALUES = ['', 'cheapest', 'fastest', 'optimal'] as const;

function hasPayload(obj: unknown): obj is { payload: unknown } {
  return typeof obj === 'object' && obj !== null && 'payload' in obj;
}

function isSetTickets(a: Action): a is SetTicketsAction {
  return a.type === 'SET_TICKETS' && hasPayload(a) && Array.isArray(a.payload);
}

function isSetSortFilter(a: Action): a is SetSortFilterAction {
  return (
    a.type === 'SET_SORT_FILTER' &&
    hasPayload(a) &&
    typeof a.payload === 'string' &&
    (FILTER_VALUES as readonly string[]).includes(a.payload)
  );
}

function isShowMoreTickets(a: Action): a is ShowMoreTicketsAction {
  return a.type === 'SHOW_MORE_TICKETS';
}

function isStartLoading(a: Action): a is StartLoadingTicketsAction {
  return a.type === 'START_LOADING_TICKETS';
}

function isFinishLoading(a: Action): a is FinishLoadingTicketsAction {
  return a.type === 'FINISH_LOADING_TICKETS';
}

function isFinishLoadingAll(a: Action): a is FinishLoadingAllTicketsAction {
  if (a.type !== 'FINISH_LOADING_ALL_TICKETS' || !hasPayload(a)) return false;
  return typeof a.payload === 'boolean' || a.payload === 'download complete';
}

export const ticketsReducer = (
  state: TicketsState = initialTicketsState,
  action: UnknownAction,
): TicketsState => {
  if (isSetTickets(action)) {
    return { ...state, ticketsData: action.payload, loadingTickets: false };
  }
  if (isShowMoreTickets(action)) {
    return { ...state, visibleTickets: state.visibleTickets + 5 };
  }
  if (isSetSortFilter(action)) {
    return { ...state, filterTickets: action.payload };
  }
  if (isStartLoading(action)) {
    return { ...state, loadingTickets: true };
  }
  if (isFinishLoading(action)) {
    return { ...state, loadingTickets: false };
  }
  if (isFinishLoadingAll(action)) {
    return { ...state, allTicketsLoaded: action.payload };
  }
  return state;
};
