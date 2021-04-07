import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import '../Style/SortFruits.css';

import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';


const SortFruitsDropzone = ({ isDropDisabled, foods, id }) => (
  <Paper variant="outlined">
    {id.toUpperCase()}
    <Divider />
    <Droppable droppableId={id} isDropDisabled={isDropDisabled}>
      {(provided) => {
        return (
          <div
            className="menu food-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {foods.map(({ name }, index) => (
              <Food key={name} name={name} index={index} />
            ))}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  </Paper>
);
const Food = ({ name, index }) => (
  <Draggable key={name} draggableId={name} index={index}>
    {(provided) => {
      return (
        <div
          className="menu-item tile tile-centered"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card style={{width: '6rem', height: '4rem',}} elevation={1} >
              <Avatar
                height={'25'}
                width={'25'}
                src={`./img/${name.toLowerCase().replace(' ', '-')}.jpeg`}
                alt={name}
              />
              <Typography variant='body2' component="p">{name}</Typography>
          </Card>
        </div>
      );
    }}
  </Draggable>
);
export default SortFruitsDropzone;
