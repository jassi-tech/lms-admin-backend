import app from "./app";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`LMS Admin Backend listening on port ${PORT}`);
  console.log(`Forwarding requests to: ${process.env.PERSONAL_BACKEND_URL}`);
});
