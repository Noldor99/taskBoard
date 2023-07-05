import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { authActions } from "@/store/slice/authSlice";
import { filterActions } from "@/store/slice/filterSlice";
import { trelloActionss } from "@/store/slice/trelloSlice";

const actions = {
  ...authActions,
  ...filterActions,
  ...trelloActionss,
};

export const useTypedDispatch = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
