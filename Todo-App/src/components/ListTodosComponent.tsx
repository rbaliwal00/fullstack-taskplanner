import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { deleteTodoApi, retrieveAllTodosForUserApi } from '../api/TodoApiService';
import { Button, Box } from '@mui/material';
import { useAppSelector } from '../redux/app/hooks';
import Pagination from '@mui/material/Pagination';
import { useNavigate } from 'react-router-dom';
import Theme4 from '../BackgroundTheme/Theme4';

interface Todo{
    id: string;
    username: string;
    description: string;
    targetDate: Date;
    done: boolean;
}

const ListTodosComponent = () => {
    const username = useAppSelector((state) => state.user.username);
    const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user-id') || 'null'));
    const [todos, setTodos] = useState<Todo[] | []>([]);
    const [message, setMessgae] = useState<string|null>(null);
    const [page, setPage] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        refreshTodos();
    },[]);

    const refreshTodos = () =>{
        retrieveAllTodosForUserApi(user.id)
        .then(res => {
            setTodos(res.data);
        })
        .catch(error => console.log(error));
    }

    const deleteTodo = (id:number) =>{
        console.log(id);
        deleteTodoApi(user.id, id)
        .then((res) => {
            setMessgae(`Delete of todo with id - ${id} successful`);
            refreshTodos();
        })
        .catch((error) => {

        })
    }

    const updateTodo = (id:number) =>{
        console.log(id);
        navigate(`/todo/${id}`)
    }

    const addNewTodo = () =>{
        navigate(`/todo/-1`)
    }

    const dateFormatter = (date: any) =>{
        console.log(date);
        return new Date(date[0], date[1], date[2]).toLocaleDateString();
    }

    console.log(page);

    return (
        <div className='md:w-8/12 m-auto'>
            <Theme4 />
            <h1 className='text-4xl mb-10 text-white font-black'>
                Things You Want To Do!
            </h1>
            {message && 
                <Box sx={{
                    background:'rgba(9,167,230,0.8)',
                    borderRadius:'3px',
                    paddingY:'12px',
                    fontSize:'20px', 
                    marginBottom:'30px',
                    color:'white'}}>{message}</Box>}
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" sx={{fontWeight:"800", fontSize:'16px', paddingLeft: '30px'}}>Descripton</TableCell>
                            <TableCell align="center" sx={{fontWeight:"800", fontSize:'16px'}}>Is Done?</TableCell>
                            <TableCell align="center" sx={{fontWeight:"800", fontSize:'16px'}}>Target Date</TableCell>
                            <TableCell align="center" sx={{fontWeight:"800", fontSize:'16px'}}>Update</TableCell>
                            <TableCell align="center" sx={{fontWeight:"800", fontSize:'16px'}}>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {todos.map((todo) => (
                        
                        <TableRow
                        key={todo.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        {/* <TableCell align="center" component="th" scope="row" sx={{marginLeft:'200px'}}>
                            {todo.id}
                        </TableCell> */}
                        
                        <TableCell align="left" style={{paddingLeft: '30px'}}>{todo.description}</TableCell>
                        <TableCell align="center">{todo.done.toString()}</TableCell>
                        
                        <TableCell align="center">{dateFormatter(todo.targetDate)}</TableCell>
                        <TableCell align="center">
                            <Button type = 'submit' 
                                className = 'auth-button' 
                                variant="contained" 
                                style={{ backgroundColor : '#F1B343'}}
                                onClick={() => updateTodo(Number(todo.id))}
                                >
                                    Update
                            </Button>
                        </TableCell>
                        <TableCell align='center'>
                            <Button type = 'submit' 
                                className = 'auth-button' 
                                variant="contained" 
                                style={{ backgroundColor : '#9F1239'}}
                                onClick={() => deleteTodo(Number(todo.id))}
                                >
                                    Delete
                            </Button>
                        </TableCell>
                        </TableRow>
                        
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" onClick={addNewTodo}  
                style={{ 
                    backgroundColor : 'teal', 
                    marginTop: '30px', 
                    marginBottom: '30px'}}>Add New Todo</Button>
        </div>
    )
} 

export default ListTodosComponent;