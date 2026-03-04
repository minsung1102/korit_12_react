import MyComponent from './MyComponent';
import AuthContext from './CreateContext';
import './App.css';

function App() {
  const username = 'kim0';

  return (
    <AuthContext.Provider value={username}>
      <MyComponent />
    </AuthContext.Provider>
  )
}
export default App;