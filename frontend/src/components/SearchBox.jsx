import React, {useState} from 'react'
import {Form , Button} from 'react-bootstrap'

const SearchBox = ({history}) => {
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }

    return (
        <div>
            <Form onSubmit={submitHandler} className="d-flex mt-1" >
                <Form.Control style={{borderRadius: 10}} type="text" name="q" onChange={(e) => setKeyword(e.target.value)} placeholder="Try Searching Phone.." className="mr-sm-2 ml-sm-5" ></Form.Control>
                <Button style={{borderRadius: 10, marginLeft: 5}}  type="submit" variant="outline-light" className="p-2">
                    Search
                </Button>
            </Form>
        </div>
    )
}

export default SearchBox
