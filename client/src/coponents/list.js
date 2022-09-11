import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function List() {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const { data } = await axios.get('http://localhost:5000/');
        setUsers(data);
    }
    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/delete/${id}`);
            getUsers();
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getUsers();
    }, []);
    return (
        <>
            <Link to='/add' style={{
                border: '1px solid #000',
                padding: '10px 20px',
                display: 'inline-block',
                textDecoration: 'none',
                borderRadius: 5
            }}
            >
                Add user
            </Link>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.gender}</td>
                            <td>
                                <Link to={`edit/${user._id}`}>Edit</Link>
                                <button onClick={() => deleteUser(user._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    );
}

export default List;
