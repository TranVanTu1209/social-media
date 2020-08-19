import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const NullPage = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h3" color="primary">
          404 Error.Page Not Found
        </Typography>
        <Button variant="contained" color="secondary" component={Link} to="/">
          Go back Home
        </Button>
      </CardContent>
    </Card>
  )
}

export default NullPage;
