import pkg from '../../package.json';
import './app-info.less';

export default () => (
  <div className="app-info">
    <span>v{ pkg.version }</span>
    <span>
      &copy; 2015-{ (new Date).getFullYear() } <a href="//macacajs.github.io/app-inspector" target="_blank">Macaca</a>
    </span>
    <strong>
      <a className="fn-right" target="_blank" style={{color: '#f60'}} href="//github.com/macacajs/app-inspector/issues/new">
        Need help?
      </a>
    </strong>
  </div>
);
