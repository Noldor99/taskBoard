import DeleteIcon from "@mui/icons-material/Delete";
import { MoreVert } from "@mui/icons-material";
import { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useDeleteCategoryByIdMutation } from "@/store/api/trelloApi";
import BasicModal from "./BasicModal";
import EditCategory from "./EditCategory";
import { useModal } from "@/hook/useModal";
import EditIcon from '@mui/icons-material/Edit';

const MenuCartMore = ({ category }: any) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const { isOpen, openModal, closeModal } = useModal();

  const [deleteCategory] = useDeleteCategoryByIdMutation()

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Delete = () => {
    deleteCategory(category.id)
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="menu"
        aria-haspopup="true"
        onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={openModal}>
          <IconButton>
            <EditIcon sx={{ mr: 1 }} />
          </IconButton>
          Edit Category
        </MenuItem>
        <BasicModal open={isOpen} title='Simple' onClose={closeModal} >
          <EditCategory
            closeModal={closeModal}
            category={category} />
        </BasicModal>
        <MenuItem onClick={Delete}>
          <IconButton>
            <DeleteIcon sx={{ mr: 1 }} />
          </IconButton>
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}

export default MenuCartMore