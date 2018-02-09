import './style'
import getSpecificData from './SpecificRoles/optionData'
import buttonFactory from './buttonFactory'

export default function({onConfirm, existCate, buttonMode, groupInd}) { //hidePrevious 
    const buttons = buttonFactory(existCate,buttonMode)
    const actions = buttons.map(el=>el(onConfirm)) //统一装配
    return actions.map((action, index) => {
        if (action.type != 'callPopup') { //特殊情况 ‘选择特定人员’ 选择窗口
            return {
                title: 'button.option3',
                click() { action() }
            }
        }
        return {
            title: action.title || '',
            click() {
                if(action.title == 'button.option6'){ // 特定节点审批人的话，每次click button 更新数据，
                    rdx.put('temp','replace',['specificRolesData'], getSpecificData())
                }

                if(action.title == 'button.option7'){ //db的话
                    action.onConfirm = action.onConfirm(groupInd)
                }

                rdx.dispatch(action)
                window.callShadow()
            }
        }
    })
}
