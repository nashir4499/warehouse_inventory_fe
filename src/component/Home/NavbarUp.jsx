import React from 'react'
import warehouse from './warehouse.svg'

function NavbarUp() {
    return (
        <nav className="navbar-glass fs--1 font-weight-semi-bold row navbar-top sticky-kit navbar navbar-expand-xl navbar-light">
            <div className="toggle-icon-wrapper mr-md-3 mr-2 d-xl-none">
                <button className="navbar-toggler nav-line" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">

                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
            <a className="text-decoration-none navbar-brand text-left" id="topLogo" href="/">
                <div className="d-flex align-items-center">
                    <img className="mr-2" src={warehouse} alt="Logo" width="40" />
                    <span className="text-sans-serif">warehouse</span>
                </div>
            </a>
            <div className="scrollbar collapse navbar-collapse">
                <ul className="align-items-center d-none d-lg-block navbar-nav">
                    <li className="nav-item">
                        <form className="search-box form-inline">
                            <input placeholder="Search..." aria-label="Search" type="search" className="rounded-pill search-input form-control" />
                        </form>
                    </li>
                </ul>
            </div>
            <ul className="navbar-nav-icons ml-auto flex-row align-items-center navbar-nav">
                <li className="nav-item">
                    <a className="settings-popover nav-link" href="/dashboard-alt#!">
                        <span className="ripple"></span>
                        <span className="fa-spin position-absolute a-0 d-flex flex-center">
                            <span className="icon-spin position-absolute a-0 d-flex flex-center">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.7369 12.3941L19.1989 12.1065C18.4459 11.7041 18.0843 10.8487 18.0843 9.99495C18.0843 9.14118 18.4459 8.28582 19.1989 7.88336L19.7369 7.59581C19.9474 7.47484 20.0316 7.23291 19.9474 7.03131C19.4842 5.57973 18.6843 4.28943 17.6738 3.20075C17.5053 3.03946 17.2527 2.99914 17.0422 3.12011L16.393 3.46714C15.6883 3.84379 14.8377 3.74529 14.1476 3.3427C14.0988 3.31422 14.0496 3.28621 14.0002 3.25868C13.2568 2.84453 12.7055 2.10629 12.7055 1.25525V0.70081C12.7055 0.499202 12.5371 0.297594 12.2845 0.257272C10.7266 -0.105622 9.16879 -0.0653007 7.69516 0.257272C7.44254 0.297594 7.31623 0.499202 7.31623 0.70081V1.23474C7.31623 2.09575 6.74999 2.8362 5.99824 3.25599C5.95774 3.27861 5.91747 3.30159 5.87744 3.32493C5.15643 3.74527 4.26453 3.85902 3.53534 3.45302L2.93743 3.12011C2.72691 2.99914 2.47429 3.03946 2.30587 3.20075C1.29538 4.28943 0.495411 5.57973 0.0322686 7.03131C-0.051939 7.23291 0.0322686 7.47484 0.242788 7.59581L0.784376 7.8853C1.54166 8.29007 1.92694 9.13627 1.92694 9.99495C1.92694 10.8536 1.54166 11.6998 0.784375 12.1046L0.242788 12.3941C0.0322686 12.515 -0.051939 12.757 0.0322686 12.9586C0.495411 14.4102 1.29538 15.7005 2.30587 16.7891C2.47429 16.9504 2.72691 16.9907 2.93743 16.8698L3.58669 16.5227C4.29133 16.1461 5.14131 16.2457 5.8331 16.6455C5.88713 16.6767 5.94159 16.7074 5.99648 16.7375C6.75162 17.1511 7.31623 17.8941 7.31623 18.7552V19.2891C7.31623 19.4425 7.41373 19.5959 7.55309 19.696C7.64066 19.7589 7.74815 19.7843 7.85406 19.8046C9.35884 20.0925 10.8609 20.0456 12.2845 19.7729C12.5371 19.6923 12.7055 19.4907 12.7055 19.2891V18.7346C12.7055 17.8836 13.2568 17.1454 14.0002 16.7312C14.0496 16.7037 14.0988 16.6757 14.1476 16.6472C14.8377 16.2446 15.6883 16.1461 16.393 16.5227L17.0422 16.8698C17.2527 16.9907 17.5053 16.9504 17.6738 16.7891C18.7264 15.7005 19.4842 14.4102 19.9895 12.9586C20.0316 12.757 19.9474 12.515 19.7369 12.3941ZM10.0109 13.2005C8.1162 13.2005 6.64257 11.7893 6.64257 9.97478C6.64257 8.20063 8.1162 6.74905 10.0109 6.74905C11.8634 6.74905 13.3792 8.20063 13.3792 9.97478C13.3792 11.7893 11.8634 13.2005 10.0109 13.2005Z" fill="#2A7BE4"></path>
                                </svg>
                            </span>
                        </span>
                    </a>
                </li>
                <li className="dropdown nav-item">
                    <div tabIndex="-1" role="menu" aria-hidden="true" className="dropdown-menu-card dropdown-menu dropdown-menu-right">
                    </div>
                </li>
                <li className="dropdown nav-item">
                    <div tabIndex="-1" role="menu" aria-hidden="true" className="dropdown-menu-card dropdown-menu dropdown-menu-right">
                        <div className="bg-white rounded-soft py-2">
                            <a href="#!" tabIndex="0" role="menuitem" className="font-weight-bold text-warning dropdown-item">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="crown" className="svg-inline--fa fa-crown fa-w-20 mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                    <path fill="currentColor" d="M528 448H112c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h416c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm64-320c-26.5 0-48 21.5-48 48 0 7.1 1.6 13.7 4.4 19.8L476 239.2c-15.4 9.2-35.3 4-44.2-11.6L350.3 85C361 76.2 368 63 368 48c0-26.5-21.5-48-48-48s-48 21.5-48 48c0 15 7 28.2 17.7 37l-81.5 142.6c-8.9 15.6-28.9 20.8-44.2 11.6l-72.3-43.4c2.7-6 4.4-12.7 4.4-19.8 0-26.5-21.5-48-48-48S0 149.5 0 176s21.5 48 48 48c2.6 0 5.2-.4 7.7-.8L128 416h384l72.3-192.8c2.5.4 5.1.8 7.7.8 26.5 0 48-21.5 48-48s-21.5-48-48-48z">
                                    </path>
                                </svg>
                                <span>Go Pro</span>
                            </a>
                            <div tabIndex="-1" className="dropdown-divider">
                            </div>
                            <a href="#!" tabIndex="0" role="menuitem" className="dropdown-item">Set status</a>
                            <a tabIndex="0" role="menuitem" className="dropdown-item" href="/pages/profile">Profile &amp; account</a>
                            <a href="#!" tabIndex="0" role="menuitem" className="dropdown-item">Feedback</a>
                            <div tabIndex="-1" className="dropdown-divider"></div>
                            <a tabIndex="0" role="menuitem" className="dropdown-item" href="/pages/settings">Settings</a>
                            <a tabIndex="0" role="menuitem" className="dropdown-item" href="/authentication/basic/logout">Logout</a>
                        </div>
                    </div>
                </li>
            </ul>
        </nav >
    )
}

export default NavbarUp
