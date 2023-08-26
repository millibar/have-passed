import { Icon } from './Icon';
import { useEffect, useRef } from 'react';
import { elapsedString, toLocaleDateOrTimeString } from '../lib/calcElapsed';

export const initialTask: Task = {
  title: '',
  id: 0,
  updatedAtUTC: 0,
  iconName: 'No Image',
  iconColor: '#000000',
};

type Props = {
  title: string;
  updatedAtUTC: number;
  iconName: string;
  iconColor: string;
  handleOnTitleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TaskItem = (props: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="task">
      {props.handleOnTitleChange ? (
        <h1>
          {props.title ? (
            <input
              type="text"
              value={props.title}
              onChange={(e) =>
                props.handleOnTitleChange ? props.handleOnTitleChange(e) : false
              }
            />
          ) : (
            <input
              ref={inputRef}
              type="text"
              value={''}
              placeholder="名前を入力してください"
              onChange={(e) =>
                props.handleOnTitleChange ? props.handleOnTitleChange(e) : false
              }
            />
          )}
        </h1>
      ) : (
        <h1>{props.title}</h1>
      )}

      <Icon name={props.iconName} color={props.iconColor} />

      <p>
        <strong>{elapsedString(props.updatedAtUTC, Date.now())}</strong>
        <time>
          <span>since </span>
          {toLocaleDateOrTimeString(props.updatedAtUTC, Date.now(), [])}
        </time>
      </p>
    </div>
  );
};
