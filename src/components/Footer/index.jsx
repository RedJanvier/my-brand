

function Footer() {
	return (
		<footer className="section colored footer">
			<p className="section__subheading">
				Connect further more for the best implementation of your ideas.
			</p>
			<div className="footer__links">
				<i className="fa fa-facebook" onclick="redirectTo('https://www.facebook.com/jan.h.red')"></i>
				<i className="fa fa-github" onclick="redirectTo('https://github.com/RedJanvier')"></i>
				<i className="fa fa-twitter" onclick="redirectTo('https://twitter.com/red_janvier')"></i>
				<i className="fa fa-stack-overflow" onclick="redirectTo('https://www.facebook.com/jan.h.red')"></i>
			</div>
			<p className="footer__text">
				&copy; 2020 Made with ❤ by
				<a href="https://github.com/redjanvier" rel="external nofollow" className="active dark">RedJanvier</a>
			</p>
		</footer>
	);
}
export default Footer;
