import { useEffect, useState } from 'react';
import { Button, EditableText, InputGroup } from '@blueprintjs/core';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    const [users, setUsers] = useState([]);
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newWebsite, setNewWebsite] = useState("");

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json() )
        .then((json) => setUsers(json))
    },[])

    function addUser() {
        const name = newName.trim();
        const email = newEmail.trim();
        const website = newWebsite.trim();

        if (name && email && website) {
            fetch("https://jsonplaceholder.typicode.com/users",
                {
                    method: "POST",
                    body: JSON.stringify({
                        name,
                        email,
                        website
                    }),
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8 "
                    }
                }
            ).then((response) => response.json() )
            .then(data => {
                setUsers([...users, data]);
                toast.success("User added successfully");
                setNewName("");
                setNewEmail("");
                setNewWebsite("");
            })
        } else {
            toast.error("All fields are required!");
        }
    }

    function onChangeHandler(id, key, value) {
        setUsers((users) => {
            return users.map(user => {
                return user.id === id ? {...user, [key]: value } : user;
            })
        })
    }

    function updateUser(id) {
        const user = users.find((user) => user.id === id );
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
                {
                    method: "PUT",
                    body: JSON.stringify(user),
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8 "
                    }
                }
            )
        .then(response => response.json())    
        .then(data => {
                toast.success("User updated successfully");
        })
    }

    function deleteUser(id) {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
        {
            method: "DELETE",
        })
        .then(response => response.json())    
        .then(data => {
                setUsers((users) => {
                    return users.filter(user => user.id !== id)
                })
                toast.success("User deleted successfully");
        })
    }

    return (
        <>
            <ToastContainer />
            <div className="App">
                <table className='table table-bordered text-center'>
                    <thead className='bg-dark text-ligh'>
                        <tr>
                            <th>ID</th> 
                            <th>Name</th>
                            <th>Email</th>
                            <th>Website</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => 
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td><EditableText onChange={value => onChangeHandler(user.id, 'email',  value)} value={user.email} /></td>
                                <td><EditableText onChange={value => onChangeHandler(user.id, 'website',  value)} value={user.website}/></td>
                                <td>
                                    <Button className="btn btn-primary" onClick={() => updateUser(user.id)}>Update</Button>
                                    <Button className='btn btn-danger' onClick={() => deleteUser(user.id)} >Delete</Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td>
                                <InputGroup
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value) }
                                    placeholder='Enter Name...'
                                />
                            </td>
                            <td>
                                <InputGroup
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value) }
                                    placeholder='Enter Email...'
                                />
                            </td>
                            <td>
                                <InputGroup
                                    value={newWebsite}
                                    onChange={(e) => setNewWebsite(e.target.value) }
                                    placeholder='Enter Website...'
                                />
                            </td>
                            <td>
                                <Button className='btn btn-success' onClick={addUser}>Add User</Button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    );
}

export default App;
