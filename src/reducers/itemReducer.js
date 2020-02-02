import {
    ITEMS_FETCHED_SUCCESSFULLY, STOP_LOADING, CART_FETCHED_SUCCESSFULLY, ADD_LOCAL_CART_SUCCESSFULLY,
    PRODUCTS_FETCED_SUCCESSFULLY, EDIT_ITEM, INIT_FORM, CATEGORY_FETCHED_SUCCESSFULLY, LOCAL_CART_FETCHED_SUCCESSFULLY,
    ITEM_CHANGE_ACTION, VALIDATE_FORM_DATA, INVALIDE_FORM_DATA, ADD_CART_SUCCESSFULLY,
    ADD_SUB_IMAGES, CLEAR_PRODUCT_FORM, CART_UPDATED_SUCCESSFULLY,
    SET_ITEM_IMAGE, INVALID_ITEM_FORM_DATA, CLEAR_ITEM_FORM_INPUTS, STORE_ITEM_EDIT, HANDLE_PREFERNCE_CHANGE, FILES_SELECTED,
        LOCAL_SHOP_FETCHED_SUCCESSFULLY,HEADER_SEARCH_SUCCESS,
    ADD_LOCAL_SHOP_SUCCESSFULLY, ITEM_MODAL, REMOVE_SUB_IMAGES, SET_CARTDROPDOW_QUANTITY, ADDRESSES_FETCHED, ORDER_FETCHED_SUCCESSFULLY, RESET_MANAGE_ITEMS_STATE, GET_SELLER_DELIVERIES,
        
} from "../actions/types";

const INTIAL_STATE = {
    stores: [],
    search: [],
    subCategories: [],
    categories: [],
    cartItems: [],
    cartData: [],
    resetForm: false,
    products: [],
    localProducts: [],
    itemModalData: [],
    product: null,
    files: [],
    previewImage: null,
    subImages: [],
    model: '',
    productId: null,
    subImage1: '',
    subImage2: '',
    subImage3: '',
    quantity: '',
    subImage4: '',
    inValidElments: [],
    formIsValid: false,
    validationMessage: [],
    name: '',
    selectedId: null,
    mainImageIndex: 0,
    brandName: '',
    sellingPrice: '',
    finalPrice: '',
    sellingPriceWithComma: '',
    finalPriceWithComma: '',
    category: '',
    store: '',
    weightUnit: '',
    weight: '',
    subCategory: '',
    description: '',
    width: '',
    action: 'save',
    height: '',
    length: '',
    unit: '',
    address: [],
    deliveryType: '',
    deliveryLocation: '',
    filteredSubCategory: [],
    redirectToCheckout: false,
    orders: [],
    delivery: []
}

