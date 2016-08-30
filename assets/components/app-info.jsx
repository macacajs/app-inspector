import pkg from '../../package.json';
import './app-info.less';

export default () => (
  <div className="app-info">
    <span>v{ pkg.version }</span>
    <span>© 2015-2016 <a href="//github.com/macacajs" target="_blank">Macaca</a></span>
    <strong>
      <a className="fn-right" target="_blank" style={{color: '#f60'}} href="https://github.com/macacajs/app-inspector/issues/new">Need help?</a>
    </strong>
  </div>
);
