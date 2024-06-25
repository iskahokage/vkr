import { FC } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks'

const ProtectedRoute: FC = () => {
    const {user} = useAppSelector(({auth}) => auth)
    return(
        user?.accessToken && user?.role === 'admin' ? <Outlet/> : <Navigate to="/"/>
    )
}

export default ProtectedRoute