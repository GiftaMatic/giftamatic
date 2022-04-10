import React from 'react'

const ProgressBar = ({ bgcolor, progress, height }:{bgcolor:any, progress:any, height:any }) => {

    const Parentdiv = {
        display: 'flex',
        width: '100%',
        height: height,
        backgroundColor: 'whitesmoke',
        borderRadius: 40,
        alignItems: 'center',
    }

    const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: bgcolor,
        borderRadius: 40,
        // textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
    }

    const progresstext = {
        color: '#fff',
        display: 'flex',
        fontSize: '15px',
        alignItems: 'center',
        fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif',
    }

    return (
        <div style={Parentdiv}>
            <div style={Childdiv}>
                <span style={progresstext}>{`${progress}%`}</span>
            </div>
        </div>
    )
}

export default ProgressBar;