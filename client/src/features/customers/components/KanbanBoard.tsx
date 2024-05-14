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
          id: '1',
          title: 'To Do',
          tasks: [
               { id: 'task1', content: 'Complete feature A' },
               { id: 'task2', content: 'Review pull request' },
          ],
     },
     inProgress: {
          id: '2',
          title: 'In Progress',
          tasks: [
               { id: 'task3', content: 'Debug issue B' },
               { id: 'task4', content: 'Implement API endpoint' },
          ],
     },
     delayed: {
          id: '3',
          title: 'Delayed',
          tasks: [
               { id: 'task3d', content: 'Debug issue B' },
               { id: 'task4s', content: 'Implement API endpoint' },
          ],
     },
     done: {
          id: '4',
          title: 'Done',
          tasks: [
               { id: 'task5', content: 'Write unit tests' },
               { id: 'task6', content: 'Document code changes' },
          ],
     },
};

const KanbanBoard: React.FC = () => {
     const onDragEnd = (result: DropResult) => {
          if (!result.destination) {
               return; // Item was dropped outside a valid droppable area
          }

          // Reorder tasks within the same column
          if (result.source.droppableId === result.destination.droppableId) {
               const column = columns[result.destination.droppableId];
               const newTasks = Array.from(column.tasks) || [];
               const [reorderedTask] = newTasks.splice(result.source.index, 1);
               newTasks.splice(result.destination.index, 0, reorderedTask);

               const updatedColumn = {
                    ...column,
                    tasks: newTasks,
               };

               // Update state or dispatch an action to update your store
               // For example, if you're using Redux with Redux Toolkit:
               // dispatch(updateColumn({ columnId: updatedColumn.id, tasks: newTasks }));
          } else {
               // Moving task from one column to another
               const sourceColumn = columns[result.source.droppableId];
               const destinationColumn = columns[result.destination.droppableId];
               const sourceTasks = Array.from(sourceColumn.tasks);
               const destTasks = Array.from(destinationColumn.tasks);
               const [movedTask] = sourceTasks.splice(result.source.index, 1);
               destTasks.splice(result.destination.index, 0, movedTask);

               const updatedSourceColumn = {
                    ...sourceColumn,
                    tasks: sourceTasks,
               };

               const updatedDestColumn = {
                    ...destinationColumn,
                    tasks: destTasks,
               };

               // Update state or dispatch actions to update columns
               // For example, if you're using Redux with Redux Toolkit:
               // dispatch(updateColumn({ columnId: updatedSourceColumn.id, tasks: sourceTasks }));
               // dispatch(updateColumn({ columnId: updatedDestColumn.id, tasks: destTasks }));
          }
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
