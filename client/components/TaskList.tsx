import { ITask } from '@/model'
import { Grid, Typography } from '@mui/material'
import React, { FC } from 'react'
import PaperSharp from './styleComponents/containers/PaperSharp'
import TaskItem from './TaskItem'

interface TaskListProps {
  tasks?: ITask[]
}


const TaskList: FC<TaskListProps> = ({ tasks }: TaskListProps) => {
  return (
    <>
      <Grid container spacing={2} sx={{ pt: 2, pb: 2 }}>
        {tasks?.map((task: ITask) => {
          return (
            <Grid item key={task.id} xs={6} sm={4}>
              <TaskItem task={task} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}


export default TaskList