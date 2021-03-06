import { tplSrc, tplSrcWithV } from './constant'
import render from './render'

export default function handleGateway(shape,$scope){
    if(fm.getTitle(shape) === 'Exclusive gateway'){
        $scope.propertyTpl = tplSrcWithV('node-name.html')
        if (!fm.multi.is.gateway(shape) && !fm.manual.is.gateway(shape)) {
            render(fm.branchNode)
        }
    }
}
