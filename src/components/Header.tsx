import { toLocaleDateString } from '../lib/calcElapsed';
import { Icon } from './Icon';

type Props = {
  createTask: () => void;
  undo: () => void;
  historyLength: number;
};

export const Header = (props: Props) => {
  const today = new Date();
  const disabled = props.historyLength ? false : true;

  return (
    <header>
      <h1>{toLocaleDateString(today, [])}</h1>
      <button type="button" className="create-task" onClick={props.createTask}>
        ＋
      </button>

      <button
        type="button"
        className="undo"
        onClick={props.undo}
        disabled={disabled}
      >
        <Icon name="UIundo" color="#444" />
      </button>
    </header>
  );
};
