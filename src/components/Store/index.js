import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../actions";
import StoreDashboard from '../HOC/StoreDashboard';
import StoreDataTable from '../../common/StoreDataTable';
class Store extends Component {
    state = {
        name: '',
        country: '',
        address: '',
        state: '',
        validationMessage: [],
        inValidElments: [],
        actionMode: 'save',
        isoCode: '234',
        id: null,
        states: [{
            "Name": "abia",
            "info": {
              "officialName": "Abia",
              "Governor": "Okezie Ikpeazu",
              "DeputyGovernor": "Ude Okochukwu",
              "Population": 2833999,
              "Slogan": "God's Own State",
              "Capital": "Umuahia",
              "Area": 6320,
              "Latitude": "5°25′N",
              "Longitude": "7°30′E",
              "Number_of_LGAS": 17,
              "Date_created": "1991-08-27T00:00:00.000Z",
              "Website": "abiastate.gov.ng"
            }
          },
          {
            "Name": "adamawa",
            "info": {
              "officialName": "Adamawa",
              "Governor": "Bindo Jibrilla",
              "DeputyGovernor": "Martin Babale",
              "Population": 3737223,
              "Slogan": "Land of Beauty, Sunshine and Hospitality",
              "Capital": "Yola",
              "Area": 36917,
              "Latitude": "9°20′N",
              "Longitude": "12°30′E",
              "Number_of_LGAS": 21,
              "Date_created": "1991-08-27T00:00:00.000Z",
              "Website": "www.adamawastate.gov.ng"
            }
          },
          {
            "Name": "akwaibom",
            "info": {
              "officialName": "Akwa Ibom",
              "Governor": "Udom Gabriel Emmanuel",
              "DeputyGovernor": "Moses Frank Ekpo",
              "Population": 5450758,
              "Slogan": "Land of Promise",
              "Capital": "Uyo",
              "Area": 7081,
              "Latitude": "05°00′N",
              "Longitude": "07°50′E",
              "Number_of_LGAS": 31,
              "Date_created": "1987-09-23T00:00:00.000Z",
              "Website": "akwaibomstate.gov.ng"
            }
          },
          {
            "Name": "anambra",
            "info": {
              "officialName": "Anambra",
              "Governor": "Willie Obiano",
              "DeputyGovernor": "Nkem Okeke",
              "Population": 4055048,
              "Slogan": "Light of the nation",
              "Capital": "Awka",
              "Area": 4844,
              "Latitude": "6°20′N",
              "Longitude": "7°00′E",
              "Number_of_LGAS": 21,
              "Date_created": "1991-08-26T00:00:00.000Z",
              "Website": "anambrastate.gov.ng"
            }
          },
          {
            "Name": "bauchi",
            "info": {
              "officialName": "Bauchi",
              "Governor": "Mohammed Abdullahi Abubakar",
              "DeputyGovernor": "Nuhu Gidado",
              "Population": 4653066,
              "Slogan": "Pearl of Tourism",
              "Capital": "Bauchi",
              "Area": 49119,
              "Latitude": "10°30′N",
              "Longitude": "10°00′E",
              "Number_of_LGAS": 20,
              "Date_created": "1976-02-03T00:00:00.000Z",
              "Website": "www.bauchistate.gov.ng"
            }
          },
          {
            "Name": "bayelsa",
            "info": {
              "officialName": "Bayelsa",
              "Governor": "Henry Dickson",
              "DeputyGovernor": "Gboribiogha John Jonah",
              "Population": 1998349,
              "Slogan": "Glory of all lands",
              "Capital": "Yenagoa",
              "Area": 21110,
              "Latitude": "4°45′N",
              "Longitude": "6°05′E",
              "Number_of_LGAS": 8,
              "Date_created": "1996-10-01T00:00:00.000Z",
              "Website": "www.bayelsa.gov.ng"
            }
          },
          {
            "Name": "benue",
            "info": {
              "officialName": "Benue",
              "Governor": "Samuel Ortom",
              "DeputyGovernor": "Benson Abounu",
              "Population": 4253641,
              "Slogan": "Food Basket of the Nation",
              "Capital": "Makurdi",
              "Area": 34059,
              "Latitude": "7°20′N",
              "Longitude": "8°45′E",
              "Number_of_LGAS": 23,
              "Date_created": "1976-02-03T00:00:00.000Z",
              "Website": "www.benuestate.gov.ng"
            }
          },
          {
            "Name": "borno",
            "info": {
              "officialName": "Borno",
              "Governor": "Kashim Shettima",
              "DeputyGovernor": "Usman Mamman Durkwa",
              "Population": 5925668,
              "Slogan": "Home of Peace",
              "Capital": "Maiduguri",
              "Area": 57799,
              "Latitude": "11°30′N",
              "Longitude": "13°00′E",
              "Number_of_LGAS": 27,
              "Date_created": "1976-02-03T00:00:00.000Z",
              "Website": "www.bornostate.gov.ng"
            }
          },
          {
            "Name": "crossriver",
            "info": {
              "officialName": "Cross River",
              "Governor": "Benedict Ayade",
              "DeputyGovernor": "Ivara Esu",
              "Population": 3737517,
              "Slogan": "The People's Paradise",
              "Capital": "Calabar",
              "Area": 20156,
              "Latitude": "5°45′N",
              "Longitude": "8°30′E",
              "Number_of_LGAS": 18,
              "Date_created": "1967-05-26T23:00:00.000Z",
              "Website": "www.crossriverstate.gov.ng"
            }
          },
          {
            "Name": "delta",
            "info": {
              "officialName": "Delta",
              "Governor": "Arthur Okowa Ifeanyi",
              "DeputyGovernor": "Kingsley Otuaro",
              "Population": 4098391,
              "Slogan": "The Big Heart of the Nation",
              "Capital": "Asaba",
              "Area": 17698,
              "Latitude": "5°30′N",
              "Longitude": "6°00′E",
              "Number_of_LGAS": 25,
              "Date_created": "1991-08-26T23:00:00.000Z",
              "Website": "www.deltastate.gov.ng"
            }
          },
          {
            "Name": "ebonyi",
            "info": {
              "officialName": "Ebonyi",
              "Governor": "Dave Umahi",
              "DeputyGovernor": "Eric Kelechi Igwe",
              "Population": 1739136,
              "Slogan": "Salt of the Nation",
              "Capital": "Abakaliki",
              "Area": 5533,
              "Latitude": "6°15′N",
              "Longitude": "8°05′E",
              "Number_of_LGAS": 13,
              "Date_created": "1996-10-01T00:00:00.000Z",
              "Website": "www.ebonyistate.gov.ng"
            }
          },
          {
            "Name": "edo",
            "info": {
              "officialName": "Edo",
              "Governor": "Godwin Obaseki",
              "DeputyGovernor": "Philip Shuaibu",
              "Population": 3218332,
              "Slogan": "The Heartbeat of the Nation",
              "Capital": "Benin City",
              "Area": 17802,
              "Latitude": "6°30′N",
              "Longitude": "6°00′E",
              "Number_of_LGAS": 18,
              "Date_created": "1991-08-26T23:00:00.000Z",
              "Website": "edostate.gov.ng"
            }
          },
          {
            "Name": "ekiti",
            "info": {
              "officialName": "Ekiti",
              "Governor": "Ayo Fayose",
              "DeputyGovernor": "Kolapo Olubunmi Olusola",
              "Population": 2737186,
              "Slogan": "Land of Honour",
              "Capital": "Ado Ekiti",
              "Area": 6353,
              "Latitude": "7°40′N",
              "Longitude": " 5°15′E",
              "Number_of_LGAS": 16,
              "Date_created": "1996-09-30T23:00:00.000Z",
              "Website": "www.ekitistate.gov.ng"
            }
          },
          {
            "Name": "enugu",
            "info": {
              "officialName": "Enugu",
              "Governor": "Ifeanyi Ugwuanyi",
              "DeputyGovernor": "Cecilia Ezeilo",
              "Population": 3267837,
              "Slogan": "Coal city state",
              "Capital": "Enugu",
              "Area": 7161,
              "Latitude": "6°30′N",
              "Longitude": "7°30′E",
              "Number_of_LGAS": 17,
              "Date_created": "1991-08-26T23:00:00.000Z",
              "Website": "enugustate.gov.ng"
            }
          },
          {
            "Name": "gombe",
            "info": {
              "officialName": "Gombe",
              "Governor": "Ibrahim Hassan Dankwambo",
              "DeputyGovernor": "Charles Iliya",
              "Population": 2353000,
              "Slogan": "Jewel in the Savannah",
              "Capital": "Gombe",
              "Area": 18768,
              "Latitude": "10°15′N",
              "Longitude": "11°10′E",
              "Number_of_LGAS": 11,
              "Date_created": "1996-09-30T23:00:00.000Z",
              "Website": "www.gombestate.gov.ng"
            }
          },
          {
            "Name": "imo",
            "info": {
              "officialName": "Imo",
              "Governor": "Rochas Anayo Okorocha",
              "DeputyGovernor": "Prince Eze Madumere",
              "Population": 3934899,
              "Slogan": "The Eastern Heartland",
              "Capital": "Owerri",
              "Area": 5530,
              "Latitude": "5°29′N",
              "Longitude": " 7°2′E",
              "Number_of_LGAS": 27,
              "Date_created": "1976-02-03T00:00:00.000Z",
              "Website": "www.imostate.gov.ng"
            }
          },
          {
            "Name": "jigawa",
            "info": {
              "officialName": "Jigawa",
              "Governor": "Badaru Abubakar",
              "DeputyGovernor": "Ibrahim Hassan Hadejia",
              "Population": 4988888,
              "Slogan": "The New World",
              "Capital": "Dutse",
              "Area": 23154,
              "Latitude": "12°00′N",
              "Longitude": "9°45′E",
              "Number_of_LGAS": 27,
              "Date_created": "1991-08-26T23:00:00.000Z",
              "Website": "jigawastate.gov.ng"
            }
          },
          {
            "Name": "kaduna",
            "info": {
              "officialName": "Kaduna",
              "Governor": "Nasir Ahmad el-Rufai ",
              "DeputyGovernor": "Bala Bantex",
              "Population": 6066562,
              "Slogan": "Centre of Learning",
              "Capital": "Kaduna",
              "Area": 46053,
              "Latitude": "10°20′N",
              "Longitude": "7°45′E",
              "Number_of_LGAS": 23,
              "Date_created": "1967-05-26T23:00:00.000Z",
              "Website": "www.kadunastate.gov.ng"
            }
          },
          {
            "Name": "kano",
            "info": {
              "officialName": "Kano",
              "Governor": "Abdullahi Umar Ganduje",
              "DeputyGovernor": "Hafiz Abubakar",
              "Population": 9383682,
              "Slogan": "Centre of Commerce",
              "Capital": "Kano",
              "Area": 20131,
              "Latitude": "11°30′N",
              "Longitude": "8°30′E",
              "Number_of_LGAS": 44,
              "Date_created": "1967-05-26T23:00:00.000Z",
              "Website": "kano.gov.ng"
            }
          },
          {
            "Name": "katsina",
            "info": {
              "officialName": "Katsina",
              "Governor": "Aminu Bello Masari",
              "DeputyGovernor": "Mannir Yakubu",
              "Population": 6483429,
              "Slogan": "Home of Hospitality",
              "Capital": "Katsina",
              "Area": 24192,
              "Latitude": "12°15′N",
              "Longitude": "7°30′E",
              "Number_of_LGAS": 34,
              "Date_created": "1987-09-23T00:00:00.000Z",
              "Website": "www.katsinastate.gov.ng"
            }
          },
          {
            "Name": "kebbi",
            "info": {
              "officialName": "Kebbi",
              "Governor": "Abubakar Atiku Bagudu",
              "DeputyGovernor": "Samaila Yombe Dabai",
              "Population": 3630931,
              "Slogan": "Land of Equity",
              "Capital": "Birnin Kebbi",
              "Area": 36800,
              "Latitude": "11°30′N",
              "Longitude": "4°00′E",
              "Number_of_LGAS": 21,
              "Date_created": "1991-08-26T23:00:00.000Z",
              "Website": "services.gov.ng/kebbi"
            }
          },
          {
            "Name": "kogi",
            "info": {
              "officialName": "Kogi",
              "Governor": "Yahaya Bello ",
              "DeputyGovernor": "Simon Achuba",
              "Population": 3595796,
              "Slogan": "The Confluence State",
              "Capital": "Lokoja",
              "Area": 29833,
              "Latitude": "7°30′N",
              "Longitude": "6°42′E",
              "Number_of_LGAS": 21,
              "Date_created": "1991-08-26T23:00:00.000Z",
              "Website": "www.kogistate.gov.ng"
            }
          },
          {
            "Name": "kwara",
            "info": {
              "officialName": "Kwara",
              "Governor": "Abdulfatah Ahmed",
              "DeputyGovernor": "Peter Kisira",
              "Population": 2591555,
              "Slogan": "State of Harmony",
              "Capital": "Ilorin",
              "Area": 36825,
              "Latitude": "8°30′N",
              "Longitude": "5°00′E",
              "Number_of_LGAS": 16,
              "Date_created": "1967-05-26T23:00:00.000Z",
              "Website": "kwarastate.gov.ng"
            }
          },
          {
            "Name": "lagos",
            "info": {
              "officialName": "Lagos",
              "Governor": "Akinwunmi Ambode",
              "DeputyGovernor": "Oluranti Adebule",
              "Population": 17552940,
              "Slogan": "Centre Of Excellence",
              "Capital": "Ikeja",
              "Area": 3577,
              "Latitude": "6°35′N",
              "Longitude": "3°45′E",
              "Number_of_LGAS": 20,
              "Date_created": "1967-05-26T23:00:00.000Z",
              "Website": "lagosstate.gov.ng"
            }
          },
          {
            "Name": "nasarawa",
            "info": {
              "officialName": "Nasarawa",
              "Governor": "Umaru Tanko Al-Makura",
              "DeputyGovernor": "Silas Ali Agara",
              "Population": 2040112,
              "Slogan": "Home of Solid Minerals",
              "Capital": "Lafia",
              "Area": 27117,
              "Latitude": "8°32′N",
              "Longitude": "8°18′E",
              "Number_of_LGAS": 13,
              "Date_created": "1996-09-30T23:00:00.000Z",
              "Website": "www.nasarawastate.gov.ng"
            }
          },
          {
            "Name": "niger",
            "info": {
              "officialName": "Niger",
              "Governor": "Abubakar Sani Bello",
              "DeputyGovernor": "Ahmed Muhammad Ketso",
              "Population": 3950249,
              "Slogan": "The Power State",
              "Capital": "Minna",
              "Area": 76363,
              "Latitude": "10°00′N",
              "Longitude": "6°00′E",
              "Number_of_LGAS": 25,
              "Date_created": "1996-09-30T23:00:00.000Z",
              "Website": "www.nigerstate.gov.ng"
            }
          },
          {
            "Name": "ogun",
            "info": {
              "officialName": "Ogun",
              "Governor": "Ibikunle Amosun",
              "DeputyGovernor": "Yetunde Onanuga",
              "Population": 3751140,
              "Slogan": "Gateway State",
              "Capital": "Abeokuta",
              "Area": 16980.55,
              "Latitude": "7°00′N",
              "Longitude": "3°35′E",
              "Number_of_LGAS": 20,
              "Date_created": "1976-02-02T23:00:00.000Z",
              "Website": "www.ogunstate.gov.ng"
            }
          },
          {
            "Name": "ondo",
            "info": {
              "officialName": "Ondo",
              "Governor": "Oluwarotimi Odunayo Akeredolu",
              "DeputyGovernor": "Agboola Ajayi",
              "Population": 3440000,
              "Slogan": "Sunshine State",
              "Capital": "Akure",
              "Area": 15500,
              "Latitude": "7°10′N",
              "Longitude": " 5°05′E",
              "Number_of_LGAS": 18,
              "Date_created": "1976-02-02T23:00:00.000Z",
              "Website": "www.ondostate.gov.ng"
            }
          },
          {
            "Name": "osun",
            "info": {
              "officialName": "Osun",
              "Governor": "Rauf Aregbesola",
              "DeputyGovernor": "Grace Titilayo Laoye-Tomori",
              "Population": 4137627,
              "Slogan": "Land of Virtue",
              "Capital": "Osogbo",
              "Area": 9251,
              "Latitude": "7°30′N",
              "Longitude": "4°30′E",
              "Number_of_LGAS": 30,
              "Date_created": "1991-08-26T23:00:00.000Z",
              "Website": "osun.gov.ng"
            }
          },
          {
            "Name": "oyo",
            "info": {
              "officialName": "Oyo",
              "Governor": "Isiaka Abiola Ajimobi",
              "DeputyGovernor": "Moses Alake Adeyemo",
              "Population": 6617720,
              "Slogan": "Pace Setter State",
              "Capital": "Ibadan",
              "Area": 28454,
              "Latitude": "8°00′N",
              "Longitude": "4°00′E",
              "Number_of_LGAS": 33,
              "Date_created": "1976-02-02T23:00:00.000Z",
              "Website": "oyostate.gov.ng"
            }
          },
          {
            "Name": "plateau",
            "info": {
              "officialName": "Plateau",
              "Governor": "Simon Lalong",
              "DeputyGovernor": "Sonni Gwanle Tyoden",
              "Population": 3178712,
              "Slogan": "Home of Peace and Tourism",
              "Capital": "Jos",
              "Area": 30913,
              "Latitude": "9°10′N",
              "Longitude": "9°45′E",
              "Number_of_LGAS": 17,
              "Date_created": "1976-02-02T23:00:00.000Z",
              "Website": "plateaustate.gov.ng"
            }
          },
          {
            "Name": "rivers",
            "info": {
              "officialName": "Rivers",
              "Governor": "Ezenwo Nyesom Wike",
              "DeputyGovernor": "Ipalibo Banigo",
              "Population": 5185400,
              "Slogan": "Treasure Base of the Nation",
              "Capital": "Port Harcourt",
              "Area": 11077,
              "Latitude": "4°45′N",
              "Longitude": "6°50′E",
              "Number_of_LGAS": 23,
              "Date_created": "1967-05-26T23:00:00.000Z",
              "Website": "riversstate.gov.ng"
            }
          },
          {
            "Name": "sokoto",
            "info": {
              "officialName": "Sokoto",
              "Governor": "Aminu Waziri Tambuwal",
              "DeputyGovernor": "Ahmad Aliyu",
              "Population": 4392391,
              "Slogan": "Seat of the Caliphate",
              "Capital": "Sokoto",
              "Area": 25973,
              "Latitude": "13°05′N",
              "Longitude": "05°15′E",
              "Number_of_LGAS": 23,
              "Date_created": "1976-02-02T23:00:00.000Z",
              "Website": "services.gov.ng/sokoto"
            }
          },
          {
            "Name": "taraba",
            "info": {
              "officialName": "Taraba",
              "Governor": "Darius Ishaku",
              "DeputyGovernor": "Haruna Manu",
              "Population": 2688944,
              "Slogan": "Nature's Gift to the Nation",
              "Capital": "Jalingo",
              "Area": 54473,
              "Latitude": "8°00′N",
              "Longitude": "10°30′E",
              "Number_of_LGAS": 16,
              "Date_created": "1991-08-26T23:00:00.000Z",
              "Website": "services.gov.ng/taraba"
            }
          },
          {
            "Name": "yobe",
            "info": {
              "officialName": "Yobe",
              "Governor": "Ibrahim Geidam",
              "DeputyGovernor": "Abubakar Ali",
              "Population": 2757000,
              "Slogan": "Pride of the Sahel",
              "Capital": "Damaturu",
              "Area": 45502,
              "Latitude": "12°00′N",
              "Longitude": "11°30′E",
              "Number_of_LGAS": 17,
              "Date_created": "1991-08-26T23:00:00.000Z",
              "Website": "yobestate.gov.ng"
            }
          },
          {
            "Name": "zamfara",
            "info": {
              "officialName": "Zamfara",
              "Governor": "Abdul-Aziz Yari Abubakar",
              "DeputyGovernor": "Ibrahim Wakkala",
              "Population": 3838160,
              "Slogan": "Farming is Our Pride",
              "Capital": "Gusau",
              "Area": 39762,
              "Latitude": "12°10′N",
              "Longitude": "6°15′E",
              "Number_of_LGAS": 14,
              "Date_created": "1996-09-30T23:00:00.000Z",
              "Website": "services.gov.ng/zamfara"
            }
          }]
    }
    autoComplete = null;
    constructor(props){
      super(props)
      this.autoCompleteRef = React.createRef()
    }
    componentDidMount(){
        this.props.setActiveLink('Manage Store')
        this.props.initiateRegistration()
        this.props.getStores()
        
        this.handleScriptLoad()
    }
    handleScriptLoad = () => {
      this.autoComplete = new window.google.maps.places.Autocomplete(
        this.autoCompleteRef.current,
        {  componentRestrictions: { country: "NG" } }
      );
      this.autoComplete.setFields(["address_components", "formatted_address"]);
      this.autoComplete.addListener("place_changed", () =>
        this.handlePlaceSelect()
      );
    }
    
