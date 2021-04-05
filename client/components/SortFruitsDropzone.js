import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import './Style/SortFruits.css';

const SortFruitsDropzone = ({ isDropDisabled, foods, id }) => (
  <div className="column col-4">
    <div className="divider" data-content={id.toUpperCase()} />
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
  </div>
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
