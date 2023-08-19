import { Icon } from './Icon';
import { TaskItem, initialTask } from './TaskItem';

type Props = {
  tasks: Task[];
  currentTask: Task;
  done: (id: number, updatedAtUTC: number) => void;
  setCurrentTask: (task: Task) => void;
  setEditOpen: (flag: boolean) => void;
  setAlertOpen: (flag: boolean) => void;
};

export const Card = (props: Props) => {
  return (
    <>
      {props.tasks.map((task) => (
        <div
          key={task.id}
          className="card"
          onClick={() =>
            task.id === props.currentTask.id
              ? props.setCurrentTask(initialTask)
              : props.setCurrentTask(task)
          }
        >
          <TaskItem
            title={task.title}
            updatedAtUTC={task.updatedAtUTC}
            iconName={task.iconName}
            iconColor={task.iconColor}
          />

          {task.id === props.currentTask.id ? (
            <>
              <button
                className="edit"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  props.setEditOpen(true);
                }}
              >
                <Icon name="UIedit" color="#666" />
              </button>
              <button
                className="delete"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  props.setAlertOpen(true);
                }}
              >
                <Icon name="UIdelete" color="#666" />
              </button>
            </>
          ) : (
            <button
              className="done"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                props.done(task.id, Date.now());
              }}
            >
              <Icon name="UIdone" color="#33a974" />
            </button>
          )}
        </div>
      ))}
    </>
  );
};
