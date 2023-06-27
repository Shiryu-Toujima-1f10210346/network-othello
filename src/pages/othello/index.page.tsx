import { useAtom } from 'jotai';
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
    await apiClient.rooms.board.$post({ body: { x, y } });
    await fetchBoard();
  };
  const [user] = useAtom(userAtom);
  const [board, setBoard] = useState<number[][]>();
  const [turn, setTurn] = useState<number>();
  const [roomId, setRoomId] = useState<string>();

  const fetchBoard = async () => {
    const board = await apiClient.rooms.$get().catch(returnNull);
    if (board === null) {
      const newRoom = await apiClient.rooms.$post();
      setBoard(newRoom.board);
    } else {
      setBoard(board.board);
    }
    fetchCount();
    fetchTurn();
  };
  const fetchCount = async () => {
    const board = await apiClient.rooms.$get().catch(returnNull);
    setRoomId(board?.id);
    let black = 0;
    let white = 0;
    board?.board.forEach((row) => {
      row.forEach((cell) => {
        if (cell === 1) black++;
        if (cell === 2) white++;
      });
    });

    document.getElementsByClassName(styles.black)[0].innerHTML = `黒:${black}個`;
    document.getElementsByClassName(styles.white)[0].innerHTML = `白:${white}個`;
  };
  const fetchTurn = async () => {
    const response = await apiClient.rooms.board.$get().catch(returnNull);
    console.log(response);
    response === 1 ? setTurn(2) : setTurn(1);
  };

  useEffect(() => {
    const cancelID = setInterval(fetchBoard, 500);

    console.log('interval start');
    return () => {
      clearInterval(cancelID);
    };
  }, []);

  if (!board || !user) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.container}>
        <div className={styles.id}>Room ID: {roomId}</div>
        <div className={styles.pass} />
        <div
          className={styles.turn}
          style={{
            color: turn === 1 ? '#000000e4' : '#fffffff2',
          }}
        >
          {turn === 1 ? '黒' : '白'}
          <span style={{ color: '#000000e4' }}>のターン</span>
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
        <div className={styles.black}>黒:個</div>
        <div className={styles.white}>白:個</div>
      </div>
    </>
  );
};

export default Home;
