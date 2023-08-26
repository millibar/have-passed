import { useState } from 'react';
import { Icon } from './Icon';
import { TaskItem } from './TaskItem';

type Props = {
  currentTask: Task;
  updateTask: (
    id: number,
    title: string,
    iconName: string,
    iconColor: string,
  ) => void;
  deleteTask: (id: number) => void;
};

type Selected = {
  iconName: string;
  iconColor: string;
};

const iconNames = [
  'scissors',
  'watering',
  'running',
  'meal',
  'paint',
  'book',
  'study',
  'walking',
  'hand',
  'dental',
  'hospital',
  'movie',
  'medicine',
  'pet',
  'heart',
  'cycling',
  'smoking',
  'beer',
];

const iconColors = [
  '9c5e31',
  'ff9500',
  'f62e36',
  'e85298',
  '8f76d6',
  '0079c2',
  '00a7db',
  '009bbf',
  '00ac9b',
  '888888',
  '000000',
];

export const EditDialog = (props: Props) => {
  const [selected, setSelected] = useState<Selected>({
    iconName: props.currentTask.iconName,
    iconColor: props.currentTask.iconColor,
  });
  const [title, setTitle] = useState(props.currentTask.title);

  const handleOnIconClick = (iconName: string) => {
    setSelected((selected) => ({ ...selected, iconName }));
  };

  const handleOnColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected((selected) => ({
      ...selected,
      iconColor: `#${e.target.value}`,
    }));
  };

  const handleOnTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <>
      <div
        className="overlay"
        onClick={() =>
          props.updateTask(
            props.currentTask.id,
            title,
            selected.iconName,
            selected.iconColor,
          )
        }
      ></div>
      <div className="edit-dialog">
        <TaskItem
          title={title}
          updatedAtUTC={props.currentTask.updatedAtUTC}
          iconName={selected.iconName}
          iconColor={selected.iconColor}
          handleOnTitleChange={handleOnTitleChange}
        />

        <h2>アイコンを選択</h2>
        <ul className="icon-list">
          {iconNames.map((iconName) => (
            <li key={iconName} onClick={() => handleOnIconClick(iconName)}>
              {selected.iconName === iconName ? (
                <span className="selected">
                  <Icon name={iconName} color={selected.iconColor} />
                </span>
              ) : (
                <Icon name={iconName} color={selected.iconColor} />
              )}
            </li>
          ))}
        </ul>

        <h2>色を選択</h2>
        <ul className="color-list">
          {iconColors.map((iconColor) => (
            <li key={iconColor}>
              <input
                type="radio"
                name="color"
                id={`c-${iconColor}`}
                value={iconColor}
                onChange={(e) => handleOnColorChange(e)}
              />
              <label
                htmlFor={`c-${iconColor}`}
                style={{ background: `#${iconColor}` }}
              ></label>
            </li>
          ))}
        </ul>

        <button
          className="update"
          type="button"
          disabled={title ? false : true}
          onClick={() => {
            props.updateTask(
              props.currentTask.id,
              title,
              selected.iconName,
              selected.iconColor,
            );
          }}
        >
          OK
        </button>

        <button
          type="button"
          className="delete"
          onClick={() => {
            props.deleteTask(props.currentTask.id);
          }}
        >
          <Icon name="UIdelete" color="#666" />
        </button>
      </div>
    </>
  );
};
