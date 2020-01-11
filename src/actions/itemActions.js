import {
    ERROR_FETCHING_ITEMS, ITEMS_FETCHED_SUCCESSFULLY,
    STOP_LOADING, SUCCESS_ALERT, ITEM_CHANGE_ACTION,
    DISPLAY_ERROR, EDIT_ITEM, INIT_FORM, CART_FETCHED_SUCCESSFULLY,
    PRODUCTS_FETCED_SUCCESSFULLY, CATEGORY_FETCHED_SUCCESSFULLY, ADD_CART_SUCCESSFULLY,
    INITIAL_REGISTRATION, INVALIDE_FORM_DATA, SET_ITEM_IMAGE,
    INVALID_ITEM_FORM_DATA, CLEAR_ITEM_FORM_INPUTS, STORE_ITEM_EDIT, HANDLE_PREFERNCE_CHANGE
} from "./types";
import { fileUpload } from "../components/util/FileUploader";
import async from 'async';
import axios from 'axios';

export const _initUploadPage = () => {
    return (dispatch) => {
        async.parallel({
            categories: function (callback) {
                axios.get('/api/v1/category/get-categories/0/0')
                    .then(response => {
                        const { data: { categories } } = response;
                        callback(null, categories)
                    })
                    .catch(error => {
                        callback(error, null)
                    })

            },
            subCategories: function (callback) {
                axios.get('/api/v1/sub-category/get-sub-categories/0/0')
                    .then(response => {
                        const { data: { subCategories } } = response;
                        callback(null, subCategories)
                    })
                    .catch(error => {
                        callback(error, null)
                    })

            },
            stores: function (callback) {
                axios.get('/api/v1/seller/store/get-stores/0/100', {
                    headers: {
                        'x-access-token': localStorage.getItem('x-access-token')
                    }
                })
                    .then(response => {
                        const { data: { stores } } = response;
                        callback(null, stores)
                    })
                    .catch(error => {
                        callback(error, null)
                    })
            }
        }, function (err, results) {
            if (err) {
                dispatch({ type: ERROR_FETCHING_ITEMS, payload: '' })
                return dispatch({ type: STOP_LOADING, payload: '' })
            }
            dispatch({ type: STOP_LOADING, payload: '' })
            return dispatch({ type: ITEMS_FETCHED_SUCCESSFULLY, payload: results })
        })
    }
}

export const createItem = (data) => {
    return async (dispatch) => {
        try {
            let response = null
            const mainImageResponse = await fileUpload(data.files[data.mainImageIndex], 'storeItems')
            const mainImageUrl = mainImageResponse.Location;
            let otherImages = []
            for (let i = 0; i < data.files.length; i++) {
                if (i === data.mainImageIndex) {
                    continue
                }
                response = await fileUpload(data.files[i], 'storeItems')
                otherImages.push(response.Location)
            }
            console.log('main response', mainImageUrl)
            let otherImageUrl1 = otherImages.length > 0 ? otherImages[0] : ''
            let otherImageUrl2 = otherImages.length > 1 ? otherImages[1] : ''
            let otherImageUrl3 = otherImages.length > 2 ? otherImages[2] : ''
            let otherImageUrl4 = otherImages.length > 3 ? otherImages[3] : ''
            const { filteredSubCategory, files, previewImage, subImages,
                validationMessage, inValidElments, ...rest } = data;
            console.log({
                ...rest, mainImageUrl, otherImageUrl1, otherImageUrl2, otherImageUrl3,
                otherImageUrl4
            })
            response = await axios.post('/api/v1/seller/product/create', {
                ...rest, mainImageUrl, otherImageUrl1, otherImageUrl2, otherImageUrl3,
                otherImageUrl4
            }, {
                headers: {
                    'x-access-token': localStorage.getItem('x-access-token')
                }
            })
            dispatch({ type: SUCCESS_ALERT, payload: 'Item created successfully' })
            dispatch({ type: CLEAR_ITEM_FORM_INPUTS, payload: '' })
            dispatch({ type: STOP_LOADING, payload: '' })
        } catch (error) {
            console.log(error)
            console.log(error.response)
            if (error.response) {
                dispatch({ type: DISPLAY_ERROR, payload: error.response.data.message.substr(0, 50) })
                return dispatch({ type: STOP_LOADING, payload: '' })
            }
            dispatch({ type: DISPLAY_ERROR, payload: 'Some errors were encountered' })
            dispatch({ type: STOP_LOADING, payload: '' })
        }
    }
}

