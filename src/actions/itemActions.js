import {
    ERROR_FETCHING_ITEMS, ITEMS_FETCHED_SUCCESSFULLY,
    STOP_LOADING, SUCCESS_ALERT, ITEM_CHANGE_ACTION,
    DISPLAY_ERROR, EDIT_ITEM, INIT_FORM, CART_FETCHED_SUCCESSFULLY,
    PRODUCTS_FETCED_SUCCESSFULLY, CATEGORY_FETCHED_SUCCESSFULLY, ADD_CART_SUCCESSFULLY,
    LOCAL_CART_FETCHED_SUCCESSFULLY, ADD_LOCAL_CART_SUCCESSFULLY,
    INITIAL_REGISTRATION, INVALIDE_FORM_DATA, SET_ITEM_IMAGE, FILES_SELECTED, CART_UPDATED_SUCCESSFULLY,
    EXPIRED_LOGIN_SESSION, LOGOUT_USER, ADD_SUB_IMAGES, CLEAR_PRODUCT_FORM, REMOVE_SUB_IMAGES,
    INVALID_ITEM_FORM_DATA, CLEAR_ITEM_FORM_INPUTS, STORE_ITEM_EDIT, SET_AMOUNT,
    ORDER_CREATED_SUCCESSFULLY, SET_CARTDROPDOW_QUANTITY, ADDRESSES_FETCHED, USER_WALLET_OBTAINED_SUCCESSFULLY,
    HANDLE_PREFERNCE_CHANGE, CALCULATE_PRODUCT_SUM, LOCAL_SHOP_FETCHED_SUCCESSFULLY,
    ITEM_MODAL, HEADER_SEARCH_SUCCESS
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
            const mainImageResponse = await fileUpload(data.files[data.mainImageIndex].file, 'storeItems')
            const mainImageUrl = mainImageResponse.Location;
            let otherImages = []
            for (let i = 0; i < data.files.length; i++) {
                if (i === data.mainImageIndex) {
                    continue
                }
                response = await fileUpload(data.files[i].file, 'storeItems')
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
            const response = await axios.get(`/api/v1/seller/product/get-products/${0}/${100}`)
            //     headers: {
            //         'x-access-token': localStorage.getItem('x-access-token')
            //     }
            // })
            const { data: { products } } = response;
            dispatch({ type: PRODUCTS_FETCED_SUCCESSFULLY, payload: products })
            dispatch({ type: STOP_LOADING, payload: '' })
        } catch (error) {
            dispatch({ type: STOP_LOADING, payload: '' })
            if (error.response) {
                if (error.response.status === 401) {

                    dispatch({ type: DISPLAY_ERROR, payload: 'Unauthorized access, please log in to continue' })
                    return setTimeout(() => {
                        dispatch({ type: LOGOUT_USER, payload: '' })
                    }, 1500)
                }
                dispatch({ type: DISPLAY_ERROR, payload: error.response.data.message.substr(0, 100) })
            }
        }
    }
}

export const fetchFeaturedItems = () => {

    return async (dispatch) => {
        try {
            const response = await axios.get(`/api/v1/user/product/get-featured-products/${0}/${20}`)
            console.log('response', response)
            const { data: { products } } = response;
            localStorage.setItem("shop", JSON.stringify(products))
            dispatch({ type: PRODUCTS_FETCED_SUCCESSFULLY, payload: products })
            dispatch({ type: STOP_LOADING, payload: '' })
        } catch (error) {
            // dispatch({ type: DISPLAY_ERROR, payload: error.response.data.message })
            dispatch({ type: STOP_LOADING, payload: '' })
        }
    }
}

export const fetchSearchCategory = () => {

    return async (dispatch) => {
        try {
            const response = await axios.get(`/api/v1/category/get-categories/${0}/${20}`)
            //     headers: {
            //         'x-access-token': localStorage.getItem('x-access-token')
            //     }
            // })
            const { data: { categories } } = response;
            dispatch({ type: CATEGORY_FETCHED_SUCCESSFULLY, payload: categories })
            dispatch({ type: STOP_LOADING, payload: '' })
        } catch (error) {
            // dispatch({ type: DISPLAY_ERROR, payload: error.response.data.message })
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

            const { cart } = response.data;
            dispatch({ type: CART_FETCHED_SUCCESSFULLY, payload: cart })
            dispatch({ type: STOP_LOADING, payload: '' })
        } catch (error) {
            console.log('er', error)
            if (error.response.status === 498) {
                dispatch({ type: DISPLAY_ERROR, payload: 'Login session timed out, please login to continue' })
                return setTimeout(function () {
                    dispatch({ type: LOGOUT_USER, payload: '' })
                }, 1500)
            }
            dispatch({ type: DISPLAY_ERROR, payload: error.response.data.message })
            dispatch({ type: STOP_LOADING, payload: '' })
        }
    }
}

