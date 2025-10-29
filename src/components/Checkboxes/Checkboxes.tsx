import type { ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  toggleCheckboxes,
  type CheckboxName,
} from '../../store/actions/setCheckboxes';
import styles from './Checkboxes.module.scss';

export default function Checkboxes(): ReactElement {
  const dispatch = useAppDispatch();
  const checkboxes = useAppSelector((state) => state.checkboxes);

  const checkboxItems: { name: CheckboxName; label: string; value: string }[] =
    [
      { name: 'all', label: 'Все', value: 'all' },
      { name: 'noStops', label: 'Без пересадок', value: '0' },
      { name: 'oneStop', label: '1 пересадка', value: '1' },
      { name: 'twoStops', label: '2 пересадки', value: '2' },
      { name: 'threeStops', label: '3 пересадки', value: '3' },
    ];

  const handleCheckboxChange = (name: CheckboxName) => {
    dispatch(toggleCheckboxes(name));
  };

  return (
    <div className={styles.filter}>
      <h3 className={styles.filterTitle}>Количество пересадок</h3>
      <form>
        {checkboxItems.map(({ name, label }) => (
          <label className={styles.filterItem} key={name} htmlFor={name}>
            <input
              type="checkbox"
              id={name}
              name={name}
              checked={checkboxes[name]}
              onChange={() => handleCheckboxChange(name)}
              className={styles.filterItemInput}
            />
            <span className={styles.checkmark} />
            {label}
          </label>
        ))}
      </form>
    </div>
  );
}
