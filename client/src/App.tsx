// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import './App.css'
// import Chat from './pages/chat'
import Dashboard from './pages/dashboard'
// import User from './pages/user'
// import Dashboard from './pages/dashboard'
// import LandingPage from './pages/LandingPage'

function App() {

  return (
    <RecoilRoot>
    {/* <LandingPage /> */}
    <Dashboard/>
    {/* <User/> */}
    {/* <Chat/> */}
    
    {/* // <BrowserRouter>
      // <Routes>
        // <Route path="/" element={}></Route>
        // <Route path="/dashboard" element={<Dashboard/>}></Route> */}
      {/* </Routes> */}

    {/* </BrowserRouter> */}
        </RecoilRoot>
  )
}

export default App
