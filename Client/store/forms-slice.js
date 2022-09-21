import { createSlice } from "@reduxjs/toolkit";

const profileDataObject = { userId: 0, firstName: "", lastName: "", email: "", description: "", photo: "" };

const userErrors = {
    email: {
        valid: true,
        message: "Please enter correct email."
    }
}

const userProfileChanges = createSlice({
    name: "userProfileChangesSlice",
    initialState: {
        profileDataObject,
        userErrors,
        displayUserErrors: false,
    },
    reducers: {
        showUserErrors: (state) => {
            state.displayUserErrors = true;
        },
        setUserID: (state, payload) => {
            state.profileDataObject.userId = payload.payload;
        },
        setDefaultData: (state, payload) => {
            const defaultData = payload.payload;

            Object.keys(state.profileDataObject).forEach(e => {
                if(defaultData !== null && defaultData !== undefined) {
                    state.profileDataObject[e] = defaultData[e];
                }
            });
        },
        setFirstName: (state, payload) => {
            state.profileDataObject.firstName = payload.payload;
        },
        setLastName: (state, payload) => {
            state.profileDataObject.lastName = payload.payload;
        },
        setEmail: (state, payload) => {
            state.profileDataObject.email = payload.payload;

            if (state.profileDataObject.email.length === 0) {
                state.userErrors.email.valid = true;
            } else if (state.profileDataObject.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                state.userErrors.email.valid = true;
            } else {
                state.userErrors.email.valid = false;
            }
        },
        setAbout: (state, payload) => {
            state.profileDataObject.description = payload.payload;
        },
        setUserPhoto: (state, payload) => {
            state.profileDataObject.photo = payload.payload;
        },
        nullify: (state) => {
            state.profileDataObject = profileDataObject;
            state.userErrors = userErrors;
        }
    }
});

const dataObject = { hostId: 0, city: "", address: "", numbOfBeds: "", photo: "", distanceToCenter: "", description: "", fromDefault: "", from: "", toDefault: "", to: "" };

const errObj = {
    city: {
        valid: false,
        message: "Please enter the city."
    },
    address: {
        valid: false,
        message: "Please enter the address."
    },
    numberOfBeds: {
        valid: false,
        message: "Please enter the number of beds."
    },
    distanceToCenter: {
        valid: false,
        message: "Please enter the distance."
    },
    description: {
        valid: false,
        message: "Please enter the description."
    },
    from: {
        valid: false,
    },
    to: {
        valid: false,
    }
}

const addApartmentChanges = createSlice({
    name: 'apartmentChangesSlice',
    initialState: {
        dataObject,
        errObj,
        displayApartmentErrors: false,
        profileEdited: false,
    },
    reducers: {
        setProfileEdited: (state, payload) => {
            state.profileEdited = payload.payload;
        },
        showApartmentErrors: (state, payload) => {
            state.displayApartmentErrors = payload.payload;
        },
        setHost: (state, payload) => {
            state.dataObject.hostId = payload.payload;
        },
        setCity: (state, payload) => {
            state.dataObject.city = payload.payload;

            state.dataObject.city.length > 0 ? state.errObj.city.valid = true : state.errObj.city.valid = false;
        },
        setAddress: (state, payload) => {
            state.dataObject.address = payload.payload;

            state.dataObject.address.length > 0 ? state.errObj.address.valid = true : state.errObj.address.valid = false;
        },
        setDistance: (state, payload) => {
            state.dataObject.distanceToCenter = parseInt(payload.payload);

            state.dataObject.distanceToCenter > 0 ? state.errObj.distanceToCenter.valid = true : state.errObj.distanceToCenter.valid = false;
        },
        setGuestNum: (state, payload) => {
            state.dataObject.numbOfBeds = parseInt(payload.payload);

            state.dataObject.numbOfBeds > 0 ? state.errObj.numberOfBeds.valid = true : state.errObj.numberOfBeds.valid = false;
        },
        setPhoto: (state, payload) => {
            state.dataObject.photo = payload.payload;
        },
        setDescription: (state, payload) => {
            state.dataObject.description = payload.payload;

            state.dataObject.description.length > 0 ? state.errObj.description.valid = true : state.errObj.description.valid = false;
        },
        setFrom: (state, payload) => {
            state.dataObject.fromDefault = payload.payload;
            const date = new Date(payload.payload);
            state.dataObject.from = date.toISOString();

            state.dataObject.from ? state.errObj.from.valid = true : state.errObj.from.valid = false;
        },
        setTo: (state, payload) => {
            state.dataObject.toDefault = payload.payload;
            const date = new Date(payload.payload);
            state.dataObject.to = date.toISOString();

            state.dataObject.to ? state.errObj.to.valid = true : state.errObj.to.valid = false;
        },
        nullify: (state) => {
            state.dataObject = dataObject;
            state.errObj = errObj;
        }
    }
});

export const rootReducer = {
    apartmentChanges: addApartmentChanges,
    userChanges: userProfileChanges
}

export const apartmentActions = addApartmentChanges.actions;
export const userActions = userProfileChanges.actions;