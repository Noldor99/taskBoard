import { ICategory, IUpdateCategoryDto } from '@/model';
import { useUpdateCategoryByIdMutation } from '@/store/api/trelloApi';
import { Button, TextField, Typography } from '@mui/material';
import React, { FC, FormEvent, useState } from 'react';
import FlexBetween from './styleComponents/FlexBetween';

interface IEditCategoryProps {
  category: ICategory;
  closeModal: () => void
}

const EditCategory: FC<IEditCategoryProps> = ({ category, closeModal }: IEditCategoryProps) => {
  const [title, setTitle] = useState<string>(category.title);
  const [updateCategory] = useUpdateCategoryByIdMutation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const updatedCategory: IUpdateCategoryDto = {
      title: title,
    };

    updateCategory({ id: category.id, dto: updatedCategory })
      .unwrap()
      .then((data) => {
        console.log('Категорія оновлена', data);
      })
      .catch((error) => {
        console.error('Помилка оновлення категорії', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography sx={{ pt: 2 }}>
        Name
      </Typography>
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)} />
      <FlexBetween sx={{ pt: 2 }}>
        <Button type="button" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </FlexBetween>
    </form>
  );
};

export default EditCategory;
