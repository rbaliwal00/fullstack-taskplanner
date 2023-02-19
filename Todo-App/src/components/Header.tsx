import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import { auth, saveUsername } from '../redux/user/userSlice';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { loginApiService, logoutApiService } from '../api/AuthenticationApiService';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // const [user, setUser] = React.useState<any>(JSON.parse(localStorage.getItem('user-details') || 'null'));
  //   console.log(user);
  const navigate = useNavigate();


  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {/* {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))} */}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const isAutherised = useAppSelector((state) => state.user.auth);
  const dispatch = useAppDispatch();

  const logout = async () =>{
    const response = await logoutApiService();
    if(response.status == 200){
      localStorage.clear();
      dispatch(auth(false));
      console.log(isAutherised);
    }
    // setUser(null);
  }

  // console.log(user);

  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar component="nav" sx={{ background:"#FFFFFF",  }}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{display: { xs: 'none', sm: 'block' }, marginRight: '80px', marginLeft:'120px',color:'#0886CA' }}
          >
            <a href="https://www.rajanbaliwal.me" className='tracking-widest font-bold text-3xl font-mono'>
              <span className='text-red-600'>Rajan</span> 
              <span className='text-stone-700'> Baliwal</span></a>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block', fontSize:'18px', fontWeight: '800'},flexGrow: 1 }}>
                <Link to={`/welcome`} className='tracking-widest mr-10 text-stone-500'>Home</Link>
                <Link to="/todos" className='tracking-widest hover:text-purple text-stone-500'>Todos</Link>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block', fontSize:'16px', fontWeight: '800'}, mr:'20px'  }}>
                {isAutherised==false && <Box className='bg-cyan-700' sx={{px:'50px',py:'8px', color:'white', borderRadius:'5px' }}>
                    <Link to="/login" className='tracking-widest'>LOGIN</Link>
                </Box>}
                {isAutherised==true &&<Box className='bg-cyan-700' sx={{px:'50px',py:'8px', color:'white', borderRadius:'5px' }}>
                    <Link to="/logout" className='tracking-widest' onClick={logout}>LOGOUT</Link>
                </Box>}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}