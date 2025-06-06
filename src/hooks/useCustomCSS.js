// src/hooks/useCustomCSS.js
import { useEffect, useCallback } from '@wordpress/element';
import { v4 as uuid } from 'uuid';

export default function useCustomCSS( attributes, setAttributes, options = {} ) {
	const { uid, customCSS } = attributes;
	const prefix = options.prefix || 'oui_cm-block';

	useEffect( () => {
		if ( uid ) return;
		const legacy = attributes.className?.match( new RegExp(`${prefix}-([a-f0-9]{8})`) );
		const newId  = legacy ? legacy[1] : uuid().slice(0, 8);

		setAttributes( {
			uid: newId,
			className: `${prefix}-${ newId }`,
		} );
	}, [] );

	const editorClass = uid ? `${prefix}-${ uid }` : '';

	const initialValue = customCSS
		? customCSS.replace( new RegExp(`\\.${ editorClass }`, 'g'), 'selector' )
		: (options.defaultTemplate || 'selector {\n    /* your styles */\n}\n');

	const handleChange = useCallback( raw => {
		if ( ! uid ) return;
		setAttributes( {
			customCSS: raw.replace( /selector/g, `.${ editorClass }` ),
		} );
	}, [ uid, editorClass ] );

	return { editorClass, customCSS, initialValue, handleChange };
}
