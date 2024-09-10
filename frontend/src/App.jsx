import { useRecoilState } from 'recoil';
import { counterAtom } from './atoms/counterAtom';
import styled from 'styled-components';

const CounterDiv = styled.div`
    background-color: tomato;
    font-size: 30px;
    color: white;
`;

function App() {
    const [count, setCount] = useRecoilState(counterAtom);

    const increment = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <CounterDiv>현재 카운트: {count}</CounterDiv>
            <button onClick={increment}>증가</button>
        </div>
    );
}

export default App; // App 컴포넌트를 export
