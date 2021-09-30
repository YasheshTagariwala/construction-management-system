import {Spinner} from "reactstrap";

const style = {
    position: 'absolute',
    margin: 'auto',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99999
}

const divStyle = {
    position: 'fixed',
    zIndex: 99,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
    background: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%'
}

function Loader() {
    return (
        <div style={divStyle} className="position-fixed m-auto w-100 h-100 bg-gray-400">
            <Spinner style={style} type="border" size="lg" className="primary-color"/>
        </div>
    )
}

export default Loader
