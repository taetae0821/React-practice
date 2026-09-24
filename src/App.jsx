import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './login.jsx'
import Signup from './signup.jsx'
import Settlement from './settlemen.jsx'
import PromiseMain from './promiseMain.jsx'
import RollingCalendar from './RollingCalendar.jsx'

function App() {
    return (
        <BrowserRouter>
            <Routes>    
                <Route path="/" element={<Navigate to="/promiseMain" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/settlement" element={<Settlement />} />
                <Route path="/promiseMain" element={<PromiseMain />} />
                <Route path="/RollingCalendar" element={<RollingCalendar />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App