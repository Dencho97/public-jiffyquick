import { combineReducers } from 'redux'
import activeRequests from './activeRequests'
import projects from './projects'
import steps from './steps'
import uploadedFiles from './uploadedFiles'
import constructorNavigator from './constructorNavigator'
import popups from './popups'
import language from './lang'

export default combineReducers({
    projects,
    steps,
    uploadedFiles,
    activeRequests,
    constructorNavigator,
    popups,
    language
});