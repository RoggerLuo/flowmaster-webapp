import React from 'react'
import Dropdown from '../../../basicComp/Dropdown'
import { connect } from 'react-redux'
import PartRight from '../Form/PartRight'
import PartLeft from '../Form/PartLeft'

const Group = ({ leftData, currentRepo, dispatch, leftFormId, subOptions }) => {
    
    const mainRight = currentRepo.mainRight || {}

    let selectedOption = { text: '请选择', value: '' }
    if(currentRepo.subRights){
        if(currentRepo.subRights[leftFormId]){
            if( currentRepo.subRights[leftFormId].map[leftData.name]){
                selectedOption = currentRepo.subRights[leftFormId].map[leftData.name]
            }
        }
    }    
    const select = (item, optionInd) => {
        dispatch({ type: 'subflow/subRights/rightFormId/fieldId', leftFormId, fieldId: leftData.name, item })
    }

    return (    
        <div style={{display:'flex',justifyContent: 'space-between', height: '41px'}}>
            <PartLeft title={leftData.title}/>
            <PartRight selectedOption={selectedOption} optionsData={subOptions} select={select} />
        </div>
    )
}
export default global.connect2redux('subflow', Group)