// src/hooks/useCustomCSS.js
import { useEffect, useCallback } from '@wordpress/element';

/**
 * カスタム CSS を selector ベースで保存し、表示時にブロック専用クラスへ
 * 置き換える共通フック
 *
 * @param {Object}   attrs      ブロック属性（edit.js から渡す）
 * @param {Function} setAttrs   setAttributes
 * @param {Object}   options
 * @param {String}   options.prefix プレフィックス（例: 'oui_cm-group'）
 * @param {String}   options.tpl    デフォルト CSS テンプレート
 */
export default function useCustomCSS( attrs, setAttrs, { prefix, tpl } ) {
	/* ---------- 変数準備 ---------- */
	const { rawCSS = tpl, compiledCSS } = attrs;
	const suffix   = attrs.clientId.split( '-' ).pop();   // clientId の末尾
	const cls      = `${ prefix }-${ suffix }`;           // 例: oui_cm-group-893a0dea1bb1
	const regexSel = new RegExp( `\\.${ prefix }-[a-f0-9]+`, 'g' );  // 旧クラス検出用

	/* ---------- ① rawCSS → compiledCSS 同期 ---------- */
	useEffect( () => {
		const newCompiled = rawCSS
			.replace( /selector/g, `.${ cls }` )   // selector → 現クラス
			.replace( regexSel, `.${ cls }` );     // 旧クラス → 現クラス

		if ( newCompiled !== compiledCSS ) {
			setAttrs( { compiledCSS: newCompiled } );
		}
	}, [ rawCSS, cls ] );

	/* ---------- ② CodeMirror onChange ---------- */
	const onChange = useCallback(
		( text ) => setAttrs( { rawCSS: text } ), // selector のまま保存
		[]
	);

	/* ---------- ③ className 同期（重複を除去して 1 つだけ追加） ---------- */
	useEffect( () => {
		const current = attrs.className || '';
		const regex   = new RegExp( `${ prefix }-[a-f0-9]+`, 'g' );

		// 旧クラスをすべて除去
		const cleaned = current
			.split( /\s+/ )
			.filter( ( c ) => ! regex.test( c ) )
			.join( ' ' )
			.trim();

		// 新しい class を結合
		const next = cleaned ? `${ cleaned } ${ cls }` : cls;

		if ( next !== current.trim() ) {
			setAttrs( { className: next } );
		}
	}, [ cls ] );

	/* ---------- 返却 ---------- */
	return {
		blockClass: cls,
		rawCSS,
		compiledCSS,
		onChange,
	};
}
