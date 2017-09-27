'use strict'
import loadServerData from './loadServerData'
import requestUserData from './requestUserData'
import requestFormData from './requestFormData'
import { getModel, getPid } from './requestCollection'

export function fetchModelWrap($http, $rootScope) {
    const angularInit = (data) => {
        $rootScope.editor = new ORYX.Editor(data) //initialised   10866 12431 10060
        $rootScope.modelData = angular.fromJson(data)
        $rootScope.editorFactory.resolve()
    }
    const dataInit = (data) => {
        if (!data.model.childShapes) { //第一次使用本地的配置
            var modelUrl = KISBPM.URL.getModel(modelId)
            $http({ method: 'GET', url: modelUrl }).success(angularInit(data))
        } else {
            loadServerData(data.model)
            angularInit(data.model)
        }
    }
    return function(modelId) {
        requestUserData($http)
        requestFormData($http)
        getPid($http)
        getModel(dataInit, $http)
    }
}

// var modelUrl = KISBPM.URL.getModel(modelId);
// $http({method: 'GET', url: modelUrl}).success(function (data, status, headers, config) {
//     $rootScope.editor = new ORYX.Editor(data);  //initialised   10866 12431 10060
//     $rootScope.modelData = angular.fromJson(data);            
//     $rootScope.editorFactory.resolve();
// })