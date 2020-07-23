import React, {useState} from 'react';

import styles from './styles';

import { withStyles } from '@material-ui/core/styles';
import { Divider, Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import SidebarItem from '../sidebarItem/SidebarItem';


const Sidebar = (props) => {
	let [addingNote, setAddingNote] = useState(false)
	let [title, setTitle] = useState(null)
	
	const { notes, classes, selectedNoteIndex } = props;
	
	const newNoteBtnClick = () => {
		setTitle(null)
		setAddingNote(prev => addingNote = !prev)
	}
	const updateTitle = (txt) => {
		setTitle(txt)
	}
	const newNote = () => {
		props.newNote(title);
		setTitle(null)
		setAddingNote(false)
	}
	const selectNote = (n, i) => props.selectNote(n, i);
	const deleteNote = (note) => props.deleteNote(note);

	if(notes) {
		return (
			<div className={classes.sidebarContainer}>
				<Button onClick={newNoteBtnClick} className={classes.newNoteBtn}>
					{addingNote ? 'Cancel' : 'New Note'}
				</Button>
				{ addingNote ? 
					<div>
						<input type='text'
							className={classes.newNoteInput}
							placeholder='Enter note title'
							onKeyUp={(e) => updateTitle(e.target.value)}>
						</input>
						<Button className={classes.newNoteSubmitBtn} onClick={newNote}>
							Submit Note
						</Button>
					</div> :
					null
				}
				<List>
					{
					notes.map((_note, _index) => {
						return(
							<div key={_index}>
								<SidebarItem
									_note={_note}
									_index={_index}
									selectedNoteIndex={selectedNoteIndex}
									selectNote={selectNote}
									deleteNote={deleteNote}>
								</SidebarItem>
								<Divider></Divider>
							</div>
						)
					})
					}
				</List>
			</div>
		)
		
	}  else {
		return(<div></div>);
	}
}

export default withStyles(styles)(Sidebar)
