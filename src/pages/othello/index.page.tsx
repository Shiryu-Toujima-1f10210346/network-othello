import type { RoomModel } from '$/commonTypesWithClient/models';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
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
    const roomId = router.query.labels as string;
    await apiClient.rooms.board.$post({ body: { x, y, roomId } });
    await fetchBoard();
    console.table(board);
  };
  const router = useRouter();
  const [user] = useAtom(userAtom);
  const [board, setBoard] = useState<number[][]>();
  const [turn, setTurn] = useState<number>();
  const [roomId, setRoomId] = useState<string>();
  const [black, setBlack] = useState<number>();
  const [white, setWhite] = useState<number>();

  const fetchBoard = async () => {
    const roomId = router.query.labels as string;
    if (roomId === undefined) return;
    const room = await apiClient.rooms.$get({ query: { roomId } }).catch(returnNull);
    console.table(room);
    if (room === null) {
      // const newRoom = await apiClient.rooms.$post();
      // setBoard(newRoom.board);
    } else {
      setBoard(room.board);
    }
    fetchCount(room);
    fetchTurn(room);
  };
  const fetchCount = async (room: RoomModel | null) => {
    setRoomId(room?.id);
    let black = 0;
    let white = 0;
    room?.board.forEach((row) => {
      row.forEach((cell) => {
        if (cell === 1) black++;
        if (cell === 2) white++;
      });
    });
    setBlack(black);
    setWhite(white);
  };
  const fetchTurn = async (room: RoomModel | null) => {
    room?.turn === 1 ? setTurn(1) : setTurn(2);
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
        <div className={styles.black}>黒:{black}個</div>
        <div className={styles.white}>白:{white}個</div>
      </div>
    </>
  );
};

export default Home;
