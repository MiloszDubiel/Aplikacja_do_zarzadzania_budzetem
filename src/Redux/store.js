import { configureStore } from '@reduxjs/toolkit'
import userDataSlicer from './slices/userData.slicer'

export default configureStore({
    reducer: {
        userData: userDataSlicer
    }
})

