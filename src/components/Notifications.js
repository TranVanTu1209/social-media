import React from 'react';
// import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Tooltip from '@material-ui/core/Tooltip';
// import Badge from '@material-ui/core/Badge';
// import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux';
import * as userActions from '../redux/action/userAction';

const Notifications = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const notifications = useSelector(state => state.user.notifications);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    dispatch(userActions.markNotificationsRead());
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Tooltip title="Notifications">
        <IconButton aria-controls="notifications-menu" aria-haspopup="true" onClick={handleClick}>
          <NotificationsIcon color="action" />
        </IconButton>
      </Tooltip>
      <Menu
        id="notifications-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose} >
        {
          notifications && notifications.map(noti => (
            <MenuItem className={noti.read ? 'read' : 'no-read'} key={noti.notificationId} onClick={handleClose}>
              <strong className="textPrimary"> {noti.sender} </strong>  <span>  {noti.type}  </span> your scream
            </MenuItem>
          ))
        }
      </Menu>
    </div>
  )
}

export default Notifications;
