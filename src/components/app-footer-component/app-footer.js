/**
 *
 * Footer
 *
 */
import React from 'react';

import { Typography, Link } from '@material-ui/core';
import './app-footer.css';

function Footer(props) {
   return (
      <div className="app_footer">
         <Typography className="footer-info" component="span"
            variant="caption">Made with <span className="ion-heart">❤</span></Typography>
         <Typography className="footer-info" component="span"
            variant="caption">Developed by &nbsp;
    <Link color="textPrimary" target="_blank" href="https://www.kanhaiya-mishra.in/">
               Kanhaiya Mishra
  </Link>
            <Link color="textPrimary" className="margin-left-8" target="_blank" href="https://www.linkedin.com/in/kanhaiya-mishra/">
               LinkedIn
  </Link>
            <Link color="textPrimary" target="_blank" className="margin-left-8" href="https://www.instagram.com/kanhaiya.10/">
               Instagram
  </Link></Typography>
      </div>
   );
}

export default Footer;
