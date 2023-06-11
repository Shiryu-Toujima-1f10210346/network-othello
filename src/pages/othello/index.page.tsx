import type { TaskModel } from '$/commonTypesWithClient/models';
import { useAtom } from 'jotai';
import type { ChangeEvent, FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import { userAtom } from '../../atoms/user';
import styles from './othello.module.css';

const Home = () => {
  //const turn = apiClient.turn.$get().catch(returnNull);
  const onClick = async (x: number, y: number) => {
    await apiClient.board.$post({ body: { x, y } });
    await fetchBoard();
    await fetchTurn();
  };
  const [user] = useAtom(userAtom);
  const [label, setLabel] = useState('');
  const inputLabel = (e: ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };
  const [board, setBoard] = useState<number[][]>();
  const [turn, setTurn] = useState<number>();
  const fetchBoard = async () => {
    const board = await apiClient.board.$get().catch(returnNull);
    if (board !== null) setBoard(board.board);
  };

  const fetchTurn = async () => {
    const turn = await apiClient.turn.$get().catch(returnNull);
    if (turn !== null) setTurn(turn.turn);
  }



  useEffect(() => {
    const cancelID = setInterval(fetchBoard, 500);
    const cancelID2 = setInterval(fetchTurn, 500);
    console.log("interval start")
    return () => {
      clearInterval(cancelID2);
      clearInterval(cancelID);
    };
  }, []);

  if (!board || !user) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.container}>
        <div className={styles.pass} />
        <div className={styles.turn}>
          {turn === 1 ? '黒のターン' : '白のターン'}
        </div>
        <div className={styles.board}>
          {board.map((row, y) =>
            row.map((color, x) => (
              <div className={styles.cell} key={`${x}-${y}`} onClick={() => onClick(x, y)}>
                <div
                  className={styles.stone}
                  style={{
                    background:
                      color === -1
                        ? 'transparent'
                        : color === 1
                        ? '#000000e4'
                        : color === 2
                        ? '#fffffff2'
                        : '#0400ff5c',
                    height: color === 0 ? '20%' : '80%',
                    width: color === 0 ? '20%' : '80%',
                  }}
                />
              </div>
            ))
          )}
        </div>
        <div className={styles.black}>黒:2個</div>
        <div className={styles.white}>白:2個</div>
      </div>
    </>
  );
};

export default Home;
