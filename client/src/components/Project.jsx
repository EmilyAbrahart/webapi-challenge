import React from 'react';
import ActionContainer from './ActionContainer';
import axios from 'axios';

export default class Project extends React.Component {
	state = {
		actions: [],
		isOpen: false,
		message: ''
	};

	componentDidMount() {
		axios
			.get(`http://localhost:5000/api/projects/${this.props.id}/actions`)
			.then(res => {
				this.setState({ actions: res.data });
			})
			.catch(error => {
				this.setState({ message: error });
			});
	}

	render() {
		return (
			<div>
				<h3>{this.props.name}</h3>
				<p>{this.props.description}</p>
				<ActionContainer actions={this.state.actions} />
			</div>
		);
	}
}
