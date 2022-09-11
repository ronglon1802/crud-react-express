import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        gender: 'Male'
    })

    const navigate = useNavigate();

    const onValueChange = (e) => {
        setUser(prev => {
            return {
                ...prev, [e.target.name]: e.target.value
            }
        })
    }

    const addUser = async (event) => {
        event.preventDefault();
        try {
            console.log(user)
            await axios.post('http://localhost:5000/add', user);
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <div>
                <form onSubmit={addUser}>
                    <div>
                        <label>Name</label>
                        <div>
                            <input
                                type="text"
                                value={user.name}
                                onChange={(e) => onValueChange(e)}
                                placeholder="Name"
                                name='name'
                            />
                        </div>
                    </div>
                    <div>
                        <label>Email</label>
                        <div>
                            <input
                                type="text"
                                value={user.email}
                                onChange={(e) => onValueChange(e)}
                                placeholder="Email"
                                name="email"
                            />
                        </div>
                    </div>
                    <div>
                        <label>Gender</label>
                        <div>
                            <div>
                                <select
                                    value={user.gender}
                                    onChange={(e) => onValueChange(e)}
                                    name='gender'
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="control">
                            <button type="submit">
                                Add
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Add