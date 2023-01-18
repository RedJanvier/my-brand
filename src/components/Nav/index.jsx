
function Nav({notLanding = false}) {
	return (
		<nav className="navbar">
			<h1 className="navbar__logo">RedJanvier</h1>
			<ul className="navbar__links">
				<li><a href={(notLanding ? "/" : '') + '#'} className="active">Home</a></li>
				<li><a href={(notLanding ? "/" : '') + "#about"}>About</a></li>
				<li><a href={(notLanding ? "/" : '') + "#portfolio"}>Portfolio</a></li>
				{/* <li><a href="#blog">Blog</a></li> */}
				<li>
					{/* <a href="#contact">Contact</a> */}
					<button onclick={`redirectTo("${(notLanding ? "/" : '') + '#contact'}")`} className="btn logBtn active">Contact Me</button>
				</li>
				{/* <li><button onclick="redirectTo('/admin')" className="btn logBtn">Login</button></li> */}
			</ul>
			<div className="mobile">
				<a href="#0"><i className="fa fa-bars"></i></a>
				<ul className="navbar__mobile">
					<li><a href={(notLanding ? "/" : '') + '#0'} className="active">Home</a></li>
					<li><a href={(notLanding ? "/" : '') + "#about"}>About</a></li>
					<li><a href={(notLanding ? "/" : '') + "#portfolio"}>Portfolio</a></li>
					{/* <li><a href="#blog">Blog</a></li> */}
					<li>
						{/* <a href="#contact">Contact</a> */}
						<button onclick={`redirectTo("${(notLanding ? "/" : '') + '#contact'}")`} className="btn logBtn active">Contact Me</button>
					</li>
					{/* <li><button onclick="redirectTo('/admin')" className="btn logBtn">Login</button></li> */}
				</ul>
			</div>
		</nav>
	);
}

export default Nav;
