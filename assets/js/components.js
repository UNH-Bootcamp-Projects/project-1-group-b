function SaveEventButton(event) {
	const newButton = document.createElement('button');
	newButton.setAttribute('class', 'newButton');
	newButton.setAttribute('data-event', JSON.stringify(event));
	newButton.textContent = 'Save Event';
	newButton.addEventListener('click', handleSaveEvent);
	return newButton;
}

function deleteEventButton(event) {
	const deleteButton = document.createElement('button');
	deleteButton.setAttribute('class', 'deleteButton');
	deleteButton.setAttribute('data-event', JSON.stringify(event));
	deleteButton.textContent = 'Delete Event';
	deleteButton.addEventListener('click', handleDeleteEvent);
	return deleteButton;
}
