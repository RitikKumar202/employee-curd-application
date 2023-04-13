import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const EmployeeFullDetails = () => {
    const [employee, setEmployee] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`/api/getEmployee/${id}`).then((res) => setEmployee({ ...res.data[0] }));
    }, [id]);

    return (
        <>
            <h1>{employee.name} Full Details</h1>
            <div className="container">
                <div className="card">
                    <div className="card-detail">
                        <h3>Employee Name : <span className='card-item'>{employee.name}</span></h3>
                        <h3>Email : <span className='card-item'>{employee.email}</span></h3>
                        <h3>Phone Number : <span className='card-item'>{employee.phone}</span></h3>
                        <h3>Job Title : <span className='card-item'>{employee.jobTitle}</span></h3>
                        <h3>Address : <span className='card-item'>{employee.address}</span></h3>
                        <h3>City : <span className='card-item'>{employee.city}</span></h3>
                        <h3>State : <span className='card-item'>{employee.state}</span></h3>
                        <h2>Primary Details</h2>
                        <h3>Name : <span className='card-item'>{employee.pName}</span></h3>
                        <h3>Contact Number : <span className='card-item'>{employee.pContact}</span></h3>
                        <h3>Relationship : <span className='card-item'>{employee.pRelation}</span></h3>
                        <h2>Secondary Details</h2>
                        <h3>Name : <span className='card-item'>{employee.sName}</span></h3>
                        <h3>Contact Number : <span className='card-item'>{employee.sContact}</span></h3>
                        <h3>Relationship : <span className='card-item'>{employee.sRelation}</span></h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmployeeFullDetails