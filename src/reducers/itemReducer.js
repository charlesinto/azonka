import {
    ITEMS_FETCHED_SUCCESSFULLY, STOP_LOADING, CART_FETCHED_SUCCESSFULLY, ADD_LOCAL_CART_SUCCESSFULLY,
    PRODUCTS_FETCED_SUCCESSFULLY, EDIT_ITEM, INIT_FORM, CATEGORY_FETCHED_SUCCESSFULLY, LOCAL_CART_FETCHED_SUCCESSFULLY,
    ITEM_CHANGE_ACTION, VALIDATE_FORM_DATA, INVALIDE_FORM_DATA, ADD_CART_SUCCESSFULLY,
    SET_ITEM_IMAGE, INVALID_ITEM_FORM_DATA, CLEAR_ITEM_FORM_INPUTS, STORE_ITEM_EDIT, HANDLE_PREFERNCE_CHANGE
} from "../actions/types";

const INTIAL_STATE = {
    stores: [],
    subCategories: [],
    categories: [],
    cartItems: [],
    cartData: [],
    resetForm: false,
    products: [],
    product: null,
    files: null,
    previewImage: null,
    subImages: [],
    model: '',
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
    subCategory: '',
    description: '',
    width: '',
    action: 'save',
    height: '',
    length: '',
    unit: '',
    deliveryType: '',
    deliveryLocation: '',
    filteredSubCategory: []


}

export default (state = INTIAL_STATE, actions) => {
    switch (actions.type) {
        case ITEMS_FETCHED_SUCCESSFULLY:
            const { stores, categories, subCategories } = actions.payload;
            return { ...state, stores, categories, subCategories, resetForm: false }
        case STOP_LOADING:
            return { ...state, resetForm: true }
        case PRODUCTS_FETCED_SUCCESSFULLY:
            return { ...state, products: actions.payload }
        case CATEGORY_FETCHED_SUCCESSFULLY:
            return { ...state, categories: actions.payload }
        case ADD_CART_SUCCESSFULLY:
            return { ...state, cartItems: actions.payload, }
        case CART_FETCHED_SUCCESSFULLY:
            return { ...state, cartItems: actions.payload, }
        case LOCAL_CART_FETCHED_SUCCESSFULLY:
            return { ...state, cartData: actions.payload, }
        case ADD_LOCAL_CART_SUCCESSFULLY:
            return { ...state, cartData: actions.payload, }
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
        case STORE_ITEM_EDIT:
            return editStoreItem(state, actions.payload)
        case HANDLE_PREFERNCE_CHANGE:
            return { ...state, [actions.payload.target.name]: actions.payload.target.value }
        case INVALID_ITEM_FORM_DATA:
            return { ...state, inValidElments: actions.payload.inValidElments, validationMessage: actions.payload.validationMessage }
        default:
            return { ...state }
    }
}
const editStoreItem = (state, product) => {

    const previewImage = product.mainImageUrl;
    const { otherImageUrl1, otherImageUrl2, otherImageUrl3, otherImageUrl4 } = product
    const subImages = [otherImageUrl1, otherImageUrl2, otherImageUrl3, otherImageUrl4]
    const sellingPriceWithComma = numberWithCommas(product.sellingPrice)
    const finalPriceWithComma = numberWithCommas(product.finalPrice)
    const filteredSubCategory = state.subCategories.filter(cat => cat.parentCategory.id === product.category)
    return {
        ...state, ...product, previewImage, subImages, sellingPriceWithComma, finalPriceWithComma,
        filteredSubCategory: filteredSubCategory
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