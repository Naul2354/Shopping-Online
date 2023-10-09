import './App.css'
import React , {Component} from 'react';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import MyProvider from './contexts/MyProvider';
// class App extends Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       message : 'loading...'
//     };
//   }
//   render(){
//     return (
//       <div>
//         <h2>Customer page</h2>
//         <p> {this.state.message}</p>
//       </div>
//     );
//   }
//   componentDidMount(){
//     axios.get('hello').then((res) =>{
//       const result = res.data;
//       this.setState ({message: result.message});
//     });
//   }

// };


class App extends Component {
  render() {
    return (
      <MyProvider>
        <BrowserRouter >
          <Main />
        </BrowserRouter>
      </MyProvider>
    );
  }
}
export default App;