export const _itemClick = id => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/api/v1/seller/product/get/${id}`, {
                headers: {
                    'x-access-token': localStorage.getItem('x-access-token')
                }
            })

            const { data: { product } } = response;

            dispatch({ type: EDIT_ITEM, payload: product })
            dispatch({ type: STOP_LOADING, payload: '' })
        } catch (error) {
            console.log(error.response)
            dispatch({ type: DISPLAY_ERROR, payload: error.response.data.message.substr(0, 100) })
            dispatch({ type: STOP_LOADING, payload: '' })
        }
    }
}

export const fetchItems = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/api/v1/seller/product/get-products/${0}/${100}`, {
                headers: {
                    'x-access-token': localStorage.getItem('x-access-token')
                }
            })
            const { data: { products } } = response;
            dispatch({ type: PRODUCTS_FETCED_SUCCESSFULLY, payload: products })
            dispatch({ type: STOP_LOADING, payload: '' })
        } catch (error) {
            dispatch({ type: DISPLAY_ERROR, payload: error.response.data.message.substr(0, 100) })
            dispatch({ type: STOP_LOADING, payload: '' })
        }
    }
}

export const fetchFeaturedItems = () => {

    return async (dispatch) => {
        try {
            const response = await axios.get(`/api/v1/user/product/get-featured-products/${0}/${20}`, {
                headers: {
                    'x-access-token': localStorage.getItem('x-access-token')
                }
            })
            const { data: { products } } = response;
            console.log("got here", products)
            dispatch({ type: PRODUCTS_FETCED_SUCCESSFULLY, payload: products })
            dispatch({ type: STOP_LOADING, payload: '' })
        } catch (error) {
            dispatch({ type: DISPLAY_ERROR, payload: error.response.data.message })
            dispatch({ type: STOP_LOADING, payload: '' })
        }
    }
}

export const fetchSearchCategory = () => {

    return async (dispatch) => {
        try {
            const response = await axios.get(`/api/v1/category/get-categories/${0}/${20}`, {
                headers: {
                    'x-access-token': localStorage.getItem('x-access-token')
                }
            })
            const { data: { categories } } = response;
            dispatch({ type: CATEGORY_FETCHED_SUCCESSFULLY, payload: categories })
            dispatch({ type: STOP_LOADING, payload: '' })
        } catch (error) {
            dispatch({ type: DISPLAY_ERROR, payload: error.response.data.message })
            dispatch({ type: STOP_LOADING, payload: '' })
        }
    }
}

export const fetchCart = () => {

    return async (dispatch) => {     
        try {
            const response = await axios.get(`/api/v1/user/cart/get`, {
                headers: {
                    'x-access-token': localStorage.getItem('x-access-token')
                }
            })
            
            const {  products, quantity } = response.data.cart;
            console.log("remas",products,quantity)
            dispatch({ type: CATEGORY_FETCHED_SUCCESSFULLY, payload: products })
            dispatch({ type: STOP_LOADING, payload: '' })
        } catch (error) {
            dispatch({ type: DISPLAY_ERROR, payload: error.response.data.message })
            dispatch({ type: STOP_LOADING, payload: '' })
        }
    }
}

export const addToCart = (details) => {
     
    return async (dispatch) => {
        try{
            console.log("zlat", details)
            const response = await axios.post('/api/v1/user/cart/add', 
                                {productId:details.productId, quantity:details.quanity}, {
                                    headers:{
                                'x-access-token': localStorage.getItem('x-access-token')
                            }})
                             console.log("zlatres", response)
            if(response.data.success){
                const accounts = 'await getUserAccount()'
                dispatch({type: STOP_LOADING, payload: ''})
                dispatch({type: SUCCESS_ALERT, payload:"Item added to cart successfully"})
                dispatch({type: ADD_CART_SUCCESSFULLY, payload: response})
                
            }
        }catch(error){
            console.log(error.response)
            if(error.response.data.message)
            console.log(error)
                return dispatch({type: DISPLAY_ERROR, payload: error.response.data.message.substr(0, 100) })
            
            return dispatch({type: DISPLAY_ERROR, payload: error.response.data.substr(0, 100) })
        }
    }
}

export const initForm = () => {
    return { type: INIT_FORM, payload: '' }
}

export const handleItemChangeAction = e => {
    return { type: ITEM_CHANGE_ACTION, payload: e }
}

export const validatePrice = field => {
    const { name, value } = field;
    let isValid = true;
    const inValidElments = []
    const validationMessage = {}
    if (name === 'sellingPrice' && value.trim() !== '' && isNaN(value.split(',').join(''))) {
        isValid = false
        inValidElments.push('sellingPrice')

        validationMessage['sellingPrice'] = 'Please selling price in numbers only'
    }
    if (name === 'finalPrice' && value.trim() !== '' && isNaN(value.split(',').join(''))) {
        isValid = false
        inValidElments.push('finalPrice')

        validationMessage['finalPrice'] = 'Please final price in numbers only'
    }
    if (!isValid) {
        return { type: INVALIDE_FORM_DATA, payload: { validationMessage, inValidElments } }
    }
    return { type: '', payload: '' }
}

