import React from 'react';
import Action from './Action';

const ActionContainer = props => {
	return (
		<div>
      <h4>- Actions -</h4>
			{props.actions.map(action => (
				<Action key={action.id} {...action} />
			))}
		</div>
	);
};

export default ActionContainer;
