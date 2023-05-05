import { useState, useEffect } from 'react';
import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  const [text, setText] = useState('');
  const [history, setHistory] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted text:', text);
    setHistory((prevHistory) => [...prevHistory, text]);
    setText('');

    fetch('https://localhost/learn/clipnetlify.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: text })
    })
    .then(response => console.log(response))
    .catch(error => console.error(error));
  };

  useEffect(() => {
    const savedHistory = localStorage.getItem('history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <form onSubmit={handleSubmit}>
          <label>
            Enter text:
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
          </label>
          <button type="submit">Submit</button>
        </form>
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
        <ul>
          {history.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </main>

      <Footer />
    </div>
  )
}
