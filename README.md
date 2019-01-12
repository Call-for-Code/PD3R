# Post-Disaster Rapid Response Retrofit: PD3R

*Read this in other languages: [English](README.md)*

Natural disasters have been a determinant factor for the development of civilizations. From landscaping the environment to vanishing entire cities, the forces of nature play an important role in our lives. The impact of these events has been significant, especially when they strike on developing countries. For instance, between 1971 and 1995 Natural Disasters took more than 3 million lives, and affected more than 136 million around the world (HRC,2004). Historical evidences show how vulnerable we are to the power of earthquakes, typhoons, hurricanes, and more. However, our mindset towards Natural Disasters has changed through time as modern society has focused more on the scientific facts rather than supernatural explanations. This change of approach has led to the development of tools that can predict, quantify, and reduce risk. As governments and local authorities implement these new tools, life and economic loss after disasters reduce drastically.

Following Build Change ́s main premise to Build Disaster Resistant Buildings and Change Construction Practices Permanently, PD3R Team ́s main objective is to improve the safety conditions of buildings and reduce human and economic loss after the occurrence of a natural disaster. Now, this is a broad and ambitious objective, so our main specific objectives can be summarized in the following points:
* Develop a methodology incorporating AI capabilities to enable rapid post-disaster retrofitting once the
disaster strikes.
* Train the Image Recognition AI to determine if a house is eligible for retrofitting, by feeding it with a large
volume of digital images generated through a BIM software, along with some real images.
* Design the methodology in a way that allows its application globally, adapting the construction types,
materials and structural calculations to the context of a particular country or geographic area.
* Reduce response time to a few days post-disaster, to minimize waiting time to retrofit houses of affected
 people.

[Project website](https://github.com/Build-Change/call_for_code)

## Getting Started



### Prerequisites

* Clone the project from  github repo
* Create virtual environment, if you want using virtualenv command
* Install dependent libararies
```
pip install -r requirements.txt
```

### Convert 

* Resize  and convert images to the OpenCv's Canny edge filter output 
```
python convert_data.py  
```

### Train
* Train and make model  using train.py file using the output from above step 
```
python train.py 
```

###  Test your model

* Run the below python script to classify your test images based on our pre-trained model.


```
python evaluate_confusion_matrix.py

```
## Deployment

"Android Application" folder contains the android code which takes the picture and sends to the AI server and show the final output. To change the api for your own server go to MainApplication.java file and change "BASE_URL" value.
ie :  ``` public static String BASE_URL = "Your API Code HERE"; ```

## Built With

* [Python](https://www.python.org) - The Programming Language used
* [Android](https://www.android.com) - Mobile Application
* [Dynamo](http://primer.dynamobim.org) -  for generating the 3d model

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/Build-Change/call_for_code/tags). 

## Authors

* **Build Change** -

See also the list of [contributors](https://github.com/Build-Change/call_for_code/contributors) who participated in this project.

## License

This project is licensed under the Apache 2 License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Based on [Billie Thompson's README template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2).
