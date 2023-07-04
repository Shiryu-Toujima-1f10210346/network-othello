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

  useEffect(() => {
    fetchTasks();
  }, []);

  if (!tasks || !user) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.title} style={{ marginTop: '160px' }}>
        Welcome to frourio!
      </div>

      <div className={styles.title}>
        <a href="/othello">othello</a>
      </div>
      <div className={styles.title}>
        <a href="/lobby">lobby</a>
      </div>
      <ul className={styles.tasks}>
        {tasks.map((task) => (
          <li key={task.id}>
            <a href={`/othello?labels=${task.id}`}>
              {task.id}
              <div>{task.status}</div>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
