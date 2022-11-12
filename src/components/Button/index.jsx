import Styles from './styles.module.scss';

function Button({ children = '', onClick }) {
	return	<div className={Styles.frame}>
						<div className={Styles.button} onClick={onClick}>{children}</div>
					</div>;
}

export default Button;
