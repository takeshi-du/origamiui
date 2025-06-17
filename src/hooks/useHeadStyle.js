import { useRef, useEffect } from '@wordpress/element';

/**
 * 編集画面の iframe／通常 DOM の <head> に compiledCSS を注入する共通フック
 *
 * @param {string} compiledCSS
 * @param {string} clientId
 * @returns {object}
 */
export default function useHeadStyle( compiledCSS, clientId ) {
	const nodeRef = useRef( null );

	useEffect( () => {
		if ( ! compiledCSS || ! nodeRef.current ) return;

		const doc     = nodeRef.current.ownerDocument || document;
		const headEl  = doc.head || doc.getElementsByTagName( 'head' )[ 0 ];
		const styleId = `origamiui-style-${ clientId }`;

		let styleEl = doc.getElementById( styleId );
		if ( ! styleEl ) {
			styleEl       = doc.createElement( 'style' );
			styleEl.id    = styleId;
			headEl.appendChild( styleEl );
		}
		styleEl.textContent = compiledCSS;

		return () => {
			const el = doc.getElementById( styleId );
			if ( el ) el.remove();
		};
	}, [ compiledCSS, clientId ] );

	return nodeRef;
}
