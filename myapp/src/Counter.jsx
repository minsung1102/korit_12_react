import { useEffect, useState } from "react"

export default function Counter() {
    // 초기값이 0인 count 상태 선언 및 초기화
    const [ count, setCount ] = useState(0);

    useEffect(() => {console.log('첫 번째 렌더링 시에만 useEffect의 callback 함수가 호출됩니다. 나머지는 이 내용이 콘솔에 다시 안나옵니다.')}, []);

    return(
        <div>
            <p>Counter = {count}</p>
            {/* <button onClick={() => setCount(count + 1)}>
                Increment
            </button> */}
            <button onClick={() => setCount(preValue => preValue + 1)}>
                증가
            </button>
        </div>
    );
}