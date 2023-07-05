import { Button, Container, Grid, Toolbar, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLazyGetCategoryByIdQuery } from '@/store/api/trelloApi';
import FlexBetween from '@/components/styleComponents/FlexBetween';
import { parseQueryId } from '@/utils/parseQueryId';
import MainLayout from '@/layouts/MainLayout';
import TaskList from '@/components/TaskList';


const СategoryInfo = () => {
  const router = useRouter();
  const { id } = router.query;

  const [fetchCategory, { data: category }] = useLazyGetCategoryByIdQuery();


  useEffect(() => {
    if (id) {
      const categoryId = parseQueryId(id);
      fetchCategory(categoryId);
    } else {
      console.log('incorrect id')
    }
  }, [fetchCategory, id]);

  return (
    <MainLayout>

      <FlexBetween sx={{ pt: 2 }}>
        <Typography>
          {category?.title}
        </Typography>
        <Button onClick={() => router.push(`/createtask/ADD?categoryId=${category?.id}`)}>
          Add task
        </Button>
      </FlexBetween>
      <TaskList tasks={category?.tasks} />
      <Button onClick={() => router.back()} sx={{ pb: 2 }}>Back</Button>
    </MainLayout>
  );
};

export default СategoryInfo;
