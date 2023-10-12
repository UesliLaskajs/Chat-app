import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import UserIdentity from "./components/UserIdentity"
import './App.css'
import ChatRoom from "./components/ChatRoom"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<UserIdentity/>}/>
          <Route path="/chatroom" element={<ChatRoom/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
