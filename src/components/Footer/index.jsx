
function Footer() {
	return (
		<footer className="section colored footer">
			<p className="section__subheading">
				Open to senior engineering roles, architecture consulting, and interesting problems.
			</p>
			<div className="footer__links">
				<i
					className="fa fa-linkedin"
					onClick={() => window.open('https://www.linkedin.com/in/janvierntwali', '_blank', 'noopener')}
					title="LinkedIn"
					role="link"
					tabIndex={0}
				></i>
				<i
					className="fa fa-github"
					onClick={() => window.open('https://github.com/RedJanvier', '_blank', 'noopener')}
					title="GitHub"
					role="link"
					tabIndex={0}
				></i>
				<i
					className="fa fa-twitter"
					onClick={() => window.open('https://twitter.com/red_janvier', '_blank', 'noopener')}
					title="Twitter"
					role="link"
					tabIndex={0}
				></i>
				<i
					className="fa fa-stack-overflow"
					onClick={() => window.open('https://stackoverflow.com/users/redjanvier', '_blank', 'noopener')}
					title="Stack Overflow"
					role="link"
					tabIndex={0}
				></i>
			</div>
			<p className="footer__text">
				&copy; {new Date().getFullYear()} Made with ❤ by<span> </span>
				<a href="https://github.com/redjanvier" rel="external nofollow" className="active dark">RedJanvier</a>
			</p>
		</footer>
	);
}
export default Footer;
