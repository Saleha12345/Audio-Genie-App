const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

async function dbConnect() {
  // use mongoose to connect this app to our database on mongoDB using the DB_URL (connection string)
  mongoose
    .connect('mongodb+srv://saleha:saleha1234@cluster0.cftc4dy.mongodb.net/AudioGenie?retryWrites=true&w=majority&appName=Cluster0',
    
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,

      }
    )
    .then(() => {
      console.log("Successfully connected to MongoDB Atlas!");
    })
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas!");
      console.error(error);
    });
  }
 dbConnect();
  const router = express.Router();
  const User = require('./models/User');
  
  app.post('/signup', async (req, res) => {
    try {
      console.log("I am here");
      // Create a new user document using the User model
      const email=req.body.email;
      console.log(req.body);
      const user = await User.findOne({ email });
      if (user) {
        return res.status(404).send('User not found');
      }
      
      const newUser = new User(req.body);
      // Save the user document to the database
      await newUser.save();
      res.status(201).json({ message: 'User signed up successfully!' });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Login endpoint
  app.post('/login', async (req, res) => {
    try {
      console.log("I am here");
      const { email, password } = req.body;
      console.log(req.body);
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      if (password === user.password) {
        if (user.status === 'suspended') {
          return res.status(403).json({ message: 'Your account is suspended. Please contact support for assistance.' });
        }
        console.log("blallal")
        return res.status(200).json({ message: 'Login successful', userData: user });
      } else {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      return res.status(500).json({ message: 'Error logging in' });
    }
  });

  
  app.post('/update', async (req, res) => {
    const { username, email, newPassword } = req.body;

    console.log(username);

    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).send('User not found');
      }
      if (username) {
        user.username = username;
      }
      if (newPassword) {
        user.password = newPassword;
      }

      await user.save();

      res.status(200).send('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).send('Failed to update profile. Please try again.');
    }
  });

  const File = require("./models/Files");
  
app.post("/getFiles", async (req, res) => {
  try {
    const { email } = req.body;

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const files = await File.find({ email });

    if (files.length > 0) {
      // Convert file content to base64 before sending
      const filesWithBase64 = files.map(file => ({
        ...file.toObject(),
        content: file.content.toString('base64')
      }));
      return res.status(200).json(filesWithBase64);
    } else {
      return res
        .status(200)
        .json({ message: "No files found for the provided email", files: [] });
    }
  } catch (error) {
    console.error("Error fetching files:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
function isValidEmail(email) {
  // Regular expression to check email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const Feedback = require('./models/Feedback');

app.post('/submit-feedback', async (req, res) => {
  try {
    const { category, rating, feedback } = req.body;
    const newFeedback = new Feedback({ category, rating, feedback });
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/getsubscription', async (req, res) => {
  try {
    const { email } = req.body;

    const subscription = await User.findOne({ email });
    console.log("here is",subscription.plan);

    if (subscription) {
      res.status(200).json(subscription.plan);
    } else {
      res.status(404).json({ message: 'Subscription not found for the provided email' });
    }
  } catch (error) {
    console.error('Error fetching current subscription:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/update-plan', async (req, res) => {
const { email, newPlan } = req.body;

try {
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  user.plan = newPlan;
  await user.save();

  return res.status(200).json({ message: 'Plan updated successfully', user });
} catch (error) {
  console.error('Error updating plan:', error);
  return res.status(500).json({ error: 'Internal server error' });
}
});

app.post('/cancel-subscription', async (req, res) => {
const { email } = req.body;

try {
  const user = await User.findOneAndUpdate({ email }, { plan: 'None' }, { new: true });

  if (user) {
    res.status(200).json({ message: 'Subscription canceled successfully' });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
} catch (error) {
  console.error('Error canceling subscription:', error);
  res.status(500).json({ error: 'Internal server error' });
}
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
    console.log(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
});
app.get('/active-users', async (req, res) => {
  try {
    const users = await User.find({status : "active"});
    console.log(users);
    res.json(users);
    
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
});

app.get('/monthlyRegistrations', async (req, res) => {
  try {
    const monthlyRegistrations = await User.aggregate([
      {
        $project: {
          month: { $month: '$registrationDate' },
          year: { $year: '$registrationDate' }
        }
      },
      {
        $group: {
          _id: { month: '$month', year: '$year' },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          month: '$_id.month',
          year: '$_id.year',
          count: 1
        }
      }
    ]);
    res.json(monthlyRegistrations);
  } catch (error) {
    console.error('Error fetching monthly registrations:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

app.get('/userCountries', async (req, res) => {
  try {
    const userCountries = await User.aggregate([
      {
        $group: {
          _id: '$country',
          count: { $sum: 1 }
        }
      }
    ]);

    const labels = userCountries.map(country => country._id);
    const data = userCountries.map(country => country.count);

    // console.log('countryyy:', labels, data);
    res.json({ labels, data });
  } catch (error) {
    console.error('Error fetching user countries:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

app.delete('/users/:email', async (req, res) => {
  const email = req.params.email;
  try {
    const deletedUser = await User.findOneAndDelete({ email });
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully', deletedUser });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
  
app.put('/users/:email/status/:newStatus', async (req, res) => {
  const { email, newStatus } = req.params;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.status = newStatus;
    await user.save();
    res.status(200).json({ message: 'User status updated successfully' });
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = app;

// Start the server
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





