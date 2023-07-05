import { useModal } from '@/hook/useModal'
import { ITask } from '@/model'
import { useDeleteTaskByIdMutation } from '@/store/api/trelloApi'
import { formatDate } from '@/utils/formatDate'
import { Button, Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import BasicModal from './BasicModal'
import PaperSharp from './styleComponents/containers/PaperSharp'
import FlexBetween from './styleComponents/FlexBetween'

interface TaskItemProps {
  task: ITask
}

const TaskItem: FC<TaskItemProps> = ({ task }: TaskItemProps) => {

  const [deleteTask] = useDeleteTaskByIdMutation()

  const { isOpen, openModal, closeModal } = useModal();

  const router = useRouter()
  const dataStart = new Date(task.dataStart)
  const formattedDataStart = formatDate(dataStart)

  const dataEnd = new Date(task.dataEnd)
  const formattedDataEnd = formatDate(dataEnd)

  return (
    <PaperSharp sx={{ padding: 2, maxWidth: '360px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>
            {task.name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            start date {formattedDataStart}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            end date {formattedDataEnd}
          </Typography>
        </Grid>
      </Grid>
      <FlexBetween sx={{ pt: 2 }}>
        <Button onClick={openModal}>
          delete
        </Button>
        <BasicModal open={isOpen} title='Do you want delete this task ?' onClose={closeModal}>
          <FlexBetween sx={{ pt: 2 }}>
            <Button type="button" onClick={closeModal}>
              no
            </Button>
            <Button
              onClick={() => deleteTask(task.id)}
              type="button">yes</Button>
          </FlexBetween>
        </BasicModal>
        <Button onClick={() => router.push(`/createtask/${task?.id}?categoryId=null`)}>
          edit
        </Button>
      </FlexBetween>
    </PaperSharp>
  )
}

export default TaskItem