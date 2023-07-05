import { Box, Button } from '@mui/material'
import { useEffect } from 'react'
import Pagination from '@mui/material/Pagination';
import useWindowDimensions from '../hook/useWindowDimensions';
import MainLayout from '@/layouts/MainLayout';
import { useTypedSelector } from '@/hook/useTypedSelector';
import ButtonBlueBack from '@/components/styleComponents/ButtonBlueBack';
import { useCreateCategoryMutation, useGetAllCategoriesQuery, useLazyGetCategoriesPaginationQuery } from '@/store/api/trelloApi';
import CategoriesList from '@/components/CategoriesList';
import { useTypedDispatch } from '@/hook/useTypedDispatch';
import BasicModal from '@/components/BasicModal';
import { useModal } from '@/hook/useModal';
import FlexBetween from '@/components/styleComponents/FlexBetween';


const Home = () => {

  const { totalPage } = useTypedSelector(state => state.trell);
  const { currentPage } = useTypedSelector(state => state.filter);
  const { setCurrentPageAction } = useTypedDispatch()
  const { isOpen, openModal, closeModal } = useModal();

  const { width } = useWindowDimensions();

  const [fetchReposAll, { isLoading }] = useLazyGetCategoriesPaginationQuery()
  const [fetchNewCategory] = useCreateCategoryMutation()
  useGetAllCategoriesQuery(null, {});

  useEffect(() => {
    fetchReposAll({ page: currentPage, limit: 4 })
  }, [currentPage, fetchReposAll]);

  return (
    <MainLayout>

      <Box sx={{ pt: 2, pb: 2 }} >
        <ButtonBlueBack
          sx={{ mb: 2 }}
          fullWidth
          onClick={openModal}
        >
          Create Category
        </ButtonBlueBack>
        <BasicModal open={isOpen} title='Do you want create new ?' onClose={closeModal}>
          <FlexBetween sx={{ pt: 2 }}>
            <Button type="button" onClick={closeModal}>
              no
            </Button>
            <Button
              onClick={() => fetchNewCategory({ title: 'NewCategory' })}
              type="button">yes</Button>
          </FlexBetween>
        </BasicModal>
        <CategoriesList />

        <Pagination
          size={width < 768 ? 'small' : 'medium'}
          page={currentPage}
          onChange={(e, p) => setCurrentPageAction(p)}
          count={totalPage}
          color="primary" />
      </Box>

    </MainLayout >
  )
}

export default Home
