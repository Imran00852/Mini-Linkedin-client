import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Stack,
  Divider,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Post from "../components/Post";
import {
  useAllPostsQuery,
  useDeletePostMutation,
  useMyProfileQuery,
} from "../redux/apis/api";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../redux/reducers/misc";
import CreatePostModal from "../components/CreatePostModal";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const disptach = useDispatch();
  const navigate = useNavigate();

  const handleOpenCreatePost = () => {
    disptach(toggleModal());
  };

  const { data, isLoading, isError, error } = useAllPostsQuery();
  const { data: userData } = useMyProfileQuery();

  const posts = data?.posts || [];

  useEffect(() => {
    if (isError) {
      toast.error(
        error?.data?.message || "An error occurred while fetching posts."
      );
    }
  }, [error, isError]);

  return (
    <Box sx={{ px: 2, py: 3 }}>
      {/* Top Navigation Icons */}
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Tooltip title="Home" arrow>
          <IconButton color="primary" onClick={() => navigate("/")}>
            <HomeIcon fontSize="large" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Create Post" arrow>
          <IconButton color="primary" onClick={handleOpenCreatePost}>
            <AddBoxIcon fontSize="large" />
          </IconButton>
        </Tooltip>
        <Link to={"/profile"}>
          <Tooltip title="Profile" arrow>
            <IconButton color="primary">
              <AccountCircleIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Link>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="h5" gutterBottom color="#fff">
        All Posts
      </Typography>

      <Stack spacing={3}>
        {isLoading ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            width="100vw"
          >
            <CircularProgress size={120} />
          </Box>
        ) : (
          <>
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <Post
                  key={post._id}
                  id={post._id}
                  post={post}
                  user={userData?.user}
                />
              ))
            ) : (
              <Typography variant="h3" textAlign={"center"}>
                No Posts Yet!
              </Typography>
            )}
          </>
        )}
      </Stack>
      <CreatePostModal />
    </Box>
  );
};

export default Home;
