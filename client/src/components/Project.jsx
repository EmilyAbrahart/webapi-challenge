import React from 'react';
import ActionContainer from './ActionContainer';
import axios from 'axios';
import styled from 'styled-components';
import { FlexFunc, color_light, shadow } from '../styles';

const ActionContainerDiv = styled.div`
	display: ${props => (props.isOpen ? 'flex' : 'none')};
`;

const ProjectDiv = styled.div`
${FlexFunc('column', 'center', 'center')}
border: 2px solid ${color_light};
width: 800px;
border-radius: 2rem;
margin: 1rem;
box-shadow: ${props => (props.isOpen ? shadow : 'none')}
`;

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

	toggleActions = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};

	render() {
		return (
			<ProjectDiv
				isOpen={this.state.isOpen}
				onClick={() => {
					this.toggleActions();
				}}
			>
				<h3>{this.props.name}</h3>
				<p>{this.props.description}</p>
				<ActionContainerDiv isOpen={this.state.isOpen}>
					<ActionContainer actions={this.state.actions} />
				</ActionContainerDiv>
			</ProjectDiv>
		);
	}
}
