import { useTypedSelector } from '@/hook/useTypedSelector';
import React from 'react';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import PaperSharp from './styleComponents/containers/PaperSharp';
import MenuCartMore from './MenuCartMore';
import { useRouter } from 'next/router';
import { formatDate } from '@/utils/formatDate';

const CategoriesList = () => {
  const { categories } = useTypedSelector((state) => state.trell);

  const router = useRouter();

  return (
    <div>
      {categories?.map((category) => {
        const dateCreated = new Date(category.dateCreated);
        const formattedDate = formatDate(dateCreated);

        return (
          <PaperSharp key={category.id} variant="outlined" sx={{ padding: 2, mb: 3 }}>
            <Grid container justifyContent='space-between' alignContent='center' spacing={2}>
              <Grid item xs={6} sm={3}>
                <Typography variant="h5" component="div">
                  {category.title}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="h5" component="div">
                  {category.tasks.length} tasks
                </Typography>
              </Grid>
              <Grid item alignItems='center' display='flex'>
                <Typography>
                  {formattedDate}
                </Typography>
              </Grid>
              <Grid item>
                <MenuCartMore category={category} />
              </Grid>
              <Grid item>
                <Button
                  variant='outlined'
                  onClick={() => router.push(`categoryInfo/${category.id}}`)}
                >
                  more
                </Button>
              </Grid>
            </Grid>
          </PaperSharp>
        );
      })}
    </div>
  );
};


export default CategoriesList;
