import { useState, useEffect } from 'react';
import localforage from 'localforage';

import { Header } from './components/Header';
import { EditDialog } from './components/EditDialog';
import { Card } from './components/Card';
import { AlertDialog } from './components/AlertDialog';

import { initialTask } from './components/TaskItem';

export const App = () => {
  const [currentTask, setCurrentTask] = useState<Task>(initialTask);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editOpen, setEditOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const [history, setHistory] = useState<Task[][]>([]);

  // Headerの＋ボタンがクリックされたときに呼ばれる
  // tasks配列に新しいtaskを追加する
  const createTask = () => {
    const newTask: Task = {
      title: '',
      updatedAtUTC: Date.now(),
      id: Date.now(),
      iconName: 'No Image',
      iconColor: '#000',
    };

    if (!tasks) {
      // localforageの最初の読み込みでtasksがnullになる場合があるのでエラー回避
      console.log(`tasksが${tasks}なので初期化します`);
      setTasks([]);
    }

    setTasks((tasks) => [newTask, ...tasks]);
    setCurrentTask(newTask);
    setEditOpen(true);

    setHistory((history) => [
      structuredClone(tasks),
      ...structuredClone(history),
    ]);
  };

  // EditDialogを閉じたときに呼ばれる
  // taskの名称、アイコン、アイコンの色を変更する
  const updateTask = (
    id: number,
    title: string,
    iconName: string,
    iconColor: string,
  ) => {
    if (title === '') {
      return;
    }
    setTasks((tasks) => {
      const newTasks = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, title, iconName, iconColor };
        }
        return task;
      });

      return newTasks;
    });
    setCurrentTask(() => initialTask);
    setEditOpen(false);

    setHistory((history) => [
      structuredClone(tasks),
      ...structuredClone(history),
    ]);
  };

  // Cardのチェックボタンがクリックされたときに呼ばれる
  // 最終実施日を現在日付で更新する
  const done = (id: number, updatedAtUTC: number) => {
    setTasks((tasks) => {
      const newTasks = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, updatedAtUTC };
        }
        return task;
      });

      return newTasks;
    });

    setHistory((history) => [
      structuredClone(tasks),
      ...structuredClone(history),
    ]);
  };

  // 削除ボタンがクリックされたときに呼ばれる
  // tasks配列からidに一致するtaskを削除する
  const deleteTask = (id: number) => {
    setTasks((tasks) => tasks.filter((task) => task.id != id));
    setCurrentTask(() => initialTask);
    setEditOpen(false);

    setHistory((history) => [
      structuredClone(tasks),
      ...structuredClone(history),
    ]);
  };

  // history配列（tasksの配列）の先頭を取り出し、tasksにセットする
  const undo = () => {
    if (history.length < 1) {
      console.log('これ以上Undoできません');
      return;
    }
    const [prevTasks, ...newHistory] = structuredClone(history);
    setTasks([...prevTasks]);
    setHistory(structuredClone(newHistory));
  };

  // tasks配列をIndexedDBに保存する
  useEffect(() => {
    localforage
      .getItem('have-passed')
      .then((values) => setTasks(values as Task[]))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    localforage.setItem('have-passed', tasks);
  }, [tasks]);

  return (
    <>
      <Header
        createTask={createTask}
        undo={undo}
        historyLength={history.length}
      />

      {editOpen && (
        <EditDialog
          currentTask={currentTask}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      )}

      {alertOpen && (
        <AlertDialog
          currentTask={currentTask}
          deleteTask={deleteTask}
          setAlertOpen={setAlertOpen}
        />
      )}

      <Card
        tasks={tasks}
        currentTask={currentTask}
        done={done}
        setCurrentTask={setCurrentTask}
        setEditOpen={setEditOpen}
      />
    </>
  );
};
