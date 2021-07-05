import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import { analytics } from '../config';

class Html extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    styles: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      cssText: PropTypes.string.isRequired,
    }).isRequired),
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
    // eslint-disable-next-line react/forbid-prop-types
    state: PropTypes.object,
    lang: PropTypes.string,
    children: PropTypes.string.isRequired,
  };

  static defaultProps = {
    styles: [],
    scripts: [],
    state: null,
    lang: 'en',
  };

  render() {
    const { title, description, styles, scripts, state, lang, children, image } = this.props;
    return (
      <html className="no-js" lang={lang}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={image} />
          <meta name="twitter:card" content="photo" />
          <meta name="twitter:image" content={image} />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <link rel="apple-touch-icon" href="apple-touch-icon.png" />
	        <link rel="stylesheet" href="/css/bootstrap.min.css" />

          <link rel="stylesheet" type="text/css" href="/css/react-slick/slick.min.css" />
          <link rel="stylesheet" type="text/css" href="/css/react-slick/slick-theme.min.css" />

          <link rel="stylesheet" href="/css/common.css" />
          <link rel="stylesheet" href="/css/min/dropzone.min.css" />
          <link rel="stylesheet" media="print" href="/css/print.css" />

          <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png"/>
          <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png"/>
          <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png"/>
          <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png"/>
          <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png"/>
          <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png"/>
          <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png"/>
          <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png"/>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png"/>
          <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
          <link rel="manifest" href="/manifest.json"/>
          <meta name="msapplication-TileColor" content="#ffffff"/>
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"/>
          <meta name="theme-color" content="#ffffff"/>
          <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.8.1/css/all.css"
                integrity="sha384-Bx4pytHkyTDy3aJKjGkGoHPt3tvv6zlwwjc3iqN7ktaiEMLDPqLSZYts2OjKcBx1"
                crossOrigin="anonymous" />

          {styles.map(style =>
            <style
              key={style.id}
              id={style.id}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: style.cssText }}
            />,
          )}
        
         
        </head>
        <body>
          <div
            id="app"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: children }}
          />
          {state && (
            <script
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html:
              `window.APP_STATE=${serialize(state, { isJSON: true })}` }}
            />
          )}
          {scripts.map(script => <script key={script} src={script} />)}
          {analytics.google.trackingId &&
            <script
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html:
              'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' +
              `ga('create','${analytics.google.trackingId}','auto');ga('send','pageview')` }}
            />
          }
          {analytics.google.trackingId &&
            <script src="https://www.google-analytics.com/analytics.js" async defer />
          }
        </body>
      </html>
    );
  }
}

export default Html;
