import React, {Component} from 'react';
import './Styles/App.scss';
import Chat from './Components/Chat';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <span className='icon' />
                    <span>Chatty</span>
                </header>
              <div>
                <Chat/>
              </div>
            </div>
        );
    }
}
export default App;
