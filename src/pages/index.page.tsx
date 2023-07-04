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
        FrouriOthelloParty!!!
      </div>
      <div className={styles.title} onClick={createRooms}>
        ルーム作成
      </div>
      <div className={styles.title}>
        <a href="/lobby">lobby</a>
      </div>
      <ul className={styles.tasks}>
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
        <div className={styles.title}>終試合</div>
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
