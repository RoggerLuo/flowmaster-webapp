import { toJS, fromJS, List, Map } from 'immutable'
import { reduceWrap, transformer } from '../tools'

export default reduceWrap('all',  (state, action, ind) => {
    let data = fromJS(state)
    switch (action.type) {
        case 'temp':
            if (ind == 'not exist') return data.updateIn(['repo'], '', (a) => a.push(fromJS({id:state.id}))).toJS()

            return transformer(data, ind, action.args)
        default:
            return state
    }
})