export default (state = INTIAL_STATE, actions) => {
    switch (actions.type) {
        case ITEMS_FETCHED_SUCCESSFULLY:
            const { stores, categories, subCategories } = actions.payload;
            return { ...state, stores, categories, subCategories, resetForm: false }
        case STOP_LOADING:
            return { ...state, resetForm: true, }
        case PRODUCTS_FETCED_SUCCESSFULLY:
            return { ...state, products: actions.payload }
        case CATEGORY_FETCHED_SUCCESSFULLY:
            return { ...state, categories: actions.payload, redirectToCheckout: false }
        case ADD_CART_SUCCESSFULLY:
            return { ...state, cartItems: actions.payload, redirectToCheckout: false }
        case CART_FETCHED_SUCCESSFULLY:
            return {
                ...state, cartItems: actions.payload, quantity: actions.payload.quantity,
                cartData: actions.payload.products, redirectToCheckout: false
            }
        case LOCAL_CART_FETCHED_SUCCESSFULLY:
            return { ...state, cartData: actions.payload, }
        case ADD_LOCAL_CART_SUCCESSFULLY:
            return { ...state, cartData: actions.payload, }
        case CART_UPDATED_SUCCESSFULLY:
            return { ...state, redirectToCheckout: true }
        case LOCAL_SHOP_FETCHED_SUCCESSFULLY:
            return { ...state, localProducts: actions.payload, }
        case HEADER_SEARCH_SUCCESS:
            return { ...state, search: actions.payload, }
        case ADD_LOCAL_SHOP_SUCCESSFULLY:
            return { ...state, PRODUCTS: actions.payload, }

        case ITEM_MODAL:
            return { ...state, itemModalData: actions.payload }

        case EDIT_ITEM:

            return { ...state, product: { ...actions.payload } }
        case INIT_FORM:
            return { ...state, product: null }
        case ITEM_CHANGE_ACTION:
            return { ...handleItemChangeAction(state, actions.payload), resetForm: false }
        case VALIDATE_FORM_DATA:
            return validateData(state)
        case INVALIDE_FORM_DATA:
            const { validationMessage, inValidElments } = actions.payload
            return { ...state, validationMessage, inValidElments }
        case SET_ITEM_IMAGE:
            return { ...state, previewImage: actions.payload }
        case CLEAR_ITEM_FORM_INPUTS:
            return { ...INTIAL_STATE, resetForm: true }
        case SET_CARTDROPDOW_QUANTITY:
            return { ...state, quantity: actions.payload }
        case STORE_ITEM_EDIT:
            return editStoreItem(state, actions.payload)
        case HANDLE_PREFERNCE_CHANGE:
            return { ...state, [actions.payload.target.name]: actions.payload.target.value }
        case INVALID_ITEM_FORM_DATA:
            return { ...state, inValidElments: actions.payload.inValidElments, validationMessage: actions.payload.validationMessage }
        case ADD_SUB_IMAGES:
            return renderSubImage(state, actions.payload)
        case CLEAR_PRODUCT_FORM:
            return { ...state, ...INTIAL_STATE }
        case ADDRESSES_FETCHED:
            return { ...state, address: actions.payload }
        case FILES_SELECTED:
            return { ...state, files: actions.payload }
        case REMOVE_SUB_IMAGES:
            switch (actions.payload) {
                case 1:
                    return { ...state, subImage1: '' }
                case 2:
                    return { ...state, subImage2: '' }
                case 3:
                    return { ...state, subImage3: '' }
                case 4:
                    return { ...state, subImage4: '' }
                default:
                    return { ...state }
            }
        case RESET_MANAGE_ITEMS_STATE:
            return {...state, ...INTIAL_STATE}
        case GET_SELLER_DELIVERIES:
            return {...state, delivery: actions.payload}
        case ORDER_FETCHED_SUCCESSFULLY: 
            return {...state, orders: actions.payload}
        default:
            return { ...state }
    }
}

const renderSubImage = (state, payload) => {
    switch (payload.index) {
        case 1:
            return { ...state, subImage1: payload.image }
        case 2:
            return { ...state, subImage2: payload.image }
        case 3:
            return { ...state, subImage3: payload.image }
        case 4:
            return { ...state, subImage4: payload.image }
        default:
            return { ...state }
    }
}

const editStoreItem = (state, product) => {
    console.log(product)
    const previewImage = product.mainImageUrl;
    const { otherImageUrl1, otherImageUrl2, otherImageUrl3, otherImageUrl4 } = product
    const subImages = [otherImageUrl1, otherImageUrl2, otherImageUrl3, otherImageUrl4]
    const sellingPriceWithComma = numberWithCommas(product.sellingPrice)
    const finalPriceWithComma = numberWithCommas(product.finalPrice)
    // console.log('sub categories',state.subCategories,  product.category)
    const filteredSubCategory = state.subCategories.filter(cat => cat.parentCategory.id === product.category)
    return {
        ...state, action: 'update', ...product, previewImage, subImages, sellingPriceWithComma, finalPriceWithComma,
        filteredSubCategory: filteredSubCategory, subImage1: otherImageUrl1, subImage2: otherImageUrl2,
        subImage3: otherImageUrl3, subImage4: otherImageUrl4, productId: product.id
    }
}

const handleItemChangeAction = (state, e) => {
    const { target: { name, value } } = e;
    const index = state.inValidElments.indexOf(name)
    let newInvalidElements = []
    if (index !== -1) {
        state.inValidElments.splice(index, 1)
    }

    newInvalidElements = [...state.inValidElments]
    if (name === 'sellingPrice') {
        newInvalidElements = [...state.inValidElments]
        return {
            ...state, inValidElments: [...newInvalidElements],
            sellingPriceWithComma: numberWithCommas(value.split(',').join('')),
            [name]: value.split(',').join(''),
        }
    }
    if (name === 'finalPrice') {
        newInvalidElements = [...state.inValidElments]
        return { ...state, [name]: value.split(',').join(''), inValidElments: [...newInvalidElements], finalPriceWithComma: numberWithCommas(value.split(',').join('')) }
    }
    if (name === 'category') {
        const subcatgeories = state.subCategories
            .filter(category => parseInt(category.parentCategory.id) === parseInt(value))
        return { ...state, filteredSubCategory: subcatgeories, [name]: value }
    }
    return { ...state, [name]: value, inValidElments: [...newInvalidElements] }
}

const validateData = state => {


}




const numberWithCommas = (number = '') => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}