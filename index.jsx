const express = require('express');
const multer = require('multer');
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const cors = require('cors')


const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());

const classes = {
  0: 'actinic keratoses and intraepithelial carcinomae(Cancer)',
  1: 'basal cell carcinoma(Cancer)',
  2: 'benign keratosis-like lesions(Non-Cancerous)',
  3: 'dermatofibroma(Non-Cancerous)',
  4: 'melanocytic nevi(Non-Cancerous)',
  5: 'pyogenic granulomas and hemorrhage(Can lead to cancer)',
  6: 'melanoma(Cancer)',
};

// Load the h5 model directly
const h5ModelPath = './drive/MyDrive/Colab_Notebooks/Models/best_model.h5';

let model;

async function loadModel() {
  model = await tf.loadLayersModel(`file://${h5ModelPath}`);
  console.log('Model loaded');
}

loadModel();

// Set up multer for handling file uploads
const upload = multer({ dest: 'uploads/' });

// Define a route to handle image predictions
app.post('/predict', upload.single('image'), async (req, res) => {
  try {
    const imagePath = req.file.path;

    // Load the image
    const image = await loadImage(imagePath);
    const canvas = createCanvas(28, 28);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, 28, 28);

    // Preprocess the image
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const input = tf.tensor(imageData).reshape([1, 28, 28, 4]).toFloat().div(tf.scalar(255.0));

    // Make the prediction
    const prediction = model.predict(input);
    const predictedClass = tf.argMax(prediction.flatten()).arraySync();

    // Get the predicted label
    const label = classes[predictedClass];

    // Send the predicted class as the response
    res.json({ class: predictedClass, label });

    // Clean up - delete the uploaded file
    fs.unlinkSync(imagePath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
