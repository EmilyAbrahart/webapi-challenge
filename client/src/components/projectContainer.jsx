import React from 'react';
import axios from 'axios';
import Project from './Project';

export default class ProjectContainer extends React.Component {
	state = {
		projects: [],
		message: ''
	};

	componentDidMount() {
		axios
			.get('http://localhost:5000/api/projects')
			.then(res => {
				this.setState({ projects: res.data });
			})
			.catch(error => {
				this.setState({ message: error });
			});
	}

	render() {
		return (
			<div>
				{this.state.projects.map(project => (
					<Project key={project.id} {...project} />
				))}
			</div>
		);
	}
}
