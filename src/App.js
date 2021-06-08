import logo from './logo.svg';
import eleclogo from './eleclogo.svg';
import './App.css';
import { Bell } from 'react-feather';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="react-logo" alt="logo" />
        <img src={eleclogo} className="electron-logo" alt="logo" />
        <p>This app is build with React and Electron together<br></br>Click below for a Push Notification</p>
        <button onClick={() => {
          window.electron.notificationApi.sendNotification('Custom notification!');
        }}>
          <Bell />
        </button>
      </header>
    </div>
  );
}

export default App;
