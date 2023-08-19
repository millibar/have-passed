import { toLocaleDateString } from '../lib/calcElapsed';

type Props = {
  createTask: () => void;
};

export const Header = (props: Props) => {
  const today = new Date();

  return (
    <header>
      <h1>{toLocaleDateString(today, [])}</h1>
      <button type="button" className="create-task" onClick={props.createTask}>
        ＋
      </button>
    </header>
  );
};
