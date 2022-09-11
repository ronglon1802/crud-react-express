import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        gender: 'Male'
    })

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getUserById();
    }, []);

    const getUserById = async () => {
        const { data } = await axios.get(`http://localhost:5000/edit/${id}`);
        setUser(data)
    };

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/edit/${id}`, user);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };
    const onValueChange = (e) => {
        setUser(prev => {
            return {
                ...prev, [e.target.name]: e.target.value
            }
        })
    }

    return (
        <div>
            <div>
                <form onSubmit={updateUser}>
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
                                Update
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit;
