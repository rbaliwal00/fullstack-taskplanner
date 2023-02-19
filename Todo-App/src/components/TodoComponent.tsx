import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createTodoApi, retrieveTodoApi, updateTodoApi } from '../api/TodoApiService';
import { useAppSelector } from '../redux/app/hooks';

import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';  
import { Button } from '@mui/material';
import moment from 'moment';
import Theme4 from '../BackgroundTheme/Theme4';
import Theme5 from '../BackgroundTheme/Theme5';
import Theme from '../BackgroundTheme/Theme';

const TodoComponent = () => {
    const username = useAppSelector((state) => state.user.username);
    const id:any = useParams();
    const [value, setValue] = React.useState<Dayjs | null>(null);   
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user-id') || 'null'));
    const navigate = useNavigate();

    useEffect(() =>{
        retrieveTodos();
    },[id]);
    
    const retrieveTodos =() => {
         retrieveTodoApi(user.id,id.id)
            .then((res) => {
                setDescription(res.data.description);
                setValue(res.data.targetDate);
            })
            .catch(err => console.log(err));
    }

    const handleSubmit = (event:any) =>{
        event.preventDefault();
        if(description.length < 5){
            return setErrorMessage('Enter at least 5 characters for Description')
        }

        if(value == null){
            return setErrorMessage('Enter a target date');
        }

        const todo = {
            id: id.id,
            username: username,
            description: description,
            targetDate: value,
            done: false
        }

        if(id !== -1){
            createTodoApi(user.id,todo)
            .then((res) => {
                navigate('/todos');
            })
            .catch(err => console.log(todo));
        }else{
            updateTodoApi(user.id,todo)
            .then((res) => {
                navigate('/todos');
            })
            .catch(err => console.log(todo));
        }
    }

    return (
        <div>
            <Theme />
            <div style={{paddingBottom:'30px', width:'40%', margin: 'auto', borderRadius: '5px'}} className='bg-slate-100'>
            <h1 className='pt-10 text-3xl font-bold'>Enter Todo Details</h1>
            {errorMessage && <div>{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className='mt-10 mb-16'>
                    <label className='block'>Description</label>
                    <input style={{width: "58%", 
                        margin: "auto", 
                        paddingTop: "10px", 
                        border: '1px solid black',
                        padding: "15px", 
                        borderRadius: "3px"}}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div>
                    <label></label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Target Date"
                        className='w-7/12'
                        value={value}
                        onChange={(newValue) => {
                        setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    </LocalizationProvider>
                </div>
                <button className='bg-cyan-700 mt-10' 
                    style={{paddingLeft:'50px',paddingTop:'8px', paddingRight: '50px', paddingBottom:'8px',
                     color:'white', borderRadius:'5px',width:'200px' }}>Save</button>
            </form>
            </div>
        </div>
    );
};

export default TodoComponent;