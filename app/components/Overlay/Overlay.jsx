import Styles from "./Overlay.module.css";

export const Overlay = (props) => {
  return (
    <div 
      className={`${Styles["overlay"]} ${props.open === true && Styles["overlay_is-opened"]}`} 
      onClick={() => props.close()}
      >
    </div>
  );
};