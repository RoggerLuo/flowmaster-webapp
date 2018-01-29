import { tplSrc } from './conf'
export default function($scope, shape) {
    // 这里只负责 命名控件是否显示，
    // 业务状态全部都显示

    if(fm.last.is('User task',shape)){
        $scope.propertyTpl = tplSrc + 'sf/name_and_status.html'
        return
    }
    if (fm.manual.is.sf(shape)) {
        $scope.propertyTpl = tplSrc + 'sf/name_and_status.html'
        return
    }


    // if (fm.manual.is.sfInTheMiddle(shape)) {
    //     $scope.propertyTpl = tplSrc + 'sf/blank.html'
    //     return
    // }

    // /* 如果是会签分支branch */
    // if (fm.multi.is.sf(shape)) {
    //     $scope.propertyTpl = tplSrc + 'sf/blank.html'
    //     return
    // }

    // /* 如果是人工分支branch */
    // if (fm.manual.is.sf(shape)) {
    //     $scope.propertyTpl = tplSrc + 'sf/only-name.html'
    //     return
    // }

    // /* 如果是传阅 */
    // if(fm.next.is("Circulation task",shape)){
    //     $scope.propertyTpl = tplSrc + 'sf/only-name.html'
    //     return
    // }


    //如果要现实 要显式的写在这，不然会被branch的规则覆盖
    // if(fm.next.is('User task',shape)){
    //     $scope.propertyTpl = tplSrc + 'sf/name_and_status.html'
    //     return
    // }
    // if(fm.next.is('Manual task',shape)){
    //     $scope.propertyTpl = tplSrc + 'sf/name_and_status.html'
    //     return
    // }

    /* 如果是普通分支节点的branch */
    if (fm.branch.is(shape)) {
        if (shape.properties['defaultflow'] == 'true') {
            $scope.propertyTpl = tplSrc + 'sf/only-status.html'
            return
        } else {
            $scope.propertyTpl = tplSrc + 'sf/branch.html'
            return
        }
    }
    
    // if(fm.next.is("End event",shape)){
    //     $scope.propertyTpl = tplSrc + 'sf/name_and_status.html'
    //     return
    // }
    $scope.propertyTpl = tplSrc + 'sf/only-status.html'
}

