import React, { useState } from 'react'
import { Button } from 'antd'
import { FaSortAmountDownAlt, FaSortAmountUpAlt, FaSortAmountDown } from "react-icons/fa";

import History from './History';
import Comments from './Comments';
import { NUMBER_OF_HISTORY_TO_DISPLAY_PER_TIME } from '../../constants/main';

const ActivityTabs = ({ comments, history }: any) => {

     // Handle number of items to display
     const [numberOfItems, setNumberOfItems] = useState(NUMBER_OF_HISTORY_TO_DISPLAY_PER_TIME);
     const handleSetOfNumbers = () => {
          if (history.length <= numberOfItems) {
               setNumberOfItems(NUMBER_OF_HISTORY_TO_DISPLAY_PER_TIME);
          } else {
               setNumberOfItems(prev => prev + NUMBER_OF_HISTORY_TO_DISPLAY_PER_TIME);
          }
     }

     // Handle toggle all sections
     const handleToggleAll = () => {
          setShowComments(true);
          setShowHistory(true);
     };

     // Handle toggle Comments section
     const [showComments, setShowComments] = useState(true);
     const handleToggleComments = () => {
          setShowComments(true);
          setShowHistory(false);
     };

     // Handle toggle History section
     const [showHistory, setShowHistory] = useState(false);
     const handleToggleHistory = () => {
          setShowComments(false);
          setShowHistory(true);
     };


     const [isDescending, setIsDescending] = useState(true);
     // Function to handle the click event and reverse the sorting order
     const handleReverseOrder = () => {
          setIsDescending((prevState) => !prevState);
     };
     const sortedHistory = history && isDescending ? [...history].reverse() : history;

     return (
          <section className='md:me-14 mb-5'>
               <h2 className='mb-5'>Activity</h2>

               {/* Activity header */}
               <div className="flex gap-3 place-items-center">
                    <span>Show:</span>
                    <Button
                         size='small'
                         type='ghost'
                         className={`font-semibold custom-ghost-button ${showComments && showHistory ? 'active-activity-button' : ''}`}
                         onClick={handleToggleAll}
                    >
                         All
                    </Button>
                    <Button
                         size='small'
                         type='ghost'
                         className={`font-semibold custom-ghost-button ${showComments ? 'active-activity-button' : ''}`}
                         onClick={handleToggleComments}
                    >
                         Comments
                    </Button>
                    <Button
                         size='small'
                         type='ghost'
                         className={`font-semibold custom-ghost-button ${showHistory ? 'active-activity-button' : ''}`}
                         onClick={handleToggleHistory}
                    >
                         History
                    </Button>
                    <Button
                         style={{ marginLeft: "auto" }}
                         className='font-semibold flex gap-2 place-items-center'
                         title={isDescending ? "Newest first" : "Oldest first"}
                         size='small'
                         type='text'
                         onClick={handleReverseOrder}>
                         {isDescending ? "Newest first" : "Oldest first"}
                         {isDescending ? <FaSortAmountDown /> : <FaSortAmountUpAlt />}
                    </Button>
               </div>


               {(showComments || showHistory) && (
                    // Activity content
                    <div className='my-5 h-64 task-comments-container'>

                         {showComments &&
                              // Comments
                              <>
                                   {showComments && showHistory && <div className='mb-5 font-semibold'>Comments</div>}
                                   <Comments comments={comments} />
                              </>
                         }
                         {showHistory &&
                              // History
                              <>
                                   {showComments && showHistory && history?.length > 0 && <div className='mb-5 font-semibold'>History</div>}
                                   <History
                                        history={sortedHistory}
                                        numberOfItems={numberOfItems}
                                        handleSetOfNumbers={handleSetOfNumbers}
                                        isDescending={isDescending}
                                        handleReverseOrder={handleReverseOrder}
                                   />
                              </>
                         }
                    </div>
               )}

          </section>
     );
}

export default ActivityTabs