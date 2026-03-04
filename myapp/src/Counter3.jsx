import { useEffect, useState } from "react"

export default function Counter3() {
    // 초기값이 0인 count 상태 선언 및 초기화
    const [ count, setCount ] = useState(0);

    useEffect(() => console.log('Helo from useEffect'), [count])

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