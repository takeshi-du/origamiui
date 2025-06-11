import { useEffect, useRef } from '@wordpress/element';

export default function CodeMirrorField( { value, onChange } ) {
	const containerRef = useRef( null );
	const editorRef    = useRef( null );

	useEffect( () => {
		if ( ! containerRef.current || editorRef.current ) return;

		editorRef.current = wp.CodeMirror( containerRef.current, {
			value,
			mode: 'css',
			lineNumbers: true,
			lint: false,
			gutters: [ 'CodeMirror-lint-markers' ],
			extraKeys: { 'Ctrl-Space': 'autocomplete' },
		} );

		editorRef.current.on( 'change', () => {
			onChange( editorRef.current.getValue() );
		} );

		return () => editorRef.current?.toTextArea?.();
	}, [ containerRef.current ] );

	return <div ref={ containerRef } style={ { minHeight: 220 } } />;
}
