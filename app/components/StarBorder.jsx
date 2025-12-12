import './StarBorder.css';

const StarBorder = ({
  as: Component = 'button',
  className = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  radius = 20,
  innerStyle = {},
  children,
  ...rest
}) => {
  return (
    <Component
      className={`star-border-container ${className}`}
      style={{
        padding: `${thickness}px 0`,
        borderRadius: radius,
        ['--star-speed']: speed,
        ...rest.style
      }}
      {...rest}
    >
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          // duration controlled via CSS variable
        }}
      ></div>
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          // duration controlled via CSS variable
        }}
      ></div>
      <div
        className="inner-content"
        style={{
          borderRadius: radius - 2,
          ...innerStyle
        }}
      >
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;
