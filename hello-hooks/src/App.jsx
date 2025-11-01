import { useEffect, useMemo, useState } from "react"

function someFunc() {
    console.log("call some func");
    return "some value";
}

export default function App() {
    const [count, setCount] = useState(0);

    const value = someFunc();

    return <div>
        <h1>Count ({ count })</h1>
        <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
}