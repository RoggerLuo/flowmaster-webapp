import React from 'react'
import {connect} from 'react-redux'

const Radios =  ({dispatch,isWaiting}) => {
    const mode1 = () => rdx.put('subflow','replace',['isWaiting'],true)
    const mode2 = () => rdx.put('subflow','replace',['isWaiting'],false)        
    
    let view = ''
    if(isWaiting){
        view = (
            <div className="radio-box">
                <div >
                    <div className="radio-lable" style={{cursor:'pointer'}}>
                        <span className="radio-img" style={{position:'relative',bottom:'2px'}}><img width="20" height="20" src={require("./selected.png")} /></span>
                        &nbsp;<span className="radio-text" style={{lineHeight:'30px'}}>{`阻塞等待`}</span> 
                    </div> 
                    <div className="property-row-content radio-detail-text" style={{color: '#999999',paddingLeft:'25px'}}> 
                        必须在子流程完成审批后，父流程才可继
                        续流转。                
                    </div>

                </div>

                <div onClick={mode2}>

                    <div className="radio-lable"  style={{cursor:'pointer'}}>
                        <span className="radio-img" style={{position:'relative',bottom:'2px'}}><img width="20" height="20" src={require("./unselected.png")} /></span>
                        &nbsp;<span className="radio-text" style={{lineHeight:'30px'}}>{`非阻塞等待`}</span> 
                    </div>  
                    <div className="property-row-content radio-detail-text" style={{color: '#999999',paddingLeft:'25px'}}> 
                        子流程发起后，父流程可以继续流转，父
                        子流程相互独立。                
                    </div>
                </div>
            </div>

        )
        
    }else{
        view = (
            <div className="radio-box">
                
                <div onClick={mode1} >
                    <div className="radio-lable"  style={{cursor:'pointer'}}>
                        <span className="radio-img" style={{position:'relative',bottom:'2px'}}><img width="20" height="20" src={require("./unselected.png")} /></span>
                        &nbsp;<span className="radio-text" style={{lineHeight:'30px'}}>{`阻塞等待`}</span> 
                    </div> 
                    <div className="property-row-content radio-detail-text" style={{color: '#999999',paddingLeft:'25px'}}> 
                        必须在子流程完成审批后，父流程才可继
                        续流转。                
                    </div>
                </div>

                <div >

                    <div className="radio-lable" style={{cursor:'pointer'}}>
                        <span className="radio-img" style={{position:'relative',bottom:'2px'}}><img width="20" height="20" src={require("./selected.png")} /></span>
                        &nbsp;<span className="radio-text" style={{lineHeight:'30px'}}>{`非阻塞等待`}</span> 
                    </div> 
                    <div className="property-row-content radio-detail-text" style={{color: '#999999',paddingLeft:'25px'}}> 
                        子流程发起后，父流程可以继续流转，父
                        子流程相互独立。                
                    </div>
                </div>
            </div>
        )
        
    }
    return view
}
const mapStateToProps = (state) => {
    const repo = state.subflow.repo
    const id = state.subflow.id
    const currentRepo = repo.filter((el,index)=>el.id == id) 
    if(currentRepo.length==0) return {isWaiting:false}
    const isWaiting = currentRepo[0].isWaiting
    return {isWaiting} 
}
const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}

export default connect(mapStateToProps,mapDispatchToProps)(Radios)    


