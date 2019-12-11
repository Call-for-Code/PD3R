import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  PermissionsAndroid,
  Image,
  Platform,
  Alert,
  Keyboard,
} from 'react-native';
// import ImagePicker from 'react-native-image-picker'
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import {
  Root,
  Spinner,
  Toast,
  Container,
  Header,
  Icon,
  Content,
  Picker,
  Title,
  Form,
  Item,
  Input,
  Label,
  Button,
  Body,
  Left,
  Right,
  Textarea,
  Card,
  CardItem,
} from 'native-base';
import Geolocation from 'react-native-geolocation-service';
import Icons from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
      Usrname: '',
      photo: null,
      email: '',
      password: '',
      status: '',
      Phone: '',
      long: '',
      lat: '',
      address: '',
      Description: '',
      disaster: '',

      masonry: '',
      external_face: '',
      damage_wall: '',
      storeys: '',
      pickerOptions: [
        {name: 'Yes', id: 1},
        {name: 'No', id: 2},
      ],

      avatar1data: '',
      avatar1type: '',
      avatarSource1: null,
      avatar2data: '',
      avatar2type: '',
      avatarSource2: null,
      avatar3data: '',
      avatar3type: '',
      avatarSource3: null,
      avatar4data: '',
      avatar4type: '',
      avatarSource4: null,

      showComponentA: true,
      showComponentB: true,
      showComponentC: true,

      isModalGo: false,
      isModalNogo: false,

      loading: false,
    };
  }

  _toggleComponentA = () =>
    this.setState({showComponentA: !this.state.showComponentA});

  _toggleComponentB = () =>
    this.setState({showComponentB: !this.state.showComponentB});
  _toggleComponentC = () =>
    this.setState({showComponentC: !this.state.showComponentC});

  _toggleModalGo = () => this.setState({isModalGo: !this.state.isModalGo});
  _toggleModalNoGo = () =>
    this.setState({isModalNogo: !this.state.isModalNogo});

  handleChangeOption(val, type) {
    if (val !== 0) {
      if (type == 'masonry') {
        this.setState({
          masonry: val,
        });
      }

      if (type == 'external_face') {
        this.setState({
          external_face: val,
        });
      }
      if (type == 'damage_wall') {
        this.setState({
          damage_wall: val,
        });
      }
      if (type == 'storeys') {
        this.setState({
          storeys: val,
        });
      }
    }
  }
  componentWillUnmount() {
    Toast.toastInstance = null;
  }
  componentWillMount() {
    Toast.toastInstance = null;
  }
  componentDidMount() {
    this.getLatLong();
  }
  getLatLong = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Survey App',
          message: 'Please grant permission for geolocation ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log("You can use the location");
        // alert("You can use the location");
        // Instead of navigator.geolocation, just use Geolocation.
        //   if (hasLocationPermission) {
        Geolocation.getCurrentPosition(
          position => {
            this.setState({
              lat: JSON.stringify(position.coords.latitude),
              long: JSON.stringify(position.coords.longitude),
              latlongSwitch: 1,
            });
          },

          error => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );

        // }
      } else {
        console.log('location permission denied');
        //alert('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  selectPhotoTapped = async (avatarnumber, e) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Survey App Camera Permission',
          message:
            'Survey App App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        ImagePicker.showImagePicker(options, response => {
          console.log('Response = ', response);

          if (response.didCancel) {
            console.log('User cancelled photo picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            let source = {uri: response.uri};
            let data = response.path;
            let type = response.type;

            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            if (avatarnumber == '1') {
              console.log('Data from avatarno' + data);
              this.setState({
                avatarSource1: source,
                avatar1data: data,
                avatar1type: type,
              });
            }
            if (avatarnumber == '2') {
              this.setState({
                avatarSource2: source,
                avatar2data: data,
                avatar2type: type,
              });
            }

            if (avatarnumber == '3') {
              this.setState({
                avatarSource3: source,
                avatar3data: data,
                avatar3type: type,
              });
            }

            if (avatarnumber == '4') {
              this.setState({
                avatarSource4: source,
                avatar4data: data,
                avatar4type: type,
              });
            }
          }
        });
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };
  };
  clearData = () => {
    this.setState({
      Usrname: '',
      photo: null,
      email: '',
      password: '',
      status: '',
      Phone: '',
      long: '',
      lat: '',
      address: '',
      Description: '',
      disaster: '',

      avatar1data: '',
      avatar1type: '',
      avatarSource1: null,
      avatar2data: '',
      avatar2type: '',
      avatarSource2: null,
      avatar3data: '',
      avatar3type: '',
      avatarSource3: null,
      avatar4data: '',
      avatar4type: '',
      avatarSource4: null,

      masonry: '',
      external_face: '',
      damage_wall: '',
      storeys: '',
    });
  };
  SubmitData = () => {
    Keyboard.dismiss;
    this.setState({
      loading: true,
    });
    console.log('hi');
    console.log(
      {name: 'email', data: this.state.email.toString()},
      {name: 'name', data: this.state.Usrname.toString()},
      {name: 'desc', data: this.state.Description.toString()},
      {name: 'phone_no', data: this.state.Phone.toString()},
      {name: 'lat', data: this.state.lat.toString()},
      {name: 'long', data: this.state.long.toString()},
      {name: 'disaster_timeline', data: this.state.disaster.toString()},
    );
    /* console.log(
      JSON.stringify([
        {name: 'email', data: this.state.email.toString()},
        {name: 'name', data: this.state.Usrname.toString()},
        {name: 'desc', data: this.state.Description.toString()},
        {name: 'phone_no', data: this.state.Phone.toString()},
        {name: 'lat', data: this.state.lat.toString()},
        {name: 'long', data: this.state.long.toString()},
        {name: 'disaster_timeline', data: this.state.disaster.toString()},

        {
          name: 'photo_1',
          filename: 'front.jpeg',
          filetype: 'image/jpeg',
          data: RNFetchBlob.wrap(this.state.avatar1data),
        },
        {
          name: 'photo_2',
          filename: 'right.jpeg',
          filetype: 'image/jpeg',
          data: RNFetchBlob.wrap(this.state.avatar2data),
        },
        {
          name: 'photo_3',
          filename: 'left.jpeg',
          filetype: 'image/jpeg',
          data: RNFetchBlob.wrap(this.state.avatar3data),
        },
        {
          name: 'photo_4',
          filename: 'back.jpeg',
          filetype: 'image/jpeg',
          data: RNFetchBlob.wrap(this.state.avatar4data),
        },

        {name: 'masonry', data: this.state.masonry == 1 ? 'yes' : 'no'},
        {
          name: 'external_face',
          data: this.state.external_face == 1 ? 'yes' : 'no',
        },
        {name: 'damage_wall', data: this.state.damage_wall == 1 ? 'yes' : 'no'},
        {name: 'storeys', data: this.state.storeys == 1 ? 'yes' : 'no'},
      ]),
    );*/

    let missingField = '';

    if (this.state.Usrname == '') {
      missingField += 'Enter Full Name\n';
      //console.log("MISSING FILES SURVEYNAME" + missingField);
      /*   this.setState({
                    surveyerNameError: "Enter surveyerName"
                  });*/
    }
    if (this.state.email == '') {
      missingField += 'Enter Email\n';
      /*  this.setState({
                    homeownerNameError: "Enter Home Owner"
                  });*/
    }
    if (this.state.Phone == '') {
      missingField += 'Enter Phone Number\n';
      /*this.setState({
                    documentNumberError: "Enter Document Number"
                  });*/
    }
    if (this.state.disaster == '') {
      missingField += 'Select Disaster Time\n';
    }

    if (this.state.Description == null) {
      missingField += 'Write Description\n';
    }
    if (this.state.masonry == null) {
      missingField += 'Select masonry option\n';
    }
    if (this.state.external_face == null) {
      missingField += 'Select External option\n';
    }
    if (this.state.storeys == null) {
      missingField += 'Select Storeys  option\n';
    }
    if (this.state.avatarSource1 == null) {
      missingField += 'Upload Front Image\n';
    }
    if (this.state.avatarSource2 == null) {
      missingField += 'Upload Back Image\n';
    }
    if (this.state.avatarSource3 == null) {
      missingField += 'Upload Left Image\n';
    }
    if (this.state.avatarSource4 == null) {
      missingField += 'Upload Right Image\n';
    }
    /*
              if (this.state.selectedItems == "") {
                missingField += "Select Municipality\n";
              }
              */

    if (missingField == '') {
      RNFetchBlob.fetch(
        'POST',

        'http://example/api/examples', //Place Your Post API Request URL
        {
          //   Authorization : "Bearer access-token",s
          // otherHeader : "foo",
          // this is required, otherwise it won't be process as a multipart/form-data request
          'Content-Type': 'multipart/form-data',
        },

        [
          // name:Raam
          // email:nirmal@gmail.com
          // phone_no:111111
          // disaster_timeline:after
          // lat:27.687767
          // long:85.305834
          // desc:Nirma
          {name: 'email', data: this.state.email.toString()},
          {name: 'name', data: this.state.Usrname.toString()},
          {name: 'desc', data: this.state.Description.toString()},
          {name: 'phone_no', data: this.state.Phone.toString()},
          {name: 'lat', data: this.state.lat.toString()},
          {name: 'long', data: this.state.long.toString()},
          {name: 'disaster_timeline', data: this.state.disaster.toString()},

          {
            name: 'photo_1',
            filename: 'front.jpeg',
            filetype: 'image/jpeg',
            data: RNFetchBlob.wrap(this.state.avatar1data),
          },
          {
            name: 'photo_2',
            filename: 'right.jpeg',
            filetype: 'image/jpeg',
            data: RNFetchBlob.wrap(this.state.avatar2data),
          },
          {
            name: 'photo_3',
            filename: 'left.jpeg',
            filetype: 'image/jpeg',
            data: RNFetchBlob.wrap(this.state.avatar3data),
          },
          {
            name: 'photo_4',
            filename: 'back.jpeg',
            filetype: 'image/jpeg',
            data: RNFetchBlob.wrap(this.state.avatar4data),
          },

          {name: 'masonry', data: this.state.masonry == 1 ? 'yes' : 'no'},
          {
            name: 'external_face',
            data: this.state.external_face == 1 ? 'yes' : 'no',
          },
          {
            name: 'damage_wall',
            data: this.state.damage_wall == 1 ? 'yes' : 'no',
          },
          {name: 'storeys', data: this.state.storeys == 1 ? 'yes' : 'no'},
        ],
      )
        .then(response => {
          console.log('hello');
          console.log(JSON.stringify(response));
          // this.props.navigation.navigate("BasicFormPart2");r
          return response.json();
        })
        .then(jsonResponse => {
          console.log(JSON.stringify(jsonResponse));

          if (jsonResponse.status == 'go') {
            this.clearData();
            this.setState({
              isModalGo: true,
              loading: false,
            });
            /*this.setState({
                        loadingSubmit: false
                      })*/
            //  this.props.navigation.navigate("BasicFormPart2");
          }

          if (jsonResponse.status == 'nogo') {
            this.clearData();
            this.setState({
              isModalNogo: true,
              loading: false,
            });

            //  this.props.navigation.navigate("BasicFormPart2");
          } else {
            this.setState({
              isModalGo: true,
              loading: false,
            });
            /*   Toast.show({
                        text: "Problem in sending Data.Please Try Again",
                        buttonText: "Okay",
                        type: "danger",
                        duration: 3000
                      });
                      this.setState({
                        loadingSubmit: false
                      });*/
          }
        })
        .catch(err => {
          // ...
        });

      // this.props.navigation.navigate("BasicFormPart2");
    } else {
      Alert.alert(missingField);
      this.setState({
        loading: false,
      });
    }
  };

  //   SendAllData = () => {

  //     fetch('', {
  //                 method: 'POST',
  //                 headers: {
  //                     'Accept': 'application/json',
  //                     'Content-Type': 'application/json'
  //                 },
  //                 body: JSON.stringify({
  //                     Usrname: '',
  //                     address: '',
  //                     Phone:'',
  //                     Description:'',
  //                     After_Disaster:'',
  //                     Before_Disaster:'',
  //                 })
  //             })

  //                 .then((response) => response.json())
  //                 .then((responseData) => {
  //                     console.log("RESULTS HERE:", responseData)

  //                 this.setState({
  //               isLoading: false,
  //               dataSource: responseJson,
  //             }, function(){

  //             });
  //           })
  //           .catch((error) =>{
  //             console.error(error);
  //           })
  //     };
  render() {
    return (
      <View style={{backgroundColor: '#d2dae2'}}>
        <Header style={{backgroundColor: '#673AB7', alignItems: 'center'}}>
          <Left />
          <Body>
            <Title>SURVEY</Title>
          </Body>
          <Right>
            <Button
              rounded
              transparent
              style={{
                borderWidth: 1,
                borderColor: 'white',
                padding: 2,
              }}
              onPress={this.SubmitData}>
              <Icons
                name="check"
                size={18}
                style={{color: '#fff', paddingLeft: 2}}
              />
              {this.state.loading == true ? <Spinner color="white" /> : null}
              <Text style={{color: '#fff'}}>Submit</Text>
            </Button>
          </Right>
        </Header>

        <Modal isVisible={this.state.isModalGo}>
          <View style={{flex: 1}}>
            <Card>
              <CardItem header bordered>
                <Text>Go Message</Text>
              </CardItem>
              <CardItem>
                <View style={{flex: 1}}>
                  <Image
                    style={{
                      width: 120,
                      height: 90,
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    source={require('../assets/go.png')}
                  />
                </View>
              </CardItem>
              <CardItem>
                <View style={{flex: 1, flexDirection: 'column'}}>
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: '600',
                      color: 'green',
                    }}>
                    Congratulation You house can be Retroffitted
                  </Text>
                </View>
              </CardItem>
              <CardItem>
                <TouchableOpacity
                  onPress={this._toggleModalGo}
                  style={{flex: 1}}>
                  <Button
                    rounded
                    style={{
                      backgroundColor: 'purple',
                      alignSelf: 'center',
                      paddingVertical: 10,
                      paddingHorizontal: 30,
                    }}
                    onPress={this._toggleModalGo}>
                    <Text
                      style={{
                        color: '#fff',
                      }}>
                      Close
                    </Text>
                  </Button>
                </TouchableOpacity>
              </CardItem>
            </Card>
          </View>
        </Modal>

        <Modal isVisible={this.state.isModalNogo}>
          <View style={{flex: 1}}>
            <Card>
              <CardItem header bordered>
                <Text>NoGo Message</Text>
              </CardItem>
              <CardItem>
                <View style={{flex: 1}}>
                  <Image
                    style={{
                      width: 120,
                      height: 90,
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    source={require('../assets/nogo.png')}
                  />
                </View>
              </CardItem>
              <CardItem>
                <View style={{flex: 1, flexDirection: 'column'}}>
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: '600',
                      color: 'red',
                    }}>
                    Sorry You house cannot be Retroffitted
                  </Text>
                </View>
              </CardItem>
              <CardItem>
                <TouchableOpacity
                  onPress={this._toggleModalNoGo}
                  style={{flex: 1}}>
                  <Button
                    rounded
                    style={{
                      backgroundColor: 'purple',
                      alignSelf: 'center',
                      paddingVertical: 10,
                      paddingHorizontal: 30,
                    }}
                    onPress={this._toggleModalNoGo}>
                    <Text
                      style={{
                        color: '#fff',
                      }}>
                      Close
                    </Text>
                  </Button>
                </TouchableOpacity>
              </CardItem>
            </Card>
          </View>
        </Modal>
        <ScrollView>
          <Container>
            <Content padder>
              <Card style={{flex: 0}}>
                <CardItem header bordered style={{}}>
                  <Text style={styles.cardTitle}>General Question</Text>
                  <Right style={{justifyContent: 'flex-end'}}>
                    <TouchableOpacity onPress={this._toggleComponentA}>
                      <View
                        style={{
                          padding: 5,
                          borderColor: 'green',
                          borderWidth: 2,
                          borderRadius: 25,
                          alignSelf: 'flex-end',
                        }}>
                        <Icons
                          name="align-justify"
                          size={18}
                          style={{color: 'green'}}
                        />
                      </View>
                    </TouchableOpacity>
                  </Right>
                </CardItem>
                {this.state.showComponentA ? (
                  <CardItem
                    style={{
                      backgroundColor: '#ebedec',
                      paddingLeft: 0,
                      paddingRight: 5,
                      paddingTop: 0,
                      paddingBottom: 20,
                    }}>
                    <Left>
                      <Body>
                        <Content>
                          <Form>
                            <KeyboardAwareScrollView>
                              <View style={{paddingVertical: 8}}>
                                <Text style={styles.newText}>
                                  <Text style={styles.required}>*</Text>
                                  Full Name
                                </Text>
                                <Item regular>
                                  <Input
                                    style={styles.newInput}
                                    value={this.state.Usrname}
                                    onChangeText={text =>
                                      this.setState({
                                        Usrname: text,
                                      })
                                    }
                                  />
                                </Item>
                              </View>

                              <View style={{paddingVertical: 8}}>
                                <Text style={styles.newText}>
                                  <Text style={styles.required}>*</Text>
                                  Email Address
                                </Text>
                                <Item regular>
                                  <Input
                                    style={styles.newInput}
                                    value={this.state.email}
                                    keyboardType="email-address"
                                    onChangeText={text =>
                                      this.setState({
                                        email: text,
                                      })
                                    }
                                  />
                                </Item>
                              </View>

                              <View style={{paddingVertical: 8}}>
                                <Text style={styles.newText}>
                                  <Text style={styles.required}>*</Text>
                                  Phone Number
                                </Text>
                                <Item regular>
                                  <Input
                                    style={styles.newInput}
                                    value={this.state.Phone}
                                    keyboardType="phone-pad"
                                    onChangeText={text =>
                                      this.setState({
                                        Phone: text,
                                      })
                                    }
                                  />
                                </Item>
                              </View>

                              <View style={{paddingVertical: 8}}>
                                <Text style={styles.newText}>
                                  <Text style={styles.required}>*</Text>
                                  Disaster Time
                                </Text>

                                <View style={picker.pickerContainer}>
                                  <Icons
                                    name="angle-down"
                                    size={20}
                                    style={[styles.pickerIcon]}
                                  />
                                  <Picker
                                    style={picker.pickerMain}
                                    selectedValue={this.state.disaster}
                                    onValueChange={text =>
                                      this.setState({
                                        disaster: text,
                                      })
                                    }>
                                    <Picker.Item
                                      label="Select Options"
                                      value="0"
                                    />
                                    <Picker.Item
                                      label="Before Disaster"
                                      value="before"
                                    />
                                    <Picker.Item
                                      label="After Disaster"
                                      value="after"
                                    />
                                  </Picker>
                                </View>
                              </View>

                              <KeyboardAwareScrollView>
                                <View style={{paddingVertical: 8}}>
                                  <Text style={styles.newText}>
                                    <Text style={styles.required}>*</Text>
                                    Description
                                  </Text>
                                  <Item regular>
                                    <Textarea
                                      value={this.state.Description}
                                      rowSpan={3}
                                      bordered
                                      placeholder="Enter Details here"
                                      placeholderTextColor="#888888"
                                      onChangeText={text =>
                                        this.setState({
                                          Description: text,
                                        })
                                      }
                                      style={{
                                        width: '100%',
                                        fontSize: 15,

                                        backgroundColor: '#F8F9FC',

                                        color: '#000',
                                        // fontSize: 15,

                                        //  paddingVertical:
                                        //  Platform.OS === "ios" ? 7 : 0,
                                        //  paddingHorizontal: 7,
                                        borderRadius: 0,
                                        borderColor: '#ccc',
                                        borderWidth: 0,
                                        //marginBottom: 5
                                      }}
                                    />
                                  </Item>
                                </View>
                              </KeyboardAwareScrollView>

                              <View style={{paddingVertical: 8}}>
                                <Text style={styles.newText}>
                                  <Text style={styles.required}>*</Text>
                                  latitude
                                </Text>
                                <Item regular>
                                  <Input
                                    style={styles.newInput}
                                    value={this.state.lat}
                                    disabled
                                  />
                                </Item>
                              </View>

                              <View style={{paddingVertical: 8}}>
                                <Text style={styles.newText}>
                                  <Text style={styles.required}>*</Text>
                                  longitude
                                </Text>
                                <Item regular>
                                  <Input
                                    style={styles.newInput}
                                    value={this.state.long}
                                    disabled
                                  />
                                </Item>
                              </View>
                            </KeyboardAwareScrollView>
                          </Form>
                        </Content>
                      </Body>
                    </Left>
                  </CardItem>
                ) : null}
              </Card>

              <Card style={{flex: 0}}>
                <CardItem header bordered style={{}}>
                  <Text style={styles.cardTitle}>General Question</Text>
                  <Right style={{justifyContent: 'flex-end'}}>
                    <TouchableOpacity onPress={this._toggleComponentB}>
                      <View
                        style={{
                          padding: 5,
                          borderColor: 'green',
                          borderWidth: 2,
                          borderRadius: 25,
                          alignSelf: 'flex-end',
                        }}>
                        <Icons
                          name="align-justify"
                          size={18}
                          style={{color: 'green'}}
                        />
                      </View>
                    </TouchableOpacity>
                  </Right>
                </CardItem>
                {this.state.showComponentB ? (
                  <CardItem
                    style={{
                      backgroundColor: '#ebedec',
                      paddingLeft: 0,
                      paddingRight: 5,
                      paddingTop: 0,
                      paddingBottom: 20,
                    }}>
                    <Left>
                      <Body>
                        <Content>
                          <View style={{paddingVertical: 8}}>
                            <Text style={styles.newText}>
                              <Text style={styles.required}>*</Text>
                              Is your house made of stone masonry with mud
                              mortar?(के यो माटोको जोडाईमा ढुङ्गाले बनेको हो ?)
                            </Text>

                            <View style={picker.pickerContainer}>
                              <Icons
                                name="angle-down"
                                size={20}
                                style={[styles.pickerIcon]}
                              />
                              <Picker
                                style={picker.pickerMain}
                                selectedValue={this.state.masonry}
                                onValueChange={e =>
                                  this.handleChangeOption(e, 'masonry')
                                }>
                                <Picker.Item label="Select Options" value="0" />
                                {this.state.pickerOptions.map(
                                  (pickerOptions, i) => {
                                    return (
                                      <Picker.Item
                                        label={pickerOptions.name}
                                        value={pickerOptions.id}
                                        key={i}
                                      />
                                    );
                                  },
                                )}
                              </Picker>
                            </View>
                          </View>

                          <View style={{paddingVertical: 8}}>
                            <Text style={styles.newText}>
                              <Text style={styles.required}>*</Text>
                              Are all four walls(along four exterior faces)
                              composed of stone masonry with mud mortar?( यो
                              माटोको जोडाईमा ढुङ्गाले बनेको घरको चारवोटा गारहरु
                              मात्रै(बाहिर देखिने गाराहरु) रहेका छन् ? )
                            </Text>

                            <View style={picker.pickerContainer}>
                              <Icons
                                name="angle-down"
                                size={20}
                                style={[styles.pickerIcon]}
                              />
                              <Picker
                                style={picker.pickerMain}
                                selectedValue={this.state.external_face}
                                onValueChange={e =>
                                  this.handleChangeOption(e, 'external_face')
                                }>
                                <Picker.Item label="Select Options" value="0" />
                                {this.state.pickerOptions.map(
                                  (pickerOptions, i) => {
                                    return (
                                      <Picker.Item
                                        label={pickerOptions.name}
                                        value={pickerOptions.id}
                                        key={i}
                                      />
                                    );
                                  },
                                )}
                              </Picker>
                            </View>
                          </View>

                          <View style={{paddingVertical: 8}}>
                            <Text style={styles.newText}>
                              <Text style={styles.required}>*</Text>
                              Does the building show significant damages to the
                              walls or significant distortion?( घरको लामो
                              पट्टिका गाराहरुमा देखिने किसिमको क्ष्यति भएको छ? )
                            </Text>

                            <View style={picker.pickerContainer}>
                              <Icons
                                name="angle-down"
                                size={20}
                                style={[styles.pickerIcon]}
                              />
                              <Picker
                                style={picker.pickerMain}
                                selectedValue={this.state.damage_wall}
                                onValueChange={e =>
                                  this.handleChangeOption(e, 'damage_wall')
                                }>
                                <Picker.Item label="Select Options" value="0" />
                                {this.state.pickerOptions.map(
                                  (pickerOptions, i) => {
                                    return (
                                      <Picker.Item
                                        label={pickerOptions.name}
                                        value={pickerOptions.id}
                                        key={i}
                                      />
                                    );
                                  },
                                )}
                              </Picker>
                            </View>
                          </View>

                          <View style={{paddingVertical: 8}}>
                            <Text style={styles.newText}>
                              <Text style={styles.required}>*</Text>
                              Does the building exceed two storey plus attick?(
                              के यो घर बुईगल सहितको दुई तलला भन्दा बढी उचाइको छ
                              ?)
                            </Text>

                            <View style={picker.pickerContainer}>
                              <Icons
                                name="angle-down"
                                size={20}
                                style={[styles.pickerIcon]}
                              />
                              <Picker
                                style={picker.pickerMain}
                                selectedValue={this.state.storeys}
                                onValueChange={e =>
                                  this.handleChangeOption(e, 'storeys')
                                }>
                                <Picker.Item label="Select Options" value="0" />
                                {this.state.pickerOptions.map(
                                  (pickerOptions, i) => {
                                    return (
                                      <Picker.Item
                                        label={pickerOptions.name}
                                        value={pickerOptions.id}
                                        key={i}
                                      />
                                    );
                                  },
                                )}
                              </Picker>
                            </View>
                          </View>
                        </Content>
                      </Body>
                    </Left>
                  </CardItem>
                ) : null}
              </Card>

              <Card style={{flex: 0, paddingBottom: 20}}>
                <CardItem header bordered style={{}}>
                  <Text style={styles.cardTitle}>Pictures</Text>
                  <Right style={{justifyContent: 'flex-end'}}>
                    <TouchableOpacity onPress={this._toggleComponentC}>
                      <View
                        style={{
                          padding: 5,
                          borderColor: 'green',
                          borderWidth: 2,
                          borderRadius: 25,
                          alignSelf: 'flex-end',
                        }}>
                        <Icons
                          name="align-justify"
                          size={18}
                          style={{color: 'green'}}
                        />
                      </View>
                    </TouchableOpacity>
                  </Right>
                </CardItem>

                {this.state.showComponentC ? (
                  <CardItem
                    style={{
                      backgroundColor: '#ebedec',
                      paddingLeft: 0,
                      paddingRight: 5,
                      paddingTop: 0,
                      paddingBottom: 20,
                    }}>
                    <Left>
                      <Body>
                        <Content>
                          <View>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                alignSelf: 'center',
                                paddingLeft: 20,
                              }}>
                              <View
                                style={{
                                  flex: 1,
                                  flexDirection: 'column',
                                }}>
                                <Label style={styles.label}>
                                  <Text style={styles.required}>*</Text>
                                  Front Image
                                </Label>

                                <TouchableOpacity
                                  onPress={e => this.selectPhotoTapped('1', e)}>
                                  <View
                                    style={[
                                      styles.avatar,
                                      styles.avatarContainer,
                                      {marginBottom: 20},
                                    ]}>
                                    {this.state.avatarSource1 === null ? (
                                      <Image
                                        style={styles.avatar1}
                                        source={require('../assets/camera.png')}
                                      />
                                    ) : (
                                      <Image
                                        style={styles.avatar}
                                        source={this.state.avatarSource1}
                                      />
                                    )}
                                  </View>
                                </TouchableOpacity>
                              </View>

                              <View
                                style={{
                                  flex: 1,
                                  flexDirection: 'column',
                                }}>
                                <Label style={styles.label}>
                                  <Text style={styles.required}>*</Text>
                                  Back Image
                                </Label>

                                <TouchableOpacity
                                  onPress={e => this.selectPhotoTapped('2', e)}>
                                  <View
                                    style={[
                                      styles.avatar,
                                      styles.avatarContainer,
                                      {marginBottom: 20},
                                    ]}>
                                    {this.state.avatarSource2 === null ? (
                                      <Image
                                        style={styles.avatar2}
                                        source={require('../assets/camera.png')}
                                      />
                                    ) : (
                                      <Image
                                        style={styles.avatar}
                                        source={this.state.avatarSource2}
                                      />
                                    )}
                                  </View>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>

                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              alignItems: 'center',
                              alignSelf: 'center',
                              paddingLeft: 20,
                              paddingBottom: 30,
                            }}>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'column',
                              }}>
                              <Label style={styles.label}>
                                <Text style={styles.required}>*</Text>
                                Left Image
                              </Label>

                              <TouchableOpacity
                                onPress={e => this.selectPhotoTapped('3', e)}>
                                <View
                                  style={[
                                    styles.avatar,
                                    styles.avatarContainer,
                                    {marginBottom: 20},
                                  ]}>
                                  {this.state.avatarSource3 === null ? (
                                    <Image
                                      style={styles.avatar2}
                                      source={require('../assets/camera.png')}
                                    />
                                  ) : (
                                    <Image
                                      style={styles.avatar}
                                      source={this.state.avatarSource3}
                                    />
                                  )}
                                </View>
                              </TouchableOpacity>
                            </View>

                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'column',
                              }}>
                              <Label style={styles.label}>
                                <Text style={styles.required}>*</Text>
                                Right Image
                              </Label>

                              <TouchableOpacity
                                onPress={e => this.selectPhotoTapped('4', e)}>
                                <View
                                  style={[
                                    styles.avatar,
                                    styles.avatarContainer,
                                    {marginBottom: 20},
                                  ]}>
                                  {this.state.avatarSource4 === null ? (
                                    <Image
                                      style={styles.avatar2}
                                      source={require('../assets/camera.png')}
                                    />
                                  ) : (
                                    <Image
                                      style={styles.avatar}
                                      source={this.state.avatarSource4}
                                    />
                                  )}
                                </View>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </Content>
                      </Body>
                    </Left>
                  </CardItem>
                ) : null}
              </Card>
            </Content>
          </Container>
        </ScrollView>
      </View>
    );
  }
}

