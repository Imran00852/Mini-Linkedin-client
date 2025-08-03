import {
  Box,
  Typography,
  Avatar,
  Divider,
  Stack,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useDeletePostMutation,
  useMyPostsQuery,
  useMyProfileQuery,
} from "../redux/apis/api";
import Post from "../components/Post";
import toast from "react-hot-toast";
import { useEffect } from "react";
import axios from "axios";
import { server } from "../constants/config";
import { userNotExists } from "../redux/reducers/auth";

const Profile = () => {
  const navigate = useNavigate();
  const { data: userData } = useMyProfileQuery();

  const { data, isLoading, isError, error } = useMyPostsQuery();
  const posts = data?.posts || [];

  const [deletePost] = useDeletePostMutation();

  const handleDelete = async (id) => {
    try {
      const { data } = await deletePost(id);
      toast.success(data?.msg || "Post deleted successfully!");
    } catch (error) {
      toast.error(error?.data?.msg || "Failed to delete post.");
    }
  };

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`${server}/user/logout`, {
        withCredentials: true,
      });
      toast.success(data?.msg);
      dispatch(userNotExists());
      navigate("/login");
    } catch (error) {
      toast.error(data?.response?.error?.msg);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(
        error?.data?.message || "An error occurred while fetching posts."
      );
    }
  }, [error, isError]);

  return (
    <Box sx={{ px: 3, py: 4 }}>
      {/* Back Button */}
      <Tooltip title="Back to Home">
        <IconButton onClick={() => navigate("/")} sx={{ mb: 2 }}>
          <ArrowBackIcon />
        </IconButton>
      </Tooltip>

      {/* User Info */}
      <Stack spacing={2} alignItems="center">
        <Avatar
          sx={{ width: 100, height: 100, bgcolor: "#1976d2", fontSize: 40 }}
        ></Avatar>

        {/* Username with Logout Icon */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="h5">{userData?.user?.username}</Typography>
          <Tooltip title="Logout">
            <IconButton onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Stack>

        <Typography variant="body1" color="gray">
          {userData?.user?.email}
        </Typography>
      </Stack>

      <Divider sx={{ my: 4, bgcolor: "#555" }} />

      {/* User Posts */}
      <Typography variant="h5" gutterBottom textAlign={"center"}>
        My Posts
      </Typography>

      <Stack spacing={3}>
        {isLoading ? (
          <CircularProgress />
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <Post
              user={userData}
              key={post._id}
              id={post._id}
              post={post}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <Typography
            variant="h6"
            textAlign={"center"}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "GrayText",
              height: "50vh",
            }}
          >
            No Posts Yet!
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default Profile;
