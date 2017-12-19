import React from 'react'
import SolidFrame from '../../../presentations/SolidFrame/SolidFrame'
import {connect} from 'react-redux'
import Header from '../Form/Header'
import SubGroup from './SubGroup'

const SubForm = ({ currentRepo, dispatch }) => {
    if(!currentRepo) return null
    const leftFields = currentRepo.leftFields || []
    const filtered = leftFields.filter(el=>el.type == 'sub_form')
    return(
        <SolidFrame innerStyle={{padding:'0px'}} outerStyle={{width:'620px'}}>
            <Header />
            <div style={{padding:'10px 20px'}}>
                {
                    filtered.map((el,ind)=>(<SubGroup key={ind} data={el} isLast={(filtered.length-1)==ind}/>))
                }
            </div>
        </SolidFrame>
    )
}
export default global.connect2redux('subflow',SubForm)

