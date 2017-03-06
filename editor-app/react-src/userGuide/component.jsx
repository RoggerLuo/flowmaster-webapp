import React,{createClass} from 'react';
import { render } from 'react-dom'
import './style'

const step1 =  {
    step:'1',
    header:'10px solid rgba(0, 0, 0, 0.38)',
    leftBackground:'rgba(0, 0, 0, 0)',
    leftBorderBackground:'rgba(0, 0, 0, 0.38)',
    rightBackground:'rgba(0, 0, 0, 0.38)',
    rightBorderBackground:'rgba(0, 0, 0, 0)',
    middleBackground:'rgba(0, 0, 0, 0.38)',
}
const step2 =  {
    step:'2',
    header:'10px solid rgba(0, 0, 0, 0.38)',
    leftBackground:'rgba(0, 0, 0, 0.38)',
    leftBorderBackground:'rgba(0, 0, 0, 0)',
    rightBackground:'rgba(0, 0, 0, 0.38)',
    rightBorderBackground:'rgba(0, 0, 0, 0)',
    middleBackground:'rgba(0, 0, 0, 0)'
}
const step3 =  {
    step:'3',
    header:'10px solid rgba(0, 0, 0, 0.38)',
    leftBackground:'rgba(0, 0, 0, 0.38)',
    leftBorderBackground:'rgba(0, 0, 0, 0)',
    rightBackground:'rgba(0, 0, 0, 0)',
    rightBorderBackground:'rgba(0, 0, 0, 0.38)',
    middleBackground:'rgba(0, 0, 0, 0.38)'
}
const final =  {
    step:'4',
    header:'10px solid rgba(0, 0, 0, 0)',
    leftBackground:'rgba(0, 0, 0, 0)',
    leftBorderBackground:'rgba(0, 0, 0, 0)',
    rightBackground:'rgba(0, 0, 0, 0)',
    rightBorderBackground:'rgba(0, 0, 0, 0)',
    middleBackground:'rgba(0, 0, 0, 0)'
}
const Component = createClass({ 
    getInitialState(){
       

        return {currentStep:step1}
    },
    nextStep(){
        
        switch(this.state.currentStep.step){
            case '1':
                this.setState({currentStep:step2})
                break
            case '2':
                this.setState({currentStep:step3,text:''})
                break
            case '3':
                this.setState({currentStep:final,text:'从左边点击或拖动功能点',display:'none'})
                break
        }

    },
    stopRemind(){
        
        this.setState({currentStep:final,text:'从左边点击或拖动功能点',display:'none'})
    },
    render(){
        let slice1Display = 'none'
        let slice2Display = 'none'
        let slice3Display = 'none'
        switch(this.state.currentStep.step){
            case '1':
                slice1Display = ''
                slice2Display = 'none'
                slice3Display = 'none'                                
                break
            case '2':
                slice1Display = 'none'
                slice2Display = ''
                slice3Display = 'none'                                
                break
            case '3':
                slice1Display = 'none'
                slice2Display = 'none'
                slice3Display = ''                                
                break
        }

        return (
            <div className="cover" onClick={this.nextStep} style={{display:this.state.display}}>
                <div className="header"></div>
                <div className="body" >
                    <div style={{backgroundColor:this.state.currentStep.leftBackground}} className="left">
                    </div>
                    <div style={{backgroundColor:this.state.currentStep.leftBorderBackground}} className="left-border"></div>
                    
                    <div style={{backgroundColor:this.state.currentStep.middleBackground}} className="middle">
                        
                        <div className="slice3line" style={{display:slice3Display,position:'relative',top:'171px',left:'88%'}} >
                            <img src="editor-app/react-src/userGuide/line/3.png"/>
                        </div>


                        <div className="slice slice1" style={{display:slice1Display}} >
                            <div className="title-text">1、功能点</div>
                            <div className="content-text">点击或拖动至编辑区域</div>
                            <div className="bottom-text"><span className="stopremind" onClick={this.stopRemind}>不再提醒</span> <span className="iknow">我知道了</span></div>
                        </div>
                        <div className="slice1line" style={{display:slice1Display,position:'relative',top:'249px',right:'200px'}} >
                            <img src="editor-app/react-src/userGuide/line/1.png"/>
                        </div>

                        <div className="middle-text">{this.state.text}</div>
                        <div className="slice slice3" style={{display:slice3Display}} >
                            <div className="title-text">3、设置区域</div>
                            <div className="content-text">在此区域进行设置</div>
                            <div className="bottom-text"><span className="stopremind" onClick={this.stopRemind}>不再提醒</span> <span className="iknow">我知道了</span></div>
                        </div>

                    </div>
                    <div style={{backgroundColor:this.state.currentStep.rightBorderBackground}} className="right-border"></div>
                    <div style={{backgroundColor:this.state.currentStep.rightBackground}} className="right">
                        
                        <div className="slice1line" style={{display:slice2Display,position:'relative',top:'323px',left:'20px'}} >
                            <img src="editor-app/react-src/userGuide/line/2.png"/>
                        </div>

                        <div className="slice slice2" style={{display:slice2Display}} >
                            <div className="title-text">2、编辑区域</div>
                            <div className="content-text">在此区域进行编辑</div>
                            <div className="bottom-text"><span className="stopremind" onClick={this.stopRemind}>不再提醒</span> <span className="iknow">我知道了</span></div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
})

window.userGuide = function(){
    let userGuide = window.localStorage.getItem('userGuide')
    if(userGuide){
        
    }else{
        //挂载
        render(
            <Component />
            ,
            document.getElementById('userGuideComponent')
        )
        // window.localStorage.setItem('userGuide','readed')
    }    
}
