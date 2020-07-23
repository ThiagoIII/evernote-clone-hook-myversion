import React, {useState, useEffect} from 'react';
import ReactQuill from 'react-quill';
import debounce from '../../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';


const Editor = (props) => {
	let [text, setText] = useState(props.selectedNote.body)
	let [stateTitle, setTitle] = useState(props.selectedNote.title)
	let [stateId, setId] = useState(props.selectedNote.id)

	console.log(props)
	let { selectedNote , classes } = props;
	let { body , title , id } = selectedNote;

	useEffect(() => {
		setText(body)
		setTitle(title)
		setId(id)
	}, [body, title, id])

	const updateBody = async (val) => {
		setText(val);
		update();
	};

	const updateTitle = async (txt) => {
		setTitle(txt);
		update();
	}

	const update = debounce(() => {
		props.noteUpdate(stateId, {
		title: stateTitle,
		body: text
		})
	}, 1500); 



	return (
		<div className={classes.editorContainer}>
			<BorderColorIcon className={classes.editIcon}></BorderColorIcon>
			<input
				className={classes.titleInput}
				placeholder='Note title...'
				value={stateTitle ? stateTitle : ''}
				onChange={(e) => updateTitle(e.target.value)}>
			</input> 
			<ReactQuill 
				value={text} 
				onChange={updateBody}>
			</ReactQuill>
		</div>
	)
}

export default withStyles(styles)(Editor)
