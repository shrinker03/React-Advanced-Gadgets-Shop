import React from 'react'
import {Helmet} from 'react-helmet'

const Meta = ({title, description, keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keyword" content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome to Gadgets-Shop',
    description: 'One Stop Solution for all your Modern Problems',
    keywords: 'gadgets, electronics, shivam, damre, shivam damre, cheap electronics'
}

export default Meta
