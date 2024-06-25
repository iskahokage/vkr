import { FC } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks'

const ProtectedRouteUser: FC = () => {
    const {user} = useAppSelector(({auth}) => auth)
    return(
        user?.accessToken ? <Outlet/> : <Navigate to="/"/>
    )
}

export default ProtectedRouteUser