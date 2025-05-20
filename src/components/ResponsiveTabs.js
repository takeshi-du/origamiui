import { TabPanel } from '@wordpress/components';

export const breakpoints = ['sm', 'md', 'lg'];

export default function ResponsiveTabs({ children }) {
	return (
		<TabPanel
			className="origamiui-tabs"
			tabs={ breakpoints.map((bp) => ({
				name: bp, title: bp.toUpperCase(),
			})) }
			onSelect={ () => {} }   // noop
		>
			{ (tab) => children(tab) }
		</TabPanel>
	);
}
