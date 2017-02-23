import React,{createClass} from 'react';
import './style'

const Character = ({text,click}) => {
    return (
        <div className="character">
            <span className="name">{text}</span>
            <span className="cross" onClick={click}>
                <i className="icon qingicon icon-guanbi2fill"></i>
            </span>
        </div>
    )
}

export default Character