var root = document.body;
var count = 0; // added a variable
var Splash = {
	view: function() {
		return m('div', { class: 'menu' }, [
			m('a', { class: 'button _round', href: '#!/click' }, '1 click demo'),
			m('br'),
			m('a', { class: 'button _round', href: '#!/request' }, 'Joke'),
		]);
	},
};
var Click = {
	view: function() {
		return m('main', { class: 'center ' }, [
			m('h1', { class: 'mar-bot' }, 'Counter'),
			// changed the next line
			m('h2', { class: 'white' }, count),
			m(
				'button',
				{
					class: 'button _round',
					onclick: function() {
						count++;
					},
				},
				' increment',
			),
			m('br'),
			m(
				'button',
				{
					class: 'button _round',
					onclick: function() {
						count--;
					},
				},
				' decrement',
			),
			m('div', { class: 'bottom-menu' }, [
				m('a', { class: 'button _round ', href: '#!/splash' }, 'back'),
			]),
		]);
	},
};
var count2 = 0;
var jokes = [];
var getJoke = name => {
	m.request({
		method: 'GET',
		url: 'http://api.icndb.com/jokes/random?firstname=' + name,
		data: {},
		withCredentials: false,
	}).then(function(data) {
		jokes.push(data.value.joke);
	});
};
// component
var jokesComponent = {
	view: function(vnode) {
		let jokelist = vnode.attrs.list;
		if (jokelist.length <= 0) return;
		let mjokes = [];
		jokes.forEach(joke =>
			mjokes.unshift(
				m(
					'h4',
					{
						style:
							'margin: 10px 15px 15px 15px; color:' +
							randomColor({
								luminosity: 'light',
								hue: 'random',
							}),
					},
					joke,
				),
			),
		);
		return mjokes.slice(0, 7);
	},
};
var Request = {
	view: () => {
		return m('main', { class: 'center' }, [
			m('div', { class: 'title' }, [m('h1', { class: 'p-top-e ' }, 'Chucks best jokes')]),
			m(jokesComponent, { class: 'pushdown', list: jokes }),
			m('div', { class: 'bottom-menu' }, [
				m('button', { class: 'button _round mar-top', onclick: getJoke }, 'Get chuck joke'),
				m('br'),
				m('a', { class: 'button _round ', href: '#!/splash' }, 'back'),
			]),
		]);
	},
};
m.route(root, '/splash', {
	'/splash': Splash,
	'/click': Click,
	'/request': Request,
});
