// Importing the modules
import React, {useEffect} from 'react'
import { Button, Table } from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'

// Importing the actions to be dispatch
import {deleteUser, listUsers} from '../actions/userActions'

// Importing the components
import Loader from '../components/Loader'
import Message from '../components/Message'

const UserListPage = ({history}) => {
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const {users, error, loading} = userList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const {success: successDelete} = userDelete

    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        }else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo, successDelete])

    const deleteHandler = (id) => {
        if(window.confirm('The User will be Deleted Permanentaly. Are you sure?')) {
            dispatch(deleteUser(id))
        }
    }

    return (
        <div>
            <h1>Users</h1>
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIl</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td><a href={`mailto: ${user.email}`}>{user.email}</a></td>
                                <td>{
                                        user.isAdmin  
                                        ?(<i className="fas fa-check" style={{color: 'green'}}></i>) 
                                        : (<i className="fas fa-times" style={{color: 'red'}}></i>)
                                    }
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button variant='light' className="btn-sm">
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(user._id)}>
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default UserListPage
