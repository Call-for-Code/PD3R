
/**
 * Index
 * srw=site retaining wall
 * frw=found retaining wall
 * dfh= distance from House
 */

import React, { Component } from "react";
import {
  View,
  Alert,
  StyleSheet,
  ScrollView,
  Linking,
  AsyncStorage,
  Platform,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
  NativeModules,
  LayoutAnimation
} from "react-native";
import Icons from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { NavigationActions } from "react-navigation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SectionedMultiSelect from "react-native-sectioned-multi-select";

import SendIntentAndroid from "react-native-send-intent";
import Realm from "realm";
import ActionButton from "../components/ActionButton/index";
import Modal from "react-native-modal";

import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cell
} from "react-native-table-component";

import {
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Left,
  Right,
  Icon,
  Title,
  Button,
  H1,
  Form,
  Item,
  Input,
  Label,
  Picker,
  DatePicker,
  CheckBox,
  Radio,
  ListItem,
  List,
  Thumbnail,
  Textarea,
  Footer,
  FooterTab,
  Toast,
  Spinner
} from "native-base";

import Geolocation from "react-native-geolocation-service";
import { withNamespaces } from "react-i18next";
//const { width } = Dimensions.get("window");
import { PermissionsAndroid } from "react-native";

import ImagePicker from "react-native-image-picker";
import RNFetchBlob from "rn-fetch-blob";
import { SuperGridSectionList } from "react-native-super-grid";

let realm;

var LABEL_COLOR = "#7e7e7e";
var INPUT_COLOR = "#000000";
var ERROR_COLOR = "#a94442";
var HELP_COLOR = "#999999";
var BORDER_COLOR = "#cccccc";
var DISABLED_COLOR = "#777777";
var DISABLED_BACKGROUND_COLOR = "#eeeeee";
var FONT_SIZE = 15;
var FONT_WEIGHT = "400";
let deviceWidth = Dimensions.get("window").width;
var { width } = Dimensions.get("window");

