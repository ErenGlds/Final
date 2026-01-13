import {UseEffect} from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    UseEffect(() => {
        window.scrollTo(0, 0);}, [pathname]);
    return null;
};
export default ScrollToTop;
