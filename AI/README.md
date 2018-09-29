
## Final Model, Training and Testing Data Available in Google Drive

https://drive.google.com/open?id=107Ur_8QPLyyBjDMBelCOsw4dhOTv-Eu-


Model Training code: train.py
Data Creation code: convert_data.py
Evaluation code: evaluate_confusion_matrix.py


As our custom local model performance was somehow limited and we also needed to include online api to make it able to integrate 
with our mobile app. We tried IBM Watson Visual Recognition Model for that purpose. A custom visual recognition 
model was trained with the same dataset as our local model, with categories 'Go' and 'Negative'(Nogo) in IBM Wason Studio. Then api endpoint created
after training the model on IBM watson is used to integrate with Mobile app. This approach lead us to creating better model with
scalable backend for future iterations as well. 

IBM Cloud Service Used: IBM Watson Studio Visual Recognition Custom Model
API: API Endpoint created by IBM Cloud
Number of classes: Go and Negative
Training Images: 2257 (Digitally Generated & Real images, with OpenCV's Canny Edge detection filter)
