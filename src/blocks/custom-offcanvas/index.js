import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import { ReactComponent as OffcanvasIcon } from '../../../assets/images/offcanvas.svg';
import './offcanvas.js';

registerBlockType(metadata.name, {
    icon: <OffcanvasIcon />,
    edit: Edit,
    save: Save,
});