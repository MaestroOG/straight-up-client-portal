import React from 'react'

const Container = ({ className, children }) => {
    return (
        <div className='px-2 max-sm:px-0'>
            <div className={`md:ml-1 mt-3 ${className ?? className}`}>{children}</div>
        </div>
    )
}

export default Container