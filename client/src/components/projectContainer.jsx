import React from 'react';
import axios from 'axios';
import Project from './Project';
import styled from 'styled-components';
import {FlexFunc} from '../styles'

const ProjectContainerDiv = styled.div`
${FlexFunc('column', 'center', 'center')}
width: 100%;
`

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
			<ProjectContainerDiv>
				{this.state.projects.map(project => (
					<Project key={project.id} {...project} />
				))}
			</ProjectContainerDiv>
		);
	}
}
