import React from 'react'
import { CardContent, Typography, Button } from '@mui/material'
import CategoryName from './CategoryName'
import CategoryButton from './CategoryButton'

const CardContentCom = ({ item }) => {
    return (
        <div>
            <CardContent className='cardconten' sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: '0',
                left: '0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'



            }}>
                {/* <CategoryName item={item} /> */}
                {/* <CategoryButton /> */}
                </CardContent>
        </div>
    )
}

export default CardContentCom
