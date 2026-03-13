import { Link, Outlet } from "react-router-dom"

export default function Contact() {

  return ( 
  <>
    <h3>Contact Component</h3>
    <nav>
      <Outlet />  
      <Link to='/contact/seoul'>서울 지점</Link>{' | '}
      <Link to='/contact/busan'>부산 지점</Link>
    </nav>
    <hr />
  </>
  );
}