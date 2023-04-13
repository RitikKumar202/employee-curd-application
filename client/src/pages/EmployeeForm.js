import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const initialState = {
    name: "",
    email: "",
    phone: "",
    jobTitle: "",
    address: "",
    city: "",
    state: "",
    pName: "",
    pContact: "",
    pRelation: "",
    sName: "",
    sContact: "",
    sRelation: "",
};

const EmployeeForm = () => {
    const [State, setState] = useState(initialState);
    const {
        name,
        email,
        phone,
        jobTitle,
        address,
        city,
        state,
        pName,
        pContact,
        pRelation,
        sName,
        sContact,
        sRelation
    } = State;

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        axios.get(`/api/getEmployee/${id}`).then((res) => setState({ ...res.data[0] }));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !phone || !jobTitle || !address || !city || !state || !pName || !pContact || !pRelation || !sName || !sContact || !sRelation) {
            alert("Please fill the required field");
        }
        else {
            if (!id) {
                axios.post("/api/addEmployee", {
                    name,
                    email,
                    phone,
                    jobTitle,
                    address,
                    city,
                    state,
                    pName,
                    pContact,
                    pRelation,
                    sName,
                    sContact,
                    sRelation,
                }).then(() => {
                    setState({
                        name: "",
                        email: "",
                        phone: "",
                        jobTitle: "",
                        address: "",
                        city: "",
                        state: "",
                        pName: "",
                        pContact: "",
                        pRelation: "",
                        sName: "",
                        sContact: "",
                        sRelation: ""
                    });
                }).catch((err) => alert(err.response.data));
                alert("Employee Added Successfully");
            }
            else {
                axios.put(`/api/update/${id}`, {
                    name,
                    email,
                    phone,
                    jobTitle,
                    address,
                    city,
                    state,
                    pName,
                    pContact,
                    pRelation,
                    sName,
                    sContact,
                    sRelation,
                }).then(() => {
                    setState({
                        name: "",
                        email: "",
                        phone: "",
                        jobTitle: "",
                        address: "",
                        city: "",
                        state: "",
                        pName: "",
                        pContact: "",
                        pRelation: "",
                        sName: "",
                        sContact: "",
                        sRelation: ""
                    });
                }).catch((err) => alert(err.response.data));
                alert("Employee Details Updated Successfully");
            }
            navigate("/");
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({ ...State, [name]: value });
    }

    return (
        <>
            <div className="container">
                <h1>Employee Contact Form</h1>
                <div className="contact-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-item">
                            <label htmlFor='name'>Employee Name* : </label>
                            <input id='name' name='name' type="text" value={name || ""} onChange={handleChange} required />
                        </div>
                        <div className="form-item">
                            <label>Email* : </label>
                            <input id='email' name='email' type="email" value={email || ""} onChange={handleChange} required />
                        </div>
                        <div className="form-item">
                            <label>Phone No* : </label>
                            <input type="tel" id='phone' name='phone' value={phone || ""} onChange={handleChange} required />
                        </div>
                        <div className="form-item">
                            <label>Job Title* : </label>
                            <input type="text" id='jobTitle' name='jobTitle' value={jobTitle || ""} onChange={handleChange} required />
                        </div>
                        <div className="form-item">
                            <label>Address* : </label>
                            <input type="text" id='address' name='address' value={address || ""} onChange={handleChange} required />
                        </div>
                        <div className="form-item">
                            <label>City* : </label>
                            <input type="text" id='city' name='city' value={city || ""} onChange={handleChange} required />
                        </div>
                        <div className="form-item">
                            <label>State* : </label>
                            <input type="text" id='state' name='state' value={state || ""} onChange={handleChange} required />
                        </div>
                        <h2>Primary Emergency Contact</h2>
                        <div className="form-item">
                            <label>Name* : </label>
                            <input type="text" id='pName' name='pName' value={pName || ""} onChange={handleChange} required />
                        </div>
                        <div className="form-item">
                            <label>Primary Phone No* : </label>
                            <input type="tel" id='pContact' name='pContact' value={pContact || ""} onChange={handleChange} required />
                        </div>
                        <div className="form-item">
                            <label>Relationship* : </label>
                            <input type="text" id='pRelation' name='pRelation' value={pRelation || ""} onChange={handleChange} required />
                        </div>
                        <h2>Secondary Emergency Contact</h2>
                        <div className="form-item">
                            <label>Name* : </label>
                            <input type="text" id='sName' name='sName' value={sName || ""} onChange={handleChange} required />
                        </div>
                        <div className="form-item">
                            <label>Secondary Phone No* : </label>
                            <input type="tel" id='sContact' name='sContact' value={sContact || ""} onChange={handleChange} required />
                        </div>
                        <div className="form-item">
                            <label>Relationship* : </label>
                            <input type="text" id='sRelation' name='sRelation' value={sRelation || ""} onChange={handleChange} required />
                        </div>
                        {
                            id ? <button type='submit'>Update Detail</button> : <button type='submit'>Add Detail</button>
                        }
                    </form>
                </div>
            </div>
        </>
    )
}

export default EmployeeForm