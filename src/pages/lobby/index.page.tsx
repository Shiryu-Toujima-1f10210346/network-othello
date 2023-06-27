import { useRouter } from 'next/router';
import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import styles from './index.module.css';
const Home = () => {
  const [label, setLabel] = useState('');
  const router = useRouter();
  const inputLabel = (e: ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };

  const createTask = async (e: FormEvent) => {
    e.preventDefault();
    setLabel('');
    const labels = label;
    // const labels = await apiClient.rooms.$get({ query: { limit: label } });
    console.log(labels); // レスポンスをコンソールに出力

    router.push({
      pathname: '/othello', //URL
      query: { labels }, //検索クエリ
    });

    return labels;
  };
  return (
    <div className={styles.container}>
      <h1>Home</h1>
      {/* lobbyID入力させを送信する */}
      <form style={{ textAlign: 'center', marginTop: '80px' }} onSubmit={createTask}>
        <input value={label} type="text" onChange={inputLabel} />
        <input type="submit" value="入室" />
      </form>
    </div>
  );
};

export default Home;
