import { toJS, fromJS, List, Map } from 'immutable'
import { reduceWrap, transformer } from '../tools'
const uniqAdd = (data, item) => {
    data = data.slice() //克隆immutable数据
    if (data.some(el => el.value == item.value)) return data
    data.push(item)
    return data
}
export default reduceWrap('Circulation task', (state, action, ind) => {
    let data = fromJS(state)
    switch (action.type) {
        case 'circulation':
            const newCreate = fromJS({ id: state.id, data: []})
            if (ind == 'not exist') return data.updateIn(['repo'], '', (el) => el.push(newCreate)).toJS()
            return transformer(data, ind, action.args)

        case 'circulation/newNodeInit':
            if (ind == 'not exist') {
                const newCreate = fromJS({ id: state.id, data: []})
                return data.updateIn(['repo'], 'initial', (el) => el.push(newCreate)).toJS()
            }
            return state


        case 'circulation/previousNodeSpecifiedChange':
            if (ind == 'not exist') {
                const newCreate = fromJS({ id: state.id, data: [],previousNodeSpecified:true})
                return data.updateIn(['repo'], 'initial', (el) => el.push(newCreate)).toJS()
            }
            return data.updateIn(['repo', ind, 'previousNodeSpecified'], false, (el) => !el).toJS()

        // case 'circulation/withdrawChange':
        //     return data.updateIn(['repo', ind, 'withdraw'], false, (el) => !el).toJS()

        case 'circulation/init':
            return data.updateIn(['repo'], [], (el) => {
                return el.push(fromJS(action.data))
            }).toJS()
        case 'circulation/addRole':  //pushApproveList
            if (ind == 'not exist') {
                const newCreate = fromJS({ id: state.id, data: [action.item] })
                return data.updateIn(['repo'], 'initial', (el) => el.push(newCreate)).toJS()
            }
            const poolData = state.repo[ind].data
            return data.updateIn(['repo', ind], 'initial', (el) => {
                return el.set('data', fromJS(uniqAdd(poolData, action.item)))
            }).toJS()
        case 'circulation/deleteRole':
            return data.updateIn(['repo', ind], 'initial', (el) => {
                return el.set('data', el.get('data').delete(action.index))
            }).toJS()
        case 'circulation/clear':
            return data.updateIn(['repo', ind, 'data'], [], (el) => fromJS([])).toJS()

        default:
            return state
    }
})
