// src/App.js

import { useRecoilState } from 'recoil';
import { counterAtom } from './atoms/counterAtom';

function App() {
    const [count, setCount] = useRecoilState(counterAtom);

    const increment = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <h1>현재 카운트: {count}</h1>
            <button onClick={increment}>증가</button>
        </div>
    );
}

export default App; // App 컴포넌트를 export
