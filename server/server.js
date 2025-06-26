const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const feedbackRoute = require('./routes/feedback');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/feedback', feedbackRoute);

const PORT = 5000;
const MONGODB_URI = "mongodb+srv://deep1234:deep1234@clusterfeed.h6k95xe.mongodb.net/?retryWrites=true&w=majority&appName=ClusterFeed";
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
