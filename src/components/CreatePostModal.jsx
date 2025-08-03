import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Avatar,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../redux/reducers/misc";
import { useState } from "react";
import { useCreatePostMutation } from "../redux/apis/api";
import toast from "react-hot-toast";

const CreatePostModal = () => {
  const [content, setContent] = useState("");

  const disptach = useDispatch();
  const { openModal } = useSelector((state) => state.misc);
  const { user } = useSelector((state) => state.auth);

  const handleClose = () => {
    disptach(toggleModal());
    setContent("");
  };

  const [createPost] = useCreatePostMutation();

  const handleSubmit = async () => {
    if (content.trim() === "") return;
    try {
      const { data } = await createPost({ content });
      toast.success(data?.msg || "Post created successfully!");
      handleClose();
    } catch (error) {
      toast.error(error?.data?.msg || "Failed to create post.");
    }
  };

  return (
    <Modal open={openModal}>
      <Box
        sx={{
          maxWidth: 500,
          width: "90%",
          bgcolor: "#1e1e1e",
          color: "#f9fafb",
          borderRadius: 3,
          p: 3,
          mx: "auto",
          mt: "10%",
          boxShadow: 24,
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Typography variant="h6" mb={2}>
          Create Post
        </Typography>

        <Stack direction="row" spacing={2} mb={2} alignItems="center">
          <Avatar />
          <Typography fontWeight={600}>{user?.username}</Typography>
        </Stack>

        <TextField
          multiline
          minRows={4}
          fullWidth
          placeholder="What's on your mind?"
          variant="outlined"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          InputProps={{
            sx: {
              backgroundColor: "#2e2e2e",
              borderRadius: 2,
              color: "#f9fafb",
            },
          }}
        />

        <Stack direction="row" justifyContent="flex-end" spacing={2} mt={3}>
          <Button onClick={handleClose} variant="text" sx={{ color: "gray" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={content.trim() === ""}
          >
            Post
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default CreatePostModal;
