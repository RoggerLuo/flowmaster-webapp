import React from 'react'
import { connect } from 'react-redux'
import Dropdown from '../../basicComp/Dropdown'

const Component = ({data,dispatch,put,choosedOption}) => {    
    const choosed = (item)=>{
        dispatch({type:'dropdown1Choose',item})
    }
    return (
        <div>
            {put('popup.higherLevel1')}
            <Dropdown data={data} choosedOption={choosedOption} choosed={choosed}/>
            {put('popup.higherLevel2')}
        </div>
    )
}
 
const mapStateToProps = (state) => {
    return {data:state.dropdown.dropdown1Data,choosedOption:state.dropdown.dropdown1}
}

const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}


import connectPut from 'react-put'
const options = {mapPropToDictionary: (props)=>window.reactI18n}
const ConnectedApp = connectPut(options)(Component)


const ComponentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedApp)

export default ComponentContainer