const picker = StyleSheet.create({
  pickerContainer: {
    borderColor: '#dee1df',
    borderWidth: 1,
    borderRadius: 4,
  },
  pickerIcon: {
    backgroundColor: 'transparent',
    right: 5,
    paddingLeft: 5,
    marginLeft: 0,
    marginTop: 20,
    flex: 1,
    position: 'absolute',
    top: -15,
    zIndex: 1000,
    color: '#012552',
    fontSize: 20,
  },
  pickerMain: {
    height: 35,
    marginBottom: 0,
    padding: 0,
    backgroundColor: '#fff',

    borderColor: 'black',
    borderWidth: 1,
  },
});
const styles = StyleSheet.create({
  required: {
    color: 'red',
  },
  label: {
    color: '#000',
    fontSize: 13,
    fontWeight: 'bold',
    paddingVertical: 3,
  },
  customBtnDNG: {
    backgroundColor: '#9ec54d',
    // paddingHorizontal: 30,
    // paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
    width: '90%',
    height: 50,
    // marginBottom:10,
  },
  customBtnText: {
    fontSize: 20,
    fontWeight: '300',
    alignItems: 'center',
    justifyContent: 'center',

    color: '#fff',
  },
  avatarContainer: {
    backgroundColor: '#F8F9FC',

    borderColor: '#bdbdbd',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 75,
    width: 100,
    height: 100,
  },

  newText: {
    fontSize: 14,
    paddingBottom: 5,
    color: '#000',
  },

  newInput: {
    height: 35,
    marginBottom: 0,
    padding: 2,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  pickerIcon: {
    backgroundColor: 'transparent',
    right: 5,
    paddingLeft: 5,
    marginLeft: 0,
    marginTop: 20,
    flex: 1,
    position: 'absolute',
    top: -15,
    zIndex: 1000,
    color: '#012552',
    fontSize: 20,
  },
});