export const fetchLocalCart = () => {
    return async (dispatch) => {
        try {
            const cartData = await JSON.parse(localStorage.getItem("cart"));
            console.log("// action", cartData)
            dispatch({ type: LOCAL_CART_FETCHED_SUCCESSFULLY, payload: cartData })
            dispatch({ type: STOP_LOADING, payload: '' })
        } catch (error) {
            // dispatch({ type: DISPLAY_ERROR, payload: erro })
            dispatch({ type: STOP_LOADING, payload: '' })
        }
    }
}
export const fetchLocalShop = () => {
    return async (dispatch) => {
        try {
            const products = await JSON.parse(localStorage.getItem("shop"));
            console.log("// action", products)
            dispatch({ type: LOCAL_SHOP_FETCHED_SUCCESSFULLY, payload: products })
            dispatch({ type: STOP_LOADING, payload: '' })
        } catch (error) {
            // dispatch({ type: DISPLAY_ERROR, payload: erro })
            dispatch({ type: STOP_LOADING, payload: '' })
        }
    }
}



export const addLocalCart = (id, cartData, obj) => {
    return async (dispatch) => {
        try {
            // return console.log("here", id, cartData, obj)
            if (cartData) { //item exists
                // return console.log("data", cartData)
                let isAdded = cartData.some(data => data.id == id); //check if clicked item exist in cart
                if (isAdded) {
                    return dispatch({ type: SUCCESS_ALERT, payload: 'Item already added to cart' })
                } else {
                    // return console.log(cartData, obj)
                    localStorage.setItem("cart", JSON.stringify([...cartData, obj]))
                    let data = JSON.parse(localStorage.getItem("cart"))
                    dispatch({ type: SUCCESS_ALERT, payload: 'Item added to cart successfully' })
                    dispatch({ type: ADD_LOCAL_CART_SUCCESSFULLY, payload: data, message: "loca cart added" })
                    dispatch({ type: STOP_LOADING, payload: '' })
                }

            } else {
                //if cart is empty
                localStorage.setItem("cart", JSON.stringify([obj]))
                dispatch({ type: ADD_LOCAL_CART_SUCCESSFULLY, payload: cartData })
                dispatch({ type: STOP_LOADING, payload: '' })
            }

        } catch (error) {
            // dispatch({ type: DISPLAY_ERROR, payload: erro })
            dispatch({ type: STOP_LOADING, payload: '' })
        }
    }
}


export const addToCart = (details) => {

    return async (dispatch) => {
        try {
            console.log("zlat", details)
            const response = await axios.post('/api/v1/user/cart/add',
                { productId: details.productId, quantity: details.quantity }, {
                headers: {
                    'x-access-token': localStorage.getItem('x-access-token')
                }
            })


            if (response.data.success) {
                // const accounts = 'await getUserAccount()'
                const response2 = await axios.get(`/api/v1/user/cart/get`, {
                    headers: {
                        'x-access-token': localStorage.getItem('x-access-token')
                    }
                })

                const { cart } = response2.data;
                dispatch({ type: CART_FETCHED_SUCCESSFULLY, payload: cart })
                dispatch({ type: STOP_LOADING, payload: '' })
                dispatch({ type: SUCCESS_ALERT, payload: "Item added to cart successfully" })
                dispatch({ type: ADD_CART_SUCCESSFULLY, payload: response })

            }
        } catch (error) {
            console.log(error.response)
            if (error.response && error.response.data.message)
                return dispatch({ type: DISPLAY_ERROR, payload: error.response.data.message.substr(0, 100) })

            dispatch({ type: STOP_LOADING, payload: '' })
            //return dispatch({ type: DISPLAY_ERROR, payload: error.response.data.substr(0, 100) })
        }
    }
}

