from flask import Flask, jsonify, request
import predict
import socket
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from PIL import Image
import numpy as np
import cv2
import PIL

app = Flask(__name__)
@app.route('/')
@app.route('/home')
def home():
  

    # dimensions of our images
    img_width, img_height = 224, 224

    # load the model we saved
    model = load_model('Models/digital-224px-p-dropout-mixed-time-1538100483.model')
    model.compile(loss='binary_crossentropy',
                  optimizer='rmsprop',
                  metrics=['accuracy'])

    # predicting images
    img = image.load_img('inverted12326.jpg', target_size=(img_width, img_height))

    img1 = img.convert('L')
    #input_shape = (224, 224, 1)
    #img_resized = cv2.resize(img,input_shape)
    x = image.img_to_array(img1)
    x = np.expand_dims(x, axis=0)

    images = np.vstack([x])
    classes = model.predict_classes(images, batch_size=10)
    print (classes[0][0])

    


    """Renders the home page."""
    return (
        "Welcome Guest!!!"
    )

@app.route('/check', methods=['POST'])
def get_checks():
    #get url from form
    # url = request.form['url']
    url = request.files['url']
    img_width, img_height = 224, 224

    # load the model we saved
    model = load_model('Models/digital-224px-p-dropout-mixed-time-1538100483.model')
    model.compile(loss='binary_crossentropy',
                  optimizer='rmsprop',
                  metrics=['accuracy'])

    # predicting images
    #img = image.load_img('inverted12326.jpg', target_size=(img_width, img_height))
    img = Image.open(url)

    img = img.resize((img_width, img_height), Image.ANTIALIAS)

    img1 = img.convert('L')
    #input_shape = (224, 224, 1)
    #img_resized = cv2.resize(img,input_shape)
    x = image.img_to_array(img1)
    x = np.expand_dims(x, axis=0)

    images = np.vstack([x])
    classes = model.predict_classes(images, batch_size=10)
    print (classes[0][0])
    
    return jsonify({'status': float(classes[0][0])})


#to spedicy route after url
@app.route('/api', methods=['POST'])
def get_tasks():
    #get url from form
    # url = request.form['url']
    url = request.files['url']

    #sends url for prediction
    sender = predict.predict(url)

    #get values from prediction
    rec = sender.predict_only()

    # #list of out values
    # outputlist=[rec]

    # #for multiple json apis
    # tasks = []

    # tasks1 = [
    #     {
    #         'value': outputlist[0],

    #     },

    # ]
    # tasks.append(tasks1)
    # return jsonify({'tasks': tasks})
    return jsonify({'status': rec})



if __name__ == '__main__':
    #for remote host
    ip = socket.gethostbyname(socket.gethostname())
    app.run(port=5000,host=ip)

    #for local host
    #app.run(debug=True, port=5000)
