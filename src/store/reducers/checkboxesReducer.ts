import type { UnknownAction } from 'redux';
import { type CheckboxName } from '../actions/setCheckboxes';

type CheckboxesState = {
  all: boolean;
  noStops: boolean;
  oneStop: boolean;
  twoStops: boolean;
  threeStops: boolean;
};

type ToggleCheckboxesAction = {
  type: 'TOGGLE_CHEKBOXES';
  payload: CheckboxName;
};

export const initialCheckboxestate: CheckboxesState = {
  all: true,
  noStops: true,
  oneStop: true,
  twoStops: true,
  threeStops: true,
};

function isToggleCheckboxesAction(
  action: UnknownAction,
): action is ToggleCheckboxesAction {
  return action.type === 'TOGGLE_CHEKBOXES' && 'payload' in action;
}

export const filterReducer = (
  state: CheckboxesState = initialCheckboxestate,
  action: UnknownAction,
): CheckboxesState => {
  if (!isToggleCheckboxesAction(action)) {
    return state;
  }

  const { payload } = action;

  const newState: CheckboxesState = {
    ...state,
    [payload]: !state[payload],
  };

  if (payload === 'all') {
    (Object.keys(newState) as Array<keyof CheckboxesState>).forEach((key) => {
      newState[key] = newState.all;
    });
    return newState;
  }

  const allSelected = (Object.keys(newState) as Array<keyof CheckboxesState>)
    .filter((key) => key !== 'all')
    .every((key) => newState[key]);

  newState.all = allSelected;
  return newState;
};
