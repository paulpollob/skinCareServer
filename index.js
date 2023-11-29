import * as tf from '@tensorflow/tfjs';
const express = require('express');
// const tf = require('@tensorflow/tfjs');
const fs = require('fs');
const path = require('path');
const cors = require('cors')

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Load the model
const model = tf.loadModel('./best_model.h5');



app.get('/', (req, res)=>{
    res.send("Hare Krishna")
})
app.listen(port, ()=>{});

// Define the endpoint for receiving and processing images
app.post('/predict', (req, res) => {
  const imageData = req.body.image;
  const imageTensor = tf.image.decodeJpeg(imageData);
  const image = tf.reshape(imageTensor, [1, 28, 28, 3]);

  // Normalize the image data
  const imageNormalized = image.cast('float32') / 255.0;

  // Make the prediction
  const prediction = model.predict(imageNormalized);

  // Get the predicted class and label
  const predictedClass = tf.argmax(prediction, axis=1).dataSync()[0];
  const labels = ['actinic keratoses and intraepithelial carcinomae(Cancer)', 'basal cell carcinoma(Cancer)', 'benign keratosis-like lesions(Non-Cancerous)', 'dermatofibroma(Non-Cancerous)', 'melanocytic nevi(Non-Cancerous)', 'pyogenic granulomas and hemorrhage(Can lead to cancer)', 'melanoma(Cancer)'];
  const predictedLabel = labels[predictedClass];

  // Send the predicted class and label as JSON response
  res.json({
    predictedClass,
    predictedLabel,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Hare Krishna Server started on port ${port}`);
});