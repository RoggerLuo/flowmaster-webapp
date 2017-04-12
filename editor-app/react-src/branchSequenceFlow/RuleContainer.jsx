import React,{createClass} from 'react';
import Dropdown from '../basicComp/branch-dropdown'
import store from '../../redux/configureStore.js'
import { connect } from 'react-redux'
// import $ from 'jquery'

const Rule = ({dropdown,ruleMode,del,oninput}) => {
    let border = '1px solid white'
    let display = 'none'
    if(ruleMode =='delete'){
        border = '1px solid red'//#dde4ef
        display = ''
    }else{
        border = '1px solid white'
        display = 'none'
    }
    return (
        <div className="delete-frame" style={{border:border}}>
            <div className="container-row">
                <Dropdown {...dropdown.entry1}/>
                <Dropdown {...dropdown.entry2}/>
                <Dropdown {...dropdown.entry3}/>
                <i className="icon qingicon icon-guanbi2fill icon-red-close-for-rule" 
                    onClick={del}
                    style={{display:display}}>
                </i>
            </div>    
            <div className="container-row-placeholder"></div>
            <div className="input-text-container">
                <input type='text' className="input-text" defaultValue={dropdown.input} onChange={oninput}/>
            </div>
        </div>
    )
}

/* 相当于两层container */
/* 这一层的目的是为了 放置del函数的逻辑 */
const RuleContainer = ({key1,key2,ruleMode, conditions,dispatch,template}) =>{
    const oninput = (event) => {
        dispatch({type:'saveActive'})
        dispatch({type:'ruleOnInput',key1,key2,content:event.target.value})
    }

    const ruleData = conditions && conditions[key1] && conditions[key1][key2] || {}
    const dropdown = template
    
    //ruleData.entry1 &&
    dropdown.entry1.choosedText = (ruleData.entry1 != 'initial') && dropdown.entry1.options[ruleData.entry1].text || dropdown.entry1.defaultText
    dropdown.entry2.choosedText = (ruleData.entry2 != 'initial') && dropdown.entry2.options[ruleData.entry2].text || dropdown.entry2.defaultText
    dropdown.entry3.choosedText = (ruleData.entry3 != 'initial') && dropdown.entry3.options[ruleData.entry3].text || dropdown.entry3.defaultText
    
        // switch(value){
        //     case 0:
        //         // $.post

        //     break

        //     case 1:                
        //         let linkageData = []
        //         let k
        //         for( k in window.userProperties){
        //             // console.log(k)
        //             linkageData.push({text:k,value:k})
        //         }

        //         dispatch({type:'linkage',options:linkageData})
        //     break

        //     case 2:

        //     break
        // }
    dropdown.entry1.choose = (value) => {
        dispatch({value,type:'branchUpdate',groupIndex:key1,ruleIndex:key2,entryIndex:'entry1'})
        activeSave()
    }

    dropdown.entry2.choose = (value) => {
        activeSave()
        dispatch({value,type:'branchUpdate',groupIndex:key1,ruleIndex:key2,entryIndex:'entry2'})
    }
    dropdown.entry3.choose = (value) => {
        activeSave()
        dispatch({value,type:'branchUpdate',groupIndex:key1,ruleIndex:key2,entryIndex:'entry3'})
    }
    
    dropdown.entry2.options = ruleData.entry2template || []

    dropdown.entry1.usePut = true
    dropdown.entry2.usePut = false
    dropdown.entry3.usePut = false

    const del = () => {dispatch({type:'deleteRule',groupIndex:key1,ruleIndex:key2})}
    return (<Rule {...{dropdown,ruleMode,del,oninput}} />)
}

const mapStateToProps = (state) => {
    // const ruleMode = state.branch.ruleMode
    const elementFound = state.branch.dataRepo.filter((el,index)=>{
        return el.id == state.branch.id
    })
    
    const conditions = elementFound[0] && elementFound[0].conditions || []

    const template = state.branch.template
    return {conditions,template}
}
const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}
const RuleContainer2 = connect(
    mapStateToProps,
    mapDispatchToProps
)(RuleContainer)

export default RuleContainer2
