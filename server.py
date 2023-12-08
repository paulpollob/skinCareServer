
from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras.preprocessing.image import img_to_array
import numpy as np

app = Flask(__name__)
model = tf.keras.models.load_model('./drive/MyDrive/Colab_Notebooks/Models/best_model.h5')


@app.route('/predict', methods=['POST'])
def predict():
    # Receive the image from the request
    image = request.files['image'].read()
    image_array = img_to_array(image)

    # Perform prediction using the loaded model
    prediction = model.predict(np.expand_dims(image_array, axis=0))

    # Process the prediction result
    predicted_class = np.argmax(prediction[0])
    result = {'class': predicted_class}

    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
