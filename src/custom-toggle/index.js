import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import { ReactComponent as ToggleIcon } from '../../assets/images/toggle.svg';

registerBlockType(metadata.name, {
    icon: <ToggleIcon />,
    edit: Edit,
    save: Save,
});