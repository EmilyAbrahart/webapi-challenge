import React from 'react';

const Project = props => {
	return (
		<div>
			<h3>{props.name}</h3>
			<p>{props.description}</p>
		</div>
	);
};


export default Project;