export const validateFormData = (state) => {
    return async (dispatch) => {
        const { name, brandName, sellingPrice, finalPrice, deliveryLocation,
            deliveryType, category, subCategory, model, description, files } = state;
        let isValid = true;
        const inValidElments = []
        const validationMessage = {}
        if ((name.trim() === '')) {
            isValid = false
            inValidElments.push('name')

            validationMessage['name'] = 'Please provide item name'
        }
        if (brandName.trim() === '') {
            isValid = false;
            inValidElments.push('brandName')
            validationMessage['brandName'] = 'Please provide brand name'
        }
        if (!(category.trim() !== '')) {
            isValid = false
            inValidElments.push('category')
            validationMessage['category'] = 'Please select item category'
        }
        if ((subCategory.trim() === '')) {
            isValid = false
            inValidElments.push('subCategory')
            validationMessage['subCategory'] = 'Please select sub category'
        }
        if ((finalPrice.trim() === '' || isNaN(finalPrice.split(',').join('')))) {
            isValid = false
            inValidElments.push('finalPrice')
            validationMessage['finalPrice'] = 'Please provide final price'
        }
        if ((sellingPrice.trim() === '' || isNaN(sellingPrice.split(',').join('')))) {
            isValid = false
            inValidElments.push('sellingPrice')
            validationMessage['sellingPrice'] = 'Please provide selling price'
        }
        if ((deliveryLocation.trim() === '')) {
            isValid = false
            inValidElments.push('deliveryLocation')
            validationMessage['deliveryLocation'] = 'Please provide delivery location'
        }
        if (!(deliveryType.trim() !== '')) {
            isValid = false;
            inValidElments.push('deliveryType')
            validationMessage['deliveryType'] = 'Please provide delivery type'
        }
        if (!(model.trim() !== '')) {
            isValid = false;
            inValidElments.push('model')
            validationMessage['model'] = 'Please provide stock model'
        }
        if (!(description.trim() !== '')) {
            isValid = false;
            inValidElments.push('description')
            validationMessage['description'] = 'Please provide stock description'
        }
        // return {
        //     isValid,
        //     validationMessage,
        //     inValidElments,
        //     formdata
        // }
        if (!isValid) {
            dispatch({ type: INVALIDE_FORM_DATA, payload: { validationMessage, inValidElments } })
            return dispatch({ type: DISPLAY_ERROR, payload: 'Incorrect data provided, please kindy check and try again' })
        }
        if (!files) {
            return dispatch({ type: DISPLAY_ERROR, payload: 'Please Select image to upload' })
        }
        let discount = false
        if (parseInt(this.state.finalPrice) < parseInt(state.sellingPrice)) {
            discount = true
        }
        dispatch({ type: INITIAL_REGISTRATION, payload: '' })

        // save item

        try {
            let response = null
            const mainImageResponse = await fileUpload(state.files[state.mainImageIndex], 'storeItems')
            const mainImageUrl = mainImageResponse.Location;
            let otherImages = []
            for (let i = 0; i < state.files.length; i++) {
                if (i === state.mainImageIndex) {
                    continue
                }
                response = await fileUpload(state.files[i], 'storeItems')
                otherImages.push(response.Location)
            }
            console.log('main response', mainImageUrl)
            let otherImageUrl1 = otherImages.length > 0 ? otherImages[0] : ''
            let otherImageUrl2 = otherImages.length > 1 ? otherImages[1] : ''
            let otherImageUrl3 = otherImages.length > 2 ? otherImages[2] : ''
            let otherImageUrl4 = otherImages.length > 3 ? otherImages[3] : ''
            const { filteredSubCategory, files, previewImage, subImages,
                validationMessage, inValidElments, ...rest } = state;
            console.log({
                ...rest, mainImageUrl, otherImageUrl1, otherImageUrl2, otherImageUrl3,
                otherImageUrl4
            })
            response = await axios.post('/api/v1/seller/product/create', {
                ...rest, mainImageUrl, otherImageUrl1, otherImageUrl2, otherImageUrl3,
                otherImageUrl4
            }, {
                headers: {
                    'x-access-token': localStorage.getItem('x-access-token')
                }
            })
            dispatch({ type: SUCCESS_ALERT, payload: 'Item created successfully' })
            dispatch({ type: STOP_LOADING, payload: '' })
        } catch (error) {
            console.log(error)
            if (error.response) {
                dispatch({ type: DISPLAY_ERROR, payload: error.response.data.message.substr(0, 50) })
                return dispatch({ type: STOP_LOADING, payload: '' })
            }
            dispatch({ type: DISPLAY_ERROR, payload: 'Some errors were encountered' })
            dispatch({ type: STOP_LOADING, payload: '' })
        }


    }

}

export const inValidFormData = (inValidElments,
    validationMessage) => {
    return {
        type: INVALID_ITEM_FORM_DATA, payload: {
            inValidElments,
            validationMessage
        }
    }
}

export const setItemImage = (image = null) => {
    return { type: SET_ITEM_IMAGE, payload: image }
}

export const previewItem = (product = null) => {
    return { type: STORE_ITEM_EDIT, payload: product }
}

export const handleSellerPrefence = preference => {
    return { type: HANDLE_PREFERNCE_CHANGE, payload: preference }
}