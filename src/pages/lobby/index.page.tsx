import styles from './index.module.css';

const Home = () => {
  const enterRoom = () => {
    // ルームに入る
  };
  return (
    <>
      <div className={styles.container}>
        <h1>Home</h1>
        {/* lobbyID入力させを送信する */}
        <form>
          <input type="text" />

          <button type="submit" onClick={enterRoom}>
            ルームに入る
          </button>
        </form>
      </div>
      ;
    </>
  );
};

export default Home;
