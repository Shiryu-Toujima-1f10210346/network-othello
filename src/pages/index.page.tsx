import type { RoomModel } from '$/commonTypesWithClient/models';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import { userAtom } from '../atoms/user';
import styles from './index.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  const [tasks, setTasks] = useState<RoomModel[] | undefined>(undefined);

  const fetchTasks = async () => {
    console.log('fetchTasks');
    const tasks = await apiClient.tasks.$get().catch(returnNull);
    console.table(tasks);
    if (tasks !== null) setTasks(tasks);
  };
  // const createRoom = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   await apiClient.tasks.$post({ body: { label } });
  //   await fetchTasks();
  //   setLabel('');
  // };

  const createRooms = async () => {
    console.log('createRooms');
    await apiClient.rooms.$post();
    await fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (!tasks || !user) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.title} style={{ marginTop: '160px' }}>
        欢迎访问! 特别感谢!
      </div>

      <div className="container p-8">
        <ul className="grid grid-cols-5">
          {tasks.map(
            (task) =>
              task.status !== 'ended' && (
                <li key={task.id}>
                  <a href={`/othello?labels=${task.id}`}>
                    ID:{task.id}
                    <div>{task.status === 'playing' ? '試合中' : '待機中'}</div>
                  </a>
                </li>
              )
          )}
        </ul>
      </div>

      <div className={styles.title} onClick={createRooms}>
        部屋建筑!
      </div>
      <ul className={styles.tasks}>
        部屋一覧!
        {tasks.map(
          (task) =>
            task.status !== 'ended' && (
              <li key={task.id}>
                <a href={`/othello?labels=${task.id}`}>
                  {task.id}
                  <div>{task.status}</div>
                </a>
              </li>
            )
        )}
        <div className={styles.title}>終試合一覧！</div>
        <img src="https://ev-media.net/wp-content/uploads/2019/03/img_0e05202cec83ca7da073a3717d1986ea17110.jpg" />
      </ul>
      <ul className={styles.tasks}>
        {tasks.map(
          (task) =>
            task.status === 'ended' && (
              <li key={task.id}>
                <a href={`/othello?labels=${task.id}`}>
                  {task.id}
                  <div>{task.status}</div>
                </a>
              </li>
            )
        )}
      </ul>
    </>
  );
};

export default Home;
