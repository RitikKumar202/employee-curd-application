import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import _ from "lodash";

const pageSize = 2;

const HomePage = () => {
    const [data, setData] = useState([]);
    const [paginatedPosts, setPaginatedPosts] = useState();
    const [currPage, setCurrPage] = useState(1);

    const loadData = async () => {
        const res = await axios.get("/api/getEmployee");
        setData(res.data);
        setPaginatedPosts(_(res.data).slice(0).take(pageSize).value());
    }

    useEffect(() => {
        loadData();
    }, []);

    const deleteEmployeeDetail = (id) => {
        axios.delete(`/api/delete/${id}`);
        alert("Employee Details Deleted Successfully");
        setTimeout(() => loadData(), 300);
    }

    const pageCount = data ? Math.ceil(data.length / pageSize) : 0;
    const pages = _.range(1, pageCount + 1);

    const handlePagination = (pageNo) => {
        setCurrPage(pageNo);
        const startIndex = (pageNo - 1) * pageSize;
        const paginatedPost = _(data).slice(startIndex).take(pageSize).value();
        setPaginatedPosts(paginatedPost);
    }

    return (
        <>
            <div className="container">
                <h1 >All Employee Contact Details</h1>
                <div className="add-details">
                    <Link className="btn" to="/add-employee-details">Add Employee Details</Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Employee Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Job Title</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedPosts?.map((item, i) => {
                            return (
                                <tr key={item.id}>
                                    <th scope='row'>{i + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.jobTitle}</td>
                                    <td>
                                        <Link to={`/view/${item.id}`} className="btn view">View Full Details</Link>
                                        <Link to={`/update/${item.id}`} className="btn edit">Update</Link>
                                        <Link className='btn delete' onClick={() => deleteEmployeeDetail(item.id)}>Delete</Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className="pagination">
                    <div className="pagination-main">
                        {
                            pages.map((page) => (
                                <div className={
                                    page === currPage ? "page active" : "page"
                                } onClick={() => handlePagination(page)}>
                                    {page}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage