import React from 'react'
import {connect} from 'react-redux'
import RolesFrameGenerator from '../RolesFrameGeneratorNotForParallel'

function ConfiguredRoleComp({ data, dispatch}){
    const del = (index) => function(){
        dispatch({type:'circulation/deleteRole',index})
        activeSave()
    }
    const add = (item) => {
        dispatch({type:'circulation/addRole',item})
        activeSave()
    }
    const clear = () => {
        dispatch({type:'circulation/clear'})
        activeSave()
    }
    const { DefaultContainer, DbRoleContainer } = RolesFrameGenerator({del,add,clear})
    const cate = data[0] && data[0].cate || false
    switch(cate){
        case 'fromDb':
            return (<DbRoleContainer data={data}/>)
        default:
            return (<DefaultContainer data={data}/>)
    }
}
const mapStateToProps = (state) => {
    return {state}
}
const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}

export default connect(mapStateToProps,mapDispatchToProps)(ConfiguredRoleComp)    

