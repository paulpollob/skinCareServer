const express = require('express')
const tf = require('@tensorflow/tfjs-node');
const tfjsConverter = require('@tensorflow/tfjs-converter');
const fs = require('fs');
const path = require('path');
const cors = require('cors')
const port = process.env.PORT || 5000
const app = express();


app.use(cors());
app.use(express.json());



// Load the model
// const model = tf.loadLayersModel('best_model.h5');
const h5ModelPath = 'path/to/your/best_model.h5';

// console.log("Hk: ", tf.loadModel())

async function loadModel() {
    const url = 'file:///media/pollob/C/SkinCareServer/';
    // Read the .h5 model file from the current directory
    const modelPath = path.resolve(url, 'best_model.h5');
    const modelData = await tf.io.browserFiles.readFile(modelPath, { splitChunks: true });

    // Convert the .h5 model to .json format
    const convertedModel = await tf.io.browserFiles.readFile(modelData, { splitChunks: true });
    const modelJSON = JSON.stringify(convertedModel);
  }
  
  loadModel();
// const modelPath = 'best_model.h5';
//     const modelFile = fs.readFileSync(modelPath);
//     model = tf.loadLayersModel(tf.node.decodeHDF5(new Uint8Array(modelFile)));


// Define the endpoint for receiving and processing images
// app.post('/predict', (req, res) => {
//     const imageData = req.body.image;
//     const imageTensor = tf.image.decodeJpeg(imageData);
//     const image = tf.reshape(imageTensor, [1, 28, 28, 3]);
  
//     // Normalize the image data
//     const imageNormalized = image.cast('float32') / 255.0;
  
//     // Make the prediction
//     const prediction = model.predict(imageNormalized);
  
//     // Get the predicted class and label
//     const predictedClass = tf.argmax(prediction, axis=1).dataSync()[0];
//     const labels = ['actinic keratoses and intraepithelial carcinomae(Cancer)', 'basal cell carcinoma(Cancer)', 'benign keratosis-like lesions(Non-Cancerous)', 'dermatofibroma(Non-Cancerous)', 'melanocytic nevi(Non-Cancerous)', 'pyogenic granulomas and hemorrhage(Can lead to cancer)', 'melanoma(Cancer)'];
//     const predictedLabel = labels[predictedClass];
  
//     // Send the predicted class and label as JSON response
//     res.json({
//       predictedClass,
//       predictedLabel,
//     });
//   });


app.get('/', (req, res)=>{
    res.send("hare Krishna")
})
app.listen(port, ()=>{console.log("hare Krishna from server: ", port)});
