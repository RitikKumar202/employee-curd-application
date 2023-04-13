import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import EmployeeForm from './pages/EmployeeForm';
import EmployeeFullDetails from './pages/EmployeeFullDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/add-employee-details' element={<EmployeeForm />} />
        <Route path='/update/:id' element={<EmployeeForm />} />
        <Route path='/view/:id' element={<EmployeeFullDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
