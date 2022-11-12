
function Nav() {
	return (
		<nav className="navbar">
			<h1 className="navbar__logo">RedJanvier</h1>
			<ul className="navbar__links">
				<li><a href="#" className="active">Home</a></li>
				<li><a href="#about">About</a></li>
				<li><a href="#portfolio">Portfolio</a></li>
				<li><a href="#blog">Blog</a></li>
				<li><a href="#contact">Contact</a></li>
				<li><button onclick="redirectTo('/admin')" className="btn logBtn">Login</button></li>
			</ul>
			<div className="mobile">
				<a href="#0"><i className="fa fa-bars"></i></a>
				<ul className="navbar__mobile">
					<li><a href="#0" className="active">Home</a></li>
					<li><a href="#about">About</a></li>
					<li><a href="#portfolio">Portfolio</a></li>
					<li><a href="#blog">Blog</a></li>
					<li>
						<a href="#contact">Contact</a>
					</li>
					<li><button onclick="redirectTo('/admin')" className="btn logBtn">Login</button></li>
				</ul>
			</div>
		</nav>
	);
}
export default Nav;
