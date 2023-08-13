import React from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

interface Task {
     id: string;
     content: string;
}

interface Column {
     id: string;
     title: string;
     tasks: Task[];
}

const columns: Record<string, Column> = {
     todo: {
          id: 'todo',
          title: 'To Do',
          tasks: [
               { id: 'task1', content: 'Complete feature A' },
               { id: 'task2', content: 'Review pull request' },
          ],
     },
     inProgress: {
          id: 'inProgress',
          title: 'In Progress',
          tasks: [
               { id: 'task3', content: 'Debug issue B' },
               { id: 'task4', content: 'Implement API endpoint' },
          ],
     },
     done: {
          id: 'done',
          title: 'Done',
          tasks: [
               { id: 'task5', content: 'Write unit tests' },
               { id: 'task6', content: 'Document code changes' },
          ],
     },
};

const KanbanBoard: React.FC = () => {
     const onDragEnd = (result: DropResult) => {
          // Handle the drag and drop logic here
     };

     return (
          <DragDropContext onDragEnd={onDragEnd}>
               <div className="board-container">
                    {Object.values(columns).map((column) => (
                         <Droppable key={column.id} droppableId={column.id}>
                              {(provided) => (
                                   <div
                                        className="column-container"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                   >
                                        <h3 className="column-title">{column.title}</h3>
                                        {column.tasks.map((task, index) => (
                                             <Draggable key={task.id} draggableId={task.id} index={index}>
                                                  {(provided, snapshot) => (
                                                       <div
                                                            className={`task-card ${snapshot.isDragging ? 'is-dragging' : ''}`}
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                       >
                                                            <h4>{task.content}</h4>
                                                            <p>Additional details here...</p>
                                                       </div>
                                                  )}
                                             </Draggable>
                                        ))}
                                        {provided.placeholder}
                                   </div>
                              )}
                         </Droppable>
                    ))}
               </div>
          </DragDropContext>
     );
};

export default KanbanBoard;
