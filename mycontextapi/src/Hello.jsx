import { useContext } from "react";
import AuthContext from "./CreateContext";

export default function Hello() {
    const username = useContext(AuthContext);

    return(
        <>
            안녕하세요, {username}
        </>
    );
}
// 여기까지 작성했을 때 App -> MyComponent로 1단 props Drilling이 이루어졌습니다.