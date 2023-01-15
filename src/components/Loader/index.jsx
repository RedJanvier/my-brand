const Loader = ({ text, color = '', style = '' }) => (
    <div class={"lds-ring " + color} style={style}>
      {text && <span class={color}>{text}...</span>}
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );

export default Loader;