      handlePlaceSelect= async () => {
      const addressObject = this.autoComplete.getPlace();
      const query = addressObject.formatted_address;
      console.log('query: ',query)
      this.setState({address: query })
      console.log(addressObject);
    }
    static getDerivedStateFromProps(nextProps, state){
        if(nextProps.resetForm){
            return {...state, name: '', state: '', country: '', address: '', actionMode:'save'}
        }
        return null
    }
    _handleRowClick = (id) => {
        const store = this.props.stores.find(store => store.id === id)
        const {name, address, country, state} = store
        this.setState({
            name,
            address,
            country,
            state,
            actionMode: 'edit',
            id
        })
    }
    validateFormData = (formdata) => {
        const { name, state, country, address} = formdata;
        let isValid = true;
        const inValidElments = []
        const validationMessage = {}
        if(!(name && name.trim() !== '')){
            isValid = false
            inValidElments.push('name')
            
            validationMessage['name'] = 'Store name is required'
        }
        if(!(state && state.trim() !== '')){
            isValid = false;
            inValidElments.push('state')
            validationMessage['state'] = 'Please select state'
        }
        if(!(country && country.trim() !== '')){
            isValid = false;
            inValidElments.push('country')
            validationMessage['country'] = 'Please select country'
        }
        if(!(address && address.trim() !== '')){
            isValid = false;
            inValidElments.push('address')
            validationMessage['address'] = 'Address is required'
        }
        return {
            isValid,
            validationMessage,
            inValidElments,
            formdata
        }
    }
    handleInputChange = e => {
        const {target:{ name, value}} = e
        const index = this.state.inValidElments.indexOf(name)
        let newInvalidElements = []
        if(index !== -1){
            this.state.inValidElments.splice(index, 1)
        }
        newInvalidElements = [...this.state.inValidElments]
        this.setState({
            [name]: value,
            newInvalidElements
        })
    }
    processForm = async (actionType = 'save') => {
        const {isValid, inValidElments, validationMessage} = this.validateFormData(this.state)
        if(!isValid){
            this.props.renderError('Action cannot be performed,one or more fields required', { appearance: 'error' })
        
            return this.setState({
                inValidElments, validationMessage
            })
            
        }

        this.props.initiateRegistration()
        switch(actionType){
            case 'save':
                await this.props.createStore(this.state, 0, 100)
                break;
            case 'update':
                await this.props.updateStore(this.state);
                break
            case 'delete':
                await this.props.deleteStore(this.state.id)
                break;
              default:
              break;
            
        }

        // this.props.initiateRegistration()
        // this.props.getStores()
        
    }
    handleFormSubmit = e => {
        e.preventDefault()
        this.processForm()
    }
    handleFormDelete = e => {
        e.preventDefault()
        this.processForm('delete')
    }
    handleFormUpdate = e => {
        e.preventDefault();
        this.processForm('update')
    }
    render() {
        return (
                <StoreDashboard>
                <h2>Manage Store</h2>
                <div className="add-bank">
                    {/* <h4 className="popup-title verify-email" style={{
                            fontWeight: 'normal',
                            fontFamily: 'Roboto, sans-serif',
                            marginLeft: 20
                        }}>Add Store</h4>
                    <hr className="line-separator" /> */}
                    <form>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-4 col-sm-12">
                                        <label htmlFor="name" className="rl-label">Store Name</label>
                                            <input type="text" name='name' className={`${this.state.inValidElments.includes('name') ? 'invalid' : '' }`}  
                                                value={this.state.name} onChange={this.handleInputChange} placeholder="Store Name"
                                            />
                                        {
                                                this.state.inValidElments.includes('name') ?
                                                (
                                                    <div className="error-message required">
                                                        {this.state.validationMessage['name']}
                                                    </div>
                                                ): null 
                                        }
                                    </div>
                                    <div className="col-md-4 col-sm-12">
                                        <label htmlFor="address" className="rl-label">Store Address</label>
                                        <input type="text" id="password5" 
                                            className={`${this.state.inValidElments.includes('address') ? 'invalid' : '' }`} 
                                            
                                            ref={this.autoCompleteRef}
                                            onChange={event => this.setState({address: event.target.value})}
                                            
                                            value={this.state.address}
                                            name="address" placeholder="Store Address" />
                                        {
                                                this.state.inValidElments.includes('address') ?
                                                (
                                                    <div className="error-message required">
                                                        {this.state.validationMessage['address']}
                                                    </div>
                                                ): null 
                                        }
                                    </div>
                                    <div className="col-md-4 col-sm-12">
                                        <label htmlFor="state" className="rl-label">State</label>
                                         <select name="state" 
                                                className={`${this.state.inValidElments.includes('state') ? 'invalid' : '' }`}
                                                value={this.state.state} onChange={this.handleInputChange}>
                                                <option value="">Select State</option>
                                               {
                                                   this.state.states.map(ele =>  <option value={`${ele.info.officialName}`}>{ele.info.officialName}</option>)
                                               }
                                                
                                            </select>
                                        {
                                                this.state.inValidElments.includes('state') ?
                                                (
                                                    <div className="error-message required">
                                                        {this.state.validationMessage['state']}
                                                    </div>
                                                ): null 
                                        }
                                    </div>
                                   
                                </div>
                                <div className="row mt-1">
                                <div className="col-md-4 col-sm-12">
                                        <label htmlFor="country" className="rl-label">Country</label>
                                        <select name="country" 
                                                className={`${this.state.inValidElments.includes('country') ? 'invalid' : '' }`}
                                                value={this.state.country} onChange={this.handleInputChange}>
                                                <option value="">Select Country</option>
                                                <option value="Nigeria">Nigeria</option>
                                                
                                            </select>
                                        {
                                                this.state.inValidElments.includes('country') ?
                                                (
                                                    <div className="error-message required">
                                                        {this.state.validationMessage['country']}
                                                    </div>
                                                ): null 
                                        }
                                        
                                    </div>
                                   
                                   </div>
                                <div style={{padding: '20px 0 10px'}}>
                                    {
                                        this.state.actionMode === 'save' ? (
                                            <div className="row">
                                                <div className="col-md-8 col-sm-12"></div>
                                                <div className="col-md-4 col-sm-12">
                                                    <button onClick={this.handleFormSubmit} className="btn btn-primary btn-lg" style={{margin:'0 auto'}}>Save</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="row mt-3">
                                                <div className="col-md-8 col-sm-12"></div>
                                                <div className="col-md-4 col-sm-12">
                                                    <div style={{marginBottom: 10}}>
                                                        <button onClick={this.handleFormUpdate} className="btn btn-warning btn-lg" 
                                                        style={{margin:'0 auto',borderColor:'#ffc107',
                                                         background: '#ffc107', width:'100%'}}>Update</button>
                                                    </div>
                                                    <div style={{marginBottom: 10}}>
                                                        <button onClick={this.handleFormDelete} className="btn btn-danger btn-lg" 
                                                        style={{margin:'0 auto', width:'100%'}}>Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    
                                </div>
                            </div>
                        
                        </form>
                    <div>
                    <div className="container">
                        <h4 className="popup-title verify-email" style={{
                                    fontWeight: 'normal',
                                    fontFamily: 'Roboto, sans-serif',
                                    marginLeft: 20,
                                    marginTop: 30,
                                    marginBottom: 10
                                }}>Stores</h4>
                         <hr className="line-separator" />
                            <StoreDataTable
                                data={this.props.stores}
                            />
                    </div>
                        
                        
                    </div>
                </div>
                </StoreDashboard>
            
        );
    }
}
const mapStateToProps = state => {
    const {store: {stores, resetForm, pageNumber, lastId}, home: {
        subCategories, categories
    }} = state;
    return {
        stores,
        resetForm,
        pageNumber,
        lastId,
        subCategories,
        categories
    }
}

export default connect(mapStateToProps, actions)(Store);