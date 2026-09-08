import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './login.jsx'
import Signup from './signup.jsx'
import Settlement from './settlemen.jsx'
import PromiseMain from './promiseMain.jsx'

function App() {
    return (
        <BrowserRouter>
            <Routes>    
                <Route path="/" element={<Navigate to="/PromiseMain" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/settlement" element={<Settlement />} />
                <Route path="/promiseMain" element={<PromiseMain />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App