import cn from "classnames";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";

type ScrollbarProps = {
  options?: any;
  style?: React.CSSProperties;
  className?: string;
  children: any;
};

const Scrollbar: React.FC<ScrollbarProps> = ({
  children,
  options,
  className,
  style,
  ...props
}) => {
  return (
    <OverlayScrollbarsComponent
      options={{
        className: cn("os-theme-thin-dark", className),
        scrollbars: {
          autoHide: "scroll",
        },
        ...(options ? options : {}),
      }}
      style={style}
      {...props}
    />
  );
};

export default Scrollbar;
