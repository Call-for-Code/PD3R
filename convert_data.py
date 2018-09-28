# Importing packages
import numpy as np
import matplotlib.pyplot as plt
import os
import cv2
import random

# Setting parent data directory, categories and size for the final image
DATADIR = "real_digital_train/"
CATEGORIES = ["go", "nogo"]
IMG_SIZE = 224

# Initializing empty list 
training_data = []

# Defining custom function to read images from directory, resize them and convert them to the OpenCv's Canny edge filter output
def create_training_data():
    for category in CATEGORIES:
        path = os.path.join(DATADIR, category)
        class_num = CATEGORIES.index(category)
        for img in os.listdir(path):
            try:
                img_array = cv2.imread(os.path.join(path,img),0)
                img_array = cv2.resize(img_array, (IMG_SIZE, IMG_SIZE))
                img_array = cv2.Canny(img_array, 80, 100)
                training_data.append([img_array, class_num])
            except Exception as e:
                print(e)

# calling the function
create_training_data()
# shuffling the dataset 
random.shuffle(training_data)

# Separating features and labels to separate variables
X = []
Y = []

for features, label in training_data:
	X.append(features)
	Y.append(label)

# converiting features and labels to numpy array and expanding their dimension to make it proper for the model
X = np.array(X).reshape(-1, IMG_SIZE, IMG_SIZE, 1)
Y = np.expand_dims(Y, axis=1)
Y = Y.astype(np.float32)

# saving the result in a directory
np.save("numpy_edge/224_mixed_features_train", X)
np.save("numpy_edge/224_mixed_labels_train", Y)


# defining directory for validation data
DATADIR = "real_digital_valid/"

valid_data = []
# defining custom function to create validation data from directory, resize the images and convert to Canny edge filter output
def create_valid_data():
    for category in CATEGORIES:
        path = os.path.join(DATADIR, category)
        class_num = CATEGORIES.index(category)
        for img in os.listdir(path):
            try:
                img_array = cv2.imread(os.path.join(path,img),0)
                img_array = cv2.resize(img_array, (IMG_SIZE, IMG_SIZE))
                img_array = cv2.Canny(img_array, 80, 100)
                valid_data.append([img_array, class_num])
            except Exception as e:
                print(e)

# calling the function
create_valid_data()
# shuffling the validation dataset
random.shuffle(valid_data)

# separating features and labels from the dataset
X = []
Y = []

for features, label in valid_data:
	X.append(features)
	Y.append(label)

# converting features and labels to numpy array
X = np.array(X).reshape(-1, IMG_SIZE, IMG_SIZE, 1)
Y = np.expand_dims(Y, axis=1)
Y = Y.astype(np.float32)

# saving the arrays in a directory
np.save("numpy_edge/224_mixed_features_valid", X)
np.save("numpy_edge/224_mixed_labels_valid", Y)