import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";

const Post = ({ post, handleDelete, id, user }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const isOwner = user?.user?._id === post?.user?._id;
  console.log(user);

  return (
    <Paper
      elevation={1}
      sx={{
        backgroundColor: "#1e1e1e",
        borderRadius: 3,
        p: { xs: 2, sm: 3 },
        color: "#f9fafb",
        border: "1px solid rgba(255,255,255,0.08)",
        position: "relative",
        minHeight: { xs: 150, sm: 180 },
      }}
    >
      {/* Delete Button */}
      {isOwner && (
        <IconButton
          size="small"
          sx={{ position: "absolute", top: 8, right: 8, color: "gray" }}
          onClick={() => handleDelete(id)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      )}
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        mb={1.5}
        flexWrap="wrap"
      >
        <Avatar
          sx={{
            width: isSmallScreen ? 40 : 48,
            height: isSmallScreen ? 40 : 48,
          }}
        />
        <Box>
          <Typography
            fontWeight={700}
            fontSize={isSmallScreen ? "1rem" : "1.1rem"}
          >
            {post.user?.username}
          </Typography>
          <Typography
            variant="body2"
            color="gray"
            fontSize={isSmallScreen ? "0.8rem" : "0.9rem"}
          >
            {moment(post.createdAt).fromNow()}
          </Typography>
        </Box>
      </Stack>

      <Typography
        variant="body1"
        fontSize={isSmallScreen ? "0.95rem" : "1.05rem"}
        sx={{ wordWrap: "break-word" }}
      >
        {post.content}
      </Typography>
    </Paper>
  );
};

export default Post;
