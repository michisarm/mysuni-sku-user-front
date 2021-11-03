import React from 'react'

function LogoView() {
    return (
        <div className="g-logo">
            <a href="/">
                <i className="sk-university icon">
                    <span className="blind">my suni</span>
                </i>
            </a>
        </div>
    )
}

export function GNBHeader() {
    return (
        <section className="header main-sty2 lms-main ">
            <div className="group">
                <div className="cont-inner">
                    <LogoView/>
                </div>
            </div>
        </section>
    )
}