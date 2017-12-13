import React from 'react'
import SolidFrame from '../../presentations/SolidFrame/SolidFrame'
import connectPut from 'react-put'
import Dropdown from '../../basicComp/Dropdown'
import './style.less'
import {connect} from 'react-redux'

import Header from './Header'
import Group from './Group'

const AddComp = ({ currentRepo, dispatch }) => {
    if(!currentRepo) return null
    const leftFields = currentRepo.leftFields || []
    const mainRight = currentRepo.mainRight || {}
    return(
        <SolidFrame innerStyle={{padding:'0px'}} outerStyle={{width:'520px'}}>
            <Header />
            <div style={{padding:'10px 20px'}}>
                {
                    leftFields.map((el,ind)=>(
                        <Group leftData={el} mainRight={mainRight} dispatch={dispatch} key={ind}/>
                    ))
                }
            </div>
        </SolidFrame>
    )
}

const mapStateToProps = (state) => {
    const repo = state.subflow.repo
    const id = state.subflow.id
    const currentRepo = repo.filter((el,index)=>el.id == id) 
    if(currentRepo.length==0) return {data:[]}
    return {currentRepo:currentRepo[0]} 
}
const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}
export default connect(mapStateToProps,mapDispatchToProps)(AddComp)    




// class Groups extends React.Component { 
//     constructor(props) {
//         super(props)
//         this.click = this.click.bind(this)
//         this.state = {
//             rightOptions : this.props.rightOptions    
//         }
        
//     }
//     click(groupInd,optionInd){
//         const rightOptions = Object.assign({},this.state.rightOptions)
//         rightOptions.forEach((el,ind)=>{
//             if(el.placeholder == groupInd){
//                 el.placeholder = false
//             } 
//         })
//         rightOptions.forEach((el,ind)=>{
//             if(ind == optionInd){
//                 el.placeholder = groupInd
//             } 
//         })
//         this.setState({rightOptions})
//     }
//     render(){
//         return (
//             <div>
//             {
//                 this.props.leftFields.map((el,ind)=>(
//                     <Group data={el} key={ind} click={this.click} ind={ind}/>
//                 ))
//             }
//             </div>
//         )
//         // return (
//         //     <div className="todoapp">
//         //         <textarea onKeyDown={this.onkeydown} ref="myTA"></textarea>
//         //     </div>
//         // )
//     }
// }

