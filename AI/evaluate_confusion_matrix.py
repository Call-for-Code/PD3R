# Importing packages
import time

import tensorflow as tf
from tensorflow import keras

from sklearn.metrics import confusion_matrix
import itertools

import numpy as np
import PIL
import os
import matplotlib.pyplot as plt

# Loading the saved model from the directory
model = keras.models.load_model("models/digital-224px-p-dropout-mixed-time-1538100483.model")

# loading the test data from directory
x_test = np.load("numpy_edge/224_realall_features.npy")
y_test = np.load("numpy_edge/224_realall_labels.npy")

# evaluating the model on test data
model.evaluate(x_test, y_test, batch_size=15)



# Generating predictions to pass it to the confusion matrix
predictions = np.argmax(model.predict(x_test),axis=1)
predictions = np.expand_dims(predictions, axis=1)

# classes for the confusion matrix
classes = ['go', 'nogo']

# setting confusion matrix
cm = confusion_matrix(y_test, predictions)

# custom function to plot confusion matrix
def plot_confusion_matrix(cm, classes,
                          normalize=False,
                          title='Confusion matrix',
                          cmap=plt.cm.Blues):
    """
    This function prints and plots the confusion matrix.
    Normalization can be applied by setting `normalize=True`.
    """
    if normalize:
        cm = cm.astype('float') / cm.sum(axis=1)[:, np.newaxis]
        print("Normalized confusion matrix")
    else:
        print('Confusion matrix, without normalization')

    print(cm)

    plt.imshow(cm, interpolation='nearest', cmap=cmap)
    plt.title(title)
    plt.colorbar()
    tick_marks = np.arange(len(classes))
    plt.xticks(tick_marks, classes, rotation=45)
    plt.yticks(tick_marks, classes)

    fmt = '.2f' if normalize else 'd'
    thresh = cm.max() / 2.
    for i, j in itertools.product(range(cm.shape[0]), range(cm.shape[1])):
        plt.text(j, i, format(cm[i, j], fmt),
                 horizontalalignment="center",
                 color="white" if cm[i, j] > thresh else "black")

    plt.tight_layout()
    plt.ylabel('True label')
    plt.xlabel('Predicted label')

# Plotting confusion matrix
plot_confusion_matrix(cm, classes)