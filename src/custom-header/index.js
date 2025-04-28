import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import { ReactComponent as HeaderIcon } from '../../assets/images/header.svg';

registerBlockType(metadata.name, {
    icon: <HeaderIcon />,
    edit: Edit,
    save: Save,
});