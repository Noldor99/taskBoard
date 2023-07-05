import { useState, ChangeEvent, FormEvent } from 'react';
import { Box, TextField, Button, Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { useTypedSelector } from '@/hook/useTypedSelector';
import { useCreateCategoryMutation, useUpdateCategoryByIdMutation } from '@/store/api/trelloApi';
import { IUpdateCategoryDto } from '@/model';

const initialState: IUpdateCategoryDto = {
  title: '',
};

const CreateHeroPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const categoryId = typeof id === 'string' ? parseInt(id) : id;

  const { categories } = useTypedSelector(state => state.trell);
  const heroesEdit = categories.find((item: ICategory) => item.id === categoryId);

  const [formData, setFormData] = useState<ICreateHero>(() => {
    const newState = detectForm(categoryId, initialState, heroesEdit);
    return newState;
  });

  function detectForm(id: number | undefined, f1: ICategory, f2: ICategory | undefined): ICategory | ICategory {
    if (id === 'ADD' || f2 === undefined) {
      return f1;
    }
    return f2;
  }

  const [createCategoryMutation] = useCreateCategoryMutation();
  const [updateCategoryMutation] = useUpdateCategoryByIdMutation();

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (id === 'ADD') {
      await createCategoryMutation(formData as ICategory);
    } else {
      await updateCategoryMutation({ id: categoryId, dto: formData as ICategory });
    }

    try {
      setFormData(initialState);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <Box maxWidth={400} margin="auto">
      <h1>{detectForm(id, 'Add New Hero', 'Edit Hero')}</h1>
      <form onSubmit={handleFormSubmit}>
        <TextField
          label="Nickname"
          name="nickname"
          value={formData?.nickname}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Real Name"
          name="real_name"
          value={formData?.real_name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Origin Description"
          name="origin_description"
          value={formData?.origin_description}
          onChange={handleInputChange}
          fullWidth
          multiline
          margin="normal"
        />
        <TextField
          label="Catch Phrase"
          name="catch_phrase"
          value={formData?.catch_phrase}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <Stack spacing={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {detectForm(id, "Save Hero", "Edit Hero")}
          </Button>
          <Button variant="outlined" color="primary" fullWidth onClick={() => router.back()}>
            Back
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default CreateHeroPage;
