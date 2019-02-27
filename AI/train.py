"""
   Copyright 2018 Nirmal Adhikari, Lakshyana KC, Shreyasha Paudel, Kshitz Rimal, Nicolas Oritiz

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
"""

# Importing packages
import time
import numpy as np
import PIL
import os
import matplotlib.pyplot as plt

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import backend as K
from tensorflow.keras.callbacks import TensorBoard

# custom function to toggle the trainable property of layers of keras model
def set_trainable(model, flag=False):
    for layer in model.layers:
        layer.trainable = flag\

# custom function to join two paths
def path_join(driname, filenames):
    return [os.path.join(dirname, filename) for filename in filenames]

# importing training data
X_train = np.load("numpy_edge/224_mixed_features_train.npy")
y_train = np.load("numpy_edge/224_mixed_labels_train.npy")

# importing validation data
X_val = np.load("numpy_edge/224_mixed_features_valid.npy")
y_val = np.load("numpy_edge/224_mixed_labels_valid.npy")

# converting training data into TF.Data format
train_dataset = tf.data.Dataset.from_tensor_slices((X_train, y_train))
# Making the dataset, batch size of 10
train_dataset = train_dataset.batch(10).repeat()

# converting training data into TF.Data format
val_dataset = tf.data.Dataset.from_tensor_slices((X_val, y_val))
# Making the dataset, batch size of 10
val_dataset = val_dataset.batch(10).repeat()

# Defining name of the to be saved model
NAME = "digital-224px-p-dropout-mixed-time-{}".format(int(time.time()))
# Setting log directory for tensorboard to visualize the progress
tensorboard = TensorBoard(log_dir='logs_digital/{}'.format(NAME))

# Model Construction
model = keras.models.Sequential()
model.add(keras.layers.Conv2D(512, kernel_size=(3, 3), activation='relu', input_shape=(224,224,1,)))
model.add(keras.layers.MaxPool2D(pool_size=(2,2)))
model.add(keras.layers.BatchNormalization())
model.add(keras.layers.Conv2D(256, kernel_size=(3, 3), activation='relu'))
model.add(keras.layers.MaxPool2D(pool_size=(2,2)))
model.add(keras.layers.BatchNormalization())
model.add(keras.layers.Conv2D(128, kernel_size=(3, 3), activation='relu'))
model.add(keras.layers.MaxPool2D(pool_size=(2,2)))
model.add(keras.layers.BatchNormalization())
model.add(keras.layers.Dropout(0.3))
model.add(keras.layers.Conv2D(128, kernel_size=(3, 3), activation='relu'))
model.add(keras.layers.MaxPool2D(pool_size=(2,2)))
model.add(keras.layers.BatchNormalization())
model.add(keras.layers.Conv2D(64, kernel_size=(3, 3), activation='relu'))
model.add(keras.layers.MaxPool2D(pool_size=(2,2)))
model.add(keras.layers.BatchNormalization())
model.add(keras.layers.Conv2D(32, kernel_size=(3, 3), activation='relu'))
model.add(keras.layers.MaxPool2D(pool_size=(2,2)))
model.add(keras.layers.Dropout(0.2))
model.add(keras.layers.BatchNormalization())
model.add(keras.layers.Flatten())
model.add(keras.layers.Dense(1024, activation='relu'))
model.add(keras.layers.Dropout(0.3))
model.add(keras.layers.Dense(256, activation='relu'))
model.add(keras.layers.Dense(1, activation='sigmoid'))

# Configuring loss function and optimizer for the model
optimizer = keras.optimizers.Adam()
loss = 'binary_crossentropy'
metrics = ['accuracy']
model.compile(optimizer=optimizer, loss = loss, metrics=metrics)

# Training the model for 100 epoch
model.fit(train_dataset, epochs=100, steps_per_epoch=10, validation_data=val_dataset, validation_steps=10, callbacks=[tensorboard])


# Saving the full model, as well as its weights separately for future usage
model.save("models/{}.model".format(NAME))
model.save_weights("models/{}_weights.weights".format(NAME))
