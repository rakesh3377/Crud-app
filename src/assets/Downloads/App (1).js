import { Provider } from 'react-redux';
import './App.css';
import Main from './navigater';
import store from './redux/store'
function App() {
  return (
     <Provider store={store}>
    <div className="App">
    <Main/>
    </div>
    </Provider>
  );
}
export default App;