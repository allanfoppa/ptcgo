import { Suspense, useContext, useEffect } from 'react';
import './App.css';
import { MainButton } from 'core/MainButton'
import { GlobalContext } from 'core/GlobalContext'
import { Header } from 'core/Header'
import { sum } from 'core/sum'
import { fetchExample } from 'core/fetchExample'
import Dashboard from 'dashboard/Dashboard'

const App = () => {

  const { text, setText }: { text: string, setText: Function } = useContext(GlobalContext);
  useEffect(() => {
    const todo = async () => {
      let text = await fetchExample()
      setText(text.title)
    }
    todo()
  }, [])

  const someSum = sum({ a: 1, b: 22 })

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="content">
        <Header />
        <h1>Rsbuild with React</h1>
        <p>Start building amazing things with Rsbuild.</p>
        <MainButton />
        {someSum}
        <br />
        <p><b>SHELL</b> <br />{text && <> {text}</>}</p>
        <Dashboard />
      </div>
    </Suspense>
  );
};

export default App;
