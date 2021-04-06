import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import '../Style/SortFruits.css';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

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
          <figure
            style={{ backgroundColor: 'transparent' }}
            className="avatar tile-icon"
          >
            <img
              height={'64'}
              width={'90'}
              src={`./img/${name.toLowerCase().replace(' ', '-')}.jpeg`}
              alt={name}
            />
          </figure>
          <div className="tile-content">{name}</div>
        </div>
      );
    }}
  </Draggable>
);
export default SortFruitsDropzone;
