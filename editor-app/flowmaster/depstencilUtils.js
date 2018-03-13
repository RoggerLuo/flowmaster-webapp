import assembleSetProperty from './setProperty'
global.fm = global.fm || {}


fm.getUrlQueryParam = (name) => { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

//dep
window.getQueryString = fm.getUrlQueryParam


export default function($scope) {
    fm.getCanvas = () => $scope.editor.getCanvas()
    fm.getNodes = () => $scope.editor.getCanvas().getChildNodes()
    fm.getJson = () => $scope.editor.getJSON()
    fm.getShapeById = (id) => $scope.editor.getCanvas().getChildShapeByResourceId(id)
    fm.getNodeById = fm.getShapeById

    fm.setProperty_and_updateView = assembleSetProperty($scope) //多了自动更新试图的功能,普通的setProperty无法自动更新
    window.setPropertyAdvance = fm.setProperty_and_updateView

    //deprecate
    fm.canvas = () => fm.getCanvas()
    global.windowCanvas = fm.getCanvas()
    window.getJson = () => JSON.stringify(fm.getJson())
    window.getRawJson = () => fm.getJson()
}

// 从上而下 写回调
fm.incomingLooper = function(title,cb){
    return (shape)=>{
        if(fm.getTitle(fm.getIncoming(shape)) == title){
            cb(fm.getIncoming(shape)) // 注意要再往前一个，前一个shape是sf
        }
    }
}
fm.outgoingLooper = function(title,cb){
    return (shape)=>{
        if(fm.getTitle(fm.getOutgoing(shape)) == title){
            cb(fm.getOutgoing(shape)) // 注意要再往前一个，前一个shape是sf
        }
    }
}



fm.spotlight = (shape) => {
    /* 定位的关键代码 */
    fm.editor.setSelection([shape])
    fm.editor.updateSelection()
}

fm.getTitle = shape =>  shape && shape._stencil && shape._stencil._jsonStencil.title || ''

fm.getIncoming = (shape) => {
    if(!shape) return false
    const incomings = shape.incoming
    if (incomings) {
        const incoming = incomings[0]
        if (incoming) return incoming
    }
    return false
}
fm.getIncomingX2 = (shape) => fm.getIncoming(fm.getIncoming(shape))
fm.getIncomingX3 = (shape) => fm.getIncomingX2(fm.getIncoming(shape))
fm.getOutgoing = (shape) => {
    if(!shape) return false
    const outgoings = shape.outgoing
    if (outgoings) {
        const outgoing = outgoings[0]
        if (outgoing) return outgoing
    }
    return false
}
fm.getOutgoingX2 = (shape) => fm.getOutgoing(fm.getOutgoing(shape))
fm.getOutgoingX3 = (shape) => fm.getOutgoingX2(fm.getOutgoing(shape))


fm.previousShape = {}
fm.previousShape.is = (title, shape) => {
    shape = shape ? shape : fm.currentSelectedShape
    if (!shape) return false
    if (!shape.incoming) return false
    const previousShapeSf = shape.incoming[0]
    if (previousShapeSf) {
        const previousShape = previousShapeSf.incoming[0]
        if (title == 'multi') {
            if (previousShape && fm.multi.is.gateway(previousShape)) {
                return true
            }
        } else {
            if (previousShape && fm.getTitle(previousShape) == title) {
                return true
            }
        }
    }
    return false
}
fm.last = {}
fm.last.is = (title, shape) => { // sf包括在其中，也算shape
    shape = shape ? shape : fm.currentSelectedShape
    if (!shape) return false
    if (!shape.incoming) return false
    const last = shape.incoming[0]
    if (last && fm.getTitle(last) == title) return true
    return false
}
fm.next = {}
fm.next.is = (title, shape) => {
    shape = shape ? shape : fm.currentSelectedShape
    if (!shape) return false
    if (!shape.outgoing) return false
    const next = shape.outgoing[0]
    if (next && fm.getTitle(next) == title) return true
    return false
}

//dep
// window.getQueryString = fm.getUrlQueryParam