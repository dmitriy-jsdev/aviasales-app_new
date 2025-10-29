export type CheckboxName =
  | 'all'
  | 'noStops'
  | 'oneStop'
  | 'twoStops'
  | 'threeStops';

export const toggleCheckboxes = (filterName: CheckboxName) =>
  ({
    type: 'TOGGLE_CHEKBOXES',
    payload: filterName,
  }) as const;
