
function Nav({notLanding = false}) {
	return (
		<nav className="navbar">
			<ul className="navbar__links">
				<li><a href={(notLanding ? "/" : '') + '#'} className="active">Home</a></li>
				<li><a href={(notLanding ? "/" : '') + "#about"}>About</a></li>
				<li><a href={(notLanding ? "/" : '') + "#experience"}>Experience</a></li>
			</ul>
			<a href="#"><h1 className="navbar__logo">RedJanvier</h1></a>
			<ul className="navbar__links">
				<li><a href={(notLanding ? "/" : '') + "#skills"}>Skills</a></li>
				<li><a href={(notLanding ? "/" : '') + "#portfolio"}>Portfolio</a></li>
				<li>
					<a href="#contact">Contact</a>
				</li>
			</ul>
			<div className="mobile">
				<a href="#0"><i className="fa fa-bars"></i></a>
				<ul className="navbar__mobile">
					<li><a href={(notLanding ? "/" : '') + "#about"}>About</a></li>
					<li><a href={(notLanding ? "/" : '') + "#experience"}>Experience</a></li>
					<li><a href={(notLanding ? "/" : '') + "#skills"}>Skills</a></li>
					<li><a href={(notLanding ? "/" : '') + "#portfolio"}>Portfolio</a></li>
					<li>
						<a href="#contact">Contact</a>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default Nav;
