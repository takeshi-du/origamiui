import { TabPanel, Dashicon } from '@wordpress/components';

export const breakpoints = ['sm', 'md', 'lg'];

/**
 * Dashicons map:
 *  sm → smartphone   (dashicons-smartphone)
 *  md → tablet       (dashicons-tablet)
 *  lg → laptop       (dashicons-laptop)
 *  xl → desktop       (dashicons-desktop)
 */
const iconMap = {
	sm: 'smartphone',
	md: 'tablet',
	lg: 'laptop',
};


export default function ResponsiveTabs( { children } ) {
	return (
		<TabPanel
			className="oui_tabs"
			tabs={ breakpoints.map( ( bp ) => ( {
				name: bp,
				title: <Dashicon icon={ iconMap[ bp ] } />,
			} ) ) }
			onSelect={ () => {} } // noop
		>
			{ ( tab ) => children( tab ) }
		</TabPanel>
	);
}
