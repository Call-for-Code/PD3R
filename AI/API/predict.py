import os
import numpy as np
import tensorflow.keras as keras
from PIL import Image
# import requests
# from io import BytesIO


class predict(object):
    def __init__(self,url):
        self.url=url

    def predict_only(self):
        # Load and resize the image using PIL.
        # response = requests.get(self.url)
        # img = Image.open(BytesIO(response.content))
        img = Image.open(self.url)

        # Set Input Shape
        input_shape = (300, 300)

        # img = PIL.Image.open(image_path)
        img_resized = img.resize(input_shape, Image.LANCZOS)

        # Convert the PIL image to a numpy-array with the proper shape.
        img_array = np.expand_dims(np.array(img_resized), axis=0)

        # Load Model from File
        model = keras.models.load_model('Models/lr-03-ep-200-retro-pre_layer-avg_pool-dense-1024-time-1535955408.model')


        # Make Predictions
        pred = model.predict_classes(img_array)

        np_array_to_list = pred.tolist()

        if np_array_to_list[0][0] == 0:
        	return "go"
        else:
        	return "no_go"
        endif	
        
        

        
