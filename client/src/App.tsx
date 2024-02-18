// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import './App.css'
import Chat from './pages/chat'
// import Chat from './pages/chat'
import Dashboard from './pages/dashboard'
import LandingPage from './pages/LandingPage'
// import User from './pages/user'
// import Dashboard from './pages/dashboard'
// import LandingPage from './pages/LandingPage'

function App() {

  return (
    <RecoilRoot>
      <HashRouter>
    {/* <LandingPage /> */}
    <Routes>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/chat/:roomIds" element={<Chat/>}/>
      <Route path="/" element={<LandingPage/>}/>
    {/* <Dashboard/> */}
        </Routes>
    {/* <User/> */}
    {/* <Chat/> */}
    
    {/* // <BrowserRouter>
      // <Routes>
        // <Route path="/" element={}></Route>
        // <Route path="/dashboard" element={<Dashboard/>}></Route> */}
      {/* </Routes> */}

    {/* </BrowserRouter> */}
      </HashRouter>
        </RecoilRoot>
  )
}

export default App