export const SearchItem = (details) => {

    return async (dispatch) => {
        try {
            const response = await axios.post('/api/v1/user/search-product', details)
            console.log(response)
            if (response.data.success) {
                dispatch({ type: HEADER_SEARCH_SUCCESS, payload: response })
                dispatch({ type: STOP_LOADING, payload: '' })
                // dispatch({ type: SUCCESS_ALERT, payload: "Item added to cart successfully" })
            }
        } catch (error) {
            console.log(error.response)
            if (error.response && error.response.data.message)
                return dispatch({ type: DISPLAY_ERROR, payload: error.response.data.message.substr(0, 100) })

            dispatch({ type: STOP_LOADING, payload: '' })
            //return dispatch({ type: DISPLAY_ERROR, payload: error.response.data.substr(0, 100) })
        }
    }
}

export const itemDetailModalAction = (data) => {
    console.log("inside", data)
    return async (dispatch) => {
        try {
            dispatch({ type: ITEM_MODAL, payload: data })
        } catch (error) {
            dispatch({ type: STOP_LOADING, payload: '' })
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

export const calculateSumProducts = (sum, productId) => {
    return { type: CALCULATE_PRODUCT_SUM, payload: { sum, productId } }
}

export const successAlert = (message = '') => {
    if (message.trim() !== '') {
        return { type: SUCCESS_ALERT, payload: message }
    }
}

export const addSubImages = (index, image) => {
    return { type: ADD_SUB_IMAGES, payload: { image, index } }
}

export const updateItem = (id, data) => {
    return async (dispatch) => {
        if (id) {
            try {
                console.log('data', data)
                let imageUploaded = null;
                const otherImages = []
                let mainImageResponse = null
                console.log('files', data.files)
                // let otherImageUrl1 = '', otherImageUrl2 = '', otherImageUrl3 = ''
                // otherImageUrl4 = ''
                for (let i = 0; i < data.files.length; i++) {
                    if (data.files[i].type === 'main') {
                        mainImageResponse = await fileUpload(data.files[i].file, 'storeItems');
                    } else {
                        imageUploaded = await fileUpload(data.files[i].file, 'storeItems')
                        otherImages.push({ elementNumber: data.files[i].elementNumber, Location: imageUploaded.Location })
                        // `otherImageUrl${data[files].elementNumber}` = imageUploaded.Location;
                    }

                }
                // let e = otherImages.find(element => element.elementNumber === 1) 
                // console.log(otherImages, e)
                const mainImageUrl = mainImageResponse ? mainImageResponse.Location : null;
                let otherImageUrl1 = otherImages.find(element => element.elementNumber === 1) ?
                    otherImages.find(element => element.elementNumber === 1).Location : ''
                let otherImageUrl2 = otherImages.find(element => element.elementNumber === 2) ?
                    otherImages.find(element => element.elementNumber === 2).Location : ''
                let otherImageUrl3 = otherImages.find(element => element.elementNumber === 3) ?
                    otherImages.find(element => element.elementNumber === 3).Location : ''
                let otherImageUrl4 = otherImages.find(element => element.elementNumber === 4) ?
                    otherImages.find(element => element.elementNumber === 4).Location : ''
                const item = {
                    name: data.name,
                    brandName: data.brandName,
                    description: data.description,
                    model: data.model,
                    year: "2020",
                    mainImageUrl: !mainImageUrl ? data.previewImage : mainImageUrl,
                    otherImageUrl1: otherImageUrl1.trim() !== '' ? otherImageUrl1 : data.subImage1,
                    otherImageUrl2: otherImageUrl2.trim() !== '' ? otherImageUrl2 : data.subImage2,
                    otherImageUrl3: otherImageUrl3.trim() !== '' ? otherImageUrl3 : data.subImage3,
                    otherImageUrl4: otherImageUrl4.trim() !== '' ? otherImageUrl4 : data.subImage4,
                    category: '' + data.category,
                    subCategory: '' + data.subCategory,
                    store: '' + data.store,
                    sellingPrice: '' + data.sellingPrice,
                    costPrice: '' + data.finalPrice,
                    discounts: data.discounts,
                    finalPrice: '' + data.finalPrice,
                    deliveryType: data.deliveryType,
                    deliveryLocation: data.deliveryLocation,
                    width: data.width,
                    height: data.height,
                    length: data.length,
                    unit: data.unit,
                    weight: data.weight,
                    weightUnit: data.weightUnit
                }
                console.log('item', item)
                await axios.put(`/api/v1/seller/product/update/${id}`, {
                    ...item
                }, {
                    headers: {
                        'x-access-token': localStorage.getItem('x-access-token')
                    }
                })
                dispatch({ type: STOP_LOADING, payload: '' })
                dispatch({ type: SUCCESS_ALERT, payload: 'Item updated successfully' })
                dispatch({ type: CLEAR_PRODUCT_FORM, payload: '' })
            } catch (error) {
                console.log('er', error)
                if (error.response.status === 498) {
                    dispatch({ type: DISPLAY_ERROR, payload: 'Login session timed out, please login to continue' })
                    return setTimeout(function () {
                        dispatch({ type: LOGOUT_USER, payload: '' })
                    }, 1500)
                }
                dispatch({ type: DISPLAY_ERROR, payload: error.response.data.message })
                dispatch({ type: STOP_LOADING, payload: '' })
            }
        }
    }
}

export const updateFilesSelected = files => {
    return { type: FILES_SELECTED, payload: files }
    // return { type: CALCULATE_PRODUCT_SUM, payload: { sum, productId } }
}

export const renderSuccessAlert = (message = '') => {
    return { type: SUCCESS_ALERT, payload: message }
}

export const removeSubImagesFromUpload = elementNumber => {
    return { type: REMOVE_SUB_IMAGES, payload: elementNumber }
}

export const setAmount = amount => {
    return { type: SET_AMOUNT, payload: amount }
}

export const registerPayment = (transactionNo, txRef, amount, paymentType, cartData, addressId, userAddress) => {

    return async (dispatch) => {
        try {
            await axios.post('/api/v1/user/order/create',
                {
                    amount: '' + amount,
                    transactionReference: txRef,
                    transactionNo,
                    addressId: `${addressId}`,
                    addressString: userAddress,
                    useWallet: paymentType === 'pay with debit' ? false : true
                }, {
                headers: {
                    'x-access-token': localStorage.getItem('x-access-token')
                }
            }
            )
            console.log('cartt ', cartData)
            for (let i = 0; i < cartData.length; i++) {
                await axios.post('/api/v1/user/cart/remove', { productId: cartData[i].id }, {
                    headers: {
                        'x-access-token': localStorage.getItem('x-access-token')
                    }
                })
            }
            const responseCart = await axios.get(`/api/v1/user/cart/get`, {
                headers: {
                    'x-access-token': localStorage.getItem('x-access-token')
                }
            })
            const { cart } = responseCart.data;
            dispatch({ type: CART_FETCHED_SUCCESSFULLY, payload: cart })
            dispatch({ type: STOP_LOADING, payload: '' })
            dispatch({ type: ORDER_CREATED_SUCCESSFULLY, payload: '' })
            dispatch({ type: SUCCESS_ALERT, payload: 'Order created successfully' })
        } catch (error) {
            dispatch({ type: STOP_LOADING, payload: '' })
            console.log(error.response)
            if (error.response.data.message)
                return dispatch({ type: DISPLAY_ERROR, payload: error.response.data.message.substr(0, 50) })
            // return dispatch({type: DISPLAY_ERROR, payload: error.response.message.substr(0, 50)})
        }
    }
}

export const removeCartItem = id => {
    return async (dispatch) => {
        try {
            await axios.post('/api/v1/user/cart/remove', {
                productId: `${id}`
            }, {
                headers: {
                    'x-access-token': localStorage.getItem('x-access-token')
                }
            })
            const response2 = await axios.get(`/api/v1/user/cart/get`, {
                headers: {
                    'x-access-token': localStorage.getItem('x-access-token')
                }
            })

            const { cart } = response2.data;
            dispatch({ type: CART_FETCHED_SUCCESSFULLY, payload: cart })
            dispatch({ type: STOP_LOADING, payload: '' })
            dispatch({ type: SUCCESS_ALERT, payload: 'Item removed from cart successfully' })

        } catch (error) {
            dispatch({ type: STOP_LOADING, payload: '' })
            if (error.response.status === 498) {
                dispatch({ type: DISPLAY_ERROR, payload: 'Login session timed out, please login to continue' })
                return setTimeout(function () {
                    dispatch({ type: LOGOUT_USER, payload: '' })
                }, 1500)
            }
            dispatch({ type: DISPLAY_ERROR, payload: error.response.data.message.substr(0, 80) })
        }

    }
}

export const setCartDropDownTotalPrice = (quantity) => {
    return { type: SET_CARTDROPDOW_QUANTITY, payload: quantity }
}

export const updateCartItems = (cart, quantity, changeItems) => {
    return async (dispatch) => {
        //update the backend with the new cart details
        try {
            for (let i = 0; i < changeItems.length; i++) {
                await axios.post('/api/v1/user/cart/add', {
                    productId: `${changeItems[i]}`, quantity: `${quantity[changeItems[i]]}`
                }, {
                    headers: {
                        'x-access-token': localStorage.getItem('x-access-token')
                    }
                })
            }
            dispatch({ type: STOP_LOADING, payload: '' })
            dispatch({ type: CART_UPDATED_SUCCESSFULLY, payload: '' })
        } catch (error) {
            dispatch({ type: STOP_LOADING, payload: '' })
            if (error.response.status === 498) {
                dispatch({ type: DISPLAY_ERROR, payload: 'Login session timed out, please login to continue' })
                return setTimeout(function () {
                    dispatch({ type: LOGOUT_USER, payload: '' })
                }, 1500)
            }
            dispatch({ type: DISPLAY_ERROR, payload: error.response.data.message.substr(0, 80) })

        }

    }
}

export const fetchCheckoutCart = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/api/v1/user/cart/get`, {
                headers: {
                    'x-access-token': localStorage.getItem('x-access-token')
                }
            })
            const response2 = await axios.get('/api/v1/user/address/get/0/10', {
                headers: {
                    'x-access-token': localStorage.getItem('x-access-token')
                }
            })
            const response3 = await axios.get('/api/v1/user/wallet/get', {
                headers: {
                    'x-access-token': localStorage.getItem('x-access-token')
                }
            })
            const { cart } = response.data;
            const { address } = response2.data;
            const { transactions, balance } = response3.data.wallet
            dispatch({ type: USER_WALLET_OBTAINED_SUCCESSFULLY, payload: { transactions, balance } })
            dispatch({ type: CART_FETCHED_SUCCESSFULLY, payload: cart })
            dispatch({ type: ADDRESSES_FETCHED, payload: address })
        } catch (error) {
            console.log('er', error)
            if (error.response.status === 498) {
                dispatch({ type: DISPLAY_ERROR, payload: 'Login session timed out, please login to continue' })
                return setTimeout(function () {
                    dispatch({ type: LOGOUT_USER, payload: '' })
                }, 1500)
            }
            dispatch({ type: DISPLAY_ERROR, payload: error.response.data.message })
            dispatch({ type: STOP_LOADING, payload: '' })
        }
    }
}

export const stopHomeLoading = () => {
    return { type: STOP_LOADING, payload: '' }
}

export const getAddresses = (id = 0, numberOfPage = 100) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/api/v1/user/address/get/${id}/${numberOfPage}`, {
                headers: {
                    'x-access-token': localStorage.getItem('x-access-token')
                }
            })

            const { address } = response.data;
            console.log(address)
            dispatch({ type: STOP_LOADING, payload: '' })
            dispatch({ type: ADDRESSES_FETCHED, payload: address })
        } catch (error) {
            console.log('er', error)
            if (error.response.status === 498) {
                dispatch({ type: DISPLAY_ERROR, payload: 'Login session timed out, please login to continue' })
                return setTimeout(function () {
                    dispatch({ type: LOGOUT_USER, payload: '' })
                }, 1500)
            }
            dispatch({ type: DISPLAY_ERROR, payload: error.response.data.message })
            dispatch({ type: STOP_LOADING, payload: '' })
        }
    }
}

export const createAddress = (data, id = 0, numberOfPage = 100) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('/api/v1/user/address/create', {
                address1: data.address,
                ...data
            }, {
                headers: {
                    'x-access-token': localStorage.getItem('x-access-token')
                }
            })
            const response2 = await axios.get(`/api/v1/user/address/get/${id}/${numberOfPage}`, {
                headers: {
                    'x-access-token': localStorage.getItem('x-access-token')
                }
            })

            const { address } = response2.data;
            dispatch({ type: ADDRESSES_FETCHED, payload: address })
            dispatch({ type: STOP_LOADING, payload: '' })
            dispatch({ type: SUCCESS_ALERT, payload: 'Address created successfully' })
        } catch (error) {
            console.log('er', error)
            if (error.response.status === 498) {
                dispatch({ type: DISPLAY_ERROR, payload: 'Login session timed out, please login to continue' })
                return setTimeout(function () {
                    dispatch({ type: LOGOUT_USER, payload: '' })
                }, 1500)
            }
            dispatch({ type: DISPLAY_ERROR, payload: error.response.data.message })
            dispatch({ type: STOP_LOADING, payload: '' })
        }
    }
}