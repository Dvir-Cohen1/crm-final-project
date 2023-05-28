import React from 'react'
import { UpCircleTwoTone, DownCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';

const PriorityTags = ({ priorityTitle }: { priorityTitle: string }) => {
     let component;
     const lowerPriorityString = String(priorityTitle).toLowerCase()

     const HighPriorityComponent = () => {
          return (
               <>
                    <UpCircleTwoTone twoToneColor={'#FF5630'} style={{ fontSize: '16px', marginRight: "0.5rem" }} />
                    High
               </>
          )
     }
     const MediumPriorityComponent = () => {
          return (
               <>
                    <MinusCircleTwoTone twoToneColor={'#FFAB00'} style={{ fontSize: '16px', marginRight: "0.5rem" }} />
                    Medium
               </>
          )
     }
     const LowPriorityComponent = () => {
          return (
               <>
                    <DownCircleTwoTone twoToneColor={'#2684FF'} style={{ fontSize: '16px', marginRight: "0.5rem" }} />
                    Low
               </>
          )
     }

     switch (lowerPriorityString) {
          case "high":
               component = <HighPriorityComponent />
               break;

          case "medium":
               component = <MediumPriorityComponent />
               break;

          case "low":
               component = <LowPriorityComponent />
               break;

          default:
               break;
     }
     return (
          <div>{component}</div>
     )
}

export default PriorityTags