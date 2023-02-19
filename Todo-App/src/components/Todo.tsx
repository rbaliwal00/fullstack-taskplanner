import { BrowserRouter,Routes, Route, Navigate} from 'react-router-dom';

import LogoutComponent from './LogoutComponent';
import Footer from './Footer';
import ErrorComponent from './ErrorComponent';
import DrawerAppBar from './Header';
import ListTodosComponent from './ListTodosComponent';
import WelcomeComponent from './WelcomeComponent';
import LoginComponent from './LoginComponent';
import { auth } from '../redux/user/userSlice';
import { useAppSelector, useAppDispatch } from '../redux/app/hooks';
import TodoComponent from './TodoComponent';
import SignupComponent from './SignupComponent';
import { useEffect, useState } from 'react';

const AuthenticatedRoutes = ({children}:any) =>{
    const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user-details') || 'null'));
    
    const dispatch = useAppDispatch();
    const isAutherised = useAppSelector((state) => state.user.auth);
    
    useEffect(() => {

    },[isAutherised]);

    if(isAutherised){
        dispatch(auth(true));
        return children;
    }else{
        dispatch(auth(false));
        return <Navigate to="/" />
    }
}

const Todo = () => {
    const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user-details') || 'null'));
    const isAutherised = useAppSelector((state) => state.user.auth);
    
    useEffect(() => {

    },[isAutherised]);
    return (
        <div>
            <BrowserRouter>
                <DrawerAppBar />
                <div className='m-auto text-center'>
                    <Routes>
                        <Route path='/' element={<LoginComponent />}/>
                        <Route path='/login' element={<LoginComponent />}/>
                        <Route path='/signup' element={<SignupComponent />}/>
                            <Route path='/welcome' element={
                                <AuthenticatedRoutes><WelcomeComponent/></AuthenticatedRoutes>
                            }/>
                            <Route path='/todos' element={
                                <AuthenticatedRoutes><ListTodosComponent/></AuthenticatedRoutes>
                            }/>
                            <Route path='todo/:id' element={
                                <AuthenticatedRoutes><TodoComponent/></AuthenticatedRoutes>
                            }/>
                            <Route path='/logout' element={
                                <AuthenticatedRoutes><LogoutComponent/></AuthenticatedRoutes>
                            }/>
                        <Route path='*' element={<ErrorComponent />}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default Todo;