const HEADER_MAX_HEIGHT = 200; // set the initial height
const HEADER_MIN_HEIGHT = 60; // set the height on scroll
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const { UIManager } = NativeModules;
export class BasicFormPart2 extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    const { t, i18n, navigation } = this.props;
    _listViewOffset = 0;
    _listViewHeight = 0;
    _listViewContentHeight = 0;
    realm = new Realm({ path: "Survey11Database.realm" });
    this.state = {
      isActionButtonVisible: true,

      boxcolor: "orange",
      mapHazard: "",
      selectedMapHazard: "",
      mapHazardOptions: [
        { name: t("columbia_form:map_Hazard_o_1"), id: 1 },
        { name: t("columbia_form:map_Hazard_o_2"), id: 2 }
      ],
      yellowFlag: 0,
      redFlag: 0,
      srwSwitch: 0,
      srw: "",
      selectedsrw: "",
      srwOptions: [
        { name: t("columbia_form:retaining_wall_o_1"), id: 1 },
        { name: t("columbia_form:retaining_wall_o_2"), id: 2 }
      ],

      srwHeightSwitch: 0,
      srwHeight: "",
      selectedsrwHeight: "",

      srw_dfhSwitch: 0,
      srw_dfh: "",
      srw_Dfh: "",
      selectedsrw_dfh: "",

      frwSwitch: 0,
      frw: "",
      selectedfrw: "",
      frwOptions: [
        { name: t("columbia_form:frw_option_1"), id: 1 },
        { name: t("columbia_form:frw_option_2"), id: 2 }
      ],

      frw_dfh: "",
      frwHeightSwitch: 0,
      frwHeight: "",
      selectedfrwHeight: "",
      frwHeightChecked: "",

      storeysSwitch2: 0,
      storeys: "",
      selectedStoreys: "",
      storeysOptions: [
        { name: "One", id: 1 },
        { name: "Two", id: 2 },
        { name: "Three", id: 3 },
        { name: "More than Three", id: 4 }
      ],
      storeysChecked: null,

      masonarySwitch2: 0,

      constructionSwitch: 0,
      constructionDetail: "",
      selectedConstructionDetail: "",

      residentialTypeSwitch: 0,
      residentialType: "",
      selectedresidentialType: "",
      residentialTypeOptions: [
        { name: t("columbia_form:residential_o_1"), id: 1 },
        { name: t("columbia_form:residential_o_2"), id: 2 }
      ],

      evidenceDamageSwitch: 0,
      selectedEvidenceDamage: "",
      evidenceDamageOptions: [
        { name: t("columbia_form: evidence_o_1"), id: 1 },
        { name: t("columbia_form:evidence_o_2"), id: 2 }
      ],

      rfcardSwitch: 0,

      roofSlabSwitch: 0,
      roofSlab: "",
      selectedRoofSlab: "",
      roofSlabOptions: [
        { name: t("columbia_form:roof_slab_type_o_1"), id: 1 },
        { name: t("columbia_form:roof_slab_type_o_2"), id: 2 },
        { name: t("columbia_form:roof_slab_type_o_3"), id: 3 },
        { name: t("columbia_form:roof_slab_type_o_4"), id: 4 }
      ],

      buildingShapeSwitch: 0,
      buildingShape: "",
      selectedBuildingShape: "",
      buildingShapeOptions: [
        { name: t("columbia_form:buildingShape_o_1"), id: 1 },
        { name: t("columbia_form:buildingShape_o_2"), id: 2 }
      ],

      canLeverSwitch: 0,
      canLever: "",
      selectedCanLever: "",
      canLeverOptions: [
        { name: t("columbia_form:cantiliver_o_1"), id: 1 },
        { name: t("columbia_form:cantiliver_o_2"), id: 2 }
      ],

      magicPlanSurveySwitch: 0,

      status: 0,
      points: 0,
      selectedOpenCut: "",
      openCutOptions: [
        { name: t("columbia_form2:yes"), id: 1 },
        { name: t("columbia_form2:no"), id: 2 }
      ],
      openCutSwitch: 0,
      srth: "",
      srtd: "",
      side_retaining_wall: "",
      side_retaining_wall_option: [
        { name: t("columbia_form2:yes"), id: 1 },
        { name: t("columbia_form2:no"), id: 2 }
      ],

      selected_side_retaining_wall: "",
      side_retaining_wall_switch: 0,
      srwh: "",
      srwhSwitch: 0,
      srwd: "",
      srwdSwitch: 0,

      foundation_retaining_wall: "",
      foundation_retaining_wall_option: [
        { name: t("columbia_form2:yes"), id: 1 },
        { name: t("columbia_form2:no"), id: 2 }
      ],

      selected_foundation_retaining_wall: "",
      foundation_retaining_wall_switch: 0,
      frwh: "",
      frwhSwitch: 0,

      masonary: "",
      selectedMasonary: "",
      masonaryOptions: [
        { name: t("columbia_form2:yes"), id: 1 },
        { name: t("columbia_form2:no"), id: 2 }
      ],
      masonarySwitch: 0,

      storeysSwitch: 0,
      storeys: "",
      selectedStoreys: "",

      facadeSwitch: 0,
      facade: "",
      selectedFacade: "",
      facadeOptions: [
        { name: t("columbia_form2:yes"), id: 1 },
        { name: t("columbia_form2:no"), id: 2 }
      ],

      gapSwitch: 0,
      gap: "",
      selectedGap: "",
      gapOptions: [
        { name: t("columbia_form2:yes"), id: 1 },
        { name: t("columbia_form2:no"), id: 2 }
      ],

      differentformSwitch: 0,
      differentform: "",
      selectedDifferenctform: "",
      differentformOptions: [
        { name: t("columbia_form2:yes"), id: 1 },
        { name: t("columbia_form2:no"), id: 2 }
      ],

      evidenceSwitch: 0,
      evidence: "",
      selectedEvidence: "",
      evidenceOptions: [
        { name: t("columbia_form2:yes"), id: 1 },
        { name: t("columbia_form2:no"), id: 2 }
      ],

      interstoreySlabSwitch: 0,
      interstoreySlab: "",
      selectedinterstoreySlab: "",
      interstoreySlabOptions: [
        {
          name: "Flat Slab",
          id: 1
        },
        {
          name: "Ribbed Slab",
          id: 2
        },
        {
          name: "Placa Slab",
          id: 3
        },
        {
          name: "Other",
          id: 4
        }
      ],

      qualitySlabSwitch: 0,
      qualitySlab: "",
      selectedQualitySlab: "",
      qualitySlabOptions: [
        { name: "Buena/Promedio", id: 1 },
        { name: "Mala", id: 2 }
      ],

      cantiLeverSwitch: 0,
      cantiLever: "",
      selectedCantiLever: "",
      cantiLeverOptions: [
        { name: t("columbia_form:cantiliver_o_1"), id: 1 },
        { name: t("columbia_form:cantiliver_o_2"), id: 2 }
      ],

      roofTypeSwitch: 0,
      roofType: "",
      selectedRoofType: "",
      roofTypeOptions: [
        { name: t("columbia_form:roof_type_o_1"), id: 1 },
        { name: t("columbia_form:roof_type_o_2"), id: 2 }
      ],

      lwrSwitch: 0,
      lwr: "",
      selectedLwr: "",
      lwrOptions: [
        { name: t("columbia_form2:yes"), id: 1 },
        { name: t("columbia_form2:no"), id: 2 }
      ],

      roofSlabSwitch: 0,
      roofSlab: "",
      selectedRoofSlab: "",
      roofSlabOptions: [
        { name: "Flat Slab", id: 1 },
        { name: "Ribbed Slab", id: 2 },
        { name: "Placa Slab", id: 3 },
        { name: "Other Slab", id: 4 }
      ],

      qualityRoofSwitch: 0,
      qualityRoof: "",
      selectedQualityRoof: "",
      qualityRoofOptions: [
        { name: "Buena/Promedio", id: 1 },
        { name: "Mala", id: 2 }
      ],

      /**BASIC FORM 2 STARTS HERE */

      living_space: "",
      living_space_option: [
        { name: t("columbia_form2:yes"), id: 1 },
        { name: t("columbia_form2:no"), id: 2 }
      ],
      selected_living_space: "",

      house: "",
      house_option: [
        { name: t("columbia_form2:yes"), id: 1 },
        { name: t("columbia_form2:no"), id: 2 }
      ],
      selected_house: "",

      floor: "",
      floor_option: [
        { name: t("columbia_form2:yes"), id: 1 },
        { name: t("columbia_form2:no"), id: 2 }
      ],
      selected_floor: "",

      housing_unit: "",
      housing_unit_option: [
        { name: t("basicForm2:service_area"), id: 1 },
        { name: t("basicForm2:social_area"), id: 2 },
        { name: t("basicForm2:private_area"), id: 3 }
      ],

      service_area: false,
      social_area: false,
      private_area: false,
      selected_housing_unit: "",

      electrical_network: "",
      electrical_network_option: [
        { name: t("columbia_form2:yes"), id: 1 },
        { name: t("columbia_form2:no"), id: 2 }
      ],
      selected_electrical_network: "",

      aqueduct_network: "",
      aqueduct_network_option: [
        { name: t("columbia_form2:yes"), id: 1 },
        { name: t("columbia_form2:no"), id: 2 }
      ],
      selected_aqueduct_network: "",

      sewer_network: "",
      sewer_network_option: [
        { name: t("columbia_form2:yes"), id: 1 },
        { name: t("columbia_form2:no"), id: 2 }
      ],
      selected_sewer_network: "",

      equipped: "",
      equipped_option: [
        { name: t("columbia_form2:yes"), id: 1 },
        { name: t("columbia_form2:no"), id: 2 }
      ],
      selected_equipped: "",

      kitchen: "",
      kitchen_option: [
        { name: t("columbia_form2:yes"), id: 1 },
        { name: t("columbia_form2:no"), id: 2 }
      ],
      selected_kitchen: "",

      free_height: "",
      free_height_option: [
        { name: t("columbia_form2:yes"), id: 1 },
        { name: t("columbia_form2:no"), id: 2 }
      ],
      selected_free_height: "",
      headerFlag: true,
      showComponmentA: true,
      showComponmentB: true,
      showComponmentC: true,
      showComponmentD: true,
      showHomeownerForm: true,
      showComponentFooter: true,

      soiltypePoint: 0,
      opencutPoint: 0,
      srwPoint: 0,
      frwPoint: 0,
      nosMorethanThreePoint: 0,
      nos2Point: 0,
      nos1Point: 0,
      facadenoPoint: 0,
      gapPoint: 0,
      qualityofslabmalaPoint: 0,
      cantileverPoint: 0,
      qualityofroofmalaPoint: 0,
      totalPoint: 0,
      opencutFlag: 0,

      soiltypeStatus: 0,
      opencutStatus: 0,
      srwhStatus: 0,
      srwStatus: 0,
      frwStatus: 0,
      frwStatus: 0,
      masonryStatus: 0,
      nosStatus: 0,
      facadeStatus: 0,
      gapStatus: 0,
      interstoreyStatus: 0,
      slabStatus: 0,
      qosStatus: 0,
      cantileverStatus: 0,
      lrwcStatus: 0,
      qorStatus: 0,
      mainStatus: 0,

      savedStatus: 0,
      savedPoint: 0,
      savedHomeowner: null,
      userId: null,

      /**
       * HELPER
       *
       */
      site_retaining_wall_helper: false,
      foundation_retaining_wall_helper: false,
      damages_helper: false,
      cantilever_helper: false,
      type_of_roof_helper: false,
      nos_helper: false,
      soil_helper: false,

      /**BASIC FORM */

      isConnected: true,
      id: "",
      idError: "",
      idValidate: "",

      dateTime: "",
      surveyerName: "",
      surveyerNameError: "",
      surveyerNameValidate: "",

      homeownerName: "",
      homeownerNameError: "",
      homeownerNameValidate: "",

      documentNumber: "",
      documentNumberError: "",
      documentNumberValidate: "",

      documentPhoto: "",

      telephoneNumber: "",
      telephoneNumberError: "",
      telephoneNumberValidate: "",

      bario: "",

      address: "",
      addressError: "",
      addressValidate: "",

      photoFacade1: "",
      photoFacade1: "",

      lotNo: "",
      lotNoError: "",
      lotNoValidate: "",
      chipCode: "",
      //chipCodeError: "",
      // chipCodeValidate: "",

      latlongSwitch: 0,
      latitude: "",
      longitude: "",

      selectedMunicipality: "",
      selectedItems: "",
      MunicipalityType: [
        { name: "Select Municipality", id: 0 },
        { name: "Bogota Municiaplity", id: 1 },
        { name: "Medellín Municipality", id: 2 },
        { name: "Cali Municipality", id: 3 }
      ],

      errorMessage: null,
      //   isConnected: true,
      hasOnlineData: null,
      isMounted: false,
      showToast: true,
      region: "",

      avatarSource1: null,
      avatarSource2: null,
      avatarSource3: null,
      avatarSource4: null,
      avatar1data: "",
      avatar1type: "",
      avatar2data: "",
      avatar2type: "",
      avatar3data: "",
      avatar3type: "",
      avatar4data: "",
      avatar4type: "",

      hId: "",
      hcode: "",
      missingError: "",
      showComponmentA: true,
      isLogin: "",
      role: "",
      soilSwitch: 0,
      selectedSoiltype: "Type D",
      soilType: [
        { name: "Type A", id: 1 },
        { name: "Type B", id: 2 },
        { name: "Type C", id: 3 },
        { name: "Type D", id: 4 },
        { name: "Type E", id: 5 },
        { name: "Type F", id: 6 }
      ],
      userId: null,
      loadingSubmit: false,
      loadinglatlong: false,
      /**BASIC FORM */

      isModalVisible: false,
      isModalVisibleStatus: false,
      soilHelpertext: false,
      tableHead: ["Title", "Points", "Status"],
      widthArr: [120, 60, 60],
      //tableHead: ['', 'Points', 'Status'],
      //tableTitle: ['Soil Type', 'Open Cut', 'S.R.W', 'F.R.W','Masonry','Storeys','Facade','Gap','Interstorey','Slab Quality','Cantilever','Ceiling','LWRC','Roof Quality'],
      tableData: [
        // [this.savedPoint, this.savedStatus ],
        //[this.state.opencutPoint, this.state.opencutStatus ],
        // [this.state.srwStatus, this.state.srwhStatus + this.state.srwStatus ],
        // ['-', this.state.masonryStatus ],
        // [this.state.nosMorethanThreePoint +this.state.nos1Point +this.state.nos2Point, this.state.nosStatus ],
        // [this.state.facadenoPoint, this.state.facadeStatus ],
        // [this.state.gapPoint, this.state.gapStatus ],
        // ['4', this.state.qosStatus ],
        // [this.state.cantileverPoint, this.state.cantileverStatus ],
        // ['-', this.state.lrwcStatus ],
        // [this.state.qualityofroofmalaPoint, this.state.qorStatus ]
      ],
      renderTable: 0
    };
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);

    // this.loadApp();
  }
  _onLayout(e) {
    const { height } = e.nativeEvent.layout;
    this._listViewHeight = height;
  }

  _onContentSizeChange(contentWidth, contentHeight) {
    this._listViewContentHeight = contentHeight;
  }

  _onScroll = event => {
    console.log("act");
    // Simple fade-in / fade-out animation
    const CustomLayoutLinear = {
      duration: 100,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity
      },
      update: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity
      },
      delete: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity
      }
    };
    // Check if the user is scrolling up or down by confronting the new scroll position with your own one
    const limit = this._listViewContentHeight - this._listViewHeight;
    const offset = event.nativeEvent.contentOffset.y;
    const currentOffset = offset > limit ? limit : offset;

    const direction =
      currentOffset > 0 && currentOffset >= this._listViewOffset
        ? "down"
        : "up";
    console.log("dir" + direction);
    // If the user is scrolling down (and the action-button is still visible) hide it
    const isActionButtonVisible = direction === "up";
    if (isActionButtonVisible !== this.state.isActionButtonVisible) {
      LayoutAnimation.configureNext(CustomLayoutLinear);
      this.setState({ isActionButtonVisible });
    }
    // Update your scroll position
    this._listViewOffset = currentOffset;
  };

  /**
   * basic functiom
   *
   *
   */
  onSelectedItemsChange = selectedItems => {
    // selectedItems
    // this.setState({ selectedItems:selectedItems.toString() });
    this.state.selectedItems.length = 0;

    //this.state.selectedItems.splice(0, this.state.selectedItems.length);
    console.log("sel" + selectedItems);
    this.setState(
      { selectedItems: selectedItems },
      console.log("sel items" + this.state.selectedItems)
    );
  };
  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  _toggleModalStatus = () =>
    this.setState({ isModalVisibleStatus: !this.state.isModalVisibleStatus });
  showpoints = () => {
    this.calculate();
    this._toggleModal();
  };
  showstatus = () => {
    this.calculate();

    this._toggleModalStatus();
  };

  calculate = () => {
    //soiltype

    if (this.state.selectedSoiltype == "Type F") {
      this.setState({
        soiltypePoint: 20,
        soiltypeStatus: 1
      });
    } else {
      this.setState({
        soiltypePoint: 0,
        soiltypeStatus: 0
      });
    }
    //open cut
    if (this.state.srth != "" && this.state.srtd != "") {
      if (this.state.srth > this.state.srtd) {
        console.log("srth>srtd");
        this.setState({
          opencutPoint: 20,
          opencutStatus: 0
        });
      } else {
        console.log("srth<srtd");
        this.setState({
          opencutPoint: 0,
          opencutStatus: 0
        });
        //   this.changeStatus("Green")
      }
    }

    //open cut end

    //srw
    if (this.state.srwh != "" && this.state.srwd != "") {
      if (this.state.srwh > this.state.srwd) {
        this.setState({
          srwPoint: 20,
          srwStatus: 0
        });
      } else {
        this.setState({
          srwPoint: 0
        });
      }
    } else {
      if (this.state.srwh <= 2) {
        this.setState({
          srwhStatus: 0,
          srwStatus: 0
        });
      }
      if (this.state.srwh > 2) {
        this.setState({
          srwhStatus: 0
        });
      }
    }

    //srw end

    //frw
    if (this.state.frwh != "") {
      if (this.state.frwh > 1.6) {
        this.setState({
          frwPoint: 10,
          frwStatus: 2
        });
      } else if (this.state.frwh < 1.6) {
        this.setState({
          frwPoint: 5,
          frwStatus: 0
        });
      } else {
      }
    }

    //frw end

    //masonry-color

    if (this.state.selectedMasonary == 2) {
      this.setState({
        masonryStatus: 1
      });
    } else if (this.state.selectedMasonary == 1) {
      this.setState({
        masonryStatus: 0
      });
    } else {
      this.setState({
        masonryStatus: 0
      });

      //this.checkStoreyHeight();
    }
    //masonry end

    //storeys
    if (this.state.selectedStoreys == 1) {
      this.setState({
        nosMorethanThreePoint: 0,
        nos1Point: 0,
        nos2Point: 0,
        nosStatus: 0
        // latitudeSwitch:1
      });
    } else if (this.state.selectedStoreys == 2) {
      this.setState({
        nosMorethanThreePoint: 0,
        nos2Point: 3,
        nosStatus: 0
      });
    } else if (this.state.selectedStoreys == 3) {
      this.setState({
        nosMorethanThreePoint: 0,
        nos2Point: 0,
        nosStatus: 0
      });
    } else if (this.state.selectedStoreys == 4) {
      this.setState({
        nosMorethanThreePoint: 10,
        nos2Point: 0,
        nosStatus: 1
        //oundation_retaining_wall_switch: 1
      });
    } else {
    }
    //storeys end

    //facade
    if (this.state.selectedFacade == 2) {
      this.setState({
        facadenoPoint: 10,
        facadeStatus: 1
      });
      // this.changeStatus("Red");
    } else if (this.state.selectedFacade == 1) {
      this.setState({
        facadenoPoint: 0,
        facadeStatus: 0
      });
    } else {
      this.setState({
        facadenoPoint: 0,
        facadeStatus: 0
      });
    }
    //facade end

    //gap
    if (this.state.selectedGap == 2) {
      this.setState({
        gapPoint: 7,
        gapStatus: 1
      });
    } else if (this.state.selectedGap == 1) {
      this.setState({
        gapPoint: 7,
        gapStatus: 2
      });
      if (this.state.redFlag == 1) {
      } else {
      }
    } else {
      this.setState({
        gapSwitch: 0,
        gapStatus: 0
      });
    }
    //gap end

    //interstorey
    if (this.state.selectedinterstoreySlab == 1) {
      /*  this.setState({
    foundation_retaining_wall_switch: 0
  });*/
      this.setState({
        interstoreyStatus: 0
      });
    } else if (this.state.selectedinterstoreySlab == 2) {
      /* this.setState({
    foundation_retaining_wall_switch: 1
  });*/
      this.setState({
        interstoreyStatus: 0
      });
    } else if (this.state.selectedinterstoreySlab == 3) {
      /* this.setState({
    foundation_retaining_wall_switch: 1
  });*/
      this.setState({
        interstoreyStatus: 0
      });
    } else if (this.state.selectedinterstoreySlab == 4) {
      /* this.setState({
    foundation_retaining_wall_switch: 1
  });*/
      this.setState({
        interstoreyStatus: 1
      });
    } else {
      /* this.setState({
    foundation_retaining_wall_switch: 0
  });*/
    }
    //interstorey end

    //type of roof

    if (this.state.selectedRoofType == 2) {
      this.setState({
        lrwcStatus: 0
      });
    } else if (this.state.selectedRoofType == 1) {
    } else {
    }
    //type of roof end

    //quality of slab
    if (this.state.selectedQualitySlab == 2) {
      this.setState({
        qualityofslabmalaPoint: 20,
        qosStatus: 1
      });
    } else if (this.state.selectedQualitySlab == 1) {
      this.setState({
        qualityofslabmalaPoint: 0,
        qosStatus: 0
      });
    } else {
    }
    //quality of slab end

    //cantilever
    if (this.state.selectedCantiLever == 2) {
      this.setState({
        cantileverPoint: 0,
        cantileverStatus: 0
      });
    } else if (this.state.selectedCantiLever == 1) {
      this.setState({
        cantileverPoint: 5,
        cantileverStatus: 2
      });
    } else {
      this.setState({
        evidenceSwitch: 0
      });
    }
    //camtilever end

    //lrwx

    //lrwc end

    //roof slab
    if (this.state.selectedRoofSlab == 1) {
      this.setState({
        qosStatus: 0
      });
    } else if (this.state.selectedRoofSlab == 2) {
      this.setState({
        qosStatus: 0
      });
    } else if (this.state.selectedRoofSlab == 3) {
      this.setState({
        qosStatus: 0
      });
    } else {
      this.setState({
        qosStatus: 0
      });
    }
    //roof slab end

    //quality of roof
    if (this.state.selectedQualityRoof == 2) {
      this.setState({
        qorStatus: 1,
        qualityofroofmalaPoint: 20
      });

      /* this.setState({
    evidenceSwitch: 0
  });*/
    } else if (this.state.selectedQualityRoof == 1) {
      // this.changeStatus("Green");
      this.setState({
        qorStatus: 0,
        qualityofroofmalaPoint: 0
      });

      /*  this.setState({
    evidenceSwitch: 1
  });*/
    } else {
      this.setState({
        qorStatus: 0,
        qualityofroofmalaPoint: 0
      });
      /* this.setState({
    evidenceSwitch: 0
  });*/
    }
    //quality of roof end

    this.setState({
      totalPoint:
        this.state.soiltypePoint +
        this.state.opencutPoint +
        this.state.srwPoint +
        this.state.frwPoint +
        this.state.nosMorethanThreePoint +
        this.state.nos2Point +
        this.state.nos1Point +
        this.state.facadenoPoint +
        this.state.gapPoint +
        this.state.qualityofslabmalaPoint +
        this.state.cantileverPoint +
        this.state.qualityofroofmalaPoint
    });
    /*
this.setState({
  mainStatus:(this.state.soiltypePoint +
  this.state.opencutPoint +
    this.state.srwPoint +
    this.state.frwPoint +
    this.state.nosMorethanThreePoint +
    this.state.nos2Point +
    this.state.nos1Point +
    this.state.facadenoPoint +
    this.state.gapPoint +
    this.state.qualityofslabmalaPoint +
    this.state.cantileverPoint +
    this.state.qualityofroofmalaPoint)
});
*/

    this.state.soiltypeStatus == 1 ||
    this.state.opencutStatus != 0 ||
    this.state.srwhStatus != 0 ||
    this.state.srwStatus != 0 ||
    this.state.masonryStatus != 0 ||
    this.state.nosStatus != 0 ||
    this.state.qosStatus != 0 ||
    this.state.interstoreyStatus != 0 ||
    this.state.lrwcStatus != 0 ||
    this.state.qorStatus != 0 ||
    this.state.gapStatus == 1
      ? this.setState({
          mainStatus: "Red"
        })
      : this.state.savedStatus == 2 ||
        this.state.frwStatus == 2 ||
        this.state.gapStatus == 2 ||
        this.state.cantileverStatus == 2
      ? this.setState({
          mainStatus: "Yellow"
        })
      : this.setState({
          mainStatus: "Green"
        });

    //this.forceUpdate();
    //this.setState({ isModalVisibleStatus: true });
  };

  selectPhotoTapped(avatarnumber, e) {
    const { t, i18n, navigation } = this.props;
    const options = {
      noData: true,

      title: t("home:select_photo"),
      cancelButtonTitle: "Cancel",
      takePhotoButtonTitle: t("home:take_photo"),
      chooseFromLibraryButtonTitle: t("home:select_from_library"),
      medaType: "mixed",
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      // console.log("REsponse"+response);

      if (response.didCancel) {
        // console.log("User cancelled photo picker");
      } else if (response.error) {
        //console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        //console.log("User tapped custom button: ", response.customButton);
      } else {
        let source = { uri: response.uri };
        let data = response.path;
        let type = response.type;
        //  console.log("Response = ", JSON.stringify(response));
        //console.log("Response Path = ", JSON.stringify(data));
        console.log(source);
        // You can also display the image using data:
        //   let source = 'data:image/jpeg;base64,' + response.data
        // console.log(source);
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        if (avatarnumber == "1") {
          //  console.log("Data from avatarno"+data);
          this.setState({
            avatarSource1: source,
            avatar1data: data,
            avatar1type: type
          });
        }
        if (avatarnumber == "2") {
          this.setState({
            avatarSource2: source,
            avatar2data: data,
            avatar2type: type
          });
        }

        if (avatarnumber == "3") {
          this.setState({
            avatarSource3: source,
            avatar3data: data,
            avatar3type: type
          });
        }

        if (avatarnumber == 4) {
          //  console.log("into the avatar number 4");
          this.setState({
            avatarSource4: source,
            avatar4data: data,
            avatar4type: type
          });
        }
      }
    });
  }

  async setValue() {
    await AsyncStorage.setItem("hId", JSON.stringify(this.state.hId));
  }

  async getValue() {
    try {
      const value = await AsyncStorage.getItem("homeOwnerId");
      if (value !== null) {
        // We have data!!
        // console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  }
  getLatLong = async () => {
    this.setState({
      loadinglatlong: true
    });
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Example App",
          message: "Example App access to your location "
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log("You can use the location");
        // alert("You can use the location");
        // Instead of navigator.geolocation, just use Geolocation.
        //   if (hasLocationPermission) {
        Geolocation.getCurrentPosition(
          position => {
            this.setState({
              latitude: JSON.stringify(position.coords.latitude),
              longitude: JSON.stringify(position.coords.longitude),
              latlongSwitch: 1
            });
          },

          error => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
        this.afterLatLong();
        // }
      } else {
        //  console.log("location permission denied");
        alert("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  afterLatLong = async () => {
    const lat = this.state.latitude;
    const long = this.state.longitude;

    if (lat >= 4.45 && lat <= 4.85 && long >= -74.25 && long <= -73.95) {
      console.log("inside");
    } else {
      console.log("outside");
      this.setState({
        soilSwitch: 1
      });
    }
    console.log("from dhdhd");
    //console.log("from dhdhd");

    /*
  
  let photo = { uri: source.uri}
let formdata = new FormData();

formdata.append("product[name]", 'test')
formdata.append("product[price]", 10)
formdata.append("product[category_ids][]", 2)
formdata.append("product[description]", '12dsadadsa')
formdata.append("product[images_attributes[0][file]]", {uri: photo.uri, name: 'image.jpg', type: 'multipart/form-data'})


fetch('http://192.168.1.101:3000/products',{
method: 'post',
headers: {
  'Content-Type': 'multipart/form-data',
},
body: formdata
}).then(response => {
  console.log("image uploaded")
}).catch(err => {
  console.log(err)
})  
});
  
  */

    /* let formdata = new FormData();

 formdata.append("latitude", this.state.latitude);
 formdata.append("longitude", this.state.longitude);

 fetch('http://colapp.drcmp.org/api/checkfavalue',{
method: 'post',
headers: {
  'Content-Type': 'multipart/form-data',
},
body: formdata
}).then(response => {
  console.log("posted"+JSON.stringify(response))
}).catch(err => {
  console.log(err)
})  
});
*/
    /*
fetch("http://colapp.drcmp.org/api/checkfavalue", {
method: "post",
headers: {
  Accept: "application/json",
  "Content-Type": "application/json"
},
body: JSON.stringify({
  latitude: this.state.latitude,
  longitude: this.state.longitude
})
})
.then(response => {
  // this.props.navigation.navigate("BasicFormPart2");
  return response.json();
})
.then(async jsonResponse => {
 // console.log(JSON.stringify(jsonResponse));
 // console.log(jsonResponse.fa);
 //console.log(JSON.stringify(jsonResponse.fa));
if(jsonResponse.fa==0){
this.setState({
soilSwitch:1
});
}


})
.catch(error => {
  console.log(error);
});
this.setState({
  loadinglatlong:false,
  savedHomeowner:'12',
  savedPoint:10,
  savedStatus:'Red'

})
*/
  };
  formSubmitHomeowner = async () => {
    this.setState({
      loadingSubmit: true
    });
    var Id;
    var code;
    //if(this._isMounted){
    //console.log("into the submit form"+this.state.missingError);
    let missingField = "";

    if (this.state.surveyerName == "") {
      missingField += "Enter surveyerName\n";
      //console.log("MISSING FILES SURVEYNAME" + missingField);
      this.setState({
        surveyerNameError: "Enter surveyerName"
      });
    }
    if (this.state.homeownerName == "") {
      missingField += "Enter HomeOwner\n";
      this.setState({
        homeownerNameError: "Enter Home Owner"
      });
    }
    if (this.state.documentNumber == "") {
      missingField += "Enter Document Number\n";
      this.setState({
        documentNumberError: "Enter Document Number"
      });
    }
    if (this.state.bario == "") {
      missingField += "Bario\n";
    }

    if (this.state.avatarSource1 == null) {
      missingField += "Upload Document\n";
    }
    if (this.state.avatarSource2 == null) {
      missingField += "Upload Facade1\n";
    }
    /*
  if (this.state.selectedItems == "") {
    missingField += "Select Municipality\n";
  }
  */

    if (this.state.address == "") {
      missingField += "Enter Address\n";
      this.setState({
        addressError: "Enter Address"
      });
    }
    if (this.state.telephoneNumber == "") {
      missingField += "Enter Telephone\n";
      this.setState({
        telephoneNumberError: "Enter Telephone"
      });
    }

    if (this.state.selectedOpenCut == "") {
      missingField += "Select Open cut option\n";
      /* this.setState({
      telephoneNumberError: "Enter Telephone"
    });
    */
    }

    if (this.state.selectedsrw == "") {
      missingField += "Select Side Retaining Wall option\n";
      /* this.setState({
      telephoneNumberError: "Enter Telephone"
    });
    */
    }

    if (this.state.selectedfrw == "") {
      missingField += "Select Founadtion Retaining Wall \n";
      /* this.setState({
      telephoneNumberError: "Enter Telephone"
    });
    */
    }

    if (this.state.selected_living_space == "") {
      missingField += "Select Living space\n";
      /* this.setState({
      telephoneNumberError: "Enter Telephone"
    });
    */
    }

    if (this.state.selected_house == "") {
      missingField += "Select house option\n";
      /*  this.setState({
      telephoneNumberError: "Enter Telephone"
    });*/
    }

    if (this.state.selected_floor == "") {
      missingField += "Select Floor option\n";
      /* this.setState({
      telephoneNumberError: "Enter Telephone"
    });*/
    }

    if (this.state.selected_housing_unit == "") {
      missingField += "Select Housing unit option\n";
      /* this.setState({
      telephoneNumberError: "Enter Telephone"
    });
    */
    }

    if (this.state.selected_electrical_network == "") {
      missingField += "Select Electrical option\n";
      /*  this.setState({
      telephoneNumberError: "Enter Telephone"
    });*/
    }

    if (this.state.selected_sewer_network == "") {
      missingField += "Select Sewer Network option\n";
      /* this.setState({
      telephoneNumberError: "Enter Telephone"
    });*/
    }

    if (this.state.selected_kitchen == "") {
      missingField += "Select Kitchen option\n";
      /*  this.setState({
      telephoneNumberError: "Enter Telephone"
    });*/
    }

    if (this.state.selected_free_height == "") {
      missingField += "Select Free height option\n";
      /* this.setState({
      telephoneNumberError: "Enter Telephone"
    });*/
    }

    if (missingField == "") {
      // this.props.navigation.navigate("BasicFormPart2");
    } else {
      Alert.alert(missingField);
    }

    // if(this.state.missingError<0){
    var abc = JSON.stringify({
      date: this.state.dateTime,
      surveyer_id: this.state.userId,
      name: this.state.homeownerName,
      document_number: this.state.documentNumber,

      document: this.state.avatarSource1,
      phone: this.state.telephoneNumber,
      address: this.state.address,
      facade_1: this.state.avatarSource2,
      facade_2: this.state.avatarSource3,
      lot_no: this.state.lotNo,
      chip_code: this.state.chipCode,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      municipality: this.state.selectedMunicipality,
      bario: this.state.bario,
      soil_type: this.state.selectedSoiltype
    });

    RNFetchBlob.fetch(
      "POST",
      "http://colapp.drcmp.org/api/homeowner/create",
      {
        //   Authorization : "Bearer access-token",
        // otherHeader : "foo",
        // this is required, otherwise it won't be process as a multipart/form-data request
        "Content-Type": "multipart/form-data"
      },
      [
        { name: "date", data: this.state.dateTime },
        { name: "surveyer_id", data: this.state.userId },
        { name: "name", data: this.state.homeownerName },
        { name: "document_number", data: this.state.documentNumber },

        {
          name: "document",
          filename: "document.jpeg",
          filetype: "image/jpeg",
          data: RNFetchBlob.wrap(this.state.avatar1data)
        },

        { name: "phone", data: this.state.telephoneNumber },
        { name: "address", data: this.state.address },

        {
          name: "facade_1",
          filename: "document.jpeg",
          filetype: "image/jpeg",
          data: RNFetchBlob.wrap(this.state.avatar2data)
        },

        {
          name: "facade_2",
          filename: "facade_2.jpeg",
          filetype: "image/jpeg",
          data: RNFetchBlob.wrap(this.state.avatar3data)
        },

        { name: "lot_no", data: this.state.lotNo },
        { name: "chip_code", data: this.state.chipCode },
        { name: "latitude", data: this.state.latitude },
        { name: "longitude", data: this.state.longitude },
        { name: "municipality", data: this.state.selectedMunicipality },
        { name: "bario", data: this.state.bario },
        { name: "soil_type", data: this.state.soil_type }
      ]
    )
      .then(response => {
        // this.props.navigation.navigate("BasicFormPart2");
        return response.json();
      })
      .then(jsonResponse => {
        //  console.log(JSON.stringify(jsonResponse));

        if (jsonResponse.status == "success") {
          AsyncStorage.setItem(
            "savedPoint",
            jsonResponse.value.point.toString()
          );
          AsyncStorage.setItem("savedStatus", jsonResponse.value.status);
          AsyncStorage.setItem(
            "savedHomeowner",
            jsonResponse.homeowner.id.toString()
          );
          Toast.show({
            text: "Homeowner Form sucessfully submitted",
            buttonText: "Okay",
            type: "success",
            duration: 3000
          });
          this.setState({
            loadingSubmit: false
          });
          //  this.props.navigation.navigate("BasicFormPart2");
        } else {
          Toast.show({
            text: "Problem in sending Data.Please Try Again",
            buttonText: "Okay",
            type: "danger",
            duration: 3000
          });
          this.setState({
            loadingSubmit: false
          });
        }
      })
      .catch(err => {
        // ...
      });

    //this.props.navigation.navigate("BasicFormPart2");
    /*   var data = new FormData();
  data.append("date", this.state.dateTime);
  data.append("surveyer_id", this.state.userId);
  data.append("name", this.state.homeownerName);
  data.append("document_number", this.state.documentNumber);
  data.append("document", {
    uri: this.state.avatarSource1.uri,
    type: "image/jpeg", // or photo.type
    name: "testPhotoName1"
  });
  //data.append("document", this.state.avatarSource1);
  data.append("phone", this.state.telephoneNumber);
  data.append("address", this.state.address);

  data.append("facade_1", {
    uri: this.state.avatarSource1.uri,
    type: "image/jpeg", // or photo.type
    name: "testPhotoName2"
  });

  data.append("facade_2", {
    uri: this.state.avatarSource3.uri,
    type: "image/jpeg", // or photo.type
    name: "testPhotoName3"
  });

  data.append("lot_no", this.state.lotNo);
  data.append("chip_code", this.state.chipCode);
  data.append("latitude", this.state.latitude);
  data.append("longitude", this.state.longitude);
  data.append("municipality", this.state.selectedMunicipality);

  data.append("bario", this.state.bario);
  data.append("soil_type", this.state.selectedSoiltype);
  
  console.log("FORM DATA" + JSON.stringify(data));*/
    /*   data.append('photo', {
    uri: photo.uri,
    type: 'image/jpeg', // or photo.type
    name: 'testPhotoName'
  });
   data.append('theFile', { uri: mImage.uri, name: 'profile_photo.jpg', type: 'image/jpg' });

  fetch(url, {
    method: 'post',
    body: data
  }).then(res => {
    console.log(res)
  });*/

    /*  fetch(url, {
          method: "post",
          body: data
        }).then(res => {
          console.log(res);
        });
    */

    /*

  fetch("http://colapp.drcmp.org/api/homeowner/create", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      date_time: this.state.dateTime,
      surveyer_id: this.state.userId,
      name: this.state.homeownerName,
      document_number: this.state.documentNumber,

      document: this.state.avatarSource1.uri,

      phone: this.state.telephoneNumber,
      address: this.state.address,
      facade_1: this.state.avatarSource2.uri,
      facade_2: this.state.avatarSource3.uri,
      lot_no: this.state.lotNo,
      chip_code: this.state.chipCode,
   //   latitude: this.state.latitude,
     // longitude: this.state.longitude,
      latitude: 4.7712556,
      longitude: -73.812548,
      municipality: this.state.selectedMunicipality,
      bario: this.state.bario,
      soil_type:this.state.selectedSoiltype,
    })
  })
    .then(response => {
      // this.props.navigation.navigate("BasicFormPart2");
      return response.json();
    })
    .then(jsonResponse => {
console.log(JSON.stringify(jsonResponse));

      if(jsonResponse.status=='success'){
        AsyncStorage.setItem("savedPoint",jsonResponse.value.point.toString());
        AsyncStorage.setItem("savedStatus",jsonResponse.value.status);
        AsyncStorage.setItem("savedHomeowner",jsonResponse.homeowner.id.toString());
        Toast.show({
          text: "Homeowner Form sucessfully submitted",
          buttonText: "Okay",
          type: "success",
          duration: 3000
        })
        this.setState({
          loadingSubmit:false
        })
        this.props.navigation.navigate("BasicFormPart2");

      }
      else{
        Toast.show({
          text: "Problem in sending Data.Please Try Again",
          buttonText: "Okay",
          type: "danger",
          duration: 3000
        })
        this.setState({
          loadingSubmit:false
        })
      }




    })
    .catch(error => {
      console.log(error);
    });
*/
    //   await AsyncStorage.setItem('homeOwnerId',JSON.stringify(Id) );
    // await AsyncStorage.setItem('ChipCode', JSON.stringify(code));
    //await this.getValue();
    //  this.props.navigation.navigate("BasicFormPart2");
    /*    fetch(" http://colapp.drcmp.org/api/homeowner/create", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
           // 'Content-type': 'application/x-www-form-urlencoded'
          },
          // formdata
          body: JSON.stringify({
            name: this.state.fullName,
            address: this.state.address,
            lot_no: this.state.lotNo,
            chip_code: this.state.chipCode,
            phone: this.state.contactNo,
            latitude:this.state.latitude,
            longitude:this.state.longitude
          })
        })
          .then(response => {
            console.log(response)
            return response.json()
          })
          .then(responseJson => {
            console.log(responseJSON);
            Alert.alert(responseJson);
          })
          .catch(error => {
            console.error(error);
          });
*/

    /*  fetch('https://gabbarseang.000webhostapp.com/user_login.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            formdata
            body: JSON.stringify({
          
            
          
              email: this.state.email,
          
              password: this.state.password
          
            })
          
          }).then((response) => response.json())
                .then((responseJson) => {
          
          
                  Alert.alert(responseJson);
          
                }).catch((error) => {
                  console.error(error);
                });*/
    //  await AsyncStorage.setItem('userToken', 'sakar');
    // await AsyncStorage.setItem('Role', 'Staff');

    //  this.props.navigation.navigate("BasicFormPart2");
    //   }

    //   }

    //  Alert.alert("Sucessfully submit");
    // this.props.navigation.navigate("BasicFormPart2");
  };

  upload() {
    console.log("into the form upload");
    console.log("data==" + this.state.avatar1data);
    RNFetchBlob.fetch(
      "POST",
      "http://192.168.100.157/colapp/upload.php",
      {
        Authorization: "Bearer access-token",
        otherHeader: "foo",
        "Content-Type": "multipart/form-data"
      },
      [
        // element with property `filename` will be transformed into `file` in form data
        {
          name: "image",
          filename: "avatar.jpeg",
          filetype: "image/jpeg",
          data: RNFetchBlob.wrap(this.state.avatar1data)
        }
      ]
    )
      .then(resp => {
        console.log("response upload" + JSON.stringify(resp));
        // ...
      })
      .catch(err => {
        // ...
      });
  }

  /**
   * basic function
   *
   *
   */

  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  showpoints = () => {
    this._toggleModal();
  };
  add_Survey = () => {
    let missingField = "";

    if (this.state.surveyerName == "") {
      missingField += "Enter surveyerName\n";
      console.log("MISSING FILES SURVEYNAME" + missingField);
      this.setState({
        surveyerNameError: "Enter surveyerName"
      });
    }
    if (this.state.homeownerName == "") {
      missingField += "Enter HomeOwner\n";
      this.setState({
        homeownerNameError: "Enter Home Owner"
      });
    }
    if (this.state.documentNumber == "") {
      missingField += "Enter Document Number\n";
      this.setState({
        documentNumberError: "Enter Document Number"
      });
    }
    if (this.state.bario == "") {
      missingField += "Bario\n";
    }

    if (this.state.avatarSource1 == null) {
      missingField += "Upload Document\n";
    }
    if (this.state.avatarSource2 == null) {
      missingField += "Upload Facade1\n";
    }
    /*
    if (this.state.selectedMunicipality == "") {
      missingField += "Select Municipality\n";
    }*/

    if (this.state.address == "") {
      missingField += "Enter Address\n";
      this.setState({
        addressError: "Enter Address"
      });
    }
    if (this.state.telephoneNumber == "") {
      missingField += "Enter Telephone\n";
      this.setState({
        telephoneNumberError: "Enter Telephone"
      });
    }

    if (this.state.selectedOpenCut == "") {
      missingField += "Select Open cut option\n";
      /* this.setState({
        telephoneNumberError: "Enter Telephone"
      });
      */
    }

    if (this.state.selectedsrw == "") {
      //  missingField += "Select Side Retaining Wall option\n";
      /* this.setState({
        telephoneNumberError: "Enter Telephone"
      });
      */
    }

    if (this.state.selectedfrw == "") {
      // missingField += "Select Founadtion Retaining Wall \n";
      /* this.setState({
        telephoneNumberError: "Enter Telephone"
      });
      */
    }

    if (this.state.selected_living_space == "") {
      missingField += "Select Living space\n";
      /* this.setState({
        telephoneNumberError: "Enter Telephone"
      });
      */
    }

    if (this.state.selected_house == "") {
      //  missingField += "Select house option\n";
      /*  this.setState({
        telephoneNumberError: "Enter Telephone"
      });*/
    }

    if (this.state.selected_floor == "") {
      missingField += "Select Floor option\n";
      /* this.setState({
        telephoneNumberError: "Enter Telephone"
      });*/
    }

    if (this.state.selected_housing_unit == "") {
      missingField += "Select Housing unit option\n";
      /* this.setState({
        telephoneNumberError: "Enter Telephone"
      });
      */
    }

    if (this.state.selected_electrical_network == "") {
      missingField += "Select Electrical option\n";
      /*  this.setState({
        telephoneNumberError: "Enter Telephone"
      });*/
    }

    if (this.state.selected_sewer_network == "") {
      missingField += "Select Sewer Network option\n";
      /* this.setState({
        telephoneNumberError: "Enter Telephone"
      });*/
    }

    if (this.state.selected_kitchen == "") {
      missingField += "Select Kitchen option\n";
      /*  this.setState({
        telephoneNumberError: "Enter Telephone"
      });*/
    }

    if (this.state.selected_free_height == "") {
      missingField += "Select Free height option\n";
      /* this.setState({
        telephoneNumberError: "Enter Telephone"
      });*/
    }
    if (missingField == "") {
      console.log(this.state.avatarSource1);
      console.log("2" + JSON.stringify(this.state.avatarSource1));

      var ID = realm.objects("survey_details").length + 1;
      realm.objects("survey_details").sorted("key", true).length > 0
        ? realm.objects("survey_details").sorted("key", true)[0].key + 1
        : 1;
      console.log("ID==" + ID);
      realm.write(() => {
        savedPerson = realm.create("survey_details", {
          key: ID,
          date: this.state.dateTime,
          surveyer_id: this.state.userId.toString(),
          name: this.state.homeownerName,
          document_number: this.state.documentNumber,
          document: this.state.avatarSource1.uri,
          document_data: this.state.avatar1data,
          document_type: this.state.avatar1type,

          phone: this.state.telephoneNumber,
          facade_1: this.state.avatarSource2.uri,
          facade_1_data: this.state.avatar2data,
          facade_1_type: this.state.avatar2type,
          facade_2:
            this.state.avatarSource3 == null
              ? "no data"
              : this.state.avatarSource3.uri,
          facade_2_data:
            this.state.avatar3data == "" ? "no data" : this.state.avatar3data,
          facade_2_type:
            this.state.avatar3type == "" ? "" : this.state.avatar3data,
          lot_no: this.state.lotNo,
          chip_code: this.state.chipCode,

          latitude: this.state.latitude,
          longitude: this.state.longitude,
          municipality: this.state.selectedItems.toString(),
          bario: this.state.bario,
          soil_type: this.state.selectedSoiltype.toString(),

          open_cut: this.state.selectedOpenCut.toString(),
          open_cut_height: this.state.srth.toString(),
          open_cut_distance_to_house: this.state.srtd.toString(),
          site_retaining_wall: this.state.selected_side_retaining_wall.toString(),
          site_retaining_wall_height: this.state.srwh.toString(),
          distance_from_wall_to_house: this.state.srwd.toString(),
          foundation_retaining_wall: this.state.selected_foundation_retaining_wall.toString(),
          foundation_retaining_wall_height: this.state.frwh.toString(),
          is_masonry: this.state.selectedMasonary.toString(),
          no_of_storeys: this.state.selectedStoreys.toString(),
          facade: this.state.selectedFacade.toString(),
          gap: this.state.selectedGap.toString(),
          interstory_slab: this.state.selectedinterstoreySlab.toString(),
          quality_of_slab: this.state.selectedQualitySlab.toString(),
          occupied_cantilever: this.state.selectedCantiLever.toString(),
          qualiry_of_roof: this.state.selectedRoofType.toString(),
          //roof_slab:this.state.selectedRoofSlab.toString(),

          //    selectedLwr,
          type_of_roof: this.state.selectedRoofType.toString(),
          roof_slab: this.state.selectedRoofSlab.toString(),
          qualiry_of_roof_slab: this.state.selectedQualityRoof.toString(),

          living_space: this.state.selected_living_space.toString(),
          floor_firm: this.state.selected_floor.toString(),
          electrical_network: this.state.selected_electrical_network.toString(),
          aqueduct_network: this.state.selected_aqueduct_network.toString(),
          sever_network: this.state.selected_sewer_network.toString(),
          equipped: this.state.selected_equipped.toString(),
          kitchen: this.state.selected_kitchen.toString(),
          free_height: this.state.selected_free_height.toString()
        });
      });

      /*  RealmSchemas.write(() => {
          
               var ID = realm.objects('Survey').length + 1;
          console.log("ID=="+ID);
               RealmSchemas.create('Survey', {
          
         
         
         
         
         
                  id: ID,
                  date:'22213123',
                surveyer_id:  '12',
                name: 'asdasd',
                document_number: '213',
                document: 'adsad',
                phone: '123',
                facade_1: '2312',
                facade_2: '21331312',
                lot_no: '32131232',
                chip_code: 'str132312ing',
          
                latitude: '32131',
                longitude: '213132',
                municipality: '12313',
                bario: '123123',
                soil_type: '1233123',
                 });
                 
             });
          */
      Alert.alert("Survey Added Successfully.");
      this.props.navigation.navigate("ViewAll");

      // this.props.navigation.navigate("BasicFormPart2");
    } else {
      Alert.alert(missingField);
    }
  };
  triggerChildAlert() {
    console.log("into child trigger");
    this.refs.child.callChildMethod();
    // to get child parent returned  value-
    // this.value = this.refs.child.callChildMethod();
    // alert('Returned value- '+this.value);
  }
  _toggleShow = () => {
    this.setState({ showComponmentA: !this.state.showComponmentA });
  };
  _toggleShow2 = () => {
    this.setState({ showComponmentB: !this.state.showComponmentB });
  };
  _toggleShow3 = () => {
    this.setState({ showComponmentC: !this.state.showComponmentC });
  };
  _toggleShow4 = () => {
    this.setState({ showComponmentD: !this.state.showComponmentD });
  };

  toggleFooter = () => {
    this.setState({ showComponentFooter: !this.state.showComponentFooter });
  };
  _toggleHomeownerForm = () => {
    this.setState({ showHomeownerForm: !this.state.showHomeownerForm });
  };
  magicPlanAppOpen() {
    /*  const APP_ID = "com.sensopia.magicplan";
    const appDeepLinkURL = "whatsapp://send?text=Hello%20World!";

    Linking.openURL(appDeepLinkURL).catch(err => {
      Linking.openURL(`market://details?id=${APP_ID}`)
        .catch(err =>
          Linking.openURL(
            `http://play.google.com/store/apps/details?id=${APP_ID}`
          )
        )
        .catch(err => console.error("An error occurred", err));
    });*/
    SendIntentAndroid.openApp("com.sensopia.magicplan").then(wasOpened => {});
  }
  /*
getSavedStatus=(item)=>{
  console.log("item saved status=="+item);
  if(item=='Red'){
    this.setState({
      savedStatus:1
    });
  }
  else   if(item=='Yellow'){
    console.log("Here");
    this.setState({
      savedStatus:2
    });
  }
  else{
    this.setState({
      savedStatus:0
    });
  }
}*/

  loadApp = async () => {
    /*

    try {
      AsyncStorage.getItem('savedPoint',(err,item) => {
        if (item) {
          this.setState({
            savedPoint: parseInt(item),
          },
          console.log("savedPonit++",item)          
          );
        }
      });
      } catch (error) {
      console.log("Error retrieving data" + error);
    }

    try {
      AsyncStorage.getItem('savedStatus',(err,item) => {


        this.getSavedStatus(item)
  
      });
      } catch (error) {
      console.log("Error retrieving data" + error);
    }

    
    try {
      AsyncStorage.getItem('savedHomeowner',(err,item) => {
        if (item) {
          this.setState({
            savedHomeowner: parseInt(item),
          },
          console.log("savedhomeowner++",item)          
          );
        }
      });
      } catch (error) {
      console.log("Error retrieving data" + error);
    }
*/
    try {
      AsyncStorage.getItem("userId", (err, item) => {
        if (item) {
          this.setState(
            {
              userId: parseInt(item)
            },
            console.log("saveduserIdr++", item)
          );
        }
      });
    } catch (error) {
      console.log("Error retrieving data" + error);
    } /*
savedStatus
?
this.state.savedStatus=='Red'

?
this.setState({
  savedStatus:1
})
:
this.state.savedStatus=='Yellow'
?
this.setState({
  savedStatus:2
})
:
this.setState({
  savedStatus:0
})


:
console.log("2== "+savedStatus)
*/

    /*
    
    const savedStatus = await AsyncStorage.getItem("savedStatus");
    savedPoint
    ?
    this.setState({
     
      savedPoint: 10
    },
    console.log("Saved Point=="+this.state.savedPoint+"saved status=="+this.state.savedStatus)
    )
    :
    this.setState({
      savedPoint: 0,
     
    },
    console.log("Saved Point=="+this.state.savedPoint+"saved status=="+this.state.savedStatus)
    )
*/

    /*

    const savedStatus = await AsyncStorage.getItem("savedStatus");
    const savedPoint = await AsyncStorage.getItem("savedPoint");
    console.log("HOMEOWNER ID" + homeOwnerId);
    console.log("ChipCode" + chipCode);
    console.log("savedStatus" + savedStatus);
    console.log("savedPoint" + savedPoint);

  
      if(this.savedStatus=='Red'){
        this.setState({
          savedStatus: 1,
          savedPoint: this.savedPoint
        },
        console.log("Saved Point=="+this.state.savedPoint+"saved status=="+this.state.savedStatus)
        );
      }
      else if(this.savedStatus=='Green')
      {
        this.setState({
          savedStatus: 0,
          savedPoint: this.savedPoint
        },
        console.log("Saved Point=="+this.state.savedPoint+"saved status=="+this.state.savedStatus)
        );
      }
      else if(this.savedStatus=='Yellow')
      {
        this.setState({
          savedStatus: 2,
          savedPoint: this.savedPoint
        
      },
        console.log("Saved Point=="+this.state.savedPoint+"saved status=="+this.state.savedStatus)
        );
      }
      else{
  
      }
    

*/

    /* homeOwnerId
      ? this.setState({
        homeOwnerId:homeOwnerId ,
        chipCode: chipCode
        })
      : this.setState({
        homeOwnerId:null ,
        chipCode: null
        });*/
  };
  async componentDidMount() {
    this._isMounted = true;
    // this.changeStatus('green');
    // this.changePoint('20');
    var date = new Date();
    var month = parseInt(date.getMonth() + 1);
    var newdate =
      date.getFullYear() +
      "-" +
      month +
      "-" +
      date.getDate() +
      " " +
      date.toLocaleTimeString();

    this.setState({
      dateTime: newdate
    });
    const userToken = await AsyncStorage.getItem("username");
    const userIdVar = await AsyncStorage.getItem("userId");

    const role1 = await AsyncStorage.getItem("Role");

    userToken
      ? this.setState(
          {
            surveyerName: userToken
          }

          //console.log("LOGIN TRUE"+this.state.surveyerName)
        )
      : this.setState(
          {
            isLogin: false
          }
          //console.log("LOGIN flase"+this.state.isLogin)
        );

    userIdVar
      ? this.setState(
          {
            userId: userIdVar
          }

          //console.log("LOGIN TRUE"+this.state.surveyerName)
        )
      : this.setState(
          {
            isLogin: false
          }
          //console.log("LOGIN flase"+this.state.isLogin)
        );
    await this.loadApp();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  getData = () => {
    console.log("get Data");
    fetch("http://colapp.drcmp.org/api/go-nogo/create", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        homeowner_id: this.state.homeOwnerId
      })
    })
      .then(response => {
        return response.json();
      })
      .then(async jsonResponse => {
        //console.log(jsonResponse);
        // console.log(jsonResponse.data.chip_code);
        // Id = jsonResponse.data.id;
        // code = jsonResponse.data.chip_code;
        /*   this.setState(
      {
        hId: jsonResponse.data.id
       
      },
      function() {
        console.log("ino set data 1");
        AsyncStorage.setItem("homeOwnerId", JSON.stringify(this.state.hId));
        AsyncStorage.setItem("chipCode", JSON.stringify(this.state.hcode));
        this.props.navigation.navigate("BasicFormPart2");
        console.log("ino set data 1");
      }
    );*/
      })
      .catch(error => {
        console.log(error);
      });
  };
  checkStoreys = () => {
    // Alert.alert("hey");
    //console.log("into the storeys1");
    var storeysType = parseInt(this.state.selectedStoreys);
    //console.log("into srwheight" + storeysType);
    if (storeysType == 1) {
      //console.log(" if 1storeyType" + storeysType);
    } else if (storeysType == 2) {
      //console.log("else if 2storeyType" + storeysType);
    } else if (storeysType == 3) {
      //console.log("else if 3storeyType" + storeysType);
    } else {
      //console.log("else storeyType" + storeysType);
    }
  };

  checkInterstorey = () => {
    // Alert.alert("hey");
    console.log("into the storeys1");
    /*   var storeysType = parseInt(this.state.selectedStoreys);
    console.log("into srwheight" + storeysType);
    if (storeysType == 1) {
      console.log(" if 1storeyType" + storeysType);

    } else if (storeysType == 2) {
      console.log("else if 2storeyType" + storeysType);

    } else if (storeysType == 3) {
      console.log("else if 3storeyType" + storeysType);
    } else {
      console.log("else storeyType" + storeysType);
    }*/
  };

  checkRoofSlab = () => {
    // Alert.alert("hey");
    console.log("into the checkRoofSlab");
    /*   var storeysType = parseInt(this.state.selectedStoreys);
    console.log("into srwheight" + storeysType);
    if (storeysType == 1) {
      console.log(" if 1storeyType" + storeysType);

    } else if (storeysType == 2) {
      console.log("else if 2storeyType" + storeysType);

    } else if (storeysType == 3) {
      console.log("else if 3storeyType" + storeysType);
    } else {
      console.log("else storeyType" + storeysType);
    }*/
  };

  formSubmit = () => {
    alert("formsubmit");
    const url = "";

    let missingField = "";

    if (this.state.surveyerName == "") {
      missingField += "Enter surveyerName\n";
      console.log("MISSING FILES SURVEYNAME" + missingField);
      this.setState({
        surveyerNameError: "Enter surveyerName"
      });
    }
    if (this.state.homeownerName == "") {
      missingField += "Enter HomeOwner\n";
      this.setState({
        homeownerNameError: "Enter Home Owner"
      });
    }
    if (this.state.documentNumber == "") {
      missingField += "Enter Document Number\n";
      this.setState({
        documentNumberError: "Enter Document Number"
      });
    }
    if (this.state.bario == "") {
      missingField += "Bario\n";
    }

    if (this.state.avatarSource1 == null) {
      missingField += "Upload Document\n";
    }
    if (this.state.avatarSource2 == null) {
      missingField += "Upload Facade1\n";
    }

    if (this.state.selectedItems == "") {
      missingField += "Select Municipality\n";
    }

    if (this.state.address == "") {
      missingField += "Enter Address\n";
      this.setState({
        addressError: "Enter Address"
      });
    }
    if (this.state.telephoneNumber == "") {
      missingField += "Enter Telephone\n";
      this.setState({
        telephoneNumberError: "Enter Telephone"
      });
    }

    if (this.state.selectedOpenCut == "") {
      missingField += "Select Open cut option\n";
    }

    if (this.state.selectedsrw == "") {
    }

    if (this.state.selectedfrw == "") {
    }

    if (this.state.selected_living_space == "") {
      missingField += "Select Living space\n";
    }

    if (this.state.selected_house == "") {
    }

    if (this.state.selected_floor == "") {
      missingField += "Select Floor option\n";
    }

    if (this.state.selected_electrical_network == "") {
      missingField += "Select Electrical option\n";
    }

    if (this.state.selected_sewer_network == "") {
      missingField += "Select Sewer Network option\n";
    }

    if (this.state.selected_kitchen == "") {
      missingField += "Select Kitchen option\n";
    }

    if (this.state.selected_free_height == "") {
      missingField += "Select Free height option\n";
    }

    if (missingField == "") {
      this.setState({
        loadingSubmit: true
      });

      // if(this.state.missingError<0){
      var abc = JSON.stringify({
        //  date: aaa,
        surveyer_id: this.state.userId,
        name: this.state.homeownerName,
        document_number: this.state.documentNumber,

        document: this.state.avatarSource1,
        phone: this.state.telephoneNumber,
        address: this.state.address,
        facade_1: this.state.avatarSource2,
        facade_2: this.state.avatarSource3,
        lot_no: this.state.lotNo,
        chip_code: this.state.chipCode,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        municipality: this.state.selectedItems,
        bario: this.state.bario,
        soil_type: this.state.selectedSoiltype
      });

      console.log("abc==" + abc);

      var def = JSON.stringify([
        { name: "date", data: this.state.dateTime.toString() },
        { name: "surveyer_id", data: this.state.userId },
        { name: "name", data: this.state.homeownerName },
        { name: "document_number", data: this.state.documentNumber },

        {
          name: "document",
          filename: "document.jpeg",
          filetype: this.state.type,
          data: RNFetchBlob.wrap(this.state.avatar1data)
        },

        { name: "phone", data: this.state.telephoneNumber.toString() },
        { name: "address", data: this.state.address },

        {
          name: "facade_1",
          filename: "document.jpeg",
          filetype: this.state.type,
          data: RNFetchBlob.wrap(this.state.avatar2data)
        },

        {
          name: "facade_2",
          filename: "facade_2.jpeg",
          filetype: this.state.type,
          data: RNFetchBlob.wrap(this.state.avatar3data)
        },

        { name: "lot_no", data: this.state.lotNo.toString() },
        { name: "chip_code", data: this.state.chipCode.toString() },
        { name: "latitude", data: this.state.latitude.toString() },
        { name: "longitude", data: this.state.longitude.toString() },
        { name: "municipality", data: this.state.selectedItems.toString() },
        { name: "bario", data: this.state.bario.toString() },
        { name: "soil_type", data: this.state.selectedSoiltype.toString() }
      ]);
      console.log("def=" + JSON.stringify(def));
      //  RNFetchBlob.fetch('POST', 'http://colapp.drcmp.org/api/homeowner/create', {
      RNFetchBlob.fetch(
        "POST",
        "http://colapp.drcmp.org/api/offlinesurveyform",
        {
          //   Authorization : "Bearer access-token",
          // otherHeader : "foo",
          // this is required, otherwise it won't be process as a multipart/form-data request
          "Content-Type": "multipart/form-data"
        },
        [
          // { name : 'date_time', data :'2019-2-13 10:11:12'},
          // { name : 'date_time', data :'2019-02-29 20:58:13'},
          // { name : 'date_time', data :' 2015-10-28 19:18:44'},
          { name: "point", data: "100" },
          { name: "house_status", data: "red" },
          { name: "date_time", data: this.state.dateTime.toString() },
          { name: "surveyer_id", data: this.state.userId.toString() },
          { name: "name", data: this.state.homeownerName.toString() },
          {
            name: "document_number",
            data: this.state.documentNumber.toString()
          },

          {
            name: "document",
            filename: "document.jpeg",
            filetype: this.state.type,
            data: RNFetchBlob.wrap(this.state.avatar1data)
          },

          //{ name : 'document', data : this.state.documentNumber.toString()},

          { name: "phone", data: this.state.telephoneNumber.toString() },
          { name: "address", data: this.state.address.toString() },

          {
            name: "facade_1",
            filename: "document.jpeg",
            filetype: this.state.type,
            data: RNFetchBlob.wrap(this.state.avatar2data)
          },
          //   { name : 'facade_1', data : this.state.documentNumber.toString()},

          {
            name: "facade_2",
            filename: "facade_2.jpeg",
            filetype: this.state.type,
            data: RNFetchBlob.wrap(this.state.avatar2data)
          },
          // { name : 'facade_2', data : this.state.documentNumber.toString()},

          { name: "lot_no", data: this.state.lotNo.toString() },
          { name: "chip_code", data: this.state.chipCode.toString() },
          { name: "latitude", data: this.state.latitude.toString() },
          { name: "longitude", data: this.state.longitude.toString() },
          { name: "municipality", data: this.state.selectedItems.toString() },
          { name: "bario", data: this.state.bario.toString() },
          { name: "soil_type", data: this.state.selectedSoiltype.toString() },

          {
            name: "open_cut",
            data: this.state.selectedOpenCut == 1 ? "yes" : "no"
          },
          { name: "open_cut_height", data: this.state.srth.toString() },
          {
            name: "open_cut_distance_to_house",
            data: this.state.srtd.toString()
          },
          {
            name: "site_retaining_wall",
            data: this.state.selected_side_retaining_wall == 1 ? "yes" : "no"
          },
          {
            name: "site_retaining_wall_height",
            data: this.state.srwh.toString()
          },

          {
            name: "distance_from_wall_to_house",
            data: this.state.srwd.toString()
          },
          {
            name: "foundation_retaining_wall",
            data:
              this.state.selected_foundation_retaining_wall == 1 ? "yes" : "no"
          },
          {
            name: "foundation_retaining_wall_height",
            data: this.state.frwh.toString()
          },
          {
            name: "is_masonry",
            data: this.state.selectedMasonary == 1 ? "yes" : "no"
          },

          {
            name: "no_of_storeys",
            data: this.state.selectedStoreys.toString()
          },

          {
            name: "facade",
            data: this.state.selectedFacade == 1 ? "yes" : "no"
          },
          { name: "gap", data: this.state.selectedGap == 1 ? "yes" : "no" },
          {
            name: "foundation_retaining_wall_height",
            data: this.state.frwh.toString()
          },
          {
            name: "interstory_slab",
            data:
              this.state.selectedinterstoreySlab == 1
                ? "Flat Slab"
                : this.state.selectedinterstoreySlab == 2
                ? "Ribbed"
                : this.state.selectedinterstoreySlab == 3
                ? "Placa"
                : this.state.selectedinterstoreySlab == 4
                ? "Others"
                : ""
          },

          {
            name: "quality_of_slab",
            data: this.state.selectedQualitySlab == 1 ? "Buena" : "Mala"
          },
          {
            name: "occupied_cantilever",
            data: this.state.selectedCantiLever == 1 ? "yes" : "no"
          },
          {
            name: "qualiry_of_roof",
            data: this.state.selectedRoofType == 1 ? "Heavy" : "Light"
          },
          {
            name: "celing_tile",
            data: this.state.celing_tile == 1 ? "yes" : "no"
          },
          {
            name: "roof_slab",
            data:
              this.state.selectedRoofSlab == 1
                ? "Flat Slab"
                : this.state.selectedRoofSlab == 2
                ? "Ribbed"
                : this.state.selectedRoofSlab == 3
                ? "Placa"
                : this.state.selectedRoofSlab == 4
                ? "Others"
                : ""
          },
          {
            name: "qualiry_of_roof_slab",
            data: this.state.selectedQualityRoof == 1 ? "Buena" : "Mala"
          },

          {
            name: "living_space",
            data: this.state.selected_living_space == 1 ? "yes" : "no"
          },
          {
            name: "floor_firm",
            data: this.state.selected_floor == 1 ? "yes" : "no"
          },
          {
            name: "electrical_network",
            data: this.state.selected_electrical_network == 1 ? "yes" : "no"
          },
          {
            name: "aqueduct_network",
            data: this.state.selected_aqueduct_network == 1 ? "yes" : "no"
          },

          {
            name: "sever_network",
            data: this.state.selected_sewer_network == 1 ? "yes" : "no"
          },
          {
            name: "equipped",
            data: this.state.selected_equipped == 1 ? "yes" : "no"
          },
          {
            name: "kitchen",
            data: this.state.selected_kitchen == 1 ? "yes" : "no"
          },
          {
            name: "free_height",
            data: this.state.selected_free_height == 1 ? "yes" : "no"
          }
        ]
      )
        .then(response => {
          return response.json();
        })
        .then(async jsonResponse => {
          console.log(JSON.stringify(jsonResponse));
          if (jsonResponse.status == "success") {
            Toast.show({
              text: "Homeowner Form sucessfully submitted",
              buttonText: "Okay",
              type: "success",
              duration: 3000
            });
            this.setState({
              magicPlanSurveySwitch: 1
            });
          }
          // console.log(jsonResponse.data.chip_code);
          // Id = jsonResponse.data.id;
          // code = jsonResponse.data.chip_code;
          /*   this.setState(
      {
        hId: jsonResponse.data.id
       
      },
      function() {
        console.log("ino set data 1");
        AsyncStorage.setItem("homeOwnerId", JSON.stringify(this.state.hId));
        AsyncStorage.setItem("chipCode", JSON.stringify(this.state.hcode));
        this.props.navigation.navigate("BasicFormPart2");
        console.log("ino set data 1");
      }
    );*/
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      Alert.alert(missingField);
    }

    /*
if (this.state.selectedOpenCut == "") {
  missingField += "Select Open cut option\n";

}

if (this.state.selectedsrw == "") {

}

if (this.state.selectedfrw == "") {

}




if (this.state.selected_living_space == "") {
  missingField += "Select Living space\n";

}

if (this.state.selected_house == "") {


}

if (this.state.selected_floor == "") {
  missingField += "Select Floor option\n";

}



if (this.state.selected_electrical_network == "") {
  missingField += "Select Electrical option\n";

}

if (this.state.selected_sewer_network == "") {
  missingField += "Select Sewer Network option\n";

}





if (this.state.selected_kitchen == "") {
  missingField += "Select Kitchen option\n";

}

if (this.state.selected_free_height == "") {
  missingField += "Select Free height option\n";

}


*/

    var abc = JSON.stringify({
      user_id: this.state.userId,
      homeowner_id: this.state.savedHomeowner,
      /*   point:  this.state.savedPoint +
      this.state.opencutPoint +
        this.state.srwPoint +
        this.state.frwPoint +
        this.state.nosMorethanThreePoint +
        this.state.nos2Point +
        this.state.nos1Point +
        this.state.facadenoPoint +
        this.state.gapPoint +
        this.state.qualityofslabmalaPoint +
        this.state.cantileverPoint +
        this.state.qualityofroofmalaPoint,
      house_status:this.state.savedStatus,*/

      open_cut: this.state.selectedOpenCut == 1 ? "yes" : "no",
      open_cut_height: this.state.srth,
      open_cut_distance_to_house: this.state.srtd,
      site_retaining_wall:
        this.state.selected_side_retaining_wall == 1 ? "yes" : "no",
      site_retaining_wall_height: this.state.srwh,
      distance_from_wall_to_house: this.state.srwd,
      foundation_retaining_wall:
        this.state.selected_foundation_retaining_wall == 1 ? "yes" : "no",
      foundation_retaining_wall_height: this.state.frwh,
      is_masonry: this.state.selectedMasonary == 1 ? "yes" : "no",
      no_of_storeys: this.state.selectedStoreys,
      facade: this.state.selectedFacade == 1 ? "yes" : "no",
      gap: this.state.selectedGap == 1 ? "yes" : "no",
      interstory_slab:
        this.state.selectedinterstoreySlab == 1
          ? "Flat Slab"
          : this.state.selectedinterstoreySlab == 2
          ? "Ribbed"
          : this.state.selectedinterstoreySlab == 3
          ? "Placa"
          : this.state.selectedinterstoreySlab == 4
          ? "Others"
          : "",
      quality_of_slab: this.state.selectedQualitySlab == 1 ? "Buena" : "Mala",
      occupied_cantilever: this.state.selectedCantiLever == 1 ? "yes" : "no",
      qualiry_of_roof: this.state.selectedRoofType == 1 ? "Heavy" : "Light",
      celing_tile: this.state.celing_tile == 1 ? "yes" : "no",

      //    selectedLwr,
      roof_slab:
        this.state.selectedRoofSlab == 1
          ? "Flat Slab"
          : this.state.selectedRoofSlab == 2
          ? "Ribbed"
          : this.state.selectedRoofSlab == 3
          ? "Placa"
          : this.state.selectedRoofSlab == 4
          ? "Others"
          : "",
      qualiry_of_roof_slab:
        this.state.selectedQualityRoof == 1 ? "Buena" : "Mala",

      living_space: this.state.selected_living_space == 1 ? "yes" : "no",
      //  selected_house,
      floor_firm: this.state.selected_floor == 1 ? "yes" : "no",

      electrical_network:
        this.state.selected_electrical_network == 1 ? "yes" : "no",
      aqueduct_network:
        this.state.selected_aqueduct_network == 1 ? "yes" : "no",
      sever_network: this.state.selected_sewer_network == 1 ? "yes" : "no",
      equipped: this.state.selected_equipped == 1 ? "yes" : "no",
      kitchen: this.state.selected_kitchen == 1 ? "yes" : "no",
      free_height: this.state.selected_free_height == 1 ? "yes" : "no"
    });
    //  console.log(abc);
    // console.log("hid" + this.state.homeOwnerId);
    fetch("http://colapp.drcmp.org/api/livesurveyform", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: this.state.userId,
        //  homeowner_id: this.state.savedHomeowner,
        // point:this.state.savedPoint,
        // house_status:this.state.savedStatus,
        point: "100",
        status: "red",
        open_cut: this.state.selectedOpenCut == 1 ? "yes" : "no",
        open_cut_height: this.state.srth,
        open_cut_distance_to_house: this.state.srtd,
        site_retaining_wall:
          this.state.selected_side_retaining_wall == 1 ? "yes" : "no",
        site_retaining_wall_height: this.state.srwh,
        distance_from_wall_to_house: this.state.srwd,
        foundation_retaining_wall:
          this.state.selected_foundation_retaining_wall == 1 ? "yes" : "no",
        foundation_retaining_wall_height: this.state.frwh,
        is_masonry: this.state.selectedMasonary == 1 ? "yes" : "no",
        no_of_storeys: this.state.selectedStoreys,
        facade: this.state.selectedFacade == 1 ? "yes" : "no",
        gap: this.state.selectedGap == 1 ? "yes" : "no",
        interstory_slab:
          this.state.selectedinterstoreySlab == 1
            ? "Flat Slab"
            : this.state.selectedinterstoreySlab == 2
            ? "Ribbed"
            : this.state.selectedinterstoreySlab == 3
            ? "Placa"
            : this.state.selectedinterstoreySlab == 4
            ? "Others"
            : "",
        quality_of_slab: this.state.selectedQualitySlab == 1 ? "Buena" : "Mala",
        occupied_cantilever: this.state.selectedCantiLever == 1 ? "yes" : "no",
        qualiry_of_roof: this.state.selectedRoofType == 1 ? "Heavy" : "Light",
        celing_tile: this.state.celing_tile == 1 ? "yes" : "no",

        //    selectedLwr,
        roof_slab:
          this.state.selectedRoofSlab == 1
            ? "Flat Slab"
            : this.state.selectedRoofSlab == 2
            ? "Ribbed"
            : this.state.selectedRoofSlab == 3
            ? "Placa"
            : this.state.selectedRoofSlab == 4
            ? "Others"
            : "",
        qualiry_of_roof_slab:
          this.state.selectedQualityRoof == 1 ? "Buena" : "Mala",

        living_space: this.state.selected_living_space == 1 ? "yes" : "no",
        //  selected_house,
        floor_firm: this.state.selected_floor == 1 ? "yes" : "no",

        electrical_network:
          this.state.selected_electrical_network == 1 ? "yes" : "no",
        aqueduct_network:
          this.state.selected_aqueduct_network == 1 ? "yes" : "no",
        sever_network: this.state.selected_sewer_network == 1 ? "yes" : "no",
        equipped: this.state.selected_equipped == 1 ? "yes" : "no",
        kitchen: this.state.selected_kitchen == 1 ? "yes" : "no",
        free_height: this.state.selected_free_height == 1 ? "yes" : "no"
      })
    })
      .then(response => {
        return response.json();
      })
      .then(async jsonResponse => {
        //console.log(JSON.stringify(jsonResponse));
        if (jsonResponse.status == "success") {
          Toast.show({
            text: "Homeowner Form sucessfully submitted",
            buttonText: "Okay",
            type: "success",
            duration: 3000
          });
          this.setState({
            magicPlanSurveySwitch: 1
          });
        }
        // console.log(jsonResponse.data.chip_code);
        // Id = jsonResponse.data.id;
        // code = jsonResponse.data.chip_code;
        /*   this.setState(
        {
          hId: jsonResponse.data.id
         
        },
        function() {
          console.log("ino set data 1");
          AsyncStorage.setItem("homeOwnerId", JSON.stringify(this.state.hId));
          AsyncStorage.setItem("chipCode", JSON.stringify(this.state.hcode));
          this.props.navigation.navigate("BasicFormPart2");
          console.log("ino set data 1");
        }
      );*/
      })
      .catch(error => {
        console.log(error);
      });
  };
  nogo = () => {
    Alert.alert(this.props.t("columbia_form:error_msg"));
  };

  srw_dfhFunc = srw_dfh => {
    //console.log("dis" + this.state.srw_dfh);
    //console.log("height" + this.state.srwHeight);
    if (parseInt(srw_dfh) < parseInt(this.state.srwHeight)) {
      // console.log("since is more than 2 print nogo");
      this.setState({
        selectedsrw_dfh: "0",
        frwSwitch: 0
      });
      this.nogo();
    } else {
      // console.log("else");
      this.setState(
        {
          selectedsrw_dfh: "1",
          frwSwitch: 1
        }
        //  console.log("srw distance" + this.state.srw_dfhSwitch)
      );
    }
  };

  srwHeightFunc = height => {
    // Alert.alert("hey");

    var stateHeight = parseInt(this.state.srwHeight);
    //console.log("into srwheight" + stateHeight);
    if (stateHeight > 2) {
      //  console.log("since is more than 2 print nogo");
      this.setState({
        srw_dfhSwitch: 0,
        selectedsrwHeight: "0"
      });
      this.nogo();
    } else {
      // console.log("else");
      this.setState({
        srw_dfhSwitch: 1,
        selectedsrwHeight: "1"
      });
    }
  };

  checkStoreys3 = () => {
    // Alert.alert("hey");
    //console.log("into the storeys2");
    var storeysType = parseInt(this.state.selectedStoreys);
    //  console.log("into srwheight" + storeysType);

    if (storeysType == 3) {
      /*    this.setState({ residentialTypeSwitch: 1,roofSlabSwitch:0  }, () => {
        console.log(this.state.residentialTypeSwitch, 'residentialTypeSwitch3');
      });
*/
      this.nogo();
    } else if (storeysType == 2) {
      //2

      this.setState(
        {
          roofSlabSwitch: 1,
          canLeverSwitch: 1
          //   roofTypeSwitch: 0
        },
        () => {
          /*   console.log(
            this.state.residentialTypeSwitch,
            "residentialTypeSwitch2"
          );*/
        }
      );
    } else if (storeysType == 1) {
      //1

      this.setState(
        {
          roofTypeSwitch: 1
          // roofTypeSwitch: 1
        },
        () => {
          /*  console.log(
            this.state.residentialTypeSwitch,
            "residentialTypeSwitch1"
          );*/
        }
      );
    } else {
      //nothing
    }

    /*if (storeysType == 1) {
      //
      var tarrifMeter = 3;
      var distFromHouse = this.state.frw_dfh;
      if (tarrifMeter < distFromHouse) {
        this.setState({
         
          frwHeightSwitch:0
        });
        console.log(" if distFromHouse"+this.state.frw_dfh);
      } else {
        console.log(" if distFromHouse"+this.state.frw_dfh);
        console.log("storeys else");
      
        this.setState({
        
          frwHeightSwitch:1,
        });
      }
    } else if (storeysType == 2) {
      var tarrifMeter = 5;
      var distFromHouse = this.state.frw_dfh;
      if (tarrifMeter < distFromHouse) {
        this.setState({
          frwHeightSwitch:0
        });
        console.log(" if distFromHouse"+this.state.frw_dfh);
      } else {
        console.log("else distFromHouse"+this.state.frw_dfh);
       
        this.setState({
          frwHeightSwitch:1
        });
      }
    } else {

    }*/
  };

  checkStoreys2 = () => {
    // Alert.alert("hey");
    //console.log("into the storeys2");
    var storeysType = parseInt(this.state.selectedStoreys);
    // console.log("into srwheight" + storeysType);

    if (storeysType == 3) {
      /*    this.setState({ residentialTypeSwitch: 1,roofSlabSwitch:0  }, () => {
        console.log(this.state.residentialTypeSwitch, 'residentialTypeSwitch3');
      });
*/
      this.nogo();
    } else if (storeysType == 2) {
      //2

      this.setState(
        {
          residentialTypeSwitch: 1
          // roofSlabSwitch: 1,
          ///canLeverSwitch: 1
        },
        () => {
          /*  console.log(
            this.state.residentialTypeSwitch,
            "residentialTypeSwitch2"
          );*/
        }
      );
    } else if (storeysType == 1) {
      //1

      this.setState(
        {
          residentialTypeSwitch: 1
          // roofTypeSwitch: 1
        },
        () => {
          /* console.log(
            this.state.residentialTypeSwitch,
            "residentialTypeSwitch1"
          );*/
        }
      );
    } else {
      //nothing
    }

    /*if (storeysType == 1) {
      //
      var tarrifMeter = 3;
      var distFromHouse = this.state.frw_dfh;
      if (tarrifMeter < distFromHouse) {
        this.setState({
         
          frwHeightSwitch:0
        });
        console.log(" if distFromHouse"+this.state.frw_dfh);
      } else {
        console.log(" if distFromHouse"+this.state.frw_dfh);
        console.log("storeys else");
      
        this.setState({
        
          frwHeightSwitch:1,
        });
      }
    } else if (storeysType == 2) {
      var tarrifMeter = 5;
      var distFromHouse = this.state.frw_dfh;
      if (tarrifMeter < distFromHouse) {
        this.setState({
          frwHeightSwitch:0
        });
        console.log(" if distFromHouse"+this.state.frw_dfh);
      } else {
        console.log("else distFromHouse"+this.state.frw_dfh);
       
        this.setState({
          frwHeightSwitch:1
        });
      }
    } else {

    }*/
  };
  checkStoreyHeight = () => {
    // console.log("inrto the storeyHeight");
  };
  frwHeightCheck = frwHeight => {
    // console.log("frwHeight function" + frwHeight);
    if (frwHeight > 1.6) {
      // console.log("more than " + frwHeight);
      this.setState(
        {
          frwHeightChecked: "1",
          constructionSwitch: 0
        },
        this.nogo()
        //  console.log("this.state.frwheight" + this.state.frwHeightChecked)
      );
    } else {
      // console.log("less than " + frwHeight);
      this.setState({
        frwHeightChecked: "0",
        constructionSwitch: 1
      });
      // this.nogo();
    }
  };
  /*changeStatus = color => {
    console.log("into change status");
    console.log("red flag" + this.state.redFlag);
    console.log("Yellow flag" + this.state.yellowFlag);
    if (this.state.redFlag == 1) {
      this.setState({
        status: "Red"
      });
    } else if (this.state.yellowFlag == 1) {
      console.log("currently yellow flag");
      this.setState({
        status: "Yellow"
      });
    } else {
      console.log("currently other flag" + color);
      this.setState({
        status: color
      });
      if (color == "Red") {
        this.setState({
          redFlag: 1,
          yellowFlag: 0
        });

        }
      else  if (color == "Yellow") {
          if (this.state.redFlag == 1) {
          } else {
            this.setState({
              yellowFlag: 1,
              redFlag:0
            });
          }
        } else {
          if (this.state.yellowFlag == 1 || this.state.redFlag == 1) {
          } else {
            this.setState({
              redFlag: 0,
              yellowFlag: 0
            });
          }
      }
    }
  };
  changePoint = point => {
    this.setState({
      points: point
    });
  };*/
  openCutFunc = () => {
    // console.log("from open cut function");
    if (this.state.srth != "" && this.state.srtd != "") {
      if (this.state.srth > this.state.srtd) {
        //  console.log("srth>srtd");
        this.setState(
          {
            //redFlag: 1,
            //yellowFlag: 0,
            // opencutPoint: 20,
            opencutFlag: 1
            //opencutStatus:1,
          }
          //console.log("red flag===" + this.state.redFlag),
          //this.changeStatus("Red"),
          //this.changePoint(20)
        );
      } else {
        // console.log("srth<srtd");
        this.setState(
          {
            //redFlag: 0,
            //yellowFlag: 0,
            //opencutPoint: 0,
            opencutFlag: 0
            //opencutStatus:0
          }
          //console.log("red flag" + this.state.redFlag),
          //this.changeStatus("Green"),
          // this.changePoint(0)
        );
        //   this.changeStatus("Green")
      }
    }
  };

  handleChangeOption(val, type) {
    const { t, i18n, navigation } = this.props;
    //console.log("value" + val + "type" + type);
    if (val !== 0) {
      // this.setState({selectedValue: val});
      this.setState({
        selectedValue: val
      });

      if (type == "municipality") {
        this.setState({
          selectedMunicipality: val
        });
      }
      if (type == "soiltype") {
        this.setState({
          selectedSoiltype: val
        });
      }

      if (type == "housing_unit") {
        //  console.log("aayo data=" + val + "=");
        this.setState({
          selected_housing_unit: val
        });
      }

      if (type == "living_space") {
        //  console.log("aayo data=" + val + "=");
        this.setState({
          selected_living_space: val
        });
      }

      if (type == "house") {
        this.setState({
          selected_house: val
        });
      }

      if (type == "floor") {
        this.setState({
          selected_floor: val
        });
      }

      if (type == "housing_unit") {
        this.setState({
          selected_housing_unit: val
        });
      }

      if (type == "electrical_network") {
        this.setState({
          selected_electrical_network: val
        });
      }

      if (type == "aqueduct_network") {
        this.setState({
          selected_aqueduct_network: val
        });
      }

      if (type == "sewer_network") {
        this.setState({
          selected_sewer_network: val
        });
      }

      if (type == "equipped") {
        this.setState({
          selected_equipped: val
        });
      }

      if (type == "kitchen") {
        this.setState({
          selected_kitchen: val
        });
      }

      if (type == "free_height") {
        this.setState({
          selected_free_height: val
        });
      }

      if (type == "openCut") {
        //this.changeStatus("Green");
        // console.log("opencut", val);
        this.setState(
          {
            selectedOpenCut: val
          },
          function() {
            if (this.state.selectedOpenCut == 2) {
              this.setState({
                openCutSwitch: 2,
                // opencutPoint:0,
                //opencutStatus:0,

                side_retaining_wall_switch: 1
              });
            } else if (this.state.selectedOpenCut == 1) {
              this.setState({
                openCutSwitch: 1,
                side_retaining_wall_switch: 0
              });
            } else {
              this.setState({
                openCutSwitch: 0,
                side_retaining_wall_switch: 1
              });
            }
          }
        );
      }

      if (type == "side_retaining_wall") {
        //  console.log(" side_retaining_wall", val);
        this.setState(
          {
            selected_side_retaining_wall: val
          },
          function() {
            if (this.state.selected_side_retaining_wall == 2) {
              this.setState({
                //   side_retaining_wall_switch: 0,
                foundation_retaining_wall_switch: 1,
                srwhSwitch: 0,
                srwdSwitch: 0,
                //srwStatus:0,
                //srwhStatus:0,
                //srwPoint:0,
                srwh: 0
                //  srwdSwitch: 0
              });
            } else if (this.state.selected_side_retaining_wall == 1) {
              this.setState(
                {
                  // side_retaining_wall_switch: 1,
                  foundation_retaining_wall_switch: 0,
                  srwhSwitch: 1
                  // srwdSwitch: 1
                },
                console.log("seeee", this.state.srwhSwitch)
              );
            } else {
              this.setState({
                //side_retaining_wall_switch: 0,
                foundation_retaining_wall_switch: 1,
                srwhSwitch: 0
                // srwdSwitch: 0
              });
            }
          }
        );
      }

      if (type == "foundation_retaining_wall") {
        //console.log(" foundation_retaining_wall", val);
        this.setState(
          {
            selected_foundation_retaining_wall: val
          },
          function() {
            if (this.state.selected_foundation_retaining_wall == 2) {
              this.setState({
                //  foundation_retaining_wall_switch: 0,
                frwhSwitch: 0,
                //frwPoint:0,
                //frwStatus:0,
                masonarySwitch: 1
              });
            } else if (this.state.selected_foundation_retaining_wall == 1) {
              this.setState({
                //  foundation_retaining_wall_switch: 1,
                frwhSwitch: 1,
                masonarySwitch: 0
              });
            } else {
              this.setState({
                // foundation_retaining_wall_switch: 0,
                frwhSwitch: 0,
                masonarySwitch: 1
              });
            }
          }
        );
      }

      if (type == "masonary") {
        this.setState(
          {
            selectedMasonary: val
          },
          function() {
            if (this.state.selectedMasonary == 2) {
              this.setState({
                // masonarySwitch: 0
                storeysSwitch: 1
                //masonryStatus:1
              });
              //this.changeStatus("Red");
            } else if (this.state.selectedMasonary == 1) {
              this.setState({
                //   masonarySwitch: 1
                storeysSwitch: 0
                //masonryStatus:0
              });
            } else {
              this.setState({
                //  masonarySwitch: 0
                storeysSwitch: 1
                //masonryStatus:0
              });

              //this.checkStoreyHeight();
            }
          }
        );
      }

      if (type == "storeys") {
        // console.log("FROM STOREYS HANDLE");
        this.setState(
          {
            selectedStoreys: val
          },
          function() {
            if (this.state.selectedStoreys == 1) {
              //this.changeStatus("Green"),
              //  this.changePoint("0"),
              this.setState({
                facadeSwitch: 0,
                nosMorethanThreePoint: 0
                //nos1Point: 0,
                //nos2Point: 0,
                //nosStatus:0
                // latitudeSwitch:1
              });
            } else if (this.state.selectedStoreys == 2) {
              // this.changeStatus("Green"),
              // this.changePoint("3"),
              this.setState({
                facadeSwitch: 0
                // nosMorethanThreePoint: 0,
                // nos2Point: 3,
                // nosStatus:0
              });
            } else if (this.state.selectedStoreys == 3) {
              this.setState({
                facadeSwitch: 1
                //nosMorethanThreePoint: 0,
                //nos2Point: 0,
                //nosStatus:0
              });
            } else if (this.state.selectedStoreys == 4) {
              //this.changeStatus("Red");
              //this.changePoint("10");
              this.setState({
                facadeSwitch: 0
                // nosMorethanThreePoint: 10,
                //nos2Point: 0,
                //nosStatus:1
                //oundation_retaining_wall_switch: 1
              });
            } else {
              this.setState({
                foundation_retaining_wall_switch: 0
              });
            }
          }
        );
      }

      if (type == "facade") {
        console.log(" facade", val);
        this.setState(
          {
            selectedFacade: val
          },
          function() {
            if (this.state.selectedFacade == 2) {
              this.setState({
                gapSwitch: 0
                //facadenoPoint: 10,
                //facadeStatus:1
              });
              //this.changeStatus("Red");
            } else if (this.state.selectedFacade == 1) {
              this.setState({
                gapSwitch: 1,
                //facadenoPoint: 0,
                facadeStatus: 0
              });
            } else {
              this.setState({
                gapSwitch: 0,
                //facadenoPoint: 0,
                facadeStatus: 0
              });
            }
          }
        );
      }

      if (type == "gap") {
        //    console.log(" gap", val);
        this.setState(
          {
            selectedGap: val
          },
          function() {
            if (this.state.selectedGap == 2) {
              this.setState(
                {
                  // yellowFlag: 0,
                  //redFlag: 1,
                  //gapPoint: 7,
                  //gapStatus:1
                }
                // this.changeStatus("Red"),

                // this.changePoint("7")
              );
            } else if (this.state.selectedGap == 1) {
              this.setState({
                // gapPoint: 7,
                // gapStatus:2
              });
              if (this.state.redFlag == 1) {
                //this.changePoint("7");
              } else {
                this
                  .setState
                  /*{
                    yellowFlag: 1
                  },
                  this.changeStatus("Yellow"),

                  this.changePoint("7")
               */
                  ();
              }
            } else {
              this.setState({
                gapSwitch: 0
                //gapStatus:0
              });
            }
          }
        );
      }

      if (type == "differentform") {
        // console.log(" differentform", val);
        this.setState(
          {
            selectedDifferenctform: val
          },
          function() {
            if (this.state.selectedDifferenctform == 2) {
              this.setState({
                differentformSwitch: 0
              });
            } else if (this.state.selectedDifferenctform == 1) {
              this.setState({
                differentformSwitch: 1
              });
            } else {
              this.setState({
                differentformSwitch: 0
              });
            }
          }
        );
      }

      if (type == "evidence") {
        // console.log(" evidence", val);
        this.setState(
          {
            selectedEvidence: val
          },
          function() {
            if (this.state.selectedEvidence == 2) {
              this.setState({
                evidenceSwitch: 0
              });
            } else if (this.state.selectedEvidence == 1) {
              this.setState({
                evidenceSwitch: 1
              });
            } else {
              this.setState({
                evidenceSwitch: 0
              });
            }
          }
        );
      }
      if (type == "interstorey") {
        this.setState(
          {
            selectedinterstoreySlab: val
          },
          function() {
            if (this.state.selectedinterstoreySlab == 1) {
              /*  this.setState({
                foundation_retaining_wall_switch: 0
              });*/
              /*this.setState({
                interstoreyStatus:0
              });*/
              //this.changeStatus("Green");
            } else if (this.state.selectedinterstoreySlab == 2) {
              /* this.setState({
                foundation_retaining_wall_switch: 1
              });*/
              /*this.setState({
                interstoreyStatus:0
              });*/
              //this.changeStatus("Green");
            } else if (this.state.selectedinterstoreySlab == 3) {
              /* this.setState({
                foundation_retaining_wall_switch: 1
              });*/
              /*this.setState({
                interstoreyStatus:0
              });*/
              //this.changeStatus("Green");
            } else if (this.state.selectedinterstoreySlab == 4) {
              /* this.setState({
                foundation_retaining_wall_switch: 1
              });*/
              /*this.setState({
                interstoreyStatus:1
              });*/
              //  this.changeStatus("Red");
            } else {
              /* this.setState({
                foundation_retaining_wall_switch: 0
              });*/
            }
          }
        );
      }

      if (type == "qualityslab") {
        // console.log(" qualityslab", val);
        this.setState(
          {
            selectedQualitySlab: val
          },
          function() {
            if (this.state.selectedQualitySlab == 2) {
              /*this.setState({
                qualityofslabmalaPoint: 20,
                qosStatus:1
              });
              this.changeStatus("Red");

              this.changePoint("20");*/
            } else if (this.state.selectedQualitySlab == 1) {
              /*this.setState({
                qualityofslabmalaPoint: 0,
                qosStatus:0
              });
              this.changeStatus("Green");*/
            } else {
            }
          }
        );
      }

      if (type == "cantilever") {
        // console.log(" cantilever", val);
        this.setState(
          {
            selectedCantiLever: val
          }
          /*    function() {
            if (this.state.selectedCantiLever == 2) {
              this.setState(
                {
                  yellowFlag: 0,
                  cantileverPoint: 0,
                  cantileverStatus:0
                },
                this.changeStatus("Green"),

                this.changePoint("0")
              );
            } else if (this.state.selectedCantiLever == 1) {
              this.setState(
                {
                  yellowFlag: 1,

                  cantileverPoint: 5,
                  cantileverStatus:2
                },
                this.changeStatus("Yellow"),

                this.changePoint("5")
              );
            } else {
              this.setState({
                evidenceSwitch: 0
              });
            }
          }*/
        );
      }

      if (type == "roofType") {
        //  console.log(" roofType", val);
        this.setState(
          {
            selectedRoofType: val
          },
          function() {
            if (this.state.selectedRoofType == 2) {
              this.setState({
                lwrSwitch: 1,
                roofSlabSwitch: 0
              });
            } else if (this.state.selectedRoofType == 1) {
              this.setState({
                roofSlabSwitch: 1,
                lwrSwitch: 0
              });
            } else {
              this.setState({
                roofSlabSwitch: 0,
                lwrSwitch: 0
              });
            }
          }
        );
      }

      if (type == "lwr") {
        //  console.log(" lwr", val);
        // this.changeStatus("Green");

        this.setState(
          {
            // lrwcStatus:0,
            selectedLwr: val
            // magicPlanSurveySwitch: 1
          },
          function() {
            if (this.state.selectedLwr == 2) {
              this.setState({
                evidenceSwitch: 0
              });
            } else if (this.state.selectedLwr == 1) {
              this.setState({
                evidenceSwitch: 1
              });
            } else {
              this.setState({
                evidenceSwitch: 0
              });
            }
          }
        );
      }

      if (type == "roofslab") {
        //console.log("storey type" + val);
        this.setState(
          {
            selectedRoofSlab: val
          },
          function() {
            if (this.state.selectedRoofSlab == 1) {
              // this.changeStatus("Green");
              this.setState({
                // qosStatus:0,
                qualityRoofSwitch: 1
              });
            } else if (this.state.selectedRoofSlab == 2) {
              //this.changeStatus("Green");
              this.setState({
                //qosStatus:0,
                qualityRoofSwitch: 1
              });
            } else if (this.state.selectedRoofSlab == 3) {
              //this.changeStatus("Green");
              this.setState({
                //qosStatus:0,
                qualityRoofSwitch: 1
              });
            } else {
              //this.changeStatus("Red");
              this.setState({
                //qosStatus:1,
                qualityRoofSwitch: 0
              });
            }
          }
        );
      }

      if (type == "qualityRoof") {
        // console.log(" lwr", val);
        this.setState(
          {
            selectedQualityRoof: val
            //  magicPlanSurveySwitch: 1
          },
          function() {
            if (this.state.selectedQualityRoof == 2) {
              //this.changeStatus("Red");
              //this.changePoint("20");
              /*this.setState({
                qorStatus:1,
                qualityofroofmalaPoint: 20
              });*/
              /* this.setState({
                evidenceSwitch: 0
              });*/
            } else if (this.state.selectedQualityRoof == 1) {
              /*this.changeStatus("Green");
              this.setState({
                qorStatus:0,
                qualityofroofmalaPoint: 0
              });
*/
              /*  this.setState({
                evidenceSwitch: 1
              });*/
            } else {
              /*            this.setState({
                qorStatus:0,
                qualityofroofmalaPoint: 0
              });*/
              /* this.setState({
                evidenceSwitch: 0
              });*/
            }
          }
        );
      }

      if (type == "mapHazard") {
        this.setState(
          {
            selectedMapHazard: val
          },
          function() {
            if (this.state.selectedMapHazard == 2) {
              this.setState(
                {
                  srwSwitch: 0
                },
                this.nogo()
              );
            } else if (this.state.selectedMapHazard == 1) {
              this.setState({
                srwSwitch: 1
              });
            } else {
              this.setState(
                {
                  srwSwitch: 0
                },
                this.nogo()
              );
            }
          }
        );
      }

      if (type == "srw") {
        this.setState(
          {
            selectedsrw: val
          },
          function() {
            if (this.state.selectedsrw == 1) {
              this.setState({
                srwHeightSwitch: 1,
                frwSwitch: 0
                // selectedsrw_dfh: 0
              });
            } else if (this.state.selectedsrw == 2) {
              this.setState({
                srwHeightSwitch: 0,
                frwSwitch: 1
                // selectedsrw_dfh: 1
              });
            } else {
              this.setState({
                srwHeightSwitch: 0,
                frwSwitch: 0
                // selectedsrw_dfh: 1
              });
            }
          }
        );
      }

      if (type == "frw") {
        //  console.log("frw" + val);
        this.setState(
          {
            selectedfrw: val
          },

          function() {
            if (this.state.selectedfrw == 1) {
              this.setState({
                //  srwHeightSwitch: 1,
                //frwSwitch: 0
                // selectedsrw_dfh: 0
                masonarySwitch2: 0,
                frw_dfhSwitch: 1,
                storeysSwitch: 1
              });
            } else if (this.state.selectedfrw == 2) {
              this.setState({
                //  srwHeightSwitch: 0,
                //frwSwitch: 1
                // selectedsrw_dfh: 1
                masonarySwitch2: 1,
                frw_dfhSwitch: 0,
                storeysSwitch: 0
              });
            } else {
              this.setState({
                masonarySwitch2: 0,
                frw_dfhSwitch: 0,
                storeysSwitch: 0
                // selectedsrw_dfh: 1
              });
            }
          }
        );
      }
      /*  if (type == "storeys") {
        this.setState(
          {
            selectedStoreys: val
          },
          function() {
            this.checkStoreys();
          }
        );
      }*/

      if (type == "masonary2") {
        this.setState(
          {
            selectedMasonary: val
          },
          function() {
            if (this.state.selectedMasonary == 2) {
              this.setState(
                {
                  storeysSwitch2: 0
                },
                this.nogo()
              );
            } else if (this.state.selectedMasonary == 1) {
              this.setState({
                storeysSwitch2: 1
              });
            } else {
              this.setState(
                {
                  storeysSwitch2: 0
                }
                //  console.log("masonary " + this.state.selectedfrw)
              );
              this.nogo();
              //this.checkStoreyHeight();
            }
          }
        );
      }

      if (type == "residentialType") {
        // console.log("into the residential tyepe" + val);
        this.setState(
          {
            selectedresidentialType: val
          },
          function() {
            if (this.state.selectedresidentialType == 1) {
              this.setState({
                evidenceDamageSwitch: 1
              });
            } else {
              //  console.log("nothing to do");
              this.setState({
                evidenceDamageSwitch: 0
              });
            }
          }
        );
      }

      if (type == "evidenceDamage") {
        this.setState(
          {
            selectedEvidenceDamage: val
          },
          function() {
            if (this.state.selectedEvidenceDamage == 1) {
              this.nogo();
              this.setState({
                rfcardSwitch: 0
              });
            } else {
              //  console.log("nothing to do");
              this.checkStoreys3();
            }
          }
        );
      }

      if (type == "roofSlab") {
        this.setState(
          {
            selectedRoofSlab: val
          },
          function() {
            if (
              this.state.selectedRoofSlab == 1 ||
              this.state.selectedRoofSlab == 2 ||
              this.state.selectedRoofSlab == 3
            ) {
              //Heavy
              if (this.state.selectedStoreys == 2) {
                this.setState({
                  canleverSwitch: 1,
                  roofTypeSwitch: 0,
                  buildingShape: 0
                });
              }

              if (this.state.selectedStoreys == 1) {
                this.setState({
                  roofTypeSwitch: 1,
                  canleverSwitch: 0,
                  buildingShape: 1
                });
              }
            } else if (this.state.selectedRoofType == 4) {
              this.setState(
                {
                  roofTypeSwitch: 0,
                  canLeverSwitch: 0
                },
                this.nogo()
              );
            } else {
              //  console.log("nothing to do");
              this.setState(
                {
                  roofSlabSwitch: 0
                },
                this.nogo()
              );
            }
          }
        );
      }

      if (type == "canLever") {
        this.setState(
          {
            selectedCanLever: val
          },
          function() {
            if (this.state.selectedCanLever == 1) {
              //Heavy
              this.nogo();
            } else if (this.state.selectedCanLever == 2) {
              this.setState({
                roofTypeSwitch2: 1
              });
            } else {
              // console.log("nothing to do");
              this.setState({
                roofSlabSwitch2: 0
              });
            }
          }
        );
      }

      if (type == "buildingShape") {
        this.setState(
          {
            selectedBuildingShape: val
          },
          function() {
            if (this.state.selectedBuildingShape == 1) {
              //Heavy
              /*    this.setState({
                magicPlanSurveySwitch: 1
              });*/
            } else {
              // console.log("nothing to do");
              /*  this.setState(
                {
                  magicPlanSurveySwitch: 0
                },
                this.nogo()
              );*/
            }
          }
        );
      }
    }
  }
  validate(text, type) {
    //  console.log("validate1");
    if (this._isMounted) {
      alph = /^(?=.{5,50}$)[a-zA-Z0-9]+(?:[-'\s][a-zA-Z0-9]+)*$/;

      pass = /^(?=.{4,8}$)[a-zA-Z0-9]+(?:[-'\s][a-zA-Z0-9]+)*$/;

      idRegex = /^(?=.{5,50}$)[a-zA-Z0-9]+(?:[-'\s][a-zA-Z0-9]+)*$/;
      fullNameRegex = /^(?=.{5,50}$)[a-zA-Z0-9]+(?:[-'\s][a-zA-Z0-9]+)*$/;
      addressRegex = /^(?=.{5,50}$)[a-zA-Z0-9]+(?:[-'\s][a-zA-Z0-9]+)*$/;
      lotNoRegex = /^(?=.{5,50}$)[a-zA-Z0-9]+(?:[-'\s][a-zA-Z0-9]+)*$/;
      chipCodeRegex = /^(?=.{5,50}$)[a-zA-Z0-9]+(?:[-'\s][a-zA-Z0-9]+)*$/;
      contactNoRegex = /^(?=.{5,50}$)[a-zA-Z0-9]+(?:[-'\s][a-zA-Z0-9]+)*$/;
      //console.log("validate1");
      if (this._isMounted) {
        //   console.log("validate2");
        if (type == "surveyerName") {
          this.setState({
            surveyerName: text
          });
          /*  if (fullNameRegex.test(text)) {
                this.setState({
                  fullName: text,
                  fullNameValidate: true,
                  fullNameError: "",
                  validateError: false
                });
               
              } else {
               
                this.setState({
                  fullName: text,
                  fullNameValidate: false,
                  fullNameError: "Enter correct full Name",
                  validateError: true
                });
              } */
        }

        if (type == "homeowner") {
          this.setState({
            homeownerName: text
          });
          /*  if (fullNameRegex.test(text)) {
                this.setState({
                  fullName: text,
                  fullNameValidate: true,
                  fullNameError: "",
                  validateError: false
                });
               
              } else {
               
                this.setState({
                  fullName: text,
                  fullNameValidate: false,
                  fullNameError: "Enter correct full Name",
                  validateError: true
                });
              } */
        }

        if (type == "telephoneNumber") {
          this.setState({
            telephoneNumber: text
          });
        }
        if (type == "lot_no") {
          this.setState({
            lotNo: text
          });
          /*  if (fullNameRegex.test(text)) {
                this.setState({
                  fullName: text,
                  fullNameValidate: true,
                  fullNameError: "",
                  validateError: false
                });
               
              } else {
               
                this.setState({
                  fullName: text,
                  fullNameValidate: false,
                  fullNameError: "Enter correct full Name",
                  validateError: true
                });
              } */
        }

        if (type == "documentNumber") {
          this.setState({
            documentNumber: text
          });
          /*  if (fullNameRegex.test(text)) {
                this.setState({
                  fullName: text,
                  fullNameValidate: true,
                  fullNameError: "",
                  validateError: false
                });
               
              } else {
               
                this.setState({
                  fullName: text,
                  fullNameValidate: false,
                  fullNameError: "Enter correct full Name",
                  validateError: true
                });
              } */
        }

        if (type == "bario") {
          this.setState({
            bario: text
          });
          /* if (idRegex.test(text)) {
                this.setState({
                  id: text,
                  idValidate: true,
                  idError: "",
                  validateError: false
                });
                
              } else {
                
                this.setState({
                  id: text,
                  idValidate: false,
                  idError: "Enter correct Id between 1 to 10 characters",
                  validateError: true
                });
              }*/
        }

        if (type == "fullName") {
          this.setState({
            fullName: text
          });
          /*  if (fullNameRegex.test(text)) {
                this.setState({
                  fullName: text,
                  fullNameValidate: true,
                  fullNameError: "",
                  validateError: false
                });
               
              } else {
               
                this.setState({
                  fullName: text,
                  fullNameValidate: false,
                  fullNameError: "Enter correct full Name",
                  validateError: true
                });
              } */
        } //if

        if (type == "address") {
          this.setState({
            address: text
          });
          /*   if (addressRegex.test(text)) {
                this.setState({
                  address: text,
                  addressValidate: true,
                  addressError: "",
                  validateError: false
                });
              
              } else {
               
                this.setState({
                  address: text,
                  addressValidate: false,
                  addressError: "Enter address between 4 to 40 characters",
                  validateError: true
                });
              } */
        } //if
        if (type == "lotNo") {
          this.setState({
            lotNo: text
          });
          /*  if (lotNoRegex.test(text)) {
                this.setState({
                  lotNo: text,
                  lotNoValidate: true,
                  lotNoError: "",
                  validateError: false
                });
                // console.warn("2text is correct");
              } else {
                //  console.warn("invalid text");
                this.setState({
                  lotNo: text,
                  lotNoValidate: false,
                  lotNoError: "Enter lotNo between 4 to 8 characters",
                  validateError: true
                });
              } //else*/
        }

        if (type == "chipCode") {
          this.setState({
            chipCode: text
          });
          /*    if (chipCodeRegex.test(text)) {
                this.setState({
                  chipCode: text,
                  chipCodeValidate: true,
                  chipCodesError: "",
                  validateError: false
                });
                // console.warn("2text is correct");
              } else {
                //  console.warn("invalid text");
                this.setState({
                  chipCode: text,
                  chipCodeValidate: false,
                  chipCodesError: "Enter chipcode between 4 to 8 characters",
                  validateError: true
                });
              } //*/
        }

        if (type == "contactNo") {
          this.setState({
            contactNo: text
          });
          /*  if (contactNoRegex.test(text)) {
                this.setState({
                  contactNo: text,
                  contactNoValidate: true,
                  contactNoError: "",
                  validateError: false
                });
                // console.warn("2text is correct");
              } else {
                //  console.warn("invalid text");
                this.setState({
                  contactNo: text,
                  contactNoValidate: false,
                  contactNoError: "Enter password between 4 to 8 characters",
                  validateError: true
                });
              } //else*/
        }
        //if
      }

      if (type == "srth") {
        const aaa = parseFloat(text);
        const bbb = aaa.toFixed(2);
        this.setState(
          {
            srth: text
          },
          function() {
            this.openCutFunc();
          }
        );
      }

      if (type == "srtd") {
        this.setState(
          {
            srtd: text
          },
          function() {
            this.openCutFunc();
          }
        );
      }

      if (type == "srwh") {
        this.setState(
          {
            srwh: text
          },
          function() {
            if (this.state.srwh != "" && this.state.srwd != "") {
              if (this.state.srwh > this.state.srwd) {
                //this.changeStatus("Red");
                //this.changePoint("20");
                /*this.setState({
                  srwPoint: 20,
                  srwStatus:1
                });*/
              } else {
                /* this.setState({
                  srwPoint: 0
                });
                this.changeStatus("Green");*/
              }
            } else {
              if (this.state.srwh <= 2) {
                /*   this.setState({
                  srwhStatus:0,
                  srwStatus:0
                });
                this.changeStatus("Green");*/
              }
              if (this.state.srwh > 2) {
                this.setState({
                  // srwhStatus:0,
                  srwdSwitch: 1
                });
              }
            }

            //this.openCutFunc();
          }
        );
      }

      if (type == "srwd") {
        this.setState(
          {
            srwd: text
          },
          function() {
            if (this.state.srwh != "" && this.state.srwd != "") {
              if (this.state.srwh > this.state.srwd) {
                /* this.changeStatus("Red");
                this.changePoint("20");
                this.setState({
                  srwPoint: 20,
                  srwStatus:1
                });*/
              } else if (this.state.srwh < this.state.srwd) {
                /* this.setState({
                  srwPoint: 0,
                  srwStatus:0
                });*/
                if (this.state.opencutFlag == 1) {
                  //console.log("open cut ==1");
                } else {
                  // console.log("open cut ==0");
                  /* this.setState({
                    redFlag:0,
                    yellowFlag:0
                  },
                  this.changeStatus("Green")
                  )*/
                }
              } else {
              }
            }
          }
        );
      }
      if (type == "frwh") {
        this.setState(
          {
            frwh: text
          },
          function() {
            if (this.state.frwh > 1.6) {
              /*  this.setState(
                {
                  yellowFlag: 1,
                  frwPoint: 10,
                  frwStatus:2
                },
                this.changeStatus("Yellow"),

                this.changePoint("10")
              );*/
            } else if (this.state.frwh < 1.6) {
              /*this.setState(
                {
                  yellowFlag: 0,
                  frwPoint: 5,
                  frwStatus:0
                },
                this.changeStatus("Green"),

                this.changePoint("5")
              );*/
            } else {
            }
          }
        );
      }

      if (type == "srwHeight") {
        //  console.log("srwHeight" + text);
        this.setState(
          {
            srwHeight: text
          },
          function() {
            //  console.log("insde func" + this.state.srwHeight);
            this.srwHeightFunc();
          }
        );
      }

      if (type == "srw_dfh") {
        //  console.log("srw_dfh" + text);
        this.setState(
          {
            srw_dfh: text
          },
          //  console.log("distance set" + this.state.srw_dfh),
          this.srw_dfhFunc(text)
        );
      }

      if (type == "frw_dfh") {
        this.setState(
          {
            frw_dfh: text
          }
          //  this.frw_dfhFunc()
        );
      }
      if (type == "frwHeight") {
        // console.log("into the frwHeight" + text);
        this.setState(
          {
            frwHeight: text
          },
          this.frwHeightCheck(text)
        );
      }
      if (type == "constructionDetail") {
        // console.log("into the constructionDetail" + text);
        this.setState({
          selectedConstructionDetail: text,
          masonarySwitch: 1
        });
      }

      if (type == "municipality") {
        this.setState({
          selectedMunicipality: val
        });
      }
    }
  }

  checkInterstorey() {
    //console.log("interstoreys");
  }
  renderRow() {
    return (
      <View style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}>
        <View style={{ flex: 1, alignSelf: "stretch" }}>
          <Text>sss</Text>
        </View>
        {/* Edit these as they are your cells. You may even take parameters to display different data / react elements etc. */}
        <View style={{ flex: 1, alignSelf: "stretch" }} />
        <View style={{ flex: 1, alignSelf: "stretch" }} />
        <View style={{ flex: 1, alignSelf: "stretch" }} />
        <View style={{ flex: 1, alignSelf: "stretch" }} />
      </View>
    );
  }

  render() {
    // this.nogo;
    const { t, i18n, navigation } = this.props;
    const { navigate } = navigation;
    const state = this.state;

    const data = [1, 2, 3, 4, 5];

    const tableData = [];

    const row1 = [
      "Soil Type",
      state.soiltypePoint,
      state.soiltypeStatus == 0
        ? "Green"
        : state.soiltypeStatus == 1
        ? "Red"
        : "Yellow"
    ];
    const row2 = [
      "Open Cut",
      state.opencutPoint,
      state.opencutStatus == 0
        ? "Green"
        : state.opencutStatus == 1
        ? "Red"
        : "Yellow"
    ];
    const row3 = [
      "SRW",
      state.srwPoint,
      state.srwhStatus + state.srwStatus == 0
        ? "Green"
        : state.srwhStatus + state.srwStatus == 1
        ? "Red"
        : "Yellow"
    ];

    const row4 = [
      "FRW",
      state.frwPoint,
      state.frwStatus == 0 ? "Green" : state.frwStatus == 1 ? "Red" : "Yellow"
    ];
    const row5 = [
      "Masonry",
      "-",
      state.masonryStatus == 0
        ? "Green"
        : state.masonryStatus == 1
        ? "Red"
        : "Yellow"
    ];
    const row6 = [
      "Facade",
      state.facadenoPoint,
      state.facadenoPoint == 0
        ? "Green"
        : state.facadenoPoint == 1
        ? "Red"
        : "Yellow"
    ];
    const row7 = [
      "Gap",
      state.gapPoint,
      state.gapStatus == 0 ? "Green" : state.gapStatus == 1 ? "Red" : "Yellow"
    ];
    const row8 = [
      "SlabQuality",
      state.qualityofslabmalaPoint,
      state.qosStatus == 0 ? "Green" : state.qosStatus == 1 ? "Red" : "Yellow"
    ];
    const row9 = [
      "Cantilever",
      "-",
      state.cantileverStatus == 0
        ? "Green"
        : state.cantileverStatus == 1
        ? "Red"
        : "Yellow"
    ];
    const row10 = [
      "Roof Quality",
      state.qualityofroofmalaPoint,
      state.qorStatus == 0 ? "Green" : state.qorStatus == 1 ? "Red" : "Yellow"
    ];

    tableData.push(row1);
    tableData.push(row2);
    tableData.push(row3);
    tableData.push(row4);
    tableData.push(row5);
    tableData.push(row6);
    tableData.push(row7);
    tableData.push(row8);
    tableData.push(row9);
    tableData.push(row10);

    let text = "Waiting..";
    let latitude = "";
    let longitude = "";
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
      //  text = JSON.stringify(this.state.location);
      latitude = JSON.stringify(this.state.location.coords.latitude);
      longitude = JSON.stringify(this.state.location.coords.longitude);
      // console.log(text);
    }
    const icon = {
      uri:
        "https://cdn4.iconfinder.com/data/icons/free-crystal-icons/512/Gemstone.png"
    };

    const items = [
      {
        name: "Amazonas",
        id: 0,
        // local required file
        children: [
          {
            id: 1,
            name: "El Encanto"
          },
          {
            id: 2,
            name: "La Chorrera"
          },
          {
            id: 3,
            name: "La Pedrera"
          },
          {
            id: 4,
            name: "La Victoria"
          },
          {
            id: 5,
            name: "Leticia"
          },
          {
            id: 6,
            name: "Mirití-Paraná"
          },
          {
            id: 7,
            name: "Puerto Alegría"
          },
          {
            id: 8,
            name: "Puerto Arica"
          },
          {
            id: 9,
            name: "Puerto Nariño"
          },
          {
            id: 10,
            name: "Puerto Santander"
          },
          {
            id: 11,
            name: "Tarapacá"
          }
        ]
      },
      {
        name: "Antioquia",
        id: 1,
        // web uri
        children: [
          {
            id: 12,
            name: "Abejorral"
          },
          {
            id: 13,
            name: "Abriaquí"
          },
          {
            id: 14,
            name: "Alejandría"
          },
          {
            id: 15,
            name: "Amagá"
          },
          {
            id: 16,
            name: "Amalfi"
          },
          {
            id: 17,
            name: "Andes"
          },
          {
            id: 18,
            name: "Angelópolis"
          },
          {
            id: 19,
            name: "Angostura"
          },
          {
            id: "20",
            name: "Anorí"
          },
          {
            id: 21,
            name: "Santa Fe de Antioquia"
          },
          {
            id: 22,
            name: "Anzá"
          },
          {
            id: 23,
            name: "Apartadó"
          },
          {
            id: 24,
            name: "Arboletes"
          },
          {
            id: 25,
            name: "Argelia"
          },
          {
            id: 26,
            name: "Armenia"
          },
          {
            id: 27,
            name: "Barbosa"
          },
          {
            id: 28,
            name: "Bello"
          },
          {
            id: 29,
            name: "Belmira"
          },
          {
            id: 30,
            name: "Betania"
          },
          {
            id: 31,
            name: "Betulia"
          },
          {
            id: 32,
            name: "Briceño"
          },
          {
            id: 33,
            name: "Buriticá"
          },
          {
            id: 34,
            name: "Cáceres"
          },
          {
            id: 35,
            name: "Caicedo"
          },
          {
            id: 36,
            name: "Caldas"
          },
          {
            id: 37,
            name: "Campamento"
          },
          {
            id: 38,
            name: "Cañasgordas"
          },
          {
            id: 39,
            name: "Caracolí"
          },
          {
            id: 40,
            name: "Caramanta"
          },
          {
            id: 41,
            name: "Carepa"
          },
          {
            id: "42",
            name: "Carmen de Viboral"
          },
          {
            id: "43",
            name: "Carolina del Príncipe"
          },
          {
            id: "44",
            name: "Caucasia"
          },
          {
            id: "45",
            name: "Chigorodó"
          },
          {
            id: "46",
            name: "Cisneros"
          },
          {
            id: "47",
            name: "Ciudad Bolívar"
          },
          {
            id: "48",
            name: "Cocorná"
          },
          {
            id: "49",
            name: "Concepción"
          },
          {
            id: "50",
            name: "Concordia"
          },
          {
            id: "51",
            name: "Copacabana"
          },
          {
            id: "52",
            name: "Dabeiba"
          },
          {
            id: "53",
            name: "Donmatías"
          },
          {
            id: "54",
            name: "Ebéjico"
          },
          {
            id: "55",
            name: "El Bagre"
          },
          {
            id: "56",
            name: "El Peñol"
          },
          {
            id: "57",
            name: "El Retiro"
          },
          {
            id: "58",
            name: "El Santuario"
          },
          {
            id: "59",
            name: "Entrerríos"
          },
          {
            id: "60",
            name: "Envigado"
          },
          {
            id: "61",
            name: "Fredonia"
          },
          {
            id: "62",
            name: "Frontino"
          },
          {
            id: "63",
            name: "Giraldo"
          },
          {
            id: "64",
            name: "Girardota"
          },
          {
            id: "65",
            name: "Gómez Plata"
          },
          {
            id: "66",
            name: "Granada"
          },
          {
            id: "67",
            name: "Guadalupe"
          },
          {
            id: "68",
            name: "Guarne"
          },
          {
            id: "69",
            name: "Guatapé"
          },
          {
            id: "70",
            name: "Heliconia"
          },
          {
            id: "71",
            name: "Hispania"
          },
          {
            id: "72",
            name: "Itagüí"
          },
          {
            id: "73",
            name: "Ituango"
          },
          {
            id: "74",
            name: "Jardín"
          },
          {
            id: "75",
            name: "Jericó"
          },
          {
            id: "76",
            name: "La Ceja"
          },
          {
            id: "77",
            name: "La Estrella"
          },
          {
            id: "78",
            name: "La Pintada"
          },
          {
            id: "79",
            name: "La Unión"
          },
          {
            id: "80",
            name: "Liborina"
          },
          {
            id: "81",
            name: "Maceo"
          },
          {
            id: "82",
            name: "Marinilla"
          },
          {
            id: "83",
            name: "Medellín"
          },
          {
            id: "84",
            name: "Montebello"
          },
          {
            id: "85",
            name: "Murindó"
          },
          {
            id: "86",
            name: "Mutatá"
          },
          {
            id: "87",
            name: "Nariño"
          },
          {
            id: "88",
            name: "Nechí"
          },
          {
            id: "89",
            name: "Necoclí"
          },
          {
            id: "90",
            name: "Olaya"
          },
          {
            id: "91",
            name: "Peque"
          },
          {
            id: "92",
            name: "Pueblorrico"
          },
          {
            id: "93",
            name: "Puerto Berrío"
          },
          {
            id: "94",
            name: "Puerto Nare"
          },
          {
            id: "95",
            name: "Puerto Triunfo"
          },
          {
            id: "96",
            name: "Remedios"
          },
          {
            id: "97",
            name: "Rionegro"
          },
          {
            id: "98",
            name: "Sabanalarga"
          },
          {
            id: "99",
            name: "Sabaneta"
          },
          {
            id: "100",
            name: "Salgar"
          },
          {
            id: "101",
            name: "San Andrés de Cuerquia"
          },
          {
            id: "102",
            name: "San Carlos"
          },
          {
            id: "103",
            name: "San Francisco"
          },
          {
            id: "104",
            name: "San Jerónimo"
          },
          {
            id: "105",
            name: "San José de la Montaña"
          },
          {
            id: "106",
            name: "San Juan de Urabá"
          },
          {
            id: "107",
            name: "San Luis"
          },
          {
            id: "108",
            name: "San Pedro de los Milagros"
          },
          {
            id: "109",
            name: "San Pedro de Urabá"
          },
          {
            id: "110",
            name: "San Rafael"
          },
          {
            id: "111",
            name: "San Roque"
          },
          {
            id: "112",
            name: "San Vicente"
          },
          {
            id: "113",
            name: "Santa Bárbara"
          },
          {
            id: "114",
            name: "Santa Rosa de Osos"
          },
          {
            id: "115",
            name: "Santo Domingo"
          },
          {
            id: "116",
            name: "Segovia"
          },
          {
            id: "117",
            name: "Sonsón"
          },
          {
            id: "118",
            name: "Sopetrán"
          },
          {
            id: "119",
            name: "Támesis"
          },
          {
            id: "120",
            name: "Tarazá"
          },
          {
            id: "121",
            name: "Tarso"
          },
          {
            id: "122",
            name: "Titiribí"
          },
          {
            id: "123",
            name: "Toledo"
          },
          {
            id: "124",
            name: "Turbo"
          },
          {
            id: "125",
            name: "Uramita"
          },
          {
            id: "126",
            name: "Urrao"
          },
          {
            id: "127",
            name: "Valdivia"
          },
          {
            id: "128",
            name: "Valparaíso"
          },
          {
            id: "129",
            name: "Vegachí"
          },
          {
            id: "130",
            name: "Venecia"
          },
          {
            id: "131",
            name: "Vigía del Fuerte"
          },
          {
            id: "132",
            name: "Yalí"
          },
          {
            id: "133",
            name: "Yarumal"
          },
          {
            id: "134",
            name: "Yolombó"
          },
          {
            id: "135",
            name: "Yondó"
          },
          {
            id: "136",
            name: "Zaragoza"
          }
        ]
      },
      {
        name: " Arauca",
        id: 2,
        // material icons icon name
        children: [
          {
            name: "Arauca",
            id: 137
          },
          {
            name: "Arauquita",
            id: 138
          },
          {
            name: "Cravo Norte",
            id: 139
          },
          {
            name: "Fortul",
            id: 140
          },
          {
            name: "Puerto Rondón",
            id: 141
          },
          {
            name: "Saravena",
            id: 142
          },
          {
            name: "Tame",
            id: 143
          }
        ]
      },
      {
        name: "Atlantico",
        id: 3,
        // material icons icon name
        children: [
          {
            id: "144",
            name: "Baranoa"
          },
          {
            id: "145",
            name: "Barranquilla"
          },
          {
            id: "146",
            name: "Campo de La Cruz"
          },
          {
            id: "147",
            name: "Candelaria"
          },
          {
            id: "148",
            name: "Galapa"
          },
          {
            id: "149",
            name: "Juan de Acosta"
          },
          {
            id: "150",
            name: "Luruaco"
          },
          {
            id: "151",
            name: "Malambo"
          },
          {
            id: "152",
            name: "Manatí"
          },
          {
            id: "153",
            name: "Palmar de Varela"
          },
          {
            id: "154",
            name: "Piojó"
          },
          {
            id: "155",
            name: "Polonuevo"
          },
          {
            id: "156",
            name: "Ponedera"
          },
          {
            id: "157",
            name: "Puerto Colombia"
          },
          {
            id: "158",
            name: "Repelón"
          },
          {
            id: "159",
            name: "Sabanagrande"
          },
          {
            id: "160",
            name: "Sabanalarga"
          },
          {
            id: "161",
            name: "Santa Lucía"
          },
          {
            id: "162",
            name: "Santo Tomás"
          },
          {
            id: "163",
            name: "Soledad"
          },
          {
            id: "164",
            name: "Suán"
          },
          {
            id: "165",
            name: "Tubará"
          },
          {
            id: "166",
            name: "Usiacurí"
          }
        ]
      },
      {
        name: " Bolívar",
        id: 4,
        // local required file
        children: [
          {
            id: "167",
            name: "Achí"
          },
          {
            id: "168",
            name: "Altos del Rosario"
          },
          {
            id: "169",
            name: "Arenal"
          },
          {
            id: "170",
            name: "Arjona"
          },
          {
            id: "171",
            name: "Arroyohondo"
          },
          {
            id: "172",
            name: "Barranco de Loba"
          },
          {
            id: "173",
            name: "Brazuelo de Papayal"
          },
          {
            id: "174",
            name: "Calamar"
          },
          {
            id: "175",
            name: "Cantagallo"
          },
          {
            id: "176",
            name: "Cartagena de Indias"
          },
          {
            id: "177",
            name: "Cicuco"
          },
          {
            id: "178",
            name: "Clemencia"
          },
          {
            id: "179",
            name: "Córdoba"
          },
          {
            id: "180",
            name: "El Carmen de Bolívar"
          },
          {
            id: "181",
            name: "El Guamo"
          },
          {
            id: "182",
            name: "El Peñón"
          },
          {
            id: "183",
            name: "Hatillo de Loba"
          },
          {
            id: "184",
            name: "Magangué"
          },
          {
            id: "185",
            name: "Mahates"
          },
          {
            id: "186",
            name: "Margarita"
          },
          {
            id: "187",
            name: "María La Baja"
          },
          {
            id: "188",
            name: "Montecristo"
          },
          {
            id: "189",
            name: "Morales"
          },
          {
            id: "190",
            name: "Norosí"
          },
          {
            id: "191",
            name: "Pinillos"
          },
          {
            id: "192",
            name: "Regidor"
          },
          {
            id: "193",
            name: "Río Viejo"
          },
          {
            id: "194",
            name: "San Cristóbal"
          },
          {
            id: "195",
            name: "San Estanislao"
          },
          {
            id: "196",
            name: "San Fernando"
          },
          {
            id: "197",
            name: "San Jacinto"
          },
          {
            id: "198",
            name: "San Jacinto del Cauca"
          },
          {
            id: "199",
            name: "San Juan Nepomuceno"
          },
          {
            id: "200",
            name: "San Martín de Loba"
          },
          {
            id: "201",
            name: "San Pablo"
          },
          {
            id: "202",
            name: "Santa Catalina"
          },
          {
            id: "203",
            name: "Santa Cruz de Mompox"
          },
          {
            id: "204",
            name: "Santa Rosa de Lima"
          },
          {
            id: "205",
            name: "Santa Rosa del Sur"
          },
          {
            id: "206",
            name: "Simití"
          },
          {
            id: "207",
            name: "Soplaviento"
          },
          {
            id: "208",
            name: "Talaigua Nuevo"
          },
          {
            id: "209",
            name: "Tiquisio"
          },
          {
            id: "210",
            name: "Turbaco"
          },
          {
            id: "211",
            name: "Turbaná"
          },
          {
            id: "212",
            name: "Villanueva"
          },
          {
            id: "213",
            name: "Zambrano"
          }
        ]
      },
      {
        name: " Boyacá",
        id: 5,
        // web uri
        children: [
          {
            id: "214",
            name: "Almeida"
          },
          {
            id: "215",
            name: "Aquitania"
          },
          {
            id: "216",
            name: "Arcabuco"
          },
          {
            id: "217",
            name: "Belén"
          },
          {
            id: "218",
            name: "Berbeo"
          },
          {
            id: "219",
            name: "Betéitiva"
          },
          {
            id: "220",
            name: "Boavita"
          },
          {
            id: "221",
            name: "Boyacá"
          },
          {
            id: "222",
            name: "Briceño"
          },
          {
            id: "223",
            name: "Buenavista"
          },
          {
            id: "224",
            name: "Busbanzá"
          },
          {
            id: "225",
            name: "Caldas"
          },
          {
            id: "226",
            name: "Campohermoso"
          },
          {
            id: "227",
            name: "Cerinza"
          },
          {
            id: "228",
            name: "Chinavita"
          },
          {
            id: "229",
            name: "Chiquinquirá"
          },
          {
            id: "230",
            name: "Chíquiza"
          },
          {
            id: "231",
            name: "Chiscas"
          },
          {
            id: "232",
            name: "Chita"
          },
          {
            id: "233",
            name: "Chitaraque"
          },
          {
            id: "234",
            name: "Chivatá"
          },
          {
            id: "235",
            name: "Chivor"
          },
          {
            id: "236",
            name: "Ciénega"
          },
          {
            id: "237",
            name: "Cómbita"
          },
          {
            id: "238",
            name: "Coper"
          },
          {
            id: "239",
            name: "Corrales"
          },
          {
            id: "240",
            name: "Covarachía"
          },
          {
            id: "241",
            name: "Cubará"
          },
          {
            id: "242",
            name: "Cucaita"
          },
          {
            id: "243",
            name: "Cuítiva"
          },
          {
            id: "244",
            name: "Duitama"
          },
          {
            id: "245",
            name: "El Cocuy"
          },
          {
            id: "246",
            name: "El Espino"
          },
          {
            id: "247",
            name: "Firavitoba"
          },
          {
            id: "248",
            name: "Floresta"
          },
          {
            id: "249",
            name: "Gachantivá"
          },
          {
            id: "250",
            name: "Gámeza"
          },
          {
            id: "251",
            name: "Garagoa"
          },
          {
            id: "252",
            name: "Guacamayas"
          },
          {
            id: "253",
            name: "Guateque"
          },
          {
            id: "254",
            name: "Guayatá"
          },
          {
            id: "255",
            name: "Güicán"
          },
          {
            id: "256",
            name: "Iza"
          },
          {
            id: "257",
            name: "Jenesano"
          },
          {
            id: "258",
            name: "Jericó"
          },
          {
            id: "259",
            name: "La Capilla"
          },
          {
            id: "260",
            name: "La Uvita"
          },
          {
            id: "261",
            name: "La Victoria"
          },
          {
            id: "262",
            name: "Labranzagrande"
          },
          {
            id: "263",
            name: "Macanal"
          },
          {
            id: "264",
            name: "Maripí"
          },
          {
            id: "265",
            name: "Miraflores"
          },
          {
            id: "266",
            name: "Mongua"
          },
          {
            id: "267",
            name: "Monguí"
          },
          {
            id: "268",
            name: "Moniquirá"
          },
          {
            id: "269",
            name: "Motavita"
          },
          {
            id: "270",
            name: "Muzo"
          },
          {
            id: "271",
            name: "Nobsa"
          },
          {
            id: "272",
            name: "Nuevo Colón"
          },
          {
            id: "273",
            name: "Oicatá"
          },
          {
            id: "274",
            name: "Otanche"
          },
          {
            id: "275",
            name: "Pachavita"
          },
          {
            id: "276",
            name: "Páez"
          },
          {
            id: "277",
            name: "Paipa"
          },
          {
            id: "278",
            name: "Pajarito"
          },
          {
            id: "279",
            name: "Panqueba"
          },
          {
            id: "280",
            name: "Pauna"
          },
          {
            id: "281",
            name: "Paya"
          },
          {
            id: "282",
            name: "Paz de Río"
          },
          {
            id: "283",
            name: "Pesca"
          },
          {
            id: "284",
            name: "Pisba"
          },
          {
            id: "285",
            name: "Puerto Boyacá"
          },
          {
            id: "286",
            name: "Quípama"
          },
          {
            id: "287",
            name: "Ramiriquí"
          },
          {
            id: "288",
            name: "Ráquira"
          },
          {
            id: "289",
            name: "Rondón"
          },
          {
            id: "290",
            name: "Saboyá"
          },
          {
            id: "291",
            name: "Sáchica"
          },
          {
            id: "292",
            name: "Samacá"
          },
          {
            id: "293",
            name: "San Eduardo"
          },
          {
            id: "294",
            name: "San José de Pare"
          },
          {
            id: "295",
            name: "San Luis de Gaceno"
          },
          {
            id: "296",
            name: "San Mateo"
          },
          {
            id: "297",
            name: "San Miguel de Sema"
          },
          {
            id: "298",
            name: "San Pablo de Borbur"
          },
          {
            id: "299",
            name: "Santa María"
          },
          {
            id: "300",
            name: "Santa Rosa de Viterbo"
          },
          {
            id: "301",
            name: "Santa Sofía"
          },
          {
            id: "302",
            name: "Santana"
          },
          {
            id: "303",
            name: "Sativanorte"
          },
          {
            id: "304",
            name: "Sativasur"
          },
          {
            id: "305",
            name: "Siachoque"
          },
          {
            id: "306",
            name: "Soatá"
          },
          {
            id: "307",
            name: "Socha"
          },
          {
            id: "308",
            name: "Socotá"
          },
          {
            id: "309",
            name: "Sogamoso"
          },
          {
            id: "310",
            name: "Somondoco"
          },
          {
            id: "311",
            name: "Sora"
          },
          {
            id: "312",
            name: "Soracá"
          },
          {
            id: "313",
            name: "Sotaquirá"
          },
          {
            id: "314",
            name: "Susacón"
          },
          {
            id: "315",
            name: "Sutamarchán"
          },
          {
            id: "316",
            name: "Sutatenza"
          },
          {
            id: "317",
            name: "Tasco"
          },
          {
            id: "318",
            name: "Tenza"
          },
          {
            id: "319",
            name: "Tibaná"
          },
          {
            id: "320",
            name: "Tibasosa"
          },
          {
            id: "321",
            name: "Tinjacá"
          },
          {
            id: "322",
            name: "Tipacoque"
          },
          {
            id: "323",
            name: "Toca"
          },
          {
            id: "324",
            name: "Togüí"
          },
          {
            id: "325",
            name: "Tópaga"
          },
          {
            id: "326",
            name: "Tota"
          },
          {
            id: "327",
            name: "Tunja"
          },
          {
            id: "328",
            name: "Tunungua"
          },
          {
            id: "329",
            name: "Turmequé"
          },
          {
            id: "330",
            name: "Tuta"
          },
          {
            id: "331",
            name: "Tutazá"
          },
          {
            id: "332",
            name: "Úmbita"
          },
          {
            id: "333",
            name: "Ventaquemada"
          },
          {
            id: "334",
            name: "Villa de Leyva"
          },
          {
            id: "335",
            name: "Viracachá"
          },
          {
            id: "336",
            name: "Zetaquira"
          }
        ]
      },
      {
        name: " Caldas",
        id: 6,
        // material icons icon name
        children: [
          {
            id: "337",
            name: "Aguadas"
          },
          {
            id: "338",
            name: "Anserma"
          },
          {
            id: "339",
            name: "Aranzazu"
          },
          {
            id: "340",
            name: "Belalcázar"
          },
          {
            id: "341",
            name: "Chinchiná"
          },
          {
            id: "342",
            name: "Filadelfia"
          },
          {
            id: "343",
            name: "La Dorada"
          },
          {
            id: "344",
            name: "La Merced"
          },
          {
            id: "345",
            name: "Manizales"
          },
          {
            id: "346",
            name: "Manzanares"
          },
          {
            id: "347",
            name: "Marmato"
          },
          {
            id: "348",
            name: "Marquetalia"
          },
          {
            id: "349",
            name: "Marulanda"
          },
          {
            id: "350",
            name: "Neira"
          },
          {
            id: "351",
            name: "Norcasia"
          },
          {
            id: "352",
            name: "Pácora"
          },
          {
            id: "353",
            name: "Palestina"
          },
          {
            id: "354",
            name: "Pensilvania"
          },
          {
            id: "355",
            name: "Riosucio"
          },
          {
            id: "356",
            name: "Risaralda"
          },
          {
            id: "357",
            name: "Salamina"
          },
          {
            id: "358",
            name: "Samaná"
          },
          {
            id: "359",
            name: "San José"
          },
          {
            id: "360",
            name: "Supía"
          },
          {
            id: "361",
            name: "Victoria"
          },
          {
            id: "362",
            name: "Villamaría"
          },
          {
            id: "363",
            name: "Viterbo"
          }
        ]
      },
      {
        name: " Caquetá",
        id: 7,
        // local required file
        children: [
          {
            id: "364",
            name: "Albania"
          },
          {
            id: "365",
            name: "Belén de los Andaquies"
          },
          {
            id: "366",
            name: "Cartagena del Chairá"
          },
          {
            id: "367",
            name: "Curillo"
          },
          {
            id: "368",
            name: "El Doncello"
          },
          {
            id: "369",
            name: "El Paujil"
          },
          {
            id: "370",
            name: "Florencia"
          },
          {
            id: "371",
            name: "La Montañita"
          },
          {
            id: "372",
            name: "Morelia"
          },
          {
            id: "373",
            name: "Puerto Milán"
          },
          {
            id: "374",
            name: "Puerto Rico"
          },
          {
            id: "375",
            name: "San José del Fragua"
          },
          {
            id: "376",
            name: "San Vicente del Caguán"
          },
          {
            id: "377",
            name: "Solano"
          },
          {
            id: "378",
            name: "Solita"
          },
          {
            id: "379",
            name: "Valparaíso"
          }
        ]
      },
      {
        name: " Casanare",
        id: 8,
        // web uri
        children: [
          {
            id: "380",
            name: "Aguazul"
          },
          {
            id: "381",
            name: "Chámeza"
          },
          {
            id: "382",
            name: "Hato Corozal"
          },
          {
            id: "383",
            name: "La Salina"
          },
          {
            id: "384",
            name: "Maní"
          },
          {
            id: "385",
            name: "Monterrey"
          },
          {
            id: "386",
            name: "Nunchía"
          },
          {
            id: "387",
            name: "Orocué"
          },
          {
            id: "388",
            name: "Paz de Ariporo"
          },
          {
            id: "389",
            name: "Pore"
          },
          {
            id: "390",
            name: "Recetor"
          },
          {
            id: "391",
            name: "Sabanalarga"
          },
          {
            id: "392",
            name: "Sácama"
          },
          {
            id: "393",
            name: "San Luis de Palenque"
          },
          {
            id: "394",
            name: "Támara"
          },
          {
            id: "395",
            name: "Tauramena"
          },
          {
            id: "396",
            name: "Trinidad"
          },
          {
            id: "397",
            name: "Villanueva"
          },
          {
            id: "398",
            name: "Yopal"
          }
        ]
      },
      {
        name: " Cauca",
        id: 9,
        // material icons icon name
        children: [
          {
            id: "399",
            name: "Almaguer"
          },
          {
            id: "400",
            name: "Argelia"
          },
          {
            id: "401",
            name: "Balboa"
          },
          {
            id: "402",
            name: "Bolívar"
          },
          {
            id: "403",
            name: "Buenos Aires"
          },
          {
            id: "404",
            name: "Cajibío"
          },
          {
            id: "405",
            name: "Caldono"
          },
          {
            id: "406",
            name: "Caloto"
          },
          {
            id: "407",
            name: "Corinto"
          },
          {
            id: "408",
            name: "El Tambo"
          },
          {
            id: "409",
            name: "Florencia"
          },
          {
            id: "410",
            name: "Guachené"
          },
          {
            id: "411",
            name: "Guapí"
          },
          {
            id: "412",
            name: "Inzá"
          },
          {
            id: "413",
            name: "Jambaló"
          },
          {
            id: "414",
            name: "La Sierra"
          },
          {
            id: "415",
            name: "La Vega"
          },
          {
            id: "416",
            name: "López de Micay"
          },
          {
            id: "417",
            name: "Mercaderes"
          },
          {
            id: "418",
            name: "Miranda"
          },
          {
            id: "419",
            name: "Morales"
          },
          {
            id: "420",
            name: "Padilla"
          },
          {
            id: "421",
            name: "Páez"
          },
          {
            id: "422",
            name: "Patía"
          },
          {
            id: "423",
            name: "Piamonte"
          },
          {
            id: "424",
            name: "Piendamó"
          },
          {
            id: "425",
            name: "Popayán"
          },
          {
            id: "426",
            name: "Puerto Tejada"
          },
          {
            id: "427",
            name: "Puracé"
          },
          {
            id: "428",
            name: "Rosas"
          },
          {
            id: "429",
            name: "San Sebastián"
          },
          {
            id: "430",
            name: "Santa Rosa"
          },
          {
            id: "431",
            name: "Santander de Quilichao"
          },
          {
            id: "432",
            name: "Silvia"
          },
          {
            id: "433",
            name: "Sotará"
          },
          {
            id: "434",
            name: "Suárez"
          },
          {
            id: "435",
            name: "Sucre"
          },
          {
            id: "436",
            name: "Timbío"
          },
          {
            id: "437",
            name: "Timbiquí"
          },
          {
            id: "438",
            name: "Toribío"
          },
          {
            id: "439",
            name: "Totoró"
          },
          {
            id: "440",
            name: "Villa Rica"
          }
        ]
      },
      {
        name: "Cesar",
        id: 10,
        // material icons icon name
        children: [
          {
            id: "441",
            name: "Aguachica"
          },
          {
            id: "442",
            name: "Agustín Codazzi"
          },
          {
            id: "443",
            name: "Astrea"
          },
          {
            id: "444",
            name: "Becerril"
          },
          {
            id: "445",
            name: "Bosconia"
          },
          {
            id: "446",
            name: "Chimichagua"
          },
          {
            id: "447",
            name: "Chiriguaná"
          },
          {
            id: "448",
            name: "Curumaní"
          },
          {
            id: "449",
            name: "El Copey"
          },
          {
            id: "450",
            name: "El Paso"
          },
          {
            id: "451",
            name: "Gamarra"
          },
          {
            id: "452",
            name: "González"
          },
          {
            id: "453",
            name: "La Gloria"
          },
          {
            id: "454",
            name: "La Jagua de Ibirico"
          },
          {
            id: "455",
            name: "La Paz"
          },
          {
            id: "456",
            name: "Manaure Balcón del Cesar"
          },
          {
            id: "457",
            name: "Pailitas"
          },
          {
            id: "458",
            name: "Pelaya"
          },
          {
            id: "459",
            name: "Pueblo Bello"
          },
          {
            id: "460",
            name: "Río de Oro"
          },
          {
            id: "461",
            name: "San Alberto"
          },
          {
            id: "462",
            name: "San Diego"
          },
          {
            id: "463",
            name: "San Martín"
          },
          {
            id: "464",
            name: "Tamalameque"
          },
          {
            id: "465",
            name: "Valledupar"
          }
        ]
      },
      {
        name: " Chocó",
        id: 11,
        // local required file
        children: [
          {
            id: "466",
            name: "Acandí"
          },
          {
            id: "467",
            name: "Alto Baudó"
          },
          {
            id: "468",
            name: "Bagadó"
          },
          {
            id: "469",
            name: "Bahía Solano"
          },
          {
            id: "470",
            name: "Bajo Baudó"
          },
          {
            id: "471",
            name: "Bojayá"
          },
          {
            id: "472",
            name: "Cértegui"
          },
          {
            id: "473",
            name: "Condoto"
          },
          {
            id: "474",
            name: "Cantón de San Pablo"
          },
          {
            id: "475",
            name: "El Atrato"
          },
          {
            id: "476",
            name: "El Carmen de Atrato"
          },
          {
            id: "477",
            name: "El Carmen del Darién"
          },
          {
            id: "478",
            name: "El Litoral de San Juan"
          },
          {
            id: "479",
            name: "Istmina"
          },
          {
            id: "480",
            name: "Juradó"
          },
          {
            id: "481",
            name: "Lloró"
          },
          {
            id: "482",
            name: "Medio Atrato"
          },
          {
            id: "483",
            name: "Medio Baudó"
          },
          {
            id: "484",
            name: "Medio San Juan"
          },
          {
            id: "485",
            name: "Nóvita"
          },
          {
            id: "486",
            name: "Nuquí"
          },
          {
            id: "487",
            name: "Quibdó"
          },
          {
            id: "488",
            name: "Río Iró"
          },
          {
            id: "489",
            name: "Río Quito"
          },
          {
            id: "490",
            name: "Riosucio"
          },
          {
            id: "491",
            name: "San José del Palmar"
          },
          {
            id: "492",
            name: "Sipí"
          },
          {
            id: "493",
            name: "Tadó"
          },
          {
            id: "494",
            name: "Unguía"
          },
          {
            id: "495",
            name: "Unión Panamericana"
          }
        ]
      },
      {
        name: "Córdoba",
        id: 12,
        // local required file
        children: [
          {
            id: "496",
            name: "Ayapel"
          },
          {
            id: "497",
            name: "Buenavista"
          },
          {
            id: "498",
            name: "Canalete"
          },
          {
            id: "499",
            name: "Cereté"
          },
          {
            id: "500",
            name: "Chimá"
          },
          {
            id: "501",
            name: "Chinú"
          },
          {
            id: "502",
            name: "Ciénaga de Oro"
          },
          {
            id: "503",
            name: "Cotorra"
          },
          {
            id: "504",
            name: "La Apartada"
          },
          {
            id: "505",
            name: "Los Córdobas"
          },
          {
            id: "506",
            name: "Momil"
          },
          {
            id: "507",
            name: "Montelíbano"
          },
          {
            id: "508",
            name: "Montería"
          },
          {
            id: "509",
            name: "Moñitos"
          },
          {
            id: "510",
            name: "Planeta Rica"
          },
          {
            id: "511",
            name: "Pueblo Nuevo"
          },
          {
            id: "512",
            name: "Puerto Escondido"
          },
          {
            id: "513",
            name: "Puerto Libertador"
          },
          {
            id: "514",
            name: "Purísima"
          },
          {
            id: "515",
            name: "Sahagún"
          },
          {
            id: "516",
            name: "San Andrés de Sotavento"
          },
          {
            id: "517",
            name: "San Antero"
          },
          {
            id: "518",
            name: "San Bernardo del Viento"
          },
          {
            id: "519",
            name: "San Carlos"
          },
          {
            id: "520",
            name: "San José de Uré"
          },
          {
            id: "521",
            name: "San Pelayo"
          },
          {
            id: "522",
            name: "Santa Cruz de Lorica"
          },
          {
            id: "523",
            name: "Tierralta"
          },
          {
            id: "524",
            name: "Tuchín"
          },
          {
            id: "525",
            name: "Valencia"
          }
        ]
      },
      {
        name: " Cundinamarca",
        id: 13,
        // web uri
        children: [
          {
            id: "526",
            name: "Agua de Dios"
          },
          {
            id: "527",
            name: "Albán"
          },
          {
            id: "528",
            name: "Anapoima"
          },
          {
            id: "529",
            name: "Anolaima"
          },
          {
            id: "530",
            name: "Apulo"
          },
          {
            id: "531",
            name: "Arbelaéz"
          },
          {
            id: "532",
            name: "Beltrán"
          },
          {
            id: "533",
            name: "Bituima"
          },
          {
            id: "534",
            name: "Bogotá"
          },
          {
            id: "535",
            name: "Bojacá"
          },
          {
            id: "536",
            name: "Cabrera"
          },
          {
            id: "537",
            name: "Cachipay"
          },
          {
            id: "538",
            name: "Cajicá"
          },
          {
            id: "539",
            name: "Caparrapí"
          },
          {
            id: "540",
            name: "Cáqueza"
          },
          {
            id: "541",
            name: "Carmen de Carupa"
          },
          {
            id: "542",
            name: "Chaguaní"
          },
          {
            id: "543",
            name: "Chía"
          },
          {
            id: "544",
            name: "Chipaque"
          },
          {
            id: "545",
            name: "Choachí"
          },
          {
            id: "546",
            name: "Chocontá"
          },
          {
            id: "547",
            name: "Cogua"
          },
          {
            id: "548",
            name: "Cota"
          },
          {
            id: "549",
            name: "Cucunubá"
          },
          {
            id: "550",
            name: "El Colegio"
          },
          {
            id: "551",
            name: "El Peñón"
          },
          {
            id: "552",
            name: "El Rosal"
          },
          {
            id: "553",
            name: "Facatativá"
          },
          {
            id: "554",
            name: "Fómeque"
          },
          {
            id: "555",
            name: "Fosca"
          },
          {
            id: "556",
            name: "Funza"
          },
          {
            id: "557",
            name: "Fúquene"
          },
          {
            id: "558",
            name: "Fusagasugá"
          },
          {
            id: "559",
            name: "Gachalá"
          },
          {
            id: "560",
            name: "Gachancipá"
          },
          {
            id: "561",
            name: "Gachetá"
          },
          {
            id: "562",
            name: "Gama"
          },
          {
            id: "563",
            name: "Girardot"
          },
          {
            id: "564",
            name: "Granada"
          },
          {
            id: "565",
            name: "Guachetá"
          },
          {
            id: "566",
            name: "Guaduas"
          },
          {
            id: "567",
            name: "Guasca"
          },
          {
            id: "568",
            name: "Guataquí"
          },
          {
            id: "569",
            name: "Guatavita"
          },
          {
            id: "570",
            name: "Guayabal de Síquima"
          },
          {
            id: "571",
            name: "Guayabetal"
          },
          {
            id: "572",
            name: "Gutiérrez"
          },
          {
            id: "573",
            name: "Jerusalén"
          },
          {
            id: "574",
            name: "Junín"
          },
          {
            id: "575",
            name: "La Calera"
          },
          {
            id: "576",
            name: "La Mesa"
          },
          {
            id: "577",
            name: "La Palma"
          },
          {
            id: "578",
            name: "La Peña"
          },
          {
            id: "579",
            name: "La Vega"
          },
          {
            id: "580",
            name: "Lenguazaque"
          },
          {
            id: "581",
            name: "Machetá"
          },
          {
            id: "582",
            name: "Madrid"
          },
          {
            id: "583",
            name: "Manta"
          },
          {
            id: "584",
            name: "Medina"
          },
          {
            id: "585",
            name: "Mosquera"
          },
          {
            id: "586",
            name: "Nariño"
          },
          {
            id: "587",
            name: "Nemocón"
          },
          {
            id: "588",
            name: "Nilo"
          },
          {
            id: "589",
            name: "Nimaima"
          },
          {
            id: "590",
            name: "Nocaima"
          },
          {
            id: "591",
            name: "Pacho"
          },
          {
            id: "592",
            name: "Paime"
          },
          {
            id: "593",
            name: "Pandi"
          },
          {
            id: "594",
            name: "Paratebueno"
          },
          {
            id: "595",
            name: "Pasca"
          },
          {
            id: "596",
            name: "Puerto Salgar"
          },
          {
            id: "597",
            name: "Pulí"
          },
          {
            id: "598",
            name: "Quebradanegra"
          },
          {
            id: "599",
            name: "Quetame"
          },
          {
            id: "600",
            name: "Quipile"
          },
          {
            id: "601",
            name: "Ricaurte"
          },
          {
            id: "602",
            name: "San Antonio del Tequendama"
          },
          {
            id: "603",
            name: "San Bernardo"
          },
          {
            id: "604",
            name: "San Cayetano"
          },
          {
            id: "605",
            name: "San Francisco"
          },
          {
            id: "606",
            name: "San Juan de Rioseco"
          },
          {
            id: "607",
            name: "Sasaima"
          },
          {
            id: "608",
            name: "Sesquilé"
          },
          {
            id: "609",
            name: "Sibaté"
          },
          {
            id: "610",
            name: "Silvania"
          },
          {
            id: "611",
            name: "Simijaca"
          },
          {
            id: "612",
            name: "Soacha"
          },
          {
            id: "613",
            name: "Sopó"
          },
          {
            id: "614",
            name: "Subachoque"
          },
          {
            id: "615",
            name: "Suesca"
          },
          {
            id: "616",
            name: "Supatá"
          },
          {
            id: "617",
            name: "Susa"
          },
          {
            id: "618",
            name: "Sutatausa"
          },
          {
            id: "619",
            name: "Tabio"
          },
          {
            id: "620",
            name: "Tausa"
          },
          {
            id: "621",
            name: "Tena"
          },
          {
            id: "622",
            name: "Tenjo"
          },
          {
            id: "623",
            name: "Tibacuy"
          },
          {
            id: "624",
            name: "Tibirita"
          },
          {
            id: "625",
            name: "Tocaima"
          },
          {
            id: "626",
            name: "Tocancipá"
          },
          {
            id: "627",
            name: "Topaipí"
          },
          {
            id: "628",
            name: "Ubalá"
          },
          {
            id: "629",
            name: "Ubaque"
          },
          {
            id: "630",
            name: "Ubaté"
          },
          {
            id: "631",
            name: "Une"
          },
          {
            id: "632",
            name: "Útica"
          },
          {
            id: "633",
            name: "Venecia"
          },
          {
            id: "634",
            name: "Vergara"
          },
          {
            id: "635",
            name: "Vianí"
          },
          {
            id: "636",
            name: "Villagómez"
          },
          {
            id: "637",
            name: "Villapinzón"
          },
          {
            id: "638",
            name: "Villeta"
          },
          {
            id: "639",
            name: "Viotá"
          },
          {
            id: "640",
            name: "Yacopí"
          },
          {
            id: "641",
            name: "Zipacón"
          },
          {
            id: "642",
            name: "Zipaquirá"
          }
        ]
      },

      {
        name: " Guainía",
        id: 14,
        // material icons icon name
        children: [
          {
            id: "643",
            name: "Barrancominas"
          },
          {
            id: "644",
            name: "Cacahual"
          },
          {
            id: "645",
            name: "Inírida"
          },
          {
            id: "646",
            name: "La Guadalupe"
          },
          {
            id: "647",
            name: "Mapiripana"
          },
          {
            id: "648",
            name: "Morichal Nuevo"
          },
          {
            id: "649",
            name: "Pana Pana"
          },
          {
            id: "650",
            name: "Puerto Colombia"
          },
          {
            id: "651",
            name: "San Felipe"
          }
        ]
      },
      {
        name: " Guaviare",
        id: 15,
        // material icons icon name
        children: [
          {
            id: "652",
            name: "Calamar"
          },
          {
            id: "653",
            name: "El Retorno"
          },
          {
            id: "654",
            name: "Miraflores"
          },
          {
            id: "655",
            name: "San José del Guaviare"
          }
        ]
      },
      {
        name: "Huila",
        id: 16,
        // material icons icon name
        children: [
          {
            id: "656",
            name: "Acevedo"
          },
          {
            id: "657",
            name: "Agrado"
          },
          {
            id: "658",
            name: "Aipe"
          },
          {
            id: "659",
            name: "Algeciras"
          },
          {
            id: "660",
            name: "Altamira"
          },
          {
            id: "661",
            name: "Baraya"
          },
          {
            id: "662",
            name: "Campoalegre"
          },
          {
            id: "663",
            name: "Colombia"
          },
          {
            id: "664",
            name: "Elías"
          },
          {
            id: "665",
            name: "El Pital"
          },
          {
            id: "666",
            name: "Garzón"
          },
          {
            id: "667",
            name: "Gigante"
          },
          {
            id: "668",
            name: "Guadalupe"
          },
          {
            id: "669",
            name: "Hobo"
          },
          {
            id: "670",
            name: "Íquira"
          },
          {
            id: "671",
            name: "Isnos"
          },
          {
            id: "672",
            name: "La Argentina"
          },
          {
            id: "673",
            name: "La Plata"
          },
          {
            id: "674",
            name: "Nátaga"
          },
          {
            id: "675",
            name: "Neiva"
          },
          {
            id: "676",
            name: "Oporapa"
          },
          {
            id: "677",
            name: "Paicol"
          },
          {
            id: "678",
            name: "Palermo"
          },
          {
            id: "679",
            name: "Palestina"
          },
          {
            id: "680",
            name: "Pitalito"
          },
          {
            id: "681",
            name: "Rivera"
          },
          {
            id: "682",
            name: "Saladoblanco"
          },
          {
            id: "683",
            name: "San Agustín"
          },
          {
            id: "684",
            name: "Santa María"
          },
          {
            id: "685",
            name: "Suaza"
          },
          {
            id: "686",
            name: "Tarqui"
          },
          {
            id: "687",
            name: "Tello"
          },
          {
            id: "688",
            name: "Teruel"
          },
          {
            id: "689",
            name: "Tesalia"
          },
          {
            id: "690",
            name: "Timaná"
          },
          {
            id: "691",
            name: "Villavieja"
          },
          {
            id: "692",
            name: "Yaguará"
          }
        ]
      },
      {
        name: "La Guajira",
        id: 17,
        // material icons icon name
        children: [
          {
            id: "693",
            name: "Albania"
          },
          {
            id: "694",
            name: "Barrancas"
          },
          {
            id: "695",
            name: "Dibulla"
          },
          {
            id: "696",
            name: "Distracción"
          },
          {
            id: "697",
            name: "El Molino"
          },
          {
            id: "698",
            name: "Fonseca"
          },
          {
            id: "699",
            name: "Hatonuevo"
          },
          {
            id: "700",
            name: "La Jagua del Pilar"
          },
          {
            id: "701",
            name: "Maicao"
          },
          {
            id: "702",
            name: "Manaure"
          },
          {
            id: "703",
            name: "Riohacha"
          },
          {
            id: "704",
            name: "San Juan del Cesar"
          },
          {
            id: "705",
            name: "Uribia"
          },
          {
            id: "706",
            name: "Urumita"
          },
          {
            id: "707",
            name: "Villanueva"
          }
        ]
      },
      {
        name: " Magdalena",
        id: 18,
        // material icons icon name
        children: [
          {
            id: "708",
            name: "Algarrobo"
          },
          {
            id: "709",
            name: "Aracataca"
          },
          {
            id: "710",
            name: "Ariguaní"
          },
          {
            id: "711",
            name: "Cerro de San Antonio"
          },
          {
            id: "712",
            name: "Chibolo"
          },
          {
            id: "713",
            name: "Ciénaga"
          },
          {
            id: "714",
            name: "Concordia"
          },
          {
            id: "715",
            name: "El Banco"
          },
          {
            id: "716",
            name: "El Piñón"
          },
          {
            id: "717",
            name: "El Retén"
          },
          {
            id: "718",
            name: "Fundación"
          },
          {
            id: "719",
            name: "Guamal"
          },
          {
            id: "720",
            name: "Nuava Granada"
          },
          {
            id: "721",
            name: "Pedraza"
          },
          {
            id: "722",
            name: "Pijiño del Carmen"
          },
          {
            id: "723",
            name: "Pivijay"
          },
          {
            id: "724",
            name: "Plato"
          },
          {
            id: "725",
            name: "Pueblo Viejo"
          },
          {
            id: "726",
            name: "Remolino"
          },
          {
            id: "727",
            name: "Sabanas de San Ángel"
          },
          {
            id: "728",
            name: "Salamina"
          },
          {
            id: "729",
            name: "San Sebastián de Buenavista"
          },
          {
            id: "730",
            name: "San Zenón"
          },
          {
            id: "731",
            name: "Santa Ana"
          },
          {
            id: "732",
            name: "Santa Bárbara de Pinto"
          },
          {
            id: "733",
            name: "Santa Marta"
          },
          {
            id: "734",
            name: "Sitionuevo"
          },
          {
            id: "735",
            name: "Tenerife"
          },
          {
            id: "736",
            name: "Zapayán"
          },
          {
            id: "737",
            name: "Zona Bananera"
          }
        ]
      },
      {
        name: " Meta",
        id: 19,
        // material icons icon name
        children: [
          {
            id: "738",
            name: "Acacías"
          },
          {
            id: "739",
            name: "Barranca de Upía"
          },
          {
            id: "740",
            name: "Cabuyaro"
          },
          {
            id: "741",
            name: "Castilla La Nueva"
          },
          {
            id: "742",
            name: "Cubarral"
          },
          {
            id: "743",
            name: "Cumaral"
          },
          {
            id: "744",
            name: "El Calvario"
          },
          {
            id: "745",
            name: "El Castillo"
          },
          {
            id: "746",
            name: "El Dorado"
          },
          {
            id: "747",
            name: "Fuente de Oro"
          },
          {
            id: "748",
            name: "Granada"
          },
          {
            id: "749",
            name: "Guamal"
          },
          {
            id: "750",
            name: "La Macarena"
          },
          {
            id: "751",
            name: "La Uribe"
          },
          {
            id: "752",
            name: "Lejanías"
          },
          {
            id: "753",
            name: "Mapiripán"
          },
          {
            id: "754",
            name: "Mesetas"
          },
          {
            id: "755",
            name: "Puerto Concordia"
          },
          {
            id: "756",
            name: "Puerto Gaitán"
          },
          {
            id: "757",
            name: "Puerto Lleras"
          },
          {
            id: "758",
            name: "Puerto López"
          },
          {
            id: "759",
            name: "Puerto Rico"
          },
          {
            id: "760",
            name: "Restrepo"
          },
          {
            id: "761",
            name: "San Carlos de Guaroa"
          },
          {
            id: "762",
            name: "San Juan de Arama"
          },
          {
            id: "763",
            name: "San Juanito"
          },
          {
            id: "764",
            name: "San Martín"
          },
          {
            id: "765",
            name: "Villavicencio"
          },
          {
            id: "766",
            name: "Vista Hermosa"
          }
        ]
      },
      {
        name: " Nariño",
        id: 20,
        // material icons icon name
        children: [
          {
            name: "Mother In Law's Tongue",
            id: 30
          },
          {
            name: "Yucca",
            id: 31
          },
          {
            name: "Monsteria",
            id: 32
          },
          {
            name: "Palm",
            id: 33
          }
        ]
      },
      {
        name: " Norte de Santander",
        id: 21,
        // material icons icon name
        children: [
          {
            id: "767",
            name: "San José de Albán"
          },
          {
            id: "768",
            name: "Aldana"
          },
          {
            id: "769",
            name: "Ancuya"
          },
          {
            id: "770",
            name: "Arboleda"
          },
          {
            id: "771",
            name: "Barbacoas"
          },
          {
            id: "772",
            name: "Belén"
          },
          {
            id: "773",
            name: "Buesaco"
          },
          {
            id: "774",
            name: "Chachagüí"
          },
          {
            id: "775",
            name: "Colón"
          },
          {
            id: "776",
            name: "Consacá"
          },
          {
            id: "777",
            name: "Contadero"
          },
          {
            id: "778",
            name: "Córdoba"
          },
          {
            id: "779",
            name: "Cuaspud"
          },
          {
            id: "780",
            name: "Cumbal"
          },
          {
            id: "781",
            name: "Cumbitara"
          },
          {
            id: "782",
            name: "El Charco"
          },
          {
            id: "783",
            name: "El Peñol"
          },
          {
            id: "784",
            name: "El Rosario"
          },
          {
            id: "785",
            name: "El Tablón"
          },
          {
            id: "786",
            name: "El Tambo"
          },
          {
            id: "787",
            name: "Francisco Pizarro"
          },
          {
            id: "788",
            name: "Funes"
          },
          {
            id: "789",
            name: "Guachucal"
          },
          {
            id: "790",
            name: "Guaitarilla"
          },
          {
            id: "791",
            name: "Gualmatán"
          },
          {
            id: "792",
            name: "Iles"
          },
          {
            id: "793",
            name: "Imués"
          },
          {
            id: "794",
            name: "Ipiales"
          },
          {
            id: "795",
            name: "La Cruz"
          },
          {
            id: "796",
            name: "La Florida"
          },
          {
            id: "797",
            name: "La Llanada"
          },
          {
            id: "798",
            name: "La Tola"
          },
          {
            id: "799",
            name: "La Unión"
          },
          {
            id: "800",
            name: "Leiva"
          },
          {
            id: "801",
            name: "Linares"
          },
          {
            id: "802",
            name: "Los Andes"
          },
          {
            id: "803",
            name: "Magüí"
          },
          {
            id: "804",
            name: "Mallama"
          },
          {
            id: "805",
            name: "Mosquera"
          },
          {
            id: "806",
            name: "Nariño"
          },
          {
            id: "807",
            name: "Olaya Herrera"
          },
          {
            id: "808",
            name: "Ospina"
          },
          {
            id: "809",
            name: "Pasto"
          },
          {
            id: "810",
            name: "Policarpa"
          },
          {
            id: "811",
            name: "Potosí"
          },
          {
            id: "812",
            name: "Providencia"
          },
          {
            id: "813",
            name: "Puerres"
          },
          {
            id: "814",
            name: "Pupiales"
          },
          {
            id: "815",
            name: "Ricaurte"
          },
          {
            id: "816",
            name: "Roberto Payán"
          },
          {
            id: "817",
            name: "Samaniego"
          },
          {
            id: "818",
            name: "San Bernardo"
          },
          {
            id: "819",
            name: "San Lorenzo"
          },
          {
            id: "820",
            name: "San Pablo"
          },
          {
            id: "821",
            name: "San Pedro de Cartago"
          },
          {
            id: "822",
            name: "Sandoná"
          },
          {
            id: "823",
            name: "Santa Bárbara"
          },
          {
            id: "824",
            name: "Santacruz"
          },
          {
            id: "825",
            name: "Sapuyes"
          },
          {
            id: "826",
            name: "Taminango"
          },
          {
            id: "827",
            name: "Tangua"
          },
          {
            id: "828",
            name: "Tumaco"
          },
          {
            id: "829",
            name: "Túquerres"
          },
          {
            id: "830",
            name: "Yacuanquer"
          }
        ]
      },
      {
        name: "  Putumayo",
        id: 22,
        // material icons icon name
        children: [
          {
            name: "Mother In Law's Tongue",
            id: 30
          },
          {
            name: "Yucca",
            id: 31
          },
          {
            name: "Monsteria",
            id: 32
          },
          {
            name: "Palm",
            id: 33
          }
        ]
      },
      {
        name: " Quindío",
        id: 23,
        // material icons icon name
        children: [
          {
            id: "871",
            name: "Colón"
          },
          {
            id: "872",
            name: "Mocoa"
          },
          {
            id: "873",
            name: "Orito"
          },
          {
            id: "874",
            name: "Puerto Asís"
          },
          {
            id: "875",
            name: "Puerto Caicedo"
          },
          {
            id: "876",
            name: "Puerto Guzmán"
          },
          {
            id: "877",
            name: "Puerto Leguízamo"
          },
          {
            id: "878",
            name: "San Francisco"
          },
          {
            id: "879",
            name: "San Miguel"
          },
          {
            id: "880",
            name: "Santiago"
          },
          {
            id: "881",
            name: "Sibundoy"
          },
          {
            id: "882",
            name: "Valle del Guamuez"
          },
          {
            id: "883",
            name: "Villagarzón"
          }
        ]
      },
      {
        name: " Risaralda",
        id: 24,
        // material icons icon name
        children: [
          {
            id: "896",
            name: "Apía"
          },
          {
            id: "897",
            name: "Balboa"
          },
          {
            id: "898",
            name: "Belén de Umbría"
          },
          {
            id: "899",
            name: "Dosquebradas"
          },
          {
            id: "900",
            name: "Guática"
          },
          {
            id: "901",
            name: "La Celia"
          },
          {
            id: "902",
            name: "La Virginia"
          },
          {
            id: "903",
            name: "Marsella"
          },
          {
            id: "904",
            name: "Mistrató"
          },
          {
            id: "905",
            name: "Pereira"
          },
          {
            id: "906",
            name: "Pueblo Rico"
          },
          {
            id: "907",
            name: "Quinchía"
          },
          {
            id: "908",
            name: "Santa Rosa de Cabal"
          },
          {
            id: "909",
            name: "Santuario"
          }
        ]
      },
      {
        name: " San Andrés y Providencia",
        id: 25,
        // material icons icon name
        children: [
          {
            id: "910",
            name: "Providencia y Santa Catalina Islas"
          }
        ]
      },
      {
        name: "  Santander",
        id: 26,
        // material icons icon name
        children: [
          {
            id: "911",
            name: "Aguada"
          },
          {
            id: "912",
            name: "Albania"
          },
          {
            id: "913",
            name: "Aratoca"
          },
          {
            id: "914",
            name: "Barbosa"
          },
          {
            id: "915",
            name: "Barichara"
          },
          {
            id: "916",
            name: "Barrancabermeja"
          },
          {
            id: "917",
            name: "Betulia"
          },
          {
            id: "918",
            name: "Bolívar"
          },
          {
            id: "919",
            name: "Bucaramanga"
          },
          {
            id: "920",
            name: "Cabrera"
          },
          {
            id: "921",
            name: "California"
          },
          {
            id: "922",
            name: "Capitanejo"
          },
          {
            id: "923",
            name: "Carcasí"
          },
          {
            id: "924",
            name: "Cepitá"
          },
          {
            id: "925",
            name: "Cerrito"
          },
          {
            id: "926",
            name: "Charalá"
          },
          {
            id: "927",
            name: "Charta"
          },
          {
            id: "928",
            name: "Chima"
          },
          {
            id: "929",
            name: "Chipatá"
          },
          {
            id: "930",
            name: "Cimitarra"
          },
          {
            id: "931",
            name: "Concepción"
          },
          {
            id: "932",
            name: "Confines"
          },
          {
            id: "933",
            name: "Contratación"
          },
          {
            id: "934",
            name: "Coromoro"
          },
          {
            id: "935",
            name: "Curití"
          },
          {
            id: "936",
            name: "El Carmen de Chucurí"
          },
          {
            id: "937",
            name: "El Guacamayo"
          },
          {
            id: "938",
            name: "El Peñón"
          },
          {
            id: "939",
            name: "El Playón"
          },
          {
            id: "940",
            name: "Encino"
          },
          {
            id: "941",
            name: "Enciso"
          },
          {
            id: "942",
            name: "Florián"
          },
          {
            id: "943",
            name: "Floridablanca"
          },
          {
            id: "944",
            name: "Galán"
          },
          {
            id: "945",
            name: "Gámbita"
          },
          {
            id: "946",
            name: "Guaca"
          },
          {
            id: "947",
            name: "Guadalupe"
          },
          {
            id: "948",
            name: "Guapotá"
          },
          {
            id: "949",
            name: "Guavatá"
          },
          {
            id: "950",
            name: "Güepsa"
          },
          {
            id: "951",
            name: "Hato"
          },
          {
            id: "952",
            name: "Jesús María"
          },
          {
            id: "953",
            name: "Jordán"
          },
          {
            id: "954",
            name: "La Belleza"
          },
          {
            id: "955",
            name: "La Paz"
          },
          {
            id: "956",
            name: "Landázuri"
          },
          {
            id: "957",
            name: "Lebrija"
          },
          {
            id: "958",
            name: "Los Santos"
          },
          {
            id: "959",
            name: "Macaravita"
          },
          {
            id: "960",
            name: "Málaga"
          },
          {
            id: "961",
            name: "Matanza"
          },
          {
            id: "962",
            name: "Mogotes"
          },
          {
            id: "963",
            name: "Molagavita"
          },
          {
            id: "964",
            name: "Ocamonte"
          },
          {
            id: "965",
            name: "Oiba"
          },
          {
            id: "966",
            name: "Onzaga"
          },
          {
            id: "967",
            name: "Palmar"
          },
          {
            id: "968",
            name: "Palmas del Socorro"
          },
          {
            id: "969",
            name: "Páramo"
          },
          {
            id: "970",
            name: "Piedecuesta"
          },
          {
            id: "971",
            name: "Pinchote"
          },
          {
            id: "972",
            name: "Puente Nacional"
          },
          {
            id: "973",
            name: "Puerto Parra"
          },
          {
            id: "974",
            name: "Puerto Wilches"
          },
          {
            id: "975",
            name: "Rionegro"
          },
          {
            id: "976",
            name: "Sabana de Torres"
          },
          {
            id: "977",
            name: "San Andrés"
          },
          {
            id: "978",
            name: "San Benito"
          },
          {
            id: "979",
            name: "San Gil"
          },
          {
            id: "980",
            name: "San Joaquín"
          },
          {
            id: "981",
            name: "San José de Miranda"
          },
          {
            id: "982",
            name: "San Juan de Girón"
          },
          {
            id: "983",
            name: "San Miguel"
          },
          {
            id: "984",
            name: "San Vicente de Chucurí"
          },
          {
            id: "985",
            name: "Santa Bárbara"
          },
          {
            id: "986",
            name: "Santa Helena del Opón"
          },
          {
            id: "987",
            name: "Simacota"
          },
          {
            id: "988",
            name: "El Socorro"
          },
          {
            id: "989",
            name: "Suaita"
          },
          {
            id: "990",
            name: "Sucre"
          },
          {
            id: "991",
            name: "Suratá"
          },
          {
            id: "992",
            name: "Tona"
          },
          {
            id: "993",
            name: "Valle de San José"
          },
          {
            id: "994",
            name: "Vélez"
          },
          {
            id: "995",
            name: "Vetas"
          },
          {
            id: "996",
            name: "Villanueva"
          },
          {
            id: "997",
            name: "Zapatoca"
          }
        ]
      },
      {
        name: " Sucre",
        id: 27,
        // material icons icon name
        children: [
          {
            id: "998",
            name: "Buenavista"
          },
          {
            id: "999",
            name: "Caimito"
          },
          {
            id: "1000",
            name: "Chalán"
          },
          {
            id: "1001",
            name: "Colosó"
          },
          {
            id: "1002",
            name: "Corozal"
          },
          {
            id: "1003",
            name: "Coveñas"
          },
          {
            id: "1004",
            name: "El Roble"
          },
          {
            id: "1005",
            name: "Galeras"
          },
          {
            id: "1006",
            name: "Guaranda"
          },
          {
            id: "1007",
            name: "La Unión"
          },
          {
            id: "1008",
            name: "Los Palmitos"
          },
          {
            id: "1009",
            name: "Majagual"
          },
          {
            id: "1010",
            name: "Morroa"
          },
          {
            id: "1011",
            name: "Ovejas"
          },
          {
            id: "1012",
            name: "San Antonio de Palmito"
          },
          {
            id: "1013",
            name: "Sampués"
          },
          {
            id: "1014",
            name: "San Benito Abad"
          },
          {
            id: "1015",
            name: "San Juan de Betulia"
          },
          {
            id: "1016",
            name: "San Marcos"
          },
          {
            id: "1017",
            name: "San Onofre"
          },
          {
            id: "1018",
            name: "San Pedro"
          },
          {
            id: "1019",
            name: "Santiago de Tolú"
          },
          {
            id: "1020",
            name: "Sincé"
          },
          {
            id: "1021",
            name: "Sincelejo"
          },
          {
            id: "1022",
            name: "Sucre"
          },
          {
            id: "1023",
            name: "Tolú Viejo"
          }
        ]
      },
      {
        name: " Tolima",
        id: 28,
        // material icons icon name
        children: [
          {
            id: "1024",
            name: "Alpujarra"
          },
          {
            id: "1025",
            name: "Alvarado"
          },
          {
            id: "1026",
            name: "Ambalema"
          },
          {
            id: "1027",
            name: "Anzoátegui"
          },
          {
            id: "1028",
            name: "Armero"
          },
          {
            id: "1029",
            name: "Ataco"
          },
          {
            id: "1030",
            name: "Cajamarca"
          },
          {
            id: "1031",
            name: "Carmen de Apicalá"
          },
          {
            id: "1032",
            name: "Casabianca"
          },
          {
            id: "1033",
            name: "Chaparral"
          },
          {
            id: "1034",
            name: "Coello"
          },
          {
            id: "1035",
            name: "Coyaima"
          },
          {
            id: "1036",
            name: "Cunday"
          },
          {
            id: "1037",
            name: "Dolores"
          },
          {
            id: "1038",
            name: "Espinal"
          },
          {
            id: "1039",
            name: "Falan"
          },
          {
            id: "1040",
            name: "Flandes"
          },
          {
            id: "1041",
            name: "Fresno"
          },
          {
            id: "1042",
            name: "Guamo"
          },
          {
            id: "1043",
            name: "Herveo"
          },
          {
            id: "1044",
            name: "Honda"
          },
          {
            id: "1045",
            name: "Ibagué"
          },
          {
            id: "1046",
            name: "Icononzo"
          },
          {
            id: "1047",
            name: "Lérida"
          },
          {
            id: "1048",
            name: "Líbano"
          },
          {
            id: "1049",
            name: "Mariquita"
          },
          {
            id: "1050",
            name: "Melgar"
          },
          {
            id: "1051",
            name: "Murillo"
          },
          {
            id: "1052",
            name: "Natagaima"
          },
          {
            id: "1053",
            name: "Ortega"
          },
          {
            id: "1054",
            name: "Palocabildo"
          },
          {
            id: "1055",
            name: "Piedras"
          },
          {
            id: "1056",
            name: "Planadas"
          },
          {
            id: "1057",
            name: "Prado"
          },
          {
            id: "1058",
            name: "Purificación"
          },
          {
            id: "1059",
            name: "Rioblanco"
          },
          {
            id: "1060",
            name: "Roncesvalles"
          },
          {
            id: "1061",
            name: "Rovira"
          },
          {
            id: "1062",
            name: "Saldaña"
          },
          {
            id: "1063",
            name: "San Antonio"
          },
          {
            id: "1064",
            name: "San Luis"
          },
          {
            id: "1065",
            name: "Santa Isabel"
          },
          {
            id: "1066",
            name: "Suárez"
          },
          {
            id: "1067",
            name: "Valle de San Juan"
          },
          {
            id: "1068",
            name: "Venadillo"
          },
          {
            id: "1069",
            name: "Villahermosa"
          },
          {
            id: "1070",
            name: "Villarrica"
          }
        ]
      },
      {
        name: "Valle del Cauca",
        id: 29,
        // material icons icon name
        children: [
          {
            id: "1071",
            name: "Alcalá"
          },
          {
            id: "1072",
            name: "Andalucía"
          },
          {
            id: "1073",
            name: "Ansermanuevo"
          },
          {
            id: "1074",
            name: "Argelia"
          },
          {
            id: "1075",
            name: "Bolívar"
          },
          {
            id: "1076",
            name: "Buenaventura"
          },
          {
            id: "1077",
            name: "Buga"
          },
          {
            id: "1078",
            name: "Bugalagrande"
          },
          {
            id: "1079",
            name: "Caicedonia"
          },
          {
            id: "1080",
            name: "Cali"
          },
          {
            id: "1081",
            name: "Candelaria"
          },
          {
            id: "1082",
            name: "Cartago"
          },
          {
            id: "1083",
            name: "Dagua"
          },
          {
            id: "1084",
            name: "Darién"
          },
          {
            id: "1085",
            name: "El Águila"
          },
          {
            id: "1086",
            name: "El Cairo"
          },
          {
            id: "1087",
            name: "El Cerrito"
          },
          {
            id: "1088",
            name: "El Dovio"
          },
          {
            id: "1089",
            name: "Florida"
          },
          {
            id: "1090",
            name: "Ginebra"
          },
          {
            id: "1091",
            name: "Guacarí"
          },
          {
            id: "1092",
            name: "Jamundí"
          },
          {
            id: "1093",
            name: "La Cumbre"
          },
          {
            id: "1094",
            name: "La Unión"
          },
          {
            id: "1095",
            name: "La Victoria"
          },
          {
            id: "1096",
            name: "Obando"
          },
          {
            id: "1097",
            name: "Palmira"
          },
          {
            id: "1098",
            name: "Pradera"
          },
          {
            id: "1099",
            name: "Restrepo"
          },
          {
            id: "1100",
            name: "Riofrío"
          },
          {
            id: "1101",
            name: "Roldanillo"
          },
          {
            id: "1102",
            name: "San Pedro"
          },
          {
            id: "1103",
            name: "Sevilla"
          },
          {
            id: "1104",
            name: "Toro"
          },
          {
            id: "1105",
            name: "Trujillo"
          },
          {
            id: "1106",
            name: "Tuluá"
          },
          {
            id: "1107",
            name: "Ulloa"
          },
          {
            id: "1108",
            name: "Versalles"
          },
          {
            id: "1109",
            name: "Vijes"
          },
          {
            id: "1110",
            name: "Yotoco"
          },
          {
            id: "1111",
            name: "Yumbo"
          },
          {
            id: "1112",
            name: "Zarzal"
          }
        ]
      },
      {
        name: " Vaupés",
        id: 30,
        // material icons icon name
        children: [
          {
            id: "1113",
            name: "Carurú"
          },
          {
            id: "1114",
            name: "Mitú"
          },
          {
            id: "1115",
            name: "Pacoa"
          },
          {
            id: "1116",
            name: "Papunaua"
          },
          {
            id: "1117",
            name: "Taraira"
          },
          {
            id: "1118",
            name: "Yavaraté"
          }
        ]
      },
      {
        name: " Vichada",
        id: 31,
        // material icons icon name
        children: [
          {
            id: "1119",
            name: "Cumaribo"
          },
          {
            id: "1120",
            name: "La Primavera"
          },
          {
            id: "1121",
            name: "Puerto Carreño"
          },
          {
            id: "1122",
            name: "Santa Rosalía"
          }
        ]
      }
    ];

    return (
      <Container style={{ backgroundColor: "#d2dae2" }}>
        {this.state.isActionButtonVisible ? (
          <View>
            <Header noShadow>
              <Left>
                <Button
                  transparent
                  onPress={() => navigation.dispatch(NavigationActions.back())}
                >
                  <Icon name="arrow-back" size={20} style={{ color: "#fff" }} />
                </Button>
              </Left>
              <Body style={{ flex: 2 }}>
                <Title>{t("columbia_form:title")} </Title>
              </Body>
              <Right />
            </Header>

            <Header style={{ height: 50 }} noShadow>
              <Body>
                <View>
                  <View
                    style={{
                      width: "100%",
                      //backgroundColor:'red',
                      flex: 1,
                      flexDirection: "row",
                      //  justifyContent: "center",
                      //alignItems: "center",
                      justifyContent: "space-between"
                    }}
                  >
                    <View>
                      <TouchableOpacity onPress={this.showstatus}>
                        <View style={{ alignSelf: "center" }}>
                          <Icons
                            name="file-text"
                            size={20}
                            style={{ color: "#fff" }}
                          />
                        </View>

                        <View
                          style={{
                            padding: 5,
                            //  borderColor: "wpforms",
                            borderWidth: 0,
                            borderRadius: 25
                          }}
                        >
                          <Text style={styles.headerText}>Summary</Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View>
                      <View style={{ alignSelf: "center" }}>
                        <Icons
                          name="list"
                          size={20}
                          style={{ color: "#fff" }}
                        />
                      </View>

                      <TouchableOpacity
                        onPress={() => {
                          this.props.navigation.navigate("ViewAll");
                        }}
                      >
                        <View
                          style={{
                            padding: 5,
                            //  borderColor: "wpforms",
                            borderWidth: 0,
                            borderRadius: 25
                          }}
                        >
                          <Text style={styles.headerText}>SavedForm</Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View>
                      <View style={{ alignSelf: "center" }}>
                        <Icons
                          name="plus"
                          size={20}
                          style={{ color: "#fff" }}
                        />
                      </View>

                      <TouchableOpacity onPress={this.add_Survey}>
                        <View
                          style={{
                            padding: 5,
                            //  borderColor: "wpforms",
                            borderWidth: 0,
                            borderRadius: 25
                          }}
                        >
                          <Text style={styles.headerText}>Save Form</Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View>
                      <View style={{ alignSelf: "center" }}>
                        <Icons
                          name="send"
                          size={20}
                          style={{ color: "#fff" }}
                        />
                      </View>

                      <TouchableOpacity onPress={this.formSubmit}>
                        <View
                          style={{
                            padding: 5,
                            //  borderColor: "wpforms",
                            borderWidth: 0,
                            borderRadius: 25
                          }}
                        >
                          <Text style={styles.headerText}>Submit Form</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Body>
            </Header>
          </View>
        ) : null}

        <Header noShadow style={{ height: 35 }}>
          <Left>
            <Text style={{ color: "#fff", fontSize: 12 }}>
              Points :
              {this.state.soiltypePoint +
                this.state.opencutPoint +
                this.state.srwPoint +
                this.state.frwPoint +
                this.state.nosMorethanThreePoint +
                this.state.nos2Point +
                this.state.nos1Point +
                this.state.facadenoPoint +
                this.state.gapPoint +
                this.state.qualityofslabmalaPoint +
                this.state.cantileverPoint +
                this.state.qualityofroofmalaPoint}
            </Text>
          </Left>

          <Right>
            <Text style={{ color: "#fff", fontSize: 12 }}>
              Status:
              {state.soiltypeStatus == 1 ||
              state.opencutStatus != 0 ||
              state.srwhStatus != 0 ||
              this.state.srwStatus != 0 ||
              state.masonryStatus != 0 ||
              state.nosStatus != 0 ||
              state.qosStatus != 0 ||
              this.state.interstoreyStatus != 0 ||
              state.lrwcStatus != 0 ||
              state.qorStatus != 0 ||
              this.state.gapStatus == 1
                ? "Red"
                : state.frwStatus == 2 ||
                  state.gapStatus == 2 ||
                  state.cantileverStatus == 2
                ? "Yellow"
                : "Green"}
            </Text>

            <TouchableOpacity onPress={e => this.calculate()}>
              <View
                style={{
                  borderColor: "transparent",
                  borderWidth: 2,
                  borderRadius: 25,
                  alignSelf: "flex-end"
                }}
              >
                <Icons
                  name="refresh"
                  size={20}
                  style={{ color: "#fff", marginHorizontal: 5 }}
                />
              </View>
            </TouchableOpacity>
          </Right>
        </Header>

        <ScrollView
          scrollEventThrottle={1}
          onContentSizeChange={this._onContentSizeChange}
          onLayout={this._onLayout}
          onScroll={e => {
            this._onScroll(e);
          }}
        >
          <View>
            <Content padder>
              <View style={{ flex: 1 }}>
                <Modal
                  isVisible={this.state.isModalVisibleStatus}
                  style={{ margin: 0 }}
                  propagateSwipe
                >
                  <ScrollView>
                    <Header
                      //   style={{ backgroundColor: "#dc4239" }}
                      // androidStatusBarColor="#dc2015"
                      iosBarStyle="light-content"
                    >
                      <Left>
                        <Button
                          transparent
                          /*onPress={() =>
                this.props.navigation.dispatch(DrawerActions.openDrawer())
              }*/
                        >
                          <Icon name="menu" style={{ color: "#FFF" }} />
                        </Button>
                      </Left>
                      <Body>
                        <Title style={styles.headerText}>
                          {t("home:title")}
                        </Title>
                      </Body>
                      <Right>
                        <TouchableOpacity transparent>
                          <Image
                            source={require("../../../assets/icons/language.png")}
                            style={{ width: 25, height: 25, top: -2 }}
                          />

                          {/**
                           *    <Text style={{ color: "#fff" }}>{this.state.curLang}</Text>
                           */}
                        </TouchableOpacity>
                      </Right>
                    </Header>

                    <View style={{ flex: 1, backgroundColor: "white" }}>
                      <Text
                        style={{
                          //background: "yellow",
                          fontSize: 22,
                          color: "black",

                          fontFamily: "HelveticaNeue-Thin",
                          textAlign: "center",
                          alignSelf: "center",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        Points and Status Summary
                      </Text>

                      <View
                        style={{
                          height: 1,
                          backgroundColor: "#8CC73F",
                          marginVertical: 0
                        }}
                      />

                      <View style={{ flex: 1 }}>
                        <SuperGridSectionList
                          sections={[
                            {
                              data: [
                                {
                                  id: "89",
                                  screen: "colapp",
                                  name: "Total Points",
                                  code: "#fff",
                                  /*   point:
                                      this.state.soiltypePoint +
                                      this.state.opencutPoint +
                                      this.state.srwPoint +
                                      this.state.frwPoint +
                                      this.state.nosMorethanThreePoint +
                                      this.state.nos2Point +
                                      this.state.nos1Point +
                                      this.state.facadenoPoint +
                                      this.state.gapPoint +
                                      this.state.qualityofslabmalaPoint +
                                      this.state.cantileverPoint +
                                      this.state.qualityofroofmalaPoint,*/
                                  point: 0,
                                  icon: "bullhorn",
                                  image: "https://via.placeholder.com/350x150",

                                  imageIcons: require("../../../assets/icons/white/doc.png"),
                                  detail:
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                                },

                                {
                                  id: "2",
                                  screen: "FinancialNavigator",
                                  name: "Overall Status",
                                  point: 0,
                                  /* point:
                                      state.soiltypeStatus == 1 ||
                                      state.opencutStatus != 0 ||
                                      state.srwhStatus != 0 ||
                                      this.state.srwStatus != 0 ||
                                      state.masonryStatus != 0 ||
                                      state.nosStatus != 0 ||
                                      state.qosStatus != 0 ||
                                      this.state.interstoreyStatus != 0 ||
                                      state.lrwcStatus != 0 ||
                                      state.qorStatus != 0 ||
                                      this.state.gapStatus == 1
                                        ? "Red"
                                        : state.soiltypeStatus == 2 ||
                                          state.frwStatus == 2 ||
                                          state.gapStatus == 2 ||
                                          state.cantileverStatus == 2
                                        ? "Yellow"
                                        : "Green",*/

                                  //point:state.mainStatus,

                                  code: "black",
                                  /*
                                      state.soiltypeStatus == 1 ||
                                      state.opencutStatus != 0 ||
                                      state.srwhStatus != 0 ||
                                      this.state.srwStatus != 0 ||
                                      state.masonryStatus != 0 ||
                                      state.nosStatus != 0 ||
                                      state.qosStatus != 0 ||
                                      this.state.interstoreyStatus != 0 ||
                                      state.lrwcStatus != 0 ||
                                      state.qorStatus != 0 ||
                                      this.state.gapStatus == 1
                                        ? "#DC3350"
                                        : state.savedStatus == 2 ||
                                          state.frwStatus == 2 ||
                                          state.gapStatus == 2 ||
                                          state.cantileverStatus == 2
                                        ? "#FB9A11"
                                        : "#008000",*/
                                  // code: this.state.opencutStatus==0?'#008000':this.state.opencutStatus==1?'#DC3350':'#FB9A11',
                                  icon: "shield",
                                  image: "https://via.placeholder.com/350x150",
                                  imageIcons: require("../../../assets/icons/white/doc.png"),
                                  detail:
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                                }
                              ]
                            }
                          ]}
                          style={[
                            styles.gridView1,
                            { borderColor: "transparent" }
                          ]}
                          renderItem={({ item }) => (
                            <TouchableWithoutFeedback onPress={() => null}>
                              <View
                                style={[
                                  styles.itemContainer,
                                  {
                                    //backgroundColor: item.code,

                                    flex: 1,
                                    borderWidth: 1,
                                    borderColor: "#8CC73F"
                                  }
                                ]}
                              >
                                <View style={{ flex: 2 }}>
                                  {/**
                                   *   <Thumbnail   source={item.imageIcons} style={{borderWidth:5,borderColor:'gray',alignSelf:'center'}} />
                                   *
                                   */}

                                  <Text
                                    style={{
                                      color: "black",

                                      //fontWeight: "600",
                                      //  fontFamily: "Circular Std Medium",
                                      textAlign: "center",
                                      fontSize: 18,
                                      fontFamily: "HelveticaNeue-Thin"
                                    }}
                                  >
                                    {item.name}
                                  </Text>
                                </View>

                                <View style={{ flex: 3 }}>
                                  <Text
                                    style={{
                                      color: "gray",
                                      fontSize: 30,
                                      // fontWeight: "600",
                                      // fontFamily: "Circular Std Medium",
                                      textAlign: "center",
                                      fontSize: 20,
                                      fontFamily: "HelveticaNeue-Thin"
                                    }}
                                  >
                                    {item.point}
                                  </Text>
                                </View>
                              </View>
                            </TouchableWithoutFeedback>
                          )}
                          renderSectionHeader={({ section }) => (
                            <Text style={{ color: "green" }}>
                              {section.title}
                            </Text>
                          )}
                        />
                      </View>

                      <View />

                      <View>
                        <Button
                          block
                          light
                          bordered
                          padder
                          style={{
                            //  background:'red',
                            backgroundColor: "#f1f1f1",
                            //backgroundColor:'#f1f1f1',
                            borderColor: "#979797",
                            borderWidth: 2,
                            paddingVertical: 5
                          }}
                          onPress={() => {
                            //this.props.navigation.dispatch(NavigationActions.back())
                            this.setState({
                              isModalVisibleStatus: false
                            });
                          }}
                        >
                          <Text
                            style={{
                              color: "black",
                              fontFamily: "HelveticaNeue-Thin"
                            }}
                          >
                            Back to Form
                          </Text>
                        </Button>
                        <View
                          style={{
                            paddingVertical: 5
                          }}
                        />
                        <Button
                          padder
                          block
                          light
                          bordered
                          padder
                          style={{
                            //backgroundColor:'#f2f2f2',
                            backgroundColor: "#f1f1f1",
                            borderColor: "#979797",
                            borderWidth: 1,
                            paddingVertical: 20
                          }}
                          onPress={() => {
                            // navigate("Home");
                          }}
                        >
                          <Text
                            style={{
                              color: "black",
                              fontFamily: "HelveticaNeue-Thin"
                            }}
                          >
                            Home Page
                          </Text>
                        </Button>

                        <View
                          style={{
                            height: 2,
                            backgroundColor: "#8CC73F",
                            marginVertical: 10
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          //background: "yellow",
                          fontSize: 22,
                          color: "black",

                          fontFamily: "HelveticaNeue-Thin",
                          textAlign: "center",
                          alignSelf: "center",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        Points Breakdown by Item
                      </Text>

                      <View style={{ flex: 1 }}>
                        <SuperGridSectionList
                          style={{ backgroundColor: "#fff" }}
                          itemDimension={width / 3 - 20}
                          sections={[
                            {
                              data: [
                                {
                                  id: "89",
                                  screen: "colapp",
                                  name: "Soil Type",
                                  code:
                                    this.state.soiltypeStatus == 0
                                      ? "#008000"
                                      : this.state.soiltypeStatus == 1
                                      ? "#DC3350"
                                      : "#FB9A11",
                                  point: this.state.soiltypePoint,
                                  icon: "bullhorn",
                                  image: "https://via.placeholder.com/350x150",

                                  imageIcons: require("../../../assets/icons/white/doc.png"),
                                  detail:
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                                },

                                {
                                  id: "2",
                                  screen: "FinancialNavigator",
                                  name: "Open Cut",
                                  point: this.state.opencutPoint,
                                  code:
                                    this.state.opencutStatus == 0
                                      ? "#008000"
                                      : this.state.opencutStatus == 1
                                      ? "#DC3350"
                                      : "#FB9A11",
                                  icon: "shield",
                                  image: "https://via.placeholder.com/350x150",
                                  imageIcons: require("../../../assets/icons/white/doc.png"),
                                  detail:
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                                },
                                {
                                  id: "4",
                                  screen: "SafetyNavigator",
                                  name: "Side Retaining Wall",
                                  point: this.state.srwPoint,
                                  code:
                                    this.state.srwhStatus +
                                      this.state.srwStatus ==
                                    0
                                      ? "#008000"
                                      : this.state.srwhStatus +
                                          this.state.srwStatus ==
                                        1
                                      ? "#DC3350"
                                      : "#FB9A11",

                                  icon: "calculator",
                                  image: "https://via.placeholder.com/350x150",
                                  imageIcons: require("../../../assets/icons/white/safety.png"),
                                  detail:
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                                },

                                {
                                  id: "6",
                                  screen: "StatisticsNavigator",
                                  name: "Foundation Retaining Wall",
                                  point: this.state.frwPoint,
                                  code:
                                    this.state.frwStatus == 0
                                      ? "#008000"
                                      : this.state.frwStatus == 1
                                      ? "#DC3350"
                                      : "#FB9A11",
                                  icon: "bullhorn",
                                  image: "https://via.placeholder.com/350x150",
                                  imageIcons: require("../../../assets/icons/white/statistics.png"),
                                  detail:
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                                },
                                {
                                  id: "7",
                                  screen: "NewsNavigator",
                                  name: "Masonry",
                                  point: "0",
                                  code:
                                    this.state.masonryStatus == 0
                                      ? "#008000"
                                      : this.state.masonryStatus == 1
                                      ? "#DC3350"
                                      : "#FB9A11",
                                  icon: "bullhorn",
                                  image: "https://via.placeholder.com/350x150",
                                  imageIcons: require("../../../assets/icons/white/news.png"),
                                  detail:
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                                },
                                {
                                  id: "8",
                                  screen: "FaqNavigator",
                                  name: "Storeys",
                                  point:
                                    this.state.nosMorethanThreePoint +
                                    this.state.nos2Point +
                                    this.state.nos1Point,

                                  code:
                                    this.state.nosStatus == 0
                                      ? "#008000"
                                      : this.state.nosStatus == 1
                                      ? "#DC3350"
                                      : "#FB9A11",
                                  icon: "bullhorn",
                                  image: "https://via.placeholder.com/350x150",

                                  imageIcons: require("../../../assets/icons/white/faq.png"),
                                  detail:
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. D
backFormPart2.js
Displaying backFormPart2.js.