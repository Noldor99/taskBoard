import MainLayout from '@/layouts/MainLayout';
import { useCreateTaskMutation, useGetTaskByIdQuery, useUpdateTaskByIdMutation } from '@/store/api/trelloApi';
import { parseQueryId } from '@/utils/parseQueryId';
import { Button, FormGroup, Grid, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';



const CreateTask = () => {
  const router = useRouter();
  const { query } = router;
  const categoryId = query.categoryId;
  const taskId = query.id
  console.log(query)

  let categoryIdParse: number | undefined;
  if (categoryId) {
    categoryIdParse = parseQueryId(categoryId);
  }
  let taskyIdParse: number | any;
  if (taskId) {
    taskyIdParse = parseQueryId(taskId);
  }

  const initialState = {
    name: '',
    description: '',
    dataStart: format(new Date(), 'yyyy-MM-dd'),
    dataEnd: format(new Date(), 'yyyy-MM-dd'),
    categoryId: categoryIdParse || 0,
  }


  const { data: taskEdit, isLoading: isTaskLoading } = useGetTaskByIdQuery(taskyIdParse, {});

  console.log(taskEdit)

  function detectForm(id: any, f1: any, f2: any) {
    if (id === 'ADD') {
      return f1;
    }
    return f2;
  }

  const [formData, setFormData] = useState<any>(() => {
    const newState = detectForm(taskId, initialState, taskEdit)

    return newState
  });

  useEffect(() => {
    if (!isTaskLoading && taskEdit) {

      const formattedDataStart = format(new Date(taskEdit.dataStart), 'yyyy-MM-dd');
      const formattedDataEnd = format(new Date(taskEdit.dataEnd), 'yyyy-MM-dd');

      // @ts-ignore
      setFormData(prevFormData => ({
        ...prevFormData,
        dataStart: formattedDataStart,
        dataEnd: formattedDataEnd
      }));
    }
  }, [isTaskLoading, taskEdit]);

  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskByIdMutation()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (taskId === 'ADD') {
        await createTask(formData);
      } else {

        console.log("d")
        await updateTask({ id: taskyIdParse, dto: formData })
      }
      router.back()
    } catch (error) {
      // Handle error
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <MainLayout>
      <form onSubmit={handleSubmit}>
        <FormGroup sx={{ gap: 2, pt: 2 }}>
          <TextField
            variant="standard"
            name="name"
            label="Name"
            value={formData?.name}
            onChange={handleChange}
            fullWidth
            required
            focused
          />
          <TextField
            name="description"
            label="Description"
            variant="standard"
            value={formData?.description}
            onChange={handleChange}
            fullWidth
            required
            focused
          />
          <Grid container justifyContent='space-between'>
            <Grid item sm={6}
              display='flex'
              alignItems='center'
              pl={2}
            >
              <Typography>start date</Typography>
            </Grid>
            <Grid item sm={6}>
              <TextField
                variant="standard"
                name="dataStart"
                label="Start Date"
                type="date"
                value={formData?.dataStart}
                onChange={handleChange}
                fullWidth
                required
                focused
              />
            </Grid>
          </Grid>
          <Grid container justifyContent='space-between'>
            <Grid item sm={6}
              display='flex'
              alignItems='center'
              pl={2}>
              <Typography>end date</Typography>
            </Grid>
            <Grid item sm={6}>
              <TextField
                variant="standard"
                name="dataEnd"
                label="End Date"
                type="date"
                value={formData?.dataEnd}
                onChange={handleChange}
                fullWidth
                required
                focused
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            {detectForm(taskId, 'Create Task', 'Updte Task')}

          </Button>
        </FormGroup>
      </form>
    </MainLayout>
  );
};

export default CreateTask;
